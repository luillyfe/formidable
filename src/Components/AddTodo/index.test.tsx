import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { RouterProvider, createMemoryRouter } from "react-router-dom";

import AddTodo from ".";

// Remix router is failing for some reason around the Request obj
global["Request"] = jest.fn().mockImplementation(() => ({
  signal: {
    removeEventListener: () => {},
    addEventListener: () => {},
  },
}));

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
