import { Params } from "react-router-dom";
import { fetchTodo } from "../../Store/actions";

export async function todoLoader({ params }: { params: Params }) {
  if (params.todoId) {
    const todo = await fetchTodo(params.todoId);

    return { todo };
  }

  const todo = { id: 0, title: "", description: "" };
  return { todo };
}
