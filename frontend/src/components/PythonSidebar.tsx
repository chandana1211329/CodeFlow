import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Search, BookOpen, CheckCircle2, Zap, X } from 'lucide-react';
import { PYTHON_CURRICULUM, CurriculumCategory, CurriculumTopic } from '../data/pythonCurriculum';

interface PythonSidebarProps {
  activeTopicId: string;
  activeSubtopicId?: string;
  onSelectTopic: (topicId: string, subtopicId?: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const PythonSidebar: React.FC<PythonSidebarProps> = ({
  activeTopicId,
  activeSubtopicId,
  onSelectTopic,
  isOpenMobile = false,
  onCloseMobile
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({
    [activeTopicId]: true
  });

  // Automatically expand parent topic when active topic changes
  useEffect(() => {
    if (activeTopicId) {
      setExpandedTopics(prev => ({
        ...prev,
        [activeTopicId]: true
      }));
    }
  }, [activeTopicId]);

  const toggleExpand = (topicId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  // Search filter matching categories, topics, and subtopics
  const filteredCurriculum = PYTHON_CURRICULUM.map(category => {
    if (!searchQuery.trim()) return category;

    const query = searchQuery.toLowerCase();
    const matchingTopics = category.topics.filter(topic => {
      const titleMatch = topic.title.toLowerCase().includes(query);
      const descMatch = topic.description?.toLowerCase().includes(query);
      const subMatch = topic.subtopics?.some(sub => 
        sub.title.toLowerCase().includes(query)
      );
      return titleMatch || descMatch || subMatch;
    });

    if (matchingTopics.length === 0) return null;

    return {
      ...category,
      topics: matchingTopics
    };
  }).filter((cat): cat is CurriculumCategory => cat !== null);

  const sidebarContent = (
    <div className="h-full flex flex-col bg-[#020617] border-r border-white/5 w-72 text-white">
      {/* Header & Search */}
      <div className="p-4 border-b border-white/5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-yellow-500/10 rounded-lg flex items-center justify-center border border-yellow-500/20">
              <Zap size={14} className="text-yellow-400 fill-yellow-400" />
            </div>
            <div>
              <h2 className="text-xs font-bold tracking-wider uppercase text-gray-200">Python Tutorial</h2>
              <span className="text-[10px] text-gray-500 font-medium">62 Topics • Complete Path</span>
            </div>
          </div>
          {onCloseMobile && (
            <button 
              onClick={onCloseMobile}
              className="md:hidden p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Search input */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search Python topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')} 
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-xs"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Accordion Categories & Topics List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {filteredCurriculum.length === 0 ? (
          <div className="text-center py-8 text-xs text-gray-500 italic">
            No topics matching "{searchQuery}"
          </div>
        ) : (
          filteredCurriculum.map(category => (
            <div key={category.id} className="space-y-1.5">
              <h3 className="text-[10px] font-bold tracking-widest text-gray-500 uppercase px-2 mb-2">
                {category.title}
              </h3>
              <div className="space-y-1">
                {category.topics.map(topic => {
                  const isMainActive = activeTopicId === topic.id && !activeSubtopicId;
                  const isParentActive = activeTopicId === topic.id;
                  const isExpanded = searchQuery.trim() ? true : !!expandedTopics[topic.id];
                  const hasSubtopics = topic.subtopics && topic.subtopics.length > 0;

                  return (
                    <div key={topic.id} className="space-y-1">
                      {/* Topic Button */}
                      <div
                        onClick={() => onSelectTopic(topic.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all group ${
                          isMainActive 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-bold' 
                            : isParentActive
                              ? 'bg-blue-600/10 text-blue-400 font-bold border border-blue-500/20'
                              : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className="truncate flex-1 pr-2">{topic.title}</span>
                        {hasSubtopics && (
                          <button
                            onClick={(e) => toggleExpand(topic.id, e)}
                            className="p-1 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors shrink-0"
                          >
                            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          </button>
                        )}
                      </div>

                      {/* Subtopics */}
                      {hasSubtopics && isExpanded && (
                        <div className="ml-3 pl-3 border-l border-white/10 space-y-1 my-1">
                          {topic.subtopics!.map(sub => {
                            const isSubActive = activeTopicId === topic.id && activeSubtopicId === sub.id;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => onSelectTopic(topic.id, sub.id)}
                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition-all truncate block ${
                                  isSubActive
                                    ? 'bg-blue-500/20 text-blue-300 font-bold border-l-2 border-blue-400 pl-3'
                                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                                }`}
                              >
                                {sub.title}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block h-full shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 w-72 h-full shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
