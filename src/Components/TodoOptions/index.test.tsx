import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TodoOptions from "./index";

test("shows todo options", () => {
  // Arrange
  render(<TodoOptions />, { wrapper: BrowserRouter });

  // Assert
  expect(screen.getAllByRole("link")).toHaveLength(2);
});
