import { Box, Container, Typography } from "@mui/material";

export default function Projects() {
  return (
    <>
      <Container
        id="projects"
        maxWidth={false}
        sx={{
          backgroundColor: "#0f0f0f",
          p: 5,
          height: 2000,
          display: "flex",
          justifyContent: "center",
          scrollMargin: "64px",
        }}
      >
        <Box maxWidth="xl" textAlign="left">
          <Typography variant="h2" mb={5}>
            Projects
          </Typography>
        </Box>
      </Container>
    </>
  );
}
