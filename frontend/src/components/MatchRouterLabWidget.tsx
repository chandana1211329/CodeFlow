import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RefreshCw, Command, CheckCircle2, GitFork, AlertCircle } from 'lucide-react';

interface CaseStatus {
  pattern: string;
  status: 'CHECKED_NO_MATCH' | 'MATCHED' | 'WILDCARD_MATCHED' | 'SKIPPED';
  assignedAction: string;
}

export const MatchRouterLabWidget: React.FC = () => {
  const [command, setCommand] = useState<string>('pause');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const commandPresets = ['start', 'pause', 'stop', 'status', 'info', 'restart'];

  // Determine case status ladder dynamically based on command
  const isStart = command === 'start';
  const isPause = command === 'pause';
  const isStop = command === 'stop';
  const isStatusOrInfo = command === 'status' || command === 'info';
  const isWildcard = !isStart && !isPause && !isStop && !isStatusOrInfo;

  const case1: CaseStatus = {
    pattern: 'case "start":',
    status: isStart ? 'MATCHED' : 'CHECKED_NO_MATCH',
    assignedAction: 'Starting system',
  };

  const case2: CaseStatus = {
    pattern: 'case "pause":',
    status: isStart ? 'SKIPPED' : isPause ? 'MATCHED' : 'CHECKED_NO_MATCH',
    assignedAction: 'Pausing system',
  };

  const case3: CaseStatus = {
    pattern: 'case "stop":',
    status: isStart || isPause ? 'SKIPPED' : isStop ? 'MATCHED' : 'CHECKED_NO_MATCH',
    assignedAction: 'Stopping system',
  };

  const case4: CaseStatus = {
    pattern: 'case "status" | "info":',
    status: isStart || isPause || isStop ? 'SKIPPED' : isStatusOrInfo ? 'MATCHED' : 'CHECKED_NO_MATCH',
    assignedAction: 'Showing system status',
  };

  const caseDefault: CaseStatus = {
    pattern: 'case _:',
    status: isWildcard ? 'WILDCARD_MATCHED' : 'SKIPPED',
    assignedAction: 'Unknown command',
  };

  const cases = [case1, case2, case3, case4, caseDefault];
  const matchedCase = cases.find((c) => c.status === 'MATCHED' || c.status === 'WILDCARD_MATCHED') || caseDefault;

  // Build step-by-step trace steps
  const traceSteps = [
    {
      num: 1,
      title: '1. Subject Assignment & Print Command',
      desc: `command is set to "${command}". Line 2 prints "Command received: ${command}".`,
      output: `Command received: ${command}`,
      activeLineIndex: 1,
    },
    {
      num: 2,
      title: `2. Evaluate Match Subject (match command:)`,
      desc: `Subject evaluated: "${command}". Python begins scanning case patterns top-to-bottom.`,
      output: null,
      activeLineIndex: 2,
    },
    {
      num: 3,
      title: `3. Case Pattern Scanning`,
      desc: isWildcard
        ? `Checked all specific patterns ("start", "pause", "stop", "status" | "info"). None matched! Reached default wildcard case _.`
        : `Scanned patterns up to ${matchedCase.pattern}. Match found: "${command}" matches ${matchedCase.pattern}!`,
      output: null,
      activeLineIndex: isStart
        ? 3
        : isPause
        ? 5
        : isStop
        ? 7
        : isStatusOrInfo
        ? 9
        : 11,
    },
    {
      num: 4,
      title: `4. Execute Selected Case (${matchedCase.pattern})`,
      desc: `Selected case assigns action = "${matchedCase.assignedAction}". All remaining cases in the match statement are SKIPPED.`,
      output: null,
      activeLineIndex: isStart
        ? 4
        : isPause
        ? 6
        : isStop
        ? 8
        : isStatusOrInfo
        ? 10
        : 12,
    },
    {
      num: 5,
      title: '5. Exit match & Print Result',
      desc: `Execution exits the match statement. Line 14 prints action ("${matchedCase.assignedAction}").`,
      output: matchedCase.assignedAction,
      activeLineIndex: 14,
    },
    {
      num: 6,
      title: '6. Program Completion',
      desc: 'Line 15 prints "Command complete". Program execution complete!',
      output: 'Command complete',
      activeLineIndex: 15,
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
          <div className="w-10 h-10 bg-cyan-600/20 border border-cyan-400/30 rounded-2xl flex items-center justify-center text-cyan-400">
            <Command size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Command Router (match-case Visualizer)
            </h3>
            <p className="text-xs text-gray-400">
              Inspect match subjects, case pattern matching, OR patterns &amp; wildcard defaults
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono"
        >
          <RefreshCw size={14} /> Restart Trace
        </button>
      </div>

      {/* Input Presets & Custom Input */}
      <div className="space-y-3 font-mono text-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            Select or Type Command Input:
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={command}
              onChange={(e) => {
                setCommand(e.target.value);
                setCurrentStepIndex(0);
              }}
              className="bg-black/60 border border-cyan-500/30 rounded-xl px-3 py-1.5 text-cyan-300 focus:outline-none w-36"
              placeholder="e.g. restart"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {commandPresets.map((preset) => (
            <button
              key={preset}
              onClick={() => {
                setCommand(preset);
                setCurrentStepIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl border transition-all ${
                command === preset
                  ? 'bg-cyan-600 border-cyan-400 text-white font-bold shadow-lg shadow-cyan-600/30'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
              }`}
            >
              "{preset}"
            </button>
          ))}
        </div>
      </div>

      {/* Case Pattern Scanner Status */}
      <div className="bg-black/60 border border-white/10 rounded-2xl p-4 space-y-3 font-mono text-xs">
        <div className="text-[10px] text-gray-500 uppercase font-bold border-b border-white/5 pb-2 flex items-center justify-between">
          <span>CASE PATTERN SCANNER</span>
          <span className="text-cyan-400">SUBJECT = "{command}"</span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {cases.map((c, idx) => {
            let badgeBg = 'bg-gray-800 text-gray-400 border-gray-700';
            let statusLabel = 'SKIPPED';

            if (c.status === 'MATCHED') {
              badgeBg = 'bg-cyan-950 text-cyan-300 border-cyan-500/50 font-bold';
              statusLabel = '★ MATCHED';
            } else if (c.status === 'WILDCARD_MATCHED') {
              badgeBg = 'bg-emerald-950 text-emerald-300 border-emerald-500/50 font-bold';
              statusLabel = '★ WILDCARD MATCH (case _)';
            } else if (c.status === 'CHECKED_NO_MATCH') {
              badgeBg = 'bg-red-950 text-red-300 border-red-500/50';
              statusLabel = 'CHECKED (NO MATCH)';
            }

            return (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-[10px] w-6">#{idx + 1}</span>
                  <span className="font-bold text-white">{c.pattern}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] border uppercase ${badgeBg}`}>
                  {statusLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Code & Step Trace */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
        <div className="bg-black/60 border border-white/10 rounded-2xl p-4 flex flex-col justify-between space-y-3">
          <div className="text-[10px] text-gray-500 uppercase font-bold border-b border-white/5 pb-2">
            TERMINAL OUTPUT
          </div>
          <div className="bg-black p-3 rounded-xl border border-white/10 min-h-[100px] text-emerald-400 space-y-1">
            {currentOutputs.length === 0 ? (
              <span className="text-gray-600 italic">[No output printed yet]</span>
            ) : (
              currentOutputs.map((out, i) => <div key={i}>&gt; {out}</div>)
            )}
          </div>
        </div>

        <div className="bg-black/60 border border-white/10 rounded-2xl p-4 flex flex-col justify-between space-y-3">
          <div>
            <div className="text-[10px] text-cyan-400 uppercase font-bold border-b border-white/5 pb-2">
              {currentStep.title}
            </div>
            <p className="text-gray-300 text-xs font-sans pt-2">{currentStep.desc}</p>
          </div>

          <div className="flex justify-end pt-2">
            {currentStepIndex < traceSteps.length - 1 ? (
              <button
                onClick={handleNextStep}
                className="w-full sm:w-auto px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs shadow-lg shadow-cyan-600/30"
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
