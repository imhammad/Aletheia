"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={sectionRef}
      className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid md:grid-cols-2 gap-12 items-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="font-sans text-sm text-ember-700 uppercase tracking-wide">
          A guide for computer science students
        </span>
        <h1 className="font-serif text-5xl md:text-6xl text-charcoal mt-4 mb-6 leading-tight">
          See how computer science actually works.
        </h1>
        <p className="font-sans text-charcoal/70 text-lg mb-8 max-w-md">
          Interactive visualizations, a guided path to your field, and roadmaps built by students who&apos;ve been there.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/topics"
            className="bg-ember-500 hover:bg-ember-700 text-cream font-sans font-semibold px-6 py-3 rounded-md transition-colors"
          >
            Explore topics
          </Link>
          <Link
            href="/roadmaps"
            className="border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream font-sans font-semibold px-6 py-3 rounded-md transition-colors"
          >
            Browse roadmaps
          </Link>
        </div>
      </motion.div>
      <motion.div style={{ y: visualY }}>
        <HeroVisual />
      </motion.div>
    </section>
  );
}