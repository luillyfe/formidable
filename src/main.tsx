import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { AppWithRouter } from "./Routes/index";

import "./index.css";

export const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppWithRouter queryClient={queryClient} />
    </QueryClientProvider>
  </React.StrictMode>
);
