import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MousePointer, Scissors, AlertCircle, ArrowLeftRight, CheckCircle2, Sparkles } from 'lucide-react';

export const AccessListItemsWidget: React.FC = () => {
  const [items, setItems] = useState<string[]>(['apple', 'banana', 'mango', 'orange', 'grape']);
  const [activeTab, setActiveTab] = useState<'indexing' | 'negative' | 'slicing'>('indexing');
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [sliceStart, setSliceStart] = useState<number>(1);
  const [sliceStop, setSliceStop] = useState<number>(4);
  const [isErrorMode, setIsErrorMode] = useState<boolean>(false);

  const len = items.length;
  const posIdx = selectedIndex >= 0 ? selectedIndex : len + selectedIndex;
  const negIdx = selectedIndex < 0 ? selectedIndex : selectedIndex - len;

  const isValidIndex = posIdx >= 0 && posIdx < len;
  const currentItem = isValidIndex ? items[posIdx] : null;

  // Compute list slice safely
  const slicedItems = items.slice(
    sliceStart < 0 ? Math.max(0, len + sliceStart) : sliceStart,
    sliceStop < 0 ? Math.max(0, len + sliceStop) : Math.min(len, sliceStop)
  );

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl flex items-center justify-center text-cyan-400">
            <MousePointer size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow List Access & Slicing Studio
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wide">
                Indexing (1 Item) vs Slicing (List Range)
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Access items by positive index (0..N-1), negative index (-1..-N), or slice ranges [start:stop].
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => {
              setActiveTab('indexing');
              setIsErrorMode(false);
            }}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'indexing' ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Positive Indexing
          </button>
          <button
            onClick={() => {
              setActiveTab('negative');
              setIsErrorMode(false);
            }}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'negative' ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Negative Indexing
          </button>
          <button
            onClick={() => {
              setActiveTab('slicing');
              setIsErrorMode(false);
            }}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'slicing' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            List Slicing
          </button>
        </div>
      </div>

      {/* Interactive List Cards Grid */}
      <div className="bg-slate-950 rounded-2xl border border-white/10 p-5 space-y-4 font-mono text-xs">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
            <ArrowLeftRight size={14} className="text-cyan-400" /> Interactive List Items (Length = {len})
          </span>
          <button
            onClick={() => setIsErrorMode(!isErrorMode)}
            className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border transition-all ${
              isErrorMode ? 'bg-red-950 border-red-500 text-red-300' : 'bg-slate-900 border-white/10 text-gray-400'
            }`}
          >
            {isErrorMode ? '⚠ Testing IndexError' : 'Test IndexError'}
          </button>
        </div>

        {/* Item Cards */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {items.map((item, idx) => {
            const pIdx = idx;
            const nIdx = idx - len;
            const isSingleSelected = !isErrorMode && (activeTab === 'indexing' || activeTab === 'negative') && posIdx === idx;
            const isSliceSelected = !isErrorMode && activeTab === 'slicing' && idx >= (sliceStart < 0 ? len + sliceStart : sliceStart) && idx < (sliceStop < 0 ? len + sliceStop : sliceStop);

            return (
              <motion.div
                key={idx}
                onClick={() => {
                  setSelectedIndex(idx);
                  setIsErrorMode(false);
                }}
                whileHover={{ scale: 1.05 }}
                className={`cursor-pointer border rounded-2xl p-3.5 text-center transition-all min-w-[90px] ${
                  isSingleSelected || isSliceSelected
                    ? 'bg-cyan-500/30 border-cyan-400 text-white ring-2 ring-cyan-400 font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 border-white/10 text-gray-300 hover:border-cyan-500/40'
                }`}
              >
                <div className="text-base font-bold text-cyan-300 border-b border-white/10 pb-1 mb-1">
                  "{item}"
                </div>
                <div className="text-[10px] text-emerald-400 font-bold">+{pIdx}</div>
                <div className="text-[10px] text-purple-400 font-bold">{nIdx}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Execution Results */}
      {isErrorMode ? (
        <div className="bg-red-950/50 border border-red-500/50 rounded-2xl p-5 font-mono text-xs text-red-200 space-y-1">
          <div className="flex items-center gap-2 font-bold text-red-400">
            <AlertCircle size={16} /> IndexError: list index out of range
          </div>
          <p className="font-sans text-xs text-red-300">
            Executing <code className="bg-red-900 px-2 py-0.5 rounded font-bold text-white">fruits[{len}]</code> raises IndexError because valid positive indexes are 0 to {len - 1}.
          </p>
        </div>
      ) : activeTab === 'slicing' ? (
        <div className="bg-slate-950 border border-purple-500/30 rounded-2xl p-5 space-y-4 font-mono text-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-3 gap-3">
            <div className="text-purple-400 font-bold uppercase text-[11px] flex items-center gap-2">
              <Scissors size={14} /> Slicing Range Controls
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">Start:</span>
                <input
                  type="number"
                  min="0"
                  max={len}
                  value={sliceStart}
                  onChange={(e) => setSliceStart(parseInt(e.target.value) || 0)}
                  className="bg-slate-900 border border-emerald-500/40 rounded px-2 py-0.5 w-14 text-white text-center font-bold"
                />
              </label>
              <label className="flex items-center gap-2">
                <span className="text-red-400 font-bold">Stop:</span>
                <input
                  type="number"
                  min="0"
                  max={len}
                  value={sliceStop}
                  onChange={(e) => setSliceStop(parseInt(e.target.value) || 0)}
                  className="bg-slate-900 border border-red-500/40 rounded px-2 py-0.5 w-14 text-white text-center font-bold"
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-white/10 space-y-2">
              <div className="text-gray-400 text-[10px] uppercase font-sans">Python Code</div>
              <div className="text-base font-bold text-cyan-300">
                fruits[{sliceStart}:{sliceStop}] → <span className="text-emerald-400">{JSON.stringify(slicedItems)}</span>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-purple-500/30 space-y-1">
              <div className="text-purple-300 font-bold text-[10px] uppercase font-sans">Return Type Distinction</div>
              <div className="text-sm font-bold text-white">
                type(fruits[{sliceStart}:{sliceStop}]) → <span className="text-purple-400">&lt;class 'list'&gt;</span>
              </div>
              <p className="text-[11px] text-gray-400 font-sans">
                Slicing always returns a NEW <code className="text-purple-300 font-bold">list</code> object, even if it contains 1 item or 0 items.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-4 space-y-2">
            <div className="text-emerald-400 font-bold text-[11px] uppercase flex justify-between">
              <span>{activeTab === 'indexing' ? 'Positive Index' : 'Negative Index'} Access</span>
              <span className="text-emerald-300">&lt;class 'str'&gt;</span>
            </div>
            <div className="text-base font-bold text-white">
              fruits[{activeTab === 'indexing' ? posIdx : negIdx}] → <span className="text-cyan-300">"{currentItem}"</span>
            </div>
            <p className="text-gray-400 font-sans text-xs">
              Indexing accesses a single item directly. The returned type matches the stored item (<code className="text-emerald-400">str</code>).
            </p>
          </div>

          <div className="bg-slate-950 border border-purple-500/30 rounded-2xl p-4 space-y-2">
            <div className="text-purple-400 font-bold text-[11px] uppercase">Dual Mapping Equivalent</div>
            <div className="text-base font-bold text-white">
              fruits[{posIdx}] == fruits[{negIdx}]
            </div>
            <p className="text-gray-400 font-sans text-xs">
              Both <code className="text-emerald-400">fruits[{posIdx}]</code> and <code className="text-purple-400">fruits[{negIdx}]</code> evaluate to <code className="text-cyan-300">"{currentItem}"</code>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
