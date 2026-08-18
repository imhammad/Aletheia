import { createClient } from "@/lib/supabase/server";
import { generateStructuredContent } from "@/lib/gemini";
import { NextResponse } from "next/server";
import type { CareerPlanInput } from "@/types/career-plan";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "You must be logged in to generate a career plan." }, { status: 401 });
  }

  const { targetRole, currentField, timelineMonths }: CareerPlanInput = await request.json();

  if (!targetRole || !timelineMonths) {
    return NextResponse.json({ error: "Please provide a target role and timeline." }, { status: 400 });
  }

  const prompt = `You are a career advisor for computer science students. Create a realistic, actionable career plan for a student aiming for this role:

Target role: ${targetRole}
Current field/background: ${currentField || "Not specified — assume early-stage student"}
Timeline: ${timelineMonths} months

Break the timeline into 3-5 phases. For each phase, give a short focus description and a list of specific skills to learn (not resources or links, just skill names). Also suggest 2-4 relevant certificates or credentials worth pursuing, and 3-5 concrete interview preparation tips specific to this role. Be realistic and specific to the role, not generic.`;

  const schema = {
    type: "object",
    properties: {
      overview: { type: "string" },
      timeline: {
        type: "array",
        items: {
          type: "object",
          properties: {
            phase: { type: "string" },
            duration: { type: "string" },
            focus: { type: "string" },
            skills: { type: "array", items: { type: "string" } },
          },
          required: ["phase", "duration", "focus", "skills"],
        },
      },
      certificates: { type: "array", items: { type: "string" } },
      interviewPrepTips: { type: "array", items: { type: "string" } },
    },
    required: ["overview", "timeline", "certificates", "interviewPrepTips"],
  };

  try {
    const text = await generateStructuredContent(prompt, schema);
    const plan = JSON.parse(text);

    await supabase.from("career_plans").insert({
      user_id: user.id,
      target_role: targetRole,
      current_field: currentField || null,
      plan_data: plan,
    });

    return NextResponse.json(plan);
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: "Something went wrong generating your plan." }, { status: 500 });
  }
}