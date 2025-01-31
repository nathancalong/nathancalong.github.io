import { createTheme, ThemeOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypeBackground {
    secondary: string;
  }
}

export const themeOptions: ThemeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff9800",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#0f0f0f",
      secondary: "#151515",
    },
  },
  typography: {
    allVariants: {
      color: "white",
    },
  },
});
