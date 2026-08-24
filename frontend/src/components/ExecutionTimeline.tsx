import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Play, HelpCircle, Layers, Zap, AlertTriangle } from 'lucide-react';
import { ExecutionStep } from '../types';

interface ExecutionTimelineProps {
  steps: ExecutionStep[];
  currentStepIndex: number;
  onSelectStep: (index: number) => void;
}

export const ExecutionTimeline: React.FC<ExecutionTimelineProps> = ({
  steps,
  currentStepIndex,
  onSelectStep,
}) => {
  if (!steps || steps.length === 0) {
    return (
      <div className="p-4 text-center text-xs text-gray-500 italic">
        Run code to generate execution timeline.
      </div>
    );
  }

  const getStepLabel = (step: ExecutionStep): string => {
    if (step.diff && step.diff.changes && step.diff.changes.length > 0) {
      return step.diff.changes[0].description;
    }
    if (step.code) {
      return step.code.length > 30 ? step.code.substring(0, 30) + '...' : step.code;
    }
    return `Line ${step.line}`;
  };

  return (
    <div className="flex flex-col h-full bg-[#020617] border-l border-white/5 overflow-y-auto p-4 space-y-3 font-sans">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300">
            Execution Timeline
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
          {steps.length} Steps
        </span>
      </div>

      <div className="relative pl-3 space-y-4">
        {/* Continuous Connecting Line */}
        <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-gray-700 opacity-40" />

        {steps.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          const isPassed = idx < currentStepIndex;

          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02, x: 2 }}
              onClick={() => onSelectStep(idx)}
              className={`relative flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                isActive
                  ? 'bg-blue-600/15 border-blue-500/50 shadow-lg shadow-blue-500/10 text-white'
                  : isPassed
                  ? 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10'
                  : 'bg-black/20 border-white/5 text-gray-500 hover:text-gray-300'
              }`}
            >
              {/* Timeline Node Icon */}
              <div className="relative z-10 flex-shrink-0 mt-0.5">
                {isActive ? (
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/50 ring-2 ring-blue-400/40">
                    <Play className="w-2.5 h-2.5 text-white fill-white" />
                  </div>
                ) : isPassed ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-600" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-mono text-gray-400">
                    Step {idx + 1} • Line {step.line}
                  </span>
                  {step.operationType && (
                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-blue-500/30 text-blue-200 border border-blue-400/30' : 'bg-white/5 text-gray-400'
                    }`}>
                      {step.operationType}
                    </span>
                  )}
                </div>

                <p className={`text-xs font-mono font-medium mt-1 truncate ${isActive ? 'text-blue-300 font-bold' : 'text-gray-300'}`}>
                  {step.code || `Step ${idx + 1}`}
                </p>

                <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">
                  {getStepLabel(step)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ExecutionTimeline;
