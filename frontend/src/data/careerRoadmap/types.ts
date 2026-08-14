export type CareerNodeType = 
  | 'category'
  | 'role'
  | 'specialization'
  | 'stack'
  | 'subject'
  | 'topic'
  | 'subtopic'
  | 'path';

export interface ResourceLink {
  title: string;
  url?: string;
  type?: 'documentation' | 'tutorial' | 'course' | 'article' | 'book';
}

export interface CareerNode {
  id: string;
  title: string;
  description?: string;
  category?: string;
  type?: CareerNodeType;
  icon?: string;
  children?: CareerNode[];
  prerequisites?: string[];
  technologies?: string[];
  resources?: ResourceLink[];
  roadmap?: string[];
  overview?: string;
  roleResponsibilities?: string[];
  skillsRequired?: string[];
  tools?: string[];
  learningOrder?: string[];
  projects?: string[];
  interviewPrep?: string[];
  linkedCourseId?: string;
  linkedTopicId?: string;
  metadata?: Record<string, any>;
}

export interface SearchResult {
  node: CareerNode;
  path: CareerNode[];
  breadcrumbsText: string;
}

export type NodeProgressStatus = 'not_started' | 'in_progress' | 'completed';
