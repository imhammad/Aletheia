"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function NewRoadmapPage() {
  const [title, setTitle] = useState("");
  const [field, setField] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in to create a roadmap.");
      setIsSubmitting(false);
      return;
    }

    const { data, error } = await supabase
      .from("roadmaps")
      .insert({ title, field, description, created_by: user.id })
      .select()
      .single();

    if (error) {
      setError(error.message);
      setIsSubmitting(false);
      return;
    }

    router.push(`/roadmaps/${data.id}`);
  };

  return (
    <main className="min-h-screen bg-cream py-16 px-6">
      <div className="max-w-xl mx-auto">
        <h1 className="font-serif text-3xl text-charcoal mb-8">
          Create a Roadmap
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-sans text-sm text-charcoal/70 block mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Becoming a Backend Engineer"
              className="w-full px-4 py-3 rounded-md border border-pistachio-300 bg-white font-sans text-charcoal focus:outline-none focus:border-ember-500"
            />
          </div>

          <div>
            <label className="font-sans text-sm text-charcoal/70 block mb-1">Field</label>
            <input
              type="text"
              value={field}
              onChange={(e) => setField(e.target.value)}
              required
              placeholder="e.g. Backend Engineering, Machine Learning"
              className="w-full px-4 py-3 rounded-md border border-pistachio-300 bg-white font-sans text-charcoal focus:outline-none focus:border-ember-500"
            />
          </div>

          <div>
            <label className="font-sans text-sm text-charcoal/70 block mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="What will someone learn by following this roadmap?"
              className="w-full px-4 py-3 rounded-md border border-pistachio-300 bg-white font-sans text-charcoal focus:outline-none focus:border-ember-500"
            />
          </div>

          {error && <p className="text-sm text-ember-700 font-sans">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-ember-500 hover:bg-ember-700 text-cream font-sans font-semibold px-6 py-3 rounded-md transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Roadmap"}
          </button>
        </form>
      </div>
    </main>
  );
}