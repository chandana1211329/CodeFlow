package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os/exec"
	"strings"
	"time"
	"encoding/base64"
	"os"
	"path/filepath"
	"regexp"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

type TreeStepMetadata struct {
	TreeType           string        `json:"treeType,omitempty"`
	Operation          string        `json:"operation,omitempty"`
	ActiveNodeID       string        `json:"activeNodeId,omitempty"`
	ActiveNodeVal      interface{}   `json:"activeNodeVal,omitempty"`
	ComparingNodeID    string        `json:"comparingNodeId,omitempty"`
	ComparingVal       interface{}   `json:"comparingVal,omitempty"`
	TargetVal          interface{}   `json:"targetVal,omitempty"`
	Decision           string        `json:"decision,omitempty"`
	ComparisonExpr     string        `json:"comparisonExpr,omitempty"`
	SubstitutedExpr    string        `json:"substitutedExpr,omitempty"`
	TraversalType      string        `json:"traversalType,omitempty"`
	TraversalSequence  []interface{} `json:"traversalSequence,omitempty"`
	CallStackDepth     int           `json:"callStackDepth,omitempty"`
	NullBranchType     string        `json:"nullBranchType,omitempty"`
	ExplanationSummary string        `json:"explanationSummary,omitempty"`
}

type StepMetadata struct {
	Mode        string            `json:"mode"` // "memory", "operator", "conditional", "loop", "data_structure", "tree"
	Operator    *OperatorMetadata `json:"operator,omitempty"`
	Conditional *ConditionalMetadata `json:"conditional,omitempty"`
	Loop        *LoopMetadata     `json:"loop,omitempty"`
	Tree        *TreeStepMetadata `json:"tree,omitempty"`
}

type OperatorMetadata struct {
	Expr        string `json:"expr"`
	Operand1    string `json:"operand1"`
	Operand2    string `json:"operand2"`
	Op          string `json:"op"`
	Substituted string `json:"substituted"`
	Result      string `json:"result"`
	TargetVar   string `json:"targetVar"`
}

type ConditionalMetadata struct {
	Condition   string `json:"condition"`
	Substituted string `json:"substituted"`
	Result      bool   `json:"result"`
	BranchState string `json:"branchState"` // "IF_ACTIVE", "ELSE_ACTIVE", "ELIF_ACTIVE", "SKIPPED"
}

type LoopMetadata struct {
	LoopVar         string `json:"loopVar"`
	LoopValue       string `json:"loopValue"`
	Iteration       int    `json:"iteration"`
	TotalIterations int    `json:"totalIterations"`
	Condition       string `json:"condition"`
	Substituted     string `json:"substituted"`
	ConditionResult bool   `json:"conditionResult"`
	IsComplete      bool   `json:"isComplete"`
}

type ChangeDetail struct {
	VarName     string      `json:"varName"`
	Type        string      `json:"type"` // "created", "updated", "deleted", "element_added", "element_updated", "element_removed"
	TargetKey   interface{} `json:"targetKey,omitempty"`
	PrevValue   interface{} `json:"prevValue,omitempty"`
	NewValue    interface{} `json:"newValue,omitempty"`
	Description string      `json:"description"`
}

type ExecutionDiff struct {
	ChangedVars []string       `json:"changedVars"`
	Changes     []ChangeDetail `json:"changes"`
	Summary     string         `json:"summary"`
}

type StepExplanation struct {
	WhatHappened    string                 `json:"whatHappened"`
	WhyItHappened   string                 `json:"whyItHappened"`
	WhatChangedText string                 `json:"whatChangedText"`
	ValuesInvolved  map[string]interface{} `json:"valuesInvolved,omitempty"`
}

type RelationshipLink struct {
	From  string `json:"from"`
	Label string `json:"label"`
	To    string `json:"to"`
}

type CallStackFrame struct {
	FuncName  string                 `json:"funcName"`
	Line      int                    `json:"line"`
	Variables map[string]interface{} `json:"variables"`
}

type ExecutionStep struct {
	Line             int                    `json:"line"`
	Code             string                 `json:"code"`
	Variables        map[string]interface{} `json:"variables"`
	ScopeVars        map[string]interface{} `json:"scopeVars,omitempty"`
	CallStack        []CallStackFrame       `json:"callStack,omitempty"`
	Description      string                 `json:"description"`
	Output           string                 `json:"output"`
	Metadata         *StepMetadata          `json:"metadata,omitempty"`
	OperationType    string                 `json:"operationType,omitempty"`
	Diff             *ExecutionDiff         `json:"diff,omitempty"`
	Explanation      *StepExplanation       `json:"explanation,omitempty"`
	WhyDetails       string                 `json:"whyDetails,omitempty"`
	RelationshipFlow []RelationshipLink     `json:"relationshipFlow,omitempty"`
	IsError          bool                   `json:"isError,omitempty"`
	ErrorMessage     string                 `json:"errorMessage,omitempty"`
}



type ExecutionRequest struct {
	Code     string   `json:"code"`
	Language string   `json:"language"`
	Inputs   []string `json:"inputs"`
}

// ExecutionResponse represents the response payload
type ExecutionResponse struct {
	Steps []ExecutionStep `json:"steps"`
	Error string          `json:"error,omitempty"`
}

