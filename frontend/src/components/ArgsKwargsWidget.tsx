import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Sparkles, Database, Code, CheckCircle2, ArrowRight } from 'lucide-react';

export const ArgsKwargsWidget: React.FC = () => {
  const [mode, setMode] = useState<'args' | 'kwargs' | 'both'>('args');

  // *args State
  const [numList, setNumList] = useState<number[]>([10, 20, 30]);
  const [inputVal, setInputVal] = useState<string>('');

  // **kwargs State
  const [nameVal, setNameVal] = useState<string>('Maya');
  const [ageVal, setAgeVal] = useState<number>(22);
  const [cityVal, setCityVal] = useState<string>('Hyderabad');

  const addNum = () => {
    const val = parseInt(inputVal);
    if (!isNaN(val)) {
      setNumList([...numList, val]);
      setInputVal('');
    }
  };

  const clearNums = () => setNumList([]);

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500/20 border border-purple-400/40 rounded-2xl flex items-center justify-center text-purple-400">
            <Sparkles size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow *args & **kwargs Collector Studio
              <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-400/30 uppercase tracking-wide">
                *args → Tuple • **kwargs → Dictionary
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              See how *args collects arbitrary positional arguments into a tuple and **kwargs collects keyword arguments into a dictionary.
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setMode('args')}
            className={`px-3 py-1 rounded-xl transition-all ${
              mode === 'args' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            *args (Tuple)
          </button>
          <button
            onClick={() => setMode('kwargs')}
            className={`px-3 py-1 rounded-xl transition-all ${
              mode === 'kwargs' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            **kwargs (Dict)
          </button>
          <button
            onClick={() => setMode('both')}
            className={`px-3 py-1 rounded-xl transition-all ${
              mode === 'both' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Combined
          </button>
        </div>
      </div>

      {/* Mode 1: *args */}
      {mode === 'args' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-cyan-500/30 space-y-3">
            <div className="text-cyan-400 font-bold uppercase text-[11px] font-sans">
              *args Collector Simulator (Positional Arguments $\rightarrow$ Tuple)
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Enter a number argument"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="bg-slate-900 border border-cyan-500/40 rounded-xl p-2.5 text-white font-bold flex-1"
              />
              <button
                onClick={addNum}
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2.5 rounded-xl font-bold font-sans"
              >
                Pass Argument
              </button>
              <button
                onClick={clearNums}
                className="bg-slate-800 hover:bg-slate-700 text-gray-300 px-3 py-2.5 rounded-xl font-bold font-sans"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Code & Collected Tuple Display */}
          <div className="bg-slate-950 border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="text-gray-400 font-sans font-bold text-xs uppercase">Executed Function Call</div>
            <div className="text-base font-bold text-cyan-300 bg-slate-900 p-3.5 rounded-xl border border-white/10">
              add_numbers({numList.join(', ')})
            </div>
            <div className="bg-slate-900 p-3.5 rounded-xl border border-cyan-500/30 space-y-1">
              <div className="text-emerald-400 font-bold">Inside Function:</div>
              <div className="text-white text-sm">
                args = <span className="text-emerald-300">({numList.join(', ')}{numList.length === 1 ? ',' : ''})</span> &nbsp;
                <span className="text-gray-400 text-xs">(type: &lt;class 'tuple'&gt;)</span>
              </div>
              <div className="text-cyan-300 text-sm">
                sum(args) = <span className="text-emerald-400 font-bold">{numList.reduce((a, b) => a + b, 0)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: **kwargs */}
      {mode === 'kwargs' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/30 space-y-3">
            <div className="text-purple-400 font-bold uppercase text-[11px] font-sans">
              **kwargs Collector Simulator (Keyword Arguments $\rightarrow$ Dictionary)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-gray-400 font-sans font-bold text-xs">name=</label>
                <input
                  type="text"
                  value={nameVal}
                  onChange={(e) => setNameVal(e.target.value)}
                  className="w-full bg-slate-900 border border-purple-500/40 rounded-xl p-2 text-white font-bold"
                />
              </div>
              <div>
                <label className="text-gray-400 font-sans font-bold text-xs">age=</label>
                <input
                  type="number"
                  value={ageVal}
                  onChange={(e) => setAgeVal(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-purple-500/40 rounded-xl p-2 text-white font-bold"
                />
              </div>
              <div>
                <label className="text-gray-400 font-sans font-bold text-xs">city=</label>
                <input
                  type="text"
                  value={cityVal}
                  onChange={(e) => setCityVal(e.target.value)}
                  className="w-full bg-slate-900 border border-purple-500/40 rounded-xl p-2 text-white font-bold"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-950 border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="text-gray-400 font-sans font-bold text-xs uppercase">Executed Function Call</div>
            <div className="text-base font-bold text-purple-300 bg-slate-900 p-3.5 rounded-xl border border-white/10">
              show_profile(name="{nameVal}", age={ageVal}, city="{cityVal}")
            </div>
            <div className="bg-slate-900 p-3.5 rounded-xl border border-purple-500/30 space-y-1">
              <div className="text-purple-400 font-bold">Inside Function:</div>
              <div className="text-white text-sm">
                kwargs = <span className="text-emerald-300">&#123;"name": "{nameVal}", "age": {ageVal}, "city": "{cityVal}"&#125;</span> &nbsp;
                <span className="text-gray-400 text-xs">(type: &lt;class 'dict'&gt;)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Combined */}
      {mode === 'both' && (
        <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-5 space-y-3 font-mono text-xs">
          <div className="text-emerald-400 font-bold uppercase text-[11px] font-sans">
            Combined Signature: def example(*args, **kwargs)
          </div>
          <div className="text-base font-bold text-white bg-slate-900 p-3.5 rounded-xl border border-white/10">
            example(10, 20, name="Maya", age=22)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="bg-slate-900 p-3 rounded-xl border border-cyan-500/30">
              <div className="text-cyan-400 font-bold">args (Positional):</div>
              <div className="text-white text-sm font-bold">(10, 20)</div>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-purple-500/30">
              <div className="text-purple-400 font-bold">kwargs (Keyword):</div>
              <div className="text-white text-sm font-bold">&#123;"name": "Maya", "age": 22&#125;</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
