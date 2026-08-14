import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RefreshCw, CheckCircle2, ArrowRight, Layers, HelpCircle } from 'lucide-react';

interface Step {
  stepNum: number;
  question: string;
  options: string[];
  correctOptionIndex: number;
  highlightedExpr: string;
  reducedResult: string;
  explanation: string;
}

export const ExpressionFlowLabWidget: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const steps: Step[] = [
    {
      stepNum: 1,
      question: 'What operation runs FIRST in: 5 + 3 * 2 >= 10 and "Py" in "Python"?',
      options: ['5 + 3 (Addition)', '3 * 2 (Multiplication)', '10 and "Py" (Logic)'],
      correctOptionIndex: 1,
      highlightedExpr: '3 * 2',
      reducedResult: '6',
      explanation: 'Multiplication (*) has higher precedence than addition (+) or comparisons (>=). So 3 * 2 = 6 runs first!',
    },
    {
      stepNum: 2,
      question: 'After 3 * 2 = 6, expression is 5 + 6 >= 10 and "Py" in "Python". What runs NEXT?',
      options: ['5 + 6 (Addition)', '6 >= 10 (Comparison)', '"Py" in "Python" (Membership)'],
      correctOptionIndex: 0,
      highlightedExpr: '5 + 6',
      reducedResult: '11',
      explanation: 'Addition (+) has higher precedence than comparison (>=). So 5 + 6 = 11 runs next!',
    },
    {
      stepNum: 3,
      question: 'After 5 + 6 = 11, expression is 11 >= 10 and "Py" in "Python". What runs NEXT?',
      options: ['11 >= 10 (Comparison)', '10 and "Py" (Logic)', 'and "Python" (Logic)'],
      correctOptionIndex: 0,
      highlightedExpr: '11 >= 10',
      reducedResult: 'True',
      explanation: 'Comparison (>=) has higher precedence than logical and. So 11 >= 10 = True runs next!',
    },
    {
      stepNum: 4,
      question: 'After 11 >= 10 = True, expression is True and "Py" in "Python". What runs NEXT?',
      options: ['True and "Py" (Logical and)', '"Py" in "Python" (Membership)', 'Assignment'],
      correctOptionIndex: 1,
      highlightedExpr: '"Py" in "Python"',
      reducedResult: 'True',
      explanation: 'Membership (in) has higher precedence than logical and. So "Py" in "Python" = True runs next!',
    },
    {
      stepNum: 5,
      question: 'After "Py" in "Python" = True, expression is True and True. What is the FINAL operation?',
      options: ['True and True (Logical and)', 'Re-evaluate 5 + 3', 'Returns None'],
      correctOptionIndex: 0,
      highlightedExpr: 'True and True',
      reducedResult: 'True',
      explanation: 'Logical and combines True and True to produce the final Boolean result: True (bool)!',
    },
  ];

  const currentStep = steps[currentStepIndex];

  const handleSelectOption = (index: number) => {
    setSelectedOption(index);
    if (index === currentStep.correctOptionIndex) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  return (
    <div className="my-8 bg-[#020617] border border-blue-500/30 rounded-3xl p-6 shadow-2xl shadow-blue-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600/20 border border-blue-400/30 rounded-2xl flex items-center justify-center text-blue-400">
            <Layers size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Expression Flow Lab
            </h3>
            <p className="text-xs text-gray-400">
              Interactive step-by-step reduction of a combined Python expression
            </p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all flex items-center gap-1.5 text-xs"
        >
          <RefreshCw size={14} /> Reset Lab
        </button>
      </div>

      {/* Code & Initial Setup */}
      <div className="bg-black/60 p-4 rounded-2xl border border-white/10 font-mono text-xs space-y-2">
        <div className="flex items-center justify-between text-gray-400 border-b border-white/5 pb-2">
          <span>SETUP VARIABLES:</span>
          <span className="text-blue-300">a = 5, b = 3, text = "Python"</span>
        </div>
        <div className="text-emerald-400 font-bold text-sm pt-1">
          result = a + b * 2 &gt;= 10 and "Py" in text
        </div>
      </div>

      {/* Reduction Progress Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
          <span>Reduction Pipeline Step {currentStep.stepNum} of {steps.length}</span>
          <span className="text-blue-400">Layer-by-Layer Reduction</span>
        </div>

        {/* Step Question Modal */}
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <HelpCircle size={16} className="text-blue-400" />
            {currentStep.question}
          </h4>

          <div className="grid grid-cols-1 gap-2">
            {currentStep.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOpt = idx === currentStep.correctOptionIndex;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isCorrect !== null}
                  className={`p-3 rounded-xl font-mono text-xs text-left border transition-all flex items-center justify-between ${
                    isSelected
                      ? isCorrectOpt
                        ? 'bg-emerald-600 border-emerald-400 text-white font-bold'
                        : 'bg-red-600 border-red-400 text-white font-bold'
                      : 'bg-black/40 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span>{opt}</span>
                  {isSelected && (
                    <span className="text-xs uppercase font-bold px-2 py-0.5 rounded bg-black/40">
                      {isCorrectOpt ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Trace Explanation */}
          {isCorrect !== null && (
            <div
              className={`p-4 rounded-xl border font-mono text-xs space-y-2 ${
                isCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                  : 'bg-red-950/40 border-red-500/30 text-red-200'
              }`}
            >
              <div className="font-bold flex items-center gap-2 text-sm">
                {isCorrect ? '✓ Correct Choice!' : '✗ Try again!'}
              </div>
              <p>{currentStep.explanation}</p>

              {isCorrect && (
                <div className="pt-2 flex justify-end">
                  {currentStepIndex < steps.length - 1 ? (
                    <button
                      onClick={handleNextStep}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center gap-1.5 text-xs shadow-lg shadow-blue-600/30"
                    >
                      Next Step <ArrowRight size={14} />
                    </button>
                  ) : (
                    <div className="bg-emerald-600 px-4 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-2">
                      <CheckCircle2 size={16} /> Entire Expression Reduced to True (bool)!
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
