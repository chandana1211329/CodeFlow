import React from 'react';
import { ChevronRight, Home, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CareerNode, buildNodePathUrl } from '../../data/careerRoadmap';

interface RoadmapBreadcrumbsProps {
  breadcrumbs: CareerNode[];
}

export const RoadmapBreadcrumbs: React.FC<RoadmapBreadcrumbsProps> = ({ breadcrumbs }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center gap-1.5 flex-wrap text-sm py-2 px-1 text-gray-400 font-medium">
      <button
        onClick={() => navigate('/career-roadmap')}
        className="flex items-center gap-1.5 hover:text-blue-400 transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-white/5"
      >
        <Compass size={16} className="text-blue-400" />
        <span>CS Career Roadmap</span>
      </button>

      {breadcrumbs.map((crumb, idx) => {
        const isLast = idx === breadcrumbs.length - 1;
        const targetPathNodes = breadcrumbs.slice(0, idx + 1);

        return (
          <React.Fragment key={crumb.id || idx}>
            <ChevronRight size={14} className="text-gray-600 shrink-0" />
            {isLast ? (
              <span className="text-blue-400 font-semibold px-2 py-1 bg-blue-500/10 rounded-lg border border-blue-500/20">
                {crumb.title}
              </span>
            ) : (
              <button
                onClick={() => navigate(buildNodePathUrl(targetPathNodes))}
                className="hover:text-white transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-white/5"
              >
                {crumb.title}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default RoadmapBreadcrumbs;
