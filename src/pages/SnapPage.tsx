import { Avatar, Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AwSnap from "../assets/images/awsnap.png";

export default function SnapPage() {
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          maxWidth="xl"
          p={5}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            alt="Aw Snap"
            variant="square"
            src={AwSnap}
            sx={{ display: "inline-flex", width: "4em", height: "4em" }}
          />
          <Typography
            variant="h4"
            ml={4}
            sx={{ color: "black", display: "inline-flex" }}
          >
            Aw Snap! You deleted the website...
          </Typography>
        </Box>
        <Typography sx={{ color: "black" }}>
          Just joking! Click <Link to="/">here</Link> to return home.
        </Typography>
      </Box>
    </Container>
  );
}
