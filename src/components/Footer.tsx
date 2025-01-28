import { Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "#0f0f0f",
        p: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography color="white" my={2}>
        A website designed & built by Nathan Long
      </Typography>
      <Typography color="white">
        Find the template for this website in{" "}
        <a href="https://github.com/Ebzonman/personal-website" target="_blank">
          GitHub
        </a>
      </Typography>
    </Container>
  );
}
