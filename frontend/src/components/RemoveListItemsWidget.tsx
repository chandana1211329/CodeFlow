import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, AlertTriangle, Table, RefreshCcw, CheckCircle2, Layers } from 'lucide-react';

export const RemoveListItemsWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'remove' | 'pop' | 'del' | 'clear'>('remove');
  const [items, setItems] = useState<string[]>(['apple', 'banana', 'mango', 'banana', 'orange']);
  const [valueToRemove, setValueToRemove] = useState<string>('banana');
  const [popIndex, setPopIndex] = useState<number>(2);
  const [delStart, setDelStart] = useState<number>(1);
  const [delStop, setDelStop] = useState<number>(3);

  // Compute removals
  const getRemoveResult = () => {
    const list = [...items];
    const idx = list.indexOf(valueToRemove);
    if (idx === -1) {
      return { isError: true, errorMsg: `ValueError: list.remove(x): x not in list ("${valueToRemove}")` };
    }
    list.splice(idx, 1);
    return {
      isError: false,
      code: `fruits.remove("${valueToRemove}")`,
      result: JSON.stringify(list),
      returnVal: 'None',
      note: `Removes FIRST occurrence of "${valueToRemove}" at index ${idx}. Remaining length: ${list.length}.`
    };
  };

  const getPopResult = () => {
    const list = [...items];
    const targetIdx = popIndex >= 0 ? popIndex : list.length + popIndex;
    if (targetIdx < 0 || targetIdx >= list.length) {
      return { isError: true, errorMsg: `IndexError: pop index out of range (${popIndex})` };
    }
    const poppedVal = list.splice(targetIdx, 1)[0];
    return {
      isError: false,
      code: `removed = fruits.pop(${popIndex})`,
      result: JSON.stringify(list),
      returnVal: `"${poppedVal}"`,
      note: `Removes item at index ${popIndex} ("${poppedVal}") AND returns it. Remaining length: ${list.length}.`
    };
  };

  const getDelResult = () => {
    const list = [...items];
    if (delStart < 0 || delStart >= list.length) {
      return { isError: true, errorMsg: `IndexError: list assignment index out of range` };
    }
    list.splice(delStart, delStop - delStart);
    return {
      isError: false,
      code: `del fruits[${delStart}:${delStop}]`,
      result: JSON.stringify(list),
      returnVal: 'None (Statement)',
      note: `Deletes slice range [${delStart}:${delStop}]. Remaining length: ${list.length}.`
    };
  };

  return (
    <div className="my-8 bg-[#020617] border border-red-500/30 rounded-3xl p-6 shadow-2xl shadow-red-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500/20 border border-red-400/40 rounded-2xl flex items-center justify-center text-red-400">
            <Trash2 size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Remove List Items Studio
              <span className="bg-red-500/20 text-red-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-400/30 uppercase tracking-wide">
                remove() • pop() • del • clear()
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Compare removing by value, removing by index with returned value, deleting slices, and clearing entire lists.
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('remove')}
            className={`px-2.5 py-1 rounded-xl transition-all ${
              activeTab === 'remove' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            remove(val)
          </button>
          <button
            onClick={() => setActiveTab('pop')}
            className={`px-2.5 py-1 rounded-xl transition-all ${
              activeTab === 'pop' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            pop(idx)
          </button>
          <button
            onClick={() => setActiveTab('del')}
            className={`px-2.5 py-1 rounded-xl transition-all ${
              activeTab === 'del' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            del statement
          </button>
          <button
            onClick={() => setActiveTab('clear')}
            className={`px-2.5 py-1 rounded-xl transition-all ${
              activeTab === 'clear' ? 'bg-slate-700 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            clear()
          </button>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 font-mono text-xs space-y-4">
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <span className="text-gray-400 font-sans font-bold text-xs uppercase">Current List State:</span>
          <span className="text-cyan-400 font-bold">fruits = {JSON.stringify(items)}</span>
        </div>

        {activeTab === 'remove' && (
          <div className="space-y-2">
            <label className="text-gray-400 font-sans font-bold text-xs uppercase">Target Value to Remove:</label>
            <input
              type="text"
              value={valueToRemove}
              onChange={(e) => setValueToRemove(e.target.value)}
              className="w-full bg-slate-900 border border-red-500/40 rounded-xl p-2.5 text-white font-bold"
            />
          </div>
        )}

        {activeTab === 'pop' && (
          <div className="space-y-2">
            <label className="text-gray-400 font-sans font-bold text-xs uppercase">Index to Pop (Omit for last item):</label>
            <input
              type="number"
              min="0"
              max={items.length - 1}
              value={popIndex}
              onChange={(e) => setPopIndex(parseInt(e.target.value) || 0)}
              className="w-full bg-slate-900 border border-emerald-500/40 rounded-xl p-2.5 text-white font-bold"
            />
          </div>
        )}

        {activeTab === 'del' && (
          <div className="flex gap-4">
            <label className="flex-1">
              <span className="text-gray-400 font-sans font-bold text-xs uppercase">Slice Start:</span>
              <input
                type="number"
                min="0"
                max={items.length}
                value={delStart}
                onChange={(e) => setDelStart(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-purple-500/40 rounded-xl p-2 text-white font-bold mt-1"
              />
            </label>
            <label className="flex-1">
              <span className="text-gray-400 font-sans font-bold text-xs uppercase">Slice Stop:</span>
              <input
                type="number"
                min="0"
                max={items.length}
                value={delStop}
                onChange={(e) => setDelStop(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-purple-500/40 rounded-xl p-2 text-white font-bold mt-1"
              />
            </label>
          </div>
        )}

        {activeTab === 'clear' && (
          <div className="text-gray-400 font-sans text-xs">
            <code className="text-cyan-300 font-bold">fruits.clear()</code> removes ALL items. <code className="text-emerald-400 font-bold">fruits</code> becomes <code className="text-emerald-300 font-bold">[]</code> (Length: 0), but the variable still exists.
          </div>
        )}
      </div>

      {/* Execution Results */}
      {activeTab === 'remove' && (
        getRemoveResult().isError ? (
          <div className="bg-red-950/50 border border-red-500/50 rounded-2xl p-5 font-mono text-xs text-red-200">
            ⚠ {getRemoveResult().errorMsg}
          </div>
        ) : (
          <div className="bg-slate-950 border border-red-500/30 rounded-2xl p-5 space-y-2 font-mono text-xs">
            <div className="text-red-400 font-bold uppercase text-[11px] flex justify-between">
              <span>Executed remove()</span>
              <span className="text-purple-300">Return: None</span>
            </div>
            <div className="text-base font-bold text-cyan-300 bg-slate-900 p-3 rounded-xl border border-white/10">
              {getRemoveResult().code} → {getRemoveResult().result}
            </div>
            <p className="text-gray-400 font-sans text-xs pt-1">{getRemoveResult().note}</p>
          </div>
        )
      )}

      {activeTab === 'pop' && (
        getPopResult().isError ? (
          <div className="bg-red-950/50 border border-red-500/50 rounded-2xl p-5 font-mono text-xs text-red-200">
            ⚠ {getPopResult().errorMsg}
          </div>
        ) : (
          <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-5 space-y-2 font-mono text-xs">
            <div className="text-emerald-400 font-bold uppercase text-[11px] flex justify-between">
              <span>Executed pop()</span>
              <span className="text-emerald-300">Returned Value: {getPopResult().returnVal}</span>
            </div>
            <div className="text-base font-bold text-cyan-300 bg-slate-900 p-3 rounded-xl border border-white/10">
              {getPopResult().code} → Remaining: {getPopResult().result}
            </div>
            <p className="text-gray-400 font-sans text-xs pt-1">{getPopResult().note}</p>
          </div>
        )
      )}

      {activeTab === 'del' && (
        getDelResult().isError ? (
          <div className="bg-red-950/50 border border-red-500/50 rounded-2xl p-5 font-mono text-xs text-red-200">
            ⚠ {getDelResult().errorMsg}
          </div>
        ) : (
          <div className="bg-slate-950 border border-purple-500/30 rounded-2xl p-5 space-y-2 font-mono text-xs">
            <div className="text-purple-400 font-bold uppercase text-[11px]">Executed del Statement</div>
            <div className="text-base font-bold text-cyan-300 bg-slate-900 p-3 rounded-xl border border-white/10">
              {getDelResult().code} → {getDelResult().result}
            </div>
            <p className="text-gray-400 font-sans text-xs pt-1">{getDelResult().note}</p>
          </div>
        )
      )}

      {activeTab === 'clear' && (
        <div className="bg-slate-950 border border-slate-700 rounded-2xl p-5 space-y-2 font-mono text-xs">
          <div className="text-gray-300 font-bold uppercase text-[11px]">Executed clear()</div>
          <div className="text-base font-bold text-cyan-300 bg-slate-900 p-3 rounded-xl border border-white/10">
            fruits.clear() → []
          </div>
          <p className="text-gray-400 font-sans text-xs pt-1">
            ✓ All elements removed. Variable <code className="text-cyan-300">fruits</code> still exists and evaluates to <code className="text-emerald-300">[]</code>.
          </p>
        </div>
      )}

      {/* Master Matrix Table */}
      <div className="bg-slate-950 rounded-2xl border border-white/10 p-4 font-mono text-xs space-y-3">
        <div className="text-gray-400 font-sans font-bold text-xs uppercase flex items-center gap-2">
          <Table size={14} className="text-cyan-400" /> Section 43 Removal Master Comparison Matrix
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 text-cyan-400 font-bold">
                <th className="p-2">Operation</th>
                <th className="p-2">Selects By</th>
                <th className="p-2">Returns Removed Item?</th>
                <th className="p-2">Error on Missing?</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 divide-y divide-white/5">
              <tr>
                <td className="p-2 text-red-300 font-bold">remove(x)</td>
                <td className="p-2">First matching VALUE</td>
                <td className="p-2 text-gray-500">No (None)</td>
                <td className="p-2 text-red-400 font-bold">ValueError</td>
              </tr>
              <tr>
                <td className="p-2 text-emerald-300 font-bold">pop(i)</td>
                <td className="p-2">INDEX position</td>
                <td className="p-2 text-emerald-400 font-bold">YES (Returns item)</td>
                <td className="p-2 text-red-400 font-bold">IndexError</td>
              </tr>
              <tr>
                <td className="p-2 text-purple-300 font-bold">del list[i]</td>
                <td className="p-2">INDEX or SLICE range</td>
                <td className="p-2 text-gray-500">No (Statement)</td>
                <td className="p-2 text-red-400 font-bold">IndexError</td>
              </tr>
              <tr>
                <td className="p-2 text-slate-300 font-bold">clear()</td>
                <td className="p-2">Entire list contents</td>
                <td className="p-2 text-gray-500">No (None)</td>
                <td className="p-2 text-emerald-400 font-bold">Safe ([])</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
