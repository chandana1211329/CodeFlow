import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, Search, Trash2, Plus, ArrowRight, Zap, AlertTriangle, ShieldCheck, RefreshCw, Key } from 'lucide-react';

interface Entry {
  key: string | number;
  value: string;
}

export const HashTableStudioWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visualizer' | 'pipeline' | 'collisions' | 'python_dict' | 'complexity'>('visualizer');

  const TABLE_SIZE = 7;
  // State for Separate Chaining table (Array of Buckets/Arrays)
  const [buckets, setBuckets] = useState<Entry[][]>([
    [],
    [{ key: 8, value: 'Charity' }],
    [],
    [{ key: 10, value: 'Alice' }, { key: 17, value: 'Bob' }],
    [],
    [],
    [{ key: 20, value: 'Dave' }]
  ]);

  // Input states
  const [inputKey, setInputKey] = useState<string>('24');
  const [inputValue, setInputValue] = useState<string>('Charlie');

  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [lastAction, setLastAction] = useState<string>('Initialized Hash Table (Size = 7)');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  // Linear probing demo state
  const [probingTable, setProbingTable] = useState<(Entry | null)[]>([
    null,
    { key: 8, value: 'Charity' },
    null,
    { key: 10, value: 'Alice' },
    { key: 17, value: 'Bob' }, // Linear probed from 3 to 4!
    null,
    null
  ]);

  const calcHash = (k: string | number): number => {
    let num = typeof k === 'number' ? k : 0;
    if (typeof k === 'string') {
      const parsed = parseInt(k, 10);
      if (!isNaN(parsed)) {
        num = parsed;
      } else {
        // String hash code sum
        for (let i = 0; i < k.length; i++) {
          num += k.charCodeAt(i);
        }
      }
    }
    return Math.abs(num) % TABLE_SIZE;
  };

  const handleInsert = () => {
    if (!inputKey.trim()) return;
    const idx = calcHash(inputKey);
    setHighlightedIndex(idx);

    const newBuckets = buckets.map((b) => [...b]);
    const bucket = newBuckets[idx];
    const existingIndex = bucket.findIndex((e) => String(e.key) === inputKey.trim());

    if (existingIndex !== -1) {
      bucket[existingIndex].value = inputValue;
      setLastAction(`Updated Key "${inputKey}" with new value "${inputValue}" at Index ${idx}!`);
    } else {
      bucket.push({ key: isNaN(Number(inputKey)) ? inputKey : Number(inputKey), value: inputValue });
      if (bucket.length > 1) {
        setLastAction(`⚡ COLLISION DETECTED at Index ${idx}! Key "${inputKey}" added via Separate Chaining!`);
      } else {
        setLastAction(`Inserted Key "${inputKey}" -> Value "${inputValue}" at Index ${idx} (O(1))`);
      }
    }
    setBuckets(newBuckets);
    setSearchResult(null);
  };

  const handleSearch = () => {
    if (!inputKey.trim()) return;
    const idx = calcHash(inputKey);
    setHighlightedIndex(idx);

    const bucket = buckets[idx];
    const found = bucket.find((e) => String(e.key) === inputKey.trim());

    if (found) {
      setSearchResult(`FOUND! Key "${found.key}" -> Value "${found.value}" at Bucket ${idx}`);
      setLastAction(`Targeted Bucket ${idx} via hash("${inputKey}") % 7. Key matched in O(1) avg time!`);
    } else {
      setSearchResult(`NOT FOUND! Key "${inputKey}" is not in Bucket ${idx}`);
      setLastAction(`Targeted Bucket ${idx} via hash("${inputKey}") % 7. Bucket has no matching key.`);
    }
  };

  const handleDelete = () => {
    if (!inputKey.trim()) return;
    const idx = calcHash(inputKey);
    setHighlightedIndex(idx);

    const newBuckets = buckets.map((b) => [...b]);
    const bucket = newBuckets[idx];
    const foundIdx = bucket.findIndex((e) => String(e.key) === inputKey.trim());

    if (foundIdx !== -1) {
      const removed = bucket.splice(foundIdx, 1)[0];
      setBuckets(newBuckets);
      setSearchResult(null);
      setLastAction(`Deleted Key "${removed.key}" from Bucket ${idx}! Remaining chain length: ${bucket.length}`);
    } else {
      setSearchResult(`CANNOT DELETE! Key "${inputKey}" not found at Index ${idx}`);
      setLastAction(`Attempted delete for Key "${inputKey}". Not found in Bucket ${idx}.`);
    }
  };

  const totalEntries = buckets.reduce((sum, b) => sum + b.length, 0);
  const loadFactor = (totalEntries / TABLE_SIZE).toFixed(2);

  return (
    <div className="my-8 bg-[#020617] border border-blue-500/30 rounded-3xl p-6 shadow-2xl shadow-blue-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/20 border border-blue-400/40 rounded-2xl flex items-center justify-center text-blue-400">
            <Hash size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Hash Table Studio
              <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-400/30 uppercase tracking-wide">
                Section 7 • Key → Hash → Index
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Explore key-to-index mapping, separate chaining vs linear probing, $O(1)$ avg search, and load factors.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('visualizer')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'visualizer' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Chaining Table
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'pipeline' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Hash Pipeline
          </button>
          <button
            onClick={() => setActiveTab('collisions')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'collisions' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Collisions & Probing
          </button>
          <button
            onClick={() => setActiveTab('python_dict')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'python_dict' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Python dict
          </button>
          <button
            onClick={() => setActiveTab('complexity')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'complexity' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Complexity & Load Factor
          </button>
        </div>
      </div>

      {/* Main Visual Controls & Table Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        {/* Left Inputs */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 space-y-4 font-sans">
          <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Hash Table Actions</h4>

          <div className="space-y-2">
            <div>
              <label className="text-[11px] font-bold text-gray-400">Key:</label>
              <input
                type="text"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-2 text-white font-mono text-xs mt-1"
                placeholder="e.g. 24 or 'apple'"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-400">Value (for Insert):</label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-2 text-white font-mono text-xs mt-1"
                placeholder="e.g. 'Charlie'"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            <button
              onClick={handleInsert}
              className="bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1"
            >
              <Plus size={14} /> INSERT
            </button>
            <button
              onClick={handleSearch}
              className="bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1"
            >
              <Search size={14} /> SEARCH
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-500 text-white py-2 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1"
            >
              <Trash2 size={14} /> DELETE
            </button>
          </div>

          {/* Table Metrics */}
          <div className="p-3 bg-slate-900 rounded-xl border border-white/10 space-y-1 font-mono text-[11px]">
            <div>Table Size: <strong className="text-blue-400">{TABLE_SIZE} Buckets</strong></div>
            <div>Entries: <strong className="text-emerald-400">{totalEntries}</strong></div>
            <div>Load Factor ($\lambda$): <strong className="text-amber-400">{loadFactor}</strong></div>
            <div>Calculated Index: <strong className="text-purple-400">{inputKey ? calcHash(inputKey) : 'N/A'}</strong></div>
          </div>
        </div>

        {/* Center/Right Table Display */}
        <div className="md:col-span-2 bg-slate-950 p-6 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-gray-300 font-sans uppercase">
                Bucket Array (Size = {TABLE_SIZE}) • Separate Chaining
              </h4>
              <span className="text-[10px] text-gray-500 font-mono">hash(key) = key % 7</span>
            </div>

            <div className="space-y-2">
              {buckets.map((chain, bIdx) => {
                const isHighlighted = highlightedIndex === bIdx;

                return (
                  <div
                    key={bIdx}
                    className={`p-2.5 rounded-xl border flex items-center gap-3 transition-all ${
                      isHighlighted
                        ? 'border-blue-400 bg-blue-950/60 ring-2 ring-blue-500/40'
                        : 'border-white/10 bg-slate-900/60'
                    }`}
                  >
                    <div className="w-10 text-center font-bold text-gray-400 border-r border-white/10 pr-2">
                      [{bIdx}]
                    </div>

                    <div className="flex-1 flex flex-wrap items-center gap-2">
                      {chain.length === 0 ? (
                        <span className="text-gray-600 text-[11px] italic font-sans">EMPTY</span>
                      ) : (
                        chain.map((entry, eIdx) => (
                          <React.Fragment key={eIdx}>
                            {eIdx > 0 && <ArrowRight size={14} className="text-blue-400 font-bold" />}
                            <div className="px-3 py-1 rounded-lg bg-blue-900/80 border border-blue-400/40 text-blue-200 flex items-center gap-1 font-mono text-xs">
                              <span className="font-bold text-amber-300">{String(entry.key)}</span>
                              <span className="text-gray-400">:</span>
                              <span className="text-emerald-300">"{entry.value}"</span>
                            </div>
                          </React.Fragment>
                        ))
                      )}
                    </div>

                    {chain.length > 1 && (
                      <span className="text-[9px] bg-purple-500/30 text-purple-300 border border-purple-400/30 px-2 py-0.5 rounded-full font-sans font-bold">
                        Chain: {chain.length}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Log & Search Banner */}
          <div className="space-y-2">
            {searchResult && (
              <div className="p-3 bg-purple-950/80 border border-purple-400/40 rounded-xl text-purple-200 text-xs font-sans font-bold flex items-center gap-2">
                <Search size={16} /> {searchResult}
              </div>
            )}
            <div className="text-xs font-sans text-gray-300 text-center bg-slate-900 px-4 py-2 rounded-xl border border-white/10">
              💡 {lastAction}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Specific Content */}
      {activeTab === 'pipeline' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/30 font-mono text-xs space-y-3">
          <div className="text-purple-400 font-bold uppercase text-[11px] font-sans">
            The Permanent Hash Table Pipeline
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 p-4 bg-slate-900 rounded-xl border border-white/10 font-bold text-center">
            <div className="p-2 bg-blue-950 rounded-lg text-blue-300 border border-blue-400/30 flex-1 min-w-[100px]">
              1. KEY ("24")
            </div>
            <ArrowRight size={16} className="text-gray-500" />
            <div className="p-2 bg-purple-950 rounded-lg text-purple-300 border border-purple-400/30 flex-1 min-w-[100px]">
              2. HASH FUNCTION (key % 7)
            </div>
            <ArrowRight size={16} className="text-gray-500" />
            <div className="p-2 bg-emerald-950 rounded-lg text-emerald-300 border border-emerald-400/30 flex-1 min-w-[100px]">
              3. INDEX (3)
            </div>
            <ArrowRight size={16} className="text-gray-500" />
            <div className="p-2 bg-amber-950 rounded-lg text-amber-300 border border-amber-400/30 flex-1 min-w-[100px]">
              4. DIRECT BUCKET ACCESS (O(1))
            </div>
          </div>
        </div>
      )}

      {activeTab === 'collisions' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 font-sans text-xs space-y-3">
          <div className="text-emerald-400 font-bold uppercase text-[11px]">
            Collision Resolution Strategies
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900 rounded-xl border border-white/10 space-y-2">
              <h5 className="font-bold text-blue-400 text-xs">1. Separate Chaining</h5>
              <p className="text-gray-300 text-[11px] leading-relaxed">
                Each bucket holds a list/chain of colliding key-value pairs. Bucket 3: <code className="text-blue-300">[10:Alice] → [17:Bob]</code>.
              </p>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-white/10 space-y-2">
              <h5 className="font-bold text-emerald-400 text-xs">2. Open Addressing (Linear Probing)</h5>
              <p className="text-gray-300 text-[11px] leading-relaxed">
                If target index 3 is occupied, try next slot index 4: <code className="text-emerald-300">index = (hash + 1) % size</code>.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'python_dict' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/30 font-sans text-xs space-y-2">
          <div className="text-amber-400 font-bold uppercase text-[11px]">
            Python Dictionaries & Hashable Keys
          </div>
          <p className="text-gray-300 leading-relaxed">
            Python <code className="text-amber-300 font-mono">dict</code> uses hash tables under the hood. Keys must be <strong>hashable</strong> (immutable types like <code className="text-cyan-300 font-mono">str</code>, <code className="text-cyan-300 font-mono">int</code>, <code className="text-cyan-300 font-mono">tuple</code>). Using mutable lists <code className="text-red-400 font-mono">d[[1,2]] = "val"</code> raises a <code className="text-red-400 font-mono">TypeError: unhashable type: 'list'</code>.
          </p>
        </div>
      )}
    </div>
  );
};
