import React from "react";
import {
  Grid2,
  Paper,
  Typography,
  Chip,
  Box,
  SvgIconProps,
} from "@mui/material";

interface Props {
  Icon: React.ComponentType<SvgIconProps>;
  title: string;
  skills: string[];
  description: string;
}

export default function Skills({ Icon, title, skills, description }: Props) {
  return (
    <Grid2 size={{ md: 6 }}>
      <Paper elevation={8} sx={{ p: 4, height: "100%" }}>
        <Box display="flex" alignItems="center">
          <Icon fontSize="large" sx={{ display: "inline-flex", mx: 1 }} />
          <Typography variant="h4" sx={{ display: "inline-flex" }}>
            {title}
          </Typography>
        </Box>
        <Typography sx={{ py: 2 }}>{description}</Typography>
        <Grid2 container alignItems="center">
          <Grid2 size="auto">
            <Typography>Tech Stack:</Typography>
          </Grid2>
          <Grid2 size="grow">
            {skills.map((skill) => (
              <Chip label={skill} sx={{ m: 1 / 2 }} />
            ))}
          </Grid2>
        </Grid2>
      </Paper>
    </Grid2>
  );
}
