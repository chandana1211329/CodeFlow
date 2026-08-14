import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RefreshCw, ArrowRight, CornerDownRight, ShieldCheck, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export const IfDecisionFlowWidget: React.FC = () => {
  const [age, setAge] = useState<number>(20);
  const [hasName, setHasName] = useState<boolean>(true);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  // Compute evaluation steps based on current age & hasName
  const condLeft = age >= 18;
  const condRight = hasName;
  const finalCond = condLeft && condRight;

  const traceSteps = [
    {
      num: 1,
      title: '1. Initialize Variables & Print Start',
      codeLine: 'print("Program started")',
      output: 'Program started',
      desc: `age = ${age}, has_name = ${hasName}. Line 1 prints "Program started".`,
      activeLineIndex: 0,
      inBlock: false,
      isJump: false,
    },
    {
      num: 2,
      title: '2. Evaluate Left Condition (age >= 18)',
      codeLine: `if age >= 18 and has_name:`,
      output: null,
      desc: `${age} >= 18 evaluates to ${condLeft}.`,
      activeLineIndex: 1,
      inBlock: false,
      isJump: false,
    },
    {
      num: 3,
      title: '3. Evaluate Right Condition (has_name)',
      codeLine: `if age >= 18 and has_name:`,
      output: null,
      desc: `has_name evaluates to ${condRight}.`,
      activeLineIndex: 1,
      inBlock: false,
      isJump: false,
    },
    {
      num: 4,
      title: `4. Combine Logical Condition (${condLeft} and ${condRight})`,
      codeLine: `if age >= 18 and has_name:`,
      output: null,
      desc: `Overall Condition evaluates to ${finalCond ? 'True (PASS)' : 'False (FAIL)'}.`,
      activeLineIndex: 1,
      inBlock: false,
      isJump: false,
    },
    finalCond
      ? {
          num: 5,
          title: '5. Decision: ENTER BLOCK',
          codeLine: '    print("Requirements met")',
          output: 'Requirements met',
          desc: 'Condition is True! Execution pointer enters the indented block and runs statement 1.',
          activeLineIndex: 2,
          inBlock: true,
          isJump: false,
        }
      : {
          num: 5,
          title: '5. Decision: SKIP BLOCK (Jump to line after block)',
          codeLine: 'print("Program finished")',
          output: null,
          desc: 'Condition is False! Execution pointer jumps OVER all indented lines directly to line 7.',
          activeLineIndex: 4,
          inBlock: false,
          isJump: true,
        },
    ...(finalCond
      ? [
          {
            num: 6,
            title: '6. Execute Block Statement 2',
            codeLine: '    print("Access granted")',
            output: 'Access granted',
            desc: 'Execution continues sequentially inside the entered block.',
            activeLineIndex: 3,
            inBlock: true,
            isJump: false,
          },
          {
            num: 7,
            title: '7. Exit Block & Continue Program',
            codeLine: 'print("Program finished")',
            output: 'Program finished',
            desc: 'Indented block ends. Execution continues with statements after the block.',
            activeLineIndex: 4,
            inBlock: false,
            isJump: false,
          },
        ]
      : [
          {
            num: 6,
            title: '6. Execute Statement After Block',
            codeLine: 'print("Program finished")',
            output: 'Program finished',
            desc: 'Execution continues after the skipped block.',
            activeLineIndex: 4,
            inBlock: false,
            isJump: false,
          },
        ]),
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
          <div className="w-10 h-10 bg-blue-600/20 border border-blue-400/30 rounded-2xl flex items-center justify-center text-blue-400">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Your First Decision Flow Visualizer
            </h3>
            <p className="text-xs text-gray-400">
              Interactive execution pointer step-by-step trace for Python <code className="text-blue-300">if</code>
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

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 font-mono text-xs">
        <div className="space-y-1">
          <span className="text-gray-400 text-[10px] uppercase font-bold block">age (int)</span>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={age}
              onChange={(e) => {
                setAge(parseInt(e.target.value, 10) || 0);
                setCurrentStepIndex(0);
              }}
              className="w-24 bg-black/60 border border-blue-500/30 rounded-xl px-3 py-1.5 text-emerald-400 focus:outline-none"
            />
            <span className="text-gray-400 text-[11px]">
              age &gt;= 18: <strong className={age >= 18 ? 'text-emerald-400' : 'text-red-400'}>{String(age >= 18)}</strong>
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-gray-400 text-[10px] uppercase font-bold block">has_name (bool)</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setHasName(!hasName);
                setCurrentStepIndex(0);
              }}
              className={`px-4 py-1.5 rounded-xl font-bold transition-all border ${
                hasName
                  ? 'bg-emerald-600/30 border-emerald-500/50 text-emerald-300'
                  : 'bg-red-600/30 border-red-500/50 text-red-300'
              }`}
            >
              {String(hasName)}
            </button>
            <span className="text-gray-400 text-[11px]">
              Overall Condition: <strong className={finalCond ? 'text-emerald-400' : 'text-red-400'}>{finalCond ? 'True (ENTER)' : 'False (SKIP)'}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Code & Pointer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Code Block with Active Line Highlight */}
        <div className="bg-black/60 border border-white/10 rounded-2xl p-4 font-mono text-xs space-y-1">
          <div className="text-[10px] text-gray-500 uppercase font-bold border-b border-white/5 pb-2 mb-2">
            SOURCE CODE & EXECUTION POINTER
          </div>

          {[
            { idx: 0, text: 'print("Program started")', indent: 0 },
            { idx: 1, text: 'if age >= 18 and has_name:', indent: 0 },
            { idx: 2, text: '    print("Requirements met")', indent: 1 },
            { idx: 3, text: '    print("Access granted")', indent: 1 },
            { idx: 4, text: 'print("Program finished")', indent: 0 },
          ].map((line) => {
            const isActive = currentStep.activeLineIndex === line.idx;
            const isIndentedBlock = line.indent > 0;

            return (
              <div
                key={line.idx}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center justify-between ${
                  isActive
                    ? currentStep.isJump
                      ? 'bg-red-900/40 border border-red-500/50 text-red-200 font-bold shadow-lg'
                      : isIndentedBlock
                      ? 'bg-emerald-900/40 border border-emerald-500/50 text-emerald-200 font-bold shadow-lg'
                      : 'bg-blue-900/40 border border-blue-500/50 text-blue-200 font-bold shadow-lg'
                    : isIndentedBlock
                    ? 'bg-white/5 text-gray-300 border-l-2 border-emerald-500/30'
                    : 'text-gray-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isActive && <ArrowRight size={14} className="text-cyan-400 animate-pulse" />}
                  <span>{line.text}</span>
                </div>
                {line.indent > 0 && (
                  <span className="text-[9px] text-emerald-400/60 uppercase tracking-widest font-sans font-semibold">
                    LEVEL 1 BLOCK
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Console Output & Step Explanation */}
        <div className="bg-black/60 border border-white/10 rounded-2xl p-4 flex flex-col justify-between space-y-4 font-mono text-xs">
          <div>
            <div className="text-[10px] text-gray-500 uppercase font-bold border-b border-white/5 pb-2 mb-2 flex items-center justify-between">
              <span>TERMINAL OUTPUT</span>
              <span className="text-cyan-400">Step {currentStep.num} of {traceSteps.length}</span>
            </div>

            <div className="bg-black p-3 rounded-xl border border-white/10 min-h-[100px] text-emerald-400 space-y-1">
              {currentOutputs.length === 0 ? (
                <span className="text-gray-600 italic">[No output printed yet]</span>
              ) : (
                currentOutputs.map((out, i) => <div key={i}>&gt; {out}</div>)
              )}
            </div>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-2">
            <span className="text-[10px] text-cyan-400 uppercase font-bold block">{currentStep.title}</span>
            <p className="text-gray-300 text-xs font-sans">{currentStep.desc}</p>
          </div>

          <div className="flex justify-end pt-2">
            {currentStepIndex < traceSteps.length - 1 ? (
              <button
                onClick={handleNextStep}
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs shadow-lg shadow-blue-600/30"
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
