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

export interface ExecutionStep {
  line: number;
  code: string;
  variables: Record<string, any>;
  description?: string;
  output?: string;
  metadata?: StepMetadata;
}

export interface ExecutionResponse {
  steps: ExecutionStep[];
  error?: string;
}

export interface ExecutionRequest {
  code: string;
}
