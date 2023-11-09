import { ReactNode } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { fetchTodos } from "../../Store/actions";

import "@testing-library/jest-dom";

import ListTodos from "./index";

// Implementation ust be changed due to test
jest.mock("../../Store/actions", () => {
  return {
    fetchTodos: jest.fn(() => []),
  };
});

let router: unknown,
  Wrapper: React.JSXElementConstructor<{
    children: React.ReactElement;
  }>;
beforeAll(() => {
  // Define routes
  const routes = [
    {
      path: "/",
      element: <ListTodos />,
    },
  ];

  // Create router
  router = createMemoryRouter(routes, {
    initialEntries: ["/"],
    initialIndex: 1,
  });

  // Define QueryWrapper
  const client = new QueryClient();
  Wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
  };

  return { router, Wrapper };
});

test("Must render an empty todo list component", async () => {
  // Arrange
  // @ts-expect-error: I could'n find the proper types for Router
  const { getByRole } = render(<RouterProvider router={router} />, {
    wrapper: Wrapper,
  });
  await waitFor(() => getByRole("list"));

  // Assert
  expect(screen.getByText(/New/i)).toBeInTheDocument();
  expect(screen.queryAllByRole("link")).toHaveLength(0);
});

describe("Rendering todos", () => {
  beforeEach(() => {
    const todos = [
      { id: "0", title: "", description: "" },
      { id: "1", title: "", description: "" },
      { id: "2", title: "", description: "" },
      { id: "3", title: "", description: "" },
      { id: "4", title: "", description: "" },
    ];
    (fetchTodos as jest.Mock).mockReturnValue(todos);
  });

  test("Must render 5 links", async () => {
    // Arrange
    // @ts-expect-error: I could'n find the proper types for Router
    const { queryAllByRole } = render(<RouterProvider router={router} />, {
      wrapper: Wrapper,
    });
    await waitFor(() => queryAllByRole("link"));

    // Assert
    expect(screen.queryAllByRole("link")).toHaveLength(5);
  });
});
