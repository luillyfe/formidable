import { ReactNode } from "react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "whatwg-fetch";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "@remix-run/router";
import { installGlobals } from "@remix-run/node";

import { fetchTodos } from "../../Store/actions";

import "@testing-library/jest-dom";

import ListTodos from "./index";

jest.mock("../../Store/actions", () => {
  return {
    fetchTodos: jest.fn(() => []),
  };
});

jest.mock("../Todo", () => {
  // @ts-expect-error: no typechecking needed
  function Todo({ title, description, handleClick }) {
    return (
      <div
        className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
        role="document"
        onClick={handleClick}
      >
        {/* <FlyoutMenu /> */}
        <div>
          <ul>
            <li>Edit</li>
          </ul>
        </div>
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

  function EditTodo() {
    return <div>Editing a todo</div>;
  }

  // Define routes
  const routes = [
    {
      path: "/",
      element: <ListTodos />,
    },
    {
      path: "/todos/:todoId/edit",
      element: <EditTodo />,
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
  await waitFor(() => getByRole("list"));

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

  test("Must render 5 links", async () => {
    // Arrange
    const { queryAllByRole } = render(<RouterProvider router={router} />, {
      wrapper: Wrapper,
    });
    await waitFor(() => queryAllByRole("link"));

    // Assert
    expect(screen.queryAllByRole("link")).toHaveLength(6);
  });

  test("Must navigate to the Edit route", async () => {
    // Arrange
    const user = userEvent.setup();
    const { queryAllByRole } = render(<RouterProvider router={router} />, {
      wrapper: Wrapper,
    });
    await waitFor(() => queryAllByRole("link"));
    const editLinks = within(screen.getByRole("list")).getAllByRole("link");

    // Act
    await user.click(editLinks[0]);

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

    // Page transition is done
    expect(await screen.findByText("Editing a todo")).toBeInTheDocument();
  });
});
