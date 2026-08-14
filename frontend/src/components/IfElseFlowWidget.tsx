import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RefreshCw, Sparkles, CheckCircle2, Split } from 'lucide-react';

export const IfElseFlowWidget: React.FC = () => {
  const [score, setScore] = useState<number>(65);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const isPass = score >= 50;

  const traceSteps = [
    {
      num: 1,
      title: '1. Initialize Variable',
      codeLine: 'score = ' + score,
      output: null,
      desc: `score is set to ${score}.`,
      activeLineIndex: 0,
      branch: 'none',
    },
    {
      num: 2,
      title: '2. Print Initial Message',
      codeLine: 'print("Checking result...")',
      output: 'Checking result...',
      desc: 'Line 2 prints "Checking result...".',
      activeLineIndex: 1,
      branch: 'none',
    },
    {
      num: 3,
      title: `3. Evaluate Condition (score >= 50)`,
      codeLine: 'if score >= 50:',
      output: null,
      desc: `${score} >= 50 evaluates to ${isPass ? 'True (TRUTHY)' : 'False (FALSY)'}.`,
      activeLineIndex: 2,
      branch: 'none',
    },
    isPass
      ? {
          num: 4,
          title: '4. Select TRUE PATH (if Block)',
          codeLine: '    status = "Passed"',
          output: null,
          desc: 'Condition is True! Python selects the TRUE PATH (if block). Variable status is set to "Passed".',
          activeLineIndex: 3,
          branch: 'true',
        }
      : {
          num: 4,
          title: '4. Select FALSE PATH (else Block)',
          codeLine: '    status = "Failed"',
          output: null,
          desc: 'Condition is False! Python skips the if block and enters the FALSE PATH (else block). Variable status is set to "Failed".',
          activeLineIndex: 6,
          branch: 'false',
        },
    isPass
      ? {
          num: 5,
          title: '5. Execute True Path Statement 2',
          codeLine: '    print("Congratulations")',
          output: 'Congratulations',
          desc: 'Line 5 inside the true path prints "Congratulations". The else block is completely skipped.',
          activeLineIndex: 4,
          branch: 'true',
        }
      : {
          num: 5,
          title: '5. Execute False Path Statement 2',
          codeLine: '    print("Try again")',
          output: 'Try again',
          desc: 'Line 7 inside the false path prints "Try again".',
          activeLineIndex: 7,
          branch: 'false',
        },
    {
      num: 6,
      title: '6. Branches Rejoin',
      codeLine: 'print(status)',
      output: isPass ? 'Passed' : 'Failed',
      desc: 'Execution exits the selected branch and rejoins normal program flow after the if-else statement. Line 8 prints status.',
      activeLineIndex: 8,
      branch: 'none',
    },
    {
      num: 7,
      title: '7. Final Statement Execution',
      codeLine: 'print("Finished")',
      output: 'Finished',
      desc: 'Line 9 prints "Finished". Program execution complete!',
      activeLineIndex: 9,
      branch: 'none',
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
          <div className="w-10 h-10 bg-indigo-600/20 border border-indigo-400/30 rounded-2xl flex items-center justify-center text-indigo-400">
            <Split size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Choose the Path (if-else Visualizer)
            </h3>
            <p className="text-xs text-gray-400">
              Step through two-way branching decisions and branch rejoining
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono"
        >
          <RefreshCw size={14} /> Reset Trace
        </button>
      </div>

      {/* Interactive Input Slider / Number */}
      <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="space-y-1 w-full sm:w-auto">
          <span className="text-gray-400 text-[10px] uppercase font-bold block">Test Score Input</span>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={score}
              onChange={(e) => {
                setScore(parseInt(e.target.value, 10) || 0);
                setCurrentStepIndex(0);
              }}
              className="w-24 bg-black/60 border border-blue-500/30 rounded-xl px-3 py-1.5 text-emerald-400 focus:outline-none"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={score}
              onChange={(e) => {
                setScore(parseInt(e.target.value, 10));
                setCurrentStepIndex(0);
              }}
              className="w-36 accent-indigo-500"
            />
          </div>
        </div>

        <div className="bg-black/60 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-4">
          <div>
            <span className="text-gray-500 text-[10px] uppercase block">Condition Result</span>
            <span className={`font-bold ${isPass ? 'text-emerald-400' : 'text-red-400'}`}>
              {score} &gt;= 50 $\rightarrow$ {isPass ? 'True' : 'False'}
            </span>
          </div>
          <div>
            <span className="text-gray-500 text-[10px] uppercase block">Selected Path</span>
            <span className={`font-bold uppercase text-xs ${isPass ? 'text-emerald-300' : 'text-amber-300'}`}>
              {isPass ? 'TRUE PATH (if)' : 'FALSE PATH (else)'}
            </span>
          </div>
        </div>
      </div>

      {/* Code & Visual Execution Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        {/* Code View with Branch Highlighting */}
        <div className="bg-black/60 border border-white/10 rounded-2xl p-4 space-y-1">
          <div className="text-[10px] text-gray-500 uppercase font-bold border-b border-white/5 pb-2 mb-2">
            SOURCE CODE & BRANCHING BOUNDARIES
          </div>

          {[
            { idx: 0, text: `score = ${score}`, type: 'level0' },
            { idx: 1, text: 'print("Checking result...")', type: 'level0' },
            { idx: 2, text: 'if score >= 50:', type: 'level0' },
            { idx: 3, text: '    status = "Passed"', type: 'true' },
            { idx: 4, text: '    print("Congratulations")', type: 'true' },
            { idx: 5, text: 'else:', type: 'level0' },
            { idx: 6, text: '    status = "Failed"', type: 'false' },
            { idx: 7, text: '    print("Try again")', type: 'false' },
            { idx: 8, text: 'print(status)', type: 'level0' },
            { idx: 9, text: 'print("Finished")', type: 'level0' },
          ].map((line) => {
            const isActive = currentStep.activeLineIndex === line.idx;
            const isTrueBranch = line.type === 'true';
            const isFalseBranch = line.type === 'false';

            let bgStyle = 'text-gray-400';
            if (isActive) {
              bgStyle = 'bg-blue-900/50 border border-blue-400 text-white font-bold shadow-lg';
            } else if (isTrueBranch) {
              bgStyle = isPass ? 'bg-emerald-950/30 text-emerald-300 border-l-2 border-emerald-500' : 'text-gray-600 opacity-40';
            } else if (isFalseBranch) {
              bgStyle = !isPass ? 'bg-amber-950/30 text-amber-300 border-l-2 border-amber-500' : 'text-gray-600 opacity-40';
            }

            return (
              <div
                key={line.idx}
                className={`px-3 py-1 rounded-xl transition-all flex items-center justify-between ${bgStyle}`}
              >
                <div className="flex items-center gap-2">
                  {isActive && <ArrowRight size={14} className="text-cyan-400 animate-pulse" />}
                  <span>{line.text}</span>
                </div>
                {isTrueBranch && <span className="text-[9px] text-emerald-400/70 font-sans">TRUE PATH</span>}
                {isFalseBranch && <span className="text-[9px] text-amber-400/70 font-sans">FALSE PATH</span>}
              </div>
            );
          })}
        </div>

        {/* Output & Trace Explanation */}
        <div className="bg-black/60 border border-white/10 rounded-2xl p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-[10px] text-gray-500 uppercase font-bold border-b border-white/5 pb-2 mb-2 flex items-center justify-between">
              <span>TERMINAL OUTPUT</span>
              <span className="text-indigo-400">Step {currentStep.num} of {traceSteps.length}</span>
            </div>

            <div className="bg-black p-3 rounded-xl border border-white/10 min-h-[110px] text-emerald-400 space-y-1">
              {currentOutputs.length === 0 ? (
                <span className="text-gray-600 italic">[No output printed yet]</span>
              ) : (
                currentOutputs.map((out, i) => <div key={i}>&gt; {out}</div>)
              )}
            </div>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-2 font-sans">
            <span className="text-[10px] text-indigo-400 uppercase font-bold block">{currentStep.title}</span>
            <p className="text-gray-300 text-xs">{currentStep.desc}</p>
          </div>

          <div className="flex justify-end pt-2">
            {currentStepIndex < traceSteps.length - 1 ? (
              <button
                onClick={handleNextStep}
                className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs shadow-lg shadow-indigo-600/30"
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
