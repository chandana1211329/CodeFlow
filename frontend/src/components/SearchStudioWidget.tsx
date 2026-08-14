import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Play, Pause, RotateCcw, ArrowRight, CheckCircle2, XCircle, Zap, ShieldAlert, BarChart3 } from 'lucide-react';

export const SearchStudioWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'linear' | 'binary' | 'race' | 'recursive' | 'complexity'>('linear');

  // Array states
  const initialLinearArray = [12, 7, 25, 18, 30, 42, 5];
  const initialSortedArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  // Target input
  const [target, setTarget] = useState<number>(60);

  // Linear Search Execution State
  const [linearIdx, setLinearIdx] = useState<number>(-1);
  const [linearComparisons, setLinearComparisons] = useState<number>(0);
  const [linearResult, setLinearResult] = useState<string | null>(null);
  const [isLinearRunning, setIsLinearRunning] = useState<boolean>(false);

  // Binary Search Execution State
  const [left, setLeft] = useState<number>(0);
  const [right, setRight] = useState<number>(initialSortedArray.length - 1);
  const [mid, setMid] = useState<number | null>(null);
  const [binaryComparisons, setBinaryComparisons] = useState<number>(0);
  const [binaryResult, setBinaryResult] = useState<string | null>(null);
  const [eliminatedIndices, setEliminatedIndices] = useState<number[]>([]);

  // Linear Search Step
  const stepLinearSearch = () => {
    if (linearResult !== null) return;
    const nextIdx = linearIdx + 1;
    if (nextIdx >= initialLinearArray.length) {
      setLinearResult(`NOT FOUND! Target ${target} is not in array (-1).`);
      return;
    }
    setLinearIdx(nextIdx);
    setLinearComparisons((prev) => prev + 1);

    if (initialLinearArray[nextIdx] === target) {
      setLinearResult(`FOUND! Target ${target} at Index ${nextIdx}! (${linearComparisons + 1} comparisons)`);
    }
  };

  const resetLinear = () => {
    setLinearIdx(-1);
    setLinearComparisons(0);
    setLinearResult(null);
  };

  // Binary Search Step
  const stepBinarySearch = () => {
    if (binaryResult !== null) return;
    if (left > right) {
      setBinaryResult(`NOT FOUND! left (${left}) > right (${right}). Returns -1.`);
      return;
    }

    const currentMid = Math.floor((left + right) / 2);
    setMid(currentMid);
    setBinaryComparisons((prev) => prev + 1);

    const midVal = initialSortedArray[currentMid];

    if (midVal === target) {
      setBinaryResult(`FOUND! Target ${target} at Index ${currentMid}! (${binaryComparisons + 1} comparisons)`);
    } else if (midVal < target) {
      // Eliminate left half (left to currentMid)
      const newEliminated = [...eliminatedIndices];
      for (let i = left; i <= currentMid; i++) {
        if (!newEliminated.includes(i)) newEliminated.push(i);
      }
      setEliminatedIndices(newEliminated);
      setLeft(currentMid + 1);
    } else {
      // Eliminate right half (currentMid to right)
      const newEliminated = [...eliminatedIndices];
      for (let i = currentMid; i <= right; i++) {
        if (!newEliminated.includes(i)) newEliminated.push(i);
      }
      setEliminatedIndices(newEliminated);
      setRight(currentMid - 1);
    }
  };

  const resetBinary = () => {
    setLeft(0);
    setRight(initialSortedArray.length - 1);
    setMid(null);
    setBinaryComparisons(0);
    setBinaryResult(null);
    setEliminatedIndices([]);
  };

  return (
    <div className="my-8 bg-[#020617] border border-emerald-500/30 rounded-3xl p-6 shadow-2xl shadow-emerald-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl flex items-center justify-center text-emerald-400">
            <Search size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Searching Studio
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30 uppercase tracking-wide">
                Section 8 • Linear vs Binary Search
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Visualize sequential $O(n)$ scanning vs $O(\log n)$ search space halving (left, right, mid).
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('linear')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'linear' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Linear Search
          </button>
          <button
            onClick={() => setActiveTab('binary')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'binary' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Binary Search
          </button>
          <button
            onClick={() => setActiveTab('race')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'race' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Search Race
          </button>
          <button
            onClick={() => setActiveTab('recursive')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'recursive' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Call Stack
          </button>
          <button
            onClick={() => setActiveTab('complexity')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'complexity' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Complexity Growth
          </button>
        </div>
      </div>

      {/* Target Control */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <label className="text-gray-400 font-sans font-bold">Search Target:</label>
          <input
            type="number"
            value={target}
            onChange={(e) => {
              setTarget(parseInt(e.target.value) || 0);
              resetLinear();
              resetBinary();
            }}
            className="bg-slate-900 border border-white/10 rounded-xl p-2 text-white font-mono text-xs w-24"
          />
        </div>
        <div className="flex gap-2 font-sans">
          <button
            onClick={() => {
              resetLinear();
              resetBinary();
            }}
            className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1"
          >
            <RotateCcw size={14} /> RESET
          </button>
        </div>
      </div>

      {/* Tab 1: Linear Search Canvas */}
      {activeTab === 'linear' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          {/* Controls & Variables */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-blue-500/30 space-y-4 font-sans">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Linear Search (Unsorted Array)</h4>
            <div className="space-y-2">
              <div>Current Index (i): <strong className="text-blue-300 font-mono">{linearIdx === -1 ? 'None' : linearIdx}</strong></div>
              <div>Current Value: <strong className="text-emerald-300 font-mono">{linearIdx >= 0 ? initialLinearArray[linearIdx] : 'None'}</strong></div>
              <div>Comparisons: <strong className="text-amber-400 font-mono">{linearComparisons}</strong></div>
            </div>

            <button
              onClick={stepLinearSearch}
              disabled={linearResult !== null}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <Play size={14} /> STEP NEXT COMPARISON (i + 1)
            </button>
          </div>

          {/* Canvas */}
          <div className="md:col-span-2 bg-slate-950 p-6 rounded-2xl border border-white/10 flex flex-col justify-between min-h-[220px]">
            <div className="flex items-center justify-start gap-3 overflow-x-auto p-4 bg-slate-900 rounded-2xl border border-white/10">
              {initialLinearArray.map((val, idx) => {
                const isCurrent = idx === linearIdx;
                const isMatch = isCurrent && val === target;

                let style = "border-white/10 bg-slate-950 text-gray-300";
                if (isCurrent && !isMatch) style = "border-amber-400 bg-amber-950 text-amber-200 ring-2 ring-amber-500/50";
                if (isMatch) style = "border-emerald-400 bg-emerald-950 text-emerald-200 ring-2 ring-emerald-500/50 scale-105";

                return (
                  <div
                    key={idx}
                    className={`min-w-[65px] p-3 rounded-2xl text-center font-mono font-bold border shadow-md flex flex-col items-center gap-1 transition-all ${style}`}
                  >
                    <span className="text-[10px] text-gray-500">[{idx}]</span>
                    <span className="text-sm">{val}</span>
                    {isCurrent && (
                      <span className="text-[9px] bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded-full font-sans font-bold">
                        CURRENT
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {linearResult && (
              <div className="p-3 bg-blue-950/80 border border-blue-400/40 rounded-xl text-blue-200 text-xs font-sans font-bold text-center">
                💡 {linearResult}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Binary Search Canvas */}
      {activeTab === 'binary' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          {/* Variables Panel */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 space-y-4 font-sans">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Binary Search (Sorted Array)</h4>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div>LEFT Index: <strong className="text-blue-400">{left}</strong> (val: {initialSortedArray[left] ?? 'N/A'})</div>
              <div>RIGHT Index: <strong className="text-purple-400">{right}</strong> (val: {initialSortedArray[right] ?? 'N/A'})</div>
              <div>MID Index: <strong className="text-amber-400">{mid !== null ? mid : 'None'}</strong> (val: {mid !== null ? initialSortedArray[mid] : 'None'})</div>
              <div>Comparisons: <strong className="text-emerald-400">{binaryComparisons}</strong></div>
            </div>

            <button
              onClick={stepBinarySearch}
              disabled={binaryResult !== null}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Play size={14} /> STEP BINARY HALVING (mid)
            </button>
          </div>

          {/* Canvas */}
          <div className="md:col-span-2 bg-slate-950 p-6 rounded-2xl border border-white/10 flex flex-col justify-between min-h-[220px]">
            <div className="flex items-center justify-start gap-2 overflow-x-auto p-4 bg-slate-900 rounded-2xl border border-white/10">
              {initialSortedArray.map((val, idx) => {
                const isLeft = idx === left;
                const isRight = idx === right;
                const isMid = idx === mid;
                const isEliminated = eliminatedIndices.includes(idx);

                let style = "border-white/10 bg-slate-950 text-gray-300";
                if (isEliminated) style = "border-gray-800 bg-slate-950/40 text-gray-600 opacity-40 line-through";
                if (isMid) style = "border-amber-400 bg-amber-950 text-amber-200 ring-2 ring-amber-500/50 scale-105";

                return (
                  <div
                    key={idx}
                    className={`min-w-[60px] p-2.5 rounded-xl text-center font-mono font-bold border shadow-md flex flex-col items-center gap-1 transition-all ${style}`}
                  >
                    <span className="text-[9px] text-gray-500">[{idx}]</span>
                    <span className="text-xs">{val}</span>
                    <div className="flex flex-col gap-0.5 text-[8px] font-sans">
                      {isLeft && <span className="bg-blue-500 text-white px-1 rounded">L</span>}
                      {isRight && <span className="bg-purple-500 text-white px-1 rounded">R</span>}
                      {isMid && <span className="bg-amber-500 text-slate-950 px-1 rounded font-bold">MID</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            {binaryResult && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-400/40 rounded-xl text-emerald-200 text-xs font-sans font-bold text-center">
                💡 {binaryResult}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Search Race */}
      {activeTab === 'race' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/30 font-sans text-xs space-y-4">
          <div className="text-purple-400 font-bold uppercase text-[11px]">
            Visual Race: Linear Search vs Binary Search
          </div>
          <p className="text-gray-300 leading-relaxed">
            Searching for Target <strong className="text-amber-300 font-mono">{target}</strong> in a sorted array of 10 elements:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
            <div className="p-4 bg-slate-900 rounded-xl border border-blue-500/30 space-y-2">
              <h5 className="font-bold text-blue-400">1. Linear Search</h5>
              <div>Comparisons to find {target}: <strong className="text-amber-300 font-bold">6 comparisons</strong></div>
              <div className="text-[11px] text-gray-400">Checks elements sequentially 10 ──► 20 ──► 30 ──► 40 ──► 50 ──► 60.</div>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-emerald-500/30 space-y-2">
              <h5 className="font-bold text-emerald-400">2. Binary Search</h5>
              <div>Comparisons to find {target}: <strong className="text-emerald-300 font-bold">2 comparisons</strong></div>
              <div className="text-[11px] text-gray-400">Checks MID=50 (eliminates left), then MID=60 (FOUND!).</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Complexity */}
      {activeTab === 'complexity' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-indigo-500/30 font-sans text-xs space-y-3">
          <div className="text-indigo-400 font-bold uppercase text-[11px]">
            Operational Growth Comparison: O(n) vs O(log n)
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-indigo-300 font-bold">
                  <th className="py-2 px-3">Array Size (n)</th>
                  <th className="py-2 px-3 text-blue-400">Linear Search Max (n)</th>
                  <th className="py-2 px-3 text-emerald-400">Binary Search Max ($\lceil \log_2 n \rceil$)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                <tr><td className="py-2 px-3 font-bold">8</td><td className="py-2 px-3">8 comparisons</td><td className="py-2 px-3 text-emerald-300">3 comparisons</td></tr>
                <tr><td className="py-2 px-3 font-bold">64</td><td className="py-2 px-3">64 comparisons</td><td className="py-2 px-3 text-emerald-300">6 comparisons</td></tr>
                <tr><td className="py-2 px-3 font-bold">1,024</td><td className="py-2 px-3">1,024 comparisons</td><td className="py-2 px-3 text-emerald-300">10 comparisons</td></tr>
                <tr><td className="py-2 px-3 font-bold">1,000,000</td><td className="py-2 px-3 text-red-400 font-bold">1,000,000 comparisons</td><td className="py-2 px-3 text-emerald-300 font-bold">20 comparisons</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
