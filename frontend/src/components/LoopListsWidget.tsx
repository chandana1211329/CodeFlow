import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Repeat, Play, RotateCcw, ArrowRight, CheckCircle2, Layers } from 'lucide-react';

export const LoopListsWidget: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'for' | 'while'>('for');
  const [items, setItems] = useState<string[]>(['apple', 'banana', 'mango', 'orange']);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const totalSteps = items.length;
  const isFinished = currentStep >= totalSteps;
  const currentItem = !isFinished ? items[currentStep] : null;

  const handleNextStep = () => {
    if (!isFinished) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl flex items-center justify-center text-cyan-400">
            <Repeat size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow List Iteration Tracer
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wide">
                for item in list vs while i &lt; len(list)
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Step through list traversal iteration by iteration with real-time variable & output tracing.
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => {
              setActiveMode('for');
              handleReset();
            }}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeMode === 'for' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            for item in fruits
          </button>
          <button
            onClick={() => {
              setActiveMode('while');
              handleReset();
            }}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeMode === 'while' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            while i &lt; len(fruits)
          </button>
        </div>
      </div>

      {/* Traversal Canvas */}
      <div className="bg-slate-950 rounded-2xl border border-white/10 p-5 space-y-4 font-mono text-xs">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
            <Layers size={14} className="text-cyan-400" /> Positional Item Pointer (Length = {items.length})
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleNextStep}
              disabled={isFinished}
              className={`px-3 py-1 rounded-xl text-xs font-bold font-sans flex items-center gap-1.5 transition-all ${
                isFinished
                  ? 'bg-slate-800 text-gray-500 cursor-not-allowed'
                  : 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-md'
              }`}
            >
              <Play size={14} /> {isFinished ? 'Iteration Complete' : `Next Step (${currentStep + 1}/${totalSteps})`}
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-1 rounded-xl text-xs font-bold font-sans bg-slate-900 border border-white/10 text-gray-400 hover:text-white flex items-center gap-1"
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>

        {/* Item Cards with Pointer */}
        <div className="flex flex-wrap items-center justify-center gap-3 py-2">
          {items.map((item, idx) => {
            const isCurrent = currentStep === idx && !isFinished;
            const isVisited = idx < currentStep;

            return (
              <motion.div
                key={idx}
                animate={{ scale: isCurrent ? 1.08 : 1 }}
                className={`border rounded-2xl p-4 text-center min-w-[95px] transition-all relative ${
                  isCurrent
                    ? 'bg-cyan-500/30 border-cyan-400 text-white ring-2 ring-cyan-400 font-bold shadow-lg shadow-cyan-500/20'
                    : isVisited
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-900 border-white/10 text-gray-400'
                }`}
              >
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-slate-950 font-bold text-[9px] font-sans px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                    Active Pointer
                  </div>
                )}
                <div className="text-base font-bold text-cyan-300 border-b border-white/10 pb-1 mb-1">
                  "{item}"
                </div>
                <div className="text-[10px] text-gray-400 font-bold">Index {idx}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Trace Log & Source Code Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        <div className="bg-slate-950 border border-cyan-500/30 rounded-2xl p-5 space-y-2">
          <div className="text-cyan-400 font-bold uppercase text-[11px] font-sans">
            {activeMode === 'for' ? 'for Loop Execution Code' : 'while Loop Execution Code'}
          </div>
          <div className="text-sm font-bold text-white bg-slate-900 p-3 rounded-xl border border-white/10 whitespace-pre">
            {activeMode === 'for'
              ? `fruits = ["apple", "banana", "mango", "orange"]\n\nfor fruit in fruits:\n    print(fruit)`
              : `fruits = ["apple", "banana", "mango", "orange"]\n\ni = 0\nwhile i < len(fruits):\n    print(fruits[i])\n    i += 1`}
          </div>
          <p className="text-gray-400 font-sans text-xs pt-1">
            {activeMode === 'for'
              ? '✓ for loop automatically retrieves each item in order without manual index math.'
              : '✓ while loop uses index i starting at 0 with condition i < len(fruits) to avoid IndexError.'}
          </p>
        </div>

        <div className="bg-slate-950 border border-purple-500/30 rounded-2xl p-5 space-y-2">
          <div className="text-purple-400 font-bold uppercase text-[11px] font-sans">
            Console Output & Iteration State
          </div>
          <div className="bg-slate-900 p-3 rounded-xl border border-white/10 space-y-1 min-h-[100px]">
            {items.slice(0, currentStep).map((it, idx) => (
              <div key={idx} className="text-emerald-400 font-bold">
                &gt; {it}
              </div>
            ))}
            {!isFinished && (
              <div className="text-cyan-300 font-bold animate-pulse">
                &gt; Visiting index {currentStep} ("{currentItem}")...
              </div>
            )}
            {isFinished && (
              <div className="text-gray-500 italic font-sans text-xs">
                -- Traversal Finished (Visited {totalSteps} items) --
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
