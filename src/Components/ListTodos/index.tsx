import { useState } from "react";

import { Task } from "../../data/todo";
import Todo from "../Todo";

export default function ListTodos({ todos: loadedTodos }: { todos: Task[] }) {
  const [todos] = useState(loadedTodos);

  return (
    <div className="relative">
      <div className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
          <div className="p-4">
            {todos.map((todo) => (
              <Todo
                title={todo.title}
                description={todo.description}
                id={todo.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
