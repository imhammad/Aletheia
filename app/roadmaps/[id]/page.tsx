import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AddResourceForm } from "@/components/AddResourceForm";
import type { Roadmap, RoadmapResource } from "@/types/roadmap";
import { RatingWidget } from "@/components/RatingWidget";
import type { RoadmapRating } from "@/types/roadmap";

const resourceTypeLabels: Record<string, string> = {
  book: "📖 Book",
  video: "🎥 Video",
  article: "📄 Article",
  course: "🎓 Course",
  other: "🔗 Link",
};

export default async function RoadmapDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: roadmap, error } = await supabase
    .from("roadmaps")
    .select("*")
    .eq("id", id)
    .single<Roadmap>();

  if (error || !roadmap) {
    notFound();
  }

  const { data: { user } } = await supabase.auth.getUser();
  const isCreator = user?.id === roadmap.created_by;

  const { data: resources } = await supabase
    .from("roadmap_resources")
    .select("*")
    .eq("roadmap_id", id)
    .order("sort_order", { ascending: true })
    .returns<RoadmapResource[]>();

  const nextSortOrder = (resources?.length ?? 0) + 1;

  const { data: ratings } = await supabase
    .from("roadmap_ratings")
    .select("*")
    .eq("roadmap_id", id)
    .returns<RoadmapRating[]>();

  const averageRating =
    ratings && ratings.length > 0
      ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
      : null;

  const myExistingRating = ratings?.find((r) => r.user_id === user?.id) ?? null;

  return (
    <main className="min-h-screen bg-cream py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <span className="font-sans text-sm text-pistachio-700 uppercase tracking-wide">
          {roadmap.field}
        </span>
        <h1 className="font-serif text-4xl text-charcoal mt-2 mb-4">
          {roadmap.title}
        </h1>
        {roadmap.description && (
          <p className="font-sans text-charcoal/80 leading-relaxed mb-10">
            {roadmap.description}
          </p>
        )}

        <h2 className="font-serif text-2xl text-charcoal mb-4">Resources</h2>

        {resources?.length === 0 && (
          <p className="font-sans text-charcoal/60 mb-6">No resources added yet.</p>
        )}

        <ul className="space-y-3 mb-8">
          {resources?.map((resource) => (
            <li key={resource.id}>
              {}
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-white border border-pistachio-300 rounded-md px-4 py-3 hover:border-ember-500 transition-colors"
              >
                <span className="font-sans text-charcoal">{resource.title}</span>
                <span className="font-sans text-xs text-charcoal/50">
                  {resourceTypeLabels[resource.resource_type] ?? resource.resource_type}
                </span>
              </a>
            </li>
          ))}
        </ul>

        {isCreator && (
          <AddResourceForm roadmapId={roadmap.id} nextSortOrder={nextSortOrder} />
        )}

        <h2 className="font-serif text-2xl text-charcoal mb-4 mt-12">
          Ratings {averageRating && `— ${averageRating} ★ (${ratings?.length})`}
        </h2>

        <RatingWidget
          roadmapId={roadmap.id}
          userId={user?.id ?? null}
          existingRating={myExistingRating}
        />

        {ratings && ratings.filter((r) => r.review).length > 0 && (
          <ul className="space-y-3 mt-6">
            {ratings
              .filter((r) => r.review)
              .map((r) => (
                <li key={r.id} className="bg-white border border-pistachio-300 rounded-md px-4 py-3">
                  <span className="text-ember-500">{"★".repeat(r.rating)}</span>
                  <p className="font-sans text-sm text-charcoal/80 mt-1">{r.review}</p>
                </li>
              ))}
          </ul>
        )}
      </div>
    </main>
  );
}