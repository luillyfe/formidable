import { redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addTodo } from "../../Store/actions";

export async function handleTodoSubmit({ request }: { request: Request }) {
  const formData = await request.formData();
  const entries = Object.fromEntries(formData);
  const todo = {
    id: uuidv4(),
    title: String(entries.title),
    description: String(entries.description),
  };

  await addTodo(todo);

  return redirect("/");
}
