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
            title="Smart Coffee Machine"
            images={[Gaggiuino1, Gaggiuino2, Gaggiuino3]}
            imageSide="left"
          >
            <a
              href="https://gaggiuino.github.io/#/"
              target="_blank"
              style={{ color: "white" }}
            >
              Gaggiuino
            </a>{" "}
            adds pressure and temperature sensors to a cheap Gaggia coffee
            machine, allowing for the calculation of flow rate. Then, coffee can
            be brewed automatically with specific brew profiles, which can be
            edited in before each brew depending on the coffee. This makes for
            some really tasty coffees! I 3D printed all the components myself,
            and also wired up the machine according to the diagrams available on
            the project webpage.
          </ProjectCard>
        </Grid2>
        <Grid2 size={12}>
          <ProjectCard
            title="Proxmox Home Server"
            images={[Proxmox3]}
            imageSide="right"
          >
            Using Proxmox, a few VMs and a whole bunch of LXCs, I maintain a
            home server with ~20 services. These range from DNS servers with
            content filtering, media players, private VPN for access to services
            from anywhere, and more. I have secured this using ACLs as well as
            firewalls, and monitoring on top to make sure all services are
            running well, and no unexpected visitors make their way into the
            system!
          </ProjectCard>
        </Grid2>
      </Grid2>
    </Section>
  );
}
