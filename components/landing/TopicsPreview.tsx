import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Topic } from "@/types/topic";
import { TextLink } from "@/components/ui/TextLink";

export async function TopicsPreview() {
  const supabase = await createClient();

  const { data: topics } = await supabase
    .from("topics")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(3)
    .returns<Topic[]>();

  if (!topics || topics.length === 0) return null;

  return (
    <section className="bg-pistachio-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-3xl text-charcoal mb-2">Explore real topics</h2>
        <p className="font-sans text-charcoal/70 mb-10">
          No mockups — these are live on the site right now.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/topics/${topic.slug}`}
              className="block bg-white hover:bg-cream transition-colors rounded-lg p-6 border border-pistachio-300"
            >
              <span className="font-sans text-xs text-ember-700 uppercase tracking-wide">
                {topic.domain}
              </span>
              <h3 className="font-serif text-xl text-charcoal mt-1 mb-2">{topic.title}</h3>
              <p className="font-sans text-charcoal/70 text-sm">{topic.summary}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
            <TextLink href="/topics">View all topics</TextLink>
        </div>
      </div>
    </section>
  );
}