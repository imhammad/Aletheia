"use client";

import { motion } from "framer-motion";
import { Network, Compass, Map } from "lucide-react";

const features = [
  {
    icon: Network,
    title: "Visualize",
    description: "Watch data structures and algorithms move, step by step, instead of memorizing them.",
  },
  {
    icon: Compass,
    title: "Find your path",
    description: "A short skills quiz points you toward the CS field that actually fits you.",
  },
  {
    icon: Map,
    title: "Follow real roadmaps",
    description: "Community-built learning paths with the books, videos, and courses that worked.",
  },
];

export function Features() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-pistachio-50 rounded-lg p-8 border border-pistachio-300"
          >
            <feature.icon className="text-ember-500 mb-4" size={28} strokeWidth={1.75} />
            <h3 className="font-serif text-xl text-charcoal mb-2">{feature.title}</h3>
            <p className="font-sans text-charcoal/70 text-sm leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}