func main() {
	// Initialize Database
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	)
	
	// Wait for DB to be ready (retry a few times)
	var err error
	connected := false
	if os.Getenv("DB_HOST") != "" && os.Getenv("DB_HOST") != "localhost" {
		for i := 0; i < 3; i++ {
			db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
			if err == nil {
				connected = true
				log.Println("Connected to MySQL database")
				break
			}
			log.Printf("Failed to connect to MySQL (attempt %d/3): %v", i+1, err)
			time.Sleep(2 * time.Second)
		}
	}

	if !connected {
		log.Println("MySQL not available. Falling back to local SQLite database (codeflow.db)...")
		db, err = gorm.Open(sqlite.Open("codeflow.db"), &gorm.Config{})
		if err != nil {
			log.Fatal("Failed to initialize SQLite database:", err)
		}
	}

	initDB(db)

	// Initialize Gin router
	r := gin.Default()

	// Enable CORS
	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Auth & Execution routes
	r.POST("/register", register)
	r.POST("/login", login)
	r.POST("/execute", executeCode)

	// Protected routes
	auth := r.Group("/")
	auth.Use(authMiddleware())
	{
		auth.GET("/me", func(c *gin.Context) {
			userID := c.MustGet("user_id").(uint)
			var user User
			db.First(&user, userID)
			c.JSON(http.StatusOK, user)
		})
	}

	// Health check endpoint
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	// Start server
	port := ":8080"
	log.Printf("Server starting on port %s", port)
	log.Fatal(r.Run(port))
}

func executeCode(c *gin.Context) {
	var req ExecutionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ExecutionResponse{
			Error: "Invalid request format",
		})
		return
	}

	defer func() {
		if r := recover(); r != nil {
			c.JSON(http.StatusInternalServerError, ExecutionResponse{
				Error: fmt.Sprintf("Execution error: %v", r),
			})
		}
	}()

	// Validate input
	if strings.TrimSpace(req.Code) == "" {
		c.JSON(http.StatusBadRequest, ExecutionResponse{
			Error: "Code cannot be empty",
		})
		return
	}

	// Execute the code based on language
	var steps []ExecutionStep
	var err error

	switch strings.ToLower(req.Language) {
	case "java":
		steps, err = executeJava(req.Code, req.Inputs)
	case "c":
		steps, err = executeC(req.Code)
	case "python", "":
		steps, err = executePythonWithTracing(req.Code, req.Inputs)
	default:
		c.JSON(http.StatusBadRequest, ExecutionResponse{
			Error: "Unsupported language: " + req.Language,
		})
		return
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, ExecutionResponse{
			Error: fmt.Sprintf("Execution error: %v", err),
		})
		return
	}

	// Generate language-aware explanations for each step using generalized pipeline
	steps = ExplanationPipeline(steps, req.Language)

	// Return successful execution
	c.JSON(http.StatusOK, ExecutionResponse{
		Steps: steps,
	})
}

func formatValueForDescription(v interface{}) string {
	if v == nil {
		return "null"
	}
	switch val := v.(type) {
	case string:
		return fmt.Sprintf("'%s'", val)
	case map[string]interface{}:
		if t, ok := val["_type"].(string); ok {
			return fmt.Sprintf("instance of %s", t)
		}
		return "[Object]"
	case []interface{}:
		elems := make([]string, len(val))
		for i, elem := range val {
			elems[i] = formatValueForDescription(elem)
		}
		return "[" + strings.Join(elems, ", ") + "]"
	default:
		return fmt.Sprintf("%v", val)
	}
}

func generateDescriptions(steps []ExecutionStep) []ExecutionStep {
	return ExplanationPipeline(steps, "python")
}

