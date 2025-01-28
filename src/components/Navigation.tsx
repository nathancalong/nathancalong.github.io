import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
// import "../assets/styles/Navigation.css";

export default function Navigation() {
  // const scrollToSection = (section: string) => {
  //   const expertiseElement = ;
  //   if (expertiseElement) {
  //     expertiseElement.scrollIntoView();
  //     console.log("Scrolling to:", expertiseElement); // Debugging: Ensure the element is found
  //   } else {
  //     console.error('Element with id "' + section + '" not found'); // Debugging: Log error if element is not found
  //   }
  // };

  const navBarItems = ["home", "skills", "projects"];

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Box
            display="flex"
            justifyContent="flex-end"
            bgcolor="black"
            sx={{ width: 340 }}
          >
            {navBarItems.map((item) => (
              <Button
                sx={{
                  display: "flex",
                  color: "#fff",
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
      </AppBar>
    </>
  );
}
