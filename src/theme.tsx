import { createTheme, responsiveFontSizes } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypeBackground {
    secondary: string;
  }
}

let themeOptions = createTheme({
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
    fontFamily: "Roboto, Arial",
    allVariants: {
      color: "white",
    },
  },
});
themeOptions = responsiveFontSizes(themeOptions);
export default themeOptions;