func executeJava(code string, inputs []string) ([]ExecutionStep, error) {
	tmpDir, err := os.MkdirTemp("", "java_exec")
	if err != nil {
		return nil, err
	}
	defer os.RemoveAll(tmpDir)

	// Helper definitions
	javaStackHelper := `
class Stack<T> {
    public Object[] arr;
    public int top;
    public Stack() {
        this(10);
    }
    public Stack(int capacity) {
        arr = new Object[capacity];
        top = -1;
    }
    public void push(T val) {
        if (top < arr.length - 1) {
            top++;
            arr[top] = val;
        }
    }
    @SuppressWarnings("unchecked")
    public T pop() {
        if (top >= 0) {
            T val = (T) arr[top];
            arr[top] = null;
            top--;
            return val;
        }
        return null;
    }
    @SuppressWarnings("unchecked")
    public T peek() {
        if (top >= 0) {
            return (T) arr[top];
        }
        return null;
    }
    public boolean isEmpty() {
        return top == -1;
    }
    public int size() {
        return top + 1;
    }
}
`

	javaQueueHelper := `
class Queue<T> {
    public Object[] arr;
    public int front;
    public int rear;
    public int size;
    public Queue() {
        this(10);
    }
    public Queue(int capacity) {
        arr = new Object[capacity];
        front = 0;
        rear = -1;
        size = 0;
    }
    public void enqueue(T val) { add(val); }
    public void add(T val) { offer(val); }
    public void offer(T val) {
        if (size < arr.length) {
            rear = (rear + 1) % arr.length;
            arr[rear] = val;
            size++;
        }
    }
    @SuppressWarnings("unchecked")
    public T dequeue() { return poll(); }
    @SuppressWarnings("unchecked")
    public T remove() { return poll(); }
    @SuppressWarnings("unchecked")
    public T poll() {
        if (size > 0) {
            T val = (T) arr[front];
            arr[front] = null;
            front = (front + 1) % arr.length;
            size--;
            return val;
        }
        return null;
    }
    @SuppressWarnings("unchecked")
    public T peek() {
        if (size > 0) {
            return (T) arr[front];
        }
        return null;
    }
    public boolean isEmpty() {
        return size == 0;
    }
    public int size() {
        return size;
    }
}
`

	// Auto-inject helper classes if referenced but not defined/imported
	hasStackUse := regexp.MustCompile(`\bStack\b`).MatchString(code)
	hasStackDef := regexp.MustCompile(`\bclass\s+Stack\b`).MatchString(code) || 
		strings.Contains(code, "import java.util.Stack") || 
		strings.Contains(code, "import java.util.*;")

	if hasStackUse && !hasStackDef {
		code += "\n" + javaStackHelper
	}

	hasQueueUse := regexp.MustCompile(`\bQueue\b`).MatchString(code)
	hasQueueDef := regexp.MustCompile(`\bclass\s+Queue\b`).MatchString(code) || 
		strings.Contains(code, "import java.util.Queue") || 
		strings.Contains(code, "import java.util.LinkedList") || 
		strings.Contains(code, "import java.util.*;")

	if hasQueueUse && !hasQueueDef {
		code += "\n" + javaQueueHelper
	}

	// Extract public class name, or the class containing the main method, or use "Main"
	className := "Main"
	rePublic := regexp.MustCompile(`public\s+class\s+(\w+)`)
	matchesPublic := rePublic.FindStringSubmatch(code)
	if len(matchesPublic) > 1 {
		className = matchesPublic[1]
	} else {
		// Look for the class enclosing "public static void main"
		segments := strings.Split(code, "class ")
		for _, segment := range segments {
			if strings.Contains(segment, "public static void main") {
				fields := strings.Fields(segment)
				if len(fields) > 0 {
					name := fields[0]
					name = strings.Split(name, "<")[0] // Handle generics
					name = strings.Split(name, "{")[0] // Handle immediate brace
					className = strings.TrimSpace(name)
					break
				}
			}
		}
	}

	// Base64 encode the inputs
	inputsBase64 := base64.StdEncoding.EncodeToString([]byte(strings.Join(inputs, "\n") + "\n"))

	// Inject System.setIn at the start of the main method
	reMain := regexp.MustCompile(`(void\s+main\s*\([^)]*\)[^{]*\{)`)
	injectedCode := fmt.Sprintf(`System.setIn(new java.io.ByteArrayInputStream(java.util.Base64.getDecoder().decode("%s")));`, inputsBase64)
	code = reMain.ReplaceAllString(code, "$1 "+injectedCode)

	filePath := filepath.Join(tmpDir, className+".java")
	if err := os.WriteFile(filePath, []byte(code), 0644); err != nil {
		return nil, err
	}

	cmdCompile := exec.Command("javac", "-g", filePath)
	if out, err := cmdCompile.CombinedOutput(); err != nil {
		if len(out) == 0 {
			return nil, fmt.Errorf("Java compiler (javac) not found or failed to start: %v. Please verify that JDK is installed and added to your system environment PATH.", err)
		}
		return nil, fmt.Errorf("compile error: %s", string(out))
	}

	// Run normally to capture clean stdout/stderr
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	cmdRunNormal := exec.CommandContext(ctx, "java", "-cp", tmpDir, className)
	normalOutBytes, _ := cmdRunNormal.CombinedOutput()
	normalOut := string(normalOutBytes)

	// Write tracer script
	tracerScript := `
import subprocess
import sys
import json
import re

classpath = sys.argv[1]
class_name = sys.argv[2]
code_file = sys.argv[3]
original_line_count = int(sys.argv[4])

with open(code_file, 'r') as f:
    code_lines = f.readlines()

cmd = ["jdb", "-classpath", classpath, class_name]
p = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)

def read_until_prompt(expect_main=False):
    out = ""
    try:
        while True:
            if p.poll() is not None and not out:
                break
            c = p.stdout.read(1)
            if not c:
                break
            out += c
            if expect_main:
                if "main[" in out and out.endswith("] "):
                    break
                if "The application exited" in out or "application exited" in out:
                    break
            else:
                if out.endswith("> "):
                    break
    except Exception:
        pass
    return out

def send(c):
    if p.poll() is not None:
        return
    try:
        p.stdin.write(c + "\n")
        p.stdin.flush()
    except Exception:
        pass

def parse_primitive(x):
    try:
        return int(x)
    except:
        try:
            return float(x)
        except:
            if x.startswith('"') and x.endswith('"'):
                return x[1:-1]
            elif x == "true":
                return True
            elif x == "false":
                return False
            elif x == "null":
                return None
            else:
                return x

def dump_value(path, val_str, depth=0, visited=None):
    if visited is None:
        visited = set()
    if depth > 15:
        return val_str
    if "instance of" in val_str:
        # Extract object ID to prevent circular reference / infinite recursion
        id_match = re.search(r'\(id=(\d+)\)', val_str)
        if id_match:
            obj_id = id_match.group(1)
            if obj_id in visited:
                return f"<CircularReference id={obj_id}>"
            visited.add(obj_id)

        is_array = "[" in val_str and "]" in val_str
        
        send(f"dump {path}")
        dump_out = read_until_prompt(True)
        
        if is_array and ("Internal exception during operation:" in dump_out or "Cannot invoke" in dump_out):
            send(f"print {path}.length")
            len_out = read_until_prompt(True)
            len_match = re.search(r'=\s*(\d+)', len_out)
            if len_match:
                length = int(len_match.group(1))
                parsed_arr = []
                for i in range(length):
                    send(f"print {path}[{i}]")
                    elem_out = read_until_prompt(True)
                    elem_match = re.search(r'=\s*(.+)', elem_out)
                    if elem_match:
                        elem_val_str = elem_match.group(1).strip()
                        elem_val_str = elem_val_str.splitlines()[0].strip()
                        if elem_val_str == "null":
                            parsed_arr.append(None)
                        else:
                            parsed_arr.append(dump_value(f"{path}[{i}]", elem_val_str, depth + 1, visited.copy()))
                    else:
                        parsed_arr.append(None)
                return parsed_arr
            return val_str

        dump_lines = dump_out.splitlines()
        
        in_braces = False
        lines_inside = []
        for dl in dump_lines:
            dl_stripped = dl.strip()
            if dl_stripped == "{" or (path in dl_stripped and "{" in dl_stripped):
                in_braces = True
                continue
            if in_braces and dl_stripped == "}":
                break
            if in_braces:
                lines_inside.append(dl_stripped)
                
        if not in_braces:
            return val_str
            
        if is_array:
            arr_vals = []
            for l in lines_inside:
                arr_vals.extend([x.strip() for x in l.split(",") if x.strip()])
            parsed_arr = []
            for x in arr_vals:
                parsed_arr.append(parse_primitive(x))
            return parsed_arr
        else:
            obj_dict = {}
            class_match = re.search(r'instance of ([\w\.\$]+)', val_str)
            if class_match:
                obj_dict["_type"] = class_match.group(1)
            
            # Inject JDB object reference ID
            if id_match:
                obj_dict["_id"] = id_match.group(1)
            
            for l in lines_inside:
                if ":" in l:
                    parts = l.split(":", 1)
                    f_name = parts[0].strip()
                    f_val = parts[1].strip()
                    
                    clean_f_name = f_name.split('.')[-1]
                    if "instance of" in f_val:
                        obj_dict[f_name] = dump_value(f"{path}.{clean_f_name}", f_val, depth + 1, visited.copy())
                    else:
                        obj_dict[f_name] = parse_primitive(f_val)
            return obj_dict
    else:
        return parse_primitive(val_str)

read_until_prompt(False)
send(f"stop in {class_name}.main")
read_until_prompt(False)
send("run")

steps = []

out = read_until_prompt(True)
while "The application exited" not in out and p.poll() is None:
    line_no = None
    line_match = re.search(r'line=(\d+)', out)
    if line_match:
        line_no = int(line_match.group(1))

    send("locals")
    locals_out = read_until_prompt(True)
    
    variables = {}
    lines = locals_out.splitlines()
    for l in lines:
        if "=" in l and not l.startswith("Method arguments:") and not l.startswith("Local variables:") and not l.startswith("main["):
            parts = l.split("=", 1)
            var_name = parts[0].strip()
            var_val = parts[1].strip()
            variables[var_name] = dump_value(var_name, var_val, 0)
    
    if line_no is not None and line_no <= original_line_count:
        code_str = code_lines[line_no-1].strip() if 1 <= line_no <= len(code_lines) else f"Line {line_no}"
        if not steps or steps[-1]['line'] != line_no or steps[-1]['variables'] != variables:
            steps.append({
                "line": line_no,
                "code": code_str,
                "variables": variables
            })
            
    send("step")
    out = read_until_prompt(True)

send("quit")

if not steps:
    steps.append({
        "line": 1,
        "code": code_lines[0].strip() if code_lines else "public class Example",
        "variables": {}
    })

print("EXECUTION_STEPS:")
print(json.dumps(steps, indent=2))
`
	tracerPath := filepath.Join(tmpDir, "tracer.py")
	if err := os.WriteFile(tracerPath, []byte(tracerScript), 0644); err != nil {
		return nil, err
	}

	return generateJavaFallbackSteps(code, normalOut), nil
}

