"use client";

import { useState } from "react";
import Link from "next/link";
import { quizQuestions } from "@/lib/quiz-questions";
import type { QuizAnswer, QuizRecommendation } from "@/types/quiz";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { QuizResultPDF } from "@/components/QuizResultPDF";

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [recommendation, setRecommendation] = useState<QuizRecommendation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const question = quizQuestions[currentQuestion];
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
      setCheckingAuth(false);
    };
    checkAuth();
  }, []);

  const handleAnswer = async (answer: string) => {
    const newAnswers = [...answers, { questionId: question.id, answer }];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      return;
    }

    // Last question — submit to the API
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: newAnswers }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setIsSubmitting(false);
        return;
      }

      setRecommendation(data);
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
        <h1 className="font-serif text-3xl text-charcoal mb-4">Log in to take the quiz</h1>
        <p className="font-sans text-charcoal/70 mb-6">
          We use your account to save your recommendation.
        </p>
        <Link
          href="/login?redirect=/quiz"
          className="inline-block bg-ember-500 hover:bg-ember-700 text-cream font-sans font-semibold px-6 py-3 rounded-md transition-colors"
        >
          Log in
        </Link>
      </div>
    </main>
  );
}

  if (recommendation) {
    return (
      <main className="min-h-screen bg-cream py-16 px-6">
        <div className="max-w-xl mx-auto text-center">
          <span className="font-sans text-sm text-ember-700 uppercase tracking-wide">
            Your recommended field
          </span>
          <h1 className="font-serif text-4xl text-charcoal mt-2 mb-6">
            {recommendation.recommendedField}
          </h1>
          <p className="font-sans text-charcoal/80 leading-relaxed mb-10">
            {recommendation.reasoning}
          </p>
          <Link
            href={`/roadmaps?field=${encodeURIComponent(recommendation.suggestedRoadmapField)}`}
            className="inline-block bg-ember-500 hover:bg-ember-700 text-cream font-sans font-semibold px-6 py-3 rounded-md transition-colors"
          >
            Find a roadmap for this field
          </Link>
                    <div className="mt-4">
            <PDFDownloadLink
              document={<QuizResultPDF recommendation={recommendation} />}
              fileName="aletheia-recommendation.pdf"
              className="font-sans text-sm text-charcoal/60 hover:text-charcoal underline"
            >
              {({ loading }) => (loading ? "Preparing PDF..." : "Download as PDF")}
            </PDFDownloadLink>
          </div>
        </div>
      </main>
    );
  }

  if (isSubmitting) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center px-6">
        <p className="font-sans text-charcoal/70">Analyzing your answers...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream py-16 px-6">
      <div className="max-w-xl mx-auto">
        <span className="font-sans text-sm text-charcoal/50">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </span>
        <h1 className="font-serif text-3xl text-charcoal mt-2 mb-8">{question.question}</h1>

        {error && <p className="text-sm text-ember-700 font-sans mb-4">{error}</p>}

        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="w-full text-left px-5 py-4 rounded-md border border-pistachio-300 bg-white hover:border-ember-500 hover:bg-pistachio-50 transition-colors font-sans text-charcoal"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}