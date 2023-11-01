import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BrowserRouter } from "react-router-dom";

import AddTodo from ".";

test("Must render the component for adding a todo", () => {
  // Arrange
  render(<AddTodo />, { wrapper: BrowserRouter });

  // Assert
  // must render a form
  expect(screen.getByRole("form")).toBeInTheDocument();
  // two buttons must be on the screen
  expect(screen.getAllByRole("button")).toHaveLength(2);
  // Back button must on the screen
  expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
  // Add button must be on the screen
  expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
});
