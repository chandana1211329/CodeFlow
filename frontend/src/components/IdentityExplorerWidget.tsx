import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, RefreshCw, Layers, ArrowRight, Eye, ShieldCheck } from 'lucide-react';

interface QuestionItem {
  id: string;
  expr: string;
  questionType: 'IDENTITY' | 'VALUE';
  explanation: string;
  correctResult: boolean;
}

export const IdentityExplorerWidget: React.FC = () => {
  const [predictions, setPredictions] = useState<Record<string, boolean | null>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const questions: QuestionItem[] = [
    {
      id: 'q1',
      expr: 'a is b',
      questionType: 'IDENTITY',
      correctResult: true,
      explanation: 'a and b refer to the exact SAME object (Object A) via assignment b = a.',
    },
    {
      id: 'q2',
      expr: 'a is c',
      questionType: 'IDENTITY',
      correctResult: false,
      explanation: 'a points to Object A while c points to Object B. They are TWO separate objects.',
    },
    {
      id: 'q3',
      expr: 'a == c',
      questionType: 'VALUE',
      correctResult: true,
      explanation: 'Object A and Object B contain equal values [1, 2], so their values compare equal.',
    },
    {
      id: 'q4',
      expr: 'a is not c',
      questionType: 'IDENTITY',
      correctResult: true,
      explanation: 'a and c point to DIFFERENT objects (Object A vs Object B), so is not evaluates to True.',
    },
    {
      id: 'q5',
      expr: 'b == c',
      questionType: 'VALUE',
      correctResult: true,
      explanation: 'b points to Object A ([1, 2]) and c points to Object B ([1, 2]). Values compare equal.',
    },
    {
      id: 'q6',
      expr: 'b is c',
      questionType: 'IDENTITY',
      correctResult: false,
      explanation: 'b points to Object A, c points to Object B. They are different objects.',
    },
  ];

  const handlePredict = (id: string, val: boolean) => {
    setPredictions((prev) => ({ ...prev, [id]: val }));
    setRevealed((prev) => ({ ...prev, [id]: true }));
  };

  const handleReset = () => {
    setPredictions({});
    setRevealed({});
  };

  return (
    <div className="my-8 bg-[#020617] border border-blue-500/30 rounded-3xl p-6 shadow-2xl shadow-blue-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600/20 border border-indigo-400/30 rounded-2xl flex items-center justify-center text-indigo-400">
            <Layers size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Interactive Identity Explorer
            </h3>
            <p className="text-xs text-gray-400">
              Distinguish <code className="text-emerald-300">VALUE EQUALITY (==)</code> from <code className="text-indigo-300">OBJECT IDENTITY (is)</code>
            </p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all flex items-center gap-1.5 text-xs"
        >
          <RefreshCw size={14} /> Reset
        </button>
      </div>

      {/* Code & Reference Map Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
        {/* Code Snippet */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            Python Code Setup:
          </span>
          <pre className="bg-black/60 p-4 rounded-xl font-mono text-xs text-blue-300 border border-white/10 leading-relaxed">
{`a = [1, 2]
b = a
c = [1, 2]`}
          </pre>
        </div>

        {/* Reference Map Diagram */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            Reference Map in Memory:
          </span>
          <div className="bg-black/60 p-4 rounded-xl font-mono text-xs border border-white/10 space-y-3">
            <div className="flex items-center gap-3 justify-between bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-500/30">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">a, b</span>
                <ArrowRight size={14} className="text-gray-500" />
              </div>
              <div className="bg-indigo-600/30 px-3 py-1 rounded border border-indigo-400 text-indigo-200 font-bold">
                OBJECT A: [1, 2]
              </div>
            </div>

            <div className="flex items-center gap-3 justify-between bg-purple-950/40 p-2.5 rounded-lg border border-purple-500/30">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">c</span>
                <ArrowRight size={14} className="text-gray-500" />
              </div>
              <div className="bg-purple-600/30 px-3 py-1 rounded border border-purple-400 text-purple-200 font-bold">
                OBJECT B: [1, 2]
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Predict Questions */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
          Predict Results: Value vs Identity Questions
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {questions.map((q) => {
            const userPred = predictions[q.id];
            const isRev = revealed[q.id];
            const isCorrect = userPred === q.correctResult;

            return (
              <div
                key={q.id}
                className="bg-black/50 border border-white/10 p-4 rounded-2xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-white">{q.expr}</span>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                      q.questionType === 'VALUE'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                        : 'bg-indigo-950 text-indigo-300 border-indigo-500/40'
                    }`}
                  >
                    {q.questionType} QUESTION
                  </span>
                </div>

                {!isRev ? (
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handlePredict(q.id, true)}
                      className="flex-1 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/30 rounded-xl font-mono text-xs text-emerald-300 transition-all font-bold"
                    >
                      Predict True
                    </button>
                    <button
                      onClick={() => handlePredict(q.id, false)}
                      className="flex-1 py-1.5 bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 rounded-xl font-mono text-xs text-red-300 transition-all font-bold"
                    >
                      Predict False
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 pt-1 font-mono text-xs">
                    <div className="flex items-center justify-between bg-white/5 p-2 rounded-xl">
                      <span className="text-gray-400">Result:</span>
                      <span className={`font-bold ${q.correctResult ? 'text-emerald-400' : 'text-red-400'}`}>
                        {q.correctResult ? 'True' : 'False'}
                      </span>
                    </div>

                    <div
                      className={`p-2.5 rounded-xl border text-[11px] leading-relaxed ${
                        isCorrect
                          ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                          : 'bg-yellow-950/30 border-yellow-500/30 text-yellow-200'
                      }`}
                    >
                      <span className="font-bold block mb-1">
                        {isCorrect ? '✓ Correct Prediction!' : '✗ Prediction Difference'}
                      </span>
                      {q.explanation}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Golden Summary Card */}
      <div className="bg-indigo-950/30 border border-indigo-500/30 p-4 rounded-2xl text-center space-y-1">
        <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
          Golden Rule of Python Identity vs Equality:
        </span>
        <p className="text-sm font-semibold text-white">
          "SAME VALUE DOES NOT ALWAYS MEAN SAME OBJECT."
        </p>
        <span className="text-[11px] text-gray-400 block pt-1">
          Use <code className="text-emerald-300">==</code> for Values | Use <code className="text-indigo-300">is</code> for Exact Object Identity
        </span>
      </div>
    </div>
  );
};
