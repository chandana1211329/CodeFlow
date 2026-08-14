import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  GraduationCap, 
  Code2, 
  Heart, 
  Box, 
  Terminal, 
  BarChart3, 
  Rocket, 
  Mail,
  User,
  Compass
} from 'lucide-react';
import CodeFlowLogo from '../components/CodeFlowLogo';
import CodeFlowHeroVisual from '../components/CodeFlowHeroVisual';

export const IntroLandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleEnterCodeFlow = () => {
    navigate('/app');
  };

  const handleViewDetails = () => {
    const detailsElem = document.getElementById('codeflow-details-card');
    if (detailsElem) {
      detailsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-[#050814] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-6 relative selection:bg-blue-500 selection:text-white font-sans">
      {/* Background Ambient Lighting Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-blue-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] bg-purple-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] bg-pink-600/10 rounded-full blur-[140px]" />
        {/* Subtle Background Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* 1. TOP NAVBAR HEADER */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between py-1 px-2 z-20">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <CodeFlowLogo variant="horizontal" size="md" />
        </div>
      </header>

      {/* 2. HERO MAIN CONTENT ROW (Flex-1, Grid 2 columns) */}
      <main className="w-full max-w-7xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center py-2 lg:py-4 z-20 my-auto">
        {/* LEFT COLUMN: Personal Brand & Intro */}
        <div className="lg:col-span-6 space-y-4 lg:space-y-5">
          {/* Capsule Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider"
          >
            <User className="w-3.5 h-3.5" />
            <span>A PROJECT BY</span>
          </motion.div>

          {/* Heading Name */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-1"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-gray-100">
              Hi, I'm <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent font-black">
                Palle Chandana
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-bold text-gray-200">
              Developer of{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-extrabold">
                CodeFlow ✨
              </span>
            </p>
          </motion.div>

          {/* Description Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal"
          >
            CodeFlow is an <strong className="text-white font-semibold">interactive code visualization platform</strong> that helps beginners understand how code actually works behind the scenes. I built this project to make learning programming easy, visual, and fun for everyone.
          </motion.p>

          {/* 3 Capability Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap items-center gap-2.5 pt-1"
          >
            <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-gray-200 text-xs font-medium flex items-center gap-2 shadow-sm">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span>Computer Science Graduate</span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-gray-200 text-xs font-medium flex items-center gap-2 shadow-sm">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span>Full-Stack Developer</span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-gray-200 text-xs font-medium flex items-center gap-2 shadow-sm">
              <Heart className="w-4 h-4 text-pink-400 fill-pink-500/20" />
              <span>Passionate about EdTech & Learning</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <button
              onClick={handleEnterCodeFlow}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Enter CodeFlow</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/career-roadmap')}
              className="px-5 py-3 bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 text-blue-300 font-semibold text-sm rounded-xl transition-all cursor-pointer flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-blue-400" />
              <span>Career Roadmap</span>
            </button>

            <button
              onClick={handleViewDetails}
              className="px-5 py-3 bg-white/5 border border-white/15 hover:bg-white/10 text-gray-300 hover:text-white font-semibold text-sm rounded-xl transition-all cursor-pointer"
            >
              View Project Details
            </button>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: 3D Hero Visualizer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-6 w-full flex items-center justify-center"
        >
          <CodeFlowHeroVisual />
        </motion.div>
      </main>

      {/* 3. BOTTOM UNIFIED SECTION CARD (What is CodeFlow + 4 Features) */}
      <motion.div
        id="codeflow-details-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full max-w-7xl mx-auto z-20 mb-2"
      >
        <div className="bg-[#090d1f]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
            {/* Left Section: What is CodeFlow? */}
            <div className="lg:col-span-4 lg:border-r border-white/10 lg:pr-6 space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                What is <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">CodeFlow</span>?
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                CodeFlow visualizes your code execution step-by-step so you can truly understand what happens in memory, stack, heap, and output.
              </p>
            </div>

            {/* Right Section: 4 Features */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:pl-2">
              {/* Feature 1 */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Box className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white mb-0.5">3D Visualizations</h3>
                  <p className="text-[11px] text-gray-400 leading-tight">Real-time 3D view of code execution and memory.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white mb-0.5">Beginner Friendly</h3>
                  <p className="text-[11px] text-gray-400 leading-tight">Designed specifically for starters and learners.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white mb-0.5">Multiple Languages</h3>
                  <p className="text-[11px] text-gray-400 leading-tight">Support for Python, Java & Data Structures.</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
                  <Rocket className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white mb-0.5">Learn by Doing</h3>
                  <p className="text-[11px] text-gray-400 leading-tight">Interactive. Visual. Effective.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4. FOOTER BAR */}
      <footer className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 pt-2 border-t border-white/5 z-20">
        <div>
          Built with <Heart className="w-3.5 h-3.5 inline text-red-500 fill-red-500 mx-0.5" /> by{' '}
          <span className="text-white font-semibold">Palle Chandana</span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default IntroLandingPage;
