import { createClient } from "@/lib/supabase/server";
import { TopicsPreviewGrid } from "./TopicsPreviewGrid";
import { TextLink } from "@/components/ui/TextLink";
import type { Topic } from "@/types/topic";

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

        <TopicsPreviewGrid topics={topics} />

        <div className="text-center mt-10">
          <TextLink href="/topics">View all topics</TextLink>
        </div>
      </div>
    </section>
  );
}