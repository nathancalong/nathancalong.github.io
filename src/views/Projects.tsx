import { ProjectCard, Section } from "@/components";
import ServerTree from "@/components/ServerTree";
import BrewDiagram from "@/components/BrewDiagram";

export default function Projects() {
  return (
    <Section name="projects" displayText>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <ProjectCard
          title="Smart Coffee Machine"
          content={<BrewDiagram />}
          contentSide="left"
        >
          <a
            href="https://gaggiuino.github.io/#/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gaggiuino
          </a>{" "}
          adds closed loop control for pressure and temperature using
          inexpensive sensors to a cheap Gaggia coffee machine, allowing for the
          calculation and control of flow rate. Then, you can create, select and
          customize various brew profiles, which can be altered depending on the
          nature of the beans. This makes for some really tasty coffees! I 3D
          printed all the components myself, and also wired up the machine
          according to the diagrams available on the project webpage. Would
          highly recommend to any coffee enthusiasts.
        </ProjectCard>

        <ProjectCard
          title="Proxmox Homelab"
          content={<ServerTree />}
          contentSide="right"
        >
          Using Proxmox, a few VMs and a whole bunch of LXCs, I maintain a home
          server with ~20 services. These range from DNS servers with content
          filtering, media hosting and playback tools, private VPN for secure
          access to said services from anywhere in the world, and much more. I
          have secured this using ACLs as well as firewalls, and monitoring on
          top to make sure all services are running well, and no unexpected
          visitors make their way into the system!
        </ProjectCard>
      </div>
    </Section>
  );
}
