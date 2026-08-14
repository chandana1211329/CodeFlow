import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Play, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export const DefaultParamsWidget: React.FC = () => {
  const [nameArg, setNameArg] = useState<string>('');
  const [msgArg, setMsgArg] = useState<string>('');

  const defaultName = 'Guest';
  const defaultMsg = 'Hello';

  const evaluatedName = nameArg.trim() !== '' ? nameArg.trim() : defaultName;
  const evaluatedMsg = msgArg.trim() !== '' ? msgArg.trim() : defaultMsg;

  const isNameOverridden = nameArg.trim() !== '';
  const isMsgOverridden = msgArg.trim() !== '';

  const buildCallCode = () => {
    if (isNameOverridden && isMsgOverridden) {
      return `greet("${nameArg}", "${msgArg}")`;
    }
    if (isNameOverridden) {
      return `greet("${nameArg}")`;
    }
    if (isMsgOverridden) {
      return `greet(msg="${msgArg}")`;
    }
    return `greet()`;
  };

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl flex items-center justify-center text-cyan-400">
            <Settings size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Default Parameters Studio
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wide">
                Fallback Values • Overriding Defaults
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Explore how fallback parameters supply default values when arguments are omitted.
            </p>
          </div>
        </div>
      </div>

      {/* Function Definition Card */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-cyan-500/30 font-mono text-xs space-y-2">
        <div className="text-cyan-400 font-bold uppercase text-[11px] font-sans">
          Function Definition with Defaults
        </div>
        <div className="bg-slate-900 p-3 rounded-xl border border-white/10 text-cyan-300 font-bold text-sm">
          def greet(name="Guest", msg="Hello"):<br />
          &nbsp;&nbsp;&nbsp;&nbsp;print(msg, name)
        </div>
      </div>

      {/* Call Arguments Configurator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-white/10 font-mono text-xs">
        <div className="space-y-2">
          <label className="text-gray-400 font-sans font-bold text-xs uppercase">
            Argument for 'name' (Optional):
          </label>
          <input
            type="text"
            placeholder="Leave empty for 'Guest'"
            value={nameArg}
            onChange={(e) => setNameArg(e.target.value)}
            className="w-full bg-slate-900 border border-cyan-500/40 rounded-xl p-2.5 text-white font-bold"
          />
          <div className="text-[11px] font-sans text-gray-400 flex items-center gap-1.5">
            Status:{' '}
            {isNameOverridden ? (
              <span className="text-emerald-400 font-bold">✓ Overrides default with "{nameArg}"</span>
            ) : (
              <span className="text-amber-400 font-bold">Uses default fallback ("Guest")</span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-gray-400 font-sans font-bold text-xs uppercase">
            Argument for 'msg' (Optional):
          </label>
          <input
            type="text"
            placeholder="Leave empty for 'Hello'"
            value={msgArg}
            onChange={(e) => setMsgArg(e.target.value)}
            className="w-full bg-slate-900 border border-cyan-500/40 rounded-xl p-2.5 text-white font-bold"
          />
          <div className="text-[11px] font-sans text-gray-400 flex items-center gap-1.5">
            Status:{' '}
            {isMsgOverridden ? (
              <span className="text-emerald-400 font-bold">✓ Overrides default with "{msgArg}"</span>
            ) : (
              <span className="text-amber-400 font-bold">Uses default fallback ("Hello")</span>
            )}
          </div>
        </div>
      </div>

      {/* Execution Results */}
      <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-5 space-y-3 font-mono text-xs">
        <div className="text-emerald-400 font-bold uppercase text-[11px] font-sans flex justify-between">
          <span>Executed Statement</span>
          <span className="text-emerald-300">Console Output</span>
        </div>
        <div className="text-base font-bold text-cyan-300 bg-slate-900 p-3 rounded-xl border border-white/10">
          {buildCallCode()} → <span className="text-emerald-400">"{evaluatedMsg} {evaluatedName}"</span>
        </div>
        <p className="text-gray-400 font-sans text-xs pt-1">
          ✓ Default parameters remain unchanged for future calls! Overriding only applies to the specific invocation.
        </p>
      </div>
    </div>
  );
};
