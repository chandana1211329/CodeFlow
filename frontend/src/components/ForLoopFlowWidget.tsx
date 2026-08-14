import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RotateCcw, PlayCircle, PauseCircle, Layers, CheckCircle2, Terminal } from 'lucide-react';

interface IterableSample {
  id: string;
  name: string;
  typeLabel: string;
  code: string[];
  items: string[];
  varName: string;
}

const SAMPLES: IterableSample[] = [
  {
    id: 'list-sample',
    name: '1. List Iteration',
    typeLabel: 'list',
    code: [
      'colors = ["red", "blue", "green"]',
      'for color in colors:',
      '    print("Color:", color)',
      'print("Finished")'
    ],
    items: ['red', 'blue', 'green'],
    varName: 'color'
  },
  {
    id: 'string-sample',
    name: '2. String Character Iteration',
    typeLabel: 'str',
    code: [
      'word = "CODE"',
      'for char in word:',
      '    print("Letter:", char)',
      'print("Finished")'
    ],
    items: ['C', 'O', 'D', 'E'],
    varName: 'char'
  },
  {
    id: 'tuple-sample',
    name: '3. Tuple Values Iteration',
    typeLabel: 'tuple',
    code: [
      'scores = (85, 92, 78)',
      'for score in scores:',
      '    print("Score:", score)',
      'print("Finished")'
    ],
    items: ['85', '92', '78'],
    varName: 'score'
  },
  {
    id: 'dict-sample',
    name: '4. Dictionary Key Iteration',
    typeLabel: 'dict',
    code: [
      'student = {"name": "Alex", "age": 20}',
      'for key in student:',
      '    print("Key:", key)',
      'print("Finished")'
    ],
    items: ['name', 'age'],
    varName: 'key'
  }
];

