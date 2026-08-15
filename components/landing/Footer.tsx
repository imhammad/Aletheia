import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-pistachio-300 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-serif text-lg text-charcoal">Aletheia</span>
        <div className="flex gap-6 font-sans text-sm text-charcoal/60">
          <Link href="/topics" className="hover:text-charcoal">Topics</Link>
          <Link href="/roadmaps" className="hover:text-charcoal">Roadmaps</Link>
          
          <a href="https://github.com/imhammad/Aletheia"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-charcoal"
          >
            View source on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}