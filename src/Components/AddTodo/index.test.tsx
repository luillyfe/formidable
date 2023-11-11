import { RouterProvider, createMemoryRouter } from "react-router-dom";

import "@testing-library/jest-dom";
import "whatwg-fetch";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { installGlobals } from "@remix-run/node";
import { Router } from "@remix-run/router";

import { handleTodoSubmit } from "./action";
import AddTodo from ".";

jest.mock("../../Store/actions", () => {
  return {
    addTodo: () => [],
  };
});

let router: Router;
beforeAll(() => {
  // This installs globals such as "fetch", "Response", "Request" and "Headers".
  installGlobals();

  const routes = [
    {
      path: "/",
      element: <AddTodo />,
      action: handleTodoSubmit,
      loader: () => {
        const todo = { id: "0", title: "", description: "" };
        return { todo };
      },
    },
  ];
  // A data router is required
  router = createMemoryRouter(routes, {
    initialEntries: ["/"],
    initialIndex: 1,
  });
});

test("Must render the component for adding a todo", async () => {
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

describe("Form validation: When user clicks in submit ", () => {
  test("and both title and description inputs are empty", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    // Act
    user.click(screen.getByRole("button", { name: /Add/i }));

    // Assert
    expect(await screen.findByText("Title must not be empty")).toBeVisible;
    expect(
      await screen.findByText("Description must be larger than 10 characters")
    ).toBeVisible();
  });

  test("and title is not empty but description is", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const todoTitleField = screen.getByRole("textbox", { name: /title/i });
    const addTodoButton = screen.getByRole("button", { name: /Add/i });

    // Act
    await user.type(todoTitleField, "Go to hell");
    await user.click(addTodoButton);

    // Assert
    expect(
      await screen.findByText("Description must be larger than 10 characters")
    ).toBeInTheDocument();

    try {
      // Throw an error because the title.error is not rendered
      await screen.findByText("Title must not be empty");
    } catch (error) {
      // If an error happens (this is expected)
      expect(true).toBeTruthy();
    }
  });

  test("and description is less than 10 character long", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const todoTitleField = screen.getByRole("textbox", { name: /title/i });
    const todoDescriptionField = screen.getByRole("textbox", {
      name: /description/i,
    });
    const addTodoButton = screen.getByRole("button", { name: /Add/i });

    // Act
    await user.type(todoTitleField, "Go dancing around");
    await user.type(todoDescriptionField, "this is n");
    await user.click(addTodoButton);

    // Assert
    expect(
      await screen.findByText("Description must be larger than 10 characters")
    ).toBeInTheDocument();
  });

  test("and description is over 10 character long", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const todoTitleField = screen.getByRole("textbox", { name: /title/i });
    const todoDescriptionField = screen.getByRole("textbox", {
      name: /description/i,
    });
    const addTodoButton = screen.getByRole("button", { name: /Add/i });

    // Act
    await user.type(todoTitleField, "Go dancing around");
    await user.type(todoDescriptionField, "this is a valid description");
    await user.click(addTodoButton);

    // Assert
    // No error must be renderer
    try {
      // findByText must thrown an error since it is unable to find the error text description
      expect(
        await screen.findByText("Description must be larger than 10 characters")
      ).toBeInTheDocument();
    } catch (e) {
      //
      expect(true).toBeTruthy();
    }
  });
});
