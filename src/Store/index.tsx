import { ReactNode, createContext, useReducer, Dispatch } from "react";

import reducerStore, { Action, Store } from "./ReducerStore";

// TODO: Must be an object not an array
const store: Store = {
  todos: [],
};

const dispatch: Dispatch<Action> = () => null;

export const StoreContext = createContext({ store, dispatch });

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducerStore, store);

  return (
    <StoreContext.Provider value={{ store: state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}
