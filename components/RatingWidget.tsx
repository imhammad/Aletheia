"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function RatingWidget({
  roadmapId,
  userId,
  existingRating,
}: {
  roadmapId: string;
  userId: string | null;
  existingRating: { rating: number; review: string | null } | null;
}) {
  const [rating, setRating] = useState(existingRating?.rating ?? 0);
  const [review, setReview] = useState(existingRating?.review ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (!userId) {
    return (
      <p className="font-sans text-sm text-charcoal/60">
        Log in to rate this roadmap.
      </p>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || rating === 0) return;
    setIsSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase
      .from("roadmap_ratings")
      .upsert(
        { roadmap_id: roadmapId, user_id: userId, rating, review: review || null },
        { onConflict: "roadmap_id,user_id" }
      );

    if (error) {
      setError(error.message);
      setIsSubmitting(false);
      return;
    }

    router.refresh();
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-pistachio-50 rounded-lg p-6 space-y-3">
      <h3 className="font-serif text-lg text-charcoal">
        {existingRating ? "Update your rating" : "Rate this roadmap"}
      </h3>

      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`text-2xl ${star <= rating ? "text-ember-500" : "text-pistachio-300"}`}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Optional review..."
        rows={2}
        className="w-full px-3 py-2 rounded-md border border-pistachio-300 bg-white font-sans text-sm text-charcoal focus:outline-none focus:border-ember-500"
      />

      {error && <p className="text-sm text-ember-700 font-sans">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting || rating === 0}
        className="bg-charcoal text-cream font-sans text-sm px-4 py-2 rounded-md disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : existingRating ? "Update Rating" : "Submit Rating"}
      </button>
    </form>
  );
}