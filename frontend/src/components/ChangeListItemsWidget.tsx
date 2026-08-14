import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, RefreshCcw, CheckCircle2, AlertTriangle, Layers, Sparkles } from 'lucide-react';

export const ChangeListItemsWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'single' | 'range' | 'comparison'>('single');
  const [items, setItems] = useState<string[]>(['apple', 'banana', 'mango', 'orange']);
  const [targetIndex, setTargetIndex] = useState<number>(1);
  const [newValue, setNewValue] = useState<string>('grape');

  const [rangeStart, setRangeStart] = useState<number>(1);
  const [rangeStop, setRangeStop] = useState<number>(3);
  const [rangeReplacement, setRangeReplacement] = useState<string>('kiwi, melon, peach');

  // Single Item Replacement Simulation
  const getSingleReplacedList = () => {
    const next = [...items];
    if (targetIndex >= 0 && targetIndex < next.length) {
      next[targetIndex] = newValue;
    }
    return next;
  };

  // Range Replacement Simulation
  const getRangeReplacedList = () => {
    const next = [...items];
    const replacements = rangeReplacement.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
    next.splice(rangeStart, rangeStop - rangeStart, ...replacements);
    return next;
  };

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl flex items-center justify-center text-emerald-400">
            <Edit3 size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow List Mutability & Item Replacement Studio
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30 uppercase tracking-wide">
                Mutable Collections • In-Place Modification
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Interactively mutate list items by single index assignment or slice range replacement.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('single')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'single' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            1. Single Item (list[i] = val)
          </button>
          <button
            onClick={() => setActiveTab('range')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'range' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            2. Range (list[a:b] = [...])
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'comparison' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            3. String vs List
          </button>
        </div>
      </div>

      {/* Tab 1: Single Item Assignment */}
      {activeTab === 'single' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-5 rounded-2xl border border-white/10">
            <div className="space-y-3">
              <label className="text-gray-400 font-sans font-bold text-xs uppercase">Target Index to Replace:</label>
              <select
                value={targetIndex}
                onChange={(e) => setTargetIndex(parseInt(e.target.value))}
                className="w-full bg-slate-900 border border-emerald-500/40 rounded-xl p-2.5 text-white font-bold"
              >
                {items.map((it, idx) => (
                  <option key={idx} value={idx}>
                    Index {idx}: "{it}"
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-gray-400 font-sans font-bold text-xs uppercase">New Replacement Value:</label>
              <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-full bg-slate-900 border border-emerald-500/40 rounded-xl p-2.5 text-white font-bold focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 space-y-3">
            <div className="text-emerald-400 font-bold uppercase text-[11px] flex justify-between">
              <span>Executed Mutation Statement</span>
              <span>len() = {items.length} (Unchanged Length)</span>
            </div>
            <div className="text-base font-bold text-cyan-300 bg-slate-900 p-3.5 rounded-xl border border-white/10">
              fruits[{targetIndex}] = "{newValue}" → {JSON.stringify(getSingleReplacedList())}
            </div>
            <p className="text-gray-400 font-sans text-xs">
              ✓ Single index assignment mutates item at index {targetIndex} in place. List length remains {items.length}.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Slice Range Replacement */}
      {activeTab === 'range' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-5 rounded-2xl border border-white/10">
            <div className="space-y-2">
              <div className="flex gap-4">
                <label className="flex-1">
                  <span className="text-emerald-400 font-bold">Start Index:</span>
                  <input
                    type="number"
                    min="0"
                    max={items.length}
                    value={rangeStart}
                    onChange={(e) => setRangeStart(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-emerald-500/40 rounded p-2 text-white font-bold mt-1"
                  />
                </label>
                <label className="flex-1">
                  <span className="text-red-400 font-bold">Stop Index:</span>
                  <input
                    type="number"
                    min="0"
                    max={items.length}
                    value={rangeStop}
                    onChange={(e) => setRangeStop(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-red-500/40 rounded p-2 text-white font-bold mt-1"
                  />
                </label>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 font-sans font-bold text-xs uppercase">
                Comma-separated Replacement Items:
              </label>
              <input
                type="text"
                value={rangeReplacement}
                onChange={(e) => setRangeReplacement(e.target.value)}
                className="w-full bg-slate-900 border border-purple-500/40 rounded-xl p-2.5 text-white font-bold"
              />
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/30 space-y-3">
            <div className="text-purple-400 font-bold uppercase text-[11px] flex justify-between">
              <span>Executed Slice Assignment</span>
              <span>Length Changed: {items.length} → {getRangeReplacedList().length}</span>
            </div>
            <div className="text-base font-bold text-cyan-300 bg-slate-900 p-3.5 rounded-xl border border-white/10">
              fruits[{rangeStart}:{rangeStop}] = [{rangeReplacement.split(',').map(s=>`"${s.trim()}"`).join(', ')}] → {JSON.stringify(getRangeReplacedList())}
            </div>
            <p className="text-gray-400 font-sans text-xs">
              ✓ Slice range replacement replaces target slice [{rangeStart}:{rangeStop}] with new items. Slice assignment CAN expand or reduce overall list length!
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: String vs List Comparison */}
      {activeTab === 'comparison' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="bg-slate-950 border border-red-500/30 rounded-2xl p-5 space-y-2">
            <div className="text-red-400 font-bold text-[11px] uppercase flex items-center justify-between">
              <span>String Object (Immutable)</span>
              <span className="bg-red-950 text-red-300 px-2 py-0.5 rounded text-[10px]">Forbidden</span>
            </div>
            <div className="text-base font-bold text-white bg-slate-900 p-3 rounded-xl border border-white/10">
              word = "cat"<br />
              word[0] = "b" <span className="text-red-400"># TypeError!</span>
            </div>
            <p className="text-gray-400 font-sans text-xs pt-1">
              Strings cannot change characters in place. Attempting item assignment raises <code className="text-red-400">TypeError</code>.
            </p>
          </div>

          <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
            <div className="text-emerald-400 font-bold text-[11px] uppercase flex items-center justify-between">
              <span>List Object (Mutable)</span>
              <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded text-[10px]">Allowed</span>
            </div>
            <div className="text-base font-bold text-white bg-slate-900 p-3 rounded-xl border border-white/10">
              letters = ["c", "a", "t"]<br />
              letters[0] = "b" <span className="text-emerald-400"># ["b", "a", "t"]</span>
            </div>
            <p className="text-gray-400 font-sans text-xs pt-1">
              Lists are mutable collections. Positional items can be overwritten directly in place.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
