import { createTheme, ThemeOptions } from "@mui/material";

export const themeOptions: ThemeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff9800",
    },
    background: {
      default: "#0f0f0f",
    },
  },
  typography: {
    allVariants: {
      color: "white",
    },
  },
});
