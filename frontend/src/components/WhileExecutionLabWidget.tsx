import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, RotateCcw, ArrowRight, ArrowLeft, RefreshCw, 
  CheckCircle2, AlertTriangle, Layers, PlayCircle, PauseCircle, FastForward
} from 'lucide-react';

interface PresetConfig {
  id: string;
  name: string;
  code: string[];
  start: number;
  limit: number;
  step: number;
  operator: '<=' | '<' | '>' | '>=';
  isInfiniteWarning?: boolean;
  notes: string;
}

const PRESETS: PresetConfig[] = [
  {
    id: 'standard-counter',
    name: '1. Standard Counter (count <= 3)',
    code: [
      'count = 1',
      'while count <= 3:',
      '    print(count)',
      '    count += 1',
      'print("Done")'
    ],
    start: 1,
    limit: 3,
    step: 1,
    operator: '<=',
    notes: 'Standard counting up loop from 1 to 3 with +1 update.'
  },
  {
    id: 'final-challenge',
    name: '2. Final Section Challenge (count <= 4)',
    code: [
      'count = 1',
      'print("Starting loop")',
      'while count <= 4:',
      '    print("Count:", count)',
      '    count += 1',
      'print("Final count:", count)',
      'print("Loop finished")'
    ],
    start: 1,
    limit: 4,
    step: 1,
    operator: '<=',
    notes: 'Complete loop execution trace with header and footer prints.'
  },
  {
    id: 'count-down',
    name: '3. Count Down (number > 0)',
    code: [
      'number = 5',
      'while number > 0:',
      '    print(number)',
      '    number -= 1',
      'print("Blastoff!")'
    ],
    start: 5,
    limit: 0,
    step: -1,
    operator: '>',
    notes: 'Decrementing loop variable using -= 1 until condition number > 0 becomes False.'
  },
  {
    id: 'step-by-two',
    name: '4. Even Stepper (count <= 6, step 2)',
    code: [
      'count = 0',
      'while count <= 6:',
      '    print(count)',
      '    count += 2',
      'print("Complete")'
    ],
    start: 0,
    limit: 6,
    step: 2,
    operator: '<=',
    notes: 'Update amount is +2, counting even numbers 0, 2, 4, 6.'
  },
  {
    id: 'missing-update',
    name: '5. Missing Update (Infinite Loop Warning)',
    code: [
      'count = 1',
      'while count <= 3:',
      '    print(count)',
      '    # NO UPDATE HERE!',
      'print("Done")'
    ],
    start: 1,
    limit: 3,
    step: 0,
    operator: '<=',
    isInfiniteWarning: true,
    notes: 'Warning: Missing variable update causes count to remain 1 forever.'
  }
];

