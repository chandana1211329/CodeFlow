import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Play, RotateCcw, Plus, Trash2, ArrowRight, Layers, ShieldAlert, Cpu, Eye } from 'lucide-react';

export const GraphStudioWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rep' | 'bfs' | 'dfs' | 'components_cycle' | 'complexity'>('rep');

  // Sample Graph Vertices: A, B, C, D, E, F
  // Edges: A-B, A-C, B-D, C-E, D-E (Component 1); F (Component 2 - isolated)
  const vertices = ['A', 'B', 'C', 'D', 'E', 'F'];
  const adjList: Record<string, string[]> = {
    A: ['B', 'C'],
    B: ['A', 'D'],
    C: ['A', 'E'],
    D: ['B', 'E'],
    E: ['C', 'D'],
    F: [],
  };

  const [selectedVertex, setSelectedVertex] = useState<string>('A');
  const [visitedSet, setVisitedSet] = useState<string[]>([]);
  const [activeQueueStack, setActiveQueueStack] = useState<string[]>([]);
  const [traversalOutput, setTraversalOutput] = useState<string[]>([]);
  const [logAction, setLogAction] = useState<string>('Graph initialized with 6 Vertices (A-F). Select a tab to explore Representation, BFS, DFS, or Cycle Detection!');

  const resetState = () => {
    setSelectedVertex('A');
    setVisitedSet([]);
    setActiveQueueStack([]);
    setTraversalOutput([]);
    setLogAction('Graph traversal reset.');
  };

  // Run BFS Traversal Simulation from Selected Vertex
  const runBFS = (start: string) => {
    let visited: string[] = [start];
    let queue: string[] = [start];
    let output: string[] = [];

    while (queue.length > 0) {
      const curr = queue.shift()!;
      output.push(curr);

      for (const neighbor of adjList[curr] || []) {
        if (!visited.includes(neighbor)) {
          visited.push(neighbor);
          queue.push(neighbor);
        }
      }
    }

    setVisitedSet(visited);
    setActiveQueueStack(queue);
    setTraversalOutput(output);
    setLogAction(`BFS Traversal from [${start}] complete! Visited sequence: ${output.join(' ──► ')} using FIFO Queue.`);
  };

  // Run DFS Traversal Simulation from Selected Vertex
  const runDFS = (start: string) => {
    let visited: string[] = [];
    let output: string[] = [];

    const dfs = (v: string) => {
      visited.push(v);
      output.push(v);
      for (const neighbor of adjList[v] || []) {
        if (!visited.includes(neighbor)) {
          dfs(neighbor);
        }
      }
    };

    dfs(start);
    setVisitedSet(visited);
    setTraversalOutput(output);
    setLogAction(`DFS Traversal from [${start}] complete! Visited sequence: ${output.join(' ──► ')} using Call Stack / LIFO.`);
  };

  return (
    <div className="my-8 bg-[#020617] border border-indigo-500/30 rounded-3xl p-6 shadow-2xl shadow-indigo-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500/20 border border-indigo-400/40 rounded-2xl flex items-center justify-center text-indigo-400">
            <Share2 size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Graph Studio
              <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-400/30 uppercase tracking-wide">
                Section 13 • Vertices & Edges Visualizer
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Explore Adjacency Lists, Adjacency Matrices, BFS (Queue), DFS (Stack), Connected Components & Cycle Detection.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('rep')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'rep' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Matrix & List
          </button>
          <button
            onClick={() => setActiveTab('bfs')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'bfs' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            BFS (Queue)
          </button>
          <button
            onClick={() => setActiveTab('dfs')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'dfs' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            DFS (Stack)
          </button>
          <button
            onClick={() => setActiveTab('components_cycle')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'components_cycle' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Components & Cycle
          </button>
          <button
            onClick={() => setActiveTab('complexity')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'complexity' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Graph Complexity
          </button>
        </div>
      </div>

      {/* Main Studio Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        {/* Controls Panel */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 space-y-4 font-sans">
          <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Graph Controls</h4>

          <div>
            <label className="text-[11px] text-gray-400 font-bold block mb-1">Select Start Vertex:</label>
            <div className="flex gap-1.5">
              {vertices.map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVertex(v)}
                  className={`w-8 h-8 rounded-xl font-mono text-xs font-bold border transition-all ${
                    selectedVertex === v ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' : 'bg-slate-900 border-white/10 text-gray-400'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => runBFS(selectedVertex)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Play size={14} /> RUN BFS FROM [{selectedVertex}]
            </button>

            <button
              onClick={() => runDFS(selectedVertex)}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
            >
              <Play size={14} /> RUN DFS FROM [{selectedVertex}]
            </button>
          </div>

          <button
            onClick={resetState}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
          >
            <RotateCcw size={14} /> RESET TRAVERSAL
          </button>
        </div>

        {/* Visual Graph View Canvas */}
        <div className="md:col-span-2 bg-slate-950 p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4">
          <div className="text-xs text-gray-400 font-sans flex justify-between items-center">
            <span>Visual Graph Layout:</span>
            <span className="font-mono text-indigo-400 font-bold">V = 6, E = 5 (2 Components)</span>
          </div>

          {/* Interactive Graph Node Display */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-white/10 flex items-center justify-around min-h-[160px] shadow-inner font-mono">
            {/* Component 1 (A-B-C-D-E) */}
            <div className="flex flex-col items-center gap-4">
              <div className="text-[10px] text-gray-400 font-bold">Component 1 (Cyclic: A-B-D-E-C-A)</div>
              <div className="flex gap-4">
                {['A', 'B', 'C', 'D', 'E'].map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVertex(v)}
                    className={`w-10 h-10 rounded-2xl border-2 font-bold text-xs flex items-center justify-center transition-all shadow-md ${
                      visitedSet.includes(v) ? 'border-amber-400 bg-amber-950 text-amber-200 ring-2 ring-amber-400/50 scale-110' :
                      selectedVertex === v ? 'border-indigo-400 bg-indigo-950 text-indigo-200 ring-2 ring-indigo-400/50' : 'border-slate-700 bg-slate-950 text-gray-300'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Component 2 (F - Disconnected) */}
            <div className="flex flex-col items-center gap-4 border-l border-white/10 pl-6">
              <div className="text-[10px] text-gray-400 font-bold">Component 2</div>
              <button
                onClick={() => setSelectedVertex('F')}
                className={`w-10 h-10 rounded-2xl border-2 font-bold text-xs flex items-center justify-center transition-all shadow-md ${
                  visitedSet.includes('F') ? 'border-amber-400 bg-amber-950 text-amber-200 ring-2 ring-amber-400/50' :
                  selectedVertex === 'F' ? 'border-indigo-400 bg-indigo-950 text-indigo-200 ring-2 ring-indigo-400/50' : 'border-slate-700 bg-slate-950 text-gray-300'
                }`}
              >
                F
              </button>
            </div>
          </div>

          {/* Traversal Output Display */}
          {traversalOutput.length > 0 && (
            <div className="p-2.5 bg-indigo-950/80 border border-indigo-500/40 rounded-xl text-indigo-200 text-xs font-mono text-center font-bold">
              Visited Sequence: [ {traversalOutput.join(' ──► ')} ]
            </div>
          )}

          <div className="text-xs font-sans text-indigo-200 text-center bg-slate-900 px-4 py-2 rounded-xl border border-white/10">
            💡 {logAction}
          </div>
        </div>
      </div>

      {/* Tab Specific Descriptions */}
      {activeTab === 'rep' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-indigo-500/30 font-sans text-xs space-y-3">
          <div className="text-indigo-400 font-bold uppercase text-[11px]">
            Graph Representations: Adjacency List vs Adjacency Matrix
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[11px]">
            <div className="bg-slate-900 p-3 rounded-xl border border-white/10">
              <div className="text-emerald-400 font-bold mb-1">Adjacency List (Python dict of lists):</div>
              <pre className="text-gray-300 text-[10px]">
{`graph = {
  "A": ["B", "C"],
  "B": ["A", "D"],
  "C": ["A", "E"],
  "D": ["B", "E"],
  "E": ["C", "D"],
  "F": []
}`}
              </pre>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-white/10">
              <div className="text-blue-400 font-bold mb-1">Adjacency Matrix (V x V 2D table):</div>
              <p className="text-gray-300 leading-relaxed font-sans text-[11px]">
                <code className="text-blue-300">matrix[i][j] = 1</code> if edge exists, else <code className="text-gray-400">0</code>. Offers instant <code className="text-emerald-300">O(1)</code> edge checks but requires <code className="text-red-400">O(V²)</code> space.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'bfs' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 font-sans text-xs space-y-2">
          <div className="text-emerald-400 font-bold uppercase text-[11px]">
            Breadth-First Search (BFS) Level-by-Level with FIFO Queue
          </div>
          <p className="text-gray-300 leading-relaxed">
            BFS explores vertices layer by layer. Uses a <strong>FIFO Queue</strong> and a <strong>Visited Set</strong> to prevent cycles. Finds the <strong>shortest path</strong> in unweighted graphs in <strong>O(V + E)</strong> time!
          </p>
        </div>
      )}

      {activeTab === 'dfs' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/30 font-sans text-xs space-y-2">
          <div className="text-purple-400 font-bold uppercase text-[11px]">
            Depth-First Search (DFS) Go Deep & Backtrack with Call Stack
          </div>
          <p className="text-gray-300 leading-relaxed">
            DFS dives as deep as possible along each path before backtracking. Uses a <strong>LIFO Stack or Recursion Call Stack</strong> and a <strong>Visited Set</strong> in <strong>O(V + E)</strong> time.
          </p>
        </div>
      )}

      {activeTab === 'components_cycle' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/30 font-sans text-xs space-y-2">
          <div className="text-amber-400 font-bold uppercase text-[11px]">
            Connected Components & Cycle Detection Rules
          </div>
          <p className="text-gray-300 leading-relaxed">
            - <strong>Connected Components:</strong> Outer loop over all vertices running BFS/DFS per unvisited vertex (e.g. Component 1: {"{A,B,C,D,E}"}, Component 2: {"{F}"}).<br />
            - <strong>Cycle Detection (Undirected DFS):</strong> If an already visited neighbor is encountered that is <strong>NOT the parent vertex</strong>, a cycle exists!
          </p>
        </div>
      )}

      {activeTab === 'complexity' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-blue-500/30 font-sans text-xs space-y-3">
          <div className="text-blue-400 font-bold uppercase text-[11px]">
            Master Graph Complexity Comparison Table
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-indigo-300 font-bold">
                  <th className="py-2 px-3">Metric / Algorithm</th>
                  <th className="py-2 px-3 text-emerald-400">Adjacency List</th>
                  <th className="py-2 px-3 text-blue-400">Adjacency Matrix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                <tr><td className="py-2 px-3 font-bold">Memory Space</td><td className="py-2 px-3 text-emerald-300 font-bold">O(V + E) (Optimal for sparse)</td><td className="py-2 px-3 text-red-400 font-bold">O(V²) (Dense)</td></tr>
                <tr><td className="py-2 px-3 font-bold">Edge Check (u, v)</td><td className="py-2 px-3">O(deg(u)) neighbor scan</td><td className="py-2 px-3 text-blue-300 font-bold">O(1) Instant Lookup</td></tr>
                <tr><td className="py-2 px-3 font-bold">BFS / DFS Traversal Time</td><td className="py-2 px-3 text-emerald-300 font-bold">O(V + E)</td><td className="py-2 px-3 text-red-400">O(V²)</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
