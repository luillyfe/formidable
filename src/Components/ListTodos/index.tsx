import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Todo from "../Todo";
import { fetchTodos } from "../../Store/actions";

export default function ListTodos() {
  const navigate = useNavigate();
  const {
    isError,
    isPending,
    data: todos,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    navigate("/todos/new");
  }

  if (isPending) {
    return <span>Loading todos...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

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
                key={todo.id}
              />
            ))}
          </div>
        </div>
        <div className="h-10 transform -rotate-90 mt-3">
          <button
            className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-500 border-indigo-500 hover:border-indigo-700 text-sm border-4 text-white font-semibold py-1 px-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="button"
            onClick={handleClick}
          >
            New
          </button>
        </div>
      </div>
    </div>
  );
}
