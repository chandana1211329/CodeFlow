import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ArrowRight, ArrowLeft, Eye, RefreshCw, Printer, Server, Play, ShieldAlert } from 'lucide-react';

export const QueueStudioWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'horizontal' | 'fifo' | 'array_impl' | 'linked_impl' | 'applications'>('horizontal');

  // Queue elements state
  const [queue, setQueue] = useState<number[]>([10, 20, 30]);
  const [enqueueInput, setEnqueueInput] = useState<number>(40);
  const [lastAction, setLastAction] = useState<string>('Initialized queue with FRONT=[10] and REAR=[30]');
  const [dequeuedValue, setDequeuedValue] = useState<number | null>(null);

  // Printer application queue state
  const [printerJobs, setPrinterJobs] = useState<string[]>(['Doc1.pdf', 'Report.docx', 'Image.png']);
  const [processedJob, setProcessedJob] = useState<string | null>(null);

  const handleEnqueue = () => {
    if (queue.length >= 6) {
      setLastAction('⚠️ Queue Overflow visual limit reached (max 6 items)!');
      return;
    }
    setQueue([...queue, enqueueInput]);
    setLastAction(`Enqueued ${enqueueInput} at REAR! (O(1) with deque)`);
    setEnqueueInput(enqueueInput + 10);
    setDequeuedValue(null);
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      setLastAction('❌ Queue Underflow! Cannot dequeue from an empty queue.');
      return;
    }
    const val = queue[0];
    setQueue(queue.slice(1));
    setDequeuedValue(val);
    setLastAction(`Dequeued FRONT element ${val}! (O(1) with deque / O(n) list pop(0))`);
  };

  const handlePeekFront = () => {
    if (queue.length === 0) {
      setLastAction('❌ Queue is empty! No front element to peek.');
      return;
    }
    setLastAction(`Peek FRONT: ${queue[0]} (Next in line to leave)`);
  };

  const handlePeekRear = () => {
    if (queue.length === 0) {
      setLastAction('❌ Queue is empty! No rear element to peek.');
      return;
    }
    setLastAction(`Peek REAR: ${queue[queue.length - 1]} (Most recently added)`);
  };

  const handleProcessPrintJob = () => {
    if (printerJobs.length === 0) return;
    const job = printerJobs[0];
    setPrinterJobs(printerJobs.slice(1));
    setProcessedJob(job);
  };

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl flex items-center justify-center text-cyan-400">
            <Users size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Horizontal Queue Studio
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wide">
                Section 6 • FIFO Principle
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Visualize horizontal FIFO enqueue (REAR) & dequeue (FRONT) operations, array shifting vs deque complexity.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('horizontal')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'horizontal' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Horizontal Queue
          </button>
          <button
            onClick={() => setActiveTab('fifo')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'fifo' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            FIFO Trace
          </button>
          <button
            onClick={() => setActiveTab('array_impl')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'array_impl' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Array vs Deque
          </button>
          <button
            onClick={() => setActiveTab('linked_impl')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'linked_impl' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Linked Queue
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'applications' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Applications (Printer)
          </button>
        </div>
      </div>

      {/* Interactive Controls & Status Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        {/* Left Controls */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 space-y-4 font-sans">
          <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Queue Operations</h4>
          <div className="flex gap-2">
            <input
              type="number"
              value={enqueueInput}
              onChange={(e) => setEnqueueInput(parseInt(e.target.value) || 0)}
              className="bg-slate-900 border border-white/10 rounded-xl p-2 text-white text-xs w-24 font-mono"
            />
            <button
              onClick={handleEnqueue}
              className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1"
            >
              <ArrowLeft size={14} /> ENQUEUE (REAR)
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDequeue}
              className="bg-red-600 hover:bg-red-500 text-white py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1"
            >
              <ArrowRight size={14} /> DEQUEUE (FRONT)
            </button>
            <button
              onClick={handlePeekFront}
              className="bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1"
            >
              <Eye size={14} /> PEEK FRONT
            </button>
          </div>

          {/* Status Indicators */}
          <div className="p-3 bg-slate-900 rounded-xl border border-white/10 space-y-1 text-xs font-mono">
            <div>Size: <strong className="text-emerald-400">{queue.length}</strong></div>
            <div>FRONT Value: <strong className="text-cyan-400">{queue.length > 0 ? queue[0] : 'None'}</strong></div>
            <div>REAR Value: <strong className="text-indigo-400">{queue.length > 0 ? queue[queue.length - 1] : 'None'}</strong></div>
          </div>
        </div>

        {/* Center: Horizontal Queue Canvas */}
        <div className="md:col-span-2 bg-slate-950 p-6 rounded-2xl border border-white/10 flex flex-col justify-between min-h-[300px]">
          {/* Pointers Header */}
          <div className="flex justify-between items-center text-xs font-mono mb-4 px-2">
            <div className="flex items-center gap-1 text-red-400 font-bold">
              <span>DEQUEUE ◄── FRONT</span>
            </div>
            <div className="flex items-center gap-1 text-cyan-400 font-bold">
              <span>REAR ◄── ENQUEUE</span>
            </div>
          </div>

          {/* Horizontal Tube Container */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border-y-4 border-cyan-500/50 flex items-center justify-start gap-3 min-h-[140px] overflow-x-auto shadow-inner">
            <AnimatePresence>
              {queue.map((val, idx) => {
                const isFront = idx === 0;
                const isRear = idx === queue.length - 1;

                let borderStyle = "border-white/10 bg-slate-950 text-gray-300";
                if (isFront) borderStyle = "border-red-400 bg-red-950 text-red-200 ring-2 ring-red-500/50";
                if (isRear && !isFront) borderStyle = "border-cyan-400 bg-cyan-950 text-cyan-200 ring-2 ring-cyan-500/50";

                return (
                  <motion.div
                    key={`${val}-${idx}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className={`min-w-[80px] p-4 rounded-2xl text-center font-mono font-bold text-sm border shadow-lg flex flex-col items-center justify-between gap-1 ${borderStyle}`}
                  >
                    <span className="text-[10px] text-gray-500">[{idx}]</span>
                    <span className="text-base">{val}</span>
                    {isFront && (
                      <span className="text-[9px] bg-red-500 text-white px-2 py-0.5 rounded-full font-sans font-bold">
                        FRONT
                      </span>
                    )}
                    {isRear && (
                      <span className="text-[9px] bg-cyan-500 text-white px-2 py-0.5 rounded-full font-sans font-bold">
                        REAR
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {queue.length === 0 && (
              <div className="w-full text-center text-gray-500 font-sans text-xs italic py-8">
                Queue is Empty (Underflow)
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
            Python List <code className="text-red-400">pop(0)</code> (O(n)) vs <code className="text-emerald-300">deque.popleft()</code> (O(1))
          </div>
          <p className="text-gray-300 font-sans leading-relaxed">
            Calling <code className="text-red-400">list.pop(0)</code> requires shifting all remaining elements to the left, taking <strong>O(n) Linear Time</strong>. Using <code className="text-emerald-300">collections.deque.popleft()</code> removes from the front in <strong>O(1) Constant Time</strong>!
          </p>
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/30 font-sans text-xs space-y-3">
          <div className="text-amber-400 font-bold uppercase text-[11px]">
            Real-World Application: Printer Job Queue (FIFO)
          </div>
          <div className="flex gap-4 items-center">
            <button
              onClick={handleProcessPrintJob}
              disabled={printerJobs.length === 0}
              className="bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-1"
            >
              <Printer size={16} /> Print Next Job (DEQUEUE)
            </button>
            <span className="text-gray-300 font-mono">Waiting Jobs: {printerJobs.length}</span>
          </div>
          <div className="text-gray-400 font-mono">
            Next Job at FRONT: <strong className="text-white">{printerJobs[0] || 'None (Queue Empty)'}</strong>
          </div>
        </div>
      )}
    </div>
  );
};
