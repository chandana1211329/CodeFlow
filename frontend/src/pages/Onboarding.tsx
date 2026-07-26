import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import CodeFlowLogo from '../components/CodeFlowLogo';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    localStorage.setItem('codeflow_user_level', 'STARTER');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key="step1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="glass rounded-3xl p-10 text-center flex flex-col items-center"
          >
            <CodeFlowLogo variant="full" size="lg" className="mb-6" />
            <p className="text-gray-400 text-lg mb-10">
              Get ready to visualize and understand how your code works in memory step-by-step.
              Let's begin your visual learning journey!
            </p>
            <button
              onClick={handleComplete}
              className="w-full py-4 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all text-xl"
            >
              Let's Get Started
              <ArrowRight />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
