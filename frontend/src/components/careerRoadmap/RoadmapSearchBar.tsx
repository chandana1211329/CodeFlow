import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, CornerDownLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchCareerNodes, SearchResult, buildNodePathUrl } from '../../data/careerRoadmap';

interface RoadmapSearchBarProps {
  onSelectResult?: (result: SearchResult) => void;
}

export const RoadmapSearchBar: React.FC<RoadmapSearchBarProps> = ({ onSelectResult }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length > 0) {
      const res = searchCareerNodes(query);
      setResults(res.slice(0, 15)); // Limit to top 15 matches
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (result: SearchResult) => {
    setIsOpen(false);
    setQuery('');
    if (onSelectResult) {
      onSelectResult(result);
    } else {
      const url = buildNodePathUrl(result.path);
      navigate(url);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl z-40">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length > 0 && setIsOpen(true)}
          placeholder="Search roles, stacks, technologies across all roadmaps (e.g. React, MERN, AWS, LLMs)..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-10 text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-[#0f172a] border border-white/15 rounded-2xl shadow-2xl overflow-hidden max-h-96 overflow-y-auto backdrop-blur-2xl divide-y divide-white/5">
          {results.length > 0 ? (
            results.map((res, idx) => (
              <div
                key={res.node.id + idx}
                onClick={() => handleSelect(res)}
                className="p-3.5 hover:bg-blue-600/10 cursor-pointer transition-colors flex items-center justify-between group"
              >
                <div className="space-y-1 max-w-[85%]">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white group-hover:text-blue-400 transition-colors">
                      {res.node.title}
                    </span>
                    {res.node.type && (
                      <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {res.node.type}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 flex items-center gap-1 font-mono truncate">
                    {res.breadcrumbsText}
                  </p>
                </div>
                <CornerDownLeft className="w-4 h-4 text-gray-500 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all" />
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-sm text-gray-400">
              No matching career nodes found for "<span className="text-white">{query}</span>"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RoadmapSearchBar;
