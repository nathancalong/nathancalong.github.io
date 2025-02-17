import React, { ReactNode } from "react";
import {
  Grid2,
  Paper,
  Typography,
  Chip,
  Box,
  SvgIconProps,
  useTheme,
} from "@mui/material";

interface Props {
  Icon: React.ComponentType<SvgIconProps>;
  title: string;
  skills: string[];
  children: ReactNode;
}

export default function Skills({ Icon, title, skills, children }: Props) {
  const theme = useTheme();
  return (
    <Paper elevation={8} sx={{ p: 4, height: "100%" }}>
      <Box display="flex" alignItems="center">
        <Icon
          fontSize="large"
          sx={{
            display: "inline-flex",
            color: theme.palette.primary.main,
            mr: 1,
          }}
        />
        <Typography variant="h4" sx={{ display: "inline-flex" }}>
          {title}
        </Typography>
      </Box>
      <Typography sx={{ py: 2 }}>{children}</Typography>
      <Grid2 container alignItems="center">
        <Grid2 size="auto">
          <Typography>Tech Stack:</Typography>
        </Grid2>
        <Grid2 size="grow">
          {skills.map((skill) => (
            <Chip key={skill} label={skill} sx={{ m: 1 / 2 }} />
          ))}
        </Grid2>
      </Grid2>
    </Paper>
  );
}
