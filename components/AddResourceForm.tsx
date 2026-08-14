"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AddResourceForm({ roadmapId, nextSortOrder }: { roadmapId: string; nextSortOrder: number }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [resourceType, setResourceType] = useState<"book" | "video" | "article" | "course" | "other">("article");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.from("roadmap_resources").insert({
      roadmap_id: roadmapId,
      title,
      url,
      resource_type: resourceType,
      sort_order: nextSortOrder,
    });

    if (error) {
      setError(error.message);
      setIsSubmitting(false);
      return;
    }

    setTitle("");
    setUrl("");
    router.refresh();
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-pistachio-50 rounded-lg p-6 space-y-3">
      <h3 className="font-serif text-lg text-charcoal">Add a resource</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full px-3 py-2 rounded-md border border-pistachio-300 bg-white font-sans text-sm text-charcoal focus:outline-none focus:border-ember-500"
      />
      <input
        type="url"
        placeholder="https://..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="w-full px-3 py-2 rounded-md border border-pistachio-300 bg-white font-sans text-sm text-charcoal focus:outline-none focus:border-ember-500"
      />
      <select
        value={resourceType}
        onChange={(e) => setResourceType(e.target.value as typeof resourceType)}
        className="w-full px-3 py-2 rounded-md border border-pistachio-300 bg-white font-sans text-sm text-charcoal"
      >
        <option value="book">Book</option>
        <option value="video">Video</option>
        <option value="article">Article</option>
        <option value="course">Course</option>
        <option value="other">Other</option>
      </select>
      {error && <p className="text-sm text-ember-700 font-sans">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-charcoal text-cream font-sans text-sm px-4 py-2 rounded-md disabled:opacity-50"
      >
        {isSubmitting ? "Adding..." : "Add Resource"}
      </button>
    </form>
  );
}