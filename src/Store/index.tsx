import { ReactNode, createContext, useReducer } from "react";

import reducerStore, { Store } from "./ReducerStore";

const store: Store = {
  todos: [],
};

export const StoreContext = createContext(store);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state] = useReducer(reducerStore, store);

  return (
    <StoreContext.Provider value={state}>{children}</StoreContext.Provider>
  );
}
