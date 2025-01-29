import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

const navBarItems = ["home", "skills", "projects", "terminal"];

export default function Navigation() {
  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h3">NL</Typography>
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
                    document
                      .getElementById(item)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
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
    </>
  );
}
