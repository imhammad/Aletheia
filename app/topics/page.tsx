import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Topic } from "@/types/topic";

export default async function TopicsIndexPage() {
  const supabase = await createClient();

  const { data: topics } = await supabase
    .from("topics")
    .select("*")
    .order("created_at", { ascending: true })
    .returns<Topic[]>();

  return (
    <main className="min-h-screen bg-cream py-16 px-6">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="font-serif text-4xl text-charcoal mb-4">
          Explore CS Topics
        </h1>
        <p className="font-sans text-charcoal/70">
          Interactive, visual explanations of core computer science concepts.
        </p>
      </div>

      <div className="max-w-3xl mx-auto grid gap-4">
        {topics?.map((topic) => (
          <Link
            key={topic.id}
            href={`/topics/${topic.slug}`}
            className="block bg-pistachio-50 hover:bg-pistachio-100 transition-colors rounded-lg p-6 border border-pistachio-300"
          >
            <span className="font-sans text-xs text-ember-700 uppercase tracking-wide">
              {topic.domain} · {topic.difficulty}
            </span>
            <h2 className="font-serif text-2xl text-charcoal mt-1 mb-2">
              {topic.title}
            </h2>
            <p className="font-sans text-charcoal/70 text-sm">{topic.summary}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}