export const ForLoopFlowWidget: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('list-sample');
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const sample = SAMPLES.find(s => s.id === selectedId) || SAMPLES[0];

  // Steps build
  const totalItems = sample.items.length;
  // Step 0: Header init
  // Step 1..totalItems: Item visits
  // Step totalItems + 1: Exit loop
  const maxSteps = totalItems + 1;

  const currentItemIndex = stepIdx > 0 && stepIdx <= totalItems ? stepIdx - 1 : -1;
  const isFinished = stepIdx > totalItems;

  const handleNext = () => {
    if (stepIdx < maxSteps) {
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
          if (prev >= maxSteps) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1100);
    }
    return () => clearInterval(t);
  }, [isPlaying, maxSteps]);

  // Console output history
  const outputs: string[] = [];
  for (let i = 1; i <= stepIdx && i <= totalItems; i++) {
    const itemVal = sample.items[i - 1];
    if (sample.id === 'list-sample') outputs.push(`Color: ${itemVal}`);
    else if (sample.id === 'string-sample') outputs.push(`Letter: ${itemVal}`);
    else if (sample.id === 'tuple-sample') outputs.push(`Score: ${itemVal}`);
    else if (sample.id === 'dict-sample') outputs.push(`Key: ${itemVal}`);
  }
  if (isFinished) {
    outputs.push('Finished');
  }

  return (
    <div className="my-8 bg-[#020617] border border-blue-500/30 rounded-3xl p-6 shadow-2xl shadow-blue-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/20 border border-blue-400/40 rounded-2xl flex items-center justify-center text-blue-400">
            <Layers size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow For Loop Pointer Visualizer
              <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-400/30 uppercase tracking-wide">
                Iterable Sequence
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Watch Python automatically obtain items one by one and assign them to the loop variable.
            </p>
          </div>
        </div>

        {/* Sample selector */}
        <select
          value={selectedId}
          onChange={(e) => {
            setSelectedId(e.target.value);
            setStepIdx(0);
            setIsPlaying(false);
          }}
          className="bg-slate-900 border border-blue-500/30 text-xs text-blue-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-400 w-full md:w-64 font-semibold"
        >
          {SAMPLES.map(s => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Stepper Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950/70 border border-white/10 p-4 rounded-2xl">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={stepIdx === 0}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 disabled:opacity-40 rounded-xl text-xs font-semibold text-gray-300 border border-white/10"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={stepIdx === maxSteps}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 rounded-xl text-xs font-bold text-white shadow-md shadow-blue-600/30"
          >
            Next Step
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              isPlaying 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                : 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40'
            }`}
          >
            {isPlaying ? <PauseCircle size={14} /> : <PlayCircle size={14} />}
            {isPlaying ? 'Pause' : 'Auto Play'}
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white border border-white/10"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        <div className="font-mono text-xs text-gray-300">
          State: {stepIdx === 0 ? 'Initialization' : isFinished ? 'Exit Complete' : `Visiting Item #${stepIdx}`}
        </div>
      </div>

      {/* Main Visualizer Body */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Code Box & Terminal */}
        <div className="space-y-4">
          <div className="bg-slate-950 rounded-2xl border border-white/10 overflow-hidden shadow-xl">
            <div className="bg-slate-900/80 px-4 py-2 border-b border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
              <span>for_loop.py</span>
              <span className="text-blue-400 font-bold">{sample.typeLabel}</span>
            </div>

            <div className="p-4 font-mono text-xs space-y-1 bg-black/60">
              {sample.code.map((line, idx) => {
                const isActive = (stepIdx === 0 && idx === 0) ||
                  (!isFinished && stepIdx > 0 && (idx === 1 || idx === 2)) ||
                  (isFinished && idx === 3);
                return (
                  <div
                    key={idx}
                    className={`flex items-center px-3 py-1.5 rounded-lg transition-all ${
                      isActive ? 'bg-blue-600/30 border-l-4 border-blue-400 text-white font-bold' : 'text-gray-400 opacity-70'
                    }`}
                  >
                    <span className="w-6 text-gray-600 text-[11px]">{idx + 1}</span>
                    <span>{line}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Terminal */}
          <div className="bg-slate-950 rounded-2xl border border-white/10 p-4 font-mono text-xs space-y-2">
            <div className="text-gray-400 font-bold flex items-center gap-2 border-b border-white/10 pb-2">
              <Terminal size={14} className="text-emerald-400" />
              Stdout Terminal
            </div>
            <div className="min-h-[80px] bg-black/70 rounded-xl p-3 space-y-1 text-emerald-400">
              {outputs.length === 0 ? (
                <span className="text-gray-600 italic">[Press Next to start iteration]</span>
              ) : (
                outputs.map((o, idx) => (
                  <div key={idx}>&gt; {o}</div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Sequence Items & Pointer Animation */}
        <div className="space-y-4">
          <div className="bg-slate-950 rounded-2xl border border-white/10 p-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Sequence Items Pointer
            </h4>

            {/* Item Boxes Strip */}
            <div className="flex flex-wrap items-center gap-3">
              {sample.items.map((item, idx) => {
                const isCurrent = idx === currentItemIndex;
                const isVisited = idx < currentItemIndex || isFinished;
                return (
                  <motion.div
                    key={idx}
                    animate={{ scale: isCurrent ? 1.08 : 1 }}
                    className={`flex-1 min-w-[70px] p-3 rounded-2xl border text-center font-mono text-xs transition-all ${
                      isCurrent
                        ? 'bg-blue-600 border-blue-400 text-white font-bold shadow-lg shadow-blue-600/30'
                        : isVisited
                        ? 'bg-blue-950/40 border-blue-500/20 text-blue-300'
                        : 'bg-slate-900 border-white/10 text-gray-500'
                    }`}
                  >
                    <div className="text-[10px] text-gray-400 mb-1">[{idx}]</div>
                    <div className="text-sm font-bold">{item}</div>
                    {isCurrent && (
                      <div className="mt-1 text-[9px] text-yellow-300 font-bold uppercase">Active</div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Loop Variable Card */}
            <div className="bg-slate-900/90 border border-blue-500/20 rounded-2xl p-4 space-y-2 font-mono text-xs">
              <div className="text-gray-400">
                Loop Variable (<strong className="text-blue-300">{sample.varName}</strong>):
              </div>
              <div className="text-lg font-bold text-amber-300">
                {currentItemIndex >= 0 ? `"${sample.items[currentItemIndex]}"` : isFinished ? `"${sample.items[sample.items.length - 1]}" (last assigned)` : 'None'}
              </div>
              <div className="text-[11px] text-gray-400 leading-relaxed">
                {currentItemIndex >= 0 
                  ? `Python automatically bound ${sample.varName} = "${sample.items[currentItemIndex]}" for iteration #${currentItemIndex + 1}.`
                  : isFinished
                  ? `Loop complete! All ${sample.items.length} items visited.`
                  : 'Ready to start loop.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
