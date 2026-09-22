// src/main.jsx
// The entry point. This is where the React app is mounted onto the
// index.html page, and where the whole app is wrapped in <BrowserRouter>
// so that every component inside <App /> can use React Router.

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
