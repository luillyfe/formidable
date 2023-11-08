import { fetchTodos } from "../../Store/actions";
import { Task } from "../../Store/types";

export async function todosLoader(): Promise<{ todos: Task[] }> {
  const todos = await fetchTodos();

  return { todos };
}
