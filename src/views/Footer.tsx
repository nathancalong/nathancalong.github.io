import { Box, Typography } from "@mui/material";
import { Section, PrimaryLine } from "../components";

export default function Footer() {
  return (
    <Section name="footer">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography color="white">
          A website designed & built by Nathan Long
          <PrimaryLine size={2} />
        </Typography>
        <Typography color="white">
          Find the code for this website in{" "}
          <a
            href="https://github.com/nathancalong/nathancalong.github.io"
            target="_blank"
            style={{ color: "white" }}
          >
            GitHub
          </a>
        </Typography>
      </Box>
    </Section>
  );
}
