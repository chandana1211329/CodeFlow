import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RefreshCw, Layers, CheckCircle2, AlertCircle, CornerDownRight } from 'lucide-react';

interface TestCase {
  id: string;
  name: string;
  age: number;
  hasTicket: boolean;
  seatAvailable: boolean;
}

export const NestedDecisionLabWidget: React.FC = () => {
  const testCases: TestCase[] = [
    { id: 'case-d', name: 'All Pass (Age 20, Ticket True, Seat True)', age: 20, hasTicket: true, seatAvailable: true },
    { id: 'case-a', name: 'Fail Level 1 (Age 15, Ticket True, Seat True)', age: 15, hasTicket: true, seatAvailable: true },
    { id: 'case-b', name: 'Fail Level 2 (Age 20, Ticket False, Seat True)', age: 20, hasTicket: false, seatAvailable: true },
    { id: 'case-c', name: 'Fail Level 3 (Age 20, Ticket True, Seat False)', age: 20, hasTicket: true, seatAvailable: false },
  ];

  const [selectedCaseId, setSelectedCaseId] = useState<string>('case-d');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const selectedCase = testCases.find((c) => c.id === selectedCaseId) || testCases[0];

  const { age, hasTicket, seatAvailable } = selectedCase;

  const level1Pass = age >= 18;
  const level2Pass = level1Pass && hasTicket;
  const level3Pass = level2Pass && seatAvailable;

  // Build step sequence based on test case
  const traceSteps = [
    {
      num: 1,
      title: '1. Program Start & Variable Init',
      desc: `age = ${age}, has_ticket = ${hasTicket ? 'True' : 'False'}, seat_available = ${seatAvailable ? 'True' : 'False'}. Line 2 prints "Checking entry...".`,
      output: 'Checking entry...',
      activeLineIndex: 1,
      depth: 0,
    },
    {
      num: 2,
      title: '2. Check Decision Level 1 (age >= 18)',
      desc: `${age} >= 18 evaluates to ${level1Pass ? 'True (ENTER LEVEL 1 BLOCK)' : 'False (SKIP LEVEL 1 BLOCK)'}.`,
      output: null,
      activeLineIndex: 2,
      depth: 0,
    },
    ...(level1Pass
      ? [
          {
            num: 3,
            title: '3. Execute Level 1 Outer Statement',
            desc: 'Inside Level 1 block. Line 3 prints "Age verified".',
            output: 'Age verified',
            activeLineIndex: 3,
            depth: 1,
          },
          {
            num: 4,
            title: '4. Check Decision Level 2 (has_ticket)',
            desc: `has_ticket evaluates to ${hasTicket ? 'True (ENTER LEVEL 2 BLOCK)' : 'False (SKIP LEVEL 2 BLOCK)'}.`,
            output: null,
            activeLineIndex: 5,
            depth: 1,
          },
          ...(hasTicket
            ? [
                {
                  num: 5,
                  title: '5. Execute Level 2 Statement',
                  desc: 'Inside Level 2 block. Line 6 prints "Ticket verified".',
                  output: 'Ticket verified',
                  activeLineIndex: 6,
                  depth: 2,
                },
                {
                  num: 6,
                  title: '6. Check Decision Level 3 (seat_available)',
                  desc: `seat_available evaluates to ${seatAvailable ? 'True (ENTER LEVEL 3 BLOCK)' : 'False (SKIP LEVEL 3 BLOCK)'}.`,
                  output: null,
                  activeLineIndex: 8,
                  depth: 2,
                },
                ...(seatAvailable
                  ? [
                      {
                        num: 7,
                        title: '7. Execute Level 3 Deep Statement',
                        desc: 'Inside Level 3 block! Variable status = "Entry confirmed" is assigned and printed.',
                        output: 'Entry confirmed',
                        activeLineIndex: 10,
                        depth: 3,
                      },
                    ]
                  : []),
              ]
            : []),
        ]
      : []),
    {
      num: 8,
      title: '8. Program Rejoin & Completion',
      desc: 'Execution leaves all nested decision levels and returns to Level 0. Line 12 prints "Check complete".',
      output: 'Check complete',
      activeLineIndex: 12,
      depth: 0,
    },
  ];

  const currentStep = traceSteps[Math.min(currentStepIndex, traceSteps.length - 1)];

  // Aggregate outputs up to current step
  const currentOutputs: string[] = [];
  for (let i = 0; i <= currentStepIndex && i < traceSteps.length; i++) {
    if (traceSteps[i].output) {
      currentOutputs.push(traceSteps[i].output!);
    }
  }

  const handleNextStep = () => {
    if (currentStepIndex < traceSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
  };

  return (
    <div className="my-8 bg-[#020617] border border-blue-500/30 rounded-3xl p-6 shadow-2xl shadow-blue-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600/20 border border-indigo-400/30 rounded-2xl flex items-center justify-center text-indigo-400">
            <Layers size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Pass Through the Decision Levels (Nested if Visualizer)
            </h3>
            <p className="text-xs text-gray-400">
              Observe decision depth, level entry/exit &amp; unreached nested conditions
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono"
        >
          <RefreshCw size={14} /> Reset Trace
        </button>
      </div>

      {/* Preset Selector */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block font-mono">
          Select Test Scenario:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {testCases.map((tc) => (
            <button
              key={tc.id}
              onClick={() => {
                setSelectedCaseId(tc.id);
                setCurrentStepIndex(0);
              }}
              className={`p-3 rounded-xl font-mono text-xs border text-left transition-all ${
                selectedCaseId === tc.id
                  ? 'bg-indigo-600 border-indigo-400 text-white font-bold shadow-lg shadow-indigo-600/30'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
              }`}
            >
              {tc.name}
            </button>
          ))}
        </div>
      </div>

      {/* Decision Depth Indicator */}
      <div className="bg-black/60 border border-white/10 rounded-2xl p-4 space-y-2 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <span className="text-[10px] text-gray-500 uppercase font-bold">CURRENT DECISION DEPTH</span>
          <span className="text-cyan-400 font-bold">Level {currentStep.depth}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
          <div className={`p-2 rounded-xl border ${level1Pass ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 font-bold' : 'bg-red-950/60 border-red-500/50 text-red-300'}`}>
            LEVEL 1: age &gt;= 18 <br />
            <span className="text-[9px] uppercase">{level1Pass ? 'PASSED' : 'FAILED (STOP)'}</span>
          </div>

          <div className={`p-2 rounded-xl border ${!level1Pass ? 'bg-gray-900 border-gray-800 text-gray-600' : level2Pass ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 font-bold' : 'bg-red-950/60 border-red-500/50 text-red-300'}`}>
            LEVEL 2: has_ticket <br />
            <span className="text-[9px] uppercase">{!level1Pass ? 'NOT REACHED' : level2Pass ? 'PASSED' : 'FAILED (STOP)'}</span>
          </div>

          <div className={`p-2 rounded-xl border ${!level2Pass ? 'bg-gray-900 border-gray-800 text-gray-600' : level3Pass ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 font-bold' : 'bg-red-950/60 border-red-500/50 text-red-300'}`}>
            LEVEL 3: seat_available <br />
            <span className="text-[9px] uppercase">{!level2Pass ? 'NOT REACHED' : level3Pass ? 'PASSED' : 'FAILED (STOP)'}</span>
          </div>
        </div>
      </div>

      {/* Code View & Step Trace */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        {/* Indented Code View */}
        <div className="bg-black/60 border border-white/10 rounded-2xl p-4 space-y-1">
          <div className="text-[10px] text-gray-500 uppercase font-bold border-b border-white/5 pb-2 mb-2">
            NESTED CODE STRUCTURE &amp; INDENTATION
          </div>

          {[
            { idx: 0, text: `age = ${age}; ticket = ${hasTicket}; seat = ${seatAvailable}`, depth: 0 },
            { idx: 1, text: 'print("Checking entry...")', depth: 0 },
            { idx: 2, text: 'if age >= 18:', depth: 0, label: 'L1' },
            { idx: 3, text: '    print("Age verified")', depth: 1 },
            { idx: 4, text: '', depth: 1 },
            { idx: 5, text: '    if has_ticket:', depth: 1, label: 'L2' },
            { idx: 6, text: '        print("Ticket verified")', depth: 2 },
            { idx: 7, text: '', depth: 2 },
            { idx: 8, text: '        if seat_available:', depth: 2, label: 'L3' },
            { idx: 9, text: '            status = "Entry confirmed"', depth: 3 },
            { idx: 10, text: '            print(status)', depth: 3 },
            { idx: 11, text: '', depth: 0 },
            { idx: 12, text: 'print("Check complete")', depth: 0 },
          ].map((line) => {
            if (line.text === '') return null;
            const isActive = currentStep.activeLineIndex === line.idx;

            let lineStyle = 'text-gray-400';
            if (isActive) {
              lineStyle = 'bg-blue-900/50 border border-blue-400 text-white font-bold shadow-lg';
            }

            return (
              <div
                key={line.idx}
                className={`px-3 py-1 rounded-xl transition-all flex items-center justify-between ${lineStyle}`}
              >
                <div className="flex items-center gap-2">
                  {isActive && <CornerDownRight size={14} className="text-cyan-400 animate-pulse" />}
                  <span>{line.text}</span>
                </div>
                {line.label && (
                  <span className="text-[9px] text-cyan-400/80 font-sans border border-cyan-500/30 px-1.5 py-0.5 rounded">
                    {line.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Terminal Output & Trace Explanation */}
        <div className="bg-black/60 border border-white/10 rounded-2xl p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-[10px] text-gray-500 uppercase font-bold border-b border-white/5 pb-2 mb-2 flex items-center justify-between">
              <span>TERMINAL OUTPUT</span>
              <span className="text-indigo-400">Step {currentStep.num} of {traceSteps.length}</span>
            </div>

            <div className="bg-black p-3 rounded-xl border border-white/10 min-h-[110px] text-emerald-400 space-y-1">
              {currentOutputs.length === 0 ? (
                <span className="text-gray-600 italic">[No output printed yet]</span>
              ) : (
                currentOutputs.map((out, i) => <div key={i}>&gt; {out}</div>)
              )}
            </div>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-2 font-sans">
            <span className="text-[10px] text-indigo-400 uppercase font-bold block">{currentStep.title}</span>
            <p className="text-gray-300 text-xs">{currentStep.desc}</p>
          </div>

          <div className="flex justify-end pt-2">
            {currentStepIndex < traceSteps.length - 1 ? (
              <button
                onClick={handleNextStep}
                className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs shadow-lg shadow-indigo-600/30"
              >
                Next Step <ArrowRight size={14} />
              </button>
            ) : (
              <div className="w-full bg-emerald-600/20 border border-emerald-500/40 p-2.5 rounded-xl text-emerald-300 font-bold text-xs flex items-center justify-center gap-2">
                <CheckCircle2 size={16} /> Trace Complete!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
