import React from 'react';
import { 
  X, ExternalLink, BookOpen, ArrowRight,
  Sparkles, Wrench, Shield, CheckCircle2, FileCode, Layers, HelpCircle, UserCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CareerNode } from '../../data/careerRoadmap';

interface RoadmapDetailViewProps {
  node: CareerNode | null;
  onClose: () => void;
}

export const RoadmapDetailView: React.FC<RoadmapDetailViewProps> = ({
  node,
  onClose
}) => {
  const navigate = useNavigate();

  if (!node) return null;

  const handleLaunchCourse = () => {
    if (node.linkedCourseId) {
      if (node.linkedTopicId) {
        navigate(`/learn/${node.linkedCourseId}/${node.linkedTopicId}`);
      } else {
        navigate(`/learn/${node.linkedCourseId}`);
      }
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-[#090d1f]/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl z-50 overflow-y-auto flex flex-col p-6 text-gray-200">
      {/* Top Action Bar */}
      <div className="flex justify-between items-center pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          {node.type && (
            <span className="text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {node.type}
            </span>
          )}
          {node.category && (
            <span className="text-xs font-medium text-gray-400 capitalize">
              {node.category.replace(/-/g, ' ')}
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>

      {/* Hero Heading */}
      <div className="my-6 space-y-3">
        <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
          {node.title}
        </h2>
        {node.description && (
          <p className="text-base text-gray-300 leading-relaxed font-normal">
            {node.description}
          </p>
        )}
      </div>

      {/* Linked CodeFlow Course Banner */}
      {node.linkedCourseId && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-blue-500/30 mb-8 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-blue-400 font-bold text-sm">
              <BookOpen size={20} />
              <span>Interactive CodeFlow Course Available</span>
            </div>
            <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
              3D Visualizer
            </span>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed">
            CodeFlow has built-in interactive 3D visualizations and hands-on code execution for this roadmap technology!
          </p>

          <button
            onClick={handleLaunchCourse}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>Start Interactive Course Now</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Overview Section */}
      {node.overview && (
        <div className="mb-6 space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
            <Sparkles size={16} />
            <span>Role & Technology Overview</span>
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed glass p-4 rounded-2xl border border-white/10">
            {node.overview}
          </p>
        </div>
      )}

      {/* Role Responsibilities */}
      {node.roleResponsibilities && node.roleResponsibilities.length > 0 && (
        <div className="mb-6 space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <UserCheck size={16} />
            <span>What Does This Professional Do?</span>
          </h3>
          <div className="glass p-4 rounded-2xl border border-white/10 space-y-2">
            {node.roleResponsibilities.map((resp, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 leading-relaxed">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>{resp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Required Skills */}
      {node.skillsRequired && node.skillsRequired.length > 0 && (
        <div className="mb-6 space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
            <Shield size={16} />
            <span>Required Skills & Competencies</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {node.skillsRequired.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tools & Frameworks */}
      {node.tools && node.tools.length > 0 && (
        <div className="mb-6 space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <Wrench size={16} />
            <span>Tools & Frameworks</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {node.tools.map((tool, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Learning Order */}
      {node.learningOrder && node.learningOrder.length > 0 && (
        <div className="mb-6 space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
            <Layers size={16} />
            <span>Recommended Learning Sequence</span>
          </h3>
          <div className="glass p-4 rounded-2xl border border-white/10 space-y-2">
            {node.learningOrder.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs text-gray-300">
                <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-[10px]">
                  {idx + 1}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Projects */}
      {node.projects && node.projects.length > 0 && (
        <div className="mb-6 space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-pink-400 flex items-center gap-2">
            <FileCode size={16} />
            <span>Practical Portfolio Projects</span>
          </h3>
          <div className="glass p-4 rounded-2xl border border-white/10 space-y-2">
            {node.projects.map((proj, idx) => (
              <div key={idx} className="text-xs text-gray-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                <span>{proj}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interview Prep */}
      {node.interviewPrep && node.interviewPrep.length > 0 && (
        <div className="mb-6 space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-2">
            <HelpCircle size={16} />
            <span>Interview Preparation Focus</span>
          </h3>
          <div className="glass p-4 rounded-2xl border border-white/10 space-y-2">
            {node.interviewPrep.map((prep, idx) => (
              <div key={idx} className="text-xs text-gray-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                <span>{prep}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapDetailView;
