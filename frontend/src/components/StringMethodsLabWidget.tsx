import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, ArrowRight, Table, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';

export const StringMethodsLabWidget: React.FC = () => {
  const [inputText, setInputText] = useState<string>('  Hello Python 3.14!  ');
  const [activeMethod, setActiveMethod] = useState<'upper' | 'lower' | 'strip' | 'replace' | 'split' | 'find'>('upper');
  const [arg1, setArg1] = useState<string>('Python');
  const [arg2, setArg2] = useState<string>('CodeFlow');

  // Calculate Python method output
  const computeOutput = () => {
    switch (activeMethod) {
      case 'upper':
        return {
          code: `text.upper()`,
          result: inputText.toUpperCase(),
          returnType: "<class 'str'>",
          desc: "Converts all applicable lowercase letters to uppercase."
        };
      case 'lower':
        return {
          code: `text.lower()`,
          result: inputText.toLowerCase(),
          returnType: "<class 'str'>",
          desc: "Converts all applicable uppercase letters to lowercase."
        };
      case 'strip':
        return {
          code: `text.strip()`,
          result: inputText.trim(),
          returnType: "<class 'str'>",
          desc: "Removes leading and trailing whitespace from both ends."
        };
      case 'replace':
        return {
          code: `text.replace("${arg1}", "${arg2}")`,
          result: arg1 ? inputText.split(arg1).join(arg2) : inputText,
          returnType: "<class 'str'>",
          desc: `Replaces all occurrences of "${arg1}" with "${arg2}".`
        };
      case 'split':
        const separator = arg1.length > 0 ? arg1 : null;
        const resList = separator !== null ? inputText.split(separator) : inputText.trim().split(/\s+/);
        return {
          code: separator !== null ? `text.split("${separator}")` : `text.split()`,
          result: JSON.stringify(resList),
          returnType: "<class 'list'>",
          desc: separator !== null ? `Splits string at every "${separator}" and returns a list.` : "Splits string at whitespace runs and returns a list."
        };
      case 'find':
        const target = arg1;
        const pos = inputText.indexOf(target);
        return {
          code: `text.find("${target}")`,
          result: pos.toString(),
          returnType: "<class 'int'>",
          desc: pos !== -1 ? `Found "${target}" starting at index position ${pos}.` : `Target "${target}" not found! Returned -1.`
        };
      default:
        return { code: '', result: '', returnType: '', desc: '' };
    }
  };

  const outputInfo = computeOutput();

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl flex items-center justify-center text-cyan-400">
            <Wrench size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Interactive String Methods Workbench
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wide">
                upper • lower • strip • replace • split • find
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Test Python string methods in real time to inspect return values, types, and original immutability.
            </p>
          </div>
        </div>

        {/* Method Switcher */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          {(['upper', 'lower', 'strip', 'replace', 'split', 'find'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setActiveMethod(m)}
              className={`px-2.5 py-1 rounded-xl transition-all ${
                activeMethod === m ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              .{m}()
            </button>
          ))}
        </div>
      </div>

      {/* Input & Parameters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-2xl border border-white/10 font-mono text-xs">
        {/* Input String */}
        <div className="space-y-2">
          <label className="text-gray-400 font-sans font-bold text-xs uppercase">
            Input Variable: text
          </label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Method Parameters */}
        <div className="space-y-2">
          {activeMethod === 'replace' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-400 font-sans font-bold text-[11px] uppercase">old (target)</label>
                <input
                  type="text"
                  value={arg1}
                  onChange={(e) => setArg1(e.target.value)}
                  className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-gray-400 font-sans font-bold text-[11px] uppercase">new (replacement)</label>
                <input
                  type="text"
                  value={arg2}
                  onChange={(e) => setArg2(e.target.value)}
                  className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeMethod === 'split' && (
            <div>
              <label className="text-gray-400 font-sans font-bold text-[11px] uppercase">separator (leave empty for whitespace)</label>
              <input
                type="text"
                value={arg1}
                onChange={(e) => setArg1(e.target.value)}
                placeholder="e.g. , or space"
                className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-2.5 text-white focus:outline-none"
              />
            </div>
          )}

          {activeMethod === 'find' && (
            <div>
              <label className="text-gray-400 font-sans font-bold text-[11px] uppercase">target substring</label>
              <input
                type="text"
                value={arg1}
                onChange={(e) => setArg1(e.target.value)}
                className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-2.5 text-white focus:outline-none"
              />
            </div>
          )}

          {(activeMethod === 'upper' || activeMethod === 'lower' || activeMethod === 'strip') && (
            <div className="p-3 bg-slate-900 rounded-xl border border-white/5 text-gray-400 font-sans text-xs">
              No additional arguments required for <code className="text-cyan-300">.{activeMethod}()</code>.
            </div>
          )}
        </div>
      </div>

      {/* Execution Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        {/* Returned Result Card */}
        <div className="bg-slate-950 border border-cyan-500/30 rounded-2xl p-5 space-y-2">
          <div className="text-cyan-400 font-bold text-[11px] uppercase flex justify-between">
            <span>Executed Method Call</span>
            <span className="text-emerald-400">{outputInfo.returnType}</span>
          </div>
          <div className="text-base font-bold text-white bg-slate-900 p-3 rounded-xl border border-white/10">
            {outputInfo.code} → <span className="text-emerald-300">{outputInfo.result}</span>
          </div>
          <p className="text-gray-400 font-sans text-xs pt-1">
            {outputInfo.desc}
          </p>
        </div>

        {/* Immutability Proof Card */}
        <div className="bg-slate-950 border border-white/10 rounded-2xl p-5 space-y-2">
          <div className="text-purple-400 font-bold text-[11px] uppercase">
            Original Variable text Status
          </div>
          <div className="text-base font-bold text-white bg-slate-900 p-3 rounded-xl border border-white/10">
            text → "{inputText}"
          </div>
          <p className="text-gray-400 font-sans text-xs pt-1">
            ✓ Original variable <code className="text-cyan-300">text</code> remains completely unchanged! String methods return a NEW value.
          </p>
        </div>
      </div>

      {/* Complete Method Comparison Matrix */}
      <div className="bg-slate-950 border border-white/10 rounded-2xl p-5 space-y-3 text-xs font-mono">
        <div className="text-gray-300 font-bold uppercase text-[11px] flex items-center gap-2">
          <Table size={14} className="text-cyan-400" /> String Methods Master Summary Reference
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-[11px]">
                <th className="py-2 px-3">METHOD</th>
                <th className="py-2 px-3">PURPOSE</th>
                <th className="py-2 px-3">RETURN TYPE</th>
                <th className="py-2 px-3">EXAMPLE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              <tr className={activeMethod === 'upper' ? 'bg-cyan-950/40 text-cyan-200 font-bold' : ''}>
                <td className="py-2 px-3 font-bold text-cyan-400">upper()</td>
                <td className="py-2 px-3">Converts letters to uppercase</td>
                <td className="py-2 px-3 text-emerald-400">str</td>
                <td className="py-2 px-3 font-mono">"hi".upper() → "HI"</td>
              </tr>
              <tr className={activeMethod === 'lower' ? 'bg-cyan-950/40 text-cyan-200 font-bold' : ''}>
                <td className="py-2 px-3 font-bold text-cyan-400">lower()</td>
                <td className="py-2 px-3">Converts letters to lowercase</td>
                <td className="py-2 px-3 text-emerald-400">str</td>
                <td className="py-2 px-3 font-mono">"HI".lower() → "hi"</td>
              </tr>
              <tr className={activeMethod === 'strip' ? 'bg-cyan-950/40 text-cyan-200 font-bold' : ''}>
                <td className="py-2 px-3 font-bold text-cyan-400">strip()</td>
                <td className="py-2 px-3">Removes outer surrounding whitespace</td>
                <td className="py-2 px-3 text-emerald-400">str</td>
                <td className="py-2 px-3 font-mono">" hi ".strip() → "hi"</td>
              </tr>
              <tr className={activeMethod === 'replace' ? 'bg-cyan-950/40 text-cyan-200 font-bold' : ''}>
                <td className="py-2 px-3 font-bold text-cyan-400">replace(old, new)</td>
                <td className="py-2 px-3">Replaces matching substring text</td>
                <td className="py-2 px-3 text-emerald-400">str</td>
                <td className="py-2 px-3 font-mono">"cat".replace("c","b") → "bat"</td>
              </tr>
              <tr className={activeMethod === 'split' ? 'bg-cyan-950/40 text-cyan-200 font-bold' : ''}>
                <td className="py-2 px-3 font-bold text-cyan-400">split(sep)</td>
                <td className="py-2 px-3">Divides text into list items</td>
                <td className="py-2 px-3 text-purple-300 font-bold">list</td>
                <td className="py-2 px-3 font-mono">"a,b".split(",") → ['a','b']</td>
              </tr>
              <tr className={activeMethod === 'find' ? 'bg-cyan-950/40 text-cyan-200 font-bold' : ''}>
                <td className="py-2 px-3 font-bold text-cyan-400">find(target)</td>
                <td className="py-2 px-3">Locates starting index (-1 if missing)</td>
                <td className="py-2 px-3 text-amber-300 font-bold">int</td>
                <td className="py-2 px-3 font-mono">"cat".find("a") → 1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
