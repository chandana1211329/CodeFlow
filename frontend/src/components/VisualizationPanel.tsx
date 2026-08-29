import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Box, ChevronRight, Info, Layers, List, Play, Zap, Globe, Database, Terminal, RotateCcw, Plus, Minus, HelpCircle, GitCommit, ArrowRight, Sparkles, AlertTriangle } from 'lucide-react';
import { ExecutionStep } from '../types';
import ExecutionScene from './ThreeD/ExecutionScene';
import WhyModal from './WhyModal';
import FullProgramFlow from './FullProgramFlow';

interface VisualizationPanelProps {
  currentStep: ExecutionStep | null;
  steps: ExecutionStep[];
  currentStepIndex: number;
  error: string | null;
  courseId: string;
  code: string;
  onSelectStep?: (index: number) => void;
}

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({
  currentStep,
  steps,
  currentStepIndex,
  error,
  courseId,
  code,
  onSelectStep,
}) => {
  const [viewMode, setViewMode] = useState<'3d' | 'data' | 'explanation' | 'flow' | 'preview' | 'table' | 'output'>('3d');
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isWhyModalOpen, setIsWhyModalOpen] = useState(false);
  const [highlightedVar, setHighlightedVar] = useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (courseId === 'html' || courseId === 'css') {
      setViewMode('preview');
    } else if (courseId === 'sql') {
      setViewMode('table');
    } else {
      setViewMode('3d');
    }
  }, [courseId]);

  if (error) {
    return (
      <div className="h-full flex flex-col p-6 bg-[#020617]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 shadow-2xl shadow-red-500/10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
              <AlertTriangle className="text-white w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-400">Execution Error</h3>
              <p className="text-red-300/60 text-sm">Compilation or Runtime failed</p>
            </div>
          </div>
          <div className="bg-black/20 rounded-xl p-4 font-mono text-sm text-red-200 border border-white/5 whitespace-pre-wrap">
            {error}
          </div>
        </motion.div>
      </div>
    );
  }

  const isWebCourse = courseId === 'html' || courseId === 'css';
  const isSQLCourse = courseId === 'sql';

  return (
    <div className="h-full flex flex-col bg-[#020617]">
      {/* View Selector */}
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#020617] overflow-x-auto no-scrollbar">
        <div className="flex gap-6 h-full min-w-max">
          {!isWebCourse && !isSQLCourse && (
            <ViewTab active={viewMode === '3d'} onClick={() => setViewMode('3d')} icon={<Box className="w-4 h-4" />} label="3D Scene" />
          )}
          {isWebCourse && (
            <ViewTab active={viewMode === 'preview'} onClick={() => setViewMode('preview')} icon={<Globe className="w-4 h-4" />} label="Live Preview" />
          )}
          {isSQLCourse && (
            <ViewTab active={viewMode === 'table'} onClick={() => setViewMode('table')} icon={<Database className="w-4 h-4" />} label="Table View" />
          )}
          <ViewTab active={viewMode === 'data'} onClick={() => setViewMode('data')} icon={<Layers className="w-4 h-4" />} label="Memory Data" />
          {!isWebCourse && !isSQLCourse && (
            <ViewTab active={viewMode === 'flow'} onClick={() => setViewMode('flow')} icon={<GitCommit className="w-4 h-4" />} label="Program Flow" />
          )}
          {!isWebCourse && !isSQLCourse && (
            <ViewTab active={viewMode === 'output'} onClick={() => setViewMode('output')} icon={<Terminal className="w-4 h-4" />} label="Console Output" />
          )}
          <ViewTab active={viewMode === 'explanation'} onClick={() => setViewMode('explanation')} icon={<BookOpen className="w-4 h-4" />} label="AI Guide" />
        </div>
        <div className="text-xs font-mono text-gray-400 hidden sm:flex items-center gap-3">
          {currentStep && (
            <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 font-semibold border border-blue-500/30">
              {currentStep.operationType || 'STEP'}
            </span>
          )}
          <span>
            {currentStep ? `Step ${currentStepIndex + 1} of ${steps.length}` : 'Ready'}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {viewMode === '3d' && (
            <motion.div 
              key="3d" 
              ref={containerRef}
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="flex-1 relative"
            >
              {currentStep ? (
                <>
                  <ExecutionScene currentStep={currentStep} highlightedVar={highlightedVar} />
                  
                  {/* Sleek Non-Intrusive Bottom HUD Bar (Does NOT obscure 3D scene) */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pointer-events-auto z-40">
                    {/* What Changed & Step Summary Pill */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 p-2.5 px-4 bg-black/70 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl max-w-xl truncate">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                        <div className="font-mono text-xs truncate">
                          <span className="text-gray-400 font-bold mr-2">LINE {currentStep.line}:</span>
                          <span className="text-white font-semibold mr-3">{currentStep.code}</span>
                          {currentStep.diff?.summary && (
                            <span className="text-emerald-300 font-semibold bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                              {currentStep.diff.summary.split('\n')[0]}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Tree Traversal & Call Stack Overlay Pill */}
                      {currentStep.metadata?.tree?.traversalSequence && currentStep.metadata.tree.traversalSequence.length > 0 && (
                        <div className="flex items-center gap-2 p-2 px-3 bg-emerald-950/80 backdrop-blur-md rounded-xl border border-emerald-500/40 shadow-lg font-mono text-xs text-emerald-300">
                          <span className="font-bold text-emerald-400 uppercase">{currentStep.metadata.tree.traversalType || 'TREE'} SEQUENCE:</span>
                          <span className="bg-black/50 px-2 py-0.5 rounded font-bold text-white">
                            [{currentStep.metadata.tree.traversalSequence.join(' ──► ')}]
                          </span>
                        </div>
                      )}
                      {currentStep.callStack && currentStep.callStack.length > 1 && (
                        <div className="flex items-center gap-2 p-2 px-3 bg-indigo-950/80 backdrop-blur-md rounded-xl border border-indigo-500/40 shadow-lg font-mono text-xs text-indigo-300">
                          <span className="font-bold text-indigo-400 uppercase">CALL STACK DEPTH {currentStep.callStack.length}:</span>
                          <span className="bg-black/50 px-2 py-0.5 rounded text-indigo-200">
                            {currentStep.callStack.map(f => f.funcName).join(' ──► ')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Interactive Why Button */}
                    <button
                      onClick={() => setIsWhyModalOpen(true)}
                      className="px-4 py-2 rounded-2xl bg-blue-600/80 hover:bg-blue-500 backdrop-blur-md text-white text-xs font-bold border border-blue-400/40 shadow-xl shadow-blue-600/30 flex items-center gap-2 transition-all flex-shrink-0"
                    >
                      <HelpCircle className="w-4 h-4" /> Why did this happen?
                    </button>
                  </div>
                </>
              ) : (
                <EmptyState icon={<Play className="text-blue-500 w-10 h-10 fill-blue-500" />} title="Ready to Visualize?" description="Write code and click Run to start the step-by-step visualization." />
              )}
            </motion.div>
          )}

          {viewMode === 'preview' && (
            <motion.div 
              key="preview" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="flex-1 bg-white"
            >
              <iframe
                title="Preview"
                srcDoc={courseId === 'html' ? code : `<html><style>${code}</style><body><h1>Styled Heading</h1><p>Example paragraph.</p></body></html>`}
                className="w-full h-full border-none"
              />
            </motion.div>
          )}

          {viewMode === 'table' && (
            <motion.div 
              key="table" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="flex-1 p-6 overflow-auto"
            >
              <div className="space-y-6">
                 <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Database className="w-4 h-4" /> Result Set
                </h3>
                <div className="overflow-hidden rounded-2xl border border-white/5 glass">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-4 py-3 font-bold text-gray-400">ID</th>
                        <th className="px-4 py-3 font-bold text-gray-400">Name</th>
                        <th className="px-4 py-3 font-bold text-gray-400">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3 font-mono">1</td>
                        <td className="px-4 py-3">User_A</td>
                        <td className="px-4 py-3 text-blue-400">Active</td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3 font-mono">2</td>
                        <td className="px-4 py-3">User_B</td>
                        <td className="px-4 py-3 text-gray-500">Inactive</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === 'flow' && (
            <motion.div
              key="flow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 overflow-hidden"
            >
              <FullProgramFlow
                steps={steps}
                currentStepIndex={currentStepIndex}
                onSelectStep={(idx) => {
                  if (onSelectStep) onSelectStep(idx);
                }}
              />
            </motion.div>
          )}

          {viewMode === 'data' && (
            <motion.div 
              key="data" 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 overflow-auto p-6 space-y-6"
            >
              {currentStep ? (
                <>
                  {/* WHAT CHANGED COMPACT AREA */}
                  {currentStep.diff && currentStep.diff.summary && (
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> WHAT CHANGED AT THIS STEP?
                      </h4>
                      <pre className="font-mono text-sm text-emerald-200 whitespace-pre-wrap leading-relaxed">
                        {currentStep.diff.summary}
                      </pre>
                    </div>
                  )}

                  {/* DATA RELATIONSHIP FLOW */}
                  {currentStep.relationshipFlow && currentStep.relationshipFlow.length > 0 && (
                    <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30">
                      <h4 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <ArrowRight className="w-4 h-4" /> Data Provenance & Relationship Flow
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-white">
                        {currentStep.relationshipFlow.map((link, i) => (
                          <div key={i} className="flex items-center gap-2 bg-black/40 px-3 py-2 rounded-xl border border-white/10">
                            <span className="text-blue-300 font-bold">{link.from}</span>
                            <span className="text-gray-400">→</span>
                            <span className="text-yellow-400 font-medium">[{link.label}]</span>
                            <span className="text-gray-400">→</span>
                            <span className="text-emerald-300 font-bold">{link.to}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep.metadata && currentStep.metadata.mode !== 'memory' && (
                    <section className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 mb-6">
                      {currentStep.metadata.mode === 'operator' && currentStep.metadata.operator && (
                        <div>
                          <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">Operator Evaluation</h4>
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between bg-black/30 p-3 rounded-xl border border-white/5 font-mono text-sm">
                              <div>
                                <span className="text-gray-500">Expression:</span> <span className="text-white">{currentStep.metadata.operator.expr}</span>
                              </div>
                              <div className="text-blue-400 font-bold">
                                {currentStep.metadata.operator.targetVar} = {currentStep.metadata.operator.result}
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center text-xs">
                              <div className="bg-white/5 p-2 rounded-lg">
                                <p className="text-gray-500 mb-1">Operand 1</p>
                                <p className="font-mono text-white text-sm font-semibold">{currentStep.metadata.operator.operand1}</p>
                              </div>
                              <div className="bg-blue-500/20 p-2 rounded-lg flex flex-col justify-center items-center">
                                <p className="text-blue-300 font-bold text-base">{currentStep.metadata.operator.op}</p>
                              </div>
                              <div className="bg-white/5 p-2 rounded-lg">
                                <p className="text-gray-500 mb-1">Operand 2</p>
                                <p className="font-mono text-white text-sm font-semibold">{currentStep.metadata.operator.operand2}</p>
                              </div>
                            </div>
                            <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                              <p className="text-xs text-gray-400 mb-1">Substituted Expression</p>
                              <p className="font-mono text-base text-green-400 font-bold">{currentStep.metadata.operator.substituted}</p>
                              <p className="text-[10px] text-gray-500 mt-1">Evaluates to {currentStep.metadata.operator.result}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentStep.metadata.mode === 'conditional' && currentStep.metadata.conditional && (
                        <div>
                          <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-3">Conditional Decision Flow</h4>
                          <div className="space-y-4">
                            <div className="bg-black/30 p-4 rounded-xl border border-white/5 text-center font-mono">
                              <p className="text-xs text-gray-500 mb-1">Condition</p>
                              <p className="text-lg text-white font-bold">{currentStep.metadata.conditional.condition}</p>
                              <div className="w-4 h-4 mx-auto my-2 border-l border-white/20" />
                              <p className="text-xs text-gray-500 mb-1">Substituted</p>
                              <p className="text-sm text-yellow-400 font-semibold">{currentStep.metadata.conditional.substituted}</p>
                              <div className="w-4 h-4 mx-auto my-2 border-l border-white/20" />
                              <p className="text-xs text-gray-500 mb-1">Result</p>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentStep.metadata.conditional.result ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                                {currentStep.metadata.conditional.result ? 'TRUE' : 'FALSE'}
                              </span>
                            </div>

                            <div className="flex gap-2">
                              <div className={`flex-1 p-3 rounded-xl border text-center transition-all ${
                                currentStep.metadata.conditional.branchState === 'IF_ACTIVE' 
                                  ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                                  : 'bg-white/5 border-white/5 text-gray-500 opacity-40'
                              }`}>
                                <p className="text-[10px] uppercase font-bold tracking-wider">IF Branch</p>
                                <p className="text-xs mt-1 font-medium">{currentStep.metadata.conditional.branchState === 'IF_ACTIVE' ? 'Active' : 'Skipped'}</p>
                              </div>
                              <div className={`flex-1 p-3 rounded-xl border text-center transition-all ${
                                currentStep.metadata.conditional.branchState === 'ELSE_ACTIVE' || currentStep.metadata.conditional.branchState === 'ELIF_ACTIVE'
                                  ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                                  : 'bg-white/5 border-white/5 text-gray-500 opacity-40'
                              }`}>
                                <p className="text-[10px] uppercase font-bold tracking-wider">ELSE Branch</p>
                                <p className="text-xs mt-1 font-medium">{currentStep.metadata.conditional.branchState === 'ELSE_ACTIVE' || currentStep.metadata.conditional.branchState === 'ELIF_ACTIVE' ? 'Active' : 'Skipped'}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentStep.metadata.mode === 'loop' && currentStep.metadata.loop && (
                        <div>
                          <h4 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-3">Loop Iteration Tracker</h4>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between bg-black/30 p-3 rounded-xl border border-white/5">
                              <div>
                                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Loop Variable</p>
                                <p className="font-mono text-sm font-bold text-white mt-0.5">
                                  {currentStep.metadata.loop.loopVar || 'none'} = {currentStep.metadata.loop.loopValue || 'undefined'}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Iteration</p>
                                <p className="font-sans text-sm font-bold text-green-400 mt-0.5">
                                  {currentStep.metadata.loop.totalIterations > 0 
                                    ? `Iteration ${currentStep.metadata.loop.iteration} of ${currentStep.metadata.loop.totalIterations}`
                                    : `Iteration ${currentStep.metadata.loop.iteration}`
                                  }
                                </p>
                              </div>
                            </div>

                            <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-2">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-400">Loop Condition:</span>
                                <span className="font-mono text-white">{currentStep.metadata.loop.condition}</span>
                              </div>
                              {currentStep.metadata.loop.condition !== 'range/iterable' && (
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-gray-400">Substituted:</span>
                                  <span className="font-mono text-yellow-400">{currentStep.metadata.loop.substituted}</span>
                                </div>
                              )}
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-400">Condition Result:</span>
                                <span className={`font-bold ${currentStep.metadata.loop.conditionResult ? 'text-green-400' : 'text-red-400'}`}>
                                  {currentStep.metadata.loop.conditionResult ? 'TRUE (Loop Continues)' : 'FALSE (Loop Complete)'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </section>
                  )}

                  <section>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <List className="w-4 h-4" /> Memory Variables & Structures
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(currentStep.variables).length > 0 ? (
                        Object.entries(currentStep.variables).map(([name, value]) => (
                          <VariableCard 
                            key={name} 
                            name={name} 
                            value={value} 
                            isHighlighted={highlightedVar === name}
                            onClick={() => {
                              setHighlightedVar(name);
                              setViewMode('3d');
                            }}
                          />
                        ))
                      ) : (
                        <div className="col-span-full py-8 glass rounded-2xl text-center text-gray-500 italic">
                          No variables in current scope.
                        </div>
                      )}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Execution Context</h3>
                    <div className="glass rounded-2xl p-4 font-mono text-sm">
                      <div className="flex items-center gap-2 text-blue-400">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        main()
                      </div>
                      <div className="ml-4 pl-4 border-l border-white/5 py-2 space-y-2">
                        <div className="text-gray-300">
                          <span className="text-gray-500">LINE {currentStep.line}:</span> {currentStep.code}
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              ) : (
                <EmptyState icon={<Layers className="text-blue-500 w-10 h-10" />} title="No Data Yet" description="Data will appear here once code execution begins." />
              )}
            </motion.div>
          )}

          {viewMode === 'explanation' && (
            <motion.div 
              key="explanation" 
              initial={{ opacity: 0, x: 10 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -10 }}
              className="flex-1 p-8 overflow-auto"
            >
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/30">
                      <BookOpen className="text-white w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">AI Step Guide</h2>
                      <p className="text-gray-400 text-sm">Contextual execution analysis for Step {currentStepIndex + 1}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsWhyModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all"
                  >
                    <HelpCircle className="w-4 h-4" /> Why did this happen?
                  </button>
                </div>

                {currentStep ? (
                  <div className="space-y-6 font-sans">
                    {/* WHAT HAPPENED */}
                    <div className="p-6 glass rounded-2xl border-l-4 border-blue-500 space-y-2">
                      <h4 className="text-blue-400 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                        <Zap className="w-4 h-4" /> What Happened?
                      </h4>
                      <p className="text-gray-100 text-lg font-medium leading-relaxed">
                        {currentStep.explanation?.whatHappened || currentStep.description}
                      </p>
                      <p className="text-xs font-mono text-gray-400">
                        Line {currentStep.line}: <span className="text-blue-300 font-semibold">{currentStep.code}</span>
                      </p>
                    </div>

                    {/* WHY IT HAPPENED */}
                    <div className="p-6 glass rounded-2xl border-l-4 border-purple-500 space-y-2">
                      <h4 className="text-purple-400 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                        <BookOpen className="w-4 h-4" /> Why It Happened
                      </h4>
                      <p className="text-gray-200 text-sm leading-relaxed">
                        {currentStep.explanation?.whyItHappened || currentStep.whyDetails}
                      </p>
                    </div>

                    {/* WHAT CHANGED */}
                    {currentStep.diff && currentStep.diff.summary && (
                      <div className="p-6 glass rounded-2xl border-l-4 border-emerald-500 space-y-2">
                        <h4 className="text-emerald-400 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                          <Sparkles className="w-4 h-4" /> What Changed
                        </h4>
                        <pre className="font-mono text-sm text-emerald-200 whitespace-pre-wrap leading-relaxed">
                          {currentStep.diff.summary}
                        </pre>
                      </div>
                    )}
                  </div>
                ) : (
                   <EmptyState icon={<BookOpen className="text-blue-500 w-10 h-10" />} title="Learning Path" description="Explanations will guide you through each step of the execution." />
                )}
              </div>
            </motion.div>
          )}

          {viewMode === 'output' && (
            <motion.div 
              key="output" 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 overflow-hidden p-6 flex flex-col"
            >
              <div className="flex-1 flex flex-col bg-black/40 rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-black/60 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#ef4444]/80 border border-[#dc2626]/20" />
                      <span className="w-3 h-3 rounded-full bg-[#eab308]/80 border border-[#d97706]/20" />
                      <span className="w-3 h-3 rounded-full bg-[#22c55e]/80 border border-[#16a34a]/20" />
                    </div>
                    <span className="text-xs font-mono text-gray-400 ml-2">bash - step output</span>
                  </div>
                  <div className="text-[10px] font-mono text-gray-500">
                    Step {currentStepIndex + 1} Output
                  </div>
                </div>
                {/* Step-Aware Terminal Body */}
                <div className="flex-1 p-6 font-mono text-sm overflow-auto text-emerald-400 space-y-2 selection:bg-emerald-500/20">
                  {currentStep && currentStep.output ? (
                    <pre className="whitespace-pre-wrap leading-relaxed">{currentStep.output}</pre>
                  ) : (
                    <div className="text-gray-500 italic">
                      No console output emitted at Step {currentStepIndex + 1}.
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-gray-500">$</span>
                    <span className="w-2 h-4 bg-emerald-400 animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <WhyModal
        isOpen={isWhyModalOpen}
        onClose={() => setIsWhyModalOpen(false)}
        currentStep={currentStep}
      />
    </div>
  );
};

const ViewTab = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-1 h-full border-b-2 transition-all relative ${
      active ? 'border-blue-500 text-white font-bold' : 'border-transparent text-gray-500 hover:text-gray-300'
    }`}
  >
    {icon}
    <span className="text-sm">{label}</span>
    {active && (
      <motion.div 
        layoutId="tab-glow" 
        className="absolute inset-x-0 -bottom-px h-4 bg-blue-500/10 blur-md"
      />
    )}
  </button>
);

const EmptyState = ({ icon, title, description }: any) => (
  <div className="h-full flex items-center justify-center p-6">
    <div className="text-center max-w-sm">
      <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
        {icon}
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-500 leading-relaxed">{description}</p>
    </div>
  </div>
);

const VariableCard = ({ name, value, isHighlighted, onClick }: any) => {
  const isArray = Array.isArray(value);
  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-xl glass cursor-pointer transition-all ${
        isHighlighted ? 'ring-2 ring-blue-500 bg-blue-600/20 shadow-lg shadow-blue-500/20' : 'glass-hover'
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-blue-400 font-mono uppercase tracking-widest flex items-center gap-1.5">
          {name} {isHighlighted && <span className="text-[10px] text-emerald-400">● 3D Focused</span>}
        </span>
        <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-400 uppercase font-mono">{isArray ? 'Array' : typeof value}</span>
      </div>
      <div className="font-mono text-lg text-white">
        {isArray ? (
          <div className="flex gap-2 flex-wrap">
            <span className="text-gray-600">[</span>
            {value.map((v, i) => (
              <span key={i} className="px-2 py-0.5 bg-blue-500/10 rounded text-blue-300 border border-blue-500/20">
                {String(v)}{i < value.length - 1 ? ',' : ''}
              </span>
            ))}
            <span className="text-gray-600">]</span>
          </div>
        ) : (
          <span className="text-emerald-400">{String(value)}</span>
        )}
      </div>
    </div>
  );
};

export default VisualizationPanel;
