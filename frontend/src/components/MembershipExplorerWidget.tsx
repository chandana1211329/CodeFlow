import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Zap, RefreshCw, Search } from 'lucide-react';

export const MembershipExplorerWidget: React.FC = () => {
  const [targetInput, setTargetInput] = useState<string>('Flow');
  const [containerInput, setContainerInput] = useState<string>('CodeFlow Python');
  const [selectedOp, setSelectedOp] = useState<'in' | 'not in'>('in');

  const presets = ['Python', 'Java', 'Flow', 'python', 'o', 'Code'];

  const isFound = containerInput.includes(targetInput);
  const evaluationResult = selectedOp === 'in' ? isFound : !isFound;

  return (
    <div className="my-8 bg-[#020617] border border-blue-500/30 rounded-3xl p-6 shadow-2xl shadow-blue-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600/20 border border-emerald-400/30 rounded-2xl flex items-center justify-center text-emerald-400">
            <Search size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Interactive Membership Explorer
            </h3>
            <p className="text-xs text-gray-400">
              Test whether a search target exists inside a string using <code className="text-emerald-300">in</code> and <code className="text-emerald-300">not in</code>
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setTargetInput('Flow');
            setContainerInput('CodeFlow Python');
            setSelectedOp('in');
          }}
          className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all flex items-center gap-1.5 text-xs"
        >
          <RefreshCw size={14} /> Reset
        </button>
      </div>

      {/* Inputs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
            <span>Search Target (Left)</span>
            <span className="text-[10px] text-emerald-400 font-mono">str</span>
          </label>
          <input
            type="text"
            value={targetInput}
            onChange={(e) => setTargetInput(e.target.value)}
            className="w-full bg-black/60 border border-emerald-500/30 rounded-xl px-4 py-2.5 font-mono text-sm text-emerald-400 focus:outline-none focus:border-emerald-400"
            placeholder='"Flow", "Java"'
          />
          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[10px] text-gray-500 self-center">Quick try:</span>
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setTargetInput(p)}
                className="px-2 py-0.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-[11px] font-mono text-gray-300"
              >
                "{p}"
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
            <span>Search Container / Text (Right)</span>
            <span className="text-[10px] text-emerald-400 font-mono">str</span>
          </label>
          <input
            type="text"
            value={containerInput}
            onChange={(e) => setContainerInput(e.target.value)}
            className="w-full bg-black/60 border border-emerald-500/30 rounded-xl px-4 py-2.5 font-mono text-sm text-blue-300 focus:outline-none focus:border-blue-400"
            placeholder='"CodeFlow Python"'
          />
        </div>
      </div>

      {/* Operator Selector */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
          Select Membership Operator:
        </span>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setSelectedOp('in')}
            className={`py-3 rounded-2xl font-mono text-sm font-bold border transition-all ${
              selectedOp === 'in'
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
            }`}
          >
            in (Is Present?)
          </button>
          <button
            onClick={() => setSelectedOp('not in')}
            className={`py-3 rounded-2xl font-mono text-sm font-bold border transition-all ${
              selectedOp === 'not in'
                ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-600/30'
                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
            }`}
          >
            not in (Is Absent?)
          </button>
        </div>
      </div>

      {/* Trace Pipeline */}
      <div className="bg-black/50 border border-white/10 rounded-2xl p-5 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <span className="font-bold text-emerald-400">MEMBERSHIP SEARCH TRACE</span>
          <span className="text-[10px] text-gray-500">Case-Sensitive Substring Check</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
            <span className="text-[10px] text-gray-500 uppercase block mb-1">Target</span>
            <span className="text-emerald-400 font-bold text-sm">"{targetInput}"</span>
          </div>

          <div className="bg-emerald-600/20 p-3 rounded-xl border border-emerald-500/30">
            <span className="text-[10px] text-emerald-300 uppercase block mb-1">Operator</span>
            <span className="text-emerald-400 font-bold text-base">{selectedOp}</span>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
            <span className="text-[10px] text-gray-500 uppercase block mb-1">Container</span>
            <span className="text-blue-300 font-bold text-sm">"{containerInput}"</span>
          </div>
        </div>

        {/* Visual String Match Highlighter */}
        <div className="bg-blue-950/40 border border-blue-500/20 p-4 rounded-xl text-center space-y-2">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Search Scan Visual:</span>
          <div className="text-base tracking-widest bg-black/60 p-3 rounded-lg overflow-x-auto inline-block border border-white/10">
            {containerInput.includes(targetInput) && targetInput.length > 0 ? (
              (() => {
                const parts = containerInput.split(targetInput);
                return (
                  <span>
                    {parts.map((part, idx) => (
                      <React.Fragment key={idx}>
                        <span>{part}</span>
                        {idx < parts.length - 1 && (
                          <span className="bg-emerald-500/30 text-emerald-300 font-bold px-1 py-0.5 rounded border border-emerald-400">
                            {targetInput}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </span>
                );
              })()
            ) : (
              <span className="text-gray-400">{containerInput} (No Match for "{targetInput}")</span>
            )}
          </div>

          <div className="text-xs font-semibold text-gray-300 pt-1">
            {isFound ? (
              <span className="text-emerald-400 font-bold">✓ Match Found! "{targetInput}" exists in container.</span>
            ) : (
              <span className="text-red-400 font-bold">✗ No Match! "{targetInput}" is absent from container.</span>
            )}
          </div>
        </div>

        {/* Final Result Card */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-xl gap-4">
          <div className="flex items-center gap-3">
            {evaluationResult ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
            ) : (
              <XCircle className="w-8 h-8 text-red-400 shrink-0" />
            )}
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Question Asked:</span>
              <span className="text-xs text-gray-300 block font-semibold">
                "{selectedOp === 'in' ? `Does '${targetInput}' exist inside '${containerInput}'?` : `Does '${targetInput}' NOT exist inside '${containerInput}'?`}"
              </span>
            </div>
          </div>

          <div className="bg-black/60 px-6 py-3 rounded-2xl border border-white/10 text-center shrink-0">
            <span className="text-[10px] text-gray-400 block uppercase font-bold">Python Result</span>
            <span className={`text-xl font-bold font-mono ${evaluationResult ? 'text-emerald-400' : 'text-red-400'}`}>
              {evaluationResult ? 'True' : 'False'}
            </span>
            <span className="text-[10px] text-cyan-400 block font-mono">type: bool</span>
          </div>
        </div>

        <div className="text-[11px] text-gray-400 italic text-center border-t border-white/5 pt-2">
          ✓ Original values remain unmodified: Target and Container are left intact.
        </div>
      </div>
    </div>
  );
};
