import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, ShieldCheck, PlayCircle, RotateCcw, 
  ArrowRight, Bug, CheckCircle2, HelpCircle, FastForward
} from 'lucide-react';

interface InfiniteScenario {
  id: string;
  title: string;
  type: 'INFINITE' | 'FINITE';
  code: string[];
  explanation: string;
  fix: string;
  steps: {
    iteration: number;
    val: number;
    condText: string;
    isTruth: boolean;
    printed: string;
    actionNote: string;
  }[];
}

const SCENARIOS: InfiniteScenario[] = [
  {
    id: 'missing-update',
    title: '1. Missing Variable Update',
    type: 'INFINITE',
    code: [
      'count = 1',
      'while count <= 3:',
      '    print("Count:", count)',
      '    # BUG: count += 1 is missing!'
    ],
    explanation: 'Because count never changes, 1 <= 3 is True forever.',
    fix: 'Add count += 1 inside the loop body.',
    steps: [
      { iteration: 1, val: 1, condText: '1 <= 3', isTruth: true, printed: 'Count: 1', actionNote: 'No update executed; count remains 1' },
      { iteration: 2, val: 1, condText: '1 <= 3', isTruth: true, printed: 'Count: 1', actionNote: 'No update executed; count remains 1' },
      { iteration: 3, val: 1, condText: '1 <= 3', isTruth: true, printed: 'Count: 1', actionNote: 'No update executed; count remains 1' },
      { iteration: 4, val: 1, condText: '1 <= 3', isTruth: true, printed: 'Count: 1', actionNote: '⚠️ Possible infinite loop detected! Simulation stopped for safety.' }
    ]
  },
  {
    id: 'wrong-direction',
    title: '2. Wrong Update Direction',
    type: 'INFINITE',
    code: [
      'count = 1',
      'while count <= 5:',
      '    print(count)',
      '    count -= 1  # BUG: Decrementing moves away from 5!'
    ],
    explanation: 'count decreases (1, 0, -1, -2...), so count <= 5 remains True infinitely.',
    fix: 'Change count -= 1 to count += 1.',
    steps: [
      { iteration: 1, val: 1, condText: '1 <= 5', isTruth: true, printed: '1', actionNote: 'count -= 1 → count becomes 0' },
      { iteration: 2, val: 0, condText: '0 <= 5', isTruth: true, printed: '0', actionNote: 'count -= 1 → count becomes -1' },
      { iteration: 3, val: -1, condText: '-1 <= 5', isTruth: true, printed: '-1', actionNote: 'count -= 1 → count becomes -2' },
      { iteration: 4, val: -2, condText: '-2 <= 5', isTruth: true, printed: '-2', actionNote: '⚠️ Loop is moving away from the False boundary! Trace capped for safety.' }
    ]
  },
  {
    id: 'wrong-variable',
    title: '3. Updating the Wrong Variable',
    type: 'INFINITE',
    code: [
      'count = 1',
      'score = 0',
      'while count <= 3:',
      '    print(count)',
      '    score += 1  # BUG: score changes, but condition uses count!'
    ],
    explanation: 'score increases, but the loop condition checks count (which stays 1).',
    fix: 'Update count += 1 instead of (or in addition to) score += 1.',
    steps: [
      { iteration: 1, val: 1, condText: '1 <= 3', isTruth: true, printed: '1', actionNote: 'score becomes 1; count remains 1' },
      { iteration: 2, val: 1, condText: '1 <= 3', isTruth: true, printed: '1', actionNote: 'score becomes 2; count remains 1' },
      { iteration: 3, val: 1, condText: '1 <= 3', isTruth: true, printed: '1', actionNote: 'score becomes 3; count remains 1' },
      { iteration: 4, val: 1, condText: '1 <= 3', isTruth: true, printed: '1', actionNote: '⚠️ Condition variable count was never updated! Trace stopped.' }
    ]
  },
  {
    id: 'correct-terminating',
    title: '4. Proper Terminating Loop',
    type: 'FINITE',
    code: [
      'count = 1',
      'while count <= 3:',
      '    print(count)',
      '    count += 1',
      'print("Loop Done")'
    ],
    explanation: 'count increments 1 → 2 → 3 → 4. At 4, 4 <= 3 is False → clean exit!',
    fix: 'Already correct!',
    steps: [
      { iteration: 1, val: 1, condText: '1 <= 3', isTruth: true, printed: '1', actionNote: 'count += 1 → count becomes 2' },
      { iteration: 2, val: 2, condText: '2 <= 3', isTruth: true, printed: '2', actionNote: 'count += 1 → count becomes 3' },
      { iteration: 3, val: 3, condText: '3 <= 3', isTruth: true, printed: '3', actionNote: 'count += 1 → count becomes 4' },
      { iteration: 4, val: 4, condText: '4 <= 3', isTruth: false, printed: 'Loop Done', actionNote: '✅ Condition is False! Loop terminates cleanly.' }
    ]
  }
];

