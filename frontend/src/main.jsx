import { createRoot } from "react-dom/client";

import "./index.css";

import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import Routes from "./routes/index.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <Routes />
  </AuthContextProvider>
);
