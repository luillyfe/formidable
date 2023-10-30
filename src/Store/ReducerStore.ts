import { Task } from "../data/todo";

export interface Store {
  todos: Task[];
}

interface Payload {
  todos: Task[];
}

interface Action {
  type: string;
  payload?: Payload;
}

export default function reducerStore(state: Store, action: Action): Store {
  switch (action.type) {
    case "LOAD_TODOS": {
      return state;
    }

    default: {
      return state;
    }
  }
}
