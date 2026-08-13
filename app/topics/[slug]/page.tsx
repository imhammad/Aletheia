import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { StepPlayer } from "@/components/visualizations/StepPlayer";
import { NodeGraph } from "@/components/visualizations/NodeGraph";
import type { Topic, StepPlayerData, NodeGraphData } from "@/types/topic";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: topic, error } = await supabase
    .from("topics")
    .select("*")
    .eq("slug", slug)
    .single<Topic>();

  if (error || !topic) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-cream py-16 px-6">
      <div className="max-w-3xl mx-auto mb-12">
        <span className="font-sans text-sm text-pistachio-700 uppercase tracking-wide">
          {topic.domain} · {topic.difficulty}
        </span>
        <h1 className="font-serif text-4xl text-charcoal mt-2 mb-4">
          {topic.title}
        </h1>
        <p className="font-sans text-charcoal/70">{topic.summary}</p>
      </div>

      {topic.renderer_type === "step_player" && (
        <StepPlayer {...(topic.visualization_data as StepPlayerData)} />
      )}
      {topic.renderer_type === "node_graph" && (
        <NodeGraph {...(topic.visualization_data as NodeGraphData)} />
      )}

      <div className="max-w-2xl mx-auto mt-16 bg-pistachio-50 rounded-lg p-8">
        <h2 className="font-serif text-xl text-charcoal mb-3">Notes</h2>
        <p className="font-sans text-charcoal/80 leading-relaxed">{topic.notes}</p>
      </div>
    </main>
  );
}