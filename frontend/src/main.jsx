import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { setupInterceptors } from "./lib/axiosInterceptors.js";

import { BrowserRouter } from "react-router-dom";

setupInterceptors();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
