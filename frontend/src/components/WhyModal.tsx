import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, Lightbulb, Code, ArrowRight, BookOpen, Check } from 'lucide-react';
import { ExecutionStep } from '../types';

interface WhyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: ExecutionStep | null;
}

export const WhyModal: React.FC<WhyModalProps> = ({ isOpen, onClose, currentStep }) => {
  if (!isOpen || !currentStep) return null;

  const code = currentStep.code || '';
  const operationType = currentStep.operationType || 'EXECUTION';
  const whyDetails = currentStep.whyDetails || currentStep.explanation?.whyItHappened || 'The Python interpreter evaluated this line step-by-step according to language semantics.';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-[#090d16] border border-blue-500/30 rounded-2xl p-6 shadow-2xl shadow-blue-500/10 overflow-hidden"
        >
          {/* Header Glow */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500" />

          {/* Title Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  Why did this happen?
                </h2>
                <p className="text-xs text-gray-400">
                  Detailed computer science breakdown for Line {currentStep.line}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="mt-5 space-y-5 max-h-[70vh] overflow-y-auto pr-1">
            {/* Executed Code Box */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-sm">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-blue-400" /> Executed Line
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-semibold">
                  {operationType}
                </span>
              </div>
              <p className="text-blue-300 font-semibold text-base">{code}</p>
            </div>

            {/* What Changed Highlight */}
            {currentStep.diff && currentStep.diff.summary && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                  <Lightbulb className="w-4 h-4" /> Direct Impact
                </div>
                <pre className="font-mono text-xs text-emerald-200 whitespace-pre-wrap leading-relaxed">
                  {currentStep.diff.summary}
                </pre>
              </div>
            )}

            {/* Educational Breakdown */}
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
                <BookOpen className="w-4 h-4" /> Core Concept & Principles
              </div>
              <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
                {whyDetails}
              </p>
            </div>

            {/* Loop Lifecycle Breakdown if loop line */}
            {(code.includes('for') || code.includes('while') || operationType === 'LOOP') && (
              <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 font-bold uppercase text-blue-400 tracking-wider">
                  <ArrowRight className="w-4 h-4" /> Loop Execution Lifecycle Stage
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300">
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-gray-500 text-[10px] block">1. Initialization</span>
                    <span className="text-blue-300 font-bold">i = 0</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-gray-500 text-[10px] block">2. Condition Evaluation</span>
                    <span className="text-emerald-400 font-bold">i &lt; n (0 &lt; 4) → TRUE</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-gray-500 text-[10px] block">3. Body Execution</span>
                    <span className="text-purple-300 font-bold">Executing Loop Body</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-gray-500 text-[10px] block">4. Increment Step</span>
                    <span className="text-yellow-300 font-bold">i++ (0 → 1)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Values Involved */}
            {currentStep.variables && Object.keys(currentStep.variables).length > 0 && (
              <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Variables in Scope
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
                  {Object.entries(currentStep.variables).map(([name, val]) => (
                    <div key={name} className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex flex-col">
                      <span className="text-gray-400 text-[10px]">{name}</span>
                      <span className="text-blue-300 font-bold truncate">
                        {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
            >
              Got it <Check className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WhyModal;
