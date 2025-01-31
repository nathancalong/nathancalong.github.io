import { useState } from "react";
import { Paper, Typography, Box, Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRightOutlined";
import { PrimaryLine } from "./";
import "./ProjectCard.styles.css";

interface Props {
  title: string;
  description: string;
  images: string[];
  imageSide: "left" | "right";
}

export default function ProjectCard({
  title,
  description,
  images,
  imageSide,
}: Props) {
  const [imageIndex, setImageIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const imageComponent = (
    <Box display="flex" position="relative" width="50%">
      <Button
        onClick={() => scrollImage(-1)}
        color="secondary"
        sx={{ position: "absolute", height: "100%" }}
      >
        <ChevronLeftIcon fontSize="large" />
      </Button>
      <Box
        component="img"
        src={images[imageIndex]}
        className={fade ? "fade-out" : "fade-in"}
        sx={{
          width: "100%",
          height: "400px",
          borderRadius: 1,
          objectFit: "cover",
        }}
      />
      <Button
        onClick={() => scrollImage(1)}
        color="secondary"
        sx={{
          position: "absolute",
          height: "100%",
          right: 0,
        }}
      >
        <ChevronRightIcon fontSize="large" />
      </Button>
    </Box>
  );
  function scrollImage(offset: number) {
    setFade(true);
    setTimeout(() => {
      setFade(false);
      setImageIndex((imageIndex) => {
        const newIndex = (imageIndex + offset) % images.length;
        return newIndex >= 0 ? newIndex : images.length - 1;
      });
    }, 350);
  }

  return (
    <Paper elevation={8}>
      <Box display="flex">
        {imageSide === "left" && imageComponent}
        <Box p={4} width="50%">
          <Box display="inline-flex" flexDirection="column">
            <Typography variant="h4">{title}</Typography>
            <PrimaryLine size={2} />
          </Box>
          <Typography sx={{ py: 2 }}>{description}</Typography>
        </Box>
        {imageSide === "right" && imageComponent}
      </Box>
    </Paper>
  );
}
