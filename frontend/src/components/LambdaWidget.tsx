import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Code, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const LambdaWidget: React.FC = () => {
  const [paramInput, setParamInput] = useState<number>(5);
  const [lambdaType, setLambdaType] = useState<'double' | 'add_ten' | 'is_even' | 'status'>('double');

  const computeLambda = () => {
    switch (lambdaType) {
      case 'double':
        return {
          code: 'lambda x: x * 2',
          defEquivalent: 'def double(x):\n    return x * 2',
          result: paramInput * 2,
          typeDesc: '<class \'int\'>'
        };
      case 'add_ten':
        return {
          code: 'lambda x: x + 10',
          defEquivalent: 'def add_ten(x):\n    return x + 10',
          result: paramInput + 10,
          typeDesc: '<class \'int\'>'
        };
      case 'is_even':
        return {
          code: 'lambda x: x % 2 == 0',
          defEquivalent: 'def is_even(x):\n    return x % 2 == 0',
          result: (paramInput % 2 === 0).toString(),
          typeDesc: '<class \'bool\'>'
        };
      case 'status':
        return {
          code: 'lambda x: "Adult" if x >= 18 else "Minor"',
          defEquivalent: 'def check_status(x):\n    if x >= 18:\n        return "Adult"\n    else:\n        return "Minor"',
          result: paramInput >= 18 ? '"Adult"' : '"Minor"',
          typeDesc: '<class \'str\'>'
        };
    }
  };

  const res = computeLambda();

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500/20 border border-amber-400/40 rounded-2xl flex items-center justify-center text-amber-400">
            <Zap size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Lambda Expressions Studio
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30 uppercase tracking-wide">
                Anonymous Functions • Single Expression
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Explore small anonymous function expressions (lambda parameters: expression) without formal def structures.
            </p>
          </div>
        </div>

        {/* Expression Selector */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setLambdaType('double')}
            className={`px-3 py-1 rounded-xl transition-all ${
              lambdaType === 'double' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            x * 2
          </button>
          <button
            onClick={() => setLambdaType('add_ten')}
            className={`px-3 py-1 rounded-xl transition-all ${
              lambdaType === 'add_ten' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            x + 10
          </button>
          <button
            onClick={() => setLambdaType('is_even')}
            className={`px-3 py-1 rounded-xl transition-all ${
              lambdaType === 'is_even' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            x % 2 == 0
          </button>
          <button
            onClick={() => setLambdaType('status')}
            className={`px-3 py-1 rounded-xl transition-all ${
              lambdaType === 'status' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Conditional
          </button>
        </div>
      </div>

      {/* Side by side def vs lambda comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 space-y-2">
          <div className="text-gray-400 font-sans font-bold text-xs uppercase">Normal def Function Equivalent:</div>
          <pre className="bg-slate-900 p-3 rounded-xl border border-white/10 text-cyan-300 font-bold text-xs">
            {res.defEquivalent}
          </pre>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/30 space-y-2">
          <div className="text-amber-400 font-sans font-bold text-xs uppercase">Anonymous Lambda Expression:</div>
          <div className="bg-slate-900 p-3 rounded-xl border border-white/10 text-amber-300 font-bold text-sm">
            {res.code}
          </div>
        </div>
      </div>

      {/* Input Argument Configurator & Result */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 space-y-3 font-mono text-xs">
        <div className="flex items-center gap-3">
          <label className="text-gray-400 font-sans font-bold text-xs uppercase">Input Parameter x:</label>
          <input
            type="number"
            value={paramInput}
            onChange={(e) => setParamInput(parseInt(e.target.value) || 0)}
            className="bg-slate-900 border border-amber-500/40 rounded-xl p-2 text-white font-bold w-28"
          />
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-amber-500/30 space-y-1">
          <div className="text-amber-400 font-bold text-xs font-sans">Execution Trace:</div>
          <div className="text-white text-sm">
            ({res.code})({paramInput}) $\rightarrow$ <span className="text-emerald-400 font-bold">{res.result}</span> &nbsp;
            <span className="text-gray-400 text-xs">({res.typeDesc})</span>
          </div>
          <p className="text-gray-400 font-sans text-xs pt-1">
            ✓ Lambda expressions automatically return the result of their single expression without writing an explicit <code className="text-amber-400">return</code> statement!
          </p>
        </div>
      </div>
    </div>
  );
};
