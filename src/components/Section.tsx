import { ReactNode } from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";

type Props = {
  name: string;
  displayText?: boolean;
  children?: ReactNode;
};

export default function Section({ name, displayText, children }: Props) {
  const theme = useTheme();
  function toTitleCase(str: string) {
    return str.replace(
      /\w\S*/g,
      (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
  }

  return (
    <Container
      id={name}
      maxWidth={false}
      sx={{
        backgroundColor: theme.palette.background.secondary,
        py: 5,
        display: "flex",
        justifyContent: "center",
        scrollMargin: "64px",
      }}
    >
      <Box maxWidth="xl" width="100%">
        {displayText && (
          <Typography variant="h2" mb={5}>
            {toTitleCase(name)}
          </Typography>
        )}
        {children}
      </Box>
    </Container>
  );
}
