import { useState, useEffect, useCallback, type ReactNode } from "react";
import cn from "classnames";
import { Section } from "@/components";
import SmallCapsText from "@/components/SmallCapsText";
import WindowChrome from "@/components/WindowChrome";
import { useWindowContext } from "@/components/WindowContext";
import ServerTree from "@/components/ServerTree";
import BrewDiagram from "@/components/BrewDiagram";
import styles from "./Projects.module.scss";

interface Project {
  id: string;
  title: string;
  content: ReactNode;
  contentSide: "left" | "right";
  description: ReactNode;
}

const projects: Project[] = [
  {
    id: "gaggiuino",
    title: "Smart Coffee Machine",
    content: <BrewDiagram />,
    contentSide: "left",
    description: (
      <>
        <a
          href="https://gaggiuino.github.io/#/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gaggiuino
        </a>{" "}
        adds closed loop control for pressure and temperature using inexpensive
        sensors to a cheap Gaggia coffee machine, allowing for the calculation
        and control of flow rate. Then, you can create, select and customize
        various brew profiles, which can be altered depending on the nature of
        the beans. This makes for some really tasty coffees! I 3D printed all
        the components myself, and also wired up the machine according to the
        diagrams available on the project webpage. Would highly recommend to any
        coffee enthusiasts.
      </>
    ),
  },
  {
    id: "proxmox",
    title: "Proxmox Homelab",
    content: <ServerTree />,
    contentSide: "right",
    description: (
      <>
        Using Proxmox, a few VMs and a whole bunch of LXCs, I maintain a home
        server with ~20 services. These range from DNS servers with content
        filtering, media hosting and playback tools, private VPN for secure
        access to said services from anywhere in the world, and much more. I
        have secured this using ACLs as well as firewalls, and monitoring on top
        to make sure all services are running well, and no unexpected visitors
        make their way into the system!
      </>
    ),
  },
];

type WindowState = "normal" | "minimized" | "closed";

export default function Projects() {
  const [activeTab, setActiveTab] = useState(0);
  const [state, setState] = useState<WindowState>("normal");
  const { registerClose, resetKey } = useWindowContext();
  const project = projects[activeTab];

  useEffect(() => {
    setState("normal");
  }, [resetKey]);

  const handleClose = useCallback(() => {
    setState("closed");
    registerClose();
  }, [registerClose]);

  const handleMinimize = useCallback(
    () => setState((s) => (s === "minimized" ? "normal" : "minimized")),
    [],
  );

  return (
    <Section name="projects" displayText>
      <div
        className={cn(styles.projectWindow, {
          [styles.windowClosed]: state === "closed",
          [styles.windowMinimized]: state === "minimized",
        })}
      >
        <WindowChrome
          title="projects"
          onClose={handleClose}
          onMinimize={handleMinimize}
        />

        <div className={styles.tabBar}>
          {projects.map((p, i) => (
            <button
              key={p.id}
              className={cn(styles.tab, i === activeTab && styles.tabActive)}
              onClick={() => setActiveTab(i)}
            >
              {p.title.toLowerCase().replace(/\s+/g, "_")}
            </button>
          ))}
        </div>

        <div
          className={cn(
            styles.content,
            project.contentSide === "right" && styles.reversed,
          )}
        >
          <div className={styles.diagramSection}>{project.content}</div>
          <div className={styles.textSection}>
            <div className={styles.titleGroup}>
              <h3 className={styles.projectTitle}>
                <SmallCapsText>{project.title}</SmallCapsText>
              </h3>
              <div className={styles.accentLine} />
            </div>
            <div className={styles.projectDescription}>
              {project.description}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
