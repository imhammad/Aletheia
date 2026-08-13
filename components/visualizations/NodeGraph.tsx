"use client";

import { useState, useMemo } from "react";
import ReactFlow, { Background, type Node, type Edge } from "reactflow";
import "reactflow/dist/style.css";
import type { NodeGraphData } from "@/types/topic";

export function NodeGraph({ nodes, edges, steps }: NodeGraphData) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];

  const flowNodes: Node[] = useMemo(
    () =>
      nodes.map((n) => ({
        id: n.id,
        position: { x: n.x, y: n.y },
        data: { label: n.label },
        style: {
          background: step.activeNodeIds?.includes(n.id) ? "#D97757" : "#FBF9F4",
          color: step.activeNodeIds?.includes(n.id) ? "#FBF9F4" : "#20241F",
          border: "1px solid #8FB88A",
          borderRadius: 8,
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          padding: 8,
        },
      })),
    [nodes, step]
  );

  const flowEdges: Edge[] = useMemo(
    () =>
      edges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        animated: step.activeEdgeIds?.includes(e.id) ?? false,
        style: {
          stroke: step.activeEdgeIds?.includes(e.id) ? "#D97757" : "#5C8A56",
          strokeWidth: 2,
        },
      })),
    [edges, step]
  );

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-pistachio-50 rounded-lg p-6 mb-4">
        <h3 className="font-serif text-2xl text-charcoal mb-2">{step.title}</h3>
        <p className="font-sans text-charcoal/70">{step.description}</p>
      </div>

      <div style={{ height: 360 }} className="bg-cream border border-pistachio-300 rounded-lg overflow-hidden">
        <ReactFlow nodes={flowNodes} edges={flowEdges} fitView proOptions={{ hideAttribution: true }}>
          <Background color="#E3EEDA" gap={20} />
        </ReactFlow>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={goPrev}
          disabled={currentStep === 0}
          className="px-4 py-2 rounded-md font-sans text-sm bg-charcoal text-cream disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        <span className="font-sans text-sm text-charcoal/60">
          Step {currentStep + 1} of {steps.length}
        </span>
        <button
          onClick={goNext}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 rounded-md font-sans text-sm bg-charcoal text-cream disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
}