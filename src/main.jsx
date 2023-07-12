import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AuthMedProvider } from "./context/AuthMedContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AuthMedProvider>
        <App />
      </AuthMedProvider>
    </AuthProvider>
  </React.StrictMode>
);
