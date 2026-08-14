import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Sparkles, Layers, Hash, CheckCircle2, Type } from 'lucide-react';

export const PythonListsVisualizerWidget: React.FC = () => {
  const [activePreset, setActivePreset] = useState<'fruits' | 'numbers' | 'mixed' | 'duplicates' | 'empty'>('fruits');

  const getPresetData = () => {
    switch (activePreset) {
      case 'fruits':
        return {
          code: 'fruits = ["apple", "banana", "mango"]',
          items: ['apple', 'banana', 'mango'],
          desc: 'List of string items grouped inside square brackets [] and separated by commas.'
        };
      case 'numbers':
        return {
          code: 'numbers = [10, 20, 30, 40]',
          items: [10, 20, 30, 40],
          desc: 'List of integer numeric items.'
        };
      case 'mixed':
        return {
          code: 'data = ["Alex", 21, True, 85.5]',
          items: ['Alex', 21, true, 85.5],
          desc: 'Python lists can hold mixed data types (str, int, bool, float) in a single collection.'
        };
      case 'duplicates':
        return {
          code: 'fruits = ["apple", "banana", "apple"]',
          items: ['apple', 'banana', 'apple'],
          desc: 'Lists do not remove duplicates; identical values occupy separate positional slots.'
        };
      case 'empty':
        return {
          code: 'items = []',
          items: [],
          desc: 'An empty list containing 0 items.'
        };
    }
  };

  const current = getPresetData();

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl flex items-center justify-center text-cyan-400">
            <Box size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Python Lists Visualizer
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wide">
                &lt;class 'list'&gt; • Ordered Collections
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Explore list creation, length (len()), mixed data types, and duplicate positional items.
            </p>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActivePreset('fruits')}
            className={`px-2.5 py-1 rounded-xl transition-all ${
              activePreset === 'fruits' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Strings
          </button>
          <button
            onClick={() => setActivePreset('numbers')}
            className={`px-2.5 py-1 rounded-xl transition-all ${
              activePreset === 'numbers' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Numbers
          </button>
          <button
            onClick={() => setActivePreset('mixed')}
            className={`px-2.5 py-1 rounded-xl transition-all ${
              activePreset === 'mixed' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Mixed Types
          </button>
          <button
            onClick={() => setActivePreset('duplicates')}
            className={`px-2.5 py-1 rounded-xl transition-all ${
              activePreset === 'duplicates' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Duplicates
          </button>
          <button
            onClick={() => setActivePreset('empty')}
            className={`px-2.5 py-1 rounded-xl transition-all ${
              activePreset === 'empty' ? 'bg-slate-700 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Empty []
          </button>
        </div>
      </div>

      {/* Code & Definition Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-2xl border border-cyan-500/30 space-y-2">
          <div className="text-gray-400 text-[10px] uppercase font-sans font-bold">Python Source Code</div>
          <div className="text-base font-bold text-cyan-300 bg-slate-900 p-3 rounded-xl border border-white/10">
            {current.code}
          </div>
          <p className="text-gray-400 font-sans text-xs pt-1">
            {current.desc}
          </p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 flex flex-col justify-between space-y-2">
          <div>
            <div className="text-emerald-400 font-bold text-[10px] uppercase font-sans flex items-center gap-1.5">
              <Hash size={14} /> List Metadata
            </div>
            <div className="text-base font-bold text-white pt-1">
              len() = <span className="text-emerald-400">{current.items.length}</span> items
            </div>
          </div>
          <div className="text-xs text-gray-400 font-sans border-t border-white/10 pt-2">
            type() → <code className="text-purple-300 font-mono font-bold">&lt;class 'list'&gt;</code>
          </div>
        </div>
      </div>

      {/* Visual Memory Slot Representation */}
      <div className="bg-slate-950 rounded-2xl border border-white/10 p-5 space-y-4 font-mono text-xs">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
            <Layers size={14} className="text-cyan-400" /> Positional Item Slots Visualizer
          </span>
          <span className="text-xs text-cyan-400 font-bold">
            {current.items.length === 0 ? 'Empty List' : `${current.items.length} Positional Slots`}
          </span>
        </div>

        {current.items.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-white/5 text-gray-500 font-sans">
            List is empty <code className="text-cyan-400">[]</code> (Contains 0 items).
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {current.items.map((item, idx) => {
              const itemType = typeof item === 'string' ? 'str' : typeof item === 'number' ? (Number.isInteger(item) ? 'int' : 'float') : typeof item === 'boolean' ? 'bool' : 'obj';

              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-4 text-center min-w-[100px] shadow-lg space-y-1"
                >
                  <div className="text-[10px] text-gray-500 uppercase font-sans">Item #{idx + 1}</div>
                  <div className="text-base font-bold text-cyan-300 border-b border-white/10 pb-1">
                    {typeof item === 'string' ? `"${item}"` : String(item)}
                  </div>
                  <div className="text-[10px] text-purple-400 font-bold">&lt;{itemType}&gt;</div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
