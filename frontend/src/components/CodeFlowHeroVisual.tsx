import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export const CodeFlowHeroVisual: React.FC = () => {
  const [activeLine, setActiveLine] = useState<number>(0);

  // Cycle through code steps for live dynamic animation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLine((prev) => (prev + 1) % 5);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[340px] lg:min-h-[420px] flex items-center justify-center select-none overflow-visible">
      {/* Background Neon Ambient Glows */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-purple-600/20 blur-[90px] rounded-full -z-10" />

      {/* 3D PERSPECTIVE STAGE */}
      <div className="relative w-full max-w-[620px] aspect-[16/11] flex items-center justify-center">
        {/* Isometric Grid Floor Lines */}
        <div className="absolute inset-0 opacity-30 pointer-events-none -z-10">
          <svg className="w-full h-full" viewBox="0 0 600 420" fill="none">
            <g stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.6">
              <line x1="0" y1="360" x2="600" y2="360" />
              <line x1="0" y1="390" x2="600" y2="390" />
              <line x1="50" y1="300" x2="550" y2="420" />
              <line x1="150" y1="300" x2="450" y2="420" />
              <line x1="550" y1="300" x2="50" y2="420" />
              <line x1="450" y1="300" x2="150" y2="420" />
            </g>
          </svg>
        </div>

        {/* 1. CODE EDITOR CARD (Left 3D Floating Window) */}
        <motion.div
          initial={{ opacity: 0, x: -30, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute left-[2%] top-[8%] w-[52%] bg-[#080d1e]/90 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-4 shadow-2xl shadow-blue-950/80 z-20"
          style={{
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Header Window Bar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Play className="w-2.5 h-2.5 fill-blue-400" />
            </div>
          </div>

          {/* Python Code Snippet */}
          <div className="font-mono text-xs sm:text-sm leading-relaxed space-y-1 text-gray-300">
            <div className={`px-1.5 py-0.5 rounded transition-colors ${activeLine === 0 ? 'bg-blue-500/20 text-blue-300 font-bold' : ''}`}>
              <span className="text-purple-400 font-semibold">def</span> <span className="text-blue-400">add</span>(a, b):
            </div>
            <div className={`px-1.5 py-0.5 rounded transition-colors ${activeLine === 1 ? 'bg-purple-500/20 text-purple-300 font-bold' : ''}`}>
              &nbsp;&nbsp;c = a + b
            </div>
            <div className={`px-1.5 py-0.5 rounded transition-colors ${activeLine === 2 ? 'bg-indigo-500/20 text-indigo-300 font-bold' : ''}`}>
              &nbsp;&nbsp;<span className="text-purple-400 font-semibold">return</span> c
            </div>
            <div className="h-2" />
            <div className={`px-1.5 py-0.5 rounded transition-colors ${activeLine === 3 ? 'bg-cyan-500/20 text-cyan-300 font-bold' : ''}`}>
              result = <span className="text-blue-400">add</span>(<span className="text-amber-400">5</span>, <span className="text-amber-400">7</span>)
            </div>
            <div className={`px-1.5 py-0.5 rounded transition-colors ${activeLine === 4 ? 'bg-pink-500/20 text-pink-300 font-bold' : ''}`}>
              <span className="text-purple-400">print</span>(result)
            </div>
          </div>
        </motion.div>

        {/* 2. GLOWING NEON LASER CONNECTOR PATHS (SVG Lines) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" viewBox="0 0 600 420">
          <defs>
            <linearGradient id="laserGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Path to Memory */}
          <path
            d="M 310 160 C 370 160, 390 70, 440 60"
            fill="none"
            stroke="url(#laserGrad1)"
            strokeWidth="3"
            filter="url(#glowEffect)"
          />
          <circle cx="440" cy="60" r="4" fill="#38bdf8" filter="url(#glowEffect)" />

          {/* Path from Memory to Stack */}
          <path
            d="M 490 145 C 490 170, 480 185, 460 210"
            fill="none"
            stroke="url(#laserGrad1)"
            strokeWidth="3"
            filter="url(#glowEffect)"
          />
          <circle cx="460" cy="210" r="4" fill="#a855f7" filter="url(#glowEffect)" />

          {/* Path from Stack to Output */}
          <path
            d="M 500 290 C 530 310, 520 330, 520 350"
            fill="none"
            stroke="url(#laserGrad1)"
            strokeWidth="3"
            filter="url(#glowEffect)"
          />
          <circle cx="520" cy="350" r="4" fill="#ec4899" filter="url(#glowEffect)" />
        </svg>

        {/* 3. MEMORY 3D CARD (Top Right) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute right-[4%] top-[2%] w-[36%] bg-[#0c132c]/95 backdrop-blur-xl border border-cyan-500/40 rounded-2xl p-3 shadow-xl z-20"
          style={{
            boxShadow: '0 15px 40px rgba(14, 165, 233, 0.25)',
          }}
        >
          <div className="text-center font-bold text-xs text-cyan-300 pb-1.5 border-b border-cyan-500/20 mb-2">
            Memory
          </div>
          <div className="font-mono text-xs space-y-1.5 text-gray-200">
            <div className="flex justify-between px-2 py-0.5 rounded bg-blue-950/50 border border-blue-500/20">
              <span className="text-blue-300 font-semibold">a</span>
              <span className="text-cyan-400 font-bold">5</span>
            </div>
            <div className="flex justify-between px-2 py-0.5 rounded bg-blue-950/50 border border-blue-500/20">
              <span className="text-blue-300 font-semibold">b</span>
              <span className="text-cyan-400 font-bold">7</span>
            </div>
            <div className="flex justify-between px-2 py-0.5 rounded bg-purple-950/50 border border-purple-500/20">
              <span className="text-purple-300 font-semibold">c</span>
              <span className="text-purple-300 font-bold">12</span>
            </div>
            <div className="flex justify-between px-2 py-0.5 rounded bg-indigo-950/50 border border-indigo-500/20">
              <span className="text-indigo-300 font-semibold">result</span>
              <span className="text-emerald-400 font-bold">12</span>
            </div>
          </div>
        </motion.div>

        {/* 4. STACK 3D CARD (Middle Right) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute right-[10%] top-[46%] w-[34%] bg-[#120d28]/95 backdrop-blur-xl border border-purple-500/40 rounded-2xl p-3 shadow-xl z-20"
          style={{
            boxShadow: '0 15px 40px rgba(168, 85, 247, 0.25)',
          }}
        >
          <div className="text-center font-bold text-xs text-purple-300 pb-1.5 border-b border-purple-500/20 mb-2">
            Stack
          </div>
          <div className="font-mono text-[11px] leading-tight space-y-1 text-purple-200">
            <div className="font-bold text-purple-300">add()</div>
            <div className="pl-2 text-gray-300">c = a + b</div>
            <div className="pl-2 text-purple-400">return c</div>
          </div>
        </motion.div>

        {/* 5. OUTPUT 3D CARD (Bottom Right) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute right-[2%] bottom-[4%] w-[26%] bg-[#081826]/95 backdrop-blur-xl border border-emerald-500/40 rounded-2xl p-3 shadow-xl z-20"
          style={{
            boxShadow: '0 15px 35px rgba(16, 185, 129, 0.25)',
          }}
        >
          <div className="text-center font-bold text-xs text-emerald-300 pb-1 mb-1">
            Output
          </div>
          <div className="text-center font-mono text-sm font-extrabold text-emerald-400 bg-emerald-950/60 rounded py-1 border border-emerald-500/30">
            12
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CodeFlowHeroVisual;