func generateJavaFallbackSteps(code string, normalOut string) []ExecutionStep {
	lines := strings.Split(code, "\n")
	var steps []ExecutionStep
	variables := make(map[string]interface{})

	outputLines := strings.Split(strings.TrimRight(normalOut, "\r\n"), "\n")
	outIdx := 0

	i := 0
	for i < len(lines) {
		lineNo := i + 1
		trimmed := strings.TrimSpace(lines[i])

		if trimmed == "" || strings.HasPrefix(trimmed, "//") || strings.HasPrefix(trimmed, "/*") ||
			strings.HasPrefix(trimmed, "*") || strings.HasPrefix(trimmed, "import ") ||
			strings.HasPrefix(trimmed, "package ") || trimmed == "}" || trimmed == "{" ||
			strings.HasPrefix(trimmed, "public class ") || strings.HasPrefix(trimmed, "class ") ||
			strings.HasPrefix(trimmed, "public static void main") {
			i++
			continue
		}

		// Check for for loop e.g. for (int i = 0; i < n; i++)
		if reFor := regexp.MustCompile(`for\s*\(\s*int\s+(\w+)\s*=\s*(\d+)\s*;\s*(\w+)\s*<\s*(\w+|\d+)\s*;\s*[^)]+\)`); reFor.MatchString(trimmed) {
			match := reFor.FindStringSubmatch(trimmed)
			loopVar := match[1]
			startVal, _ := strconv.Atoi(match[2])
			limitStr := match[4]

			limitVal := 0
			if v, err := strconv.Atoi(limitStr); err == nil {
				limitVal = v
			} else if v, ok := variables[limitStr].(int); ok {
				limitVal = v
			} else if arr, ok := variables[limitStr].([]interface{}); ok {
				limitVal = len(arr)
			}

			var bodyLines []int
			depth := 0
			if strings.Contains(trimmed, "{") {
				depth = 1
			}
			j := i + 1
			for j < len(lines) {
				t := strings.TrimSpace(lines[j])
				if strings.Contains(t, "{") {
					depth++
				}
				if strings.Contains(t, "}") {
					depth--
					if depth <= 0 {
						break
					}
				}
				if depth > 0 && t != "" && !strings.HasPrefix(t, "//") {
					bodyLines = append(bodyLines, j)
				}
				j++
			}

			maxIter := limitVal - startVal
			if maxIter > 20 {
				maxIter = 20
			}
			if maxIter < 0 {
				maxIter = 0
			}

			for iter := 0; iter < maxIter; iter++ {
				currVal := startVal + iter
				variables[loopVar] = currVal

				stepVarsHeader := make(map[string]interface{})
				for k, v := range variables {
					stepVarsHeader[k] = v
				}
				currOutHeader := ""
				if len(steps) > 0 {
					currOutHeader = steps[len(steps)-1].Output
				}
				steps = append(steps, ExecutionStep{
					Line:      lineNo,
					Code:      trimmed,
					Variables: stepVarsHeader,
					Output:    currOutHeader,
				})

				for _, bIdx := range bodyLines {
					bLineNo := bIdx + 1
					bTrimmed := strings.TrimSpace(lines[bIdx])

					stepVarsBody := make(map[string]interface{})
					for k, v := range variables {
						stepVarsBody[k] = v
					}

					currOutBody := ""
					if strings.Contains(bTrimmed, "System.out.print") {
						if outIdx < len(outputLines) {
							currOutBody = strings.Join(outputLines[:outIdx+1], "\n")
							outIdx++
						} else {
							currOutBody = normalOut
						}
					} else if len(steps) > 0 {
						currOutBody = steps[len(steps)-1].Output
					}

					steps = append(steps, ExecutionStep{
						Line:      bLineNo,
						Code:      bTrimmed,
						Variables: stepVarsBody,
						Output:    currOutBody,
					})
				}
			}

			if j > i {
				i = j + 1
			} else {
				i++
			}
			continue
		}

		// Single statement
		if reArr := regexp.MustCompile(`(?:int|double|float|String|char|long|boolean)\[\]\s+(\w+)\s*=\s*(?:new\s+(?:int|double|float|String|char|long|boolean)\[\]\s*)?\{([^}]+)\}`); reArr.MatchString(trimmed) {
			match := reArr.FindStringSubmatch(trimmed)
			varName := match[1]
			rawVals := strings.Split(match[2], ",")
			var parsedArr []interface{}
			for _, v := range rawVals {
				v = strings.TrimSpace(v)
				v = strings.Trim(v, `"`)
				v = strings.Trim(v, `'`)
				if intVal, err := strconv.Atoi(v); err == nil {
					parsedArr = append(parsedArr, intVal)
				} else {
					parsedArr = append(parsedArr, v)
				}
			}
			variables[varName] = parsedArr
		} else if reVar := regexp.MustCompile(`(?:int|double|float|String|boolean|long|char)\s+(\w+)\s*=\s*(.+?);`); reVar.MatchString(trimmed) {
			match := reVar.FindStringSubmatch(trimmed)
			varName := match[1]
			expr := strings.TrimSpace(match[2])
			if strings.HasSuffix(expr, ".length") {
				arrName := strings.TrimSuffix(expr, ".length")
				if arr, ok := variables[arrName].([]interface{}); ok {
					variables[varName] = len(arr)
				}
			} else if intVal, err := strconv.Atoi(strings.TrimSuffix(expr, "L")); err == nil {
				variables[varName] = intVal
			} else if floatVal, err := strconv.ParseFloat(expr, 64); err == nil {
				variables[varName] = floatVal
			} else if expr == "true" || expr == "false" {
				variables[varName] = (expr == "true")
			} else if len(expr) >= 3 && expr[0] == '\'' && expr[len(expr)-1] == '\'' {
				variables[varName] = string(expr[1])
			} else {
				variables[varName] = evaluateSimpleExpr(expr, variables)
			}
		}

		stepVars := make(map[string]interface{})
		for k, v := range variables {
			stepVars[k] = v
		}

		currentOut := ""
		if strings.Contains(trimmed, "System.out.print") {
			if outIdx < len(outputLines) {
				currentOut = strings.Join(outputLines[:outIdx+1], "\n")
				outIdx++
			} else {
				currentOut = normalOut
			}
		} else if len(steps) > 0 {
			currentOut = steps[len(steps)-1].Output
		}

		steps = append(steps, ExecutionStep{
			Line:      lineNo,
			Code:      trimmed,
			Variables: stepVars,
			Output:    currentOut,
		})

		i++
	}

	if len(steps) == 0 {
		steps = append(steps, ExecutionStep{
			Line:      1,
			Code:      "Execution Completed",
			Variables: map[string]interface{}{},
			Output:    normalOut,
		})
	} else {
		steps[len(steps)-1].Output = normalOut
	}

	return steps
}

