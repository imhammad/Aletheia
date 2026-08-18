"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { CareerPlan } from "@/types/career-plan";

export default function CareerPlannerPage() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [targetRole, setTargetRole] = useState("");
  const [currentField, setCurrentField] = useState("");
  const [timelineMonths, setTimelineMonths] = useState(6);
  const [plan, setPlan] = useState<CareerPlan | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
      setCheckingAuth(false);
    };
    checkAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/career-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetRole, currentField, timelineMonths }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setIsSubmitting(false);
        return;
      }

      setPlan(data);
    } catch {
      setError("Network error — please try again.");
    }

    setIsSubmitting(false);
  };

  if (checkingAuth) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center px-6">
        <p className="font-sans text-charcoal/50">Loading...</p>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-charcoal mb-4">Log in to build a career plan</h1>
          <Link
            href="/login"
            className="inline-block bg-ember-500 hover:bg-ember-700 text-cream font-sans font-semibold px-6 py-3 rounded-md transition-colors"
          >
            Log in
          </Link>
        </div>
      </main>
    );
  }

  if (plan) {
    return (
      <main className="min-h-screen bg-cream py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <span className="font-sans text-sm text-ember-700 uppercase tracking-wide">Your plan for</span>
          <h1 className="font-serif text-4xl text-charcoal mt-1 mb-6">{targetRole}</h1>
          <p className="font-sans text-charcoal/80 leading-relaxed mb-10">{plan.overview}</p>

          <h2 className="font-serif text-2xl text-charcoal mb-4">Timeline</h2>
          <div className="space-y-4 mb-10">
            {plan.timeline.map((phase, i) => (
              <div key={i} className="bg-pistachio-50 rounded-lg p-6 border border-pistachio-300">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-serif text-lg text-charcoal">{phase.phase}</h3>
                  <span className="font-sans text-xs text-ember-700 uppercase">{phase.duration}</span>
                </div>
                <p className="font-sans text-sm text-charcoal/70 mb-3">{phase.focus}</p>
                <div className="flex flex-wrap gap-2">
                  {phase.skills.map((skill) => (
                    <span key={skill} className="font-sans text-xs bg-white border border-pistachio-300 rounded-full px-3 py-1 text-charcoal/80">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-serif text-2xl text-charcoal mb-4">Certificates worth pursuing</h2>
          <ul className="list-disc list-inside font-sans text-charcoal/80 mb-10 space-y-1">
            {plan.certificates.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>

          <h2 className="font-serif text-2xl text-charcoal mb-4">Interview prep</h2>
          <ul className="list-disc list-inside font-sans text-charcoal/80 space-y-1">
            {plan.interviewPrepTips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream py-16 px-6">
      <div className="max-w-xl mx-auto">
        <h1 className="font-serif text-3xl text-charcoal mb-8">Build your career plan</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-sans text-sm text-charcoal/70 block mb-1">Target role</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              required
              placeholder="e.g. Software Engineer at Google"
              className="w-full px-4 py-3 rounded-md border border-pistachio-300 bg-white font-sans text-charcoal focus:outline-none focus:border-ember-500"
            />
          </div>

          <div>
            <label className="font-sans text-sm text-charcoal/70 block mb-1">Current field / background (optional)</label>
            <input
              type="text"
              value={currentField}
              onChange={(e) => setCurrentField(e.target.value)}
              placeholder="e.g. Backend Engineering, or leave blank if just starting"
              className="w-full px-4 py-3 rounded-md border border-pistachio-300 bg-white font-sans text-charcoal focus:outline-none focus:border-ember-500"
            />
          </div>

          <div>
            <label className="font-sans text-sm text-charcoal/70 block mb-1">
              Timeline: {timelineMonths} months
            </label>
            <input
              type="range"
              min={1}
              max={24}
              value={timelineMonths}
              onChange={(e) => setTimelineMonths(Number(e.target.value))}
              className="w-full accent-ember-500"
            />
          </div>

          {error && <p className="text-sm text-ember-700 font-sans">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-ember-500 hover:bg-ember-700 text-cream font-sans font-semibold px-6 py-3 rounded-md transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Generating your plan..." : "Generate Plan"}
          </button>
        </form>
      </div>
    </main>
  );
}