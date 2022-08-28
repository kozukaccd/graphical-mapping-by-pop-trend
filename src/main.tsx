import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import RESASProvider from "~/hooks/useRESAS/useRESAS";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RESASProvider>
    <App />
  </RESASProvider>
);
