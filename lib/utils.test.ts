import { describe, it, expect } from "vitest";
import { calculateAverageRating } from "./utils";

describe("calculateAverageRating", () => {
  it("returns null for an empty array", () => {
    expect(calculateAverageRating([])).toBeNull();
  });

  it("returns the correct average for a single rating", () => {
    expect(calculateAverageRating([{ rating: 4 }])).toBe("4.0");
  });

  it("returns the correct average for multiple ratings", () => {
    expect(calculateAverageRating([{ rating: 5 }, { rating: 3 }])).toBe("4.0");
  });

  it("rounds to one decimal place", () => {
    expect(calculateAverageRating([{ rating: 5 }, { rating: 4 }, { rating: 4 }])).toBe("4.3");
  });
});