import { QueryClient } from "@tanstack/react-query";

import { fetchTodos } from "../../Store/actions";
import { Task } from "../../Store/types";

export function todosQuery() {
  return {
    queryKey: ["todos"],
    queryFn: fetchTodos,
    retry: 3,
    refetchOnWindowFocus: false,
  };
}

export function todosLoader(queryClient: QueryClient) {
  return async function (): Promise<{ todos: Task[] }> {
    const { queryKey, queryFn } = todosQuery();

    // It does the trick for returning any data we have in the cache, even if it's stale.
    // If the query does not exist, queryClient.fetchQuery will be called and its results returned.
    return await queryClient.ensureQueryData({ queryKey, queryFn });
  };
}

// TODO: remove loader
export async function todosLoader2(): Promise<{ todos: Task[] }> {
  const todos = await fetchTodos();

  return { todos };
}
