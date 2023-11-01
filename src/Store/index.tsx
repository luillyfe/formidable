import { ReactNode, Dispatch, createContext, useReducer } from "react";

import reducerStore, { Store, Action } from "./ReducerStore";

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
