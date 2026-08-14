import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RefreshCw, Layers, CheckCircle2, GitFork, AlertCircle, HelpCircle } from 'lucide-react';

interface BranchState {
  label: string;
  condText: string;
  status: 'CHECKED_FALSE' | 'MATCHED' | 'NOT_CHECKED' | 'ELSE_EXECUTED' | 'ELSE_SKIPPED';
  assignedGrade: string;
  outputMessage: string;
}

export const ElifBranchLabWidget: React.FC = () => {
  const [score, setScore] = useState<number>(85);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Calculate ladder statuses dynamically based on score
  const branch1: BranchState = {
    label: 'if score >= 90:',
    condText: `${score} >= 90`,
    status: score >= 90 ? 'MATCHED' : 'CHECKED_FALSE',
    assignedGrade: 'A',
    outputMessage: 'Excellent',
  };

  const branch2: BranchState = {
    label: 'elif score >= 80:',
    condText: `${score} >= 80`,
    status: score >= 90 ? 'NOT_CHECKED' : score >= 80 ? 'MATCHED' : 'CHECKED_FALSE',
    assignedGrade: 'B',
    outputMessage: 'Great',
  };

  const branch3: BranchState = {
    label: 'elif score >= 70:',
    condText: `${score} >= 70`,
    status: score >= 80 ? 'NOT_CHECKED' : score >= 70 ? 'MATCHED' : 'CHECKED_FALSE',
    assignedGrade: 'C',
    outputMessage: 'Good',
  };

  const branch4: BranchState = {
    label: 'elif score >= 50:',
    condText: `${score} >= 50`,
    status: score >= 70 ? 'NOT_CHECKED' : score >= 50 ? 'MATCHED' : 'CHECKED_FALSE',
    assignedGrade: 'Pass',
    outputMessage: 'Passed',
  };

  const branchElse: BranchState = {
    label: 'else:',
    condText: 'fallback',
    status: score >= 50 ? 'ELSE_SKIPPED' : 'ELSE_EXECUTED',
    assignedGrade: 'F',
    outputMessage: 'Failed',
  };

  const branches = [branch1, branch2, branch3, branch4, branchElse];
  const matchedBranch = branches.find(b => b.status === 'MATCHED' || b.status === 'ELSE_EXECUTED') || branchElse;

  // Build step-by-step trace steps
  const traceSteps = [
    {
      stepNum: 1,
      title: '1. Initialize Score & Print Start',
      desc: `score is set to ${score}. Line 2 prints "Checking score...".`,
      output: 'Checking score...',
      activeLineIndex: 1,
    },
    {
      stepNum: 2,
      title: '2. Check #1: if score >= 90:',
      desc: `${score} >= 90 evaluates to ${branch1.status === 'MATCHED' ? 'True (MATCHED!)' : 'False'}.`,
      output: null,
      activeLineIndex: 2,
    },
    ...(score < 90
      ? [
          {
            stepNum: 3,
            title: '3. Check #2: elif score >= 80:',
            desc: `${score} >= 80 evaluates to ${branch2.status === 'MATCHED' ? 'True (FIRST MATCH!)' : 'False'}.`,
            output: null,
            activeLineIndex: 5,
          },
        ]
      : []),
    ...(score < 80
      ? [
          {
            stepNum: 4,
            title: '4. Check #3: elif score >= 70:',
            desc: `${score} >= 70 evaluates to ${branch3.status === 'MATCHED' ? 'True (FIRST MATCH!)' : 'False'}.`,
            output: null,
            activeLineIndex: 8,
          },
        ]
      : []),
    ...(score < 70
      ? [
          {
            stepNum: 5,
            title: '5. Check #4: elif score >= 50:',
            desc: `${score} >= 50 evaluates to ${branch4.status === 'MATCHED' ? 'True (FIRST MATCH!)' : 'False'}.`,
            output: null,
            activeLineIndex: 11,
          },
        ]
      : []),
    ...(score < 50
      ? [
          {
            stepNum: 6,
            title: '6. Fallback: else:',
            desc: 'No earlier condition matched! Execution enters the else block.',
            output: null,
            activeLineIndex: 14,
          },
        ]
      : []),
    {
      stepNum: 7,
      title: `7. Execute Selected Branch (${matchedBranch.label})`,
      desc: `Selected branch assigns grade = "${matchedBranch.assignedGrade}" and prints "${matchedBranch.outputMessage}". All remaining branches are SKIPPED (NOT CHECKED).`,
      output: matchedBranch.outputMessage,
      activeLineIndex: matchedBranch.label.startsWith('if')
        ? 3
        : matchedBranch.label.includes('80')
        ? 6
        : matchedBranch.label.includes('70')
        ? 9
        : matchedBranch.label.includes('50')
        ? 12
        : 15,
    },
    {
      stepNum: 8,
      title: '8. Rejoin Normal Flow & Print Grade',
      desc: `Branches rejoin after the if-elif-else chain. Line 17 prints "Grade: ${matchedBranch.assignedGrade}".`,
      output: `Grade: ${matchedBranch.assignedGrade}`,
      activeLineIndex: 17,
    },
    {
      stepNum: 9,
      title: '9. Final Line Execution',
      desc: 'Line 18 prints "Finished". Program execution complete!',
      output: 'Finished',
      activeLineIndex: 18,
    },
  ];

  const currentStep = traceSteps[Math.min(currentStepIndex, traceSteps.length - 1)];

  // Aggregate outputs up to current step
  const currentOutputs: string[] = [];
  for (let i = 0; i <= currentStepIndex && i < traceSteps.length; i++) {
    if (traceSteps[i].output) {
      currentOutputs.push(traceSteps[i].output!);
    }
  }

  const handleNextStep = () => {
    if (currentStepIndex < traceSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
  };

  return (
    <div className="my-8 bg-[#020617] border border-blue-500/30 rounded-3xl p-6 shadow-2xl shadow-blue-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600/20 border border-emerald-400/30 rounded-2xl flex items-center justify-center text-emerald-400">
            <GitFork size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Branch Selection Lab (if-elif-else Visualizer)
            </h3>
            <p className="text-xs text-gray-400">
              Inspect top-to-bottom condition checking, first match selection &amp; skipped branches
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono"
        >
          <RefreshCw size={14} /> Restart Trace
        </button>
      </div>

      {/* Preset Score Selector */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block font-mono">
          Select Test Score Preset:
        </span>
        <div className="flex flex-wrap gap-2">
          {[95, 85, 75, 55, 30].map((s) => (
            <button
              key={s}
              onClick={() => {
                setScore(s);
                setCurrentStepIndex(0);
              }}
              className={`px-4 py-2 rounded-xl font-mono text-xs border transition-all ${
                score === s
                  ? 'bg-emerald-600 border-emerald-400 text-white font-bold shadow-lg shadow-emerald-600/30'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
              }`}
            >
              score = {s}
            </button>
          ))}
        </div>
      </div>

      {/* Branch Status Ladder Cards */}
      <div className="bg-black/60 border border-white/10 rounded-2xl p-4 space-y-3 font-mono text-xs">
        <div className="text-[10px] text-gray-500 uppercase font-bold border-b border-white/5 pb-2">
          BRANCH LADDER STATUS (TOP TO BOTTOM)
        </div>

        <div className="grid grid-cols-1 gap-2">
          {branches.map((b, idx) => {
            let badgeBg = 'bg-gray-800 text-gray-400 border-gray-700';
            let statusLabel = 'NOT CHECKED';

            if (b.status === 'MATCHED') {
              badgeBg = 'bg-emerald-950 text-emerald-300 border-emerald-500/50 font-bold';
              statusLabel = '★ FIRST MATCH';
            } else if (b.status === 'CHECKED_FALSE') {
              badgeBg = 'bg-red-950 text-red-300 border-red-500/50';
              statusLabel = 'CHECKED (FALSE)';
            } else if (b.status === 'ELSE_EXECUTED') {
              badgeBg = 'bg-emerald-950 text-emerald-300 border-emerald-500/50 font-bold';
              statusLabel = 'EXECUTED (ELSE FALLBACK)';
            } else if (b.status === 'ELSE_SKIPPED') {
              badgeBg = 'bg-gray-900 text-gray-600 border-gray-800';
              statusLabel = 'SKIPPED';
            }

            return (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-[10px] w-6">#{idx + 1}</span>
                  <span className="font-bold text-white">{b.label}</span>
                  {b.condText !== 'fallback' && (
                    <span className="text-[10px] text-gray-400">({b.condText})</span>
                  )}
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] border uppercase ${badgeBg}`}>
                  {statusLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Terminal Output & Step Explanation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
        <div className="bg-black/60 border border-white/10 rounded-2xl p-4 flex flex-col justify-between space-y-3">
          <div className="text-[10px] text-gray-500 uppercase font-bold border-b border-white/5 pb-2">
            TERMINAL OUTPUT
          </div>
          <div className="bg-black p-3 rounded-xl border border-white/10 min-h-[100px] text-emerald-400 space-y-1">
            {currentOutputs.length === 0 ? (
              <span className="text-gray-600 italic">[No output printed yet]</span>
            ) : (
              currentOutputs.map((out, i) => <div key={i}>&gt; {out}</div>)
            )}
          </div>
        </div>

        <div className="bg-black/60 border border-white/10 rounded-2xl p-4 flex flex-col justify-between space-y-3">
          <div>
            <div className="text-[10px] text-emerald-400 uppercase font-bold border-b border-white/5 pb-2">
              {currentStep.title}
            </div>
            <p className="text-gray-300 text-xs font-sans pt-2">{currentStep.desc}</p>
          </div>

          <div className="flex justify-end pt-2">
            {currentStepIndex < traceSteps.length - 1 ? (
              <button
                onClick={handleNextStep}
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs shadow-lg shadow-emerald-600/30"
              >
                Next Step <ArrowRight size={14} />
              </button>
            ) : (
              <div className="w-full bg-emerald-600/20 border border-emerald-500/40 p-2.5 rounded-xl text-emerald-300 font-bold text-xs flex items-center justify-center gap-2">
                <CheckCircle2 size={16} /> Trace Complete!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
