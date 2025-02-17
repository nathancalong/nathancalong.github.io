import Portrait from "../assets/images/portrait.jpg";
import { PrimaryLine } from "../components";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  alpha,
  Avatar,
  Container,
  Grid2,
  Typography,
  useTheme,
} from "@mui/material";

export default function Home() {
  const theme = useTheme();
  return (
    <Container
      id="home"
      maxWidth={false}
      sx={{
        mt: "64px",
        minHeight: 600,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid2
        container
        spacing={2}
        display="flex"
        direction={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid2 size="auto" display="flex" alignItems="center">
          <Avatar
            alt="Nathan Long"
            src={Portrait}
            sx={{ height: "12rem", width: "12rem" }}
          />
        </Grid2>
        <Grid2
          size="grow"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems={{ xs: "center", md: "flex-start" }}
          textAlign={{ xs: "center", md: "left" }}
        >
          <Typography
            variant="h1"
            bgcolor={alpha(theme.palette.background.default, 0.5)}
          >
            Nathan Long
          </Typography>
          <PrimaryLine size={5} />
          <Typography
            variant="h3"
            bgcolor={alpha(theme.palette.background.default, 0.5)}
          >
            Mechatronics Software Engineer
          </Typography>
          <Grid2>
            <a
              href="https://www.linkedin.com/in/nathan-ca-long/"
              target="_blank"
            >
              <LinkedInIcon htmlColor="white" />
            </a>
            <a href="https://github.com/nathancalong/" target="_blank">
              <GitHubIcon htmlColor="white" />
            </a>
          </Grid2>
        </Grid2>
      </Grid2>
    </Container>
  );
}
