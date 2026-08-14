import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Play, RotateCcw, Plus, Trash2, ArrowUp, ArrowDown, ShieldAlert, Cpu, Award } from 'lucide-react';

export const HeapStudioWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'min_max' | 'array_index' | 'build_heap' | 'heap_sort' | 'complexity'>('min_max');

  // Heap state array (Min Heap: 10, 20, 15, 40, 50, 30)
  const [heap, setHeap] = useState<number[]>([10, 20, 15, 40, 50, 30]);
  const [heapType, setHeapType] = useState<'min' | 'max'>('min');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [insertVal, setInsertVal] = useState<number>(12);
  const [highlightIndices, setHighlightIndices] = useState<number[]>([]);
  const [logAction, setLogAction] = useState<string>('Min Heap initialized: [10, 20, 15, 40, 50, 30]. Minimum element 10 at ROOT index 0.');

  const resetHeap = () => {
    setHeap([10, 20, 15, 40, 50, 30]);
    setHeapType('min');
    setSelectedIndex(0);
    setHighlightIndices([]);
    setLogAction('Heap reset to default Min Heap [10, 20, 15, 40, 50, 30].');
  };

  // Heap Insertion
  const handleInsert = () => {
    let arr = [...heap, insertVal];
    let idx = arr.length - 1;
    setHighlightIndices([idx]);

    // Heapify Up
    if (heapType === 'min') {
      while (idx > 0) {
        let pIdx = Math.floor((idx - 1) / 2);
        if (arr[pIdx] > arr[idx]) {
          const temp = arr[pIdx];
          arr[pIdx] = arr[idx];
          arr[idx] = temp;
          idx = pIdx;
        } else break;
      }
    } else {
      while (idx > 0) {
        let pIdx = Math.floor((idx - 1) / 2);
        if (arr[pIdx] < arr[idx]) {
          const temp = arr[pIdx];
          arr[pIdx] = arr[idx];
          arr[idx] = temp;
          idx = pIdx;
        } else break;
      }
    }

    setHeap(arr);
    setLogAction(`Inserted ${insertVal} at end and performed Heapify Up. Restored ${heapType.toUpperCase()} HEAP!`);
  };

  // Delete Root
  const handleDeleteRoot = () => {
    if (heap.length === 0) return;
    let arr = [...heap];
    const rootVal = arr[0];
    const lastVal = arr.pop();

    if (arr.length > 0 && lastVal !== undefined) {
      arr[0] = lastVal;
      // Heapify Down
      let idx = 0;
      const n = arr.length;
      while (true) {
        let target = idx;
        let left = 2 * idx + 1;
        let right = 2 * idx + 2;

        if (heapType === 'min') {
          if (left < n && arr[left] < arr[target]) target = left;
          if (right < n && arr[right] < arr[target]) target = right;
        } else {
          if (left < n && arr[left] > arr[target]) target = left;
          if (right < n && arr[right] > arr[target]) target = right;
        }

        if (target === idx) break;
        const temp = arr[idx];
        arr[idx] = arr[target];
        arr[target] = temp;
        idx = target;
      }
    }

    setHeap(arr);
    setLogAction(`Deleted Root ${rootVal}. Replaced with last element and Heapified Down!`);
  };

  // Index formulas for current selected index
  const curIdx = selectedIndex ?? 0;
  const parentIdx = curIdx > 0 ? Math.floor((curIdx - 1) / 2) : null;
  const leftIdx = 2 * curIdx + 1 < heap.length ? 2 * curIdx + 1 : null;
  const rightIdx = 2 * curIdx + 2 < heap.length ? 2 * curIdx + 2 : null;

  return (
    <div className="my-8 bg-[#020617] border border-amber-500/30 rounded-3xl p-6 shadow-2xl shadow-amber-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500/20 border border-amber-400/40 rounded-2xl flex items-center justify-center text-amber-400">
            <Layers size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Heap & Heap Sort Studio
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30 uppercase tracking-wide">
                Section 12 • Dual Tree & Array Representation
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Synchronized complete tree nodes and array indices for Min Heap, Max Heap, Heapify, and Heap Sort.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('min_max')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'min_max' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Min / Max Heap
          </button>
          <button
            onClick={() => setActiveTab('array_index')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'array_index' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Index Formulas
          </button>
          <button
            onClick={() => setActiveTab('build_heap')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'build_heap' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Build Heap O(n)
          </button>
          <button
            onClick={() => setActiveTab('heap_sort')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'heap_sort' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Heap Sort
          </button>
          <button
            onClick={() => setActiveTab('complexity')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'complexity' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Heap vs BST Complexity
          </button>
        </div>
      </div>

      {/* Main Studio Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        {/* Controls Panel */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 space-y-4 font-sans">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Heap Operations</h4>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setHeapType('min');
                setHeap([10, 20, 15, 40, 50, 30]);
                setLogAction('Switched to MIN HEAP (Parent <= Children).');
              }}
              className={`flex-1 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all ${
                heapType === 'min' ? 'bg-amber-600 border-amber-400 text-white' : 'bg-slate-900 border-white/10 text-gray-400'
              }`}
            >
              MIN HEAP
            </button>
            <button
              onClick={() => {
                setHeapType('max');
                setHeap([90, 70, 80, 20, 60, 50]);
                setLogAction('Switched to MAX HEAP (Parent >= Children).');
              }}
              className={`flex-1 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all ${
                heapType === 'max' ? 'bg-purple-600 border-purple-400 text-white' : 'bg-slate-900 border-white/10 text-gray-400'
              }`}
            >
              MAX HEAP
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              value={insertVal}
              onChange={(e) => setInsertVal(parseInt(e.target.value) || 0)}
              className="bg-slate-900 border border-white/10 rounded-xl p-2 text-white font-mono text-xs w-20"
            />
            <button
              onClick={handleInsert}
              className="flex-1 bg-amber-600 hover:bg-amber-500 text-white py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1 shadow-lg shadow-amber-500/20"
            >
              <Plus size={14} /> INSERT (HEAPIFY UP)
            </button>
          </div>

          <button
            onClick={handleDeleteRoot}
            className="w-full bg-red-600/80 hover:bg-red-500 text-white py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
          >
            <Trash2 size={14} /> DELETE ROOT (HEAPIFY DOWN)
          </button>

          <button
            onClick={resetHeap}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
          >
            <RotateCcw size={14} /> RESET HEAP
          </button>
        </div>

        {/* Dual Canvas: Tree + Array */}
        <div className="md:col-span-2 bg-slate-950 p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4">
          {/* Synchronized Tree Diagram View */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-white/10 flex flex-col items-center gap-4 min-h-[160px] shadow-inner font-mono">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">1. Complete Binary Tree View</div>

            {/* Level 0: Root */}
            {heap.length > 0 && (
              <div className="flex justify-center">
                <button
                  onClick={() => setSelectedIndex(0)}
                  className={`w-10 h-10 rounded-full border-2 font-bold text-xs flex items-center justify-center transition-all ${
                    selectedIndex === 0 ? 'border-amber-400 bg-amber-950 text-amber-200 ring-4 ring-amber-500/40 scale-110' : 'border-amber-500/50 bg-slate-950 text-amber-300'
                  }`}
                >
                  {heap[0]}
                </button>
              </div>
            )}

            {/* Level 1: Left & Right children */}
            <div className="w-full flex justify-around px-8">
              {heap.length > 1 && (
                <button
                  onClick={() => setSelectedIndex(1)}
                  className={`w-9 h-9 rounded-full border-2 font-bold text-xs flex items-center justify-center transition-all ${
                    selectedIndex === 1 ? 'border-amber-400 bg-amber-950 text-amber-200 ring-4 ring-amber-500/40 scale-110' : 'border-slate-700 bg-slate-950 text-gray-300'
                  }`}
                >
                  {heap[1]}
                </button>
              )}
              {heap.length > 2 && (
                <button
                  onClick={() => setSelectedIndex(2)}
                  className={`w-9 h-9 rounded-full border-2 font-bold text-xs flex items-center justify-center transition-all ${
                    selectedIndex === 2 ? 'border-amber-400 bg-amber-950 text-amber-200 ring-4 ring-amber-500/40 scale-110' : 'border-slate-700 bg-slate-950 text-gray-300'
                  }`}
                >
                  {heap[2]}
                </button>
              )}
            </div>
          </div>

          {/* Synchronized Array Level-Order Storage View */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-white/10 space-y-2">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">2. Level-Order Array Representation</div>

            <div className="flex items-center gap-1.5 overflow-x-auto p-2">
              {heap.map((val, idx) => {
                const isSelected = selectedIndex === idx;
                const isParent = parentIdx === idx;
                const isChild = leftIdx === idx || rightIdx === idx;

                let borderStyle = "border-white/10 bg-slate-950 text-gray-300";
                if (isSelected) borderStyle = "border-amber-400 bg-amber-950 text-amber-200 ring-2 ring-amber-400/50 scale-105";
                if (isParent) borderStyle = "border-blue-400 bg-blue-950 text-blue-200";
                if (isChild) borderStyle = "border-purple-400 bg-purple-950 text-purple-200";

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedIndex(idx)}
                    className={`min-w-[55px] p-2 rounded-xl text-center font-mono border cursor-pointer transition-all flex flex-col items-center ${borderStyle}`}
                  >
                    <span className="text-[9px] text-gray-500">[{idx}]</span>
                    <span className="text-xs font-bold">{val}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-xs font-sans text-amber-200 text-center bg-slate-900 px-4 py-2 rounded-xl border border-white/10">
            💡 {logAction}
          </div>
        </div>
      </div>

      {/* Tab Specific Descriptions */}
      {activeTab === 'min_max' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/30 font-sans text-xs space-y-2">
          <div className="text-amber-400 font-bold uppercase text-[11px]">
            Min Heap vs Max Heap Rules
          </div>
          <p className="text-gray-300 leading-relaxed">
            - <strong>Min Heap:</strong> <code className="text-amber-300 font-mono">Parent &lt;= Children</code> (Root is always MINIMUM).<br />
            - <strong>Max Heap:</strong> <code className="text-purple-300 font-mono">Parent &gt;= Children</code> (Root is always MAXIMUM).
          </p>
        </div>
      )}

      {activeTab === 'array_index' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-blue-500/30 font-sans text-xs space-y-2">
          <div className="text-blue-400 font-bold uppercase text-[11px]">
            Index Formulas for Zero-Based Array Heap (Selected Index [{curIdx}])
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-[11px]">
            <div>PARENT: <code className="text-blue-300">(i - 1) // 2</code> ──► Index {parentIdx !== null ? parentIdx : 'None'}</div>
            <div>LEFT CHILD: <code className="text-emerald-300">2 * i + 1</code> ──► Index {leftIdx !== null ? leftIdx : 'None'}</div>
            <div>RIGHT CHILD: <code className="text-purple-300">2 * i + 2</code> ──► Index {rightIdx !== null ? rightIdx : 'None'}</div>
          </div>
        </div>
      )}

      {activeTab === 'build_heap' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 font-sans text-xs space-y-2">
          <div className="text-emerald-400 font-bold uppercase text-[11px]">
            Bottom-Up Build Heap in O(n) Linear Time
          </div>
          <p className="text-gray-300 leading-relaxed">
            Starts at the <strong>last non-leaf node</strong> (<code className="text-emerald-300 font-mono">n // 2 - 1</code>) and heapifies downward toward root index 0. This runs in <strong>O(n) time</strong> (faster than n log n!).
          </p>
        </div>
      )}

      {activeTab === 'heap_sort' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/30 font-sans text-xs space-y-2">
          <div className="text-purple-400 font-bold uppercase text-[11px]">
            Heap Sort Mental Model: Max Heap Root Extraction
          </div>
          <p className="text-gray-300 leading-relaxed">
            Builds a <strong>Max Heap</strong>, swaps the root (largest element) to the end of the array, shrinks active heap size by 1, and heapifies down. Guaranteed <strong>O(n log n)</strong> time and <strong>O(1)</strong> auxiliary space!
          </p>
        </div>
      )}

      {activeTab === 'complexity' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-indigo-500/30 font-sans text-xs space-y-3">
          <div className="text-indigo-400 font-bold uppercase text-[11px]">
            Heap vs Binary Search Tree (BST) Master Comparison
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-indigo-300 font-bold">
                  <th className="py-2 px-3">Operation</th>
                  <th className="py-2 px-3 text-amber-400">Binary Heap</th>
                  <th className="py-2 px-3 text-blue-400">Binary Search Tree (BST)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                <tr><td className="py-2 px-3 font-bold">Root Access (Min / Max)</td><td className="py-2 px-3 text-amber-300 font-bold">O(1) Instant Access</td><td className="py-2 px-3">O(log n) left/right search</td></tr>
                <tr><td className="py-2 px-3 font-bold">Insert / Delete Root</td><td className="py-2 px-3">O(log n)</td><td className="py-2 px-3">O(log n)</td></tr>
                <tr><td className="py-2 px-3 font-bold">Build Heap / Tree</td><td className="py-2 px-3 text-emerald-300 font-bold">O(n) Bottom-Up</td><td className="py-2 px-3">O(n log n)</td></tr>
                <tr><td className="py-2 px-3 font-bold">Search Arbitrary Key</td><td className="py-2 px-3 text-red-400 font-bold">O(n) Linear Scan</td><td className="py-2 px-3 text-blue-300 font-bold">O(log n) Directional Path</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
