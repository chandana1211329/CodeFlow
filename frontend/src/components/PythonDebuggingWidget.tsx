import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bug, Search, CheckCircle2, AlertCircle, ArrowRight, Table } from 'lucide-react';

export const PythonDebuggingWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'traceback' | 'trace_table' | 'workflow'>('traceback');

  // Trace Table State
  const [stepIdx, setStepIdx] = useState<number>(0);
  const traceSteps = [
    { step: 1, code: 'price = 100', price: 100, qty: '-', total: '-', note: 'Variable price assigned 100' },
    { step: 2, code: 'qty = 3', price: 100, qty: 3, total: '-', note: 'Variable qty assigned 3' },
    { step: 3, code: 'total = price + qty  # BUG!', price: 100, qty: 3, total: 103, note: 'LOGIC BUG! Used + instead of *. Actual: 103, Expected: 300' },
    { step: 4, code: 'total = price * qty  # FIX', price: 100, qty: 3, total: 300, note: 'FIXED! Used * operator. Actual matching Expected: 300' }
  ];

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500/20 border border-red-400/40 rounded-2xl flex items-center justify-center text-red-400">
            <Bug size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Python Debugging & Traceback Studio
              <span className="bg-red-500/20 text-red-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-400/30 uppercase tracking-wide">
                Traceback Analysis • Variable Tracing • Systematic Fixes
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Inspect tracebacks, trace step-by-step variable values, and isolate root causes cleanly.
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('traceback')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'traceback' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Traceback Anatomy
          </button>
          <button
            onClick={() => setActiveTab('trace_table')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'trace_table' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Variable Trace Table
          </button>
          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'workflow' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            9-Step Workflow
          </button>
        </div>
      </div>

      {/* Tab 1: Traceback Anatomy */}
      {activeTab === 'traceback' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-red-500/30 space-y-3">
            <div className="text-red-400 font-bold uppercase text-[11px] font-sans">
              Python Traceback Breakdown
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-red-500/40 text-red-200 text-xs space-y-2">
              <div className="text-gray-400">Traceback (most recent call last):</div>
              <div className="text-cyan-300">File "main.py", line 4, in &lt;module&gt;</div>
              <div className="text-white bg-slate-950 p-2 rounded border border-white/10 font-bold">
                print(numbers[5])
              </div>
              <div className="text-red-400 font-bold text-sm pt-1">
                IndexError: list index out of range
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-cyan-500/30 space-y-1">
              <div className="text-cyan-400 font-bold">1. Location / Line</div>
              <div className="text-gray-300 text-xs font-mono">line 4 in main.py</div>
              <div className="text-gray-400 text-[11px]">Identifies where execution encountered the problem.</div>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-red-500/30 space-y-1">
              <div className="text-red-400 font-bold">2. Error Type</div>
              <div className="text-gray-300 text-xs font-mono">IndexError</div>
              <div className="text-gray-400 text-[11px]">Identifies the category of failure (Index out of bounds).</div>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-500/30 space-y-1">
              <div className="text-emerald-400 font-bold">3. Error Message</div>
              <div className="text-gray-300 text-xs font-mono">list index out of range</div>
              <div className="text-gray-400 text-[11px]">Describes what went wrong with the data structure.</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Variable Trace Table */}
      {activeTab === 'trace_table' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-white/10">
            <div className="text-cyan-400 font-bold font-sans">
              Step {stepIdx + 1} of {traceSteps.length}
            </div>
            <div className="flex gap-2 font-sans font-bold">
              <button
                disabled={stepIdx === 0}
                onClick={() => setStepIdx(stepIdx - 1)}
                className="px-3 py-1.5 bg-slate-900 border border-white/10 rounded-xl text-gray-300 disabled:opacity-40"
              >
                ← Previous Step
              </button>
              <button
                disabled={stepIdx === traceSteps.length - 1}
                onClick={() => setStepIdx(stepIdx + 1)}
                className="px-3 py-1.5 bg-cyan-600 rounded-xl text-white disabled:opacity-40"
              >
                Next Step →
              </button>
            </div>
          </div>

          <div className="bg-slate-950 rounded-2xl border border-cyan-500/30 p-5 space-y-3">
            <div className="text-sm font-bold text-cyan-300 bg-slate-900 p-3 rounded-xl border border-white/10">
              {traceSteps[stepIdx].code}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-cyan-400 font-bold">
                    <th className="p-2">Step</th>
                    <th className="p-2">price</th>
                    <th className="p-2">qty</th>
                    <th className="p-2">total</th>
                    <th className="p-2">State Note</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300 divide-y divide-white/5">
                  {traceSteps.slice(0, stepIdx + 1).map((s, idx) => (
                    <tr key={idx} className={idx === stepIdx ? 'bg-cyan-950/40 text-cyan-200 font-bold' : ''}>
                      <td className="p-2">{s.step}</td>
                      <td className="p-2 text-cyan-300">{s.price}</td>
                      <td className="p-2 text-purple-300">{s.qty}</td>
                      <td className="p-2 text-emerald-400">{s.total}</td>
                      <td className="p-2 font-sans text-xs">{s.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Workflow */}
      {activeTab === 'workflow' && (
        <div className="bg-slate-950 rounded-2xl border border-emerald-500/30 p-5 font-mono text-xs space-y-3">
          <div className="text-emerald-400 font-bold uppercase text-[11px] font-sans">
            Systematic 9-Step Debugging Workflow
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 font-sans text-xs">
            <div className="bg-slate-900 p-3 rounded-xl border border-white/10">1. Reproduce Problem</div>
            <div className="bg-slate-900 p-3 rounded-xl border border-white/10">2. Define Expected Behavior</div>
            <div className="bg-slate-900 p-3 rounded-xl border border-white/10">3. Observe Actual Output</div>
            <div className="bg-slate-900 p-3 rounded-xl border border-white/10">4. Read Error Type & Line</div>
            <div className="bg-slate-900 p-3 rounded-xl border border-white/10">5. Trace Variable Values</div>
            <div className="bg-slate-900 p-3 rounded-xl border border-white/10">6. Form Hypothesis</div>
            <div className="bg-slate-900 p-3 rounded-xl border border-white/10">7. Make ONE Focused Fix</div>
            <div className="bg-slate-900 p-3 rounded-xl border border-white/10">8. Re-run & Observe</div>
            <div className="bg-slate-900 p-3 rounded-xl border border-emerald-500/40 text-emerald-300 font-bold">9. Verify Expected Result</div>
          </div>
        </div>
      )}
    </div>
  );
};
