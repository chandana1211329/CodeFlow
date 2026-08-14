import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Home, Search, Zap, Compass
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { COURSES } from '../data/courses';
import CodeFlowLogo from '../components/CodeFlowLogo';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/5 bg-[#020617] flex flex-col p-6 fixed h-full z-30">
        <div className="mb-10 px-1">
          <Link to="/">
            <CodeFlowLogo variant="horizontal" size="sm" />
          </Link>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarLink 
            icon={<BookOpen size={20} />} 
            label="Courses" 
            active={true} 
            onClick={() => {}} 
          />
          <SidebarLink 
            icon={<Compass size={20} />} 
            label="CS Career Roadmap" 
            active={false} 
            onClick={() => navigate('/career-roadmap')} 
          />
        </nav>

        <div className="pt-6 border-t border-white/5 space-y-4">
          <Link 
            to="/"
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all font-medium group"
          >
            <Home size={20} className="group-hover:-translate-x-1 transition-transform text-blue-400" />
            Back to Home
          </Link>
        </div>
      </aside>

      {/* Main Content Area - Direct Courses Experience */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="flex justify-between items-center mb-10">
          <div className="relative w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500 transition-all text-sm"
            />
          </div>
        </header>

        {/* Primary Courses Learning Area */}
        <div className="space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold">Courses</h2>
              <p className="text-gray-400 mt-2">Select a course to start learning and visualizing concepts.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass p-6 rounded-3xl group hover:border-blue-500/30 transition-all flex flex-col relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {course.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{course.name}</h3>
                <p className="text-sm text-gray-500 mb-6 flex-1">Explore the core logic of {course.name.split(' ')[0]} through interactive 3D visualizations.</p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-end pt-4 border-t border-white/5">
                    <button 
                      onClick={() => navigate(`/learn/${course.id}`)}
                      className="px-5 py-2.5 bg-blue-600 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                    >
                      Start Course
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const SidebarLink = ({ icon, label, active = false, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all group ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
  >
    <div className={`${active ? 'text-white' : 'text-gray-500 group-hover:text-blue-400'} transition-colors`}>
      {icon}
    </div>
    {label}
  </button>
);

export default Dashboard;
