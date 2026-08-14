import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, ArrowRight, Play, Plus, Trash2, Search, RefreshCw, Repeat, ArrowLeftRight } from 'lucide-react';

interface NodeData {
  id: number;
  val: number;
}

export const LinkedListStudioWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'singly' | 'traversal' | 'insert' | 'delete' | 'doubly' | 'circular'>('singly');

  // Node chain state
  const [nodes, setNodes] = useState<NodeData[]>([
    { id: 1, val: 10 },
    { id: 2, val: 20 },
    { id: 3, val: 30 },
    { id: 4, val: 40 }
  ]);

  // Traversal pointer step
  const [traverseStep, setTraverseStep] = useState<number>(0);

  // Insert state
  const [insertVal, setInsertVal] = useState<number>(25);
  const [insertPos, setInsertPos] = useState<'head' | 'end' | 'middle'>('head');

  // Search/Delete target
  const [targetVal, setTargetVal] = useState<number>(20);

  const handleInsert = () => {
    const newNode: NodeData = { id: Date.now(), val: insertVal };
    if (insertPos === 'head') {
      setNodes([newNode, ...nodes]);
    } else if (insertPos === 'end') {
      setNodes([...nodes, newNode]);
    } else {
      const mid = Math.floor(nodes.length / 2);
      const updated = [...nodes];
      updated.splice(mid, 0, newNode);
      setNodes(updated);
    }
  };

  const handleDeleteHead = () => {
    if (nodes.length > 0) {
      setNodes(nodes.slice(1));
    }
  };

  const handleDeleteTarget = () => {
    setNodes(nodes.filter(n => n.val !== targetVal));
  };

  return (
    <div className="my-8 bg-[#020617] border border-purple-500/30 rounded-3xl p-6 shadow-2xl shadow-purple-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500/20 border border-purple-400/40 rounded-2xl flex items-center justify-center text-purple-400">
            <GitCommit size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Linked List Studio
              <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-400/30 uppercase tracking-wide">
                Section 4 • Node & Reference Lab
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Visualize node structures `[DATA | NEXT]`, pointer links, traversal step-by-step, doubly & circular variants.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('singly')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'singly' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Singly Linked
          </button>
          <button
            onClick={() => setActiveTab('traversal')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'traversal' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Traversal
          </button>
          <button
            onClick={() => setActiveTab('insert')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'insert' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Insertion
          </button>
          <button
            onClick={() => setActiveTab('delete')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'delete' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Deletion
          </button>
          <button
            onClick={() => setActiveTab('doubly')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'doubly' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Doubly Linked
          </button>
          <button
            onClick={() => setActiveTab('circular')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'circular' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Circular List
          </button>
        </div>
      </div>

      {/* Linked List Visualization Canvas */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
        <div className="flex justify-between items-center text-gray-400">
          <span className="flex items-center gap-2">
            HEAD Pointer: <strong className="text-purple-400 text-sm font-bold">head ──►</strong>
          </span>
          <span>Total Nodes: <strong className="text-emerald-400 font-bold">{nodes.length}</strong></span>
        </div>

        {/* Nodes Chain Display */}
        <div className="flex items-center gap-2 overflow-x-auto py-8">
          {nodes.map((node, idx) => {
            const isHead = idx === 0;
            const isTail = idx === nodes.length - 1;
            const isCurrent = activeTab === 'traversal' && traverseStep === idx;

            let nodeBorder = "border-purple-500/50 bg-slate-900";
            if (isCurrent) nodeBorder = "border-cyan-400 bg-cyan-950 ring-2 ring-cyan-500/50";

            return (
              <React.Fragment key={node.id}>
                <div className="flex flex-col items-center">
                  {isHead && <span className="text-[10px] bg-purple-600 text-white font-bold px-2 py-0.5 rounded-full mb-1">HEAD</span>}
                  {isTail && <span className="text-[10px] bg-amber-600 text-white font-bold px-2 py-0.5 rounded-full mb-1">TAIL</span>}
                  {isCurrent && <span className="text-[10px] bg-cyan-500 text-white font-bold px-2 py-0.5 rounded-full mb-1">CURRENT</span>}

                  <div className={`flex border-2 rounded-2xl overflow-hidden shadow-lg ${nodeBorder}`}>
                    {/* PREV pointer for Doubly linked */}
                    {activeTab === 'doubly' && (
                      <div className="p-3 bg-indigo-950 border-r border-white/10 text-indigo-300 font-bold">
                        PREV
                      </div>
                    )}
                    {/* DATA Field */}
                    <div className="p-3.5 bg-slate-950 border-r border-white/10 text-white font-bold text-sm">
                      {node.val}
                    </div>
                    {/* NEXT Reference Field */}
                    <div className="p-3.5 bg-purple-950 text-purple-300 font-bold text-xs flex items-center gap-1">
                      NEXT •
                    </div>
                  </div>
                </div>

                {/* Connection Arrow */}
                {idx < nodes.length - 1 ? (
                  <div className="flex items-center text-purple-400 font-bold text-base px-1">
                    {activeTab === 'doubly' ? <ArrowLeftRight size={20} className="text-indigo-400" /> : '──►'}
                  </div>
                ) : (
                  <div className="flex items-center text-gray-500 font-bold text-xs pl-1">
                    {activeTab === 'circular' ? (
                      <span className="text-amber-400 font-bold text-xs flex items-center gap-1">
                        ──► [CYCLE TO HEAD]
                      </span>
                    ) : (
                      '──► None'
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Singly Linked List */}
      {activeTab === 'singly' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/30 space-y-3 font-mono text-xs">
          <div className="text-purple-400 font-bold uppercase text-[11px] font-sans">
            Singly Linked List Structure
          </div>
          <p className="text-gray-300 font-sans leading-relaxed">
            Each node contains <strong>DATA</strong> and a <strong>NEXT</strong> reference pointer. The final node points to <strong>None</strong>.
          </p>
        </div>
      )}

      {/* Tab 2: Traversal */}
      {activeTab === 'traversal' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-cyan-500/30 space-y-3 font-mono text-xs">
          <div className="text-cyan-400 font-bold uppercase text-[11px] font-sans">
            Traversal via `current = current.next` (O(n) Linear Time)
          </div>
          <div className="flex items-center justify-between font-sans">
            <span className="text-xs text-gray-300">
              Visiting Node {traverseStep + 1}: Value = <strong className="text-cyan-300 font-mono">{nodes[traverseStep]?.val}</strong>
            </span>
            <button
              onClick={() => setTraverseStep((traverseStep + 1) % nodes.length)}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-1.5 rounded-xl font-bold text-xs"
            >
              Step `current.next` →
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Insertion */}
      {activeTab === 'insert' && (
        <div className="space-y-4 font-mono text-xs font-sans">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-2xl border border-white/10">
            <div>
              <label className="text-gray-400 font-bold text-xs">New Node Value:</label>
              <input
                type="number"
                value={insertVal}
                onChange={(e) => setInsertVal(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-2 text-white text-xs mt-1"
              />
            </div>
            <div>
              <label className="text-gray-400 font-bold text-xs">Position:</label>
              <select
                value={insertPos}
                onChange={(e) => setInsertPos(e.target.value as any)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-2 text-white text-xs mt-1"
              >
                <option value="head">At Head (O(1) Constant)</option>
                <option value="end">At Tail (O(n) without tail / O(1) with tail)</option>
                <option value="middle">In Middle (O(1) after target node)</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleInsert}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-xl font-bold text-xs"
              >
                Insert Node →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Deletion */}
      {activeTab === 'delete' && (
        <div className="space-y-4 font-mono text-xs font-sans">
          <div className="flex gap-3 bg-slate-950 p-4 rounded-2xl border border-white/10">
            <button
              onClick={handleDeleteHead}
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl font-bold text-xs"
            >
              Delete Head Node (O(1))
            </button>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={targetVal}
                onChange={(e) => setTargetVal(parseInt(e.target.value) || 0)}
                className="bg-slate-900 border border-white/10 rounded-xl p-2 text-white text-xs w-20"
              />
              <button
                onClick={handleDeleteTarget}
                className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-bold text-xs"
              >
                Delete Target Value (Bypass Link O(n))
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Doubly Linked List */}
      {activeTab === 'doubly' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-indigo-500/30 space-y-3 font-mono text-xs font-sans">
          <div className="text-indigo-400 font-bold uppercase text-[11px]">
            Doubly Linked List (`PREV` $\rightleftarrows$ `NEXT`)
          </div>
          <p className="text-gray-300 text-xs">
            Every node maintains <strong>both PREV and NEXT references</strong>, allowing bidirectional forward and backward traversal.
          </p>
        </div>
      )}

      {/* Tab 6: Circular List */}
      {activeTab === 'circular' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/30 space-y-3 font-mono text-xs font-sans">
          <div className="text-amber-400 font-bold uppercase text-[11px]">
            Circular Linked List (`tail.next` = `head`)
          </div>
          <p className="text-gray-300 text-xs">
            The final node points back to <strong>HEAD</strong> instead of None, forming a continuous cycle for round-robin scheduling.
          </p>
        </div>
      )}
    </div>
  );
};
