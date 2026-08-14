import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Search, Brain, CheckCircle2, X } from 'lucide-react';
import { DATA_STRUCTURES_CURRICULUM, DsTopic } from '../data/dsCurriculum';

interface DsSidebarProps {
  activeTopicId: string;
  activeSubtopicId?: string;
  onSelectTopic: (topicId: string, subtopicId?: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  completedLessons?: Set<string>;
}

export const DsSidebar: React.FC<DsSidebarProps> = ({
  activeTopicId,
  activeSubtopicId,
  onSelectTopic,
  isOpenMobile = false,
  onCloseMobile,
  completedLessons = new Set<string>()
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({
    [activeTopicId]: true
  });

  // Automatically expand active section when activeTopicId changes
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

  // Search filter
  const filteredCurriculum = DATA_STRUCTURES_CURRICULUM.map(topic => {
    if (!searchQuery.trim()) return topic;

    const query = searchQuery.toLowerCase();
    const titleMatch = topic.title.toLowerCase().includes(query);
    const descMatch = topic.description?.toLowerCase().includes(query);
    const subMatch = topic.subtopics.filter(sub =>
      sub.title.toLowerCase().includes(query)
    );

    if (!titleMatch && !descMatch && subMatch.length === 0) return null;

    return {
      ...topic,
      subtopics: subMatch.length > 0 ? subMatch : topic.subtopics
    };
  }).filter((t): t is DsTopic => t !== null);

  // Total completed child lessons across whole DS course
  const totalCompleted = Array.from(completedLessons).filter(id => id.startsWith('ds-') || id.includes('/')).length;
  const totalChildLessons = DATA_STRUCTURES_CURRICULUM.reduce((acc, t) => acc + t.subtopics.length, 0);

  const sidebarContent = (
    <div className="h-full flex flex-col bg-[#020617] border-r border-white/5 w-72 text-white">
      {/* Header & Search */}
      <div className="p-4 border-b border-white/5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20 text-purple-400">
              <Brain size={18} />
            </div>
            <div>
              <h2 className="text-xs font-extrabold tracking-wider uppercase text-gray-100">Data Structures</h2>
              <span className="text-[10px] text-gray-500 font-medium">13 Sections • {totalChildLessons} Lessons</span>
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
            placeholder="Search Data Structures topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
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

      {/* Accordion 15 Sections & Child Lessons List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {filteredCurriculum.length === 0 ? (
          <div className="text-center py-8 text-xs text-gray-500 italic">
            No topics matching "{searchQuery}"
          </div>
        ) : (
          filteredCurriculum.map(topic => {
            const isParentActive = activeTopicId === topic.id;
            const isExpanded = searchQuery.trim() ? true : !!expandedTopics[topic.id];
            
            // Calculate completed count for this section
            const sectionCompletedCount = topic.subtopics.filter(sub => 
              completedLessons.has(`${topic.id}/${sub.id}`) || completedLessons.has(sub.id)
            ).length;

            return (
              <div key={topic.id} className="space-y-1">
                {/* Section Header Button */}
                <div
                  onClick={(e) => {
                    toggleExpand(topic.id, e);
                    // Select first child if not already expanded
                    if (!isExpanded && topic.subtopics.length > 0) {
                      onSelectTopic(topic.id, topic.subtopics[0].id);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all group ${
                    isParentActive
                      ? 'bg-purple-600/15 text-purple-300 font-bold border border-purple-500/30'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="text-[11px] shrink-0 font-mono text-purple-400">
                      {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </span>
                    <span className="truncate">{topic.title}</span>
                  </div>

                </div>

                {/* Child Lessons */}
                {isExpanded && (
                  <div className="ml-3 pl-3 border-l border-white/10 space-y-1 my-1">
                    {topic.subtopics.map(sub => {
                      const isSubActive = activeTopicId === topic.id && activeSubtopicId === sub.id;
                      const isCompleted = completedLessons.has(`${topic.id}/${sub.id}`) || completedLessons.has(sub.id);

                      return (
                        <button
                          key={sub.id}
                          onClick={() => onSelectTopic(topic.id, sub.id)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition-all truncate flex items-center justify-between group ${
                            isSubActive
                              ? 'bg-purple-500/20 text-purple-200 font-bold border-l-2 border-purple-400 pl-3 shadow-md shadow-purple-500/10'
                              : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                          }`}
                        >
                          <span className="truncate flex items-center gap-1.5">
                            {isSubActive && <span className="text-purple-400 font-bold">→</span>}
                            <span>{sub.title}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
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
