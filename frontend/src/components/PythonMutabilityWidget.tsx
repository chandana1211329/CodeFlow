import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowRightLeft, Layers, Table, CheckCircle2, AlertTriangle, RefreshCcw } from 'lucide-react';

export const PythonMutabilityWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'references' | 'mutation_vs_reassign'>('matrix');

  // References state
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const [mutatedValue, setMutatedValue] = useState<number>(99);

  // Compute reference execution
  const computeRef = () => {
    if (!isCopy) {
      const a = [10, 20, 30];
      const b = a; // Reference assignment
      b[0] = mutatedValue;
      return {
        code: `a = [10, 20, 30]\nb = a\nb[0] = ${mutatedValue}`,
        aResult: JSON.stringify(a),
        bResult: JSON.stringify(b),
        isSameObject: a === b,
        note: `b = a creates a SECOND VARIABLE pointing to the SAME LIST OBJECT. Mutating b[0] ALSO updates a[0]!`
      };
    } else {
      const a = [10, 20, 30];
      const b = [...a]; // Shallow copy
      b[0] = mutatedValue;
      return {
        code: `a = [10, 20, 30]\nb = a.copy()\nb[0] = ${mutatedValue}`,
        aResult: JSON.stringify(a),
        bResult: JSON.stringify(b),
        isSameObject: false,
        note: `b = a.copy() creates a NEW LIST OBJECT (a is b → False). Mutating b[0] leaves a[0] completely untouched!`
      };
    }
  };

  const refRes = computeRef();

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl flex items-center justify-center text-cyan-400">
            <ArrowRightLeft size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Python Mutability & Data Changes Studio
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wide">
                Shared References • Mutation vs Reassignment
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Understand why mutable objects share changes across variables and how equality (==) differs from identity (is).
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'matrix' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Mutability Matrix
          </button>
          <button
            onClick={() => setActiveTab('references')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'references' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Shared References
          </button>
          <button
            onClick={() => setActiveTab('mutation_vs_reassign')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'mutation_vs_reassign' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Mutation vs Reassignment
          </button>
        </div>
      </div>

      {/* Tab 1: Mutability Matrix */}
      {activeTab === 'matrix' && (
        <div className="bg-slate-950 rounded-2xl border border-white/10 p-5 font-mono text-xs space-y-3">
          <div className="text-gray-400 font-sans font-bold text-xs uppercase">
            Section 50 Python Data Types Mutability Master Matrix
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-cyan-400 font-bold">
                  <th className="p-2">Data Type</th>
                  <th className="p-2">Mutable in Place?</th>
                  <th className="p-2">Item Assignment (x[0] = val)?</th>
                  <th className="p-2">Common Behavior</th>
                </tr>
              </thead>
              <tbody className="text-gray-300 divide-y divide-white/5">
                <tr>
                  <td className="p-2 text-cyan-300 font-bold">str (String)</td>
                  <td className="p-2 text-red-400 font-bold">NO (Immutable)</td>
                  <td className="p-2 text-red-400 font-bold">TypeError</td>
                  <td className="p-2 text-gray-400">Methods return NEW string objects</td>
                </tr>
                <tr>
                  <td className="p-2 text-cyan-300 font-bold">tuple</td>
                  <td className="p-2 text-red-400 font-bold">NO (Immutable)</td>
                  <td className="p-2 text-red-400 font-bold">TypeError</td>
                  <td className="p-2 text-gray-400">Fixed structure after creation</td>
                </tr>
                <tr>
                  <td className="p-2 text-emerald-300 font-bold">list</td>
                  <td className="p-2 text-emerald-400 font-bold">YES (Mutable)</td>
                  <td className="p-2 text-emerald-400 font-bold">Allowed</td>
                  <td className="p-2 text-gray-400">In-place mutation (append, sort, replace)</td>
                </tr>
                <tr>
                  <td className="p-2 text-purple-300 font-bold">dict</td>
                  <td className="p-2 text-purple-400 font-bold">YES (Mutable)</td>
                  <td className="p-2 text-purple-400 font-bold">Allowed (dict[key] = val)</td>
                  <td className="p-2 text-gray-400">In-place key-value mapping updates</td>
                </tr>
                <tr>
                  <td className="p-2 text-amber-300 font-bold">set</td>
                  <td className="p-2 text-amber-400 font-bold">YES (Mutable)</td>
                  <td className="p-2 text-red-400 font-bold">Unindexed</td>
                  <td className="p-2 text-gray-400">In-place element additions & removals</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Shared References */}
      {activeTab === 'references' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-5 rounded-2xl border border-white/10">
            <div className="space-y-2">
              <label className="text-gray-400 font-sans font-bold text-xs uppercase">Assignment Mode:</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsCopy(false)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold font-sans border transition-all ${
                    !isCopy ? 'bg-purple-950 border-purple-500 text-purple-200' : 'bg-slate-900 border-white/10 text-gray-400'
                  }`}
                >
                  b = a (Shared Reference)
                </button>
                <button
                  onClick={() => setIsCopy(true)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold font-sans border transition-all ${
                    isCopy ? 'bg-emerald-950 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-white/10 text-gray-400'
                  }`}
                >
                  b = a.copy() (Independent Copy)
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-400 font-sans font-bold text-xs uppercase">Mutate b[0] to Value:</label>
              <input
                type="number"
                value={mutatedValue}
                onChange={(e) => setMutatedValue(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-purple-500/40 rounded-xl p-2 text-white font-bold"
              />
            </div>
          </div>

          <div className="bg-slate-950 border border-purple-500/30 rounded-2xl p-5 space-y-3">
            <div className="text-purple-400 font-bold uppercase text-[11px] font-sans flex justify-between">
              <span>Execution State</span>
              <span className="text-emerald-400 font-bold">a is b → {refRes.isSameObject ? 'True (Same Object)' : 'False (Different Objects)'}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm font-bold bg-slate-900 p-3 rounded-xl border border-white/10">
              <div>a: <span className="text-cyan-300">{refRes.aResult}</span></div>
              <div>b: <span className="text-emerald-400">{refRes.bResult}</span></div>
            </div>
            <p className="text-gray-400 font-sans text-xs pt-1">{refRes.note}</p>
          </div>
        </div>
      )}

      {/* Tab 3: Mutation vs Reassignment */}
      {activeTab === 'mutation_vs_reassign' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
            <div className="text-emerald-400 font-bold uppercase text-[11px] font-sans">
              1. In-Place Mutation
            </div>
            <div className="text-base font-bold text-white bg-slate-900 p-3 rounded-xl border border-white/10">
              nums = [1, 2, 3]<br />
              nums.append(4) <span className="text-emerald-400"># Same object modified!</span>
            </div>
            <p className="text-gray-400 font-sans text-xs pt-1">
              ✓ Modifies the EXISTING object in memory. All shared references observe this update.
            </p>
          </div>

          <div className="bg-slate-950 border border-cyan-500/30 rounded-2xl p-5 space-y-2">
            <div className="text-cyan-400 font-bold uppercase text-[11px] font-sans">
              2. Variable Reassignment
            </div>
            <div className="text-base font-bold text-white bg-slate-900 p-3 rounded-xl border border-white/10">
              nums = [1, 2, 3]<br />
              nums = [4, 5, 6] <span className="text-cyan-300"># Rebound to NEW object!</span>
            </div>
            <p className="text-gray-400 font-sans text-xs pt-1">
              ✓ Rebinds variable <code className="text-cyan-300">nums</code> to point to a COMPLETELY NEW object in memory.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
