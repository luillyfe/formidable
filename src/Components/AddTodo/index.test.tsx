import { RouterProvider, createMemoryRouter } from "react-router-dom";

import "@testing-library/jest-dom";
import "whatwg-fetch";
import { render, screen, waitFor } from "@testing-library/react";
import { installGlobals } from "@remix-run/node";

// This installs globals such as "fetch", "Response", "Request" and "Headers".
installGlobals();

import AddTodo from ".";

test("Must render the component for adding a todo", async () => {
  const routes = [
    {
      path: "/",
      element: <AddTodo />,
      loader: () => {
        const todo = { id: "0", title: "", description: "" };
        return { todo };
      },
    },
  ];
  // A data router is required
  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
    initialIndex: 1,
  });

  // Arrange
  const { getByRole } = render(<RouterProvider router={router} />);
  await waitFor(() => getByRole("form"));

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
