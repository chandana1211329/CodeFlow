import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Type, Quote, Sparkles, Layers, CheckCircle2, AlertCircle } from 'lucide-react';

export const StringExplorerWidget: React.FC = () => {
  const [quoteStyle, setQuoteStyle] = useState<'double' | 'single' | 'triple_double' | 'triple_single'>('double');
  const [textVal, setTextVal] = useState<string>('Hello, CodeFlow!');
  const [isNumericCompare, setIsNumericCompare] = useState<boolean>(false);

  // Generate python source code line based on settings
  let srcCode = `message = "${textVal}"`;
  let quoteDelim = '"';
  if (quoteStyle === 'single') {
    srcCode = `message = '${textVal}'`;
    quoteDelim = "'";
  } else if (quoteStyle === 'triple_double') {
    srcCode = `message = """${textVal}"""`;
    quoteDelim = '"""';
  } else if (quoteStyle === 'triple_single') {
    srcCode = `message = '''${textVal}'''`;
    quoteDelim = "'''";
  }

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl flex items-center justify-center text-cyan-400">
            <Type size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Interactive String Explorer
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wide">
                Quotes • Types • Multiline
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Experiment with single, double, and multiline quotes to inspect memory representation and data types.
            </p>
          </div>
        </div>

        {/* Quote Style Selector */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setQuoteStyle('double')}
            className={`px-2.5 py-1 rounded-xl transition-all ${
              quoteStyle === 'double' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            "Double"
          </button>
          <button
            onClick={() => setQuoteStyle('single')}
            className={`px-2.5 py-1 rounded-xl transition-all ${
              quoteStyle === 'single' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            'Single'
          </button>
          <button
            onClick={() => setQuoteStyle('triple_double')}
            className={`px-2.5 py-1 rounded-xl transition-all ${
              quoteStyle === 'triple_double' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            """Triple Double"""
          </button>
          <button
            onClick={() => setQuoteStyle('triple_single')}
            className={`px-2.5 py-1 rounded-xl transition-all ${
              quoteStyle === 'triple_single' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            '''Triple Single'''
          </button>
        </div>
      </div>

      {/* Preset Quick Buttons */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
        <span className="text-gray-400 font-sans text-xs">Quick Text Examples:</span>
        <button
          onClick={() => { setTextVal('Hello, Python!'); setQuoteStyle('double'); }}
          className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-cyan-300 border border-cyan-500/20"
        >
          Basic Text
        </button>
        <button
          onClick={() => { setTextVal("I'm learning Python"); setQuoteStyle('double'); }}
          className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-cyan-300 border border-cyan-500/20"
        >
          Apostrophe: "I'm learning"
        </button>
        <button
          onClick={() => { setTextVal('She said "Hello"'); setQuoteStyle('single'); }}
          className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-cyan-300 border border-cyan-500/20"
        >
          Quotes: 'She said "Hello"'
        </button>
        <button
          onClick={() => { setTextVal("Line 1\nLine 2\nLine 3"); setQuoteStyle('triple_double'); }}
          className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-cyan-300 border border-cyan-500/20"
        >
          Multiline Text
        </button>
      </div>

      {/* String Input & Source Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-2xl border border-white/10 font-mono text-xs">
        {/* Editable Input */}
        <div className="space-y-2">
          <label className="text-gray-400 font-sans font-bold text-xs uppercase flex items-center gap-2">
            <Quote size={14} className="text-cyan-400" /> Enter String Text
          </label>
          {quoteStyle.startsWith('triple') ? (
            <textarea
              rows={3}
              value={textVal}
              onChange={(e) => setTextVal(e.target.value)}
              className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
            />
          ) : (
            <input
              type="text"
              value={textVal}
              onChange={(e) => setTextVal(e.target.value)}
              className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
            />
          )}
        </div>

        {/* Generated Source Code Preview */}
        <div className="bg-slate-900 border border-white/10 p-4 rounded-xl space-y-2">
          <div className="text-[10px] text-gray-400 uppercase font-sans font-bold">Python Source Code</div>
          <div className="text-cyan-300 font-bold whitespace-pre-wrap">{srcCode}</div>
          <div className="text-[11px] text-gray-400 pt-1 border-t border-white/5">
            type(message) → <strong className="text-emerald-400">&lt;class 'str'&gt;</strong>
          </div>
        </div>
      </div>

      {/* Quote Delimiter & Memory Representation Visualizer */}
      <div className="bg-slate-950 rounded-2xl border border-white/10 p-5 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
            <Sparkles size={14} className="text-cyan-400" /> Quote Boundaries vs Content Value
          </span>
          <span className="text-xs text-gray-400">
            Delimiters tell Python it is text; they are not displayed in output!
          </span>
        </div>

        {/* Memory Boundary Card */}
        <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-900/80 rounded-2xl border border-cyan-500/20">
          <div className="px-3 py-2 bg-purple-950/60 border border-purple-500/40 rounded-xl text-purple-300 font-bold text-center">
            <div className="text-[9px] text-purple-400 font-normal">OPEN QUOTE</div>
            <div>{quoteDelim}</div>
          </div>

          <div className="flex-1 px-4 py-2 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-cyan-200 font-bold whitespace-pre-wrap">
            <div className="text-[9px] text-cyan-400 font-normal font-sans">STRING CONTENT VALUE</div>
            <div>{textVal || '<empty string>'}</div>
          </div>

          <div className="px-3 py-2 bg-purple-950/60 border border-purple-500/40 rounded-xl text-purple-300 font-bold text-center">
            <div className="text-[9px] text-purple-400 font-normal">CLOSE QUOTE</div>
            <div>{quoteDelim}</div>
          </div>
        </div>

        {/* Terminal Output */}
        <div className="bg-black/80 rounded-xl p-3 border border-white/10 space-y-1">
          <div className="text-gray-400 text-[10px] uppercase font-bold">print(message) Output</div>
          <div className="text-emerald-400 whitespace-pre-wrap font-bold">&gt; {textVal}</div>
        </div>
      </div>

      {/* String vs Number Comparison Card */}
      <div className="bg-slate-950 border border-white/10 rounded-2xl p-5 space-y-3 font-mono text-xs">
        <div className="text-gray-300 font-bold uppercase text-[11px]">
          Mental Model: String ("25") vs Number (25)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 p-3 rounded-xl border border-cyan-500/20 space-y-1">
            <div className="text-cyan-400 font-bold">val = "25"</div>
            <div className="text-gray-300">Type: <strong className="text-emerald-400">&lt;class 'str'&gt;</strong></div>
            <p className="text-gray-400 text-[11px] font-sans">Text representation. Cannot do arithmetic math directly.</p>
          </div>

          <div className="bg-slate-900 p-3 rounded-xl border border-white/10 space-y-1">
            <div className="text-purple-400 font-bold">val = 25</div>
            <div className="text-gray-300">Type: <strong className="text-purple-300">&lt;class 'int'&gt;</strong></div>
            <p className="text-gray-400 text-[11px] font-sans">Numeric integer representation. Used for calculations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
