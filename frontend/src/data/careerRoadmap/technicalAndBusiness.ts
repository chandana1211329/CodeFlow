import { CareerNode } from './types';

export const technicalAndBusinessData: CareerNode = {
  id: 'technical-and-business',
  title: 'Technical & Business',
  category: 'technical-and-business',
  type: 'category',
  icon: 'Briefcase',
  description: 'Bridging engineering execution with business strategy, product management, systems analysis, and project delivery.',
  overview: 'Technical & Business specialists align software development roadmaps with strategic business objectives, user needs, and team execution.',
  children: [
    { id: 'business-analyst', title: 'Business Analyst', type: 'role', description: 'Gathering requirements, analyzing business processes, and defining specification documents.' },
    { id: 'systems-analyst', title: 'Systems Analyst', type: 'role', description: 'Evaluating system architectures, data flows, and hardware/software technical specifications.' },
    { id: 'solutions-engineer', title: 'Solutions Engineer', type: 'role', description: 'Technical sales engineering, customer technical demos, and prototype integrations.' },
    { id: 'solutions-architect-tb', title: 'Solutions Architect', type: 'role', description: 'Designing technical solution architecture aligning client requirements with modern cloud software.' },
    { id: 'technical-consultant', title: 'Technical Consultant', type: 'role', description: 'Advising organizations on software modernization, vendor selection, and implementation.' },
    { id: 'it-consultant', title: 'IT Consultant', type: 'role', description: 'Strategic IT infrastructure planning, digital transformation, and process optimization.' },
    { id: 'product-analyst', title: 'Product Analyst', type: 'role', description: 'Analyzing user engagement metrics, feature adoption, funnel conversion, and product telemetry.' },
    { id: 'technical-product-manager', title: 'Technical Product Manager (TPM)', type: 'role', description: 'Defining product strategy, API requirements, engineering backlogs, and feature specifications.' },
    { id: 'technical-program-manager', title: 'Technical Program Manager', type: 'role', description: 'Orchestrating complex multi-team engineering programs, dependencies, and schedules.' },
    { id: 'scrum-master', title: 'Scrum Master', type: 'role', description: 'Facilitating Agile ceremonies (sprints, standups, retrospectives) and removing engineering blockers.' },
    { id: 'project-manager', title: 'Project Manager', type: 'role', description: 'Managing software project budgets, timelines, risk matrices, and resource allocation.' },
    { id: 'technical-writer', title: 'Technical Writer', type: 'role', description: 'Creating developer documentation, API references, SDK guides, and system architecture docs.' }
  ]
};