func executeC(code string) ([]ExecutionStep, error) {
	tmpDir, err := os.MkdirTemp("", "c_exec")
	if err != nil {
		return nil, err
	}
	defer os.RemoveAll(tmpDir)

	filePath := filepath.Join(tmpDir, "main.c")
	if err := os.WriteFile(filePath, []byte(code), 0644); err != nil {
		return nil, err
	}

	outPath := filepath.Join(tmpDir, "main")
	if os.PathSeparator == '\\' {
		outPath += ".exe"
	}

	cmdCompile := exec.Command("gcc", "-o", outPath, filePath)
	if out, err := cmdCompile.CombinedOutput(); err != nil {
		if len(out) == 0 {
			return nil, fmt.Errorf("GCC compiler (gcc) not found or failed to start: %v. Please make sure MinGW/GCC is installed and added to your system environment PATH.", err)
		}
		return nil, fmt.Errorf("compile error: %s", string(out))
	}

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	cmdRun := exec.CommandContext(ctx, outPath)
	out, err := cmdRun.CombinedOutput()
	if err != nil {
		return nil, fmt.Errorf("runtime error: %s", string(out))
	}

	return []ExecutionStep{
		{
			Line: 1,
			Code: "Execution Completed",
			Variables: map[string]interface{}{
				"Output": string(out),
			},
			Output: string(out),
		},
	}, nil
}

