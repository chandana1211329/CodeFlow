import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, Layers, ArrowDown, ArrowUp, AlertCircle, CheckCircle2 } from 'lucide-react';

export const RecursionWidget: React.FC = () => {
  const [recType, setRecType] = useState<'countdown' | 'factorial' | 'infinite'>('countdown');
  const [startNum, setStartNum] = useState<number>(3);

  const computeCountdownStack = () => {
    const stack: { n: number; phase: string; desc: string }[] = [];
    for (let i = startNum; i >= 0; i--) {
      if (i === 0) {
        stack.push({ n: i, phase: 'BASE CASE', desc: 'n == 0 → Base case met! Stop recursion & return.' });
      } else {
        stack.push({ n: i, phase: 'RECURSIVE CASE', desc: `n == ${i} → Print ${i}, call countdown(${i - 1}).` });
      }
    }
    return stack;
  };

  const computeFactorialStack = () => {
    const stack: { n: number; returnVal?: number; desc: string }[] = [];
    const fact = (n: number): number => {
      if (n <= 1) {
        stack.push({ n, returnVal: 1, desc: `factorial(${n}) → Base case (n=1), returns 1.` });
        return 1;
      }
      const res = n * fact(n - 1);
      stack.push({ n, returnVal: res, desc: `factorial(${n}) → Waiting for ${n} * factorial(${n - 1}). Resolves to ${res}.` });
      return res;
    };
    const total = fact(startNum);
    return { stack, total };
  };

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500/20 border border-purple-400/40 rounded-2xl flex items-center justify-center text-purple-400">
            <RefreshCcw size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Recursion & Call Stack Studio
              <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-400/30 uppercase tracking-wide">
                Self-Calling Functions • Stack Unwinding
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Visualize base case termination, recursive problem reduction, and call stack growth & unwinding.
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setRecType('countdown')}
            className={`px-3 py-1 rounded-xl transition-all ${
              recType === 'countdown' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Countdown
          </button>
          <button
            onClick={() => setRecType('factorial')}
            className={`px-3 py-1 rounded-xl transition-all ${
              recType === 'factorial' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Factorial
          </button>
          <button
            onClick={() => setRecType('infinite')}
            className={`px-3 py-1 rounded-xl transition-all ${
              recType === 'infinite' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Infinite Trap
          </button>
        </div>
      </div>

      {/* Mode 1: Countdown */}
      {recType === 'countdown' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-2xl border border-white/10">
            <label className="text-gray-400 font-sans font-bold text-xs uppercase">Start Number n:</label>
            <input
              type="number"
              min={1}
              max={5}
              value={startNum}
              onChange={(e) => setStartNum(Math.max(1, Math.min(5, parseInt(e.target.value) || 1)))}
              className="bg-slate-900 border border-cyan-500/40 rounded-xl p-2 text-white font-bold w-24 text-center"
            />
            <span className="text-gray-400 text-xs font-sans">(Max 5 for visual clarity)</span>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-cyan-500/30 space-y-3">
            <div className="text-cyan-400 font-bold uppercase text-[11px] font-sans">
              Call Stack Frames (Top of Stack Resolves First)
            </div>
            <div className="space-y-2">
              {computeCountdownStack().map((frame, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    frame.n === 0
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                      : 'bg-slate-900 border-white/10 text-cyan-300'
                  }`}
                >
                  <div className="font-bold">countdown({frame.n})</div>
                  <div className="text-xs font-sans text-gray-300">{frame.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Factorial */}
      {recType === 'factorial' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/30 space-y-3">
            <div className="text-purple-400 font-bold uppercase text-[11px] font-sans">
              factorial({startNum}) Stack Unwinding Resolution
            </div>
            <div className="text-base font-bold text-emerald-400 bg-slate-900 p-3.5 rounded-xl border border-white/10">
              factorial({startNum}) = {computeFactorialStack().total}
            </div>
            <div className="space-y-2 pt-1">
              {computeFactorialStack().stack.map((frame, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 p-3 rounded-xl border border-purple-500/30 flex items-center justify-between text-gray-300"
                >
                  <div className="font-bold text-purple-300">factorial({frame.n})</div>
                  <div className="text-xs font-sans">{frame.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Infinite Trap */}
      {recType === 'infinite' && (
        <div className="bg-red-950/50 border border-red-500/50 rounded-2xl p-5 space-y-3 font-mono text-xs text-red-200">
          <div className="flex items-center gap-2 font-bold text-red-400 text-sm">
            <AlertCircle size={18} /> RecursionError: maximum recursion depth exceeded
          </div>
          <div className="text-sm font-bold text-white bg-red-900/60 p-3.5 rounded-xl border border-red-500/40">
            def infinite():<br />
            &nbsp;&nbsp;&nbsp;&nbsp;infinite() # ❌ NO BASE CASE! Calls accumulate endlessly!
          </div>
          <p className="text-xs text-red-300 font-sans pt-1">
            Without a reachable <strong>base case</strong>, stack frames accumulate indefinitely until Python halts execution with a <strong>RecursionError</strong>!
          </p>
        </div>
      )}
    </div>
  );
};
