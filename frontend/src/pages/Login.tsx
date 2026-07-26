import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Zap, Loader2, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { getApiBaseUrl } from '../api';
import CodeFlowLogo from '../components/CodeFlowLogo';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${getApiBaseUrl()}/login`, {
        email,
        password
      });
      login(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-all group z-20 bg-white/5 px-4 py-2 rounded-xl border border-white/5 hover:border-white/10"
      >
        <Home className="w-5 h-5" />
        <span className="font-bold text-sm">Back to Home</span>
      </Link>

      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="text-center mb-8 flex flex-col items-center">
          <CodeFlowLogo variant="full" size="md" showTagline={false} className="mb-4" />
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-gray-400 text-sm mt-1">Continue your visual learning journey</p>
        </div>

        <div className="glass rounded-3xl p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500 transition-colors text-white"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500 transition-colors text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 text-center text-gray-500 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-400 font-bold hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
