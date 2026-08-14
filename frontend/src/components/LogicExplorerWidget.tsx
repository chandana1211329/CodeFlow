import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, CheckCircle2, XCircle, Zap, RefreshCw, Layers } from 'lucide-react';

interface PresetExpression {
  id: string;
  label: string;
  expr: string;
  type: 'and' | 'or' | 'not' | 'mixed';
}

export const LogicExplorerWidget: React.FC = () => {
  const [age, setAge] = useState<number>(20);
  const [score, setScore] = useState<number>(75);
  const [hasTicket, setHasTicket] = useState<boolean>(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('expr-1');

  const presets: PresetExpression[] = [
    { id: 'expr-1', label: 'age >= 18 and score >= 50', expr: 'age >= 18 and score >= 50', type: 'and' },
    { id: 'expr-2', label: 'score >= 90 or has_ticket', expr: 'score >= 90 or has_ticket', type: 'or' },
    { id: 'expr-3', label: 'not has_ticket', expr: 'not has_ticket', type: 'not' },
    { id: 'expr-4', label: 'age >= 18 and not has_ticket', expr: 'age >= 18 and not has_ticket', type: 'mixed' },
    { id: 'expr-5', label: 'score >= 90 or age >= 18', expr: 'score >= 90 or age >= 18', type: 'or' },
  ];

  const currentPreset = presets.find(p => p.id === selectedPresetId) || presets[0];

  // Logic calculation
  const leftAgeCond = age >= 18;
  const leftScore90Cond = score >= 90;
  const leftScore50Cond = score >= 50;

  let leftBool: boolean | null = null;
  let rightBool: boolean | null = null;
  let finalBool: boolean = false;
  let shortCircuited = false;
  let explanationSteps: string[] = [];

  if (currentPreset.id === 'expr-1') {
    // age >= 18 and score >= 50
    leftBool = age >= 18;
    explanationSteps.push(`Left Condition: age >= 18 → ${age} >= 18 → ${leftBool}`);
    if (!leftBool) {
      shortCircuited = true;
      explanationSteps.push(`Short-Circuit: Left condition is False. Right condition (score >= 50) is SKIPPED!`);
      finalBool = false;
    } else {
      rightBool = score >= 50;
      explanationSteps.push(`Right Condition: score >= 50 → ${score} >= 50 → ${rightBool}`);
      finalBool = leftBool && rightBool;
      explanationSteps.push(`Logical Operation: ${leftBool} and ${rightBool} → ${finalBool}`);
    }
  } else if (currentPreset.id === 'expr-2') {
    // score >= 90 or has_ticket
    leftBool = score >= 90;
    explanationSteps.push(`Left Condition: score >= 90 → ${score} >= 90 → ${leftBool}`);
    if (leftBool) {
      shortCircuited = true;
      explanationSteps.push(`Short-Circuit: Left condition is True. Right condition (has_ticket) is SKIPPED!`);
      finalBool = true;
    } else {
      rightBool = hasTicket;
      explanationSteps.push(`Right Condition: has_ticket → ${rightBool}`);
      finalBool = leftBool || rightBool;
      explanationSteps.push(`Logical Operation: ${leftBool} or ${rightBool} → ${finalBool}`);
    }
  } else if (currentPreset.id === 'expr-3') {
    // not has_ticket
    leftBool = hasTicket;
    explanationSteps.push(`Inner Condition: has_ticket → ${hasTicket}`);
    finalBool = !hasTicket;
    explanationSteps.push(`Apply not: not ${hasTicket} → ${finalBool}`);
  } else if (currentPreset.id === 'expr-4') {
    // age >= 18 and not has_ticket
    leftBool = age >= 18;
    explanationSteps.push(`Left Condition: age >= 18 → ${age} >= 18 → ${leftBool}`);
    if (!leftBool) {
      shortCircuited = true;
      explanationSteps.push(`Short-Circuit: Left condition is False. Right condition (not has_ticket) is SKIPPED!`);
      finalBool = false;
    } else {
      rightBool = !hasTicket;
      explanationSteps.push(`Right Condition: not has_ticket → not ${hasTicket} → ${rightBool}`);
      finalBool = leftBool && rightBool;
      explanationSteps.push(`Logical Operation: ${leftBool} and ${rightBool} → ${finalBool}`);
    }
  } else if (currentPreset.id === 'expr-5') {
    // score >= 90 or age >= 18
    leftBool = score >= 90;
    explanationSteps.push(`Left Condition: score >= 90 → ${score} >= 90 → ${leftBool}`);
    if (leftBool) {
      shortCircuited = true;
      explanationSteps.push(`Short-Circuit: Left condition is True. Right condition (age >= 18) is SKIPPED!`);
      finalBool = true;
    } else {
      rightBool = age >= 18;
      explanationSteps.push(`Right Condition: age >= 18 → ${age} >= 18 → ${rightBool}`);
      finalBool = leftBool || rightBool;
      explanationSteps.push(`Logical Operation: ${leftBool} or ${rightBool} → ${finalBool}`);
    }
  }

  return (
    <div className="my-8 bg-[#020617] border border-blue-500/30 rounded-3xl p-6 shadow-2xl shadow-blue-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600/20 border border-purple-400/30 rounded-2xl flex items-center justify-center text-purple-400">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Interactive Logic Explorer
            </h3>
            <p className="text-xs text-gray-400">
              Combine and reverse conditions using Python <code className="text-blue-300">and</code>, <code className="text-blue-300">or</code>, and <code className="text-blue-300">not</code>
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setAge(20);
            setScore(75);
            setHasTicket(false);
            setSelectedPresetId('expr-1');
          }}
          className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all flex items-center gap-1.5 text-xs"
        >
          <RefreshCw size={14} /> Reset
        </button>
      </div>

      {/* Inputs Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
            <span>age (int)</span>
            <span className="text-emerald-400 font-mono">{age}</span>
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value, 10) || 0)}
            className="w-full bg-black/60 border border-blue-500/30 rounded-xl px-3 py-2 font-mono text-sm text-emerald-400 focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
            <span>score (int)</span>
            <span className="text-emerald-400 font-mono">{score}</span>
          </label>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(parseInt(e.target.value, 10) || 0)}
            className="w-full bg-black/60 border border-blue-500/30 rounded-xl px-3 py-2 font-mono text-sm text-emerald-400 focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
            <span>has_ticket (bool)</span>
            <span className={hasTicket ? 'text-emerald-400 font-mono' : 'text-red-400 font-mono'}>
              {hasTicket ? 'True' : 'False'}
            </span>
          </label>
          <button
            onClick={() => setHasTicket(!hasTicket)}
            className={`w-full py-2 rounded-xl font-mono text-xs font-bold border transition-all ${
              hasTicket
                ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                : 'bg-red-600/30 border-red-500 text-red-300'
            }`}
          >
            Toggle: {hasTicket ? 'True' : 'False'}
          </button>
        </div>
      </div>

      {/* Preset Expression Selector */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
          Select Logical Expression to Evaluate:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPresetId(p.id)}
              className={`p-3 rounded-2xl font-mono text-xs text-left border transition-all flex items-center justify-between ${
                selectedPresetId === p.id
                  ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-600/30 font-bold'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{p.label}</span>
              <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-black/40 text-purple-300 border border-purple-500/30">
                {p.type}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Expression Breakdown & Trace */}
      <div className="bg-black/50 border border-white/10 rounded-2xl p-5 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <span className="font-bold text-purple-400">EVALUATION PIPELINE</span>
          <span className="text-[10px] text-gray-500">Comparison → Boolean → Logic</span>
        </div>

        <div className="space-y-2">
          {explanationSteps.map((step, idx) => {
            const isShortCircuit = step.includes('Short-Circuit');
            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border ${
                  isShortCircuit
                    ? 'bg-yellow-950/40 border-yellow-500/40 text-yellow-300 font-bold'
                    : 'bg-white/5 border-white/5 text-gray-200'
                }`}
              >
                {step}
              </div>
            );
          })}
        </div>

        {/* Final Result Display */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-purple-950/30 border border-purple-500/30 p-4 rounded-xl gap-4">
          <div className="flex items-center gap-3">
            {finalBool ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
            ) : (
              <XCircle className="w-8 h-8 text-red-400 shrink-0" />
            )}
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Overall Condition Result:</span>
              <span className={`text-base font-bold ${finalBool ? 'text-emerald-400' : 'text-red-400'}`}>
                {finalBool ? 'Condition Satisfied (True)' : 'Condition Not Satisfied (False)'}
              </span>
            </div>
          </div>

          <div className="bg-black/60 px-6 py-3 rounded-2xl border border-white/10 text-center shrink-0">
            <span className="text-[10px] text-gray-400 block uppercase font-bold">Python Result</span>
            <span className={`text-xl font-bold font-mono ${finalBool ? 'text-emerald-400' : 'text-red-400'}`}>
              {finalBool ? 'True' : 'False'}
            </span>
            <span className="text-[10px] text-cyan-400 block font-mono">type: bool</span>
          </div>
        </div>

        <div className="text-[11px] text-gray-400 italic text-center border-t border-white/5 pt-2">
          ✓ Variables remain unmodified: age is {age}, score is {score}, has_ticket is {hasTicket ? 'True' : 'False'}.
        </div>
      </div>
    </div>
  );
};
