"use client";

import Link from "next/link";
import { StepPlayer } from "@/components/visualizations/StepPlayer";
import { TextLink } from "@/components/ui/TextLink";
import { motion } from "framer-motion";

const demoSteps = [
  { id: "1", title: "Starting array", description: "We begin with an unsorted array.", state: [5, 2, 8, 1], highlightIndices: [] },
  { id: "2", title: "Compare 5 and 2", description: "5 > 2, so we swap them.", state: [5, 2, 8, 1], highlightIndices: [0, 1] },
  { id: "3", title: "Swapped", description: "Array after the swap.", state: [2, 5, 8, 1], highlightIndices: [0, 1] },
  { id: "4", title: "Compare 5 and 8", description: "5 < 8, no swap needed.", state: [2, 5, 8, 1], highlightIndices: [1, 2] },
  { id: "5", title: "Compare 8 and 1", description: "8 > 1, so we swap them.", state: [2, 5, 8, 1], highlightIndices: [2, 3] },
  { id: "6", title: "Sorted (this pass)", description: "One full pass complete.", state: [2, 5, 1, 8], highlightIndices: [2, 3] },
];

export function LiveDemo() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <span className="font-sans text-sm text-ember-700 uppercase tracking-wide">See it in action</span>
        <h2 className="font-serif text-3xl text-charcoal mt-2 mb-3">Try a visualization right now</h2>
        <p className="font-sans text-charcoal/70 max-w-md mx-auto">
          No sign-up needed — this is the same engine every topic on the site runs on.
        </p>
      </motion.div>
      <StepPlayer steps={demoSteps} />
      <div className="text-center mt-10">
        <TextLink href="/topics">Explore all topics</TextLink>
      </div>
    </section>
  );
}