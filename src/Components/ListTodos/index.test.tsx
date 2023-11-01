import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import ListTodos from "./index";

test("A new button must be on component", () => {
  // Arrange
  render(<ListTodos todos={[]} />, {
    wrapper: BrowserRouter,
  });

  // Assert
  expect(screen.getByText(/New/i)).toBeInTheDocument();
});

describe("Rendering todos", () => {
  const todos = [
    { id: 1, title: "todo1", description: "description1" },
    { id: 2, title: "todo2", description: "description2" },
    { id: 3, title: "todo3", description: "description3" },
    { id: 4, title: "todo4", description: "description4" },
    { id: 5, title: "todo5", description: "description5" },
  ];
  test("Must render 5 links", () => {
    // Arrange
    render(<ListTodos todos={todos} />, {
      wrapper: BrowserRouter,
    });

    // Assert
    expect(screen.queryAllByRole("link")).toHaveLength(5);
  });
});
