export interface ToolItem {
  id: string;
  name: string;
  category: 'raster' | 'vector' | 'ai' | 'utility';
  icon: string;
  description: string;
  defaultParams: Record<string, any>;
}

export interface ToolCategory {
  id: 'raster' | 'vector' | 'ai' | 'utility';
  title: string;
  icon: string;
  badgeColor: string;
  items: ToolItem[];
}

export interface WorkflowNode {
  id: string;
  toolId: string;
  title: string;
  category: 'raster' | 'vector' | 'ai' | 'utility' | 'input' | 'output';
  type: 'input' | 'process' | 'output';
  icon: string;
  description: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  progress?: number;
  inputDataset?: string;
  outputDataset?: string;
  params: Record<string, any>;
  estimatedRuntime: string;
  computeCost: string;
  validationStatus: 'valid' | 'warning' | 'error';
  validationMessage?: string;
  position: { x: number; y: number };
}

export interface WorkflowConnection {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  active?: boolean;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
}

export interface ProcessingJob {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'queued' | 'failed';
  progress: number;
  startTime: string;
  duration: string;
  nodesCount: number;
  outputName: string;
}

export interface AIInsight {
  id: string;
  type: 'positive' | 'warning' | 'info' | 'action';
  icon: string;
  title: string;
  description: string;
  timestamp: string;
  metric?: string;
}

export interface ConsoleLog {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  nodeTitle?: string;
}
