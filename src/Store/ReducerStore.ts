import { Task } from "../data/todo";

export interface Store {
  todos: Task[];
}

interface Action {
  type: string;
}

export default function reducerStore(state: Store, action: Action): Store {
  switch (action.type) {
    case "getTodos":
      break;

    default:
      return state;
  }

  return state;
}
