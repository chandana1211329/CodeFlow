import { CareerNode } from './types';

export const researchAndAcademiaData: CareerNode = {
  id: 'research-and-academia',
  title: 'Research & Academia',
  category: 'research-and-academia',
  type: 'category',
  icon: 'Microscope',
  description: 'Computer science fundamental research, algorithmic breakthroughs, AI lab research, publication, and teaching.',
  overview: 'Researchers advance the state of the art in computing theory, artificial intelligence algorithms, quantum mechanics, systems architectures, and formal methods.',
  children: [
    { id: 'research-assistant', title: 'Research Assistant', type: 'role', description: 'Assisting academic labs with literature reviews, dataset preparation, and experiment execution.' },
    { id: 'research-engineer', title: 'Research Engineer', type: 'role', description: 'Implementing novel research papers into working software prototypes and benchmarks.' },
    { id: 'research-scientist', title: 'Research Scientist', type: 'role', description: 'Publishing peer-reviewed papers at NeurIPS, ICML, OSDI, CACM, and driving scientific breakthroughs.' },
    { id: 'cs-researcher', title: 'Computer Science Researcher', type: 'role', description: 'Investigating fundamental computational complexity, cryptography, or programming language theory.' },
    { id: 'computational-research', title: 'Computational Research', type: 'role', description: 'Applying high-performance computing simulations to biology, physics, and chemistry.' },
    { id: 'ai-research', title: 'AI Research', type: 'role', description: 'Inventing new neural network architectures, optimization techniques, and alignment algorithms.' },
    { id: 'systems-research', title: 'Systems Research', type: 'role', description: 'Researching novel distributed consensus, operating system abstractions, and hardware acceleration.' },
    { id: 'academic-teaching', title: 'Academic / Teaching', type: 'role', description: 'University professors, lecturers, and computer science educators inspiring future engineers.' }
  ]
};