func evaluateSimpleExpr(expr string, variables map[string]interface{}) interface{} {
	expr = strings.TrimSpace(expr)
	if strings.HasPrefix(expr, `"`) && strings.HasSuffix(expr, `"`) {
		return strings.Trim(expr, `"`)
	}
	opRegex := regexp.MustCompile(`^(\w+)\s*([+\-*])\s*(\w+)$`)
	if opRegex.MatchString(expr) {
		m := opRegex.FindStringSubmatch(expr)
		leftStr, op, rightStr := m[1], m[2], m[3]

		getVal := func(s string) (int, bool) {
			if v, err := strconv.Atoi(s); err == nil {
				return v, true
			}
			if v, ok := variables[s].(int); ok {
				return v, true
			}
			return 0, false
		}

		leftVal, ok1 := getVal(leftStr)
		rightVal, ok2 := getVal(rightStr)
		if ok1 && ok2 {
			switch op {
			case "+":
				return leftVal + rightVal
			case "-":
				return leftVal - rightVal
			case "*":
				return leftVal * rightVal
			}
		}
	}
	return strings.Trim(expr, `"`)
}

var cachedPythonCmd string

func getPythonCmd() string {
	if cachedPythonCmd != "" {
		return cachedPythonCmd
	}
	candidates := []string{"python", "py", "python3"}
	for _, cand := range candidates {
		cmd := exec.Command(cand, "--version")
		if err := cmd.Run(); err == nil {
			cachedPythonCmd = cand
			return cand
		}
	}
	cachedPythonCmd = "python"
	return cachedPythonCmd
}

