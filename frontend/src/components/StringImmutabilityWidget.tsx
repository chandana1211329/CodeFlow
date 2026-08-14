import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, AlertCircle, CheckCircle2, ArrowRight, RefreshCw, Layers } from 'lucide-react';

export const StringImmutabilityWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mutation' | 'reassignment'>('mutation');
  const [variableValue, setVariableValue] = useState<string>('cat');
  const [attemptedMutation, setAttemptedMutation] = useState<boolean>(false);

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500/20 border border-purple-400/40 rounded-2xl flex items-center justify-center text-purple-400">
            <Lock size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow String Immutability Inspector
              <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-400/30 uppercase tracking-wide">
                Mutation (Forbidden) vs Reassignment (Allowed)
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Understand why Python strings cannot mutate in place and why methods return new string objects.
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-2xl border border-white/10 text-xs font-mono">
          <button
            onClick={() => {
              setActiveTab('mutation');
              setAttemptedMutation(false);
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'mutation' ? 'bg-red-950/80 border border-red-500/50 text-red-300' : 'text-gray-400 hover:text-white'
            }`}
          >
            1. In-Place Mutation (word[0] = 'b')
          </button>
          <button
            onClick={() => {
              setActiveTab('reassignment');
              setVariableValue('cat');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'reassignment' ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300' : 'text-gray-400 hover:text-white'
            }`}
          >
            2. Reassignment (word = 'b' + word[1:])
          </button>
        </div>
      </div>

      {/* Interactive Demonstration Panel */}
      {activeTab === 'mutation' ? (
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-gray-300 font-bold uppercase text-[11px]">
                Attempting Direct Character Item Assignment
              </span>
              <button
                onClick={() => setAttemptedMutation(true)}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-all"
              >
                Execute word[0] = 'b'
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-white/10 space-y-2">
                <div className="text-gray-400 text-[11px]">Initial State:</div>
                <div className="text-sm text-cyan-300 font-bold">word = "cat"</div>
                <div className="flex gap-2 text-center text-sm font-bold text-white pt-2">
                  <span className="w-8 py-1.5 bg-slate-800 border border-cyan-500/40 rounded">c</span>
                  <span className="w-8 py-1.5 bg-slate-800 border border-white/10 rounded">a</span>
                  <span className="w-8 py-1.5 bg-slate-800 border border-white/10 rounded">t</span>
                </div>
              </div>

              {attemptedMutation ? (
                <div className="bg-red-950/60 border border-red-500/50 p-4 rounded-xl space-y-2 text-red-200">
                  <div className="flex items-center gap-2 font-bold text-red-400">
                    <AlertCircle size={16} /> TypeError: 'str' object does not support item assignment
                  </div>
                  <p className="font-sans text-xs text-red-300">
                    Python string character slots are locked in memory after creation! You cannot overwrite character 'c' with 'b' inside an existing string object.
                  </p>
                </div>
              ) : (
                <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 flex items-center justify-center text-gray-500 font-sans text-xs">
                  Click "Execute word[0] = 'b'" to observe Python exception.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-gray-300 font-bold uppercase text-[11px]">
                Creating a New String & Reassigning Variable Reference
              </span>
              <button
                onClick={() => setVariableValue(variableValue === 'cat' ? 'bat' : 'cat')}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all flex items-center gap-1.5"
              >
                <RefreshCw size={14} /> Toggle word = "b" + word[1:]
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-emerald-500/30 space-y-2">
                <div className="text-emerald-400 font-bold text-[11px]">Variable Reference:</div>
                <div className="text-base text-white font-bold">word → "{variableValue}"</div>
                <p className="font-sans text-xs text-gray-400">
                  {variableValue === 'cat'
                    ? 'word currently points to string object "cat".'
                    : 'word has been reassigned to point to brand new string object "bat".'}
                </p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-purple-500/30 space-y-2">
                <div className="text-purple-400 font-bold text-[11px] uppercase flex items-center gap-1.5">
                  <CheckCircle2 size={14} /> Pythonic Immutability Rule
                </div>
                <p className="font-sans text-xs text-gray-300 leading-relaxed">
                  Notice that <code className="text-cyan-300">"cat"</code> was never edited. Python built a new string <code className="text-emerald-300">"bat"</code> and updated the variable <code className="text-purple-300">word</code> to refer to the new object!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