export const InfiniteLoopSafetyWidget: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('missing-update');
  const [stepIdx, setStepIdx] = useState<number>(0);

  const scenario = SCENARIOS.find(s => s.id === selectedId) || SCENARIOS[0];
  const step = scenario.steps[Math.min(stepIdx, scenario.steps.length - 1)];

  return (
    <div className="my-8 bg-[#020617] border border-amber-500/30 rounded-3xl p-6 shadow-2xl shadow-amber-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500/20 border border-amber-400/40 rounded-2xl flex items-center justify-center text-amber-400">
            <AlertTriangle size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Safe Infinite Loop Inspector
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30 uppercase tracking-wide">
                Safety Sandbox
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Simulate common loop termination mistakes safely without freezing your browser.
            </p>
          </div>
        </div>

        {/* Scenario selector */}
        <select
          value={selectedId}
          onChange={(e) => {
            setSelectedId(e.target.value);
            setStepIdx(0);
          }}
          className="bg-slate-900 border border-amber-500/30 text-xs text-amber-200 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400 w-full md:w-64 font-semibold"
        >
          {SCENARIOS.map(s => (
            <option key={s.id} value={s.id}>
              {s.title} ({s.type})
            </option>
          ))}
        </select>
      </div>

      {/* Code & Step Tracer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Code Snippet & Diagnosis */}
        <div className="space-y-4">
          <div className="bg-slate-950 rounded-2xl border border-white/10 overflow-hidden shadow-xl">
            <div className="bg-slate-900/80 px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400">loop_inspector.py</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                scenario.type === 'INFINITE' 
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                {scenario.type === 'INFINITE' ? '⚠ NON-TERMINATING' : '✓ FINITE'}
              </span>
            </div>

            <div className="p-4 font-mono text-xs space-y-1 bg-black/60">
              {scenario.code.map((line, idx) => (
                <div key={idx} className="flex items-center px-3 py-1 text-gray-300">
                  <span className="w-6 text-gray-600 text-[11px]">{idx + 1}</span>
                  <span className={line.includes('# BUG') ? 'text-red-400 font-bold' : ''}>{line}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnosis & Fix Banner */}
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Bug size={16} /> Diagnosis:
            </div>
            <p className="text-gray-300">{scenario.explanation}</p>
            <div className="pt-2 border-t border-white/10 text-emerald-400 font-bold flex items-center gap-2">
              <CheckCircle2 size={16} /> Solution Fix:
            </div>
            <p className="text-emerald-300 font-mono">{scenario.fix}</p>
          </div>
        </div>

        {/* Right: Simulation Trace Output */}
        <div className="space-y-4">
          <div className="bg-slate-950 rounded-2xl border border-white/10 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                Step-by-step Trace Simulation
              </span>
              <span className="text-xs font-mono text-amber-400">
                Step {stepIdx + 1} of {scenario.steps.length}
              </span>
            </div>

            {/* Stepper buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStepIdx(Math.max(0, stepIdx - 1))}
                disabled={stepIdx === 0}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 disabled:opacity-40 rounded-xl text-xs font-semibold text-gray-300 border border-white/10"
              >
                Previous
              </button>
              <button
                onClick={() => setStepIdx(Math.min(scenario.steps.length - 1, stepIdx + 1))}
                disabled={stepIdx === scenario.steps.length - 1}
                className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 rounded-xl text-xs font-bold text-white shadow-md shadow-amber-600/30"
              >
                Next Step
              </button>
              <button
                onClick={() => setStepIdx(0)}
                className="p-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white border border-white/10"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            {/* Step card */}
            <div className="bg-black/70 border border-amber-500/20 rounded-2xl p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-gray-400">
                <span>Iteration: <strong className="text-white">{step.iteration}</strong></span>
                <span>Condition: <strong className="text-amber-300">{step.condText}</strong></span>
              </div>
              <div className="text-gray-300">
                Result: <span className={step.isTruth ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                  {step.isTruth ? 'True (Continue)' : 'False (Terminate)'}
                </span>
              </div>
              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-white/10 text-amber-200">
                📌 Note: {step.actionNote}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
