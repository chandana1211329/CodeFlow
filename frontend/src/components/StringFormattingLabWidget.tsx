import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code2, DollarSign, Percent, AlignLeft, CheckCircle2 } from 'lucide-react';

export const StringFormattingLabWidget: React.FC = () => {
  const [name, setName] = useState<string>('Alex');
  const [price, setPrice] = useState<number>(1234.567);
  const [ratio, setRatio] = useState<number>(0.75);
  const [formatType, setFormatType] = useState<'decimal' | 'comma' | 'percent' | 'align'>('decimal');
  const [alignMode, setAlignMode] = useState<'<' | '>' | '^'>('^');

  const computeFormattedValue = () => {
    switch (formatType) {
      case 'decimal':
        return {
          code: `f"\${price:.2f}"`,
          output: `$${price.toFixed(2)}`,
          spec: `.2f`,
          desc: `Formats floating point number to 2 fixed decimal places.`
        };
      case 'comma':
        return {
          code: `f"\${price:,.2f}"`,
          output: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          spec: `,.2f`,
          desc: `Adds thousands comma separators and 2 decimal places.`
        };
      case 'percent':
        return {
          code: `f"{ratio:.0%}"`,
          output: `${(ratio * 100).toFixed(0)}%`,
          spec: `.0%`,
          desc: `Multiplies by 100 and appends percentage sign.`
        };
      case 'align':
        const fillStr = name.padStart(
          alignMode === '>' ? 10 : alignMode === '^' ? Math.floor((10 + name.length) / 2) : name.length,
          '·'
        ).padEnd(10, '·');
        return {
          code: `f"{name:${alignMode}10}"`,
          output: `"${fillStr}"`,
          spec: `${alignMode}10`,
          desc: `Aligns text in a field width of 10 characters (${alignMode === '<' ? 'left' : alignMode === '>' ? 'right' : 'centered'}).`
        };
    }
  };

  const formatted = computeFormattedValue();

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl flex items-center justify-center text-cyan-400">
            <Code2 size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow f-String & Value Formatting Studio
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wide">
                f"Hello &#123;name&#125;" • &#123;value:spec&#125;
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Interactively embed variables, decimals (.2f), commas (,), percentages (%), and alignment in Python f-strings.
            </p>
          </div>
        </div>
      </div>

      {/* Basic f-String Explorer */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 font-mono text-xs space-y-4">
        <div className="text-cyan-400 font-bold uppercase text-[11px] flex items-center gap-2">
          <Sparkles size={14} /> 1. Interactive f-String Variable Embedding
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 p-3.5 rounded-xl border border-white/10 space-y-2">
            <div className="text-gray-400 text-[11px]">Variable Input:</div>
            <div className="flex items-center gap-2">
              <span className="text-purple-400 font-bold">name =</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-800 border border-cyan-500/30 rounded px-2.5 py-1 text-white font-bold focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-slate-900 p-3.5 rounded-xl border border-cyan-500/30 space-y-1">
            <div className="text-gray-400 text-[11px]">Python Evaluation:</div>
            <div className="text-emerald-300 font-bold text-sm">
              f"Hello &#123;name.upper()&#125;!" → <span className="text-white">"Hello {name.toUpperCase()}!"</span>
            </div>
          </div>
        </div>
      </div>

      {/* Format Specifiers Studio */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 font-mono text-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-3 gap-3">
          <div className="text-purple-400 font-bold uppercase text-[11px]">
            2. Format Specifiers Workbench (&#123;value:specifier&#125;)
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-wrap gap-1 bg-slate-900 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setFormatType('decimal')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                formatType === 'decimal' ? 'bg-cyan-600 text-white' : 'text-gray-400'
              }`}
            >
              .2f Decimals
            </button>
            <button
              onClick={() => setFormatType('comma')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                formatType === 'comma' ? 'bg-cyan-600 text-white' : 'text-gray-400'
              }`}
            >
              , Separator
            </button>
            <button
              onClick={() => setFormatType('percent')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                formatType === 'percent' ? 'bg-cyan-600 text-white' : 'text-gray-400'
              }`}
            >
              % Percentage
            </button>
            <button
              onClick={() => setFormatType('align')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                formatType === 'align' ? 'bg-cyan-600 text-white' : 'text-gray-400'
              }`}
            >
              Alignment (&lt; ^ &gt;)
            </button>
          </div>
        </div>

        {/* Dynamic Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-white/10 space-y-3">
            {formatType === 'decimal' && (
              <div className="space-y-1">
                <label className="text-gray-400 font-sans text-xs">Adjust Price Number:</label>
                <input
                  type="number"
                  step="0.001"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-800 border border-cyan-500/30 rounded p-2 text-white font-bold"
                />
              </div>
            )}

            {formatType === 'comma' && (
              <div className="space-y-1">
                <label className="text-gray-400 font-sans text-xs">Adjust Large Price Number:</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-800 border border-cyan-500/30 rounded p-2 text-white font-bold"
                />
              </div>
            )}

            {formatType === 'percent' && (
              <div className="space-y-1">
                <label className="text-gray-400 font-sans text-xs">Adjust Ratio Decimal (0.0 to 1.0):</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={ratio}
                  onChange={(e) => setRatio(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500"
                />
                <div className="text-right text-gray-400">ratio = {ratio}</div>
              </div>
            )}

            {formatType === 'align' && (
              <div className="space-y-2">
                <label className="text-gray-400 font-sans text-xs">Select Alignment Direction:</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setAlignMode('<')}
                    className={`flex-1 py-1.5 rounded border text-center font-bold ${
                      alignMode === '<' ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-800 border-white/10 text-gray-400'
                    }`}
                  >
                    &lt; Left
                  </button>
                  <button
                    onClick={() => setAlignMode('^')}
                    className={`flex-1 py-1.5 rounded border text-center font-bold ${
                      alignMode === '^' ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-800 border-white/10 text-gray-400'
                    }`}
                  >
                    ^ Center
                  </button>
                  <button
                    onClick={() => setAlignMode('>')}
                    className={`flex-1 py-1.5 rounded border text-center font-bold ${
                      alignMode === '>' ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-800 border-white/10 text-gray-400'
                    }`}
                  >
                    &gt; Right
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Formatted Output Display */}
          <div className="bg-slate-900 p-4 rounded-xl border border-cyan-500/30 space-y-2 flex flex-col justify-between">
            <div>
              <div className="text-[10px] text-gray-400 uppercase font-sans font-bold">Python Code</div>
              <div className="text-base font-bold text-cyan-300">{formatted.code}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-400 uppercase font-sans font-bold">Formatted String Output</div>
              <div className="text-xl font-bold text-emerald-400">{formatted.output}</div>
            </div>
            <p className="text-[11px] text-gray-400 font-sans border-t border-white/10 pt-2">
              {formatted.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
