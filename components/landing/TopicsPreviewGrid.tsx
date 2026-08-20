"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Topic } from "@/types/topic";

export function TopicsPreviewGrid({ topics }: { topics: Topic[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {topics.map((topic, i) => (
        <motion.div
          key={topic.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <Link
            href={`/topics/${topic.slug}`}
            className="block bg-white hover:bg-cream transition-colors rounded-lg p-6 border border-pistachio-300 h-full"
          >
            <span className="font-sans text-xs text-ember-700 uppercase tracking-wide">
              {topic.domain}
            </span>
            <h3 className="font-serif text-xl text-charcoal mt-1 mb-2">{topic.title}</h3>
            <p className="font-sans text-charcoal/70 text-sm">{topic.summary}</p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}