func executePythonWithTracing(code string, inputs []string) ([]ExecutionStep, error) {
	// Base64 encode the code to safely pass it to Python
	codeBase64 := base64.StdEncoding.EncodeToString([]byte(code))
	inputsBase64 := base64.StdEncoding.EncodeToString([]byte(strings.Join(inputs, "\n") + "\n"))

	// Create a robust tracer script
	tracerScript := fmt.Sprintf(`
import sys
import json
import traceback
import base64
import copy
import io

class Stack:
    def __init__(self, capacity=10):
        self.arr = [None] * capacity
        self.top = -1

    def push(self, val):
        if self.top >= len(self.arr) - 1:
            self.arr.extend([None] * max(len(self.arr), 10))
        self.top += 1
        self.arr[self.top] = val

    def pop(self):
        if self.top >= 0:
            val = self.arr[self.top]
            self.arr[self.top] = None
            self.top -= 1
            return val
        return None

    def peek(self):
        if self.top >= 0:
            return self.arr[self.top]
        return None

    def is_empty(self):
        return self.top == -1

    def size(self):
        return self.top + 1

class Queue:
    def __init__(self, capacity=10):
        self.arr = [None] * capacity
        self.front = 0
        self.rear = -1
        self._size = 0

    def enqueue(self, val):
        self.add(val)

    def add(self, val):
        self.offer(val)

    def offer(self, val):
        if self._size >= len(self.arr):
            new_capacity = len(self.arr) * 2 if len(self.arr) > 0 else 10
            new_arr = [None] * new_capacity
            for i in range(self._size):
                new_arr[i] = self.arr[(self.front + i) %% len(self.arr)]
            self.arr = new_arr
            self.front = 0
            self.rear = self._size - 1
        self.rear = (self.rear + 1) %% len(self.arr)
        self.arr[self.rear] = val
        self._size += 1

    def dequeue(self):
        return self.poll()

    def remove(self):
        return self.poll()

    def poll(self):
        if self._size > 0:
            val = self.arr[self.front]
            self.arr[self.front] = None
            self.front = (self.front + 1) %% len(self.arr)
            self._size -= 1
            return val
        return None

    def peek(self):
        if self._size > 0:
            return self.arr[self.front]
        return None

    def is_empty(self):
        return self._size == 0

    def size(self):
        return self._size

# Decode the user code
user_code = base64.b64decode("%s").decode('utf-8')
code_lines = user_code.splitlines()

# Redirect stdout to capture print statements
original_stdout = sys.stdout
stdout_buffer = io.StringIO()
sys.stdout = stdout_buffer

# Redirect stdin to feed inputs
sys.stdin = io.StringIO(base64.b64decode("%s").decode('utf-8'))

# Custom input function to prevent EOFError when inputs run out
_original_input = input
def custom_input(prompt=""):
    try:
        return _original_input(prompt)
    except Exception:
        return ""

import builtins
builtins.input = custom_input

steps = []
# Internal variables to exclude from tracking
INTERNAL_VARS = {'sys', 'json', 'traceback', 'base64', 'copy', 'user_code', 'code_lines', 'steps', 'INTERNAL_VARS', 'trace_function', 'serialize_obj', 'io', 'original_stdout', 'stdout_buffer', 'Stack', 'Queue', 'builtins', '_original_input', 'custom_input', 'OBJECT_ID_MAP', 'TYPE_COUNTERS', 'get_stable_id'}

OBJECT_ID_MAP = {}
TYPE_COUNTERS = {}

def get_stable_id(obj):
    raw_id = id(obj)
    if raw_id in OBJECT_ID_MAP:
        return OBJECT_ID_MAP[raw_id]
    tname = type(obj).__name__
    count = TYPE_COUNTERS.get(tname, 0) + 1
    TYPE_COUNTERS[tname] = count
    stable_id = f"{tname}#{count}"
    OBJECT_ID_MAP[raw_id] = stable_id
    return stable_id

def serialize_obj(obj, visited=None):
    if visited is None:
        visited = set()
        
    if obj is None or isinstance(obj, (int, float, str, bool)):
        return obj
        
    obj_id = id(obj)
    if obj_id in visited:
        return f"<CircularReference {get_stable_id(obj)}>"
    visited.add(obj_id)
    
    if isinstance(obj, (list, tuple)):
        return [serialize_obj(item, visited.copy()) for item in obj]
        
    if isinstance(obj, set):
        return [serialize_obj(item, visited.copy()) for item in obj]
        
    if isinstance(obj, dict):
        return {str(k): serialize_obj(v, visited.copy()) for k, v in obj.items()}
        
    import collections
    if isinstance(obj, collections.deque):
        return [serialize_obj(item, visited.copy()) for item in obj]
        
    if hasattr(obj, '__dict__'):
        d = {}
        for k, v in obj.__dict__.items():
            if not k.startswith('__'):
                try:
                    d[k] = serialize_obj(v, visited.copy())
                except Exception:
                    d[k] = str(v)
        d['_type'] = type(obj).__name__
        d['_id'] = get_stable_id(obj)
        return d
        
    return str(obj)

def trace_function(frame, event, arg):
    if event in ('line', 'return'):
        line_no = frame.f_lineno
        filename = frame.f_code.co_filename
        
        if filename == '<string>':
            local_vars = {}
            # Merge globals and locals to preserve global state during function calls
            all_vars = {**frame.f_globals, **frame.f_locals}
            for key, value in all_vars.items():
                if key not in INTERNAL_VARS and not key.startswith('__') and type(value).__name__ not in ('module', 'function', 'type'):
                    try:
                        local_vars[key] = serialize_obj(value)
                    except Exception:
                        local_vars[key] = str(value)
            
            call_stack = []
            curr_frame = frame
            while curr_frame:
                if curr_frame.f_code.co_filename == '<string>':
                    func_name = curr_frame.f_code.co_name
                    if func_name == '<module>':
                        func_name = 'main'
                        
                    f_locals = {}
                    for k, v in curr_frame.f_locals.items():
                        if k not in INTERNAL_VARS and not k.startswith('__') and type(v).__name__ not in ('module', 'function', 'type'):
                            try:
                                f_locals[k] = serialize_obj(v)
                            except Exception:
                                f_locals[k] = str(v)
                    call_stack.append({
                        'funcName': func_name,
                        'line': curr_frame.f_lineno,
                        'variables': f_locals
                    })
                curr_frame = curr_frame.f_back
            call_stack.reverse()

            # Get the line content
            line_content = ""
            if 1 <= line_no <= len(code_lines):
                line_content = code_lines[line_no - 1].strip()
            else:
                line_content = f"Line {line_no}"
                
            if event == 'return':
                line_content = "Execution Completed"
            
            # Capture the current standard output printed so far
            current_output = stdout_buffer.getvalue()
            scope_vars = call_stack[-1]['variables'] if call_stack else {}
            
            # Add step if it's different from the last one or has different variables/output
            if not steps or steps[-1]['line'] != line_no or steps[-1]['variables'] != local_vars or steps[-1].get('output') != current_output or event == 'return':
                if steps and event == 'return' and steps[-1]['variables'] == local_vars and steps[-1].get('output') == current_output:
                    pass
                else:
                    steps.append({
                        'line': line_no,
                        'code': line_content,
                        'variables': local_vars,
                        'scopeVars': scope_vars,
                        'callStack': call_stack,
                        'output': current_output
                    })
    return trace_function

sys.settrace(trace_function)

try:
    exec(user_code, {"Stack": Stack, "Queue": Queue, "__name__": "__main__"})
except Exception as e:
    sys.stdout = original_stdout
    print(f"EXECUTION_ERROR: {str(e)}")
    traceback.print_exc()

sys.stdout = original_stdout
print("EXECUTION_STEPS:")
print(json.dumps(steps, indent=2))
`, codeBase64, inputsBase64)
	
	// Create a temporary directory to store python tracer script
	tmpDir, err := os.MkdirTemp("", "py_exec")
	if err != nil {
		return nil, err
	}
	defer os.RemoveAll(tmpDir)

	tracerPath := filepath.Join(tmpDir, "tracer.py")
	if err := os.WriteFile(tracerPath, []byte(tracerScript), 0644); err != nil {
		return nil, err
	}

	// Execute Python with timeout
	cmd := exec.Command(getPythonCmd(), tracerPath)
	
	// Set up timeout
	timeout := 3 * time.Second
	
	// Create a channel to receive the result
	resultChan := make(chan []ExecutionStep, 1)
	errorChan := make(chan error, 1)
	
	go func() {
		output, err := cmd.CombinedOutput()
		if err != nil {
			errorChan <- fmt.Errorf("Python execution failed: %v\nOutput: %s", err, string(output))
			return
		}
		
		// Parse the output to extract execution steps
		steps, parseErr := parseExecutionOutput(string(output))
		if parseErr != nil {
			errorChan <- parseErr
			return
		}
		
		resultChan <- steps
	}()
	
	// Wait for result or timeout
	select {
	case steps := <-resultChan:
		return steps, nil
	case err := <-errorChan:
		return nil, err
	case <-time.After(timeout):
		// Kill the process if it's still running
		if cmd.Process != nil {
			cmd.Process.Kill()
		}
		return nil, fmt.Errorf("execution timeout after %v", timeout)
	}
}

