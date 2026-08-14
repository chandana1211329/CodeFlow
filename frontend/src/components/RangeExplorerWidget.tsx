import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, ArrowRight, RotateCcw, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export const RangeExplorerWidget: React.FC = () => {
  const [start, setStart] = useState<number>(0);
  const [stop, setStop] = useState<number>(5);
  const [step, setStep] = useState<number>(1);
  const [argCount, setArgCount] = useState<1 | 2 | 3>(1);

  // Generate range items
  const generateRangeValues = (): number[] => {
    const res: number[] = [];
    if (step === 0) return res;

    if (step > 0) {
      for (let i = start; i < stop; i += step) {
        res.push(i);
        if (res.length > 50) break; // safety
      }
    } else {
      for (let i = start; i > stop; i += step) {
        res.push(i);
        if (res.length > 50) break; // safety
      }
    }
    return res;
  };

  const values = generateRangeValues();

  // Preset handlers
  const handlePreset = (args: number[]) => {
    if (args.length === 1) {
      setArgCount(1);
      setStart(0);
      setStop(args[0]);
      setStep(1);
    } else if (args.length === 2) {
      setArgCount(2);
      setStart(args[0]);
      setStop(args[1]);
      setStep(1);
    } else if (args.length === 3) {
      setArgCount(3);
      setStart(args[0]);
      setStop(args[1]);
      setStep(args[2]);
    }
  };

  // Build syntax string representation
  let syntaxStr = `range(${stop})`;
  if (argCount === 2) syntaxStr = `range(${start}, ${stop})`;
  if (argCount === 3) syntaxStr = `range(${start}, ${stop}, ${step})`;

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl flex items-center justify-center text-cyan-400">
            <Sliders size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Interactive range() Explorer
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wide">
                Start • Stop • Step
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Experiment with start, stop, and step parameters to see exact integer sequences.
            </p>
          </div>
        </div>

        {/* Argument Mode Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-semibold">
          <button
            onClick={() => handlePreset([5])}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              argCount === 1 ? 'bg-cyan-600 text-white shadow-md font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            1 Arg (stop)
          </button>
          <button
            onClick={() => handlePreset([2, 6])}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              argCount === 2 ? 'bg-cyan-600 text-white shadow-md font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            2 Args (start, stop)
          </button>
          <button
            onClick={() => handlePreset([0, 10, 2])}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              argCount === 3 ? 'bg-cyan-600 text-white shadow-md font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            3 Args (start, stop, step)
          </button>
        </div>
      </div>

      {/* Preset Quick Buttons */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
        <span className="text-gray-400 font-sans text-xs">Quick Presets:</span>
        <button onClick={() => handlePreset([5])} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-cyan-300 border border-cyan-500/20">
          range(5)
        </button>
        <button onClick={() => handlePreset([2, 6])} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-cyan-300 border border-cyan-500/20">
          range(2, 6)
        </button>
        <button onClick={() => handlePreset([0, 10, 2])} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-cyan-300 border border-cyan-500/20">
          range(0, 10, 2)
        </button>
        <button onClick={() => handlePreset([5, 0, -1])} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-cyan-300 border border-cyan-500/20">
          range(5, 0, -1) [Count Down]
        </button>
        <button onClick={() => handlePreset([-3, 3])} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-cyan-300 border border-cyan-500/20">
          range(-3, 3) [Negative]
        </button>
      </div>

      {/* Sliders & Expression Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-950 p-5 rounded-2xl border border-white/10">
        {/* Sliders */}
        <div className="space-y-4 lg:col-span-2">
          {/* Start Slider */}
          {argCount >= 2 && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold">START (Included):</span>
                <span className="text-white font-bold">{start}</span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                value={start}
                onChange={(e) => setStart(parseInt(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>
          )}

          {/* Stop Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-red-400 font-bold">STOP (Excluded Boundary):</span>
              <span className="text-white font-bold">{stop}</span>
            </div>
            <input
              type="range"
              min="-10"
              max="15"
              value={stop}
              onChange={(e) => setStop(parseInt(e.target.value))}
              className="w-full accent-red-500"
            />
          </div>

          {/* Step Slider */}
          {argCount === 3 && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-purple-400 font-bold font-mono">STEP (Stride):</span>
                <span className="text-white font-bold">{step}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                value={step}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setStep(val === 0 ? 1 : val);
                }}
                className="w-full accent-purple-500"
              />
            </div>
          )}
        </div>

        {/* Expression Badge */}
        <div className="bg-slate-900 border border-cyan-500/20 p-4 rounded-2xl flex flex-col justify-between font-mono text-xs">
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-sans font-bold mb-1">Generated Range Expression</div>
            <div className="text-lg font-bold text-cyan-300">{syntaxStr}</div>
          </div>
          <div className="text-[11px] text-gray-400 pt-2 border-t border-white/10">
            Total values generated: <strong className="text-white">{values.length}</strong>
          </div>
        </div>
      </div>

      {/* Generated Sequence Output & Number Line Visualizer */}
      <div className="space-y-4">
        <div className="bg-slate-950 rounded-2xl border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={14} className="text-cyan-400" /> Produced Integer Sequence
            </span>
            <span className="text-xs font-mono text-cyan-400 font-bold">
              list({syntaxStr}) → [{values.join(', ')}]
            </span>
          </div>

          {/* Values Cards */}
          {values.length === 0 ? (
            <div className="p-4 bg-red-950/30 border border-red-500/20 rounded-xl text-center text-xs text-red-300 italic">
              Empty Range! No integer values produced for start={start}, stop={stop}, step={step}.
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              {values.map((v, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-2 rounded-xl border text-center font-bold ${
                    idx === 0
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-cyan-500/10 text-cyan-200 border-cyan-500/20'
                  }`}
                >
                  <div className="text-[9px] text-gray-400 font-normal">#{idx + 1}</div>
                  <div>{v}</div>
                </div>
              ))}
              <div className="px-3 py-2 rounded-xl border border-red-500/40 bg-red-950/40 text-red-300 text-center font-bold opacity-60">
                <div className="text-[9px] text-red-400 font-normal">EXCLUDED</div>
                <div>{stop}</div>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-gray-400 pt-2 border-t border-white/5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>START (Included: {start})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span>STOP (Excluded Boundary: {stop})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              <span>STEP (Stride: {step > 0 ? `+${step}` : step})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
