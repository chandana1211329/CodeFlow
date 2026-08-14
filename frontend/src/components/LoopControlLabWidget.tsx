import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PlayCircle, PauseCircle, RotateCcw, ArrowRight, CheckCircle2, 
  Slash, CornerDownRight, ShieldAlert, GitBranch, Layers
} from 'lucide-react';

export const LoopControlLabWidget: React.FC = () => {
  const [statement, setStatement] = useState<'pass' | 'continue' | 'break'>('break');
  const [useElse, setUseElse] = useState<boolean>(true);
  const [loopType, setLoopType] = useState<'for' | 'while'>('for');
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Dynamic code lines based on settings
  const codeLines: string[] = loopType === 'for' ? [
    'for number in range(1, 5):',
    '    print("Start:", number)',
    '    if number == 3:',
    `        ${statement}`,
    '    print("End:", number)',
    ...(useElse ? ['else:', '    print("Else: Loop completed normally")'] : []),
    'print("Finished")'
  ] : [
    'count = 1',
    'while count <= 4:',
    '    print("Start:", count)',
    '    if count == 3:',
    `        ${statement}`,
    '    print("End:", count)',
    '    count += 1',
    ...(useElse ? ['else:', '    print("Else: Loop completed normally")'] : []),
    'print("Finished")'
  ];

  // Calculate step simulation states
  // We simulate iterations 1, 2, 3 (where control statement triggers), 4, and exit/else
  const buildSteps = () => {
    const steps: {
      activeLine: number;
      iteration: number;
      val: number;
      output?: string;
      desc: string;
    }[] = [];

    const limit = 4;
    let i = 1;
    let didBreak = false;

    if (loopType === 'while') {
      steps.push({ activeLine: 0, iteration: 0, val: 1, desc: 'Initialization: count = 1' });
    }

    while (i <= limit) {
      const headerLine = loopType === 'for' ? 0 : 1;
      const startLine = loopType === 'for' ? 1 : 2;
      const ifLine = loopType === 'for' ? 2 : 3;
      const ctrlLine = loopType === 'for' ? 3 : 4;
      const endLine = loopType === 'for' ? 4 : 5;
      const incrLine = loopType === 'while' ? 6 : -1;

      steps.push({ activeLine: headerLine, iteration: i, val: i, desc: `Iteration #${i} start: evaluating item ${i}` });
      steps.push({ activeLine: startLine, iteration: i, val: i, output: `Start: ${i}`, desc: `Executing print("Start:", ${i})` });
      steps.push({ activeLine: ifLine, iteration: i, val: i, desc: `Evaluating condition ${i} == 3 → ${i === 3 ? 'True' : 'False'}` });

      if (i === 3) {
        steps.push({ activeLine: ctrlLine, iteration: i, val: i, desc: `Executing ${statement} statement!` });

        if (statement === 'pass') {
          steps.push({ activeLine: endLine, iteration: i, val: i, output: `End: ${i}`, desc: 'pass did NOTHING! Execution continued to print("End:", 3).' });
          if (loopType === 'while') {
            steps.push({ activeLine: incrLine, iteration: i, val: i, desc: 'count += 1 → count becomes 4' });
          }
        } else if (statement === 'continue') {
          steps.push({ activeLine: ctrlLine, iteration: i, val: i, desc: 'continue SKIPPED print("End:", 3)! Moving to next loop iteration.' });
          if (loopType === 'while') {
            steps.push({ activeLine: incrLine, iteration: i, val: i, desc: 'count += 1 → count becomes 4' });
          }
        } else if (statement === 'break') {
          steps.push({ activeLine: ctrlLine, iteration: i, val: i, desc: 'break TERMINATED THE LOOP IMMEDIATELY! Skipping all remaining body code and iterations.' });
          didBreak = true;
          break;
        }
      } else {
        steps.push({ activeLine: endLine, iteration: i, val: i, output: `End: ${i}`, desc: `Executing print("End:", ${i})` });
        if (loopType === 'while') {
          steps.push({ activeLine: incrLine, iteration: i, val: i, desc: `count += 1 → count becomes ${i + 1}` });
        }
      }

      i++;
    }

    // Else & Finish
    const elseLine = loopType === 'for' ? 5 : 7;
    const elseBodyLine = loopType === 'for' ? 6 : 8;
    const finishLine = useElse ? (loopType === 'for' ? 7 : 9) : (loopType === 'for' ? 5 : 7);

    if (useElse) {
      if (didBreak) {
        steps.push({ activeLine: elseLine, iteration: 0, val: 0, desc: '⚠ break occurred! Loop else block is SKIPPED.' });
      } else {
        steps.push({ activeLine: elseLine, iteration: 0, val: 0, desc: '✓ Loop finished normally without break! Executing loop else block.' });
        steps.push({ activeLine: elseBodyLine, iteration: 0, val: 0, output: 'Else: Loop completed normally', desc: 'Executing print("Else: Loop completed normally")' });
      }
    }

    steps.push({ activeLine: finishLine, iteration: 0, val: 0, output: 'Finished', desc: 'Executing print("Finished") past loop.' });

    return steps;
  };

  const steps = buildSteps();
  const step = steps[Math.min(stepIdx, steps.length - 1)];

  // Gather stdout
  const outputs: string[] = [];
  for (let k = 0; k <= stepIdx && k < steps.length; k++) {
    if (steps[k].output) {
      outputs.push(steps[k].output!);
    }
  }

  const handleNext = () => {
    if (stepIdx < steps.length - 1) {
      setStepIdx(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    if (stepIdx > 0) {
      setStepIdx(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setStepIdx(0);
    setIsPlaying(false);
  };

  React.useEffect(() => {
    let t: any;
    if (isPlaying) {
      t = setInterval(() => {
        setStepIdx(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(t);
  }, [isPlaying, steps.length]);

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl flex items-center justify-center text-cyan-400">
            <GitBranch size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Loop Control Master Lab
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wide">
                break • continue • pass • else
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Toggle control statements and loop else clauses to observe execution flow changes live.
            </p>
          </div>
        </div>

        {/* Statement Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-bold">
          <button
            onClick={() => { setStatement('break'); handleReset(); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              statement === 'break' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            break
          </button>
          <button
            onClick={() => { setStatement('continue'); handleReset(); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              statement === 'continue' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            continue
          </button>
          <button
            onClick={() => { setStatement('pass'); handleReset(); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              statement === 'pass' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            pass
          </button>
        </div>
      </div>

      {/* Control Configuration Options Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950/80 p-4 rounded-2xl border border-white/10 text-xs font-mono">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useElse}
              onChange={(e) => { setUseElse(e.target.checked); handleReset(); }}
              className="accent-cyan-500 rounded"
            />
            <span className="text-cyan-300 font-bold">Include loop else clause</span>
          </label>

          <div className="flex items-center gap-2">
            <span className="text-gray-400">Loop Type:</span>
            <button
              onClick={() => { setLoopType('for'); handleReset(); }}
              className={`px-2 py-0.5 rounded ${loopType === 'for' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-800 text-gray-400'}`}
            >
              for
            </button>
            <button
              onClick={() => { setLoopType('while'); handleReset(); }}
              className={`px-2 py-0.5 rounded ${loopType === 'while' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-800 text-gray-400'}`}
            >
              while
            </button>
          </div>
        </div>

        {/* Stepper Buttons */}
        <div className="flex items-center gap-2">
          <button onClick={handlePrev} disabled={stepIdx === 0} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 disabled:opacity-40 rounded-xl font-semibold text-gray-300 border border-white/10">
            Previous
          </button>
          <button onClick={handleNext} disabled={stepIdx === steps.length - 1} className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 rounded-xl font-bold text-white shadow-md shadow-cyan-600/30">
            Next Step
          </button>
          <button onClick={() => setIsPlaying(!isPlaying)} className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold border ${isPlaying ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40'}`}>
            {isPlaying ? <PauseCircle size={14} /> : <PlayCircle size={14} />}
            {isPlaying ? 'Pause' : 'Auto Play'}
          </button>
          <button onClick={handleReset} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 border border-white/10">
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Code & Visual Output Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Code Window & Terminal */}
        <div className="space-y-4">
          <div className="bg-slate-950 rounded-2xl border border-white/10 overflow-hidden shadow-xl">
            <div className="bg-slate-900/80 px-4 py-2 border-b border-white/10 flex items-center justify-between font-mono text-xs text-gray-400">
              <span>loop_control.py</span>
              <span className="text-cyan-300 font-bold uppercase">{statement} mode</span>
            </div>

            <div className="p-4 font-mono text-xs space-y-1 bg-black/60">
              {codeLines.map((line, idx) => {
                const isActive = step.activeLine === idx;
                const isCtrl = line.trim().startsWith('break') || line.trim().startsWith('continue') || line.trim().startsWith('pass');
                return (
                  <div
                    key={idx}
                    className={`flex items-center px-3 py-1.5 rounded-lg transition-all ${
                      isActive
                        ? isCtrl
                          ? 'bg-amber-500/30 border-l-4 border-amber-400 text-amber-200 font-bold'
                          : 'bg-cyan-600/30 border-l-4 border-cyan-400 text-white font-bold'
                        : 'text-gray-400 opacity-70'
                    }`}
                  >
                    <span className="w-6 text-gray-600 text-[11px]">{idx + 1}</span>
                    <span>{line}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Terminal Output */}
          <div className="bg-slate-950 rounded-2xl border border-white/10 p-4 font-mono text-xs space-y-2">
            <div className="text-gray-400 font-bold border-b border-white/10 pb-2">
              Stdout Terminal Stream
            </div>
            <div className="min-h-[90px] bg-black/70 rounded-xl p-3 space-y-1 text-emerald-400">
              {outputs.length === 0 ? (
                <span className="text-gray-600 italic">[Press Next to start simulation]</span>
              ) : (
                outputs.map((out, i) => <div key={i}>&gt; {out}</div>)
              )}
            </div>
          </div>
        </div>

        {/* Right: Mental Model Summary & Step Explanation */}
        <div className="space-y-4">
          <div className="bg-slate-950 border border-cyan-500/20 rounded-2xl p-5 space-y-3 font-mono text-xs">
            <div className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
              Active Step Trace Note
            </div>
            <p className="text-gray-200 leading-relaxed font-sans text-xs">
              {step.desc}
            </p>
          </div>

          {/* Master Comparison Table Card */}
          <div className="bg-slate-950 border border-white/10 rounded-2xl p-5 space-y-3 font-mono text-xs">
            <div className="text-gray-400 font-bold uppercase tracking-wider text-[11px]">
              Master Statement Rule Summary
            </div>

            <div className="space-y-2">
              <div className={`p-2.5 rounded-xl border flex items-center justify-between ${statement === 'pass' ? 'bg-purple-950/60 border-purple-400 text-purple-200 font-bold' : 'bg-slate-900/50 border-white/5 text-gray-400'}`}>
                <span>pass</span>
                <span className="text-[11px]">Do nothing (continue to next statement)</span>
              </div>
              <div className={`p-2.5 rounded-xl border flex items-center justify-between ${statement === 'continue' ? 'bg-amber-950/60 border-amber-400 text-amber-200 font-bold' : 'bg-slate-900/50 border-white/5 text-gray-400'}`}>
                <span>continue</span>
                <span className="text-[11px]">Skip rest of current iteration</span>
              </div>
              <div className={`p-2.5 rounded-xl border flex items-center justify-between ${statement === 'break' ? 'bg-red-950/60 border-red-400 text-red-200 font-bold' : 'bg-slate-900/50 border-white/5 text-gray-400'}`}>
                <span>break</span>
                <span className="text-[11px]">Exit loop immediately (skips loop else)</span>
              </div>
              {useElse && (
                <div className="p-2.5 rounded-xl border border-cyan-500/30 bg-cyan-950/40 text-cyan-200 flex items-center justify-between">
                  <span>loop else</span>
                  <span className="text-[11px]">Runs ONLY if loop completed WITHOUT break</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