export const WhileExecutionLabWidget: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('standard-counter');
  const [startVal, setStartVal] = useState<number>(1);
  const [limitVal, setLimitVal] = useState<number>(3);
  const [stepVal, setStepVal] = useState<number>(1);
  const [operator, setOperator] = useState<'<=' | '<' | '>' | '>='>('<=');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  const preset = PRESETS.find(p => p.id === selectedPresetId) || PRESETS[0];

  const handleSelectPreset = (p: PresetConfig) => {
    setSelectedPresetId(p.id);
    setStartVal(p.start);
    setLimitVal(p.limit);
    setStepVal(p.step);
    setOperator(p.operator);
    setCurrentStepIndex(0);
    setIsAutoPlaying(false);
  };

  // Generate trace execution steps dynamically based on current start/limit/step/op configuration
  const buildTraceSteps = () => {
    const steps: {
      type: 'INIT' | 'HEADER' | 'CHECK' | 'PRINT' | 'UPDATE' | 'BACK' | 'EXIT' | 'FOOTER';
      iteration: number;
      checkNumber: number;
      varValue: number;
      conditionExpr: string;
      isTruth: boolean;
      activeLineIndex: number;
      description: string;
      outputLine?: string;
      newValue?: number;
    }[] = [];

    const evalCond = (val: number) => {
      switch (operator) {
        case '<=': return val <= limitVal;
        case '<': return val < limitVal;
        case '>': return val > limitVal;
        case '>=': return val >= limitVal;
      }
    };

    let current = startVal;
    let iter = 1;
    let checkNum = 1;

    // Handle preset specific code lines
    if (preset.id === 'final-challenge') {
      steps.push({
        type: 'INIT',
        iteration: 0,
        checkNumber: 0,
        varValue: current,
        conditionExpr: '',
        isTruth: true,
        activeLineIndex: 0,
        description: `Initialization: count is set to ${current}.`
      });
      steps.push({
        type: 'HEADER',
        iteration: 0,
        checkNumber: 0,
        varValue: current,
        conditionExpr: '',
        isTruth: true,
        activeLineIndex: 1,
        description: 'Executing line 2: print("Starting loop")',
        outputLine: 'Starting loop'
      });
    } else {
      steps.push({
        type: 'INIT',
        iteration: 0,
        checkNumber: 0,
        varValue: current,
        conditionExpr: '',
        isTruth: true,
        activeLineIndex: 0,
        description: `Initialization: variable is set to ${current}.`
      });
    }

    const maxSimulatedSteps = 15; // prevent browser crash on infinite loop simulation
    let countSteps = 0;

    while (countSteps < maxSimulatedSteps) {
      countSteps++;
      const condResult = evalCond(current);
      const condExpr = `${current} ${operator} ${limitVal}`;
      const whileLine = preset.id === 'final-challenge' ? 2 : 1;

      if (!condResult) {
        // Condition check failed - exit loop
        steps.push({
          type: 'CHECK',
          iteration: iter,
          checkNumber: checkNum,
          varValue: current,
          conditionExpr: condExpr,
          isTruth: false,
          activeLineIndex: whileLine,
          description: `Condition Check #${checkNum}: ${condExpr} → False! Condition is falsy. DO NOT ENTER LOOP BODY.`
        });
        steps.push({
          type: 'EXIT',
          iteration: iter,
          checkNumber: checkNum,
          varValue: current,
          conditionExpr: condExpr,
          isTruth: false,
          activeLineIndex: preset.code.length - 1,
          description: `Loop Termination: Execution exits loop. Moving to code below loop block.`
        });

        if (preset.id === 'final-challenge') {
          steps.push({
            type: 'FOOTER',
            iteration: iter,
            checkNumber: checkNum,
            varValue: current,
            conditionExpr: condExpr,
            isTruth: false,
            activeLineIndex: 5,
            description: `Executing line 6: print("Final count:", ${current})`,
            outputLine: `Final count: ${current}`
          });
          steps.push({
            type: 'FOOTER',
            iteration: iter,
            checkNumber: checkNum,
            varValue: current,
            conditionExpr: condExpr,
            isTruth: false,
            activeLineIndex: 6,
            description: `Executing line 7: print("Loop finished")`,
            outputLine: 'Loop finished'
          });
        } else if (preset.id === 'count-down') {
          steps.push({
            type: 'FOOTER',
            iteration: iter,
            checkNumber: checkNum,
            varValue: current,
            conditionExpr: condExpr,
            isTruth: false,
            activeLineIndex: 4,
            description: 'Executing line 5: print("Blastoff!")',
            outputLine: 'Blastoff!'
          });
        } else {
          steps.push({
            type: 'FOOTER',
            iteration: iter,
            checkNumber: checkNum,
            varValue: current,
            conditionExpr: condExpr,
            isTruth: false,
            activeLineIndex: preset.code.length - 1,
            description: `Executing line ${preset.code.length}: print("Done")`,
            outputLine: preset.id === 'step-by-two' ? 'Complete' : 'Done'
          });
        }
        break;
      }

      // Condition is True
      steps.push({
        type: 'CHECK',
        iteration: iter,
        checkNumber: checkNum,
        varValue: current,
        conditionExpr: condExpr,
        isTruth: true,
        activeLineIndex: whileLine,
        description: `Condition Check #${checkNum}: ${condExpr} → True! Condition is truthy. ENTER LOOP BODY.`
      });

      // Body Statement 1: Print
      const printLine = preset.id === 'final-challenge' ? 3 : 2;
      let printOutput = `${current}`;
      if (preset.id === 'final-challenge') {
        printOutput = `Count: ${current}`;
      }

      steps.push({
        type: 'PRINT',
        iteration: iter,
        checkNumber: checkNum,
        varValue: current,
        conditionExpr: condExpr,
        isTruth: true,
        activeLineIndex: printLine,
        description: `Iteration #${iter} Body: Executing print statement. Outputting ${printOutput}.`,
        outputLine: printOutput
      });

      // Body Statement 2: Update
      if (stepVal === 0 || preset.isInfiniteWarning) {
        steps.push({
          type: 'UPDATE',
          iteration: iter,
          checkNumber: checkNum,
          varValue: current,
          conditionExpr: condExpr,
          isTruth: true,
          activeLineIndex: 3,
          description: `⚠️ WARNING: No state update executed! Variable remains ${current}. Loop will repeat indefinitely!`,
          newValue: current
        });
        steps.push({
          type: 'BACK',
          iteration: iter,
          checkNumber: checkNum,
          varValue: current,
          conditionExpr: condExpr,
          isTruth: true,
          activeLineIndex: whileLine,
          description: `↺ BACK EDGE: Execution returns to while condition check. Variable is still ${current}.`
        });
        iter++;
        checkNum++;
        if (iter > 3) {
          // Cap simulated infinite loop steps
          steps.push({
            type: 'EXIT',
            iteration: iter,
            checkNumber: checkNum,
            varValue: current,
            conditionExpr: condExpr,
            isTruth: true,
            activeLineIndex: whileLine,
            description: `[SIMULATION PAUSED]: Infinite loop detected! Stopped after 3 iterations to protect browser.`
          });
          break;
        }
      } else {
        const updateLine = preset.id === 'final-challenge' ? 4 : 3;
        const nextVal = current + stepVal;
        const opSymbol = stepVal > 0 ? `+ ${stepVal}` : `- ${Math.abs(stepVal)}`;
        steps.push({
          type: 'UPDATE',
          iteration: iter,
          checkNumber: checkNum,
          varValue: current,
          conditionExpr: condExpr,
          isTruth: true,
          activeLineIndex: updateLine,
          description: `Iteration #${iter} Update: Executing state change (variable ${opSymbol}). Value changes: ${current} → ${nextVal}.`,
          newValue: nextVal
        });

        steps.push({
          type: 'BACK',
          iteration: iter,
          checkNumber: checkNum,
          varValue: nextVal,
          conditionExpr: condExpr,
          isTruth: true,
          activeLineIndex: whileLine,
          description: `↺ BACK EDGE: End of loop body reached. Moving execution BACK UP to evaluate condition check #${checkNum + 1}.`
        });

        current = nextVal;
        iter++;
        checkNum++;
      }
    }

    return steps;
  };

  const traceSteps = buildTraceSteps();
  const step = traceSteps[Math.min(currentStepIndex, traceSteps.length - 1)];

  // Gather output log lines up to current step index
  const consoleOutputs: string[] = [];
  for (let i = 0; i <= currentStepIndex && i < traceSteps.length; i++) {
    if (traceSteps[i].outputLine) {
      consoleOutputs.push(traceSteps[i].outputLine!);
    }
  }

  // Count total iterations completed so far
  const completedIterations = Math.max(0, step.iteration - (step.type === 'CHECK' && !step.isTruth ? 1 : 0));
  const totalConditionChecks = step.checkNumber > 0 ? step.checkNumber : 1;

  const handleNext = () => {
    if (currentStepIndex < traceSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsAutoPlaying(false);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsAutoPlaying(false);
  };

  React.useEffect(() => {
    let timer: any;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev >= traceSteps.length - 1) {
            setIsAutoPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, traceSteps.length]);

  return (
    <div className="my-8 bg-[#020617] border border-blue-500/30 rounded-3xl p-6 shadow-2xl shadow-blue-500/10 text-white space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600/20 border border-blue-400/30 rounded-2xl flex items-center justify-center text-blue-400">
            <RefreshCw size={22} className="animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Signature While Loop Visualizer
              <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-400/30 uppercase tracking-wide">
                Interactive Tracer
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Observe condition checks, loop body executions, state updates, and back-edge cycles in real-time.
            </p>
          </div>
        </div>

        {/* Preset Selector Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="text-xs text-gray-400 font-semibold whitespace-nowrap">Preset:</label>
          <select
            value={selectedPresetId}
            onChange={(e) => {
              const p = PRESETS.find(pr => pr.id === e.target.value);
              if (p) handleSelectPreset(p);
            }}
            className="bg-slate-900 border border-blue-500/30 text-xs text-blue-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-400 w-full md:w-64"
          >
            {PRESETS.map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Preset Note Banner */}
      <div className="bg-blue-950/40 border border-blue-500/20 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-blue-200">
        <Layers size={16} className="text-blue-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-blue-300">Preset Info: </span>
          {preset.notes}
        </div>
      </div>

      {/* Controls & Stepper Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/70 border border-white/10 p-4 rounded-2xl">
        {/* Step Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-white/5 rounded-xl text-xs font-semibold text-gray-200 border border-white/10 transition-colors"
          >
            <ArrowLeft size={14} /> Prev
          </button>
          <button
            onClick={handleNext}
            disabled={currentStepIndex === traceSteps.length - 1}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 rounded-xl text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition-all"
          >
            Next <ArrowRight size={14} />
          </button>
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              isAutoPlaying 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30' 
                : 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-600/30'
            }`}
          >
            {isAutoPlaying ? <PauseCircle size={14} /> : <PlayCircle size={14} />}
            {isAutoPlaying ? 'Pause' : 'Auto Play'}
          </button>
          <button
            onClick={handleReset}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white border border-white/10 transition-colors"
            title="Reset simulation"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Step Progress indicator */}
        <div className="flex items-center justify-center gap-3 font-mono text-xs text-gray-300">
          <span className="text-gray-400">Step:</span>
          <span className="bg-blue-500/20 text-blue-300 font-bold px-2.5 py-1 rounded-lg border border-blue-500/30">
            {currentStepIndex + 1} / {traceSteps.length}
          </span>
        </div>

        {/* Start / Condition / Update Badge Panel */}
        <div className="flex items-center justify-end gap-2 text-[11px] font-mono">
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-lg">
            START: {startVal}
          </span>
          <span className="bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-1 rounded-lg">
            LIMIT: {operator} {limitVal}
          </span>
          <span className="bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-1 rounded-lg">
            STEP: {stepVal >= 0 ? `+${stepVal}` : stepVal}
          </span>
        </div>
      </div>

      {/* Main Execution Split View: Code & Output + Visual Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Code Window & Console Terminal */}
        <div className="space-y-4">
          {/* Python Code Window */}
          <div className="bg-slate-950 rounded-2xl border border-white/10 overflow-hidden shadow-xl">
            <div className="bg-slate-900/80 px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="text-xs font-mono text-gray-400 ml-2">while_loop.py</span>
              </div>
              <span className="text-[11px] text-gray-500 font-mono">Python 3</span>
            </div>

            <div className="p-4 font-mono text-xs space-y-1 bg-black/60">
              {preset.code.map((lineStr, lineIdx) => {
                const isActive = step.activeLineIndex === lineIdx;
                const isWhileLine = lineStr.trim().startsWith('while');
                const isBodyLine = lineIdx > 0 && lineIdx < preset.code.length - 1 && !isWhileLine;
                
                return (
                  <div
                    key={lineIdx}
                    className={`flex items-center px-3 py-1.5 rounded-lg transition-all ${
                      isActive
                        ? 'bg-blue-600/30 border-l-4 border-blue-400 text-white font-bold shadow-md shadow-blue-500/20'
                        : 'text-gray-300 opacity-80'
                    }`}
                  >
                    <span className="w-6 text-gray-600 shrink-0 select-none text-[11px]">
                      {lineIdx + 1}
                    </span>
                    <span className={`whitespace-pre ${isWhileLine ? 'text-amber-300 font-semibold' : ''}`}>
                      {lineStr}
                    </span>
                    {isActive && (
                      <span className="ml-auto text-[10px] bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded border border-blue-400/40">
                        EXECUTING
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Output Terminal */}
          <div className="bg-slate-950 rounded-2xl border border-white/10 p-4 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Terminal Output Stream
              </span>
              <span className="text-[10px] text-gray-500">Standard Output (stdout)</span>
            </div>

            <div className="min-h-[90px] bg-black/70 rounded-xl p-3 space-y-1 text-emerald-400 font-mono border border-emerald-500/10">
              {consoleOutputs.length === 0 ? (
                <span className="text-gray-600 italic">[No output produced yet]</span>
              ) : (
                consoleOutputs.map((out, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-gray-600 select-none">&gt;</span>
                    <span>{out}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: CodeFlow Interactive Visual Flowchart & Step Explanation */}
        <div className="space-y-4">
          {/* Active Step Description Card */}
          <div className="bg-slate-950/90 border border-blue-500/20 rounded-2xl p-4 space-y-2 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Current Phase
              </span>
              <span className="text-[11px] font-mono text-gray-400">
                Phase: <strong className="text-white">{step.type}</strong>
              </span>
            </div>
            <p className="text-xs text-gray-200 leading-relaxed font-medium">
              {step.description}
            </p>
          </div>

          {/* CodeFlow Visual Loop Flowchart Diagram */}
          <div className="bg-slate-950 rounded-2xl border border-white/10 p-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center justify-between">
              <span>CodeFlow Mental Model Diagram</span>
              <span className="text-[10px] font-normal text-blue-400">Pre-Test Cycle</span>
            </h4>

            <div className="flex flex-col items-center space-y-3 font-mono text-xs">
              {/* Box 1: Condition Check */}
              <div
                className={`w-full p-3.5 rounded-2xl border text-center transition-all ${
                  step.type === 'CHECK'
                    ? step.isTruth
                      ? 'bg-emerald-950/60 border-emerald-400 text-emerald-200 shadow-lg shadow-emerald-500/20 scale-102 font-bold'
                      : 'bg-red-950/60 border-red-400 text-red-200 shadow-lg shadow-red-500/20 scale-102 font-bold'
                    : 'bg-slate-900/60 border-white/10 text-gray-300'
                }`}
              >
                <div className="text-[10px] text-gray-400 uppercase font-sans mb-1">
                  1. Evaluate Loop Condition
                </div>
                <div className="text-sm font-bold text-amber-300">
                  {step.conditionExpr || `variable ${operator} ${limitVal}`}
                </div>
                {step.type === 'CHECK' && (
                  <div className="mt-1 text-xs">
                    Result: <span className={step.isTruth ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                      {step.isTruth ? 'TRUE (Truthful)' : 'FALSE (Falsy)'}
                    </span>
                  </div>
                )}
              </div>

              {/* Branch Decision Arrows */}
              <div className="grid grid-cols-2 gap-4 w-full text-center">
                {/* Left Branch: TRUE -> ENTER BODY */}
                <div
                  className={`p-3 rounded-2xl border transition-all ${
                    step.isTruth && (step.type === 'PRINT' || step.type === 'UPDATE' || (step.type === 'CHECK' && step.isTruth))
                      ? 'bg-blue-950/70 border-blue-400 text-blue-200 shadow-md shadow-blue-500/20 font-semibold'
                      : 'bg-slate-900/40 border-white/5 text-gray-500 opacity-60'
                  }`}
                >
                  <div className="text-[10px] text-emerald-400 font-bold mb-1">
                    YES (True) ↓
                  </div>
                  <div className="text-[11px]">2. Enter Loop Body</div>
                </div>

                {/* Right Branch: FALSE -> EXIT LOOP */}
                <div
                  className={`p-3 rounded-2xl border transition-all ${
                    step.type === 'EXIT' || (step.type === 'CHECK' && !step.isTruth) || step.type === 'FOOTER'
                      ? 'bg-purple-950/70 border-purple-400 text-purple-200 shadow-md shadow-purple-500/20 font-semibold'
                      : 'bg-slate-900/40 border-white/5 text-gray-500 opacity-60'
                  }`}
                >
                  <div className="text-[10px] text-red-400 font-bold mb-1">
                    NO (False) →
                  </div>
                  <div className="text-[11px]">Exit Loop Block</div>
                </div>
              </div>

              {/* Box 3: Update State */}
              <div
                className={`w-full p-3 rounded-2xl border text-center transition-all ${
                  step.type === 'UPDATE'
                    ? 'bg-purple-950/70 border-purple-400 text-purple-200 shadow-lg shadow-purple-500/20 scale-102 font-bold'
                    : 'bg-slate-900/40 border-white/10 text-gray-400'
                }`}
              >
                <div className="text-[10px] text-gray-400 uppercase font-sans mb-0.5">
                  3. State Update
                </div>
                <div>
                  {stepVal >= 0 ? `variable += ${stepVal}` : `variable -= ${Math.abs(stepVal)}`}
                </div>
              </div>

              {/* Box 4: Back Edge Arrow */}
              <div
                className={`w-full p-2.5 rounded-xl border text-center transition-all flex items-center justify-center gap-2 ${
                  step.type === 'BACK'
                    ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 font-bold shadow-lg shadow-cyan-500/20 animate-pulse'
                    : 'bg-slate-900/30 border-white/5 text-gray-500 opacity-60'
                }`}
              >
                <RefreshCw size={14} className={step.type === 'BACK' ? 'animate-spin' : ''} />
                <span className="text-[11px]">↺ BACK EDGE: Return to Condition Check</span>
              </div>
            </div>
          </div>

          {/* Condition & Iteration Counter Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-950 p-3 rounded-2xl border border-white/10 text-center space-y-1">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Condition Checks
              </div>
              <div className="text-xl font-extrabold text-blue-400 font-mono">
                {totalConditionChecks}
              </div>
            </div>
            <div className="bg-slate-950 p-3 rounded-2xl border border-white/10 text-center space-y-1">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Completed Iterations
              </div>
              <div className="text-xl font-extrabold text-emerald-400 font-mono">
                {completedIterations}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
