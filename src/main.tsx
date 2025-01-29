import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeOptions } from "./theme.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline />
    <ThemeProvider theme={themeOptions}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
