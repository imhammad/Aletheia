import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { StepPlayer } from "./StepPlayer";

const steps = [
  { id: "1", title: "Step One", description: "First step", state: [1, 2, 3], highlightIndices: [] },
  { id: "2", title: "Step Two", description: "Second step", state: [1, 2, 3], highlightIndices: [0] },
];

describe("StepPlayer", () => {
  it("renders the first step initially", () => {
    render(<StepPlayer steps={steps} />);
    expect(screen.getByText("Step One")).toBeInTheDocument();
    expect(screen.getByText("Step 1 of 2")).toBeInTheDocument();
  });

  it("advances to the next step when Next is clicked", () => {
    render(<StepPlayer steps={steps} />);
    fireEvent.click(screen.getByText("Next →"));
    expect(screen.getByText("Step Two")).toBeInTheDocument();
    expect(screen.getByText("Step 2 of 2")).toBeInTheDocument();
  });

  it("disables Previous on the first step and Next on the last", () => {
    render(<StepPlayer steps={steps} />);
    expect(screen.getByText("← Previous")).toBeDisabled();
    fireEvent.click(screen.getByText("Next →"));
    expect(screen.getByText("Next →")).toBeDisabled();
  });
});