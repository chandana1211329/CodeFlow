import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Copy, Hash, Search, ArrowRightLeft, Table, CheckCircle2, AlertCircle } from 'lucide-react';

export const ListMethodsLabWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sort' | 'copy' | 'count' | 'index'>('sort');
  const [numbers, setNumbers] = useState<number[]>([40, 10, 30, 20, 10]);
  const [isReverse, setIsReverse] = useState<boolean>(false);
  const [targetCountVal, setTargetCountVal] = useState<number>(10);
  const [targetIndexVal, setTargetIndexVal] = useState<number>(30);

  // Copy tab state
  const [copyMode, setCopyMode] = useState<'reference' | 'copy'>('copy');
  const [copiedItemValue, setCopiedItemValue] = useState<number>(99);

  // Computed results
  const getSortResult = () => {
    const list = [...numbers];
    list.sort((a, b) => (isReverse ? b - a : a - b));
    return {
      code: `numbers.sort(${isReverse ? 'reverse=True' : ''})`,
      result: JSON.stringify(list),
      returnVal: 'None',
      note: `In-place mutation rearranges items into ${isReverse ? 'descending' : 'ascending'} order. Length remains ${list.length}.`
    };
  };

  const getCopyResult = () => {
    if (copyMode === 'reference') {
      const a = [...numbers];
      const b = a; // Same reference
      b[0] = copiedItemValue;
      return {
        code: `a = [${numbers.join(', ')}]\nb = a\nb[0] = ${copiedItemValue}`,
        aResult: JSON.stringify(a),
        bResult: JSON.stringify(b),
        isEqual: a === b,
        note: `Assignment (b = a) shares the SAME list object. Modifying b[0] ALSO mutates a[0]!`
      };
    } else {
      const a = [...numbers];
      const b = [...a]; // Independent copy
      b[0] = copiedItemValue;
      return {
        code: `a = [${numbers.join(', ')}]\nb = a.copy()\nb[0] = ${copiedItemValue}`,
        aResult: JSON.stringify(a),
        bResult: JSON.stringify(b),
        isEqual: false,
        note: `copy() creates a NEW independent list object (a is b → False). Modifying b[0] leaves a[0] unchanged!`
      };
    }
  };

  const getCountResult = () => {
    const count = numbers.filter((x) => x === targetCountVal).length;
    return {
      code: `numbers.count(${targetCountVal})`,
      count,
      note: `Value ${targetCountVal} appears ${count} times in the list. (Returns <class 'int'>)`
    };
  };

  const getIndexResult = () => {
    const idx = numbers.indexOf(targetIndexVal);
    if (idx === -1) {
      return { isError: true, errorMsg: `ValueError: ${targetIndexVal} is not in list` };
    }
    return {
      isError: false,
      code: `numbers.index(${targetIndexVal})`,
      index: idx,
      note: `First matching occurrence of ${targetIndexVal} is at index position ${idx}.`
    };
  };

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl flex items-center justify-center text-cyan-400">
            <Sliders size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Section 45 List Methods Workbench
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wide">
                sort() • copy() • count() • index()
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Explore in-place sorting, shallow copies vs references, occurrence counting, and value-to-position searches.
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('sort')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'sort' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            .sort()
          </button>
          <button
            onClick={() => setActiveTab('copy')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'copy' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            .copy()
          </button>
          <button
            onClick={() => setActiveTab('count')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'count' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            .count()
          </button>
          <button
            onClick={() => setActiveTab('index')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'index' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            .index()
          </button>
        </div>
      </div>

      {/* Tab 1: sort() */}
      {activeTab === 'sort' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="flex justify-between items-center bg-slate-950 p-4 rounded-2xl border border-white/10">
            <span className="text-gray-300 font-sans font-bold text-xs uppercase">Sort Order Direction:</span>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isReverse}
                onChange={(e) => setIsReverse(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-0"
              />
              <span className="text-cyan-300 font-bold">reverse=True (Descending Order)</span>
            </label>
          </div>

          <div className="bg-slate-950 border border-cyan-500/30 rounded-2xl p-5 space-y-2">
            <div className="text-cyan-400 font-bold uppercase text-[11px] flex justify-between font-sans">
              <span>Executed Statement</span>
              <span className="text-purple-300">Return Value: None</span>
            </div>
            <div className="text-base font-bold text-cyan-300 bg-slate-900 p-3.5 rounded-xl border border-white/10">
              {getSortResult().code} → {getSortResult().result}
            </div>
            <p className="text-gray-400 font-sans text-xs pt-1">{getSortResult().note}</p>
          </div>
        </div>
      )}

      {/* Tab 2: copy() */}
      {activeTab === 'copy' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-5 rounded-2xl border border-white/10">
            <div className="space-y-2">
              <label className="text-gray-400 font-sans font-bold text-xs uppercase">Assignment vs Copying Mode:</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setCopyMode('reference')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold font-sans border transition-all ${
                    copyMode === 'reference' ? 'bg-red-950 border-red-500 text-red-200' : 'bg-slate-900 border-white/10 text-gray-400'
                  }`}
                >
                  b = a (Reference Shared)
                </button>
                <button
                  onClick={() => setCopyMode('copy')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold font-sans border transition-all ${
                    copyMode === 'copy' ? 'bg-emerald-950 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-white/10 text-gray-400'
                  }`}
                >
                  b = a.copy() (New Object)
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-400 font-sans font-bold text-xs uppercase">Mutate b[0] Value:</label>
              <input
                type="number"
                value={copiedItemValue}
                onChange={(e) => setCopiedItemValue(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-purple-500/40 rounded-xl p-2 text-white font-bold"
              />
            </div>
          </div>

          {/* Copy Result Display */}
          <div className="bg-slate-950 border border-purple-500/30 rounded-2xl p-5 space-y-3">
            <div className="text-purple-400 font-bold uppercase text-[11px] flex justify-between font-sans">
              <span>Execution State</span>
              <span className="text-emerald-400 font-bold">a is b → {getCopyResult().isEqual ? 'True' : 'False'}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm font-bold bg-slate-900 p-3 rounded-xl border border-white/10">
              <div>a: <span className="text-cyan-300">{getCopyResult().aResult}</span></div>
              <div>b: <span className="text-emerald-400">{getCopyResult().bResult}</span></div>
            </div>
            <p className="text-gray-400 font-sans text-xs pt-1">{getCopyResult().note}</p>
          </div>
        </div>
      )}

      {/* Tab 3: count() */}
      {activeTab === 'count' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 space-y-2">
            <label className="text-gray-400 font-sans font-bold text-xs uppercase">Target Value to Count:</label>
            <input
              type="number"
              value={targetCountVal}
              onChange={(e) => setTargetCountVal(parseInt(e.target.value) || 0)}
              className="w-full bg-slate-900 border border-emerald-500/40 rounded-xl p-2.5 text-white font-bold"
            />
          </div>

          <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
            <div className="text-emerald-400 font-bold uppercase text-[11px] flex justify-between font-sans">
              <span>Executed count()</span>
              <span className="text-emerald-300">&lt;class 'int'&gt;</span>
            </div>
            <div className="text-base font-bold text-cyan-300 bg-slate-900 p-3.5 rounded-xl border border-white/10">
              {getCountResult().code} → <span className="text-emerald-400 font-bold">{getCountResult().count}</span>
            </div>
            <p className="text-gray-400 font-sans text-xs pt-1">{getCountResult().note}</p>
          </div>
        </div>
      )}

      {/* Tab 4: index() */}
      {activeTab === 'index' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 space-y-2">
            <label className="text-gray-400 font-sans font-bold text-xs uppercase">Value to Search (VALUE → POSITION):</label>
            <input
              type="number"
              value={targetIndexVal}
              onChange={(e) => setTargetIndexVal(parseInt(e.target.value) || 0)}
              className="w-full bg-slate-900 border border-amber-500/40 rounded-xl p-2.5 text-white font-bold"
            />
          </div>

          {getIndexResult().isError ? (
            <div className="bg-red-950/50 border border-red-500/50 rounded-2xl p-5 text-red-200">
              ⚠ {getIndexResult().errorMsg}
            </div>
          ) : (
            <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-5 space-y-2">
              <div className="text-amber-400 font-bold uppercase text-[11px] flex justify-between font-sans">
                <span>Executed index()</span>
                <span className="text-amber-300">Position Index: {getIndexResult().index}</span>
              </div>
              <div className="text-base font-bold text-cyan-300 bg-slate-900 p-3.5 rounded-xl border border-white/10">
                {getIndexResult().code} → <span className="text-amber-400 font-bold">{getIndexResult().index}</span>
              </div>
              <p className="text-gray-400 font-sans text-xs pt-1">{getIndexResult().note}</p>
            </div>
          )}

          {/* Golden distinction callout */}
          <div className="bg-slate-950 border border-cyan-500/30 rounded-2xl p-4 font-sans text-xs space-y-1">
            <div className="text-cyan-400 font-bold uppercase font-mono text-[11px]">
              Indexing vs index() Golden Rule
            </div>
            <p className="text-gray-300">
              <code className="text-emerald-300 font-mono">list[1]</code> answers: <strong>POSITION → VALUE</strong> (What item is at index 1?).
            </p>
            <p className="text-gray-300">
              <code className="text-amber-300 font-mono">list.index("banana")</code> answers: <strong>VALUE → POSITION</strong> (Where is "banana" stored?).
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
