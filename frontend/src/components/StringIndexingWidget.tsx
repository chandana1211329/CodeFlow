import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MousePointer, ArrowLeftRight, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export const StringIndexingWidget: React.FC = () => {
  const [text, setText] = useState<string>('PYTHON');
  const [selectedIndex, setSelectedIndex] = useState<number>(3);
  const [isErrorMode, setIsErrorMode] = useState<boolean>(false);

  const len = text.length;
  const posIndex = selectedIndex >= 0 ? selectedIndex : len + selectedIndex;
  const negIndex = selectedIndex < 0 ? selectedIndex : selectedIndex - len;

  const validIndex = posIndex >= 0 && posIndex < len;
  const selectedChar = validIndex ? text[posIndex] : null;

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
              CodeFlow String Indexing Master Map
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wide">
                Positive (0..N-1) • Negative (-N..-1)
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Click any character or index box to inspect dual positive/negative index mappings.
            </p>
          </div>
        </div>

        {/* Input & Error Toggle */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-2xl border border-white/10">
            <span className="text-gray-400">Word:</span>
            <input
              type="text"
              value={text}
              onChange={(e) => {
                const val = e.target.value.toUpperCase() || 'PYTHON';
                setText(val);
                setSelectedIndex(0);
                setIsErrorMode(false);
              }}
              className="bg-slate-800 text-cyan-300 font-bold px-2 py-0.5 rounded w-24 border border-cyan-500/30 focus:outline-none"
            />
          </div>

          <button
            onClick={() => setIsErrorMode(!isErrorMode)}
            className={`px-3 py-1.5 rounded-2xl font-bold transition-all border ${
              isErrorMode ? 'bg-red-950/80 border-red-500 text-red-300' : 'bg-slate-900 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            {isErrorMode ? '⚠ Testing IndexError' : 'Test IndexError'}
          </button>
        </div>
      </div>

      {/* Dual Index Character Map Grid */}
      <div className="bg-slate-950 rounded-2xl border border-white/10 p-5 space-y-4 font-mono text-xs">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
            <ArrowLeftRight size={14} className="text-cyan-400" /> Interactive Character Map (Length = {len})
          </span>
          <span className="text-xs text-cyan-400 font-bold">
            Click any cell to inspect indexing
          </span>
        </div>

        {/* Character Columns */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {text.split('').map((char, idx) => {
            const pIdx = idx;
            const nIdx = idx - len;
            const isSelected = !isErrorMode && posIndex === idx;

            return (
              <motion.div
                key={idx}
                onClick={() => {
                  setSelectedIndex(idx);
                  setIsErrorMode(false);
                }}
                whileHover={{ scale: 1.05 }}
                className={`cursor-pointer border rounded-2xl p-3 text-center transition-all min-w-[65px] ${
                  isSelected
                    ? 'bg-cyan-500/30 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-400'
                    : 'bg-slate-900/80 border-white/10 text-gray-300 hover:border-cyan-500/40'
                }`}
              >
                {/* Character */}
                <div className="text-lg font-bold text-cyan-300 border-b border-white/10 pb-1 mb-1">
                  {char === ' ' ? '␣' : char}
                </div>
                {/* Positive Index */}
                <div className="text-[10px] text-emerald-400 font-bold">
                  +{pIdx}
                </div>
                {/* Negative Index */}
                <div className="text-[10px] text-purple-400 font-bold">
                  {nIdx}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex justify-center items-center gap-6 text-[11px] font-sans text-gray-400 pt-2 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Positive Indexing (Count from Left, start at 0)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
            <span>Negative Indexing (Count from Right, start at -1)</span>
          </div>
        </div>
      </div>

      {/* Selected Index Card & Python Evaluation Box */}
      {isErrorMode ? (
        <div className="bg-red-950/40 border border-red-500/40 rounded-2xl p-5 space-y-2 font-mono text-xs text-red-200 shadow-xl">
          <div className="flex items-center gap-2 font-bold text-red-400">
            <AlertCircle size={16} /> IndexError: string index out of range
          </div>
          <p className="font-sans text-xs text-red-300 leading-relaxed">
            Executing <code className="bg-red-900/60 px-2 py-0.5 rounded text-white font-bold">{text}[{len}]</code> or <code className="bg-red-900/60 px-2 py-0.5 rounded text-white font-bold">{text}[{-len - 1}]</code> raises IndexError because valid positive indexes are 0 to {len - 1} and negative indexes are {-len} to -1.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {/* Positive Access Card */}
          <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-4 space-y-2">
            <div className="text-emerald-400 font-bold text-[11px] uppercase flex items-center justify-between">
              <span>Positive Index Access</span>
              <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px]">From Left</span>
            </div>
            <div className="text-base font-bold text-white">
              {text}[<span className="text-emerald-400">{posIndex}</span>] → <span className="text-cyan-300">"{selectedChar}"</span>
            </div>
            <div className="text-gray-400 text-[11px] font-sans">
              Type: <strong className="text-emerald-400">&lt;class 'str'&gt;</strong>
            </div>
          </div>

          {/* Negative Access Card */}
          <div className="bg-slate-950 border border-purple-500/30 rounded-2xl p-4 space-y-2">
            <div className="text-purple-400 font-bold text-[11px] uppercase flex items-center justify-between">
              <span>Negative Index Access</span>
              <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-[10px]">From Right</span>
            </div>
            <div className="text-base font-bold text-white">
              {text}[<span className="text-purple-400">{negIndex}</span>] → <span className="text-cyan-300">"{selectedChar}"</span>
            </div>
            <div className="text-gray-400 text-[11px] font-sans">
              Both <code className="text-emerald-400">{text}[{posIndex}]</code> and <code className="text-purple-400">{text}[{negIndex}]</code> access the exact same character!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
