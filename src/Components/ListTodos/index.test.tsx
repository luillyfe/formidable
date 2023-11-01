import { render, screen } from "@testing-library/react";
import ListTodos from "./index";

test("A new button must be on component", () => {
  // Arrange
  render(<ListTodos todos={[{ id: 1, title: "", description: "" }]} />);

  // Assert
  expect(screen.queryAllByRole("link")).toHaveLength(1);
});
