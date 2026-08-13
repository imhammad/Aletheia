import { StepPlayer } from "@/components/visualizations/StepPlayer";
import { NodeGraph } from "@/components/visualizations/NodeGraph";

const bubbleSortSteps = [
  { id: "1", title: "Starting array", description: "We begin with an unsorted array.", state: [5, 2, 8, 1], highlightIndices: [] },
  { id: "2", title: "Compare 5 and 2", description: "5 > 2, so we swap them.", state: [5, 2, 8, 1], highlightIndices: [0, 1] },
  { id: "3", title: "Swapped", description: "Array after the swap.", state: [2, 5, 8, 1], highlightIndices: [0, 1] },
  { id: "4", title: "Compare 5 and 8", description: "5 < 8, no swap needed.", state: [2, 5, 8, 1], highlightIndices: [1, 2] },
  { id: "5", title: "Compare 8 and 1", description: "8 > 1, so we swap them.", state: [2, 5, 8, 1], highlightIndices: [2, 3] },
  { id: "6", title: "Sorted (this pass)", description: "One full pass complete.", state: [2, 5, 1, 8], highlightIndices: [2, 3] },
];

const bstNodes = [
  { id: "a", label: "8", x: 250, y: 0 },
  { id: "b", label: "3", x: 100, y: 100 },
  { id: "c", label: "10", x: 400, y: 100 },
  { id: "d", label: "1", x: 0, y: 200 },
  { id: "e", label: "6", x: 200, y: 200 },
];

const bstEdges = [
  { id: "ab", source: "a", target: "b" },
  { id: "ac", source: "a", target: "c" },
  { id: "bd", source: "b", target: "d" },
  { id: "be", source: "b", target: "e" },
];

const bstSteps = [
  { id: "1", title: "Start at root", description: "Begin traversal at node 8.", activeNodeIds: ["a"], activeEdgeIds: [] },
  { id: "2", title: "Visit left child", description: "Move to node 3.", activeNodeIds: ["b"], activeEdgeIds: ["ab"] },
  { id: "3", title: "Visit left child's left child", description: "Move to node 1.", activeNodeIds: ["d"], activeEdgeIds: ["bd"] },
  { id: "4", title: "Back up, visit right child", description: "Move to node 6.", activeNodeIds: ["e"], activeEdgeIds: ["be"] },
  { id: "5", title: "Back to root, visit right subtree", description: "Move to node 10.", activeNodeIds: ["c"], activeEdgeIds: ["ac"] },
];

export default function VisualizePage() {
  return (
    <main className="min-h-screen bg-cream py-16 px-6 space-y-24">
      <div>
        <h1 className="font-serif text-4xl text-charcoal text-center mb-12">
          Bubble Sort — Step by Step
        </h1>
        <StepPlayer steps={bubbleSortSteps} />
      </div>

      <div>
        <h1 className="font-serif text-4xl text-charcoal text-center mb-12">
          Binary Search Tree — Traversal
        </h1>
        <NodeGraph nodes={bstNodes} edges={bstEdges} steps={bstSteps} />
      </div>
    </main>
  );
}