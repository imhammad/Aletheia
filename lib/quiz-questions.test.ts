import { describe, it, expect } from "vitest";
import { quizQuestions } from "./quiz-questions";

describe("quizQuestions", () => {
  it("has at least one question", () => {
    expect(quizQuestions.length).toBeGreaterThan(0);
  });

  it("every question has a unique id", () => {
    const ids = quizQuestions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every question has at least 2 options", () => {
    quizQuestions.forEach((q) => {
      expect(q.options.length).toBeGreaterThanOrEqual(2);
    });
  });
});