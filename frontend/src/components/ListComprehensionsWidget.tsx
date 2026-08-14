import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, Filter, Layers, Code } from 'lucide-react';

export const ListComprehensionsWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'basic' | 'conditional'>('basic');
  const [sourceNumbers, setSourceNumbers] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const [multiplier, setMultiplier] = useState<number>(2);
  const [filterThreshold, setFilterThreshold] = useState<number>(3);
  const [filterEvenOnly, setFilterEvenOnly] = useState<boolean>(true);

  // Compute Basic Comprehension
  const getBasicResult = () => {
    const res = sourceNumbers.map((x) => x * multiplier);
    return {
      code: `[x * ${multiplier} for x in numbers]`,
      traditional: `doubled = []\nfor x in numbers:\n    doubled.append(x * ${multiplier})`,
      result: JSON.stringify(res),
      desc: `Transforms every source number x by evaluating x * ${multiplier} into a NEW list.`
    };
  };

  // Compute Conditional Comprehension
  const getConditionalResult = () => {
    const filtered = sourceNumbers.filter((x) => (filterEvenOnly ? x % 2 === 0 : x > filterThreshold));
    const transformed = filtered.map((x) => x * multiplier);

    const conditionStr = filterEvenOnly ? 'if x % 2 == 0' : `if x > ${filterThreshold}`;

    return {
      code: `[x * ${multiplier} for x in numbers ${conditionStr}]`,
      traditional: `res = []\nfor x in numbers:\n    ${filterEvenOnly ? 'if x % 2 == 0:' : `if x > ${filterThreshold}:`}\n        res.append(x * ${multiplier})`,
      result: JSON.stringify(transformed),
      filteredOutCount: sourceNumbers.length - filtered.length,
      desc: `First FILTERS items by ${conditionStr}, then TRANSFORMS allowed items by x * ${multiplier}.`
    };
  };

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500/20 border border-purple-400/40 rounded-2xl flex items-center justify-center text-purple-400">
            <Sparkles size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow List Comprehensions Studio
              <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-400/30 uppercase tracking-wide">
                [expression for item in iterable if condition]
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Interactively construct and trace basic & conditional list comprehensions in Python.
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('basic')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'basic' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Basic Comprehension
          </button>
          <button
            onClick={() => setActiveTab('conditional')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'conditional' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Conditions in Comprehensions
          </button>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 font-mono text-xs space-y-4">
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <span className="text-gray-400 font-sans font-bold text-xs uppercase">Source List (numbers):</span>
          <span className="text-cyan-400 font-bold">[{sourceNumbers.join(', ')}]</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-gray-400 font-sans font-bold text-xs uppercase">Expression Multiplier (x * N):</label>
            <input
              type="number"
              value={multiplier}
              onChange={(e) => setMultiplier(parseInt(e.target.value) || 1)}
              className="w-full bg-slate-900 border border-purple-500/40 rounded-xl p-2.5 text-white font-bold"
            />
          </div>

          {activeTab === 'conditional' && (
            <div className="space-y-2">
              <label className="text-gray-400 font-sans font-bold text-xs uppercase">Filter Rule:</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterEvenOnly(true)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold font-sans border transition-all ${
                    filterEvenOnly ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-900 border-white/10 text-gray-400'
                  }`}
                >
                  if x % 2 == 0 (Evens)
                </button>
                <button
                  onClick={() => setFilterEvenOnly(false)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold font-sans border transition-all ${
                    !filterEvenOnly ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-900 border-white/10 text-gray-400'
                  }`}
                >
                  if x &gt; {filterThreshold}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comparison & Execution Canvas */}
      {activeTab === 'basic' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="bg-slate-950 border border-purple-500/30 rounded-2xl p-5 space-y-2">
            <div className="text-purple-400 font-bold uppercase text-[11px] font-sans">
              Python List Comprehension
            </div>
            <div className="text-base font-bold text-cyan-300 bg-slate-900 p-3.5 rounded-xl border border-white/10">
              {getBasicResult().code} → <span className="text-emerald-400 font-bold">{getBasicResult().result}</span>
            </div>
            <p className="text-gray-400 font-sans text-xs pt-1">{getBasicResult().desc}</p>
          </div>

          <div className="bg-slate-950 border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="text-gray-400 font-bold uppercase text-[11px] font-sans">
              Equivalent Traditional for Loop
            </div>
            <div className="text-xs font-bold text-gray-300 bg-slate-900 p-3 rounded-xl border border-white/10 whitespace-pre">
              {getBasicResult().traditional}
            </div>
            <p className="text-gray-400 font-sans text-xs pt-1">
              ✓ List comprehension combines list creation, loop traversal, and appending into one clean expression.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="bg-slate-950 border border-cyan-500/30 rounded-2xl p-5 space-y-2">
            <div className="text-cyan-400 font-bold uppercase text-[11px] font-sans">
              Conditional List Comprehension
            </div>
            <div className="text-base font-bold text-cyan-300 bg-slate-900 p-3.5 rounded-xl border border-white/10">
              {getConditionalResult().code} → <span className="text-emerald-400 font-bold">{getConditionalResult().result}</span>
            </div>
            <p className="text-gray-400 font-sans text-xs pt-1">{getConditionalResult().desc}</p>
          </div>

          <div className="bg-slate-950 border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="text-gray-400 font-bold uppercase text-[11px] font-sans">
              Equivalent Conditional for Loop
            </div>
            <div className="text-xs font-bold text-gray-300 bg-slate-900 p-3 rounded-xl border border-white/10 whitespace-pre">
              {getConditionalResult().traditional}
            </div>
            <p className="text-gray-400 font-sans text-xs pt-1">
              ✓ Items that fail the condition are skipped ({getConditionalResult().filteredOutCount} skipped).
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
