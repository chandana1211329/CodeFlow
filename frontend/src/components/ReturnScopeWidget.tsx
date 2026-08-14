import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Globe, Clock, ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';

export const ReturnScopeWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'print_vs_return' | 'scope' | 'lifetime'>('print_vs_return');

  // Scope state
  const [globalName, setGlobalName] = useState<string>('Global Maya');
  const [localName, setLocalName] = useState<string>('Local Alex');
  const [useGlobalKeyword, setUseGlobalKeyword] = useState<boolean>(false);

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl flex items-center justify-center text-cyan-400">
            <LogOut size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Return Values & Scope Studio
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wide">
                print vs return • Local vs Global Scope
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Understand why return sends values back to the caller, and how local vs global scope determines variable visibility.
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('print_vs_return')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'print_vs_return' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            print vs return
          </button>
          <button
            onClick={() => setActiveTab('scope')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'scope' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Scope Sandbox
          </button>
          <button
            onClick={() => setActiveTab('lifetime')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'lifetime' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Variable Lifetime
          </button>
        </div>
      </div>

      {/* Tab 1: print vs return */}
      {activeTab === 'print_vs_return' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-5 space-y-3">
            <div className="text-amber-400 font-bold uppercase text-[11px] font-sans flex justify-between">
              <span>def add_print(a, b): print(a + b)</span>
              <span className="text-amber-300">DISPLAYS ONLY</span>
            </div>
            <div className="text-sm text-white bg-slate-900 p-3 rounded-xl border border-white/10 space-y-1">
              <div>res = add_print(10, 20) <span className="text-gray-400"># Console displays 30</span></div>
              <div className="text-amber-400">print(res) → <span className="text-red-400 font-bold">None</span></div>
            </div>
            <p className="text-gray-400 font-sans text-xs pt-1">
              ❌ <code className="text-amber-400">print()</code> only displays text on screen. Without a return statement, the function call evaluates to <strong>None</strong>!
            </p>
          </div>

          <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <div className="text-emerald-400 font-bold uppercase text-[11px] font-sans flex justify-between">
              <span>def add_return(a, b): return a + b</span>
              <span className="text-emerald-300">HANDS VALUE BACK</span>
            </div>
            <div className="text-sm text-white bg-slate-900 p-3 rounded-xl border border-white/10 space-y-1">
              <div>res = add_return(10, 20) <span className="text-gray-400"># Call evaluates to 30</span></div>
              <div className="text-emerald-400">print(res) → <span className="text-emerald-300 font-bold">30</span></div>
            </div>
            <p className="text-gray-400 font-sans text-xs pt-1">
              ✓ <code className="text-emerald-400">return</code> hands the calculated result back to the caller so it can be stored, reused, or passed to other functions!
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Scope Sandbox */}
      {activeTab === 'scope' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/30 space-y-3">
            <div className="text-purple-400 font-bold uppercase text-[11px] font-sans">
              Local vs Global Scope Sandbox
            </div>
            <div className="bg-slate-900 p-3.5 rounded-xl border border-white/10 space-y-2">
              <div className="text-gray-400">name = "{globalName}" # Global Scope</div>
              <div className="text-cyan-300 font-bold">
                def greet():<br />
                &nbsp;&nbsp;&nbsp;&nbsp;{useGlobalKeyword ? 'global name\n    ' : ''}name = "{localName}" # Local Variable<br />
                &nbsp;&nbsp;&nbsp;&nbsp;print("Inside:", name)
              </div>
            </div>

            <div className="flex items-center gap-3 font-sans font-bold text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer bg-slate-900 p-2.5 rounded-xl border border-white/10">
                <input
                  type="checkbox"
                  checked={useGlobalKeyword}
                  onChange={(e) => setUseGlobalKeyword(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-500"
                />
                <span className="text-purple-300">
                  {useGlobalKeyword ? 'Use global keyword (Modifies Global)' : 'No global keyword (Creates Local Shadow)'}
                </span>
              </label>
            </div>
          </div>

          <div className="bg-slate-950 border border-white/10 rounded-2xl p-5 space-y-2 font-mono text-xs">
            <div className="text-gray-400 font-sans font-bold text-xs uppercase">Execution Results</div>
            <div className="grid grid-cols-2 gap-3 text-sm font-bold bg-slate-900 p-3.5 rounded-xl border border-white/10">
              <div>Inside greet(): <span className="text-cyan-300">"{localName}"</span></div>
              <div>Outside (Global): <span className={useGlobalKeyword ? 'text-purple-300' : 'text-emerald-400'}>
                "{useGlobalKeyword ? localName : globalName}"
              </span></div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Variable Lifetime */}
      {activeTab === 'lifetime' && (
        <div className="bg-slate-950 rounded-2xl border border-emerald-500/30 p-5 font-mono text-xs space-y-3">
          <div className="text-emerald-400 font-bold uppercase text-[11px] font-sans">
            Variable Lifetime Timeline
          </div>
          <div className="space-y-2 text-xs">
            <div className="bg-slate-900 p-3 rounded-xl border border-white/10 space-y-1">
              <div className="text-cyan-400 font-bold">1. Function Call Begins:</div>
              <div className="text-gray-300">Python allocates a new local stack frame. Local variables & parameters come into existence.</div>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-white/10 space-y-1">
              <div className="text-emerald-400 font-bold">2. Function Executes & Returns:</div>
              <div className="text-gray-300">The return statement evaluates the result expression and hands it back to the caller.</div>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-white/10 space-y-1">
              <div className="text-purple-400 font-bold">3. Function Call Ends:</div>
              <div className="text-gray-300">Local scope environment disappears! Direct access to local variables outside raises <strong>NameError</strong>. Returned values stored in caller variables remain alive.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
