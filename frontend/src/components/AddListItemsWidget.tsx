import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, ArrowRight, Table, CheckCircle2, Layers, AlertCircle } from 'lucide-react';

export const AddListItemsWidget: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState<'append' | 'insert' | 'extend'>('append');
  const [initialList, setInitialList] = useState<string>('apple, banana');
  const [itemToAdd, setItemToAdd] = useState<string>('mango');
  const [insertIndex, setInsertIndex] = useState<number>(1);
  const [extendItems, setExtendItems] = useState<string>('mango, orange');

  const parseList = (str: string) => str.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
  const baseItems = parseList(initialList);

  const computeResult = () => {
    const list = [...baseItems];
    switch (activeMethod) {
      case 'append':
        list.push(itemToAdd);
        return {
          code: `fruits.append("${itemToAdd}")`,
          result: JSON.stringify(list),
          returnVal: 'None',
          desc: `Adds single item "${itemToAdd}" to the END of the list. Length increases from ${baseItems.length} to ${list.length}.`
        };
      case 'insert':
        const idx = Math.max(0, Math.min(list.length, insertIndex));
        list.splice(idx, 0, itemToAdd);
        return {
          code: `fruits.insert(${insertIndex}, "${itemToAdd}")`,
          result: JSON.stringify(list),
          returnVal: 'None',
          desc: `Inserts "${itemToAdd}" at index position ${insertIndex}. Existing items shift right. Length: ${baseItems.length} → ${list.length}.`
        };
      case 'extend':
        const itemsToExtend = parseList(extendItems);
        list.push(...itemsToExtend);
        return {
          code: `fruits.extend([${itemsToExtend.map(s => `"${s}"`).join(', ')}])`,
          result: JSON.stringify(list),
          returnVal: 'None',
          desc: `Unpacks each item from the input list and appends them individually to the end. Length: ${baseItems.length} → ${list.length}.`
        };
    }
  };

  const res = computeResult();

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl flex items-center justify-center text-emerald-400">
            <PlusCircle size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Add List Items Studio
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30 uppercase tracking-wide">
                append() • insert() • extend()
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Compare adding items at the end (append), at specific index positions (insert), or unpacking iterables (extend).
            </p>
          </div>
        </div>

        {/* Method Selector */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveMethod('append')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeMethod === 'append' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            .append()
          </button>
          <button
            onClick={() => setActiveMethod('insert')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeMethod === 'insert' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            .insert()
          </button>
          <button
            onClick={() => setActiveMethod('extend')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeMethod === 'extend' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            .extend()
          </button>
        </div>
      </div>

      {/* Input Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-5 rounded-2xl border border-white/10 font-mono text-xs">
        <div className="space-y-2">
          <label className="text-gray-400 font-sans font-bold text-xs uppercase">Initial List (fruits):</label>
          <input
            type="text"
            value={initialList}
            onChange={(e) => setInitialList(e.target.value)}
            className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-2.5 text-white font-bold"
          />
        </div>

        <div className="space-y-2">
          {activeMethod === 'append' && (
            <div>
              <label className="text-gray-400 font-sans font-bold text-xs uppercase">Single Item to Append:</label>
              <input
                type="text"
                value={itemToAdd}
                onChange={(e) => setItemToAdd(e.target.value)}
                className="w-full bg-slate-900 border border-emerald-500/40 rounded-xl p-2.5 text-white font-bold"
              />
            </div>
          )}

          {activeMethod === 'insert' && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-gray-400 font-sans font-bold text-[11px] uppercase">Index Position:</label>
                <input
                  type="number"
                  min="0"
                  max={baseItems.length}
                  value={insertIndex}
                  onChange={(e) => setInsertIndex(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-emerald-500/40 rounded-xl p-2.5 text-white font-bold"
                />
              </div>
              <div>
                <label className="text-gray-400 font-sans font-bold text-[11px] uppercase">Item to Insert:</label>
                <input
                  type="text"
                  value={itemToAdd}
                  onChange={(e) => setItemToAdd(e.target.value)}
                  className="w-full bg-slate-900 border border-emerald-500/40 rounded-xl p-2.5 text-white font-bold"
                />
              </div>
            </div>
          )}

          {activeMethod === 'extend' && (
            <div>
              <label className="text-gray-400 font-sans font-bold text-xs uppercase">Comma-Separated Items to Extend:</label>
              <input
                type="text"
                value={extendItems}
                onChange={(e) => setExtendItems(e.target.value)}
                className="w-full bg-slate-900 border border-purple-500/40 rounded-xl p-2.5 text-white font-bold"
              />
            </div>
          )}
        </div>
      </div>

      {/* Execution Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
          <div className="text-emerald-400 font-bold text-[11px] uppercase flex justify-between">
            <span>Executed Statement</span>
            <span className="text-purple-300">Return: None</span>
          </div>
          <div className="text-base font-bold text-cyan-300 bg-slate-900 p-3.5 rounded-xl border border-white/10">
            {res.code} → {res.result}
          </div>
          <p className="text-gray-400 font-sans text-xs pt-1">
            {res.desc}
          </p>
        </div>

        {/* append vs extend comparison callout */}
        <div className="bg-slate-950 border border-purple-500/30 rounded-2xl p-5 space-y-2 font-sans text-xs">
          <div className="text-purple-400 font-bold uppercase text-[11px] font-mono">
            append() vs extend() Golden Comparison Rule
          </div>
          <p className="text-gray-300 leading-relaxed">
            <code className="text-cyan-300 font-mono">a.append([3, 4])</code> adds the list <code className="text-cyan-300 font-mono">[3, 4]</code> as <strong>ONE single nested item</strong> → <code className="text-emerald-300 font-mono">[1, 2, [3, 4]]</code>.
          </p>
          <p className="text-gray-300 leading-relaxed border-t border-white/10 pt-2">
            <code className="text-purple-300 font-mono">a.extend([3, 4])</code> unpacks items and adds <strong>3 and 4 individually</strong> → <code className="text-emerald-300 font-mono">[1, 2, 3, 4]</code>.
          </p>
        </div>
      </div>
    </div>
  );
};
