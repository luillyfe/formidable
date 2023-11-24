import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

import App from "../App";

import { todosLoader } from "../Components/ListTodos/loader";
import { handleTodoSubmit } from "../Components/AddTodo/action";
import { todoLoader } from "../Components/AddTodo/loader";

import HomePage from "../Pages/HomePage";
import AddTodoPage from "../Pages/AddTodoPage";

const queryClient = new QueryClient();
export function AppWithRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: App,
      children: [
        {
          path: "",
          Component: HomePage,
          loader: todosLoader(queryClient),
        },
        {
          path: "todos/new",
          Component: AddTodoPage,
          loader: todoLoader,
          action: handleTodoSubmit,
        },
        {
          path: "todos/:todoId/edit",
          Component: AddTodoPage,
          loader: todoLoader,
          action: handleTodoSubmit,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
