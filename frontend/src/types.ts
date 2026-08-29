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

export interface StepMetadata {
  mode: 'memory' | 'operator' | 'conditional' | 'loop' | 'data_structure';
  operator?: OperatorMetadata;
  conditional?: ConditionalMetadata;
  loop?: LoopMetadata;
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

