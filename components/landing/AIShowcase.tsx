"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Target } from "lucide-react";
import { TextLink } from "@/components/ui/TextLink";

const items = [
  {
    icon: Sparkles,
    title: "Find Your Path",
    description: "Answer 5 quick questions and get an AI-generated recommendation for which CS field fits you — backed by real reasoning, not a generic quiz result.",
    href: "/quiz",
    cta: "Take the quiz",
  },
  {
    icon: Target,
    title: "Career Planner",
    description: "Tell it your target role and timeline. Get a phased plan with the skills, certificates, and interview prep to get there.",
    href: "/career-planner",
    cta: "Build your plan",
  },
];

export function AIShowcase() {
  return (
    <section className="bg-charcoal py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="font-sans text-sm text-ember-300 uppercase tracking-wide">Powered by AI</span>
          <h2 className="font-serif text-3xl text-cream mt-2">Guidance, not just content</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-charcoal border border-pistachio-700/40 rounded-lg p-8"
            >
              <item.icon className="text-ember-500 mb-4" size={28} strokeWidth={1.75} />
              <h3 className="font-serif text-xl text-cream mb-2">{item.title}</h3>
              <p className="font-sans text-cream/70 text-sm leading-relaxed mb-6">{item.description}</p>
                <TextLink href={item.href} variant="dark">{item.cta}</TextLink>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}