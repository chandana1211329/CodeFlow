import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCommit, Play, RotateCcw, Layers, ArrowUp, ArrowDown, ShieldAlert, Cpu, Award } from 'lucide-react';

export const RecursionStudioWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stack' | 'base_case' | 'calling_returning' | 'ds_recursion' | 'complexity'>('stack');

  // Call stack state for countdown(3)
  const [stack, setStack] = useState<{ name: string; param: number; status: 'calling' | 'base' | 'returning' | 'done' }[]>([]);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [logs, setLogs] = useState<string>('Click STEP RECURSION to observe Push & Pop on the Call Stack.');

  const countdownSteps = [
    { name: 'countdown(3)', param: 3, action: 'PUSH frame countdown(n=3). Print 3.', stackSize: 1, phase: 'calling' },
    { name: 'countdown(2)', param: 2, action: 'PUSH frame countdown(n=2). Print 2.', stackSize: 2, phase: 'calling' },
    { name: 'countdown(1)', param: 1, action: 'PUSH frame countdown(n=1). Print 1.', stackSize: 3, phase: 'calling' },
    { name: 'countdown(0)', param: 0, action: '🎯 BASE CASE REACHED! n==0. Print "Done".', stackSize: 4, phase: 'base' },
    { name: 'countdown(0)', param: 0, action: 'POP frame countdown(0). Return to countdown(1).', stackSize: 3, phase: 'returning' },
    { name: 'countdown(1)', param: 1, action: 'POP frame countdown(1). Return to countdown(2).', stackSize: 2, phase: 'returning' },
    { name: 'countdown(2)', param: 2, action: 'POP frame countdown(2). Return to countdown(3).', stackSize: 1, phase: 'returning' },
    { name: 'countdown(3)', param: 3, action: '🎉 POP frame countdown(3). STACK EMPTY! Recursion Complete.', stackSize: 0, phase: 'done' },
  ];

  const handleStep = () => {
    if (stepIndex >= countdownSteps.length) return;
    const current = countdownSteps[stepIndex];

    if (current.phase === 'calling' || current.phase === 'base') {
      setStack((prev) => [
        { name: current.name, param: current.param, status: current.phase as any },
        ...prev
      ]);
    } else if (current.phase === 'returning' || current.phase === 'done') {
      setStack((prev) => prev.slice(1));
    }

    setLogs(current.action);
    setStepIndex((prev) => prev + 1);
  };

  const resetRecursion = () => {
    setStack([]);
    setStepIndex(0);
    setLogs('Reset Call Stack. Click STEP RECURSION to start.');
  };

  return (
    <div className="my-8 bg-[#020617] border border-amber-500/30 rounded-3xl p-6 shadow-2xl shadow-amber-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500/20 border border-amber-400/40 rounded-2xl flex items-center justify-center text-amber-400">
            <GitCommit size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Recursion Studio
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30 uppercase tracking-wide">
                Section 10 • Call Stack & Base Cases
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Visualize recursive function calls, stack frame PUSH/POP operations, and value unwinding.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('stack')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'stack' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Call Stack (PUSH/POP)
          </button>
          <button
            onClick={() => setActiveTab('base_case')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'base_case' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Base & Recursive Case
          </button>
          <button
            onClick={() => setActiveTab('calling_returning')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'calling_returning' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Calling vs Returning
          </button>
          <button
            onClick={() => setActiveTab('ds_recursion')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'ds_recursion' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            DS Recursion Lab
          </button>
          <button
            onClick={() => setActiveTab('complexity')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'complexity' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Stack Depth & Complexity
          </button>
        </div>
      </div>

      {/* Main Studio Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        {/* Controls Panel */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 space-y-4 font-sans">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Execution Controls</h4>

          <button
            onClick={handleStep}
            disabled={stepIndex >= countdownSteps.length}
            className="w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <Play size={14} /> STEP RECURSION ({stepIndex} / {countdownSteps.length})
          </button>
          <button
            onClick={resetRecursion}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
          >
            <RotateCcw size={14} /> RESET STACK
          </button>

          <div className="p-3 bg-slate-900 rounded-xl border border-white/10 space-y-1 font-mono text-[11px]">
            <div>Stack Depth: <strong className="text-amber-400">{stack.length} frames</strong></div>
            <div>Phase: <strong className="text-blue-400">{stepIndex > 0 && stepIndex <= 4 ? 'CALLING (PUSH ↓)' : stepIndex > 4 ? 'RETURNING (POP ↑)' : 'IDLE'}</strong></div>
          </div>
        </div>

        {/* Visual Call Stack Canvas */}
        <div className="md:col-span-2 bg-slate-950 p-6 rounded-2xl border border-white/10 flex flex-col justify-between min-h-[260px]">
          <div className="text-xs text-gray-400 font-sans flex justify-between items-center mb-2">
            <span>Call Stack (LIFO Memory Frame Container):</span>
            <span className="font-mono text-amber-400 font-bold">TOP OF STACK AT TOP</span>
          </div>

          <div className="flex flex-col-reverse items-center justify-start gap-2 p-4 bg-slate-900/90 rounded-2xl border border-white/10 min-h-[160px] overflow-y-auto">
            {stack.length === 0 ? (
              <div className="text-gray-500 text-xs italic font-sans py-8">
                Stack is currently EMPTY. Click "STEP RECURSION" to PUSH function call frames.
              </div>
            ) : (
              stack.map((frame, idx) => {
                const isTop = idx === 0;
                let bgStyle = "bg-slate-800 border-white/10 text-gray-300";
                if (frame.status === 'base') bgStyle = "bg-emerald-950 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400/50";
                if (isTop && frame.status === 'calling') bgStyle = "bg-amber-950 border-amber-400 text-amber-200 ring-2 ring-amber-400/50";
                if (frame.status === 'returning') bgStyle = "bg-purple-950 border-purple-400 text-purple-200";

                return (
                  <motion.div
                    key={`${frame.name}-${idx}`}
                    initial={{ scale: 0.9, opacity: 0, y: -20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className={`w-full max-w-md p-3 rounded-xl border flex items-center justify-between font-mono shadow-md ${bgStyle}`}
                  >
                    <div className="flex items-center gap-2">
                      <Layers size={14} className={isTop ? 'text-amber-400' : 'text-gray-500'} />
                      <span className="font-bold text-xs">{frame.name}</span>
                      <span className="text-[10px] text-gray-400">(n = {frame.param})</span>
                    </div>
                    {isTop && (
                      <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full font-sans font-bold">
                        TOP FRAME
                      </span>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>

          <div className="mt-4 text-xs font-sans text-amber-200 text-center bg-slate-900 px-4 py-2 rounded-xl border border-white/10">
            💡 {logs}
          </div>
        </div>
      </div>

      {/* Tab Specific Descriptions */}
      {activeTab === 'stack' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/30 font-sans text-xs space-y-2">
          <div className="text-amber-400 font-bold uppercase text-[11px]">
            Permanent Mental Model: CALL = PUSH, RETURN = POP
          </div>
          <p className="text-gray-300 leading-relaxed">
            Every recursive call allocates a <strong>stack frame</strong> on top of the call stack (PUSH). When the <strong>base case</strong> is reached, recursion stops, and frames are popped off the stack one by one (POP).
          </p>
        </div>
      )}

      {activeTab === 'base_case' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-blue-500/30 font-sans text-xs space-y-2">
          <div className="text-blue-400 font-bold uppercase text-[11px]">
            The Two Essential Parts of Every Recursive Function
          </div>
          <ul className="space-y-1 text-gray-300 list-disc pl-4 font-mono text-[11px]">
            <li><strong className="text-emerald-400 font-sans">Base Case:</strong> Stops recursion (e.g. <code className="text-emerald-300">if n == 0: return</code>). Prevents infinite recursion stack overflow.</li>
            <li><strong className="text-blue-400 font-sans">Recursive Case:</strong> Reduces the problem (e.g. <code className="text-blue-300">countdown(n - 1)</code>) making progress toward base case.</li>
          </ul>
        </div>
      )}

      {activeTab === 'calling_returning' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/30 font-sans text-xs space-y-2">
          <div className="text-purple-400 font-bold uppercase text-[11px]">
            Calling Phase vs Returning Phase
          </div>
          <p className="text-gray-300 leading-relaxed">
            Code <strong>before</strong> the recursive call executes during the <strong>Calling Phase (Going Down)</strong>. Code <strong>after</strong> the recursive call executes during the <strong>Returning Phase (Unwinding Up)</strong>.
          </p>
        </div>
      )}

      {activeTab === 'ds_recursion' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 font-sans text-xs space-y-2">
          <div className="text-emerald-400 font-bold uppercase text-[11px]">
            Recursion in Data Structures (Arrays, Linked Lists, Trees)
          </div>
          <p className="text-gray-300 leading-relaxed">
            - <strong>Array:</strong> Recurse on <code className="text-emerald-300 font-mono">index + 1</code>.<br />
            - <strong>Linked List:</strong> Recurse on <code className="text-emerald-300 font-mono">node.next</code>.<br />
            - <strong>Tree:</strong> Recurse on <code className="text-emerald-300 font-mono">node.left</code> and <code className="text-emerald-300 font-mono">node.right</code>.
          </p>
        </div>
      )}

      {activeTab === 'complexity' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-indigo-500/30 font-sans text-xs space-y-3">
          <div className="text-indigo-400 font-bold uppercase text-[11px]">
            Recursion Complexity & Stack Depth Analysis
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-indigo-300 font-bold">
                  <th className="py-2 px-3">Algorithm</th>
                  <th className="py-2 px-3">Time Complexity</th>
                  <th className="py-2 px-3">Call Stack Space (Depth)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                <tr><td className="py-2 px-3 font-bold">Linear Countdown / Array Traversal</td><td className="py-2 px-3">O(n)</td><td className="py-2 px-3 text-amber-300">O(n) stack frames</td></tr>
                <tr><td className="py-2 px-3 font-bold">Recursive Binary Search</td><td className="py-2 px-3">O(log n)</td><td className="py-2 px-3 text-emerald-300">O(log n) stack frames</td></tr>
                <tr><td className="py-2 px-3 font-bold">Iterative Loop Counterpart</td><td className="py-2 px-3">O(n)</td><td className="py-2 px-3 text-emerald-300">O(1) constant space</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
