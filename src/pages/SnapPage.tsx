import { Avatar, Box, Container, Typography } from "@mui/material";
import AwSnap from "../assets/images/awsnap.png";

export default function SnapPage() {
  return (
    <Container>
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
          sx={{ display: "inline-flex", width: "5em", height: "5em" }}
        />
        <Typography
          variant="h3"
          ml={4}
          sx={{ color: "black", display: "inline-flex" }}
        >
          You deleted the website...
        </Typography>
      </Box>
    </Container>
  );
}
