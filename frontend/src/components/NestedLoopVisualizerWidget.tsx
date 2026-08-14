import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid, PlayCircle, PauseCircle, RotateCcw, Sparkles, Layers, ArrowRight } from 'lucide-react';

export const NestedLoopVisualizerWidget: React.FC = () => {
  const [rows, setRows] = useState<number>(2);
  const [cols, setCols] = useState<number>(3);
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Generate step trajectory
  const generateSteps = () => {
    const steps: {
      outerRow: number;
      innerCol: number;
      activeLine: number;
      desc: string;
      cellVisited?: [number, number];
      output?: string;
    }[] = [];

    // Line 0: for row in range(1, rows + 1):
    // Line 1:   print("Outer start row:", row)
    // Line 2:   for col in range(1, cols + 1):
    // Line 3:     print(row, col)
    // Line 4:   print("Outer end row:", row)
    // Line 5: print("Done")

    for (let r = 1; r <= rows; r++) {
      steps.push({ outerRow: r, innerCol: 0, activeLine: 0, desc: `Outer loop: row = ${r}` });
      steps.push({ outerRow: r, innerCol: 0, activeLine: 1, output: `Outer start row: ${r}`, desc: `Executing statement before inner loop for row ${r}` });

      for (let c = 1; c <= cols; c++) {
        steps.push({ outerRow: r, innerCol: c, activeLine: 2, desc: `Inner loop start: row ${r}, col ${c}` });
        steps.push({
          outerRow: r,
          innerCol: c,
          activeLine: 3,
          cellVisited: [r, c],
          output: `Row ${r}, Col ${c}`,
          desc: `Inner loop body: visiting cell (${r}, ${c})`
        });
      }

      steps.push({ outerRow: r, innerCol: 0, activeLine: 4, output: `Outer end row: ${r}`, desc: `Inner loop completed for row ${r}. Executing outer end statement.` });
    }

    steps.push({ outerRow: 0, innerCol: 0, activeLine: 5, output: 'Done', desc: 'All outer and inner loop iterations completed!' });
    return steps;
  };

  const steps = generateSteps();
  const currentStep = steps[Math.min(stepIdx, steps.length - 1)];

  // Gather outputs
  const outputs: string[] = [];
  const visitedCells = new Set<string>();

  for (let k = 0; k <= stepIdx && k < steps.length; k++) {
    if (steps[k].output) outputs.push(steps[k].output!);
    if (steps[k].cellVisited) {
      visitedCells.add(`${steps[k].cellVisited![0]}-${steps[k].cellVisited![1]}`);
    }
  }

  const handleNext = () => {
    if (stepIdx < steps.length - 1) setStepIdx(prev => prev + 1);
    else setIsPlaying(false);
  };

  const handlePrev = () => {
    if (stepIdx > 0) setStepIdx(prev => prev - 1);
  };

  const handleReset = () => {
    setStepIdx(0);
    setIsPlaying(false);
  };

  useEffect(() => {
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
      }, 900);
    }
    return () => clearInterval(t);
  }, [isPlaying, steps.length]);

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl flex items-center justify-center text-cyan-400">
            <Grid size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Signature Nested Loop Tracer
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wide">
                Outer x Inner Execution Grid
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Watch how the outer loop pauses while the inner loop runs all of its iterations.
            </p>
          </div>
        </div>

        {/* Dimension Controls & Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-2xl border border-white/10 text-xs font-mono">
            <span className="text-gray-400">Rows:</span>
            <button onClick={() => { setRows(r => Math.max(1, r - 1)); handleReset(); }} className="px-2 py-0.5 bg-slate-800 rounded hover:bg-slate-700 text-cyan-300 font-bold">-</button>
            <span className="text-white font-bold">{rows}</span>
            <button onClick={() => { setRows(r => Math.min(3, r + 1)); handleReset(); }} className="px-2 py-0.5 bg-slate-800 rounded hover:bg-slate-700 text-cyan-300 font-bold">+</button>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-2xl border border-white/10 text-xs font-mono">
            <span className="text-gray-400">Cols:</span>
            <button onClick={() => { setCols(c => Math.max(1, c - 1)); handleReset(); }} className="px-2 py-0.5 bg-slate-800 rounded hover:bg-slate-700 text-cyan-300 font-bold">-</button>
            <span className="text-white font-bold">{cols}</span>
            <button onClick={() => { setCols(c => Math.min(4, c + 1)); handleReset(); }} className="px-2 py-0.5 bg-slate-800 rounded hover:bg-slate-700 text-cyan-300 font-bold">+</button>
          </div>
        </div>
      </div>

      {/* Stepper Toolbar */}
      <div className="flex items-center justify-between bg-slate-950/80 p-3 rounded-2xl border border-white/10 text-xs font-mono">
        <span className="text-gray-400 font-sans">
          Step <strong className="text-cyan-300">{stepIdx + 1}</strong> of <strong className="text-white">{steps.length}</strong>
        </span>

        <div className="flex items-center gap-2">
          <button onClick={handlePrev} disabled={stepIdx === 0} className="px-3 py-1 bg-white/5 hover:bg-white/10 disabled:opacity-40 rounded-xl text-gray-300 border border-white/10 font-sans">
            Previous
          </button>
          <button onClick={handleNext} disabled={stepIdx === steps.length - 1} className="px-3.5 py-1 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 rounded-xl text-white font-bold shadow-md shadow-cyan-600/30 font-sans">
            Next Step
          </button>
          <button onClick={() => setIsPlaying(!isPlaying)} className={`flex items-center gap-1 px-3 py-1 rounded-xl font-bold font-sans border ${isPlaying ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40'}`}>
            {isPlaying ? <PauseCircle size={14} /> : <PlayCircle size={14} />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button onClick={handleReset} className="p-1 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 border border-white/10">
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Main Grid Visualizer & Code Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Code Box & Description */}
        <div className="space-y-4">
          <div className="bg-slate-950 rounded-2xl border border-white/10 overflow-hidden font-mono text-xs shadow-xl">
            <div className="bg-slate-900/80 px-4 py-2 border-b border-white/10 text-gray-400 flex justify-between">
              <span>nested_loop.py</span>
              <span className="text-cyan-400 font-bold">Execution Pointer</span>
            </div>

            <div className="p-4 space-y-1.5 bg-black/60">
              <div className={`px-3 py-1 rounded-lg transition-all ${currentStep.activeLine === 0 ? 'bg-cyan-600/30 border-l-4 border-cyan-400 text-white font-bold' : 'text-gray-400'}`}>
                for row in range(1, {rows + 1}):
              </div>
              <div className={`pl-6 px-3 py-1 rounded-lg transition-all ${currentStep.activeLine === 1 ? 'bg-cyan-600/30 border-l-4 border-cyan-400 text-white font-bold' : 'text-gray-400'}`}>
                print("Outer start row:", row)
              </div>
              <div className={`pl-6 px-3 py-1 rounded-lg transition-all ${currentStep.activeLine === 2 ? 'bg-amber-500/30 border-l-4 border-amber-400 text-amber-200 font-bold' : 'text-gray-400'}`}>
                for col in range(1, {cols + 1}):
              </div>
              <div className={`pl-12 px-3 py-1 rounded-lg transition-all ${currentStep.activeLine === 3 ? 'bg-amber-500/30 border-l-4 border-amber-400 text-amber-200 font-bold' : 'text-gray-400'}`}>
                print(row, col)
              </div>
              <div className={`pl-6 px-3 py-1 rounded-lg transition-all ${currentStep.activeLine === 4 ? 'bg-cyan-600/30 border-l-4 border-cyan-400 text-white font-bold' : 'text-gray-400'}`}>
                print("Outer end row:", row)
              </div>
              <div className={`px-3 py-1 rounded-lg transition-all ${currentStep.activeLine === 5 ? 'bg-emerald-600/30 border-l-4 border-emerald-400 text-emerald-200 font-bold' : 'text-gray-400'}`}>
                print("Done")
              </div>
            </div>
          </div>

          <div className="bg-slate-950 border border-cyan-500/20 rounded-2xl p-4 font-mono text-xs">
            <div className="text-cyan-400 font-bold uppercase text-[11px] mb-1">Current Execution State</div>
            <div className="text-gray-200 font-sans text-xs">{currentStep.desc}</div>
          </div>
        </div>

        {/* Right: Interactive Matrix Grid Visualizer */}
        <div className="space-y-4">
          <div className="bg-slate-950 rounded-2xl border border-white/10 p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                <Layers size={14} className="text-cyan-400" /> Matrix Execution Grid ({rows} x {cols})
              </span>
              <span className="text-xs font-mono text-cyan-400 font-bold">
                Total inner executions = {rows * cols}
              </span>
            </div>

            {/* Grid */}
            <div className="space-y-2">
              {Array.from({ length: rows }).map((_, rIdx) => {
                const rNum = rIdx + 1;
                const isCurrentRow = currentStep.outerRow === rNum;
                return (
                  <div key={rIdx} className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className={`w-20 font-bold px-2 py-1 rounded ${isCurrentRow ? 'bg-cyan-600 text-white' : 'text-gray-400 bg-slate-900'}`}>
                        Row #{rNum}
                      </span>

                      <div className="flex-1 grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
                        {Array.from({ length: cols }).map((_, cIdx) => {
                          const cNum = cIdx + 1;
                          const cellKey = `${rNum}-${cNum}`;
                          const isVisited = visitedCells.has(cellKey);
                          const isActiveCell = currentStep.outerRow === rNum && currentStep.innerCol === cNum && currentStep.activeLine === 3;

                          return (
                            <motion.div
                              key={cIdx}
                              animate={isActiveCell ? { scale: [1, 1.08, 1] } : {}}
                              className={`p-3 rounded-xl border text-center font-mono text-xs font-bold transition-all ${
                                isActiveCell
                                  ? 'bg-amber-500/30 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/20'
                                  : isVisited
                                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                                  : 'bg-slate-900/60 border-white/5 text-gray-600'
                              }`}
                            >
                              <div className="text-[9px] text-gray-400 font-normal">({rNum}, {cNum})</div>
                              <div>R{rNum}C{cNum}</div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Output Box */}
            <div className="bg-black/80 rounded-xl p-3 border border-white/10 font-mono text-xs space-y-1">
              <div className="text-gray-400 text-[10px] uppercase font-bold mb-1">Output Console Stream</div>
              <div className="min-h-[60px] text-emerald-400 space-y-0.5">
                {outputs.length === 0 ? (
                  <span className="text-gray-600 italic">[Press Next Step to execute]</span>
                ) : (
                  outputs.map((out, i) => <div key={i}>&gt; {out}</div>)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
