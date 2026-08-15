"use client";

import { motion, useReducedMotion } from "framer-motion";

type Node = { id: string; cx: number; cy: number };

const nodes: Node[] = [
  { id: "a", cx: 100, cy: 30 },
  { id: "b", cx: 40, cy: 110 },
  { id: "c", cx: 160, cy: 110 },
  { id: "d", cx: 10, cy: 190 },
  { id: "e", cx: 70, cy: 190 },
];

const edges: [string, string][] = [
  ["a", "b"],
  ["a", "c"],
  ["b", "d"],
  ["b", "e"],
];

const signalOrder = ["a", "b", "d", "b", "e", "a", "c"];

export function HeroVisual() {
  const reduceMotion = useReducedMotion();
  const findNode = (id: string) => nodes.find((n) => n.id === id)!;
  const signalPath = signalOrder.map((id) => findNode(id));

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-square">
      <svg viewBox="0 0 200 220" className="w-full h-full">
        {edges.map(([from, to]) => {
          const a = findNode(from);
          const b = findNode(to);
          return (
            <line
              key={`${from}-${to}`}
              x1={a.cx}
              y1={a.cy}
              x2={b.cx}
              y2={b.cy}
              stroke="var(--color-pistachio-300)"
              strokeWidth={2}
            />
          );
        })}

        {nodes.map((n, i) => (
          <motion.circle
            key={n.id}
            cx={n.cx}
            cy={n.cy}
            r={10}
            fill="var(--color-cream)"
            stroke="var(--color-pistachio-500)"
            strokeWidth={2}
            animate={reduceMotion ? {} : { scale: [1, 1.15, 1] }}
            transition={
              reduceMotion
                ? {}
                : { duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }
            }
          />
        ))}

        {!reduceMotion && (
          <motion.circle
            r={5}
            fill="var(--color-ember-500)"
            animate={{
              cx: signalPath.map((p) => p.cx),
              cy: signalPath.map((p) => p.cy),
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </svg>
    </div>
  );
}