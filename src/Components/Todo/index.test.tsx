import { MouseEvent } from "react";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// import '@testing-library/jest-dom/vitest'

import Todo from ".";

describe("Todo Component", () => {
  test("render a single todo", () => {
    // Arrange
    const props = {
      id: "4",
      title: "Go dancing around",
      description: "Let have the most fun ever described",
      handleClick: (event: MouseEvent) => {
        event.stopPropagation();
      },
    };
    render(<Todo {...props} />);

    // Assert
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByText("Go dancing around")).toBeVisible();
    expect(
      screen.getByText("Let have the most fun ever described")
    ).toBeVisible();
  });
});
