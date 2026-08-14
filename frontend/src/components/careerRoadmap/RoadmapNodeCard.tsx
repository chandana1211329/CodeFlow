import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Code, Database, Cloud, Shield, Cpu, 
  CheckCircle, Briefcase, Network, Blocks, Glasses, 
  Microscope, Sparkles, Layers, BookOpen, ChevronRight,
  Terminal, Layout, Server, Smartphone, Gamepad2, GitBranch,
  BarChart2, TrendingUp, Zap, MessageSquare, Eye, HardDrive,
  Repeat, Activity, Compass, Building
} from 'lucide-react';
import { CareerNode } from '../../data/careerRoadmap';

interface RoadmapNodeCardProps {
  node: CareerNode;
  onOpenNode: (node: CareerNode) => void;
  index?: number;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Code: <Code className="text-blue-400" />,
  Terminal: <Terminal className="text-emerald-400" />,
  Layout: <Layout className="text-pink-400" />,
  Server: <Server className="text-purple-400" />,
  Layers: <Layers className="text-indigo-400" />,
  Smartphone: <Smartphone className="text-cyan-400" />,
  Gamepad2: <Gamepad2 className="text-yellow-400" />,
  Cpu: <Cpu className="text-orange-400" />,
  GitBranch: <GitBranch className="text-rose-400" />,
  Brain: <BrainIcon className="text-purple-400" />,
  BarChart2: <BarChart2 className="text-teal-400" />,
  Database: <Database className="text-blue-400" />,
  TrendingUp: <TrendingUp className="text-emerald-400" />,
  Sparkles: <Sparkles className="text-amber-400" />,
  MessageSquare: <MessageSquare className="text-indigo-400" />,
  Eye: <Eye className="text-sky-400" />,
  Zap: <Zap className="text-yellow-400" />,
  HardDrive: <HardDrive className="text-slate-400" />,
  Cloud: <Cloud className="text-sky-400" />,
  Repeat: <Repeat className="text-green-400" />,
  Activity: <Activity className="text-red-400" />,
  Compass: <Compass className="text-blue-400" />,
  Shield: <Shield className="text-emerald-400" />,
  CheckCircle: <CheckCircle className="text-teal-400" />,
  Building: <Building className="text-amber-400" />,
  Briefcase: <Briefcase className="text-blue-400" />,
  Network: <Network className="text-indigo-400" />,
  Blocks: <Blocks className="text-purple-400" />,
  Glasses: <Glasses className="text-pink-400" />,
  Microscope: <Microscope className="text-cyan-400" />
};

function BrainIcon({ className }: { className?: string }) {
  return <Sparkles className={className} />;
}

export const RoadmapNodeCard: React.FC<RoadmapNodeCardProps> = ({
  node,
  onOpenNode,
  index = 0
}) => {
  const childCount = node.children?.length ?? 0;
  const iconElement = node.icon && ICON_MAP[node.icon] ? ICON_MAP[node.icon] : <Code className="text-blue-400" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3) }}
      onClick={() => onOpenNode(node)}
      className="glass p-6 rounded-3xl group hover:border-blue-500/40 hover:bg-slate-900/60 transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden shadow-lg border border-white/10"
    >
      {/* Top Header Row */}
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-blue-500/10 transition-transform">
          {iconElement}
        </div>

        {node.type && (
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-gray-300 border border-white/10">
            {node.type}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2 mb-6 flex-1">
        <h3 className="text-xl font-bold text-gray-100 group-hover:text-blue-400 transition-colors flex items-center gap-2">
          <span>{node.title}</span>
        </h3>
        {node.description && (
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
            {node.description}
          </p>
        )}
      </div>

      {/* Footer Info Row */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-2">
          {childCount > 0 ? (
            <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20">
              {childCount} {childCount === 1 ? 'Branch' : 'Branches'}
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-gray-400 font-medium">
              Leaf Node
            </span>
          )}
          {node.linkedCourseId && (
            <span className="px-2 py-1 rounded-lg bg-purple-500/10 text-purple-400 font-semibold flex items-center gap-1 border border-purple-500/20">
              <BookOpen size={12} />
              Course Connected
            </span>
          )}
        </div>

        <button className="p-2 rounded-xl bg-white/5 group-hover:bg-blue-600 group-hover:text-white transition-all text-gray-300">
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export default RoadmapNodeCard;
