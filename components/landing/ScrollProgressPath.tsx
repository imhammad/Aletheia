"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgressPath() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="hidden lg:block fixed left-8 top-28 bottom-28 w-px bg-pistachio-200 z-40">
      <motion.div
        className="w-full bg-ember-500 origin-top"
        style={{ scaleY: scrollYProgress, height: "100%" }}
      />
    </div>
  );
}