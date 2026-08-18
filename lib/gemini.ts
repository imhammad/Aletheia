import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const modelsToTry = ["gemini-flash-latest", "gemini-flash-lite-latest"];

async function generateWithModel(
  model: string,
  prompt: string,
  responseSchema: object,
  retries = 1
): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: { responseMimeType: "application/json", responseSchema },
    });
    return response.text ?? "{}";
  } catch (err) {
    const isOverloaded = err instanceof Error && err.message.includes("UNAVAILABLE");
    if (isOverloaded && retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return generateWithModel(model, prompt, responseSchema, retries - 1);
    }
    throw err;
  }
}

export async function generateStructuredContent(prompt: string, responseSchema: object): Promise<string> {
  let lastError: unknown;
  for (const model of modelsToTry) {
    try {
      return await generateWithModel(model, prompt, responseSchema);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}