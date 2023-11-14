import { Params, redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addTodo } from "../../Store/actions";
import { FormTodoErrors } from "../../Store/types";

export async function handleTodoSubmit({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) {
  // Form data
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const errors = {} as FormTodoErrors;

  // Form validation
  if (typeof title !== "string" || title.length == 0) {
    errors.title = "Title must not be empty";
  }

  if (typeof description !== "string" || description.length < 10) {
    errors.description = "Description must be larger than 10 characters";
  }

  // If errors return early
  if (Object.keys(errors).length) {
    return errors;
  }

  const todo = {
    id: params.todoId ? params.todoId : uuidv4(),
    title: String(title),
    description: String(description),
  };

  // Create the todo and redirect to home
  await addTodo(todo);
  return redirect("/");
}
