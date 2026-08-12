import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  GraduationCap, 
  Code2, 
  Sparkles, 
  Eye, 
  BookOpen, 
  PlayCircle, 
  Layers, 
  ChevronDown
} from 'lucide-react';
import CodeFlowLogo from '../components/CodeFlowLogo';
import CodeFlowHeroVisual from '../components/CodeFlowHeroVisual';

export const IntroLandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleEnterCodeFlow = () => {
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden relative selection:bg-blue-500 selection:text-white">
      {/* Background ambient lighting effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-blue-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-[30%] right-[-15%] w-[45%] h-[45%] bg-purple-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-pink-600/10 rounded-full blur-[140px]" />
      </div>

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#020617]/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <CodeFlowLogo variant="horizontal" size="md" />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#what-is-codeflow" className="hover:text-blue-400 transition-colors">Project</a>
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
          </nav>

          {/* Primary Action Button */}
          <button
            onClick={handleEnterCodeFlow}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-full transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center gap-2 group cursor-pointer"
          >
            <span>Enter CodeFlow</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6">
        {/* HERO SECTION */}
        <section id="about" className="pt-12 pb-24 md:pt-20 md:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Creator & Project Info */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>A PROJECT BY</span>
            </motion.div>

            {/* Creator Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Hi, I'm <br />
                <span className="text-gradient drop-shadow-sm">Palle Chandana</span>
              </h1>
              <p className="mt-2 text-xl font-semibold text-blue-400/90 tracking-wide">
                Creator of CodeFlow
              </p>
            </motion.div>

            {/* Project Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-xl"
            >
              <p className="font-normal text-gray-200">
                CodeFlow is an interactive programming learning platform designed to help beginners understand how code actually works through step-by-step execution and interactive visualization.
              </p>
              <p className="text-gray-400 text-base">
                I built CodeFlow to make programming more visual, understandable, and engaging for beginners.
              </p>
            </motion.div>

            {/* Creator Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2"
            >
              <div className="p-3.5 rounded-xl glass border border-white/5 flex items-start gap-3 hover:border-blue-500/30 transition-all">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-200 leading-tight">Computer Science Graduate</h3>
                </div>
              </div>

              <div className="p-3.5 rounded-xl glass border border-white/5 flex items-start gap-3 hover:border-purple-500/30 transition-all">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-200 leading-tight">Full-Stack Developer</h3>
                </div>
              </div>

              <div className="p-3.5 rounded-xl glass border border-white/5 flex items-start gap-3 hover:border-pink-500/30 transition-all">
                <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-200 leading-tight">Building Interactive Learning Experiences</h3>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
            >
              <button
                onClick={handleEnterCodeFlow}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 text-base group cursor-pointer"
              >
                <span>Enter CodeFlow</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#what-is-codeflow"
                className="px-7 py-4 glass hover:bg-white/10 text-gray-300 hover:text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all text-base border border-white/10"
              >
                <span>View Project Details</span>
                <ChevronDown className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <CodeFlowHeroVisual />
          </motion.div>
        </section>

        {/* "WHAT IS CODEFLOW?" SECTION */}
        <section id="what-is-codeflow" className="py-24 border-t border-white/5 relative scroll-mt-20">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
              <span>PROJECT SUMMARY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              What is <span className="text-gradient">CodeFlow</span>?
            </h2>

            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed font-normal">
              CodeFlow visualizes code execution step by step, helping learners understand what happens inside a program instead of simply memorizing syntax.
            </p>
          </div>
        </section>

        {/* FEATURE CARDS SECTION */}
        <section id="features" className="py-24 border-t border-white/5 scroll-mt-20">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Core Features</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Everything built into CodeFlow to provide an intuitive execution experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl glass glass-hover border border-white/10 flex flex-col justify-between transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <Eye className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-mono font-bold text-gray-500">01</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">3D Visualization</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Visualize program execution through an interactive 3D environment.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl glass glass-hover border border-white/10 flex flex-col justify-between transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                    <PlayCircle className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-mono font-bold text-gray-500">02</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Beginner Friendly</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Designed to help beginners understand programming concepts visually.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl glass glass-hover border border-white/10 flex flex-col justify-between transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 border border-pink-500/20">
                    <Layers className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-mono font-bold text-gray-500">03</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Interactive Learning</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Learn concepts by writing, running, and observing code.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-8 rounded-2xl glass glass-hover border border-white/10 flex flex-col justify-between transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-mono font-bold text-gray-500">04</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Structured Courses</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Learn programming concepts through organized courses and topic-based lessons.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA CARD BEFORE FOOTER */}
        <section className="py-12 mb-16">
          <div className="rounded-3xl glass p-8 sm:p-12 border border-blue-500/20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 -z-10" />
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to experience CodeFlow?</h3>
            <p className="text-gray-400 max-w-lg mx-auto mb-8 text-sm sm:text-base">
              Step into the interactive code execution engine and start visualizing your logic today.
            </p>
            <button
              onClick={handleEnterCodeFlow}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl inline-flex items-center gap-2 transition-all shadow-xl shadow-blue-500/20 text-base group cursor-pointer"
            >
              <span>Enter CodeFlow</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </main>

      {/* CREATOR / PROJECT FOOTER */}
      <footer className="border-t border-white/5 py-10 bg-[#020617]/90">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <CodeFlowLogo variant="icon" size={32} />
            <span className="text-sm font-semibold text-gray-400">
              Built by <span className="text-white font-bold">Palle Chandana</span>
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-gray-400">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full glass hover:bg-white/10 hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full glass hover:bg-white/10 hover:text-white transition-colors"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IntroLandingPage;
