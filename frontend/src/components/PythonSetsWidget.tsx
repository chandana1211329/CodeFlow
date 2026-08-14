import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Sparkles, Filter, Trash2, ArrowRightLeft, Table, CheckCircle2, AlertTriangle } from 'lucide-react';

export const PythonSetsWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'unique' | 'empty' | 'operations' | 'removal'>('operations');

  // Operations state
  const [setA, setSetA] = useState<number[]>([1, 2, 3, 4]);
  const [setB, setSetB] = useState<number[]>([3, 4, 5, 6]);
  const [opMode, setOpMode] = useState<'union' | 'intersection' | 'diffA' | 'diffB' | 'symDiff'>('union');

  // Removal demo state
  const [removalMethod, setRemovalMethod] = useState<'remove' | 'discard' | 'pop'>('remove');
  const [targetItem, setTargetItem] = useState<string>('orange');

  const computeOpResult = () => {
    const sA = new Set(setA);
    const sB = new Set(setB);

    switch (opMode) {
      case 'union':
        const u = Array.from(new Set([...setA, ...setB])).sort((x, y) => x - y);
        return {
          code: 'A | B  (or A.union(B))',
          title: 'Union (A | B)',
          result: `{${u.join(', ')}}`,
          desc: 'Combines all unique elements that exist in EITHER set A or set B.'
        };
      case 'intersection':
        const i = setA.filter((x) => sB.has(x)).sort((x, y) => x - y);
        return {
          code: 'A & B  (or A.intersection(B))',
          title: 'Intersection (A & B)',
          result: `{${i.join(', ')}}`,
          desc: 'Keeps only the common elements that exist in BOTH set A and set B.'
        };
      case 'diffA':
        const dA = setA.filter((x) => !sB.has(x)).sort((x, y) => x - y);
        return {
          code: 'A - B  (or A.difference(B))',
          title: 'Difference (A - B)',
          result: `{${dA.join(', ')}}`,
          desc: 'Elements in set A that are NOT present in set B. (Direction matters!)'
        };
      case 'diffB':
        const dB = setB.filter((x) => !sA.has(x)).sort((x, y) => x - y);
        return {
          code: 'B - A  (or B.difference(A))',
          title: 'Difference (B - A)',
          result: `{${dB.join(', ')}}`,
          desc: 'Elements in set B that are NOT present in set A.'
        };
      case 'symDiff':
        const sD = Array.from(new Set([...setA.filter((x) => !sB.has(x)), ...setB.filter((x) => !sA.has(x))])).sort((x, y) => x - y);
        return {
          code: 'A ^ B  (or A.symmetric_difference(B))',
          title: 'Symmetric Difference (A ^ B)',
          result: `{${sD.join(', ')}}`,
          desc: 'Elements present in either set A or set B, but NOT in both.'
        };
    }
  };

  const currentOp = computeOpResult();

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
              CodeFlow Python Sets Operations Studio
              <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-400/30 uppercase tracking-wide">
                Unordered • Unique • Set Algebra
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Explore set uniqueness, empty set syntax trap, Venn diagram operations, and removal rules.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('operations')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'operations' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Set Algebra
          </button>
          <button
            onClick={() => setActiveTab('unique')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'unique' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Uniqueness
          </button>
          <button
            onClick={() => setActiveTab('empty')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'empty' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Empty Set Trap
          </button>
          <button
            onClick={() => setActiveTab('removal')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'removal' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Removal Rules
          </button>
        </div>
      </div>

      {/* Tab 1: Set Operations */}
      {activeTab === 'operations' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-white/10">
            <div className="space-y-1">
              <span className="text-cyan-400 font-bold text-xs uppercase font-sans">Set A:</span>
              <div className="text-sm font-bold text-cyan-300 font-mono">A = &#123;{setA.join(', ')}&#125;</div>
            </div>
            <div className="space-y-1">
              <span className="text-purple-400 font-bold text-xs uppercase font-sans">Set B:</span>
              <div className="text-sm font-bold text-purple-300 font-mono">B = &#123;{setB.join(', ')}&#125;</div>
            </div>
          </div>

          {/* Operation Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-2 rounded-2xl border border-white/10 font-sans font-bold text-xs">
            <button
              onClick={() => setOpMode('union')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                opMode === 'union' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              Union (A | B)
            </button>
            <button
              onClick={() => setOpMode('intersection')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                opMode === 'intersection' ? 'bg-cyan-600 text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              Intersection (A & B)
            </button>
            <button
              onClick={() => setOpMode('diffA')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                opMode === 'diffA' ? 'bg-emerald-600 text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              Diff (A - B)
            </button>
            <button
              onClick={() => setOpMode('diffB')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                opMode === 'diffB' ? 'bg-emerald-600 text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              Diff (B - A)
            </button>
            <button
              onClick={() => setOpMode('symDiff')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                opMode === 'symDiff' ? 'bg-amber-600 text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              Sym Diff (A ^ B)
            </button>
          </div>

          {/* Result Card */}
          <div className="bg-slate-950 border border-purple-500/30 rounded-2xl p-5 space-y-2">
            <div className="text-purple-400 font-bold uppercase text-[11px] font-sans flex justify-between">
              <span>{currentOp.title}</span>
              <span className="text-purple-300">{currentOp.code}</span>
            </div>
            <div className="text-base font-bold text-cyan-300 bg-slate-900 p-3.5 rounded-xl border border-white/10">
              Result = <span className="text-emerald-400 font-bold">{currentOp.result}</span>
            </div>
            <p className="text-gray-400 font-sans text-xs pt-1">{currentOp.desc}</p>
          </div>
        </div>
      )}

      {/* Tab 2: Uniqueness */}
      {activeTab === 'unique' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-cyan-500/30 space-y-2">
            <div className="text-gray-400 font-sans font-bold text-xs uppercase">Duplicate Collapse Simulation:</div>
            <div className="text-base font-bold text-cyan-300 bg-slate-900 p-3.5 rounded-xl border border-white/10">
              numbers = set([1, 2, 2, 3, 3, 3]) → &#123;1, 2, 3&#125; (len = 3)
            </div>
            <p className="text-gray-400 font-sans text-xs pt-1">
              ✓ Sets automatically collapse repeated duplicate values into a single unique item!
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Empty Set Trap */}
      {activeTab === 'empty' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="bg-slate-950 border border-red-500/30 rounded-2xl p-5 space-y-2">
            <div className="text-red-400 font-bold uppercase text-[11px] font-sans flex justify-between">
              <span>x = &#123;&#125; (Common Beginner Trap)</span>
              <span className="text-red-300">&lt;class 'dict'&gt;</span>
            </div>
            <div className="text-base font-bold text-white bg-slate-900 p-3 rounded-xl border border-white/10">
              x = &#123;&#125;<br />
              type(x) → <span className="text-red-400">&lt;class 'dict'&gt;</span>
            </div>
            <p className="text-gray-400 font-sans text-xs pt-1">
              ❌ Empty curly braces <code className="text-red-400">&#123;&#125;</code> create a <strong>Dictionary</strong>, NOT a Set!
            </p>
          </div>

          <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
            <div className="text-emerald-400 font-bold uppercase text-[11px] font-sans flex justify-between">
              <span>x = set() (Correct Empty Set)</span>
              <span className="text-emerald-300">&lt;class 'set'&gt;</span>
            </div>
            <div className="text-base font-bold text-white bg-slate-900 p-3 rounded-xl border border-white/10">
              x = set()<br />
              type(x) → <span className="text-emerald-400">&lt;class 'set'&gt;</span>
            </div>
            <p className="text-gray-400 font-sans text-xs pt-1">
              ✓ Always use <code className="text-emerald-400">set()</code> to initialize an empty set object.
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: Removal Rules */}
      {activeTab === 'removal' && (
        <div className="bg-slate-950 rounded-2xl border border-white/10 p-5 font-mono text-xs space-y-3">
          <div className="text-gray-400 font-sans font-bold text-xs uppercase">
            Section 48 Set Removal Methods Matrix
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-cyan-400 font-bold">
                  <th className="p-2">Method</th>
                  <th className="p-2">Behavior</th>
                  <th className="p-2">Missing Value Result</th>
                  <th className="p-2">Return Type</th>
                </tr>
              </thead>
              <tbody className="text-gray-300 divide-y divide-white/5">
                <tr>
                  <td className="p-2 text-red-300 font-bold">remove(x)</td>
                  <td className="p-2">Removes item x</td>
                  <td className="p-2 text-red-400 font-bold">KeyError</td>
                  <td className="p-2 text-gray-400">None</td>
                </tr>
                <tr>
                  <td className="p-2 text-emerald-300 font-bold">discard(x)</td>
                  <td className="p-2">Removes item x if present</td>
                  <td className="p-2 text-emerald-400">No Error (Safe)</td>
                  <td className="p-2 text-gray-400">None</td>
                </tr>
                <tr>
                  <td className="p-2 text-purple-300 font-bold">pop()</td>
                  <td className="p-2">Removes arbitrary element</td>
                  <td className="p-2 text-red-400 font-bold">KeyError (if empty)</td>
                  <td className="p-2 text-purple-400">Removed element</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
