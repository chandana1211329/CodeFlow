import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Lock, ArrowRight, Layers, Table, CheckCircle2, AlertCircle } from 'lucide-react';

export const PythonTuplesWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'single' | 'immutability' | 'unpacking' | 'methods'>('single');
  const [singleValue, setSingleValue] = useState<string>('Python');
  const [hasComma, setHasComma] = useState<boolean>(true);

  // Unpacking demo state
  const [personTuple, setPersonTuple] = useState<[string, number, string]>(['Alex', 25, 'Developer']);

  // Immutability attempt state
  const [attemptIndex, setAttemptIndex] = useState<number>(0);
  const [attemptValue, setAttemptValue] = useState<string>('orange');

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl flex items-center justify-center text-cyan-400">
            <Lock size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Python Tuples Studio
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wide">
                Ordered • Immutable • &lt;class 'tuple'&gt;
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Explore tuple syntax, single-item trailing commas, immutability guarantees, and unpacking.
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('single')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'single' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            1-Item Comma
          </button>
          <button
            onClick={() => setActiveTab('immutability')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'immutability' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Immutability
          </button>
          <button
            onClick={() => setActiveTab('unpacking')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'unpacking' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Unpacking
          </button>
          <button
            onClick={() => setActiveTab('methods')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'methods' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Tuple Methods
          </button>
        </div>
      </div>

      {/* Tab 1: Single Item Trailing Comma */}
      {activeTab === 'single' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-5 rounded-2xl border border-white/10">
            <div className="space-y-2">
              <label className="text-gray-400 font-sans font-bold text-xs uppercase">Single Item String:</label>
              <input
                type="text"
                value={singleValue}
                onChange={(e) => setSingleValue(e.target.value)}
                className="w-full bg-slate-900 border border-cyan-500/40 rounded-xl p-2.5 text-white font-bold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-400 font-sans font-bold text-xs uppercase">Include Trailing Comma?</label>
              <label className="flex items-center gap-2 cursor-pointer bg-slate-900 p-2.5 rounded-xl border border-white/10">
                <input
                  type="checkbox"
                  checked={hasComma}
                  onChange={(e) => setHasComma(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500"
                />
                <span className="text-cyan-300 font-bold">
                  {hasComma ? '("Python",) → Trailing Comma' : '("Python") → No Comma'}
                </span>
              </label>
            </div>
          </div>

          <div className="bg-slate-950 border border-cyan-500/30 rounded-2xl p-5 space-y-2">
            <div className="text-cyan-400 font-bold uppercase text-[11px] font-sans flex justify-between">
              <span>Evaluated Python Type</span>
              <span className={hasComma ? 'text-emerald-400' : 'text-amber-400'}>
                type() → {hasComma ? "<class 'tuple'>" : "<class 'str'>"}
              </span>
            </div>
            <div className="text-base font-bold text-cyan-300 bg-slate-900 p-3.5 rounded-xl border border-white/10">
              x = ("{singleValue}"{hasComma ? ',' : ''}) → {hasComma ? `('${singleValue}',)` : `'${singleValue}'`}
            </div>
            <p className="text-gray-400 font-sans text-xs pt-1">
              {hasComma
                ? '✓ Trailing comma signals to Python that this is a 1-item tuple.'
                : '⚠ Without a trailing comma, parentheses are evaluated as a string expression!'}
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Immutability Attempt */}
      {activeTab === 'immutability' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="text-gray-400 font-sans font-bold text-xs uppercase">Current Tuple (Immutable):</div>
            <div className="text-base font-bold text-cyan-300 bg-slate-900 p-3 rounded-xl border border-white/10">
              fruits = ("apple", "banana", "mango")
            </div>
          </div>

          <div className="bg-red-950/50 border border-red-500/50 rounded-2xl p-5 space-y-2 text-red-200">
            <div className="flex items-center gap-2 font-bold text-red-400 text-sm">
              <ShieldAlert size={18} /> TypeError: 'tuple' object does not support item assignment
            </div>
            <div className="text-sm font-bold text-white bg-red-900/60 p-3 rounded-xl border border-red-500/40">
              fruits[0] = "orange" # ❌ FORBIDDEN! Tuples are immutable!
            </div>
            <p className="text-xs text-red-300 font-sans pt-1">
              Tuples cannot be altered after creation. Item assignment, <code className="bg-red-900 px-1.5 py-0.5 rounded font-bold text-white">append()</code>, and <code className="bg-red-900 px-1.5 py-0.5 rounded font-bold text-white">remove()</code> are completely prohibited!
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Tuple Unpacking */}
      {activeTab === 'unpacking' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/30 space-y-3">
            <div className="text-purple-400 font-bold uppercase text-[11px] font-sans">
              Tuple Unpacking Mental Model
            </div>
            <div className="text-base font-bold text-cyan-300 bg-slate-900 p-3.5 rounded-xl border border-white/10">
              person = ("{personTuple[0]}", {personTuple[1]}, "{personTuple[2]}")<br />
              name, age, job = person
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold pt-2">
              <div className="bg-slate-900 p-2.5 rounded-xl border border-cyan-500/40 text-cyan-300">
                name = "{personTuple[0]}"
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-emerald-500/40 text-emerald-300">
                age = {personTuple[1]}
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-purple-500/40 text-purple-300">
                job = "{personTuple[2]}"
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Tuple Methods */}
      {activeTab === 'methods' && (
        <div className="bg-slate-950 rounded-2xl border border-white/10 p-5 font-mono text-xs space-y-3">
          <div className="text-gray-400 font-sans font-bold text-xs uppercase">
            Section 47 Tuple Methods Comparison Matrix
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-cyan-400 font-bold">
                  <th className="p-2">Method</th>
                  <th className="p-2">Purpose</th>
                  <th className="p-2">Return Type</th>
                  <th className="p-2">Missing Value Result</th>
                </tr>
              </thead>
              <tbody className="text-gray-300 divide-y divide-white/5">
                <tr>
                  <td className="p-2 text-emerald-300 font-bold">tup.count(x)</td>
                  <td className="p-2">Counts occurrences of x</td>
                  <td className="p-2 text-emerald-400">&lt;class 'int'&gt;</td>
                  <td className="p-2 text-gray-400">Returns 0 (Safe)</td>
                </tr>
                <tr>
                  <td className="p-2 text-amber-300 font-bold">tup.index(x)</td>
                  <td className="p-2">Finds first index position of x</td>
                  <td className="p-2 text-amber-400">&lt;class 'int'&gt;</td>
                  <td className="p-2 text-red-400 font-bold">ValueError</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
