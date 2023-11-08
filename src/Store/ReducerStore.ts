import { Task } from "./types";

export interface Store {
  todos: Task[];
}

interface Payload {
  todos?: Task[];
  todo?: Task;
}

export interface Action {
  type: string;
  payload?: Payload;
}

export default function reducerStore(state: Store, action: Action): Store {
  switch (action.type) {
    case "SET_TODOS": {
      const todos = action.payload?.todos || [];
      return { ...state, todos };
    }

    case "ADD_TODO": {
      const todo = action.payload?.todo;
      if (todo) {
        return { ...state, todos: [todo, ...state.todos] };
      }
      return state;
    }

    default: {
      return state;
    }
  }
}
