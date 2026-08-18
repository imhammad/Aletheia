import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Roadmap } from "@/types/roadmap";

export default async function RoadmapsIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ field?: string }>;
}) {
  const { field } = await searchParams;
  const supabase = await createClient();

  let query = supabase.from("roadmaps").select("*").order("created_at", { ascending: false });

  if (field) {
    query = query.ilike("field", `%${field}%`);
  }

  const { data: roadmaps } = await query.returns<Roadmap[]>();

  return (
    <main className="min-h-screen bg-cream py-16 px-6">
      <div className="max-w-3xl mx-auto flex items-center justify-between mb-12">
        <div>
          <h1 className="font-serif text-4xl text-charcoal mb-2">
            Learning Roadmaps
          </h1>
          <p className="font-sans text-charcoal/70">
            {field
              ? `Showing roadmaps matching "${field}"`
              : "Community-curated paths for different CS fields."}
          </p>
          {field && (
            <Link href="/roadmaps" className="font-sans text-sm text-ember-700 hover:text-ember-500 underline">
              Clear filter
            </Link>
          )}
        </div>
        <Link
          href="/roadmaps/new"
          className="bg-ember-500 hover:bg-ember-700 text-cream font-sans px-5 py-2.5 rounded-md whitespace-nowrap"
        >
          + New Roadmap
        </Link>
      </div>

      <div className="max-w-3xl mx-auto grid gap-4">
        {roadmaps?.length === 0 && (
          <div className="text-center py-12">
            <p className="font-sans text-charcoal/60 mb-4">
              {field
                ? `No roadmaps yet for "${field}" — be the first to create one.`
                : "No roadmaps yet — be the first to create one."}
            </p>
            <Link
              href="/roadmaps/new"
              className="font-sans text-sm text-ember-700 hover:text-ember-500 underline"
            >
              Create the first roadmap
            </Link>
          </div>
        )}
        {roadmaps?.map((roadmap) => (
          <Link
            key={roadmap.id}
            href={`/roadmaps/${roadmap.id}`}
            className="block bg-pistachio-50 hover:bg-pistachio-100 transition-colors rounded-lg p-6 border border-pistachio-300"
          >
            <span className="font-sans text-xs text-ember-700 uppercase tracking-wide">
              {roadmap.field}
            </span>
            <h2 className="font-serif text-2xl text-charcoal mt-1 mb-2">
              {roadmap.title}
            </h2>
            {roadmap.description && (
              <p className="font-sans text-charcoal/70 text-sm">{roadmap.description}</p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}