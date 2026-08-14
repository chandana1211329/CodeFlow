import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Box, ChevronRight, Info, Layers, List, Play, Zap, Globe, Database, Terminal, RotateCcw, Plus, Minus } from 'lucide-react';
import { ExecutionStep } from '../types';
import ExecutionScene from './ThreeD/ExecutionScene';

interface VisualizationPanelProps {
  currentStep: ExecutionStep | null;
  steps: ExecutionStep[];
  currentStepIndex: number;
  error: string | null;
  courseId: string;
  code: string;
}

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({
  currentStep,
  steps,
  currentStepIndex,
  error,
  courseId,
  code,
}) => {
  const [viewMode, setViewMode] = useState<'3d' | 'data' | 'explanation' | 'preview' | 'table' | 'output'>('3d');
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
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
              <Info className="text-white w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-400">Execution Error</h3>
              <p className="text-red-300/60 text-sm">Compilation or Runtime failed</p>
            </div>
          </div>
          <div className="bg-black/20 rounded-xl p-4 font-mono text-sm text-red-200 border border-white/5">
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
            <ViewTab active={viewMode === 'output'} onClick={() => setViewMode('output')} icon={<Terminal className="w-4 h-4" />} label="Console Output" />
          )}
          <ViewTab active={viewMode === 'explanation'} onClick={() => setViewMode('explanation')} icon={<BookOpen className="w-4 h-4" />} label="AI Guide" />
        </div>
        <div className="text-xs font-mono text-gray-500 hidden sm:block">
          {currentStep ? `Step ${currentStepIndex + 1} of ${steps.length}` : 'Ready'}
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
                  <ExecutionScene currentStep={currentStep} />
                  <motion.div 
                    key="floating-card"
                    drag
                    dragConstraints={containerRef}
                    dragElastic={0}
                    dragMomentum={false}
                    onPointerDown={(e) => e.stopPropagation()}
                    onDragEnd={(event, info) => {
                      setCardPosition(prev => ({
                        x: prev.x + info.offset.x,
                        y: prev.y + info.offset.y
                      }));
                    }}
                    style={{ x: cardPosition.x, y: cardPosition.y }}
                    className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 p-4 glass rounded-2xl shadow-2xl pointer-events-auto cursor-grab active:cursor-grabbing md:w-80 select-none z-50 border border-white/10"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/30">
                          <Zap className="text-white w-3 h-3" />
                        </div>
                        <span className="text-xs font-bold text-gray-300 tracking-wider">AI Explanation</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setCardPosition({ x: 0, y: 0 });
                          }}
                          className="p-1 hover:bg-white/5 rounded text-gray-500 hover:text-white transition-colors"
                          title="Reset Position"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsMinimized(!isMinimized);
                          }}
                          className="p-1 hover:bg-white/5 rounded text-gray-500 hover:text-white transition-colors"
                          title={isMinimized ? "Expand" : "Collapse"}
                        >
                          {isMinimized ? <Plus className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                    {/* Content */}
                    {!isMinimized && (
                      <div className="mt-3 text-white text-xs leading-relaxed max-h-36 overflow-y-auto no-scrollbar pr-1">
                        {currentStep.description || `Executing line ${currentStep.line}...`}
                      </div>
                    )}
                  </motion.div>
                </>
              ) : (
                <EmptyState icon={<Play className="text-blue-500 w-10 h-10 fill-blue-500" />} title="Ready to Visualize?" description="Write code and click Run to start the visualization." />
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
                      {/* Mock data for visualization demo */}
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
                      <List className="w-4 h-4" /> Active Variables
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(currentStep.variables).length > 0 ? (
                        Object.entries(currentStep.variables).map(([name, value]) => (
                          <VariableCard key={name} name={name} value={value} />
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
                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
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
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/30">
                    <BookOpen className="text-white w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Step Explanation</h2>
                    <p className="text-gray-400">Deep dive into what's happening internally.</p>
                  </div>
                </div>

                {currentStep ? (
                  <div className="space-y-6">
                    <div className="p-6 glass rounded-2xl border-l-4 border-blue-500">
                      <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2 uppercase text-xs tracking-widest">Logic Flow</h4>
                      <p className="text-gray-200 leading-relaxed text-lg">
                        {currentStep.description || "The program is executing this line to update the state of your application."}
                      </p>
                    </div>
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
                    <span className="text-xs font-mono text-gray-400 ml-2">bash - terminal</span>
                  </div>
                  <div className="text-[10px] font-mono text-gray-500">
                    UTF-8
                  </div>
                </div>
                {/* Terminal Body */}
                <div className="flex-1 p-6 font-mono text-sm overflow-auto text-emerald-400 space-y-2 selection:bg-emerald-500/20">
                  {steps.length > 0 ? (
                    (() => {
                      const finalOutput = steps[steps.length - 1]?.output;
                      return finalOutput ? (
                        <pre className="whitespace-pre-wrap leading-relaxed">{finalOutput}</pre>
                      ) : (
                        <div className="text-gray-500 italic">
                          No stdout output detected from program execution.
                        </div>
                      );
                    })()
                  ) : (
                    <div className="text-gray-500 italic">
                      Terminal ready. Write code and click Run.
                    </div>
                  )}
                  {/* Cursor */}
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

const VariableCard = ({ name, value }: any) => {
  const isArray = Array.isArray(value);
  return (
    <div className="p-4 rounded-xl glass glass-hover">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-blue-400 font-mono uppercase tracking-widest">{name}</span>
        <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-500 uppercase">{isArray ? 'Array' : typeof value}</span>
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
