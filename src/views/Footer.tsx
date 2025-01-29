import { Box, Typography } from "@mui/material";
import { Section } from "../components";

export default function Footer() {
  return (
    <Section name="footer">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography color="white" mb={2}>
          A website designed & built by Nathan Long
        </Typography>
        <Typography color="white">
          Find the template for this website in{" "}
          <a
            href="https://github.com/Ebzonman/personal-website"
            target="_blank"
          >
            GitHub
          </a>
        </Typography>
      </Box>
    </Section>
  );
}
