import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ArrowUp, ArrowDown, Eye, RefreshCw, Undo, History, Zap, AlertTriangle } from 'lucide-react';

export const StackStudioWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vertical' | 'lifo' | 'array_impl' | 'linked_impl' | 'applications'>('vertical');

  // Stack elements state
  const [stack, setStack] = useState<number[]>([10, 20, 30]);
  const [pushInput, setPushInput] = useState<number>(40);
  const [lastAction, setLastAction] = useState<string>('Initialized stack with [10, 20, 30]');
  const [poppedValue, setPoppedValue] = useState<number | null>(null);

  // Undo application state
  const [actionsHistory, setActionsHistory] = useState<string[]>(['Typed "Hello"', 'Bolded Text', 'Inserted Image']);
  const [undoneActions, setUndoneActions] = useState<string[]>([]);

  const handlePush = () => {
    if (stack.length >= 6) {
      setLastAction('⚠️ Stack Overflow visual limit reached (max 6 items)!');
      return;
    }
    setStack([...stack, pushInput]);
    setLastAction(`Pushed ${pushInput} to TOP of stack! (Amortized O(1))`);
    setPushInput(pushInput + 10);
    setPoppedValue(null);
  };

  const handlePop = () => {
    if (stack.length === 0) {
      setLastAction('❌ Stack Underflow! Cannot pop from an empty stack.');
      return;
    }
    const val = stack[stack.length - 1];
    setStack(stack.slice(0, -1));
    setPoppedValue(val);
    setLastAction(`Popped TOP element ${val}! (O(1))`);
  };

  const handlePeek = () => {
    if (stack.length === 0) {
      setLastAction('❌ Stack is empty! No top element to peek.');
      return;
    }
    const val = stack[stack.length - 1];
    setLastAction(`Peeked TOP element: ${val} (Size unchanged: ${stack.length})`);
  };

  const handleUndo = () => {
    if (actionsHistory.length === 0) return;
    const lastAct = actionsHistory[actionsHistory.length - 1];
    setActionsHistory(actionsHistory.slice(0, -1));
    setUndoneActions([lastAct, ...undoneActions]);
  };

  return (
    <div className="my-8 bg-[#020617] border border-blue-500/30 rounded-3xl p-6 shadow-2xl shadow-blue-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/20 border border-blue-400/40 rounded-2xl flex items-center justify-center text-blue-400">
            <Layers size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Vertical Stack Studio
              <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-400/30 uppercase tracking-wide">
                Section 5 • LIFO Principle
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Visualize vertical LIFO push/pop operations, TOP pointer mechanics, array & linked-list implementations.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('vertical')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'vertical' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Vertical Stack
          </button>
          <button
            onClick={() => setActiveTab('lifo')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'lifo' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            LIFO Trace
          </button>
          <button
            onClick={() => setActiveTab('array_impl')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'array_impl' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Array Impl
          </button>
          <button
            onClick={() => setActiveTab('linked_impl')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'linked_impl' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Linked Impl
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'applications' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Applications (Undo)
          </button>
        </div>
      </div>

      {/* Interactive Controls & Status Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        {/* Left Controls */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 space-y-4 font-sans">
          <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Stack Controls</h4>
          <div className="flex gap-2">
            <input
              type="number"
              value={pushInput}
              onChange={(e) => setPushInput(parseInt(e.target.value) || 0)}
              className="bg-slate-900 border border-white/10 rounded-xl p-2 text-white text-xs w-24 font-mono"
            />
            <button
              onClick={handlePush}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1"
            >
              <ArrowDown size={14} /> PUSH (O(1))
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handlePop}
              className="bg-red-600 hover:bg-red-500 text-white py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1"
            >
              <ArrowUp size={14} /> POP (O(1))
            </button>
            <button
              onClick={handlePeek}
              className="bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1"
            >
              <Eye size={14} /> PEEK (O(1))
            </button>
          </div>

          {/* Status Indicators */}
          <div className="p-3 bg-slate-900 rounded-xl border border-white/10 space-y-1 text-xs font-mono">
            <div>Size: <strong className="text-emerald-400">{stack.length}</strong></div>
            <div>isEmpty: <strong className="text-purple-400">{stack.length === 0 ? 'True' : 'False'}</strong></div>
            <div>TOP Value: <strong className="text-blue-400">{stack.length > 0 ? stack[stack.length - 1] : 'None'}</strong></div>
          </div>
        </div>

        {/* Center: Vertical Stack Canvas */}
        <div className="md:col-span-2 bg-slate-950 p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-end min-h-[300px]">
          <div className="text-xs font-mono text-gray-400 mb-2 flex items-center gap-2">
            <span className="text-blue-400 font-bold">TOP Pointer ──►</span>
            <span>{stack.length > 0 ? `Index [${stack.length - 1}]` : 'Empty Stack'}</span>
          </div>

          {/* Vertical Container */}
          <div className="w-56 border-x-4 border-b-4 border-blue-500/50 rounded-b-2xl p-2 bg-slate-900/60 flex flex-col-reverse gap-2 min-h-[200px] justify-start shadow-inner">
            <AnimatePresence>
              {stack.map((val, idx) => {
                const isTop = idx === stack.length - 1;
                return (
                  <motion.div
                    key={`${val}-${idx}`}
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    className={`p-3.5 rounded-xl text-center font-mono font-bold text-sm border shadow-md flex items-center justify-between ${
                      isTop
                        ? 'bg-blue-950 border-blue-400 text-blue-200 ring-2 ring-blue-500/50'
                        : 'bg-slate-950 border-white/10 text-gray-300'
                    }`}
                  >
                    <span className="text-[10px] text-gray-500">[{idx}]</span>
                    <span>{val}</span>
                    {isTop ? (
                      <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full font-sans">
                        TOP
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-600 font-sans">SLOT</span>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {stack.length === 0 && (
              <div className="h-full flex items-center justify-center text-gray-500 font-sans text-xs italic py-12">
                Stack is Empty (Underflow)
              </div>
            )}
          </div>

          {/* Action Feedback */}
          <div className="mt-4 text-xs font-sans text-gray-300 text-center bg-slate-900 px-4 py-2 rounded-xl border border-white/10 w-full">
            💡 {lastAction}
          </div>
        </div>
      </div>

      {/* Tab Specific Content Details */}
      {activeTab === 'array_impl' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 font-mono text-xs space-y-2">
          <div className="text-emerald-400 font-bold uppercase text-[11px] font-sans">
            Why Python List END is Stack TOP (Amortized O(1))
          </div>
          <p className="text-gray-300 font-sans leading-relaxed">
            Using <code className="text-emerald-300">append()</code> and <code className="text-emerald-300">pop()</code> at the end of a Python list performs push and pop in <strong>O(1) Constant Time</strong> without shifting elements. Using index 0 would require shifting all elements on every push/pop (O(n) inefficient!).
          </p>
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/30 font-sans text-xs space-y-3">
          <div className="text-amber-400 font-bold uppercase text-[11px]">
            Real-World Application: Text Editor Undo Stack
          </div>
          <div className="flex gap-4 items-center">
            <button
              onClick={handleUndo}
              disabled={actionsHistory.length === 0}
              className="bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-1"
            >
              <Undo size={16} /> Press UNDO (POP)
            </button>
            <span className="text-gray-300 font-mono">History Size: {actionsHistory.length}</span>
          </div>
          <div className="text-gray-400 font-mono">
            Active Stack Top: <strong className="text-white">{actionsHistory[actionsHistory.length - 1] || 'None'}</strong>
          </div>
        </div>
      )}
    </div>
  );
};
