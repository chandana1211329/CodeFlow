import React, { useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, Grid, GitBranch, Home, BookOpen, Sparkles
} from 'lucide-react';
import CodeFlowLogo from '../components/CodeFlowLogo';
import RoadmapBreadcrumbs from '../components/careerRoadmap/RoadmapBreadcrumbs';
import RoadmapSearchBar from '../components/careerRoadmap/RoadmapSearchBar';
import RoadmapNodeCard from '../components/careerRoadmap/RoadmapNodeCard';
import RoadmapTreeView from '../components/careerRoadmap/RoadmapTreeView';
import RoadmapDetailView from '../components/careerRoadmap/RoadmapDetailView';
import { 
  ALL_CAREER_CATEGORIES, 
  findNodeByPath, 
  CareerNode, 
  buildNodePathUrl
} from '../data/careerRoadmap';

export const CareerRoadmapPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract path slugs from location pathname
  const rawPath = location.pathname.replace(/^\/career-roadmap\/?/, '');
  const pathSlugs = rawPath ? rawPath.split('/').filter(Boolean) : [];

  const pathResult = findNodeByPath(pathSlugs);
  const currentNode = pathResult ? pathResult.node : null;
  const breadcrumbs = pathResult ? pathResult.breadcrumbs : [];

  // View state: 'grid' or 'tree'
  const [viewMode, setViewMode] = useState<'grid' | 'tree'>('grid');

  // Selected node for Detail Drawer
  const [selectedDetailNode, setSelectedDetailNode] = useState<CareerNode | null>(null);

  const handleOpenNode = (node: CareerNode) => {
    if (node.children && node.children.length > 0) {
      const targetNodes = currentNode ? [...breadcrumbs, node] : [node];
      navigate(buildNodePathUrl(targetNodes));
    } else {
      setSelectedDetailNode(node);
    }
  };

  const displayedNodes: CareerNode[] = currentNode
    ? currentNode.children ?? [currentNode]
    : ALL_CAREER_CATEGORIES;

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/5 bg-[#020617] flex flex-col p-6 fixed h-full z-30 hidden md:flex">
        <div className="mb-10 px-1">
          <Link to="/">
            <CodeFlowLogo variant="horizontal" size="sm" />
          </Link>
        </div>

        <nav className="flex-1 space-y-2">
          <Link
            to="/dashboard"
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all group"
          >
            <BookOpen size={20} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
            Courses
          </Link>

          <Link
            to="/career-roadmap"
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition-all group"
          >
            <Compass size={20} className="text-white" />
            CS Career Roadmap
          </Link>
        </nav>

        <div className="pt-6 border-t border-white/5 space-y-4">
          <Link
            to="/"
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all font-medium group text-sm"
          >
            <Home size={18} className="group-hover:-translate-x-1 transition-transform text-blue-400" />
            Back to Home
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Header Bar */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20 flex items-center gap-1.5">
                <Compass size={14} />
                CS Career Roadmap Engine
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-100">
              {currentNode ? currentNode.title : 'Computer Science Career Roadmap'}
            </h1>
            <p className="text-sm text-gray-400 mt-1 max-w-2xl">
              {currentNode
                ? currentNode.description ?? 'Explore specialized roles, tech stacks, and learning topics.'
                : 'Explore Computer Science career paths from foundations to advanced specializations.'}
            </p>
          </div>

          {/* Search Bar Component */}
          <RoadmapSearchBar />
        </header>

        {/* Breadcrumb Navigation & Controls Row */}
        <div className="glass p-3 rounded-2xl border border-white/10 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <RoadmapBreadcrumbs breadcrumbs={breadcrumbs} />

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {currentNode && (
              <button
                onClick={() => setSelectedDetailNode(currentNode)}
                className="px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-bold hover:bg-purple-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles size={14} />
                Node Details
              </button>
            )}

            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid size={14} />
                Cards
              </button>

              <button
                onClick={() => setViewMode('tree')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'tree'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <GitBranch size={14} />
                Tree
              </button>
            </div>
          </div>
        </div>

        {/* Content Display: Card View or Tree View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedNodes.map((node, idx) => (
              <RoadmapNodeCard
                key={node.id}
                node={node}
                index={idx}
                onOpenNode={handleOpenNode}
              />
            ))}
          </div>
        ) : (
          <div className="glass p-6 rounded-3xl border border-white/10">
            <h3 className="text-lg font-bold mb-4 text-gray-200 flex items-center gap-2">
              <GitBranch className="text-blue-400" />
              <span>Hierarchical Tree Explorer</span>
            </h3>

            <div className="space-y-1">
              {(currentNode ? [currentNode] : ALL_CAREER_CATEGORIES).map((node) => (
                <RoadmapTreeView
                  key={node.id}
                  node={node}
                  activeNodeId={currentNode?.id}
                  onSelectNode={(selected) => handleOpenNode(selected)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Node Detail Drawer Overlay */}
      <AnimatePresence>
        {selectedDetailNode && (
          <RoadmapDetailView
            node={selectedDetailNode}
            onClose={() => setSelectedDetailNode(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CareerRoadmapPage;
