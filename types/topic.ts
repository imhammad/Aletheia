export type RendererType = "step_player" | "node_graph" | "pipeline";

export type StepPlayerStep = {
  id: string;
  title: string;
  description: string;
  // A snapshot of the data structure's state at this step,
  // e.g. an array: [3, 1, 4, 1, 5], with optional highlighted indices
  state: (string | number)[];
  highlightIndices?: number[];
};

export type StepPlayerData = {
  steps: StepPlayerStep[];
};

export type Topic = {
  id: string;
  slug: string;
  title: string;
  domain: string;
  renderer_type: RendererType;
  difficulty: "beginner" | "intermediate" | "advanced";
  summary: string;
  notes: string;
  visualization_data: StepPlayerData | NodeGraphData;
};

export type GraphNode = {
  id: string;
  label: string;
  x: number;
  y: number;
};

export type GraphEdge = {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
};

export type NodeGraphStep = {
  id: string;
  title: string;
  description: string;
  activeNodeIds?: string[];
  activeEdgeIds?: string[];
};

export type NodeGraphData = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  steps: NodeGraphStep[]; // walks through the structure, e.g. traversal order
};

