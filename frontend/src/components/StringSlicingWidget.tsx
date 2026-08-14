import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scissors, ArrowRight, RotateCcw, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';

export const StringSlicingWidget: React.FC = () => {
  const [text, setText] = useState<string>('PYTHON');
  const [start, setStart] = useState<number>(1);
  const [stop, setStop] = useState<number>(4);
  const [step, setStep] = useState<number>(1);
  const [useOmittedStart, setUseOmittedStart] = useState<boolean>(false);
  const [useOmittedStop, setUseOmittedStop] = useState<boolean>(false);

  const len = text.length;

  // Calculate slice result dynamically in JS matching Python semantics
  const computePythonSlice = (): { result: string; indices: number[] } => {
    if (step === 0) return { result: 'ValueError: slice step cannot be zero', indices: [] };

    // Resolve effective bounds
    let effStart = start;
    let effStop = stop;

    if (useOmittedStart) {
      effStart = step > 0 ? 0 : len - 1;
    }
    if (useOmittedStop) {
      effStop = step > 0 ? len : -len - 1;
    }

    // Convert negative indices to positive offsets
    const normalize = (idx: number, isStart: boolean) => {
      if (idx < 0) return Math.max(0, len + idx);
      return idx;
    };

    const normStart = normalize(effStart, true);
    const normStop = normalize(effStop, false);

    const indices: number[] = [];
    let res = '';

    if (step > 0) {
      for (let i = normStart; i < Math.min(len, normStop); i += step) {
        if (i >= 0 && i < len) {
          indices.push(i);
          res += text[i];
        }
        if (indices.length > 50) break; // safety
      }
    } else {
      for (let i = normStart; i > normStop && i >= 0; i += step) {
        if (i < len) {
          indices.push(i);
          res += text[i];
        }
        if (indices.length > 50) break; // safety
      }
    }

    return { result: res, indices };
  };

  const { result, indices } = computePythonSlice();
  const selectedIndexSet = new Set(indices);

  // Quick Presets
  const applyPreset = (st: number, sp: number, stp: number, omStart = false, omStop = false) => {
    setStart(st);
    setStop(sp);
    setStep(stp);
    setUseOmittedStart(omStart);
    setUseOmittedStop(omStop);
  };

  // Build syntax representation
  const startStr = useOmittedStart ? '' : start.toString();
  const stopStr = useOmittedStop ? '' : stop.toString();
  let syntaxStr = `word[${startStr}:${stopStr}]`;
  if (step !== 1) {
    syntaxStr = `word[${startStr}:${stopStr}:${step}]`;
  }

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl flex items-center justify-center text-cyan-400">
            <Scissors size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow String Slicing Master Studio
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wide">
                start : stop : step
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Extract substrings, step strides, and negative reversed slices in real time.
            </p>
          </div>
        </div>

        {/* Word Input */}
        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-2xl border border-white/10 text-xs font-mono">
          <span className="text-gray-400">Word:</span>
          <input
            type="text"
            value={text}
            onChange={(e) => {
              const val = e.target.value.toUpperCase() || 'PYTHON';
              setText(val);
            }}
            className="bg-slate-800 text-cyan-300 font-bold px-2 py-0.5 rounded w-24 border border-cyan-500/30 focus:outline-none"
          />
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
        <span className="text-gray-400 font-sans text-xs">Slicing Presets:</span>
        <button onClick={() => applyPreset(1, 4, 1)} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-cyan-300 border border-cyan-500/20">
          word[1:4] ("YTH")
        </button>
        <button onClick={() => applyPreset(0, 3, 1, true, false)} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-cyan-300 border border-cyan-500/20">
          word[:3] ("PYT")
        </button>
        <button onClick={() => applyPreset(2, 6, 1, false, true)} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-cyan-300 border border-cyan-500/20">
          word[2:] ("THON")
        </button>
        <button onClick={() => applyPreset(0, 6, 2, true, true)} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-cyan-300 border border-cyan-500/20">
          word[::2] ("PTO")
        </button>
        <button onClick={() => applyPreset(0, 6, -1, true, true)} className="px-2.5 py-1 bg-purple-950/80 hover:bg-purple-900/80 rounded-lg text-purple-300 border border-purple-500/30 font-bold">
          word[::-1] [Reverse String]
        </button>
      </div>

      {/* Sliders & Configuration Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-950 p-5 rounded-2xl border border-white/10 font-mono text-xs">
        {/* Sliders Column */}
        <div className="space-y-4 lg:col-span-2">
          {/* Start */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-emerald-400 font-bold flex items-center gap-2">
                START (Included): <strong className="text-white">{useOmittedStart ? '(omitted)' : start}</strong>
              </span>
              <label className="text-[11px] text-gray-400 cursor-pointer flex items-center gap-1 font-sans">
                <input
                  type="checkbox"
                  checked={useOmittedStart}
                  onChange={(e) => setUseOmittedStart(e.target.checked)}
                  className="accent-emerald-500"
                />
                Omit Start
              </label>
            </div>
            {!useOmittedStart && (
              <input
                type="range"
                min="-6"
                max="6"
                value={start}
                onChange={(e) => setStart(parseInt(e.target.value))}
                className="w-full accent-emerald-500"
              />
            )}
          </div>

          {/* Stop */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-red-400 font-bold flex items-center gap-2">
                STOP (Excluded Boundary): <strong className="text-white">{useOmittedStop ? '(omitted)' : stop}</strong>
              </span>
              <label className="text-[11px] text-gray-400 cursor-pointer flex items-center gap-1 font-sans">
                <input
                  type="checkbox"
                  checked={useOmittedStop}
                  onChange={(e) => setUseOmittedStop(e.target.checked)}
                  className="accent-red-500"
                />
                Omit Stop
              </label>
            </div>
            {!useOmittedStop && (
              <input
                type="range"
                min="-6"
                max="10"
                value={stop}
                onChange={(e) => setStop(parseInt(e.target.value))}
                className="w-full accent-red-500"
              />
            )}
          </div>

          {/* Step */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-purple-400 font-bold">STEP (Stride & Direction): <strong className="text-white">{step}</strong></span>
              <span className="text-[10px] text-purple-300 font-sans">{step < 0 ? 'Backward Direction' : 'Forward Direction'}</span>
            </div>
            <input
              type="range"
              min="-3"
              max="3"
              value={step}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setStep(val === 0 ? 1 : val);
              }}
              className="w-full accent-purple-500"
            />
          </div>
        </div>

        {/* Expression Output Badge */}
        <div className="bg-slate-900 border border-cyan-500/30 p-4 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-sans font-bold mb-1">Generated Slice Expression</div>
            <div className="text-xl font-bold text-cyan-300">{syntaxStr}</div>
          </div>
          <div className="pt-3 border-t border-white/10 text-xs">
            Extracted Substring:
            <div className="text-lg font-bold text-emerald-400">"{result}"</div>
          </div>
        </div>
      </div>

      {/* Visual Character Selection Grid */}
      <div className="bg-slate-950 rounded-2xl border border-white/10 p-5 space-y-4 font-mono text-xs">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
            <Sparkles size={14} className="text-cyan-400" /> Sliced Character Traversal
          </span>
          <span className="text-xs text-cyan-400 font-bold">
            {indices.length} characters selected
          </span>
        </div>

        {/* Cell Grid */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {text.split('').map((char, idx) => {
            const isSelected = selectedIndexSet.has(idx);
            const posInOrder = indices.indexOf(idx);

            return (
              <div
                key={idx}
                className={`border rounded-2xl p-3 text-center transition-all min-w-[65px] ${
                  isSelected
                    ? 'bg-cyan-500/30 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-400 font-bold'
                    : 'bg-slate-900/60 border-white/5 text-gray-600 opacity-60'
                }`}
              >
                <div className="text-[9px] text-gray-400 font-normal">
                  {isSelected ? `#${posInOrder + 1}` : `[${idx}]`}
                </div>
                <div className="text-lg font-bold text-cyan-300">
                  {char === ' ' ? '␣' : char}
                </div>
                <div className="text-[9px] text-gray-500">{idx}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
