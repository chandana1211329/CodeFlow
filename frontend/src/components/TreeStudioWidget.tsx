import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Play, RotateCcw, Search, Plus, Trash2, ArrowRight, Layers, ShieldAlert, Cpu } from 'lucide-react';

interface TreeNodeData {
  id: number;
  val: number;
  leftId?: number;
  rightId?: number;
  depth: number;
  height: number;
}

export const TreeStudioWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bst' | 'terminology' | 'traversal' | 'deletion' | 'complexity'>('bst');

  // Interactive Tree Nodes State (Sample BST: 50 -> L:30, R:70; 30 -> L:20, R:40; 70 -> L:60, R:80)
  const initialNodes: Record<number, TreeNodeData> = {
    50: { id: 50, val: 50, leftId: 30, rightId: 70, depth: 0, height: 2 },
    30: { id: 30, val: 30, leftId: 20, rightId: 40, depth: 1, height: 1 },
    70: { id: 70, val: 70, leftId: 60, rightId: 80, depth: 1, height: 1 },
    20: { id: 20, val: 20, depth: 2, height: 0 },
    40: { id: 40, val: 40, depth: 2, height: 0 },
    60: { id: 60, val: 60, depth: 2, height: 0 },
    80: { id: 80, val: 80, depth: 2, height: 0 },
  };

  const [nodes, setNodes] = useState<Record<number, TreeNodeData>>(initialNodes);
  const [highlightedNodes, setHighlightedNodes] = useState<number[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(50);
  const [targetInput, setTargetInput] = useState<number>(60);
  const [traversalOutput, setTraversalOutput] = useState<number[]>([]);
  const [traversalType, setTraversalType] = useState<'preorder' | 'inorder' | 'postorder' | 'levelorder'>('inorder');
  const [logAction, setLogAction] = useState<string>('BST initialized with Root 50. Use controls to Search, Insert, or Traverse!');

  const resetTree = () => {
    setNodes(initialNodes);
    setHighlightedNodes([]);
    setSelectedNodeId(50);
    setTraversalOutput([]);
    setLogAction('Tree reset to standard 7-node BST.');
  };

  // BST Search Simulation Path
  const handleSearch = () => {
    let curr: number | undefined = 50;
    const path: number[] = [];
    while (curr !== undefined && nodes[curr]) {
      path.push(curr);
      if (curr === targetInput) {
        setHighlightedNodes(path);
        setLogAction(`🎉 Target ${targetInput} FOUND! Search Path: ${path.join(' ──► ')}`);
        return;
      }
      if (targetInput < curr) curr = nodes[curr].leftId;
      else curr = nodes[curr].rightId;
    }
    setHighlightedNodes(path);
    setLogAction(`NOT FOUND! Target ${targetInput} is absent. Search Path: ${path.join(' ──► ')} ──► None`);
  };

  // Run Traversal Simulation
  const handleTraversal = (type: 'preorder' | 'inorder' | 'postorder' | 'levelorder') => {
    setTraversalType(type);
    if (type === 'inorder') {
      setTraversalOutput([20, 30, 40, 50, 60, 70, 80]);
      setLogAction('INORDER Traversal: [LEFT ──► ROOT ──► RIGHT]. Produces ASCENDING SORTED ORDER [20, 30, 40, 50, 60, 70, 80]!');
    } else if (type === 'preorder') {
      setTraversalOutput([50, 30, 20, 40, 70, 60, 80]);
      setLogAction('PREORDER Traversal: [ROOT ──► LEFT ──► RIGHT]. Traversal sequence: [50, 30, 20, 40, 70, 60, 80].');
    } else if (type === 'postorder') {
      setTraversalOutput([20, 40, 30, 60, 80, 70, 50]);
      setLogAction('POSTORDER Traversal: [LEFT ──► RIGHT ──► ROOT]. Traversal sequence: [20, 40, 30, 60, 80, 70, 50].');
    } else {
      setTraversalOutput([50, 30, 70, 20, 40, 60, 80]);
      setLogAction('LEVEL ORDER Traversal (BFS with Queue): Level by Level [50, 30, 70, 20, 40, 60, 80].');
    }
  };

  return (
    <div className="my-8 bg-[#020617] border border-emerald-500/30 rounded-3xl p-6 shadow-2xl shadow-emerald-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl flex items-center justify-center text-emerald-400">
            <Network size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Tree & BST Studio
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30 uppercase tracking-wide">
                Section 11 • Hierarchical Visualizer
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Visualize parent-child branching, search paths, preorder/inorder/postorder traversals, and node deletion.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('bst')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'bst' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            BST Search & Insert
          </button>
          <button
            onClick={() => setActiveTab('terminology')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'terminology' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Node Inspector
          </button>
          <button
            onClick={() => setActiveTab('traversal')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'traversal' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Tree Traversals
          </button>
          <button
            onClick={() => setActiveTab('deletion')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'deletion' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            BST Deletion (3 Cases)
          </button>
          <button
            onClick={() => setActiveTab('complexity')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'complexity' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Height & Complexity
          </button>
        </div>
      </div>

      {/* Main Studio Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        {/* Controls Panel */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 space-y-4 font-sans">
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">BST Controls</h4>

          <div className="flex items-center gap-2">
            <input
              type="number"
              value={targetInput}
              onChange={(e) => setTargetInput(parseInt(e.target.value) || 0)}
              className="bg-slate-900 border border-white/10 rounded-xl p-2 text-white font-mono text-xs w-24"
            />
            <button
              onClick={handleSearch}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1 shadow-lg shadow-emerald-500/20"
            >
              <Search size={14} /> SEARCH BST
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
            <button onClick={() => handleTraversal('inorder')} className="bg-purple-950 border border-purple-500/40 hover:bg-purple-900 text-purple-200 py-1.5 rounded-lg font-bold">INORDER</button>
            <button onClick={() => handleTraversal('preorder')} className="bg-blue-950 border border-blue-500/40 hover:bg-blue-900 text-blue-200 py-1.5 rounded-lg font-bold">PREORDER</button>
            <button onClick={() => handleTraversal('postorder')} className="bg-amber-950 border border-amber-500/40 hover:bg-amber-900 text-amber-200 py-1.5 rounded-lg font-bold">POSTORDER</button>
            <button onClick={() => handleTraversal('levelorder')} className="bg-indigo-950 border border-indigo-500/40 hover:bg-indigo-900 text-indigo-200 py-1.5 rounded-lg font-bold">LEVEL ORDER</button>
          </div>

          <button
            onClick={resetTree}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
          >
            <RotateCcw size={14} /> RESET TREE
          </button>
        </div>

        {/* Tree Hierarchical Visualization Canvas */}
        <div className="md:col-span-2 bg-slate-950 p-6 rounded-2xl border border-white/10 flex flex-col justify-between min-h-[280px]">
          <div className="text-xs text-gray-400 font-sans flex justify-between items-center mb-2">
            <span>Visual Tree Diagram (Root 50):</span>
            <span className="font-mono text-emerald-400 font-bold">LEFT &lt; ROOT &lt; RIGHT</span>
          </div>

          {/* Graphical Tree Node Layout */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-white/10 flex flex-col items-center gap-6 min-h-[180px] shadow-inner font-mono">
            {/* Level 0: Root 50 */}
            <div className="flex justify-center">
              <button
                onClick={() => setSelectedNodeId(50)}
                className={`w-12 h-12 rounded-full border-2 font-bold text-xs flex items-center justify-center transition-all shadow-lg ${
                  highlightedNodes.includes(50) ? 'border-amber-400 bg-amber-950 text-amber-200 ring-4 ring-amber-500/40 scale-110' :
                  selectedNodeId === 50 ? 'border-emerald-400 bg-emerald-950 text-emerald-200 ring-2 ring-emerald-500/40' : 'border-emerald-500/50 bg-slate-950 text-emerald-300'
                }`}
              >
                50
              </button>
            </div>

            {/* Level 1: 30 and 70 */}
            <div className="w-full flex justify-around px-8">
              <button
                onClick={() => setSelectedNodeId(30)}
                className={`w-11 h-11 rounded-full border-2 font-bold text-xs flex items-center justify-center transition-all ${
                  highlightedNodes.includes(30) ? 'border-amber-400 bg-amber-950 text-amber-200 ring-4 ring-amber-500/40 scale-110' :
                  selectedNodeId === 30 ? 'border-emerald-400 bg-emerald-950 text-emerald-200' : 'border-emerald-500/40 bg-slate-950 text-emerald-300'
                }`}
              >
                30
              </button>
              <button
                onClick={() => setSelectedNodeId(70)}
                className={`w-11 h-11 rounded-full border-2 font-bold text-xs flex items-center justify-center transition-all ${
                  highlightedNodes.includes(70) ? 'border-amber-400 bg-amber-950 text-amber-200 ring-4 ring-amber-500/40 scale-110' :
                  selectedNodeId === 70 ? 'border-emerald-400 bg-emerald-950 text-emerald-200' : 'border-emerald-500/40 bg-slate-950 text-emerald-300'
                }`}
              >
                70
              </button>
            </div>

            {/* Level 2: Leaves (20, 40, 60, 80) */}
            <div className="w-full flex justify-between px-4">
              {[20, 40, 60, 80].map((val) => (
                <button
                  key={val}
                  onClick={() => setSelectedNodeId(val)}
                  className={`w-10 h-10 rounded-full border font-bold text-[11px] flex items-center justify-center transition-all ${
                    highlightedNodes.includes(val) ? 'border-amber-400 bg-amber-950 text-amber-200 ring-4 ring-amber-500/40 scale-110' :
                    selectedNodeId === val ? 'border-emerald-400 bg-emerald-950 text-emerald-200' : 'border-gray-700 bg-slate-950 text-gray-300'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Traversal Output Display */}
          {traversalOutput.length > 0 && (
            <div className="mt-3 p-2.5 bg-purple-950/80 border border-purple-500/40 rounded-xl text-purple-200 text-xs font-mono text-center font-bold">
              Output Sequence ({traversalType.toUpperCase()}): [ {traversalOutput.join(', ')} ]
            </div>
          )}

          <div className="mt-3 text-xs font-sans text-emerald-200 text-center bg-slate-900 px-4 py-2 rounded-xl border border-white/10">
            💡 {logAction}
          </div>
        </div>
      </div>

      {/* Tab Specific Descriptions */}
      {activeTab === 'bst' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 font-sans text-xs space-y-2">
          <div className="text-emerald-400 font-bold uppercase text-[11px]">
            Binary Search Tree Property: Left &lt; Root &lt; Right
          </div>
          <p className="text-gray-300 leading-relaxed">
            Every node in a BST satisfies the ordering rule: all elements in its <strong>Left Subtree</strong> are strictly smaller, and all elements in its <strong>Right Subtree</strong> are strictly larger.
          </p>
        </div>
      )}

      {activeTab === 'terminology' && selectedNodeId !== null && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-blue-500/30 font-sans text-xs space-y-2">
          <div className="text-blue-400 font-bold uppercase text-[11px]">
            Node Inspector for Selected Node [{selectedNodeId}]
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-mono text-[11px]">
            <div>Depth: <strong className="text-blue-300">{nodes[selectedNodeId]?.depth ?? 0}</strong></div>
            <div>Height: <strong className="text-emerald-300">{nodes[selectedNodeId]?.height ?? 0}</strong></div>
            <div>Left Child: <strong className="text-purple-300">{nodes[selectedNodeId]?.leftId ?? 'None'}</strong></div>
            <div>Right Child: <strong className="text-amber-300">{nodes[selectedNodeId]?.rightId ?? 'None'}</strong></div>
          </div>
        </div>
      )}

      {activeTab === 'traversal' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/30 font-sans text-xs space-y-2">
          <div className="text-purple-400 font-bold uppercase text-[11px]">
            Tree Traversals: DFS (Pre, In, Post) vs BFS (Level Order)
          </div>
          <ul className="space-y-1 text-gray-300 list-disc pl-4 font-mono text-[11px]">
            <li><strong className="text-purple-300 font-sans">INORDER (Left, Root, Right):</strong> Visits BST values in <strong>ASCENDING SORTED ORDER</strong>!</li>
            <li><strong className="text-blue-300 font-sans">PREORDER (Root, Left, Right):</strong> Useful for creating tree copies or prefix expressions.</li>
            <li><strong className="text-amber-300 font-sans">POSTORDER (Left, Right, Root):</strong> Useful for deleting trees from leaves upward.</li>
            <li><strong className="text-indigo-300 font-sans">LEVEL ORDER (BFS with Queue):</strong> Visits nodes level by level from top to bottom.</li>
          </ul>
        </div>
      )}

      {activeTab === 'deletion' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/30 font-sans text-xs space-y-2">
          <div className="text-amber-400 font-bold uppercase text-[11px]">
            BST Deletion 3 Cases
          </div>
          <p className="text-gray-300 leading-relaxed">
            1. <strong>Case 1 (Leaf Node):</strong> Delete directly.<br />
            2. <strong>Case 2 (One Child):</strong> Connect parent directly to child.<br />
            3. <strong>Case 3 (Two Children):</strong> Replace value with <strong>Inorder Successor</strong> (smallest in right subtree), then delete original successor node.
          </p>
        </div>
      )}

      {activeTab === 'complexity' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-indigo-500/30 font-sans text-xs space-y-3">
          <div className="text-indigo-400 font-bold uppercase text-[11px]">
            BST Complexity & Skewed Tree Height Degradation
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-indigo-300 font-bold">
                  <th className="py-2 px-3">Operation</th>
                  <th className="py-2 px-3 text-emerald-400">Balanced BST ($O(\log n)$ height)</th>
                  <th className="py-2 px-3 text-red-400">Skewed BST ($O(n)$ height)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                <tr><td className="py-2 px-3 font-bold">Search / Insert / Delete</td><td className="py-2 px-3 text-emerald-300 font-bold">O(log n)</td><td className="py-2 px-3 text-red-400 font-bold">O(n)</td></tr>
                <tr><td className="py-2 px-3 font-bold">Tree Traversals (All)</td><td className="py-2 px-3">O(n)</td><td className="py-2 px-3">O(n)</td></tr>
                <tr><td className="py-2 px-3 font-bold">Auxiliary Stack Space (DFS)</td><td className="py-2 px-3 text-emerald-300">O(log n) stack depth</td><td className="py-2 px-3 text-red-400">O(n) stack depth</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
