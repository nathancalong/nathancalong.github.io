import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";

const navBarItems = ["home", "skills", "projects", "terminal"];

export default function Navigation() {
  const theme = useTheme();

  function topFunction() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  function scrollToElement(item: string) {
    document
      .getElementById(item)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <AppBar
      position="sticky"
      sx={{ background: theme.palette.background.secondary }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box flexGrow={1} display="flex" justifyContent="flex-end">
            {navBarItems.map((item) => (
              <Button
                key={item}
                sx={{
                  display: "inline-flex",
                  color: "white",
                  textTransform: "capitilize",
                }}
                onClick={() =>
                  // Override behaviour for home
                  item == "home" ? topFunction() : scrollToElement(item)
                }
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
      <Box bgcolor="orange" flexGrow={1} height={2}></Box>
    </AppBar>
  );
}
