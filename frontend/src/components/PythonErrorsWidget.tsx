import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Terminal, AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';

export const PythonErrorsWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'syntax' | 'runtime' | 'logical' | 'quiz'>('syntax');
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [selectedAns, setSelectedAns] = useState<'syntax' | 'runtime' | 'logical' | null>(null);

  const quizQuestions = [
    {
      code: 'if age >= 18\n    print("Adult")',
      correct: 'syntax',
      desc: 'SyntaxError! Missing colon (:) before block. Python cannot parse the code structure.'
    },
    {
      code: 'print(10 / 0)',
      correct: 'runtime',
      desc: 'RuntimeError! (ZeroDivisionError). Python starts executing, then crashes on division by 0.'
    },
    {
      code: 'price = 10\nquantity = 5\ntotal = price + quantity # Intended price * quantity',
      correct: 'logical',
      desc: 'Logical Error! Code runs cleanly without crashing, but calculates 15 instead of 50.'
    },
    {
      code: 'numbers = [1, 2, 3]\nprint(numbers[10])',
      correct: 'runtime',
      desc: 'RuntimeError! (IndexError). Index 10 is out of range for a 3-item list.'
    }
  ];

  const currentQuiz = quizQuestions[quizIdx];

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500/20 border border-red-400/40 rounded-2xl flex items-center justify-center text-red-400">
            <ShieldAlert size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Python Errors Diagnostic Studio
              <span className="bg-red-500/20 text-red-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-400/30 uppercase tracking-wide">
                Syntax • Runtime • Logical
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Classify and diagnose Python error categories: parsing grammar errors, execution crashes, and silent logic bugs.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('syntax')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'syntax' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Syntax Error
          </button>
          <button
            onClick={() => setActiveTab('runtime')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'runtime' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Runtime Error
          </button>
          <button
            onClick={() => setActiveTab('logical')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'logical' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Logical Error
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'quiz' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Diagnostic Quiz
          </button>
        </div>
      </div>

      {/* Tab 1: Syntax Error */}
      {activeTab === 'syntax' && (
        <div className="bg-slate-950 border border-red-500/30 rounded-2xl p-5 space-y-3 font-mono text-xs">
          <div className="text-red-400 font-bold uppercase text-[11px] font-sans">
            1. Syntax Error (Cannot Parse Grammar Before Execution)
          </div>
          <div className="bg-slate-900 p-3.5 rounded-xl border border-red-500/40 text-red-200 text-sm">
            if age &gt;= 18 <span className="text-red-400 font-bold"># ❌ Missing colon (:)</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;print("Adult")
          </div>
          <p className="text-gray-400 font-sans text-xs pt-1">
            Syntax errors occur when code violates Python grammar rules. Python halts immediately before running a single instruction!
          </p>
        </div>
      )}

      {/* Tab 2: Runtime Error */}
      {activeTab === 'runtime' && (
        <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-5 space-y-3 font-mono text-xs">
          <div className="text-amber-400 font-bold uppercase text-[11px] font-sans">
            2. Runtime Error (Execution Starts, Then Crashes)
          </div>
          <div className="bg-slate-900 p-3.5 rounded-xl border border-amber-500/40 text-amber-200 text-sm">
            print(10 / 0) <span className="text-amber-400 font-bold"># ZeroDivisionError at runtime!</span>
          </div>
          <p className="text-gray-400 font-sans text-xs pt-1">
            Grammar is valid so execution begins, but an exception occurs while running (e.g. ZeroDivisionError, NameError, TypeError, IndexError, KeyError).
          </p>
        </div>
      )}

      {/* Tab 3: Logical Error */}
      {activeTab === 'logical' && (
        <div className="bg-slate-950 border border-purple-500/30 rounded-2xl p-5 space-y-3 font-mono text-xs">
          <div className="text-purple-400 font-bold uppercase text-[11px] font-sans">
            3. Logical Error (Runs Without Error Message, But Output Is Wrong!)
          </div>
          <div className="bg-slate-900 p-3.5 rounded-xl border border-purple-500/40 text-purple-200 text-sm">
            price = 10<br />
            qty = 5<br />
            total = price + qty <span className="text-purple-300 font-bold"># Output: 15 (Intended price * qty = 50)</span>
          </div>
          <p className="text-gray-400 font-sans text-xs pt-1">
            No error message is raised! The program executes cleanly to completion, but produces incorrect results due to wrong operators or logic.
          </p>
        </div>
      )}

      {/* Tab 4: Quiz */}
      {activeTab === 'quiz' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-cyan-500/30 space-y-3">
            <div className="text-cyan-400 font-bold uppercase text-[11px] font-sans flex justify-between">
              <span>Error Diagnostic Challenge {quizIdx + 1} of {quizQuestions.length}</span>
            </div>
            <pre className="bg-slate-900 p-3.5 rounded-xl border border-white/10 text-white font-bold text-xs">
              {currentQuiz.code}
            </pre>
          </div>

          <div className="grid grid-cols-3 gap-3 font-sans font-bold text-xs">
            <button
              onClick={() => setSelectedAns('syntax')}
              className={`p-3 rounded-xl border transition-all ${
                selectedAns === 'syntax'
                  ? 'bg-red-950 border-red-500 text-white'
                  : 'bg-slate-900 border-white/10 text-gray-300'
              }`}
            >
              Syntax Error
            </button>
            <button
              onClick={() => setSelectedAns('runtime')}
              className={`p-3 rounded-xl border transition-all ${
                selectedAns === 'runtime'
                  ? 'bg-amber-950 border-amber-500 text-white'
                  : 'bg-slate-900 border-white/10 text-gray-300'
              }`}
            >
              Runtime Error
            </button>
            <button
              onClick={() => setSelectedAns('logical')}
              className={`p-3 rounded-xl border transition-all ${
                selectedAns === 'logical'
                  ? 'bg-purple-950 border-purple-500 text-white'
                  : 'bg-slate-900 border-white/10 text-gray-300'
              }`}
            >
              Logical Error
            </button>
          </div>

          {selectedAns && (
            <div
              className={`p-4 rounded-2xl border ${
                selectedAns === currentQuiz.correct
                  ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                  : 'bg-red-950/60 border-red-500/50 text-red-200'
              }`}
            >
              <div className="font-bold font-sans text-sm pb-1">
                {selectedAns === currentQuiz.correct ? '✓ Correct Diagnosis!' : '❌ Incorrect Category'}
              </div>
              <div className="font-sans text-xs">{currentQuiz.desc}</div>
              <button
                onClick={() => {
                  setSelectedAns(null);
                  setQuizIdx((quizIdx + 1) % quizQuestions.length);
                }}
                className="mt-3 bg-cyan-600 text-white px-4 py-1.5 rounded-xl font-bold font-sans text-xs"
              >
                Next Challenge →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
