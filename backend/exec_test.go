package main

import (
	"testing"
)

func TestExecutePythonSimple(t *testing.T) {
	code := `x = 5
y = 10
z = x + y
print(z)`
	steps, err := executePythonWithTracing(code, nil)
	if err != nil {
		t.Fatalf("Python execution error: %v", err)
	}
	t.Logf("Python steps count: %d", len(steps))
}

func TestExecutePythonWithInput(t *testing.T) {
	code := `name = input("Enter name: ")
print(f"Hello {name}")`
	steps, err := executePythonWithTracing(code, []string{"Alice"})
	if err != nil {
		t.Fatalf("Python with input error: %v", err)
	}
	t.Logf("Python with input steps count: %d", len(steps))
}

func TestExecutePythonWithStackQueue(t *testing.T) {
	code := `s = Stack()
s.push(10)
s.push(20)
val = s.pop()`
	steps, err := executePythonWithTracing(code, nil)
	if err != nil {
		t.Fatalf("Python Stack error: %v", err)
	}
	t.Logf("Python Stack steps count: %d", len(steps))
}

func TestExecutePythonRuntimeError(t *testing.T) {
	code := `x = 10 / 0`
	_, err := executePythonWithTracing(code, nil)
	if err == nil {
		t.Fatalf("Expected Python error for division by zero, got nil")
	}
	t.Logf("Python runtime error caught: %v", err)
}

func TestExecuteJavaSimple(t *testing.T) {
	code := `public class Main {
    public static void main(String[] args) {
        int x = 5;
        int y = 10;
        int z = x + y;
        System.out.println(z);
    }
}`
	steps, err := executeJava(code, nil)
	if err != nil {
		t.Fatalf("Java execution error: %v", err)
	}
	t.Logf("Java steps count: %d", len(steps))
}

func TestExecuteJavaWithScanner(t *testing.T) {
	code := `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        System.out.println("Num is " + num);
    }
}`
	steps, err := executeJava(code, []string{"42"})
	if err != nil {
		t.Fatalf("Java with Scanner error: %v", err)
	}
	t.Logf("Java with Scanner steps count: %d", len(steps))
}

func TestExecuteJavaCustomClassName(t *testing.T) {
	code := `public class Solution {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}`
	steps, err := executeJava(code, nil)
	if err != nil {
		t.Fatalf("Java custom class name error: %v", err)
	}
	t.Logf("Java custom class steps count: %d", len(steps))
}

func TestExecuteJavaMainWithThrows(t *testing.T) {
	code := `import java.util.Scanner;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(System.in);
        int val = sc.nextInt();
        System.out.println("Val: " + val);
    }
}`
	steps, err := executeJava(code, []string{"100"})
	if err != nil {
		t.Fatalf("Java main with throws error: %v", err)
	}
	if len(steps) == 0 || steps[len(steps)-1].Output == "" {
		t.Fatalf("Expected output 'Val: 100', got steps: %v", steps)
	}
	t.Logf("Java main with throws output: %q", steps[len(steps)-1].Output)
}

func TestExecuteJavaPackage(t *testing.T) {
	code := `package com.example;

public class Main {
    public static void main(String[] args) {
        System.out.println("Package test");
    }
}`
	steps, err := executeJava(code, nil)
	if err != nil {
		t.Fatalf("Java package error: %v", err)
	}
	t.Logf("Java package steps count: %d", len(steps))
}

func TestExecuteJavaDataStructures(t *testing.T) {
	code := `import java.util.*;

public class Main {
    public static void main(String[] args) {
        int[] arr = new int[]{1, 2, 3};
        long big = 1000L;
        char c = 'A';
        boolean flag = true;
        String s = "hello";
        int a = 5;
        int b = 10;
        int cVal = a + b;
        System.out.println(cVal);
    }
}`
	steps, err := executeJava(code, nil)
	if err != nil {
		t.Fatalf("Java data structures error: %v", err)
	}
	t.Logf("Java data structures steps count: %d", len(steps))
	for i, step := range steps {
		t.Logf("Step %d: Line %d (%s) - Vars: %v", i, step.Line, step.Code, step.Variables)
	}
}

func TestExecutePythonSetAndCustomObj(t *testing.T) {
	code := `s = {1, 2, 3}
class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

n1 = Node(10)
n2 = Node(20)
n1.next = n2
print(n1.val)`
	steps, err := executePythonWithTracing(code, nil)
	if err != nil {
		t.Fatalf("Python set/custom object error: %v", err)
	}
	t.Logf("Python set/custom obj steps count: %d", len(steps))
}

func TestExecutePythonPromptExample(t *testing.T) {
	code := `arr = [10, 20, 30]
arr.append(40)
arr.append(50)
arr[1] = 99
count = len(arr)`
	steps, err := executePythonWithTracing(code, nil)
	if err != nil {
		t.Fatalf("Python prompt example execution error: %v", err)
	}
	steps = generateDescriptions(steps)
	steps = enrichSteps(steps, "python")

	t.Logf("Prompt Example Total Steps: %d", len(steps))
	for i, st := range steps {
		t.Logf("--- STEP %d (Line %d: %s) ---", i+1, st.Line, st.Code)
		t.Logf("OperationType: %s", st.OperationType)
		t.Logf("Variables: %v", st.Variables)
		if st.Diff != nil {
			t.Logf("Diff Summary: %s", st.Diff.Summary)
		}
		if st.Explanation != nil {
			t.Logf("WhatHappened: %s", st.Explanation.WhatHappened)
			t.Logf("WhyItHappened: %s", st.Explanation.WhyItHappened)
		}
		t.Logf("WhyDetails: %s", st.WhyDetails)
	}

	if len(steps) < 5 {
		t.Fatalf("Expected at least 5 execution steps, got %d", len(steps))
	}
}

func TestExecutePythonEmptyInputs(t *testing.T) {
	code := `x = input()
print(x)`
	steps, err := executePythonWithTracing(code, nil)
	if err != nil {
		t.Fatalf("Python empty inputs error: %v", err)
	}
	t.Logf("Python empty inputs steps count: %d", len(steps))
}
