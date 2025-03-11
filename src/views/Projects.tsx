import { Grid2 } from "@mui/material";
import { ProjectCard, Section } from "../components";

import Gaggiuino1 from "../assets/images/gaggiuino1.jpg";
import Gaggiuino2 from "../assets/images/gaggiuino2.jpg";
import Gaggiuino3 from "../assets/images/gaggiuino3.jpg";
import Gaggiuino4 from "../assets/images/gaggiuino4.jpg";

import Proxmox1 from "../assets/images/proxmox1.png";
import Proxmox2 from "../assets/images/proxmox2.png";

export default function Projects() {
  return (
    <Section name="projects" displayText>
      <Grid2 container spacing={4}>
        <Grid2 size={12}>
          <ProjectCard
            title="Smart Coffee Machine"
            images={[Gaggiuino1, Gaggiuino2, Gaggiuino3, Gaggiuino4]}
            imageSide="left"
          >
            <a
              href="https://gaggiuino.github.io/#/"
              target="_blank"
              style={{ color: "white" }}
            >
              Gaggiuino
            </a>{" "}
            adds closed loop control for pressure and temperature using
            inexpensive sensors to a cheap Gaggia coffee machine, allowing for
            the calculation and control of flow rate. Then, you can create,
            select and customize various brew profiles, which can be altered
            depending on the nature of the beans. This makes for some really
            tasty coffees! I 3D printed all the components myself, and also
            wired up the machine according to the diagrams available on the
            project webpage. Would highly recommend to any coffee enthusiasts.
          </ProjectCard>
        </Grid2>
        <Grid2 size={12}>
          <ProjectCard
            title="Proxmox Home Server"
            images={[Proxmox1, Proxmox2]}
            imageSide="right"
          >
            Using Proxmox, a few VMs and a whole bunch of LXCs, I maintain a
            home server with ~20 services. These range from DNS servers with
            content filtering, media hosting and playback tools, private VPN for
            secure access to said services from anywhere in the world, and much
            more. I have secured this using ACLs as well as firewalls, and
            monitoring on top to make sure all services are running well, and no
            unexpected visitors make their way into the system!
          </ProjectCard>
        </Grid2>
      </Grid2>
    </Section>
  );
}
