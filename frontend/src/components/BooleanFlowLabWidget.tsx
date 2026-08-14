import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, RefreshCw, Zap, Eye, Sparkles, Layers } from 'lucide-react';

interface PresetValue {
  valStr: string;
  typeStr: string;
  rule: string;
  isTruthy: boolean;
  boolResult: boolean;
}

export const BooleanFlowLabWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flow' | 'truthiness'>('flow');

  // Flow Challenge state
  const [age, setAge] = useState<number>(20);
  const [score, setScore] = useState<number>(75);
  const [username, setUsername] = useState<string>('CodeFlow');
  const [selectedChallenge, setSelectedChallenge] = useState<number>(1);
  const [userPrediction, setUserPrediction] = useState<boolean | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  // Preset values for Truthiness Explorer
  const presets: PresetValue[] = [
    { valStr: '0', typeStr: 'int', rule: 'Numeric Zero', isTruthy: false, boolResult: false },
    { valStr: '1', typeStr: 'int', rule: 'Non-Zero Number', isTruthy: true, boolResult: true },
    { valStr: '-10', typeStr: 'int', rule: 'Negative Non-Zero Number', isTruthy: true, boolResult: true },
    { valStr: '0.0', typeStr: 'float', rule: 'Floating-Point Zero', isTruthy: false, boolResult: false },
    { valStr: '3.14', typeStr: 'float', rule: 'Non-Zero Float', isTruthy: true, boolResult: true },
    { valStr: '""', typeStr: 'str', rule: 'Empty String (length 0)', isTruthy: false, boolResult: false },
    { valStr: '"Python"', typeStr: 'str', rule: 'Non-Empty String', isTruthy: true, boolResult: true },
    { valStr: '"False"', typeStr: 'str', rule: 'Non-Empty String containing "False"', isTruthy: true, boolResult: true },
    { valStr: '"0"', typeStr: 'str', rule: 'Non-Empty String containing "0"', isTruthy: true, boolResult: true },
    { valStr: 'None', typeStr: 'NoneType', rule: 'Singleton None', isTruthy: false, boolResult: false },
  ];

  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const currentPreset = presets[selectedPresetIndex];

  // Flow challenge evaluations
  let challengeExpr = '';
  let challengeResult = false;
  let challengeExplanation = '';

  if (selectedChallenge === 1) {
    challengeExpr = 'age >= 18';
    challengeResult = age >= 18;
    challengeExplanation = `${age} >= 18 evaluates to ${challengeResult} (type: bool).`;
  } else if (selectedChallenge === 2) {
    challengeExpr = 'age >= 18 and score >= 50';
    const left = age >= 18;
    const right = score >= 50;
    challengeResult = left && right;
    challengeExplanation = `Left (${age}>=18 -> ${left}) AND Right (${score}>=50 -> ${right}) => ${challengeResult}.`;
  } else if (selectedChallenge === 3) {
    challengeExpr = 'bool(username)';
    challengeResult = username.length > 0;
    challengeExplanation = `username is "${username}". Non-empty string => Truthy => ${challengeResult}.`;
  } else if (selectedChallenge === 4) {
    challengeExpr = 'bool("")';
    challengeResult = false;
    challengeExplanation = '"" is an empty string (length 0) => Falsy => False.';
  } else if (selectedChallenge === 5) {
    challengeExpr = 'age >= 18 and bool(username)';
    const left = age >= 18;
    const right = username.length > 0;
    challengeResult = left && right;
    challengeExplanation = `Left (${left}) AND Right (bool("${username}") -> ${right}) => ${challengeResult}.`;
  }

  const handlePredict = (pred: boolean) => {
    setUserPrediction(pred);
    setIsRevealed(true);
  };

  const handleResetFlow = () => {
    setUserPrediction(null);
    setIsRevealed(false);
  };

  return (
    <div className="my-8 bg-[#020617] border border-blue-500/30 rounded-3xl p-6 shadow-2xl shadow-blue-500/10 text-white space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-600/20 border border-cyan-400/30 rounded-2xl flex items-center justify-center text-cyan-400">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Boolean Expressions & Truthiness Lab
            </h3>
            <p className="text-xs text-gray-400">
              Trace Boolean evaluations & test Python value truthiness
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 gap-1 self-stretch sm:self-auto">
          <button
            onClick={() => setActiveTab('flow')}
            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
              activeTab === 'flow'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Boolean Flow Lab
          </button>
          <button
            onClick={() => setActiveTab('truthiness')}
            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
              activeTab === 'truthiness'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Truthiness Explorer
          </button>
        </div>
      </div>

      {activeTab === 'flow' ? (
        /* TAB 1: BOOLEAN FLOW LAB */
        <div className="space-y-5">
          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="space-y-1 font-mono text-xs">
              <span className="text-gray-400 text-[10px] uppercase font-bold block">age (int)</span>
              <input
                type="number"
                value={age}
                onChange={(e) => {
                  setAge(parseInt(e.target.value, 10) || 0);
                  handleResetFlow();
                }}
                className="w-full bg-black/60 border border-blue-500/30 rounded-xl px-3 py-1.5 text-emerald-400 focus:outline-none"
              />
            </div>
            <div className="space-y-1 font-mono text-xs">
              <span className="text-gray-400 text-[10px] uppercase font-bold block">score (int)</span>
              <input
                type="number"
                value={score}
                onChange={(e) => {
                  setScore(parseInt(e.target.value, 10) || 0);
                  handleResetFlow();
                }}
                className="w-full bg-black/60 border border-blue-500/30 rounded-xl px-3 py-1.5 text-emerald-400 focus:outline-none"
              />
            </div>
            <div className="space-y-1 font-mono text-xs">
              <span className="text-gray-400 text-[10px] uppercase font-bold block">username (str)</span>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  handleResetFlow();
                }}
                className="w-full bg-black/60 border border-blue-500/30 rounded-xl px-3 py-1.5 text-cyan-300 focus:outline-none"
              />
            </div>
          </div>

          {/* Challenge Selector */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              Select Expression Challenge:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {[
                { id: 1, label: '1. age >= 18' },
                { id: 2, label: '2. age >= 18 and score >= 50' },
                { id: 3, label: '3. bool(username)' },
                { id: 4, label: '4. bool("")' },
                { id: 5, label: '5. age >= 18 and bool(username)' },
              ].map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    setSelectedChallenge(ch.id);
                    handleResetFlow();
                  }}
                  className={`p-3 rounded-2xl font-mono text-xs text-left border transition-all ${
                    selectedChallenge === ch.id
                      ? 'bg-blue-600 border-blue-400 text-white font-bold shadow-lg shadow-blue-600/30'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {ch.label}
                </button>
              ))}
            </div>
          </div>

          {/* Predict & Trace Card */}
          <div className="bg-black/50 border border-white/10 rounded-2xl p-5 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-blue-400 font-bold uppercase text-[11px]">EVALUATION PIPELINE</span>
              <span className="text-gray-500 text-[10px]">{challengeExpr}</span>
            </div>

            {!isRevealed ? (
              <div className="space-y-3 text-center py-4">
                <span className="text-xs text-gray-300 font-semibold block">
                  Predict result for: <code className="text-emerald-300 text-sm font-bold">{challengeExpr}</code>
                </span>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => handlePredict(true)}
                    className="px-6 py-2.5 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500 text-emerald-300 font-bold rounded-xl transition-all"
                  >
                    Predict True
                  </button>
                  <button
                    onClick={() => handlePredict(false)}
                    className="px-6 py-2.5 bg-red-600/30 hover:bg-red-600/50 border border-red-500 text-red-300 font-bold rounded-xl transition-all"
                  >
                    Predict False
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2">
                    {userPrediction === challengeResult ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className="font-bold">
                      {userPrediction === challengeResult ? 'Prediction Correct!' : 'Prediction Incorrect'}
                    </span>
                  </div>
                  <button
                    onClick={handleResetFlow}
                    className="text-[11px] text-gray-400 hover:text-white underline"
                  >
                    Try Again
                  </button>
                </div>

                <div className="bg-blue-950/30 border border-blue-500/20 p-4 rounded-xl space-y-2">
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Evaluation Trace:</span>
                  <p className="text-gray-200 text-xs">{challengeExplanation}</p>
                </div>

                <div className="flex items-center justify-between bg-black/60 px-6 py-3 rounded-2xl border border-white/10">
                  <span className="text-gray-400 uppercase text-[10px] font-bold">Python Result</span>
                  <div className="text-right">
                    <span className={`text-xl font-bold ${challengeResult ? 'text-emerald-400' : 'text-red-400'}`}>
                      {challengeResult ? 'True' : 'False'}
                    </span>
                    <span className="text-[10px] text-cyan-400 block font-mono">type: bool</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* TAB 2: TRUTHINESS EXPLORER */
        <div className="space-y-5">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              Click a Python Value to Inspect Truthiness:
            </span>
            <div className="flex flex-wrap gap-2">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPresetIndex(idx)}
                  className={`px-3 py-2 rounded-xl font-mono text-xs border transition-all ${
                    selectedPresetIndex === idx
                      ? 'bg-cyan-600 border-cyan-400 text-white font-bold shadow-lg shadow-cyan-600/30'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {p.valStr}
                </button>
              ))}
            </div>
          </div>

          {/* Truthiness Breakdown Panel */}
          <div className="bg-black/50 border border-white/10 rounded-2xl p-5 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-cyan-400 font-bold uppercase text-[11px]">TRUTHINESS INSPECTOR</span>
              <span className="text-gray-500 text-[10px]">Value: {currentPreset.valStr}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-2">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">1. Stored Value & Type</span>
                <div className="text-sm font-bold text-emerald-400">{currentPreset.valStr}</div>
                <div className="text-xs text-gray-300">
                  type: <code className="text-cyan-300 font-bold">{currentPreset.typeStr}</code>
                </div>
                <div className="text-[11px] text-gray-400 pt-1">
                  Rule: {currentPreset.rule}
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-2">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">2. Boolean Context Evaluation</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-300">Truthiness behavior:</span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] border ${
                      currentPreset.isTruthy
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                        : 'bg-red-950 text-red-300 border-red-500/40'
                    }`}
                  >
                    {currentPreset.isTruthy ? 'TRUTHY' : 'FALSY'}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-400">bool({currentPreset.valStr}):</span>
                  <span className={`text-base font-bold ${currentPreset.boolResult ? 'text-emerald-400' : 'text-red-400'}`}>
                    {currentPreset.boolResult ? 'True' : 'False'}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-gray-400 italic text-center border-t border-white/5 pt-2">
              ✓ <code className="text-emerald-300">bool({currentPreset.valStr})</code> returns a new Boolean result without mutating the original value or its type ({currentPreset.typeStr}).
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
