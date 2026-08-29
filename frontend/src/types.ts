export interface ChangeDetail {
  varName: string;
  type: 'created' | 'updated' | 'deleted' | 'element_added' | 'element_updated' | 'element_removed';
  targetKey?: string | number;
  prevValue?: any;
  newValue?: any;
  description: string;
}

export interface ExecutionDiff {
  changedVars: string[];
  changes: ChangeDetail[];
  summary: string;
}

export interface StepExplanation {
  whatHappened: string;
  whyItHappened: string;
  whatChangedText: string;
  valuesInvolved?: Record<string, any>;
}

export interface RelationshipLink {
  from: string;
  label: string;
  to: string;
}

export interface OperatorMetadata {
  expr: string;
  operand1: string;
  operand2: string;
  op: string;
  substituted: string;
  result: string;
  targetVar: string;
}

export interface ConditionalMetadata {
  condition: string;
  substituted: string;
  result: boolean;
  branchState: string;
}

export interface LoopMetadata {
  loopVar: string;
  loopValue: string;
  iteration: number;
  totalIterations: number;
  condition: string;
  substituted: string;
  conditionResult: boolean;
  isComplete: boolean;
}

export type TreeOperationType = 
  | 'CREATE' 
  | 'INSERT' 
  | 'SEARCH' 
  | 'TRAVERSAL' 
  | 'DELETE' 
  | 'COMPARE' 
  | 'BRANCH_LEFT' 
  | 'BRANCH_RIGHT' 
  | 'RECURSE_CALL' 
  | 'RECURSE_RETURN' 
  | 'BASE_CASE';

export type NodeVisualState = 
  | 'NORMAL' 
  | 'CURRENT' 
  | 'COMPARING' 
  | 'VISITED' 
  | 'FOUND' 
  | 'INSERTED' 
  | 'NULL_REACHED' 
  | 'SEARCHING' 
  | 'TRAVERSING' 
  | 'PARENT';

export interface RuntimeTreeNode {
  id: string;
  type: string;
  val: any;
  address?: string;
  leftId: string | null;
  rightId: string | null;
  pointers: string[];
  depth: number;
}

export interface RuntimeTreeEdge {
  sourceId: string;
  targetId: string;
  type: 'left' | 'right' | 'child';
  label: string;
  isCyclic?: boolean;
}

export interface StructuredTreeState {
  rootId: string | null;
  treeType: 'BINARY_TREE' | 'BST' | 'GENERAL_TREE';
  nodes: RuntimeTreeNode[];
  edges: RuntimeTreeEdge[];
  activeNodeId?: string;
  comparingNodeId?: string;
  insertedNodeId?: string;
  hasCycle?: boolean;
}

export interface TreeStepMetadata {
  treeType?: 'BINARY_TREE' | 'BST' | 'AVL' | 'HEAP';
  operation?: TreeOperationType;
  activeNodeId?: string;
  activeNodeVal?: any;
  comparingNodeId?: string;
  comparingVal?: any;
  targetVal?: any;
  decision?: 'LEFT' | 'RIGHT' | 'FOUND' | 'NULL_REACHED';
  comparisonExpr?: string;
  substitutedExpr?: string;
  traversalType?: 'inorder' | 'preorder' | 'postorder' | 'levelorder';
  traversalSequence?: any[];
  callStackDepth?: number;
  nullBranchType?: 'left' | 'right';
  explanationSummary?: string;
}

export interface StepMetadata {
  mode: 'memory' | 'operator' | 'conditional' | 'loop' | 'data_structure' | 'tree';
  operator?: OperatorMetadata;
  conditional?: ConditionalMetadata;
  loop?: LoopMetadata;
  tree?: TreeStepMetadata;
  treeState?: StructuredTreeState;
}

export interface CallStackFrame {
  funcName: string;
  line: number;
  variables: Record<string, any>;
}

export interface ExecutionStep {
  line: number;
  code: string;
  variables: Record<string, any>;
  scopeVars?: Record<string, any>;
  callStack?: CallStackFrame[];
  description?: string;
  output?: string;
  metadata?: StepMetadata;
  operationType?: string;
  diff?: ExecutionDiff;
  explanation?: StepExplanation;
  whyDetails?: string;
  relationshipFlow?: RelationshipLink[];
  isError?: boolean;
  errorMessage?: string;
}

export interface ExecutionResponse {
  steps: ExecutionStep[];
  error?: string;
}

export interface ExecutionRequest {
  code: string;
  language?: string;
  inputs?: string[];
}

