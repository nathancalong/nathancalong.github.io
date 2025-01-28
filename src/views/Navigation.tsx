import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

const navBarItems = ["home", "skills", "projects"];

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
                    color: "#fff",
                    display: "inline-flex",
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
