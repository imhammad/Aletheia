import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { quizQuestions } from "@/lib/quiz-questions";
import type { QuizAnswer } from "@/types/quiz";
import { generateStructuredContent } from "@/lib/gemini";



export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "You must be logged in to take the quiz." }, { status: 401 });
  }

  const { answers }: { answers: QuizAnswer[] } = await request.json();

  if (!answers || answers.length !== quizQuestions.length) {
    return NextResponse.json({ error: "Please answer all questions." }, { status: 400 });
  }

  // Pull real roadmap fields so the AI recommends something that actually exists on the site
  const { data: roadmaps } = await supabase.from("roadmaps").select("field");
  const existingFields = [...new Set(roadmaps?.map((r) => r.field) ?? [])];

  const answersText = answers
    .map((a) => {
      const q = quizQuestions.find((q) => q.id === a.questionId);
      return `Q: ${q?.question}\nA: ${a.answer}`;
    })
    .join("\n\n");

  const prompt = `You are a career advisor for computer science students. Based on the quiz answers below, recommend the single CS field that best fits this student.

Quiz answers:
${answersText}

Existing roadmap fields on this platform (prefer matching one of these if it genuinely fits, otherwise suggest the closest real CS field name): ${existingFields.join(", ") || "none yet"}

Respond with a specific field name, a short 2-3 sentence explanation of why it fits based on their answers, and the roadmap field name to search for.`;

  const schema = {
    type: "object",
    properties: {
      recommendedField: { type: "string" },
      reasoning: { type: "string" },
      suggestedRoadmapField: { type: "string" },
    },
    required: ["recommendedField", "reasoning", "suggestedRoadmapField"],
  };

  try {
    const text = await generateStructuredContent(prompt, schema);
    const recommendation = JSON.parse(text);
    return NextResponse.json(recommendation);
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: "Something went wrong generating your recommendation." }, { status: 500 });
  }
}