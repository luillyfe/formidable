import { ReactNode, createContext, useContext, useState } from "react";

import Menu from "../../assets/bards4.svg?react";

const FlyOutContext = createContext({
  open: false,
  toggle: (open: boolean) => {
    open;
  },
});
export default function FlyOut({ children }: { children: ReactNode }) {
  const [open, toggle] = useState(false);

  return (
    <FlyOutContext.Provider value={{ open, toggle }}>
      {children}
    </FlyOutContext.Provider>
  );
}

function Toggle() {
  const { open, toggle } = useContext(FlyOutContext);
  return (
    <div
      className="mt-1 flex flex-row h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
      onClick={() => toggle(!open)}
    >
      <Menu />
    </div>
  );
}

function List({ children }: { children: ReactNode }) {
  const { open } = useContext(FlyOutContext);

  return open && <ul className="absolute inset-10">{children}</ul>;
}

function Item({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

FlyOut.Toggle = Toggle;
FlyOut.List = List;
FlyOut.Item = Item;
