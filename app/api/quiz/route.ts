import { GoogleGenAI } from "@google/genai";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { quizQuestions } from "@/lib/quiz-questions";
import type { QuizAnswer } from "@/types/quiz";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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

  const modelsToTry = ["gemini-flash-latest", "gemini-flash-lite-latest"];

  const generateWithModel = async (model: string, retries = 1): Promise<string> => {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              recommendedField: { type: "string" },
              reasoning: { type: "string" },
              suggestedRoadmapField: { type: "string" },
            },
            required: ["recommendedField", "reasoning", "suggestedRoadmapField"],
          },
        },
      });
      return response.text ?? "{}";
    } catch (err) {
      const isOverloaded = err instanceof Error && err.message.includes("UNAVAILABLE");
      if (isOverloaded && retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return generateWithModel(model, retries - 1);
      }
      throw err;
    }
  };

  const generateWithFallback = async (): Promise<string> => {
    let lastError: unknown;
    for (const model of modelsToTry) {
      try {
        return await generateWithModel(model);
      } catch (err) {
        lastError = err;
      }
    }
    throw lastError;
  };

  try {
    const text = await generateWithFallback();
    const recommendation = JSON.parse(text);
    return NextResponse.json(recommendation);
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: "Something went wrong generating your recommendation." }, { status: 500 });
  }
}