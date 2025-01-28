import Portrait from "../assets/images/portrait.jpg";
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
      <Grid2 container spacing={2}>
        <Grid2 size="auto" display="flex" alignItems="center">
          <Avatar
            alt="Nathan Long"
            src={Portrait}
            sx={{ height: "10em", width: "10em" }}
          />
        </Grid2>
        <Grid2
          size="grow"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          textAlign="left"
        >
          <Typography variant="h1" bgcolor={alpha("#0f0f0f", 0.5)}>
            Nathan Long
          </Typography>
          <hr
            style={{
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.primary.main,
              height: 5,
              width: "100%",
            }}
          />
          <Typography variant="h3" bgcolor={alpha("#0f0f0f", 0.5)}>
            Mechatronics Software Engineer
          </Typography>
          <Grid2>
            <a
              href="https://www.linkedin.com/in/nathan-ca-long/"
              target="_blank"
            >
              <LinkedInIcon htmlColor="white" />
            </a>
            <a href="https://github.com/Ebzonman/" target="_blank">
              <GitHubIcon htmlColor="white" />
            </a>
          </Grid2>
        </Grid2>
      </Grid2>
    </Container>
  );
}
