import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Home, Zap, Layers, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MonacoEditor from '../components/MonacoEditor';
import VisualizationPanel from '../components/VisualizationPanel';
import Controls from '../components/Controls';
import ExecutionTimeline from '../components/ExecutionTimeline';
import { ExecutionStep } from '../types';
import { executeCode } from '../api';
import { enrichStepClientSide } from '../utils/diffEngine';
import { InputCollectionModal } from '../components/InputCollectionModal';
import CodeFlowLogo from '../components/CodeFlowLogo';

const detectInputsInCode = (codeText: string, lang: string): string[] => {
  const prompts: string[] = [];
  if (lang === 'python') {
    const regex = /(?:input|raw_input)\s*\(\s*(?:['"](.*?)['"])?\s*\)/g;
    let match;
    while ((match = regex.exec(codeText)) !== null) {
      prompts.push(match[1] || 'Enter Python input:');
    }
  } else if (lang === 'java') {
    const scannerRegex = /\.(next|nextLine|nextInt|nextDouble|nextFloat|nextLong|nextShort|nextBoolean|read|readLine)\s*\(/g;
    const consoleRegex = /System\.console\(\)\.read/g;
    let match;
    let count = 0;
    while ((match = scannerRegex.exec(codeText)) !== null) {
      count++;
    }
    while ((match = consoleRegex.exec(codeText)) !== null) {
      count++;
    }

    const printRegex = /System\.out\.print(?:ln)?\s*\(\s*["'](.*?)["']\s*\)/g;
    const printMatches: string[] = [];
    while ((match = printRegex.exec(codeText)) !== null) {
      printMatches.push(match[1]);
    }

    for (let i = 0; i < count; i++) {
      prompts.push(printMatches[i] || `Enter Java input #${i + 1}:`);
    }
  }
  return prompts;
};

const Playground: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCode = searchParams.get('code') || `# 3D Array Visualization Example
# 1. Create an initial array
arr = [10, 20, 30]

# 2. Add elements to the array
arr.append(40)
arr.append(50)

# 3. Modify an existing element
arr[1] = 99

# 4. Create another variable
count = len(arr)`;

  const [code, setCode] = useState<string>(initialCode);
  const [language, setLanguage] = useState<string>('python');
  const [steps, setSteps] = useState<ExecutionStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isTimelineOpen, setIsTimelineOpen] = useState<boolean>(true);

  // Input Collection States
  const [isInputModalOpen, setIsInputModalOpen] = useState<boolean>(false);
  const [inputPrompts, setInputPrompts] = useState<string[]>([]);

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const runExecution = async (collectedInputs: string[] = []) => {
    setIsLoading(true);
    setError(null);
    setSteps([]);
    setCurrentStepIndex(-1);

    try {
      const result = await executeCode(code, language, collectedInputs);
      if (result.error) {
        setError(result.error);
      } else {
        const enriched = enrichStepClientSide(result.steps || [], language);
        setSteps(enriched);
        setCurrentStepIndex(0);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRun = () => {
    const prompts = detectInputsInCode(code, language);
    if (prompts.length > 0) {
      setInputPrompts(prompts);
      setIsInputModalOpen(true);
    } else {
      runExecution([]);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleSelectStep = (index: number) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStepIndex(index);
    }
  };

  const currentStep = currentStepIndex >= 0 ? steps[currentStepIndex] : null;

  const EXAMPLES: Record<string, string> = {
    python: `# Binary Search Tree (BST) Execution Example
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def insert(root, val):
    if root is None:
        return TreeNode(val)
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root

# 1. Build BST root & subtrees
root = TreeNode(50)
root = insert(root, 30)
root = insert(root, 70)
root = insert(root, 40)

# 2. Search key in BST
def search(node, target):
    if node is None or node.val == target:
        return node
    if target < node.val:
        return search(node.left, target)
    return search(node.right, target)

found = search(root, 40)`,
    java: `public class Example {
    static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;
        TreeNode(int val) {
            this.val = val;
        }
    }

    public static TreeNode insert(TreeNode root, int val) {
        if (root == null) return new TreeNode(val);
        if (val < root.val) {
            root.left = insert(root.left, val);
        } else {
            root.right = insert(root.right, val);
        }
        return root;
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(50);
        root = insert(root, 30);
        root = insert(root, 70);
        root = insert(root, 40);
    }
}`
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setCode(EXAMPLES[newLang] || "");
    setSteps([]);
    setCurrentStepIndex(-1);
    setError(null);
  };

  const [splitWidth, setSplitWidth] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - containerRect.left;
      const newWidthPercent = (relativeX / containerRect.width) * 100;
      // Clamp between 25% and 75%
      const clampedPercent = Math.max(25, Math.min(75, newWidthPercent));
      setSplitWidth(clampedPercent);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="h-screen bg-[#020617] flex flex-col select-none">
      {/* Header */}
      <header className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-[#020617] relative z-20">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white" title="Go to Home">
            <Home className="w-5 h-5" />
          </Link>
          <div className="w-px h-6 bg-white/10" />
          <Link to="/dashboard" className="p-2 hover:bg-white/5 rounded-lg transition-colors group text-gray-400 hover:text-white" title="Back to Dashboard">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </Link>
          <div className="flex items-center gap-2">
            <CodeFlowLogo variant="icon" size={30} />
            <span className="font-bold tracking-tight text-white text-base hidden sm:inline">
              Code<span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Flow</span>
              <span className="text-blue-400 font-semibold ml-2 text-xs uppercase tracking-wider">Playground</span>
            </span>
          </div>
        </div>
        
        {/* Center Execution Controls */}
        <div className="flex items-center justify-center">
          <Controls
            onRun={handleRun}
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
            isLoading={isLoading}
            hasSteps={steps.length > 0}
            currentStepIndex={currentStepIndex}
            totalSteps={steps.length}
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <select 
            value={language} 
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-200 focus:outline-none cursor-pointer hover:bg-white/10 hover:text-white transition-colors"
          >
            <option value="python" className="bg-[#020617] text-white">Python 3</option>
            <option value="java" className="bg-[#020617] text-white">Java 17</option>
          </select>

          <button
            onClick={() => setIsTimelineOpen(!isTimelineOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isTimelineOpen 
                ? 'bg-blue-600/20 text-blue-300 border-blue-500/40 shadow-sm shadow-blue-500/20' 
                : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
            }`}
            title="Toggle Execution Timeline Sidebar"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Timeline</span>
            {isTimelineOpen ? <PanelRightClose className="w-3.5 h-3.5" /> : <PanelRightOpen className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* Main Content - Two Pane Workspace */}
      <main ref={containerRef} className="flex-1 flex overflow-hidden relative">
        {/* Left Panel - Code Editor */}
        <div 
          style={{ width: `${splitWidth}%` }} 
          className="h-full flex flex-col border-r border-white/5 min-w-[25%] max-w-[75%] relative overflow-hidden"
        >
          <div className="h-9 border-b border-white/5 px-4 bg-[#020617] flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Source Code Editor ({language})
            </span>
            <span className="text-[10px] font-mono text-gray-500">
              {splitWidth.toFixed(0)}% Width • Non-wrapping
            </span>
          </div>
          <div className="flex-1 bg-[#020617] relative overflow-hidden">
            <MonacoEditor
              code={code}
              language={language}
              onChange={handleCodeChange}
              currentLine={currentStep?.line}
            />
          </div>
        </div>

        {/* Draggable Resizable Splitter Handle */}
        <div
          onMouseDown={handleMouseDown}
          onDoubleClick={() => setSplitWidth(50)}
          className={`w-1.5 hover:w-2 bg-white/5 hover:bg-blue-500/60 cursor-col-resize flex items-center justify-center transition-all z-30 group relative ${
            isDragging ? 'bg-blue-500 w-2 shadow-lg shadow-blue-500/50' : ''
          }`}
          title="Drag to resize panels (Double-click to reset 50/50)"
        >
          <div className="w-0.5 h-8 bg-gray-500/50 group-hover:bg-white rounded-full transition-colors" />
        </div>

        {/* Center/Right Panel - Visualization Area */}
        <div className="flex-1 flex flex-col bg-[#020617] relative min-w-[25%] overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <VisualizationPanel
              currentStep={currentStep}
              steps={steps}
              currentStepIndex={currentStepIndex}
              error={error}
              courseId={language}
              code={code}
              onSelectStep={handleSelectStep}
            />
          </div>
        </div>

        {/* Right Panel - Execution Timeline */}
        <AnimatePresence>
          {isTimelineOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="h-full border-l border-white/5 bg-[#020617] overflow-hidden flex-shrink-0 z-10"
            >
              <ExecutionTimeline
                steps={steps}
                currentStepIndex={currentStepIndex}
                onSelectStep={handleSelectStep}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <InputCollectionModal
        isOpen={isInputModalOpen}
        prompts={inputPrompts}
        onClose={() => setIsInputModalOpen(false)}
        onConfirm={(inputs) => {
          setIsInputModalOpen(false);
          runExecution(inputs);
        }}
      />
    </div>
  );
};

export default Playground;

