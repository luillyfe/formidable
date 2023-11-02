import React from "react";
import ReactDOM from "react-dom/client";

import { AppWithRouter } from "./Routes/index";

import "./index.css";
import { StoreProvider } from "./Store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <AppWithRouter />
    </StoreProvider>
  </React.StrictMode>
);
