import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BrowserRouter } from "react-router-dom";

import AddTodo from ".";

test("Must render the component for adding a todo", () => {
  // Arrange
  render(<AddTodo />, { wrapper: BrowserRouter });

  // Assert
  // Must render the form for adding new todos
  expect(screen.getByRole("form")).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: "Title" })).toBeInTheDocument();
  expect(
    screen.getByRole("textbox", { name: "Todo description" })
  ).toBeInTheDocument();
  // two buttons must be on the screen
  expect(screen.getAllByRole("button")).toHaveLength(2);
  // Back button must on the screen
  expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
  // Add button must be on the screen
  expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
});
