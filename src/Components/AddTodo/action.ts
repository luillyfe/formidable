import { redirect } from "react-router-dom";

export async function handleTodoSubmit({ request }: { request: Request }) {
  const formData = await request.formData();
  const entries = Object.fromEntries(formData);
  const todo = {
    id: Math.random() * 10000,
    title: String(entries.title),
    description: String(entries.description),
  };

  console.log(todo);
  return redirect("/");
}
