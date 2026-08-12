import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Eye, Layers, LogOut, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import CodeFlowLogo from '../components/CodeFlowLogo';

const LandingPage: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <Link to="/">
          <CodeFlowLogo variant="horizontal" size="md" />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors cursor-pointer">Features</button>
          <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors cursor-pointer">How it Works</button>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            to="/dashboard" 
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all shadow-lg shadow-blue-600/20"
          >
            Courses
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-4 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
            Reimagining Code Education
          </span>
          <h1 className="mt-8 text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Don't just write code.<br />
            <span className="text-gradient">Visualize the logic.</span>
          </h1>
          <p className="mt-8 text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Stop memorizing syntax. Understand how your programs actually work in memory with our 3D execution engine. Built for absolute beginners.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all text-lg group">
              Start Learning Free
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/playground" className="w-full sm:w-auto px-8 py-4 glass text-white font-bold rounded-xl hover:bg-white/5 transition-all text-lg">
              Open Playground
            </Link>
          </div>
        </motion.div>

        {/* Hero Image Mockup */}
        <motion.div
          id="how-it-works"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 relative max-w-5xl mx-auto scroll-mt-24"
        >
          <div className="absolute inset-0 bg-blue-600/20 blur-[100px] -z-10" />
          <div className="glass rounded-2xl p-2 shadow-2xl overflow-hidden">
            <div className="bg-[#0f172a] rounded-xl aspect-video relative flex items-center justify-center overflow-hidden">
              {/* Video Visualization */}
              <video 
                src="/CodeVisualization.mp4" 
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold">Everything you need to master coding</h2>
          <p className="mt-4 text-gray-400">Interactive tools designed to make the complex simple.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Eye className="w-6 h-6 text-blue-400" />}
            title="3D Visualization"
            description="See variables, arrays, and functions come to life in a fully interactive 3D environment."
          />
          <FeatureCard 
            icon={<Code className="w-6 h-6 text-purple-400" />}
            title="Multi-Language"
            description="Learn Python, Java, and C with the same powerful visualization tools."
          />
          <FeatureCard 
            icon={<Layers className="w-6 h-6 text-pink-400" />}
            title="Memory Tracking"
            description="Understand how the Stack and Heap work by watching data move in real-time."
          />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-8 rounded-2xl glass glass-hover">
    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
