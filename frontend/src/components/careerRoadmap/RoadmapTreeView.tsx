import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FileText, BookOpen, Layers } from 'lucide-react';
import { CareerNode } from '../../data/careerRoadmap';

interface RoadmapTreeViewProps {
  node: CareerNode;
  onSelectNode: (node: CareerNode) => void;
  activeNodeId?: string;
  depth?: number;
}

export const RoadmapTreeView: React.FC<RoadmapTreeViewProps> = ({
  node,
  onSelectNode,
  activeNodeId,
  depth = 0
}) => {
  const [isExpanded, setIsExpanded] = useState(depth < 2); // Auto expand top 2 levels
  const hasChildren = node.children && node.children.length > 0;
  const isActive = activeNodeId === node.id;

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="select-none font-sans">
      {/* Node Row */}
      <div
        onClick={() => onSelectNode(node)}
        className={`flex items-center justify-between py-2 px-3 rounded-xl transition-all cursor-pointer group ${
          isActive
            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 font-semibold'
            : 'hover:bg-white/5 text-gray-300 hover:text-white'
        }`}
        style={{ paddingLeft: `${depth * 1.25 + 0.75}rem` }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {hasChildren ? (
            <button
              onClick={toggleExpand}
              className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
          ) : (
            <span className="w-4 h-4 shrink-0 flex items-center justify-center text-gray-600">•</span>
          )}

          {hasChildren ? (
            <Folder size={16} className={isExpanded ? 'text-blue-400' : 'text-gray-400'} />
          ) : (
            <FileText size={16} className="text-gray-400 group-hover:text-blue-400" />
          )}

          <span className="text-sm truncate">{node.title}</span>

          {node.type && (
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10 shrink-0">
              {node.type}
            </span>
          )}
        </div>

        {node.linkedCourseId && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0 flex items-center gap-1">
            <BookOpen size={10} />
            Course
          </span>
        )}
      </div>

      {/* Children Tree */}
      {hasChildren && isExpanded && (
        <div className="relative border-l border-white/10 ml-4 pl-1 my-1 space-y-0.5">
          {node.children!.map((child) => (
            <RoadmapTreeView
              key={child.id}
              node={child}
              onSelectNode={onSelectNode}
              activeNodeId={activeNodeId}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoadmapTreeView;
