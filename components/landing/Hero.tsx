import Link from "next/link";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid md:grid-cols-2 gap-12 items-center">
      <div>
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
      </div>
      <HeroVisual />
    </section>
  );
}