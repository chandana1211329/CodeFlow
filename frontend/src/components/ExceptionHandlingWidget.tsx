import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Play, CheckCircle2, AlertCircle, ArrowRight, CornerDownRight } from 'lucide-react';

export const ExceptionHandlingWidget: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>('20');
  const [raiseTab, setRaiseTab] = useState<boolean>(false);

  // Compute try/except/else/finally flow
  const computeFlow = () => {
    const trimmed = inputVal.trim();
    if (trimmed === '') {
      return {
        inputDesc: 'Empty Input',
        errorType: 'ValueError',
        runTry: true,
        runExceptValue: true,
        runExceptZero: false,
        runElse: false,
        runFinally: true,
        msg: 'ValueError: Empty string cannot be converted to integer!',
        exceptOutput: 'Please enter digits only.'
      };
    }
    const num = Number(trimmed);
    if (isNaN(num)) {
      return {
        inputDesc: `Text "${trimmed}"`,
        errorType: 'ValueError',
        runTry: true,
        runExceptValue: true,
        runExceptZero: false,
        runElse: false,
        runFinally: true,
        msg: `ValueError: invalid literal for int() with base 10: '${trimmed}'`,
        exceptOutput: 'Please enter digits only.'
      };
    }
    if (num === 0) {
      return {
        inputDesc: 'Number 0',
        errorType: 'ZeroDivisionError',
        runTry: true,
        runExceptValue: false,
        runExceptZero: true,
        runElse: false,
        runFinally: true,
        msg: 'ZeroDivisionError: division by zero',
        exceptOutput: 'Cannot divide by zero.'
      };
    }
    return {
      inputDesc: `Valid Number ${num}`,
      errorType: 'None',
      runTry: true,
      runExceptValue: false,
      runExceptZero: false,
      runElse: true,
      runFinally: true,
      result: (100 / num).toFixed(2),
      msg: 'Success! No exceptions raised.',
      elseOutput: `100 / ${num} = ${(100 / num).toFixed(2)}`
    };
  };

  const flowRes = computeFlow();

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl flex items-center justify-center text-emerald-400">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Exception Handling Studio
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30 uppercase tracking-wide">
                try • except • else • finally • raise
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Simulate full exception handling control flows across valid inputs, exceptions, and explicit raise statements.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setRaiseTab(false)}
            className={`px-3 py-1 rounded-xl transition-all ${
              !raiseTab ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            try / except / else / finally
          </button>
          <button
            onClick={() => setRaiseTab(true)}
            className={`px-3 py-1 rounded-xl transition-all ${
              raiseTab ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Explicit raise Statement
          </button>
        </div>
      </div>

      {!raiseTab ? (
        <div className="space-y-4 font-mono text-xs">
          {/* Input Configurator */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-white/10">
            <div className="space-y-2">
              <label className="text-gray-400 font-sans font-bold text-xs uppercase">
                Simulate Input Value:
              </label>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Try '20', '0', or 'hello'"
                className="w-full bg-slate-900 border border-emerald-500/40 rounded-xl p-2.5 text-white font-bold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-400 font-sans font-bold text-xs uppercase">
                Quick Test Presets:
              </label>
              <div className="flex gap-2 font-sans font-bold">
                <button
                  onClick={() => setInputVal('20')}
                  className="px-3 py-2 bg-emerald-950 border border-emerald-500 text-emerald-300 rounded-xl text-xs flex-1"
                >
                  Valid "20"
                </button>
                <button
                  onClick={() => setInputVal('0')}
                  className="px-3 py-2 bg-amber-950 border border-amber-500 text-amber-300 rounded-xl text-xs flex-1"
                >
                  Zero "0"
                </button>
                <button
                  onClick={() => setInputVal('hello')}
                  className="px-3 py-2 bg-red-950 border border-red-500 text-red-300 rounded-xl text-xs flex-1"
                >
                  Text "hello"
                </button>
              </div>
            </div>
          </div>

          {/* Block Execution Flow Diagram */}
          <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <div className="text-emerald-400 font-bold uppercase text-[11px] font-sans">
              Block Execution Trace ({flowRes.inputDesc})
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl border bg-slate-900 border-cyan-500/40 text-cyan-300 font-bold">
                ✓ 1. try: Attempting number = int("{inputVal}"); result = 100 / number
              </div>

              {flowRes.errorType !== 'None' ? (
                <div className="p-3 rounded-xl border bg-red-950/60 border-red-500/50 text-red-200 font-bold">
                  ⚡ Exception Raised: {flowRes.msg}
                </div>
              ) : null}

              <div
                className={`p-3 rounded-xl border ${
                  flowRes.runExceptValue || flowRes.runExceptZero
                    ? 'bg-amber-950/60 border-amber-500/50 text-amber-200 font-bold'
                    : 'bg-slate-900/40 border-white/5 text-gray-500'
                }`}
              >
                2. except ({flowRes.errorType}): {flowRes.exceptOutput || 'Skipped (No exception matched)'}
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  flowRes.runElse
                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200 font-bold'
                    : 'bg-slate-900/40 border-white/5 text-gray-500'
                }`}
              >
                3. else: {flowRes.elseOutput || 'Skipped (Exception occurred)'}
              </div>

              <div className="p-3 rounded-xl border bg-purple-950/60 border-purple-500/50 text-purple-200 font-bold">
                ✓ 4. finally: Cleanup statement executed! (Runs on both success & error paths)
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-950 border border-purple-500/30 rounded-2xl p-5 space-y-3 font-mono text-xs">
          <div className="text-purple-400 font-bold uppercase text-[11px] font-sans">
            Explicit raise Statement vs print()
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 p-3.5 rounded-xl border border-white/10 space-y-2">
              <div className="text-amber-400 font-bold">print("Invalid age")</div>
              <p className="text-gray-400 font-sans text-xs">
                ❌ Displays text on screen, but execution continues normally. Does NOT trigger exception handling!
              </p>
            </div>
            <div className="bg-slate-900 p-3.5 rounded-xl border border-purple-500/40 space-y-2">
              <div className="text-purple-300 font-bold">raise ValueError("Age cannot be negative")</div>
              <p className="text-gray-400 font-sans text-xs">
                ✓ Explicitly SIGNALS AN EXCEPTION! Immediately interrupts normal flow and triggers matching <code className="text-purple-300">try/except</code> handlers!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
