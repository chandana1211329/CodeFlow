import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowRight, Play, RefreshCw, Plus, Trash2, Search, Edit3, CheckCircle2 } from 'lucide-react';

export const ArrayStudioWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'layout' | 'traversal' | 'insert' | 'delete' | 'search'>('layout');

  // Array State
  const [items, setItems] = useState<number[]>([10, 20, 30, 40]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(1);

  // Traversal state
  const [traverseStep, setTraverseStep] = useState<number>(0);

  // Insert state
  const [insertVal, setInsertVal] = useState<number>(25);
  const [insertIdx, setInsertIdx] = useState<number>(2);
  const [isShiftedRight, setIsShiftedRight] = useState<boolean>(false);

  // Delete state
  const [deleteIdx, setDeleteIdx] = useState<number>(1);

  // Search state
  const [searchTarget, setSearchTarget] = useState<number>(30);
  const [searchStep, setSearchStep] = useState<number>(-1);

  const handleInsert = () => {
    setIsShiftedRight(true);
    setTimeout(() => {
      const updated = [...items];
      updated.splice(insertIdx, 0, insertVal);
      setItems(updated);
      setIsShiftedRight(false);
    }, 600);
  };

  const handleDelete = () => {
    const updated = [...items];
    updated.splice(deleteIdx, 1);
    setItems(updated);
  };

  const handleSearchStep = () => {
    if (searchStep < items.length - 1) {
      setSearchStep(searchStep + 1);
    } else {
      setSearchStep(-1);
    }
  };

  return (
    <div className="my-8 bg-[#020617] border border-blue-500/30 rounded-3xl p-6 shadow-2xl shadow-blue-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/20 border border-blue-400/40 rounded-2xl flex items-center justify-center text-blue-400">
            <Layers size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Array Master Studio
              <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-400/30 uppercase tracking-wide">
                Section 3 • Interactive Operations
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Visualize contiguous array memory slots, indexing, element shifting on insertion & deletion, and linear search.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('layout')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'layout' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Indexing
          </button>
          <button
            onClick={() => setActiveTab('traversal')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'traversal' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Traversal
          </button>
          <button
            onClick={() => setActiveTab('insert')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'insert' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Insertion
          </button>
          <button
            onClick={() => setActiveTab('delete')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'delete' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Deletion
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'search' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Linear Search
          </button>
        </div>
      </div>

      {/* Main Array Display Bar */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-gray-400">
          <span>Array Name: <strong className="text-blue-400 font-bold">numbers</strong></span>
          <span>Current Length: <strong className="text-emerald-400 font-bold">{items.length}</strong></span>
        </div>

        {/* Render Slots */}
        <div className="flex justify-center items-center gap-2 overflow-x-auto py-6">
          {items.map((val, idx) => {
            const isSelected = selectedIndex === idx;
            const isTraversed = activeTab === 'traversal' && traverseStep === idx;
            const isSearched = activeTab === 'search' && searchStep === idx;
            const isFound = isSearched && val === searchTarget;

            let slotStyle = "bg-slate-900 border-white/10 text-gray-300";
            if (isSelected) slotStyle = "bg-blue-950 border-blue-400 text-blue-200 ring-2 ring-blue-500/50";
            if (isTraversed) slotStyle = "bg-purple-950 border-purple-400 text-purple-200 ring-2 ring-purple-500/50";
            if (isSearched) slotStyle = "bg-amber-950 border-amber-400 text-amber-200 ring-2 ring-amber-500/50";
            if (isFound) slotStyle = "bg-emerald-950 border-emerald-400 text-emerald-200 ring-2 ring-emerald-500/50";

            return (
              <motion.div
                key={idx}
                animate={{ x: isShiftedRight && idx >= insertIdx ? 15 : 0 }}
                onClick={() => setSelectedIndex(idx)}
                className={`flex flex-col items-center p-3 rounded-2xl border min-w-[70px] cursor-pointer transition-all ${slotStyle}`}
              >
                <span className="text-xs text-gray-400 font-mono font-bold pb-1">+{idx}</span>
                <span className="text-lg font-bold font-mono">{val}</span>
                <span className="text-[10px] text-gray-500 font-mono pt-1">-{items.length - idx}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Indexing */}
      {activeTab === 'layout' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-blue-500/30 space-y-3">
            <div className="text-blue-400 font-bold uppercase text-[11px] font-sans">
              Known Index Direct Access (O(1) Constant Time)
            </div>
            {selectedIndex !== null ? (
              <div className="bg-slate-900 p-4 rounded-xl border border-white/10 space-y-2 font-sans">
                <p className="text-sm font-bold text-white">
                  numbers[{selectedIndex}] $\rightarrow$ <span className="text-blue-400 font-mono">{items[selectedIndex]}</span>
                </p>
                <p className="text-xs text-gray-400">
                  Positive Index: <code className="text-blue-300">{selectedIndex}</code> | Python Negative Index: <code className="text-blue-300">-{items.length - selectedIndex}</code>
                </p>
                <p className="text-xs text-emerald-400 font-bold">
                  ✓ Directly computed memory position access — Complexity: O(1)
                </p>
              </div>
            ) : (
              <p className="text-gray-400 font-sans text-xs">Click any slot above to inspect its value and indexes.</p>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Traversal */}
      {activeTab === 'traversal' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/30 space-y-3">
            <div className="text-purple-400 font-bold uppercase text-[11px] font-sans">
              Sequential Traversal (O(n) Linear Time)
            </div>
            <div className="flex items-center justify-between font-sans">
              <span className="text-xs text-gray-300">
                Step {traverseStep + 1} of {items.length}: Inspecting slot [{traverseStep}] = <strong className="text-purple-300 font-mono">{items[traverseStep]}</strong>
              </span>
              <button
                onClick={() => setTraverseStep((traverseStep + 1) % items.length)}
                className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-1.5 rounded-xl font-bold text-xs"
              >
                Next Step →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Insertion */}
      {activeTab === 'insert' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-2xl border border-white/10 font-sans">
            <div>
              <label className="text-gray-400 font-bold text-xs">New Value:</label>
              <input
                type="number"
                value={insertVal}
                onChange={(e) => setInsertVal(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-2 text-white text-xs mt-1"
              />
            </div>
            <div>
              <label className="text-gray-400 font-bold text-xs">Target Index:</label>
              <input
                type="number"
                min={0}
                max={items.length}
                value={insertIdx}
                onChange={(e) => setInsertIdx(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-2 text-white text-xs mt-1"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleInsert}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-xl font-bold text-xs"
              >
                Insert & Shift Right →
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/30 font-sans text-xs text-gray-300">
            💡 Inserting at beginning/middle requires <strong>shifting later elements to the right</strong> to make room. Insertion complexity: <strong className="text-emerald-400 font-mono">O(n)</strong>.
          </div>
        </div>
      )}

      {/* Tab 4: Deletion */}
      {activeTab === 'delete' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-2xl border border-white/10 font-sans">
            <label className="text-gray-400 font-bold text-xs">Delete Index:</label>
            <input
              type="number"
              min={0}
              max={items.length - 1}
              value={deleteIdx}
              onChange={(e) => setDeleteIdx(parseInt(e.target.value) || 0)}
              className="bg-slate-900 border border-white/10 rounded-xl p-2 text-white text-xs w-20"
            />
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl font-bold text-xs"
            >
              Delete & Shift Left ←
            </button>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-red-500/30 font-sans text-xs text-gray-300">
            💡 Deleting from beginning/middle requires <strong>shifting later elements to the left</strong> to close the gap. Deletion complexity: <strong className="text-red-400 font-mono">O(n)</strong>.
          </div>
        </div>
      )}

      {/* Tab 5: Linear Search */}
      {activeTab === 'search' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-white/10 font-sans">
            <div className="flex items-center gap-2">
              <label className="text-gray-400 font-bold text-xs">Target Value:</label>
              <input
                type="number"
                value={searchTarget}
                onChange={(e) => setSearchTarget(parseInt(e.target.value) || 0)}
                className="bg-slate-900 border border-white/10 rounded-xl p-2 text-white text-xs w-24"
              />
            </div>
            <button
              onClick={handleSearchStep}
              className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-xl font-bold text-xs"
            >
              {searchStep === -1 ? 'Start Linear Search' : 'Step Search →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
