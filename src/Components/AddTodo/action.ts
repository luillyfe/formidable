import { Dispatch } from "react";
import { Action } from "../../Store/ReducerStore";
import { redirect } from "react-router-dom";

export function handleTodoSubmit(dispatch: Dispatch<Action>) {
  return async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const entries = Object.fromEntries(formData);
    const todo = {
      id: Math.random() * 10000,
      title: String(entries.title),
      description: String(entries.description),
    };

    dispatch({ type: "ADD_TODO", payload: { todo } });
    return redirect("/");
  };
}
