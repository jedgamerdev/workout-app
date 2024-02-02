import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WorkoutsContext } from "./context/WorkoutsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WorkoutsContext>
      <App />
    </WorkoutsContext>
  </React.StrictMode>
);
