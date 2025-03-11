import { ReactNode, useState } from "react";
import { Paper, Typography, Box, Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRightOutlined";
import { PrimaryLine } from "./";

interface Props {
  title: string;
  images: string[];
  imageSide: "left" | "right";
  children?: ReactNode;
}

export default function ProjectCard({
  title,
  images,
  imageSide,
  children,
}: Props) {
  const [imageIndex, setImageIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const fadeCss = `
    .img-fade-in {
      will-change: opacity;
      animation-name: fadeInOpacity;
      animation-duration: 400ms;
    }

    .img-fade-out {
      will-change: opacity;
      animation-name: fadeOutOpacity;
      animation-duration: 400ms;
    }

    @keyframes fadeInOpacity {
      0%   { opacity: 0; }
      100% { opacity: 1; }
    }

    @keyframes fadeOutOpacity {
      0%   { opacity: 1; }
      100% { opacity: 0; }
    }
  `;
  const buttonOutline = {
    filter:
      "drop-shadow(1px 0 0 black) drop-shadow(-1px 0 0 black) drop-shadow(0 1px 0 black) drop-shadow(0 -1px 0 black)",
  };
  function scrollImage(offset: number) {
    setFade(true);
    setTimeout(() => {
      setFade(false);
      setImageIndex((imageIndex) => {
        const newIndex = (imageIndex + offset) % images.length;
        return newIndex >= 0 ? newIndex : images.length - 1;
      });
    }, 300);
  }
  const imageComponent = (
    <Box display="flex" position="relative" width={{ xs: "100%", md: "60%" }}>
      <style>{fadeCss}</style>
      {images.length > 1 && (
        <Button
          onClick={() => scrollImage(-1)}
          color="secondary"
          // zIndex to display on a different rendering layer
          // means animation wont play on buttons
          sx={{ position: "absolute", height: "100%", zIndex: 1 }}
        >
          <ChevronLeftIcon fontSize="large" sx={buttonOutline} />
        </Button>
      )}
      <Box
        component="img"
        src={images[imageIndex]}
        className={fade ? "img-fade-out" : "img-fade-in"}
        sx={{
          width: "100%",
          height: { xs: "500px", md: "100%" },
          borderRadius: 1,
          objectFit: "cover",
        }}
      />
      {images.length > 1 && (
        <Button
          onClick={() => scrollImage(1)}
          color="secondary"
          sx={{
            position: "absolute",
            height: "100%",
            right: 0,
            zIndex: 1,
          }}
        >
          <ChevronRightIcon fontSize="large" sx={buttonOutline} />
        </Button>
      )}
    </Box>
  );

  return (
    <Paper elevation={8}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        height={{ md: "600px" }}
        // height="500px"
      >
        {imageSide === "left" && imageComponent}
        <Box p={4} width={{ xs: "100%", md: "40%" }}>
          <Box display="inline-flex" flexDirection="column">
            <Typography variant="h4">{title}</Typography>
            <PrimaryLine size={2} />
          </Box>
          <Typography sx={{ pt: 2 }}>{children}</Typography>
        </Box>
        {imageSide === "right" && imageComponent}
      </Box>
    </Paper>
  );
}