func parseExecutionOutput(output string) ([]ExecutionStep, error) {
	// Look for the execution steps in the output
	lines := strings.Split(output, "\n")
	
	var stepsJSON strings.Builder
	capturing := false
	
	for _, line := range lines {
		line = strings.TrimSpace(line)
		if strings.Contains(line, "EXECUTION_ERROR:") {
			return nil, fmt.Errorf("Python execution error: %s", strings.TrimPrefix(line, "EXECUTION_ERROR:"))
		}
		
		if line == "EXECUTION_STEPS:" {
			capturing = true
			continue
		}
		
		if capturing {
			stepsJSON.WriteString(line + "\n")
		}
	}
	
	if !capturing {
		return nil, fmt.Errorf("no execution steps found in output")
	}
	
	// Parse the JSON
	var steps []ExecutionStep
	if err := json.Unmarshal([]byte(stepsJSON.String()), &steps); err != nil {
		return nil, fmt.Errorf("failed to parse execution steps: %v", err)
	}
	
	return steps, nil
}

func stripComments(code string, lang string) string {
	var sb strings.Builder
	inSingleQuote := false
	inDoubleQuote := false
	escaped := false

	runes := []rune(code)
	for i := 0; i < len(runes); i++ {
		r := runes[i]
		
		if escaped {
			sb.WriteRune(r)
			escaped = false
			continue
		}
		
		if r == '\\' {
			sb.WriteRune(r)
			if inSingleQuote || inDoubleQuote {
				escaped = true
			}
			continue
		}
		
		if r == '\'' && !inDoubleQuote {
			inSingleQuote = !inSingleQuote
			sb.WriteRune(r)
			continue
		}
		
		if r == '"' && !inSingleQuote {
			inDoubleQuote = !inDoubleQuote
			sb.WriteRune(r)
			continue
		}
		
		// If we are not inside a string literal, check for comment start
		if !inSingleQuote && !inDoubleQuote {
			if lang == "python" && r == '#' {
				break
			}
			if lang == "java" {
				if r == '/' && i+1 < len(runes) && runes[i+1] == '/' {
					break
				}
				if r == '/' && i+1 < len(runes) && runes[i+1] == '*' {
					foundEnd := false
					for j := i + 2; j+1 < len(runes); j++ {
						if runes[j] == '*' && runes[j+1] == '/' {
							i = j + 1
							foundEnd = true
							break
						}
					}
					if foundEnd {
						continue
					}
				}
			}
		}
		
		sb.WriteRune(r)
	}
	return strings.TrimSpace(sb.String())
}

func enrichSteps(steps []ExecutionStep, language string) []ExecutionStep {
	return ExplanationPipeline(steps, language)
}


