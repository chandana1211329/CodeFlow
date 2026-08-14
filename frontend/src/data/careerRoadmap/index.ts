import { CareerNode, SearchResult } from './types';
import { softwareEngineeringData } from './softwareEngineering';
import { dataAndAIData } from './dataAndAI';
import { cloudAndDevOpsData } from './cloudAndDevOps';
import { cybersecurityData } from './cybersecurity';
import { hardwareAndEmbeddedData } from './hardwareAndEmbedded';
import { testingAndQualityData } from './testingAndQuality';
import { enterpriseTechData } from './enterpriseTech';
import { technicalAndBusinessData } from './technicalAndBusiness';
import { networkingAndSystemsData } from './networkingAndSystems';
import { blockchainAndWeb3Data } from './blockchainAndWeb3';
import { arVrGraphicsData } from './arVrGraphics';
import { researchAndAcademiaData } from './researchAndAcademia';
import { emergingTechData } from './emergingTech';

export * from './types';

export const ALL_CAREER_CATEGORIES: CareerNode[] = [
  softwareEngineeringData,
  dataAndAIData,
  cloudAndDevOpsData,
  cybersecurityData,
  hardwareAndEmbeddedData,
  testingAndQualityData,
  enterpriseTechData,
  technicalAndBusinessData,
  networkingAndSystemsData,
  blockchainAndWeb3Data,
  arVrGraphicsData,
  researchAndAcademiaData,
  emergingTechData
];

/**
 * Finds a node and its breadcrumbs path given an array of route path slugs (or a single slug).
 */
export function findNodeByPath(slugs: string[]): { node: CareerNode; breadcrumbs: CareerNode[] } | null {
  if (!slugs || slugs.length === 0) return null;

  const currentSlug = slugs[0];
  const rootCategory = ALL_CAREER_CATEGORIES.find(
    (cat) => cat.id === currentSlug || cat.id.toLowerCase() === currentSlug.toLowerCase()
  );

  if (!rootCategory) return null;

  const breadcrumbs: CareerNode[] = [rootCategory];
  let currentNode: CareerNode = rootCategory;

  for (let i = 1; i < slugs.length; i++) {
    const targetSlug = slugs[i];
    if (!currentNode.children) break;

    const matchedChild = currentNode.children.find(
      (child) => child.id === targetSlug || child.id.toLowerCase() === targetSlug.toLowerCase()
    );

    if (matchedChild) {
      breadcrumbs.push(matchedChild);
      currentNode = matchedChild;
    } else {
      break;
    }
  }

  return { node: currentNode, breadcrumbs };
}

/**
 * Searches across all nodes and all nested levels recursively.
 */
export function searchCareerNodes(query: string): SearchResult[] {
  if (!query || query.trim().length === 0) return [];
  const cleanQuery = query.trim().toLowerCase();
  const results: SearchResult[] = [];

  function traverse(node: CareerNode, currentPath: CareerNode[]) {
    const newPath = [...currentPath, node];

    const titleMatch = node.title.toLowerCase().includes(cleanQuery);
    const descMatch = node.description?.toLowerCase().includes(cleanQuery) ?? false;
    const techMatch = node.technologies?.some((t) => t.toLowerCase().includes(cleanQuery)) ?? false;
    const skillMatch = node.skillsRequired?.some((s) => s.toLowerCase().includes(cleanQuery)) ?? false;
    const toolMatch = node.tools?.some((t) => t.toLowerCase().includes(cleanQuery)) ?? false;

    if (titleMatch || descMatch || techMatch || skillMatch || toolMatch) {
      const breadcrumbsText = newPath.map((n) => n.title).join(' > ');
      results.push({
        node,
        path: newPath,
        breadcrumbsText
      });
    }

    if (node.children) {
      for (const child of node.children) {
        traverse(child, newPath);
      }
    }
  }

  for (const cat of ALL_CAREER_CATEGORIES) {
    traverse(cat, []);
  }

  return results;
}

/**
 * Converts a path of nodes into a URL slug string.
 * Example: [Software Engineering, Full Stack, MERN] -> '/career-roadmap/software-engineering/full-stack-development/mern-stack'
 */
export function buildNodePathUrl(nodes: CareerNode[]): string {
  if (!nodes || nodes.length === 0) return '/career-roadmap';
  const pathSlugs = nodes.map((n) => n.id).join('/');
  return `/career-roadmap/${pathSlugs}`;
}
