import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "../App";

import { handleTodoSubmit } from "../Components/AddTodo/action";
import { todoLoader } from "../Components/AddTodo/loader";

import HomePage from "../Pages/HomePage";
import AddTodoPage from "../Pages/AddTodoPage";

export function AppWithRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: App,
      children: [
        {
          path: "",
          Component: HomePage,
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
