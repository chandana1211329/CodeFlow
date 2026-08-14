import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, Zap, RefreshCw } from 'lucide-react';

export const ComparisonExplorerWidget: React.FC = () => {
  const [val1Input, setVal1Input] = useState<string>('10');
  const [val2Input, setVal2Input] = useState<string>('5');
  const [selectedOp, setSelectedOp] = useState<string>('==');

  // Helper to parse typed values
  const parseVal = (input: string): { parsed: any; typeName: string } => {
    const trimmed = input.trim();
    if (trimmed === 'True' || trimmed === 'False') {
      return { parsed: trimmed === 'True', typeName: 'bool' };
    }
    if (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length >= 2) {
      return { parsed: trimmed.slice(1, -1), typeName: 'str' };
    }
    if (trimmed.startsWith("'") && trimmed.endsWith("'") && trimmed.length >= 2) {
      return { parsed: trimmed.slice(1, -1), typeName: 'str' };
    }
    if (!isNaN(Number(trimmed)) && trimmed !== '') {
      if (trimmed.includes('.')) {
        return { parsed: parseFloat(trimmed), typeName: 'float' };
      }
      return { parsed: parseInt(trimmed, 10), typeName: 'int' };
    }
    // Default fallback as raw string if unquoted text like "Python"
    return { parsed: trimmed, typeName: 'str' };
  };

  const v1 = parseVal(val1Input);
  const v2 = parseVal(val2Input);

  let evaluationResult: boolean | null = null;
  let typeError: string | null = null;
  let questionText = '';

  const opQuestions: Record<string, string> = {
    '==': `Is ${val1Input} EQUAL TO ${val2Input}?`,
    '!=': `Is ${val1Input} DIFFERENT FROM ${val2Input}?`,
    '>': `Is ${val1Input} GREATER THAN ${val2Input}?`,
    '<': `Is ${val1Input} LESS THAN ${val2Input}?`,
    '>=': `Is ${val1Input} GREATER THAN OR EQUAL TO ${val2Input}?`,
    '<=': `Is ${val1Input} LESS THAN OR EQUAL TO ${val2Input}?`,
  };

  questionText = opQuestions[selectedOp] || '';

  try {
    const a = v1.parsed;
    const b = v2.parsed;
    switch (selectedOp) {
      case '==':
        evaluationResult = a === b;
        break;
      case '!=':
        evaluationResult = a !== b;
        break;
      case '>':
        if (typeof a !== typeof b && (typeof a === 'string' || typeof b === 'string')) {
          typeError = `TypeError: '>' not supported between instances of '${v1.typeName}' and '${v2.typeName}'`;
        } else {
          evaluationResult = a > b;
        }
        break;
      case '<':
        if (typeof a !== typeof b && (typeof a === 'string' || typeof b === 'string')) {
          typeError = `TypeError: '<' not supported between instances of '${v1.typeName}' and '${v2.typeName}'`;
        } else {
          evaluationResult = a < b;
        }
        break;
      case '>=':
        if (typeof a !== typeof b && (typeof a === 'string' || typeof b === 'string')) {
          typeError = `TypeError: '>=' not supported between instances of '${v1.typeName}' and '${v2.typeName}'`;
        } else {
          evaluationResult = a >= b;
        }
        break;
      case '<=':
        if (typeof a !== typeof b && (typeof a === 'string' || typeof b === 'string')) {
          typeError = `TypeError: '<=' not supported between instances of '${v1.typeName}' and '${v2.typeName}'`;
        } else {
          evaluationResult = a <= b;
        }
        break;
    }
  } catch (err) {
    typeError = 'Evaluation error';
  }

  const operators = ['==', '!=', '>', '<', '>=', '<='];

  return (
    <div className="my-8 bg-[#020617] border border-blue-500/30 rounded-3xl p-6 shadow-2xl shadow-blue-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600/20 border border-blue-400/30 rounded-2xl flex items-center justify-center text-blue-400">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Interactive Comparison Explorer
            </h3>
            <p className="text-xs text-gray-400">
              Test how Python evaluates any two values across all comparison operators
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setVal1Input('10');
            setVal2Input('5');
            setSelectedOp('==');
          }}
          className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all flex items-center gap-1.5 text-xs"
          title="Reset values"
        >
          <RefreshCw size={14} /> Reset
        </button>
      </div>

      {/* Input controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
            <span>Left Value (v1)</span>
            <span className="text-[10px] text-blue-400 font-mono">type: {v1.typeName}</span>
          </label>
          <input
            type="text"
            value={val1Input}
            onChange={(e) => setVal1Input(e.target.value)}
            className="w-full bg-black/60 border border-blue-500/30 rounded-xl px-4 py-2.5 font-mono text-sm text-emerald-400 focus:outline-none focus:border-blue-400 transition-all"
            placeholder='10, 5.5, "Python"'
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
            <span>Right Value (v2)</span>
            <span className="text-[10px] text-blue-400 font-mono">type: {v2.typeName}</span>
          </label>
          <input
            type="text"
            value={val2Input}
            onChange={(e) => setVal2Input(e.target.value)}
            className="w-full bg-black/60 border border-blue-500/30 rounded-xl px-4 py-2.5 font-mono text-sm text-emerald-400 focus:outline-none focus:border-blue-400 transition-all"
            placeholder='5, 5.0, "Java"'
          />
        </div>
      </div>

      {/* Operator Selector Buttons */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
          Select Comparison Operator:
        </span>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {operators.map((op) => (
            <button
              key={op}
              onClick={() => setSelectedOp(op)}
              className={`py-3 rounded-2xl font-mono text-sm font-bold border transition-all ${
                selectedOp === op
                  ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30 scale-105'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {op}
            </button>
          ))}
        </div>
      </div>

      {/* Evaluation Trace Card */}
      <div className="bg-black/50 border border-white/10 rounded-2xl p-5 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between text-gray-400 border-b border-white/5 pb-2">
          <span className="font-bold text-blue-400">EXPRESSION EVALUATION TRACE</span>
          <span className="text-[10px] text-gray-500">CodeFlow Mental Model</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
            <span className="text-[10px] text-gray-500 uppercase block mb-1">Left Value</span>
            <span className="text-emerald-400 font-bold text-sm">{String(v1.parsed)}</span>
            <span className="text-[10px] text-gray-400 block mt-0.5">({v1.typeName})</span>
          </div>

          <div className="bg-blue-600/20 p-3 rounded-xl border border-blue-500/30">
            <span className="text-[10px] text-blue-300 uppercase block mb-1">Operator</span>
            <span className="text-blue-400 font-bold text-base">{selectedOp}</span>
            <span className="text-[10px] text-blue-300 block mt-0.5">Compare</span>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
            <span className="text-[10px] text-gray-500 uppercase block mb-1">Right Value</span>
            <span className="text-emerald-400 font-bold text-sm">{String(v2.parsed)}</span>
            <span className="text-[10px] text-gray-400 block mt-0.5">({v2.typeName})</span>
          </div>
        </div>

        <div className="bg-blue-950/40 border border-blue-500/20 p-3 rounded-xl text-center space-y-1">
          <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">Question Asked:</span>
          <p className="text-sm font-semibold text-gray-200">"{questionText}"</p>
        </div>

        {typeError ? (
          <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-xl text-red-300 text-xs">
            {typeError}
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-xl gap-4">
            <div className="flex items-center gap-3">
              {evaluationResult ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-8 h-8 text-red-400 shrink-0" />
              )}
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Evaluation Answer:</span>
                <span className={`text-base font-bold ${evaluationResult ? 'text-emerald-400' : 'text-red-400'}`}>
                  {evaluationResult ? 'YES (Condition Satisfied)' : 'NO (Condition Not Satisfied)'}
                </span>
              </div>
            </div>

            <div className="bg-black/60 px-6 py-3 rounded-2xl border border-white/10 text-center shrink-0">
              <span className="text-[10px] text-gray-400 block uppercase font-bold">Python Result</span>
              <span className={`text-xl font-bold font-mono ${evaluationResult ? 'text-emerald-400' : 'text-red-400'}`}>
                {evaluationResult ? 'True' : 'False'}
              </span>
              <span className="text-[10px] text-cyan-400 block font-mono">type: bool</span>
            </div>
          </div>
        )}

        <div className="text-[11px] text-gray-400 italic text-center border-t border-white/5 pt-2">
          ✓ Values remain unmodified: v1 is still {String(v1.parsed)}, v2 is still {String(v2.parsed)}.
        </div>
      </div>
    </div>
  );
};
