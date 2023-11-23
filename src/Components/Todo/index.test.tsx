import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

// import '@testing-library/jest-dom/vitest'

import Todo from ".";

jest.mock("../../Store/actions", () => {
  return {
    deleteDocument: jest.fn(() => null),
  };
});

jest.mock("../FlyoutMenu", () => {
  function FlyoutMenu() {
    return (
      <div>
        <ul>
          <li>Edit</li>
        </ul>
      </div>
    );
  }
  return FlyoutMenu;
});

describe("Todo Component", () => {
  test("render a single todo", () => {
    // Arrange
    const props = {
      id: "4",
      title: "Go dancing around",
      description: "Let have the most fun ever described",
      handleDelete: (todoId: string) => {
        console.log(todoId);
      },
    };

    function Wrapper({ children }: { children: ReactNode }) {
      const client = new QueryClient();
      return (
        <QueryClientProvider client={client}>
          <BrowserRouter>{children}</BrowserRouter>
        </QueryClientProvider>
      );
    }
    render(<Todo {...props} />, { wrapper: Wrapper });

    // Assert
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByText("Go dancing around")).toBeVisible();
    expect(
      screen.getByText("Let have the most fun ever described")
    ).toBeVisible();
  });
});
