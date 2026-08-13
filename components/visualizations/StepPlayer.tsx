"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { StepPlayerData } from "@/types/topic";

export function StepPlayer({ steps }: StepPlayerData) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-pistachio-50 rounded-lg p-8 min-h-[240px] flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-2xl text-charcoal mb-2">{step.title}</h3>
          <p className="font-sans text-charcoal/70 mb-6">{step.description}</p>
        </div>

        <div className="flex gap-2 justify-center flex-wrap">
          <AnimatePresence mode="popLayout">
            {step.state.map((value, index) => (
              <motion.div
                key={`${index}-${value}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`w-12 h-12 flex items-center justify-center rounded-md font-sans font-semibold
                  ${
                    step.highlightIndices?.includes(index)
                      ? "bg-ember-500 text-cream"
                      : "bg-cream text-charcoal border border-pistachio-300"
                  }`}
              >
                {value}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
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