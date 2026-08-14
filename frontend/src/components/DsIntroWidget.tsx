import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Layers, ArrowRight, CheckCircle2, AlertCircle, RefreshCw, Eye } from 'lucide-react';

export const DsIntroWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'concept' | 'shapes' | 'resizing' | 'scenario'>('concept');

  // Tab 1 state
  const [useStructure, setUseStructure] = useState<boolean>(true);

  // Tab 2 shape
  const [shape, setShape] = useState<'array' | 'linked' | 'stack' | 'queue' | 'tree' | 'graph'>('array');

  // Tab 3 state
  const [staticItems, setStaticItems] = useState<number[]>([10, 20, 30]);
  const [dynamicItems, setDynamicItems] = useState<number[]>([10, 20, 30]);

  // Tab 4 state
  const [scenarioIdx, setScenarioIdx] = useState<number>(0);
  const [userChoice, setUserChoice] = useState<string | null>(null);

  const scenarios = [
    {
      title: "Undo Feature in a Text Editor",
      question: "Which structural behavior fits restoring the most recent edit action first?",
      options: ["Stack (LIFO — Last In, First Out)", "Queue (FIFO)", "Tree Hierarchy"],
      correct: "Stack (LIFO — Last In, First Out)",
      explanation: "The most recent action performed is the first one undone! That is a Stack-like LIFO organization."
    },
    {
      title: "Customer Support Line / Ticket Queue",
      question: "Which structural behavior handles people in the order they arrived?",
      options: ["Queue (FIFO — First In, First Out)", "Stack (LIFO)", "Graph"],
      correct: "Queue (FIFO — First In, First Out)",
      explanation: "First person to arrive is handled first! That is a Queue-like FIFO organization."
    },
    {
      title: "Company Employee Hierarchy",
      question: "Which structure represents CEO → Managers → Team Members best?",
      options: ["Tree (Hierarchical Nodes)", "Array", "Stack"],
      correct: "Tree (Hierarchical Nodes)",
      explanation: "Parent-child hierarchical relationships are represented cleanly using a Tree structure."
    },
    {
      title: "Navigation Map of Connected Cities",
      question: "Which structure models cities connected by roads?",
      options: ["Graph (Vertices & Edges)", "Queue", "Array"],
      correct: "Graph (Vertices & Edges)",
      explanation: "Network relationships with multiple inter-connections are modeled using a Graph."
    }
  ];

  const currentScenario = scenarios[scenarioIdx];

  return (
    <div className="my-8 bg-[#020617] border border-purple-500/30 rounded-3xl p-6 shadow-2xl shadow-purple-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500/20 border border-purple-400/40 rounded-2xl flex items-center justify-center text-purple-400">
            <Brain size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Data Structures Foundation Studio
              <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-400/30 uppercase tracking-wide">
                Section 1 • Mental Models
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Explore data organization, linear vs non-linear shapes, capacity behavior, and problem matching.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('concept')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'concept' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            DATA + ORG
          </button>
          <button
            onClick={() => setActiveTab('shapes')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'shapes' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Structure Shapes
          </button>
          <button
            onClick={() => setActiveTab('resizing')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'resizing' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Static vs Dynamic
          </button>
          <button
            onClick={() => setActiveTab('scenario')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'scenario' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Problem Matcher
          </button>
        </div>
      </div>

      {/* Tab 1: DATA + ORG = DATA STRUCTURE */}
      {activeTab === 'concept' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-white/10">
            <span className="text-gray-400 font-sans text-xs">Toggle Data Storage Approach:</span>
            <button
              onClick={() => setUseStructure(!useStructure)}
              className={`px-4 py-2 rounded-xl font-bold font-sans text-xs transition-all ${
                useStructure ? 'bg-purple-600 text-white' : 'bg-red-950 text-red-300 border border-red-500'
              }`}
            >
              {useStructure ? '✓ Structured (Collection)' : '❌ Unstructured (Separate Variables)'}
            </button>
          </div>

          {!useStructure ? (
            <div className="bg-slate-950 p-5 rounded-2xl border border-red-500/30 space-y-3">
              <div className="text-red-400 font-bold uppercase text-[11px] font-sans">
                Unstructured Data (Separate Variables)
              </div>
              <pre className="bg-slate-900 p-3.5 rounded-xl border border-red-500/40 text-red-200">
                student1 = "Alex"<br />
                student2 = "Maya"<br />
                student3 = "Rahul"<br />
                # Imagine managing 10,000 separate variable names! 😱
              </pre>
              <p className="text-xs font-sans text-gray-400">
                Without a data structure, searching, modifying, or looping over data requires hardcoding every single variable name!
              </p>
            </div>
          ) : (
            <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/30 space-y-3">
              <div className="text-purple-400 font-bold uppercase text-[11px] font-sans">
                Structured Data (Organized Collection)
              </div>
              <pre className="bg-slate-900 p-3.5 rounded-xl border border-purple-500/40 text-purple-200">
                students = ["Alex", "Maya", "Rahul"]
              </pre>
              <div className="flex items-center gap-2 pt-2">
                <div className="bg-purple-900/60 border border-purple-400/50 p-3 rounded-xl text-white font-bold text-sm">
                  [ Alex ]
                </div>
                <span className="text-purple-400">→</span>
                <div className="bg-purple-900/60 border border-purple-400/50 p-3 rounded-xl text-white font-bold text-sm">
                  [ Maya ]
                </div>
                <span className="text-purple-400">→</span>
                <div className="bg-purple-900/60 border border-purple-400/50 p-3 rounded-xl text-white font-bold text-sm">
                  [ Rahul ]
                </div>
              </div>
              <p className="text-xs font-sans text-emerald-300 pt-2 font-bold">
                DATA + ORGANIZATION = DATA STRUCTURE!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Structure Shapes Preview */}
      {activeTab === 'shapes' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="flex items-center gap-2 overflow-x-auto p-1 bg-slate-900 rounded-2xl border border-white/10">
            {(['array', 'linked', 'stack', 'queue', 'tree', 'graph'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setShape(s)}
                className={`px-3 py-1.5 rounded-xl font-bold font-sans uppercase text-[11px] transition-all whitespace-nowrap ${
                  shape === s ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-cyan-500/30 text-center space-y-4">
            <div className="text-xs font-sans text-cyan-300 font-bold uppercase tracking-wider">
              {shape === 'array' && '1. Array (Linear Contiguous Slots)'}
              {shape === 'linked' && '2. Linked List (Nodes connected by Pointers)'}
              {shape === 'stack' && '3. Stack (LIFO — Last In, First Out)'}
              {shape === 'queue' && '4. Queue (FIFO — First In, First Out)'}
              {shape === 'tree' && '5. Tree (Non-Linear Hierarchical Nodes)'}
              {shape === 'graph' && '6. Graph (Non-Linear Network of Vertices & Edges)'}
            </div>

            {/* Visual shape rendering */}
            <div className="flex justify-center items-center py-4">
              {shape === 'array' && (
                <div className="flex border-2 border-cyan-500 rounded-xl overflow-hidden bg-slate-900">
                  <div className="p-4 border-r border-cyan-500/40 text-cyan-300 font-bold">[0]: A</div>
                  <div className="p-4 border-r border-cyan-500/40 text-cyan-300 font-bold">[1]: B</div>
                  <div className="p-4 border-r border-cyan-500/40 text-cyan-300 font-bold">[2]: C</div>
                  <div className="p-4 text-cyan-300 font-bold">[3]: D</div>
                </div>
              )}
              {shape === 'linked' && (
                <div className="flex items-center gap-2">
                  <div className="bg-slate-900 border border-cyan-400 p-3 rounded-xl text-cyan-200 font-bold">[Node A | •]</div>
                  <span className="text-cyan-400">→</span>
                  <div className="bg-slate-900 border border-cyan-400 p-3 rounded-xl text-cyan-200 font-bold">[Node B | •]</div>
                  <span className="text-cyan-400">→</span>
                  <div className="bg-slate-900 border border-cyan-400 p-3 rounded-xl text-cyan-200 font-bold">[Node C | None]</div>
                </div>
              )}
              {shape === 'stack' && (
                <div className="flex flex-col gap-1 w-44 bg-slate-900 p-3 border-2 border-cyan-500 rounded-xl">
                  <div className="bg-cyan-950 p-2 border border-cyan-400 text-cyan-300 rounded font-bold">TOP: Item D (Push/Pop)</div>
                  <div className="bg-slate-950 p-2 border border-white/10 text-gray-300 rounded">Item C</div>
                  <div className="bg-slate-950 p-2 border border-white/10 text-gray-300 rounded">Item B</div>
                  <div className="bg-slate-950 p-2 border border-white/10 text-gray-300 rounded">BOTTOM: Item A</div>
                </div>
              )}
              {shape === 'queue' && (
                <div className="flex items-center gap-2 bg-slate-900 p-4 border-2 border-cyan-500 rounded-xl">
                  <span className="text-emerald-400 font-sans text-xs font-bold">DEQUEUE ←</span>
                  <div className="bg-cyan-950 border border-cyan-400 p-3 rounded-xl text-cyan-300 font-bold">Front: A</div>
                  <div className="bg-slate-950 border border-white/10 p-3 rounded-xl text-gray-300">B</div>
                  <div className="bg-slate-950 border border-white/10 p-3 rounded-xl text-gray-300">C</div>
                  <div className="bg-cyan-950 border border-cyan-400 p-3 rounded-xl text-cyan-300 font-bold">Rear: D</div>
                  <span className="text-cyan-400 font-sans text-xs font-bold">← ENQUEUE</span>
                </div>
              )}
              {shape === 'tree' && (
                <div className="space-y-3 font-sans font-bold">
                  <div className="inline-block bg-cyan-900 p-3 rounded-full border border-cyan-400 text-cyan-200">Root A</div>
                  <div className="flex justify-center gap-12 pt-2">
                    <div className="bg-slate-900 p-2.5 rounded-xl border border-white/10 text-gray-300">Child B</div>
                    <div className="bg-slate-900 p-2.5 rounded-xl border border-white/10 text-gray-300">Child C</div>
                  </div>
                </div>
              )}
              {shape === 'graph' && (
                <div className="grid grid-cols-2 gap-4 font-sans font-bold text-xs">
                  <div className="bg-cyan-950 p-3 rounded-xl border border-cyan-400 text-cyan-200">Vertex A</div>
                  <div className="bg-cyan-950 p-3 rounded-xl border border-cyan-400 text-cyan-200">Vertex B</div>
                  <div className="bg-cyan-950 p-3 rounded-xl border border-cyan-400 text-cyan-200">Vertex C</div>
                  <div className="bg-cyan-950 p-3 rounded-xl border border-cyan-400 text-cyan-200">Vertex D</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Static vs Dynamic */}
      {activeTab === 'resizing' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 space-y-3">
            <div className="text-emerald-400 font-bold uppercase text-[11px] font-sans">
              Static Sizing Model (Fixed Reserved Capacity = 5)
            </div>
            <div className="flex gap-1.5 overflow-x-auto py-2">
              {[10, 20, 30, 'Empty', 'Empty'].map((val, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-center font-bold flex-1 ${
                    val === 'Empty' ? 'bg-slate-900 border-dashed border-gray-600 text-gray-600' : 'bg-slate-900 border-emerald-500 text-emerald-300'
                  }`}
                >
                  {val}
                </div>
              ))}
            </div>
            <p className="text-xs font-sans text-gray-400">
              Capacity is decided upfront. Adding items beyond capacity requires allocating a new block.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/30 space-y-3">
            <div className="text-purple-400 font-bold uppercase text-[11px] font-sans">
              Dynamic Sizing Model (Grows & Shrinks Flexibly)
            </div>
            <div className="flex gap-1.5 overflow-x-auto py-2">
              {[10, 20, 30, 40].map((val, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-purple-400 bg-purple-950 text-purple-200 font-bold text-center flex-1">
                  {val}
                </div>
              ))}
            </div>
            <p className="text-xs font-sans text-gray-400">
              Adapts dynamically as elements are added or removed (e.g. Python lists).
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: Problem Matcher */}
      {activeTab === 'scenario' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/30 space-y-3">
            <div className="text-amber-400 font-bold uppercase text-[11px] font-sans">
              Scenario {scenarioIdx + 1} of {scenarios.length}: {currentScenario.title}
            </div>
            <p className="text-sm font-sans font-bold text-white">
              {currentScenario.question}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans font-bold text-xs">
            {currentScenario.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setUserChoice(opt)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  userChoice === opt
                    ? 'bg-amber-950 border-amber-500 text-white shadow-lg'
                    : 'bg-slate-900 border-white/10 text-gray-300 hover:bg-white/5'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {userChoice && (
            <div
              className={`p-4 rounded-2xl border ${
                userChoice === currentScenario.correct
                  ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                  : 'bg-red-950/60 border-red-500/50 text-red-200'
              }`}
            >
              <div className="font-bold font-sans text-sm pb-1">
                {userChoice === currentScenario.correct ? '✓ Excellent Selection!' : '❌ Re-consider the operational pattern'}
              </div>
              <div className="font-sans text-xs">{currentScenario.explanation}</div>
              <button
                onClick={() => {
                  setUserChoice(null);
                  setScenarioIdx((scenarioIdx + 1) % scenarios.length);
                }}
                className="mt-3 bg-amber-600 text-white px-4 py-1.5 rounded-xl font-bold font-sans text-xs"
              >
                Next Scenario →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
