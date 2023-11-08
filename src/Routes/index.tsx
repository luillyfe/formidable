import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "../App";

import { todosLoader } from "../Components/ListTodos/loader";

import HomePage from "../Pages/HomePage";
import AddTodoPage from "../Pages/AddTodoPage";
import { handleTodoSubmit } from "../Components/AddTodo/action";

export function AppWithRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: App,
      children: [
        {
          path: "",
          Component: HomePage,
          loader: todosLoader,
        },
        {
          path: "todos/new",
          Component: AddTodoPage,
          loader: () => {
            const todo = { id: 0, title: "", description: "" };
            return { todo };
          },
          action: handleTodoSubmit,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
