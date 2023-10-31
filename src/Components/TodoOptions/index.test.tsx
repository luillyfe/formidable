import { render, screen } from "@testing-library/react";
import TodoOptions from ".";

test("shows todo options", () => {
  // Arrange
  render(<TodoOptions />);

  // Assert
  expect(screen.getAllByRole("link")).toHaveLength(2);
});
