import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Home, Zap } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MonacoEditor from '../components/MonacoEditor';
import VisualizationPanel from '../components/VisualizationPanel';
import Controls from '../components/Controls';
import { ExecutionStep } from '../types';
import { executeCode } from '../api';
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
        setSteps(result.steps || []);
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

  const currentStep = currentStepIndex >= 0 ? steps[currentStepIndex] : null;

  const EXAMPLES: Record<string, string> = {
    python: `# 3D Array Visualization Example
# 1. Create an initial array
arr = [10, 20, 30]

# 2. Add elements to the array
arr.append(40)
arr.append(50)

# 3. Modify an existing element
arr[1] = 99

# 4. Create another variable
count = len(arr)`,
    java: `public class Example {
    public static void main(String[] args) {
        // 1. Create an array
        int[] arr = {10, 20, 30, 40};
        int n = arr.length;

        // 2. Access elements
        System.out.println("Array length: " + n);

        // 3. Loop through the array
        for (int i = 0; i < n; i++) {
            System.out.println("Element at " + i + ": " + arr[i]);
        }

        // 4. Create non-primitive array
        String[] names = {"Lakshit", "Rahul", "Pankaj"};
    }
}`,
    c: `#include <stdio.h>

int main() {
    // 1. Create an array
    int arr[] = {10, 20, 30, 40, 50};
    int n = 5;

    // 2. Loop through the array
    for (int i = 0; i < n; i++) {
        printf("Element %d: %d\\n", i, arr[i]);
    }

    // 3. Modify an element
    arr[2] = 99;

    return 0;
}`
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setCode(EXAMPLES[newLang] || "");
    setSteps([]);
    setCurrentStepIndex(-1);
    setError(null);
  };

  return (
    <div className="h-screen bg-[#020617] flex flex-col">
      {/* Header */}
      <header className="h-14 border-b border-white/5 flex items-center justify-between px-4 bg-[#020617]">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white" title="Go to Home">
            <Home className="w-5 h-5" />
          </Link>
          <div className="w-px h-6 bg-white/10" />
          <Link to="/dashboard" className="p-2 hover:bg-white/5 rounded-lg transition-colors group text-gray-400 hover:text-white" title="Back to Dashboard">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </Link>
          <div className="flex items-center gap-2">
            <CodeFlowLogo variant="icon" size={32} />
            <span className="font-bold tracking-tight text-white text-base">
              Code<span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Flow</span>
              <span className="text-blue-400 font-semibold ml-2 text-sm">Playground</span>
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-gray-300 capitalize">{language}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel - Editor */}
        <div className="flex-1 flex flex-col border-r border-white/5 min-w-[40%]">
          <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-[#020617]">
            <div className="flex items-center gap-2">
              <select 
                value={language} 
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-transparent text-sm font-medium text-gray-300 focus:outline-none cursor-pointer hover:text-white transition-colors"
              >
                <option value="python">Python 3</option>
                <option value="java">Java 17</option>
              </select>
            </div>
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
          <div className="flex-1 bg-[#020617]">
            <MonacoEditor
              code={code}
              language={language}
              onChange={handleCodeChange}
              currentLine={currentStep?.line}
            />
          </div>
        </div>

        {/* Right Panel - Visualization */}
        <div className="flex-1 flex flex-col bg-[#020617] relative">
          <div className="flex-1 overflow-hidden">
            <VisualizationPanel
              currentStep={currentStep}
              steps={steps}
              currentStepIndex={currentStepIndex}
              error={error}
              courseId={language}
              code={code}
            />
          </div>
        </div>
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
