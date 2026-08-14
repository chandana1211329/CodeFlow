import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, Cpu, HardDrive, CheckCircle2, AlertCircle, ArrowRight, Zap } from 'lucide-react';

export const ComplexityAnalysisWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chart' | 'counter' | 'halving' | 'cases'>('chart');

  // Tab 2 Counter state
  const [nVal, setNVal] = useState<number>(5);
  const [complexityType, setComplexityType] = useState<'o1' | 'on' | 'on2'>('on');

  // Tab 3 Halving state
  const [logN, setLogN] = useState<number>(16);

  // Tab 4 Case state
  const [searchTarget, setSearchTarget] = useState<number>(5);
  const searchList = [5, 12, 19, 24, 33, 41, 50];

  const getOperationsCount = () => {
    switch (complexityType) {
      case 'o1': return 1;
      case 'on': return nVal;
      case 'on2': return nVal * nVal;
    }
  };

  const getHalvingSteps = () => {
    const steps: number[] = [];
    let curr = logN;
    while (curr >= 1) {
      steps.push(curr);
      curr = Math.floor(curr / 2);
    }
    return steps;
  };

  const getSearchCase = () => {
    const idx = searchList.indexOf(searchTarget);
    if (idx === 0) {
      return { caseName: 'BEST CASE', ops: 1, bigO: 'O(1)', desc: 'Target found at index 0! Minimum work required.' };
    } else if (idx === -1) {
      return { caseName: 'WORST CASE', ops: searchList.length, bigO: 'O(n)', desc: 'Target not found! Checked all n items in collection.' };
    } else if (idx === searchList.length - 1) {
      return { caseName: 'WORST CASE', ops: searchList.length, bigO: 'O(n)', desc: 'Target found at final index! Checked all n items.' };
    } else {
      return { caseName: 'AVERAGE / MIDDLE CASE', ops: idx + 1, bigO: 'O(n)', desc: `Target found after ${idx + 1} checks.` };
    }
  };

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl flex items-center justify-center text-cyan-400">
            <Activity size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Complexity Analysis Studio
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wide">
                Section 2 • Big O Growth Lab
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Analyze work growth, time & space complexities, logarithmic halving, and best vs worst cases.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('chart')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'chart' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Growth Chart
          </button>
          <button
            onClick={() => setActiveTab('counter')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'counter' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Work Counter
          </button>
          <button
            onClick={() => setActiveTab('halving')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'halving' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            O(log n) Halving
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'cases' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Best vs Worst
          </button>
        </div>
      </div>

      {/* Tab 1: Big O Growth Chart */}
      {activeTab === 'chart' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-cyan-500/30 space-y-3">
            <div className="text-cyan-400 font-bold uppercase text-[11px] font-sans">
              Big O Growth Trend Comparison Table
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-cyan-300 font-bold">
                    <th className="p-2.5">Input Size (n)</th>
                    <th className="p-2.5 text-emerald-400">O(1) Constant</th>
                    <th className="p-2.5 text-cyan-400">O(log n) Logarithmic</th>
                    <th className="p-2.5 text-purple-400">O(n) Linear</th>
                    <th className="p-2.5 text-red-400">O(n²) Quadratic</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white">n = 1</td>
                    <td className="p-2.5 text-emerald-400">1 operation</td>
                    <td className="p-2.5 text-cyan-400">~1 step</td>
                    <td className="p-2.5 text-purple-400">1 operation</td>
                    <td className="p-2.5 text-red-400">1 operation</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">n = 10</td>
                    <td className="p-2.5 text-emerald-400">1 operation</td>
                    <td className="p-2.5 text-cyan-400">~3 steps</td>
                    <td className="p-2.5 text-purple-400">10 operations</td>
                    <td className="p-2.5 text-red-400">100 operations</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">n = 100</td>
                    <td className="p-2.5 text-emerald-400">1 operation</td>
                    <td className="p-2.5 text-cyan-400">~7 steps</td>
                    <td className="p-2.5 text-purple-400">100 operations</td>
                    <td className="p-2.5 text-red-400">10,000 operations</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">n = 1,000</td>
                    <td className="p-2.5 text-emerald-400">1 operation</td>
                    <td className="p-2.5 text-cyan-400">~10 steps</td>
                    <td className="p-2.5 text-purple-400">1,000 operations</td>
                    <td className="p-2.5 text-red-400">1,000,000 operations 💥</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-white/10 text-gray-300 font-sans text-xs flex justify-between items-center">
            <span>🚀 <strong>Efficiency Ordering:</strong> O(1) &lt; O(log n) &lt; O(n) &lt; O(n²)</span>
          </div>
        </div>
      )}

      {/* Tab 2: Work Counter */}
      {activeTab === 'counter' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-white/10">
            <div className="space-y-2">
              <label className="text-gray-400 font-sans font-bold text-xs uppercase">
                Configure Input Size n: {nVal}
              </label>
              <input
                type="range"
                min={1}
                max={20}
                value={nVal}
                onChange={(e) => setNVal(parseInt(e.target.value))}
                className="w-full text-purple-500 accent-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-400 font-sans font-bold text-xs uppercase">
                Select Complexity:
              </label>
              <div className="flex gap-1 font-sans font-bold text-xs">
                <button
                  onClick={() => setComplexityType('o1')}
                  className={`flex-1 py-2 rounded-xl transition-all ${
                    complexityType === 'o1' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-gray-400'
                  }`}
                >
                  O(1) Constant
                </button>
                <button
                  onClick={() => setComplexityType('on')}
                  className={`flex-1 py-2 rounded-xl transition-all ${
                    complexityType === 'on' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-gray-400'
                  }`}
                >
                  O(n) Linear
                </button>
                <button
                  onClick={() => setComplexityType('on2')}
                  className={`flex-1 py-2 rounded-xl transition-all ${
                    complexityType === 'on2' ? 'bg-red-600 text-white' : 'bg-slate-900 text-gray-400'
                  }`}
                >
                  O(n²) Quadratic
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/30 space-y-3">
            <div className="text-purple-400 font-bold uppercase text-[11px] font-sans">
              Execution Work Counter Simulation
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-white/10 flex justify-between items-center text-sm">
              <span className="text-gray-300">Input Size n = {nVal}</span>
              <span className="text-emerald-400 font-bold text-base">
                Total Operations: {getOperationsCount()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: O(log n) Halving Simulator */}
      {activeTab === 'halving' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-2xl border border-white/10">
            <label className="text-gray-400 font-sans font-bold text-xs uppercase">Initial Problem Size n:</label>
            {[8, 16, 32, 64, 128].map(sz => (
              <button
                key={sz}
                onClick={() => setLogN(sz)}
                className={`px-3 py-1 rounded-xl font-bold transition-all ${
                  logN === sz ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-gray-400 hover:text-white'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 space-y-3">
            <div className="text-emerald-400 font-bold uppercase text-[11px] font-sans">
              O(log n) Problem Halving Chain (Total Steps: {getHalvingSteps().length})
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {getHalvingSteps().map((val, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="bg-emerald-950 border border-emerald-500 p-3 rounded-xl text-emerald-200 font-bold">
                    Step {idx + 1}: size {val}
                  </div>
                  {idx < getHalvingSteps().length - 1 && <span className="text-emerald-400 font-bold">→</span>}
                </div>
              ))}
            </div>
            <p className="text-xs font-sans text-gray-400 pt-2">
              Repeatedly halving the problem size means a massive input of {logN} is solved in just <strong>{getHalvingSteps().length} steps</strong>!
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: Best vs Worst Case */}
      {activeTab === 'cases' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 space-y-2">
            <label className="text-gray-400 font-sans font-bold text-xs uppercase">
              Select Target Value to Search in [5, 12, 19, 24, 33, 41, 50]:
            </label>
            <div className="flex gap-2 font-bold font-sans">
              <button
                onClick={() => setSearchTarget(5)}
                className={`px-3 py-2 rounded-xl border ${searchTarget === 5 ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-white/10 text-gray-300'}`}
              >
                Target = 5 (Index 0)
              </button>
              <button
                onClick={() => setSearchTarget(24)}
                className={`px-3 py-2 rounded-xl border ${searchTarget === 24 ? 'bg-purple-950 border-purple-500 text-purple-300' : 'bg-slate-900 border-white/10 text-gray-300'}`}
              >
                Target = 24 (Index 3)
              </button>
              <button
                onClick={() => setSearchTarget(99)}
                className={`px-3 py-2 rounded-xl border ${searchTarget === 99 ? 'bg-red-950 border-red-500 text-red-300' : 'bg-slate-900 border-white/10 text-gray-300'}`}
              >
                Target = 99 (Missing!)
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/30 space-y-3">
            <div className="text-amber-400 font-bold uppercase text-[11px] font-sans">
              Linear Search Case Result ({getSearchCase().caseName})
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-white/10 space-y-2">
              <div className="text-sm font-bold text-white flex justify-between">
                <span>Checks Performed: {getSearchCase().ops}</span>
                <span className="text-amber-400 font-bold">Complexity: {getSearchCase().bigO}</span>
              </div>
              <p className="text-xs font-sans text-gray-300">{getSearchCase().desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
