import { Task } from "../data/todo";

export interface Store {
  todos: Task[];
}

interface Payload {
  todos: Task[];
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

    default: {
      return state;
    }
  }
}
