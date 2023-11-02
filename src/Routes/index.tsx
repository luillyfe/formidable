import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "../App";

import { todosLoader } from "../Components/ListTodos/loader";

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
          loader: todosLoader,
        },
        {
          path: "todos/new",
          Component: AddTodoPage,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
