import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage";
import AddTodoPage from "../Pages/AddTodoPage";

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
      },
    ],
  },
]);

export default router;
