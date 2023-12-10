import { ReactNode } from "react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "@testing-library/jest-dom";
import "whatwg-fetch";

import { render, screen, waitFor } from "@testing-library/react";
import { Router } from "@remix-run/router";
import { installGlobals } from "@remix-run/node";

import { fetchTodos } from "../../Store/actions";

import ListTodos from "./index";

jest.mock("../../Store/actions", () => {
  return {
    fetchTodos: jest.fn(() => []),
  };
});

jest.mock("../Todo", () => {
  // @ts-expect-error: no typechecking needed
  function Todo({ id, title, description, handleClick }) {
    return (
      <div
        className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
        role="document"
        onClick={handleClick}
      >
        {/* <FlyoutMenu> */}
        <div>
          <ul>
            <li>
              <a href={`/todos/${id}/edit`}>Edit</a>
            </li>
          </ul>
        </div>
        {/* <FlyoutMenu/> */}
        <div>
          <a href="#" className="font-semibold text-gray-900">
            {title}
            <span className="absolute inset-0"></span>
          </a>
          <p className="mt-1 text-gray-600">{description}</p>
        </div>
      </div>
    );
  }
  return Todo;
});

let router: Router,
  Wrapper: React.JSXElementConstructor<{
    children: React.ReactElement;
  }>;
beforeAll(() => {
  installGlobals();

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
  const { getByRole } = render(<RouterProvider router={router} />, {
    wrapper: Wrapper,
  });
  await waitFor(() => getByRole("link"));

  // Assert
  expect(screen.getByText(/New/i)).toBeInTheDocument();
  expect(screen.queryAllByRole("link")).toHaveLength(1);
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

  test("Must render all links in the page (Edit, Title and New links)", async () => {
    // Arrange
    const { queryAllByRole } = render(<RouterProvider router={router} />, {
      wrapper: Wrapper,
    });
    await waitFor(() => queryAllByRole("link"));

    // Assert
    expect(screen.queryAllByRole("link")).toHaveLength(11);
  });

  test("Must render edit links with expected properties", async () => {
    // Arrange
    const { queryAllByRole, container } = render(
      <RouterProvider router={router} />,
      {
        wrapper: Wrapper,
      }
    );
    await waitFor(() => queryAllByRole("link"));
    const editLinks = container.querySelectorAll(
      "#todo-list [href^='/todos/']"
    );

    // Assert
    expect(editLinks).toHaveLength(5);
    expect(editLinks[0]).toHaveAttribute("href");
    expect(editLinks[0]).toHaveAttribute(
      "href",
      expect.stringContaining("/todos/")
    );
    expect(editLinks[1]).toHaveAttribute(
      "href",
      expect.stringContaining("/edit")
    );
  });
});
