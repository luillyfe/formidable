import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BrowserRouter } from "react-router-dom";

import AddTodo from ".";

describe("AddTodo Component", () => {
  test("must render a form", () => {
    // Arrange
    render(<AddTodo />, { wrapper: BrowserRouter });

    // Assert
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  test("must render a back button", () => {
    // Arrange
    render(<AddTodo />, { wrapper: BrowserRouter });

    expect(screen.getAllByRole("button", { name: "Back" })).toBeInTheDocument;
  });
});
