import { Grid2 } from "@mui/material";
import { ProjectCard, Section } from "../components";

import Gaggiuino1 from "../assets/images/gaggiuino1.jpg";
import Gaggiuino2 from "../assets/images/gaggiuino2.jpg";
import Gaggiuino3 from "../assets/images/gaggiuino3.jpg";

import Proxmox3 from "../assets/images/proxmox3.png";

export default function Projects() {
  return (
    <Section name="projects" displayText>
      <Grid2 container spacing={4}>
        <Grid2 size={12}>
          <ProjectCard
            title="Gaggiuino - Smart Coffee Machine"
            description="Testing"
            images={[Gaggiuino1, Gaggiuino2, Gaggiuino3]}
            imageSide="left"
          />
        </Grid2>
        <Grid2 size={12}>
          <ProjectCard
            title="Proxmox Home Server"
            description="Testing"
            images={[Proxmox3]}
            imageSide="right"
          />
        </Grid2>
      </Grid2>
    </Section>
  );
}
