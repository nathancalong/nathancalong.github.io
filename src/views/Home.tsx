import Portrait from "../assets/images/portrait.jpg";
import { PrimaryLine } from "../components";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
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
  const buttonPadding = 8;
  return (
    <Container
      id="home"
      maxWidth={false}
      sx={{
        my: "64px",
        minHeight: "450px",
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
            sx={{ height: "14rem", width: "14rem" }}
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
              style={{ paddingRight: buttonPadding }}
            >
              <LinkedInIcon htmlColor="white" fontSize="large" />
            </a>
            <a
              href="https://github.com/nathancalong/"
              target="_blank"
              style={{ paddingRight: buttonPadding }}
            >
              <GitHubIcon htmlColor="white" fontSize="large" />
            </a>
            <a
              href="mailto:nathancalong@gmail.com"
              target="_blank"
              style={{ paddingRight: buttonPadding }}
            >
              <EmailIcon htmlColor="white" fontSize="large" />
            </a>
          </Grid2>
        </Grid2>
      </Grid2>
    </Container>
  );
}
