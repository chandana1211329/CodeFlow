import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, ArrowDown, Play, CheckCircle2, HelpCircle, AlertCircle, Sparkles } from 'lucide-react';
import { ExecutionStep } from '../types';

interface FullProgramFlowProps {
  steps: ExecutionStep[];
  currentStepIndex: number;
  onSelectStep: (index: number) => void;
}

export const FullProgramFlow: React.FC<FullProgramFlowProps> = ({
  steps,
  currentStepIndex,
  onSelectStep,
}) => {
  if (!steps || steps.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-8 text-gray-500 font-mono text-sm">
        No execution flow available. Click Run to generate the program flow graph.
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#020617] overflow-y-auto p-6 space-y-6 font-sans">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" /> Full Program Execution Flow
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Complete architectural flowchart generated from actual execution trace.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
          <span>Active Step:</span>
          <span className="text-blue-400 font-bold">{currentStepIndex + 1} / {steps.length}</span>
        </div>
      </div>

      {/* Program Start Node */}
      <div className="flex flex-col items-center">
        <div className="px-6 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold uppercase tracking-widest shadow-lg shadow-emerald-500/10">
          ● START EXECUTION
        </div>
        <ArrowDown className="w-5 h-5 text-gray-600 my-2 animate-bounce" />
      </div>

      {/* Steps Flow Nodes */}
      <div className="flex flex-col items-center space-y-4 max-w-xl mx-auto w-full">
        {steps.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          const isPassed = idx < currentStepIndex;
          const isCondition = step.operationType === 'CONDITION';
          const isLoop = step.operationType === 'LOOP';

          return (
            <React.Fragment key={idx}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                onClick={() => onSelectStep(idx)}
                className={`w-full p-4 rounded-2xl cursor-pointer transition-all border ${
                  isActive
                    ? 'bg-blue-600/20 border-blue-500 shadow-xl shadow-blue-500/20 text-white ring-2 ring-blue-500/50'
                    : isPassed
                    ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                    : 'bg-black/30 border-white/5 text-gray-500 hover:text-gray-300 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold ${
                      isActive
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                        : isPassed
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-white/5 text-gray-500'
                    }`}>
                      {idx + 1}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-gray-400">Line {step.line}</span>
                        {step.operationType && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/10 text-blue-300 border border-white/5">
                            {step.operationType}
                          </span>
                        )}
                      </div>
                      <p className={`font-mono text-sm mt-0.5 ${isActive ? 'text-blue-300 font-bold' : 'text-gray-200'}`}>
                        {step.code}
                      </p>
                    </div>
                  </div>

                  {isActive && (
                    <span className="px-2.5 py-1 rounded-full bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider animate-pulse">
                      ACTIVE
                    </span>
                  )}
                </div>

                {/* Diff Summary */}
                {step.diff && step.diff.summary && (
                  <div className="mt-3 pt-3 border-t border-white/5 font-mono text-xs text-emerald-400/90 whitespace-pre-wrap">
                    {step.diff.summary}
                  </div>
                )}
              </motion.div>

              {idx < steps.length - 1 && (
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-blue-500 to-purple-500 opacity-50" />
                  <ArrowDown className="w-4 h-4 text-gray-500" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Program End Node */}
      <div className="flex flex-col items-center pt-4">
        <ArrowDown className="w-5 h-5 text-gray-600 mb-2" />
        <div className="px-6 py-2 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 font-mono text-xs font-bold uppercase tracking-widest shadow-lg shadow-purple-500/10">
          ● END EXECUTION
        </div>
      </div>
    </div>
  );
};

export default FullProgramFlow;
