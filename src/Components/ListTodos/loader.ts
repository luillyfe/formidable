import tasks from "../../data/tasks.json";

import { Task } from "../../data/todo";

export async function todosLoader(): Promise<{ todos: Task[] }> {
  const todos = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description,
  }));

  return { todos };
}
