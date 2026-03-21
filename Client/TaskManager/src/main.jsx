import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

// Custom SW register — push event handle
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      // vite-plugin-pwa SW unregister
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        await reg.unregister();
      }
      // Custom SW register
      const reg = await navigator.serviceWorker.register("/sw.js");
      console.log("Custom SW registered:", reg);
    } catch (err) {
      console.log("SW error:", err);
    }
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
