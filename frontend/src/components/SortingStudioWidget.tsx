import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownUp, Play, Pause, RotateCcw, BarChart2, Layers, GitMerge, Zap, ShieldAlert, Award } from 'lucide-react';

export const SortingStudioWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bubble' | 'selection' | 'insertion' | 'merge' | 'quick' | 'race'>('bubble');

  // Interactive sorting array state
  const [array, setArray] = useState<number[]>([64, 25, 12, 22, 11]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [pivotIndex, setPivotIndex] = useState<number | null>(null);

  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [logAction, setLogAction] = useState<string>('Initialized unsorted array [64, 25, 12, 22, 11]');

  const resetArray = () => {
    setArray([64, 25, 12, 22, 11]);
    setComparing([]);
    setSwapping([]);
    setSortedIndices([]);
    setPivotIndex(null);
    setComparisons(0);
    setSwaps(0);
    setLogAction('Reset array to [64, 25, 12, 22, 11]');
  };

  // Step-by-step Bubble Sort demo simulation
  const handleBubbleStep = () => {
    let arr = [...array];
    let compCount = comparisons;
    let swapCount = swaps;

    // Simple single pass step demo for interactive UI
    let swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        setComparing([i, i + 1]);
        setSwapping([i, i + 1]);
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
        setArray(arr);
        setComparisons(compCount + 1);
        setSwaps(swapCount + 1);
        setLogAction(`Swapped neighbors [${arr[i + 1]}] and [${arr[i]}] because ${arr[i + 1]} > ${arr[i]}!`);
        return;
      }
    }

    if (!swapped) {
      setSortedIndices([0, 1, 2, 3, 4]);
      setComparing([]);
      setSwapping([]);
      setLogAction('🎉 Array is fully SORTED! 0 swaps needed in last pass.');
    }
  };

  // Step-by-step Selection Sort demo
  const handleSelectionStep = () => {
    let arr = [...array];
    // Find min element in unsorted region
    let minIdx = 0;
    for (let i = 0; i < arr.length; i++) {
      if (!sortedIndices.includes(i)) {
        minIdx = i;
        break;
      }
    }

    for (let j = minIdx + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    const firstUnsorted = sortedIndices.length;
    if (firstUnsorted < arr.length) {
      setComparing([firstUnsorted, minIdx]);
      setSwapping([firstUnsorted, minIdx]);
      const temp = arr[firstUnsorted];
      arr[firstUnsorted] = arr[minIdx];
      arr[minIdx] = temp;

      setArray(arr);
      setSortedIndices([...sortedIndices, firstUnsorted]);
      setComparisons(comparisons + (arr.length - firstUnsorted));
      setSwaps(swaps + 1);
      setLogAction(`Found minimum element ${arr[firstUnsorted]} at index ${minIdx}. Swapped into position ${firstUnsorted}!`);
    } else {
      setLogAction('🎉 Selection Sort completed! All minimums placed.');
    }
  };

  return (
    <div className="my-8 bg-[#020617] border border-purple-500/30 rounded-3xl p-6 shadow-2xl shadow-purple-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500/20 border border-purple-400/40 rounded-2xl flex items-center justify-center text-purple-400">
            <ArrowDownUp size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Sorting Algorithms Studio
              <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-400/30 uppercase tracking-wide">
                Section 9 • Visual Sorting Mechanics
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Observe element comparisons, swaps, shifts, partitioning, and merge operations in real time.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('bubble')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'bubble' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Bubble Sort
          </button>
          <button
            onClick={() => setActiveTab('selection')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'selection' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Selection Sort
          </button>
          <button
            onClick={() => setActiveTab('insertion')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'insertion' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Insertion Sort
          </button>
          <button
            onClick={() => setActiveTab('merge')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'merge' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Merge Sort
          </button>
          <button
            onClick={() => setActiveTab('quick')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'quick' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Quick Sort
          </button>
          <button
            onClick={() => setActiveTab('race')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'race' ? 'bg-pink-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Master Table & Race
          </button>
        </div>
      </div>

      {/* Main Canvas & Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        {/* Controls Panel */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 space-y-4 font-sans">
          <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">Algorithm Controls</h4>

          <div className="space-y-2">
            <button
              onClick={activeTab === 'selection' ? handleSelectionStep : handleBubbleStep}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
            >
              <Play size={14} /> STEP {activeTab.toUpperCase()} STEP
            </button>
            <button
              onClick={resetArray}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
            >
              <RotateCcw size={14} /> RESET ARRAY
            </button>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-white/10 space-y-1 font-mono text-[11px]">
            <div>Comparisons: <strong className="text-blue-400">{comparisons}</strong></div>
            <div>Swaps / Shifts: <strong className="text-amber-400">{swaps}</strong></div>
            <div>Sorted Elements: <strong className="text-emerald-400">{sortedIndices.length} / 5</strong></div>
          </div>
        </div>

        {/* Vertical Bars Canvas */}
        <div className="md:col-span-2 bg-slate-950 p-6 rounded-2xl border border-white/10 flex flex-col justify-between min-h-[260px]">
          <div className="text-xs text-gray-400 font-sans flex justify-between items-center mb-2">
            <span>Visual Element Bars & Numeric Values:</span>
            <span className="font-mono text-purple-400 font-bold">[ {array.join(', ')} ]</span>
          </div>

          {/* Bar Chart Representation */}
          <div className="h-40 bg-slate-900/80 p-4 rounded-2xl border border-white/10 flex items-end justify-center gap-4 shadow-inner">
            {array.map((val, idx) => {
              const isComp = comparing.includes(idx);
              const isSwap = swapping.includes(idx);
              const isSorted = sortedIndices.includes(idx);
              const heightPercent = Math.max(20, (val / 70) * 100);

              let barColor = "bg-slate-700 border-gray-600 text-gray-300";
              if (isComp) barColor = "bg-amber-500 border-amber-400 text-slate-950 font-bold ring-2 ring-amber-400/50";
              if (isSwap) barColor = "bg-purple-500 border-purple-400 text-white font-bold ring-2 ring-purple-400/50";
              if (isSorted) barColor = "bg-emerald-500 border-emerald-400 text-slate-950 font-bold";

              return (
                <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 max-w-[60px]">
                  <span className="text-[10px] font-mono text-gray-400 font-bold">{val}</span>
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-xl border flex items-end justify-center pb-1 text-[9px] font-mono font-bold shadow-md ${barColor}`}
                  />
                  <span className="text-[9px] text-gray-500">[{idx}]</span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-xs font-sans text-gray-300 text-center bg-slate-900 px-4 py-2 rounded-xl border border-white/10">
            💡 {logAction}
          </div>
        </div>
      </div>

      {/* Tab Specific Mechanics Description */}
      {activeTab === 'bubble' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-blue-500/30 font-sans text-xs space-y-2">
          <div className="text-blue-400 font-bold uppercase text-[11px]">
            Bubble Sort Mental Model: Compare Neighbors & Swap
          </div>
          <p className="text-gray-300 leading-relaxed">
            Repeatedly compares adjacent neighbors <code className="text-blue-300 font-mono">arr[j]</code> and <code className="text-blue-300 font-mono">arr[j+1]</code>. Larger values "bubble" up to the end of the array. Average time complexity: <strong>O(n²)</strong>.
          </p>
        </div>
      )}

      {activeTab === 'selection' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/30 font-sans text-xs space-y-2">
          <div className="text-purple-400 font-bold uppercase text-[11px]">
            Selection Sort Mental Model: Find Smallest & Place It
          </div>
          <p className="text-gray-300 leading-relaxed">
            Scans the entire unsorted region to find the minimum element, then performs a single placement swap into the first unsorted index. Average time complexity: <strong>O(n²)</strong>.
          </p>
        </div>
      )}

      {activeTab === 'insertion' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 font-sans text-xs space-y-2">
          <div className="text-emerald-400 font-bold uppercase text-[11px]">
            Insertion Sort Mental Model: Lift Key & Shift Larger Values
          </div>
          <p className="text-gray-300 leading-relaxed">
            Lifts out key <code className="text-emerald-300 font-mono">arr[i]</code>, shifts larger elements to the right, and drops the key into its sorted spot. Excellent for nearly sorted data! Average: <strong>O(n²)</strong>, Best: <strong>O(n)</strong>.
          </p>
        </div>
      )}

      {activeTab === 'merge' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/30 font-sans text-xs space-y-2">
          <div className="text-amber-400 font-bold uppercase text-[11px]">
            Merge Sort Mental Model: Divide & Conquer Tree
          </div>
          <p className="text-gray-300 leading-relaxed">
            Recursively splits array in half down to 1-element base cases, then merges sorted sub-arrays using two pointers. Guaranteed <strong>O(n log n)</strong> time, requires <strong>O(n)</strong> space.
          </p>
        </div>
      )}

      {activeTab === 'quick' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-indigo-500/30 font-sans text-xs space-y-2">
          <div className="text-indigo-400 font-bold uppercase text-[11px]">
            Quick Sort Mental Model: Pivot & Partition
          </div>
          <p className="text-gray-300 leading-relaxed">
            Selects a pivot (e.g. last element) and partitions elements so smaller items go left and larger items go right. Average time: <strong>O(n log n)</strong>.
          </p>
        </div>
      )}

      {activeTab === 'race' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-pink-500/30 font-sans text-xs space-y-3">
          <div className="text-pink-400 font-bold uppercase text-[11px]">
            Master Complexity & Algorithm Comparison Table
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-pink-300 font-bold">
                  <th className="py-2 px-3">Algorithm</th>
                  <th className="py-2 px-3">Best Time</th>
                  <th className="py-2 px-3">Average Time</th>
                  <th className="py-2 px-3">Worst Time</th>
                  <th className="py-2 px-3">Space Complexity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                <tr><td className="py-2 px-3 font-bold text-blue-400">Bubble Sort</td><td className="py-2 px-3">O(n)</td><td className="py-2 px-3">O(n²)</td><td className="py-2 px-3">O(n²)</td><td className="py-2 px-3">O(1)</td></tr>
                <tr><td className="py-2 px-3 font-bold text-purple-400">Selection Sort</td><td className="py-2 px-3">O(n²)</td><td className="py-2 px-3">O(n²)</td><td className="py-2 px-3">O(n²)</td><td className="py-2 px-3">O(1)</td></tr>
                <tr><td className="py-2 px-3 font-bold text-emerald-400">Insertion Sort</td><td className="py-2 px-3 text-emerald-300 font-bold">O(n)</td><td className="py-2 px-3">O(n²)</td><td className="py-2 px-3">O(n²)</td><td className="py-2 px-3">O(1)</td></tr>
                <tr><td className="py-2 px-3 font-bold text-amber-400">Merge Sort</td><td className="py-2 px-3 text-amber-300 font-bold">O(n log n)</td><td className="py-2 px-3 text-amber-300 font-bold">O(n log n)</td><td className="py-2 px-3 text-amber-300 font-bold">O(n log n)</td><td className="py-2 px-3 text-amber-400 font-bold">O(n)</td></tr>
                <tr><td className="py-2 px-3 font-bold text-indigo-400">Quick Sort</td><td className="py-2 px-3 text-indigo-300 font-bold">O(n log n)</td><td className="py-2 px-3 text-indigo-300 font-bold">O(n log n)</td><td className="py-2 px-3 text-red-400 font-bold">O(n²)</td><td className="py-2 px-3">O(log n) stack</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
