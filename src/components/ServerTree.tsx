import { type ReactNode } from "react";
// @ts-expect-error - no types for direct icon imports
import SiProxmox from "@icons-pack/react-simple-icons/icons/SiProxmox.mjs";
// @ts-expect-error - no types for direct icon imports
import SiJellyfin from "@icons-pack/react-simple-icons/icons/SiJellyfin.mjs";
// @ts-expect-error - no types for direct icon imports
import SiSonarr from "@icons-pack/react-simple-icons/icons/SiSonarr.mjs";
// @ts-expect-error - no types for direct icon imports
import SiRadarr from "@icons-pack/react-simple-icons/icons/SiRadarr.mjs";
// @ts-expect-error - no types for direct icon imports
import SiVaultwarden from "@icons-pack/react-simple-icons/icons/SiVaultwarden.mjs";
// @ts-expect-error - no types for direct icon imports
import SiN8n from "@icons-pack/react-simple-icons/icons/SiN8n.mjs";
// @ts-expect-error - no types for direct icon imports
import SiQbittorrent from "@icons-pack/react-simple-icons/icons/SiQbittorrent.mjs";
// @ts-expect-error - no types for direct icon imports
import SiPihole from "@icons-pack/react-simple-icons/icons/SiPihole.mjs";
// @ts-expect-error - no types for direct icon imports
import SiWireguard from "@icons-pack/react-simple-icons/icons/SiWireguard.mjs";
// @ts-expect-error - no types for direct icon imports
import SiNginx from "@icons-pack/react-simple-icons/icons/SiNginx.mjs";
import styles from "./ServerTree.module.scss";

interface Service {
  label: string;
  icon?: ReactNode;
}

interface Branch {
  label: string;
  services: Service[];
}

const branches: Branch[] = [
  {
    label: "Media",
    services: [
      { label: "Jellyfin", icon: <SiJellyfin size={18} /> },
      { label: "Jellyseerr" },
      { label: "Sonarr", icon: <SiSonarr size={18} /> },
      { label: "Radarr", icon: <SiRadarr size={18} /> },
      { label: "Prowlarr" },
    ],
  },
  {
    label: "Applications",
    services: [
      { label: "Vaultwarden", icon: <SiVaultwarden size={18} /> },
      { label: "n8n", icon: <SiN8n size={18} /> },
      { label: "qBittorrent", icon: <SiQbittorrent size={18} /> },
      { label: "PhotoPrism" },
    ],
  },
  {
    label: "Utilities",
    services: [
      { label: "Pi-hole", icon: <SiPihole size={18} /> },
      { label: "WireGuard", icon: <SiWireguard size={18} /> },
      { label: "Nginx", icon: <SiNginx size={18} /> },
    ],
  },
];

export default function ServerTree() {
  return (
    <div className={styles.tree}>
      {/* Root node centered above middle column */}
      <div className={styles.root}>
        <SiProxmox size={24} />
        <span>Proxmox VE</span>
      </div>
      <div className={styles.trunk} />

      {/* Horizontal line + branch connectors + content */}
      <div className={styles.hLine} />
      <div className={styles.branches}>
        {branches.map((branch) => (
          <div key={branch.label} className={styles.branch}>
            <div className={styles.branchConnector} />
            <div className={styles.branchLabel}>{branch.label}</div>
            <div className={styles.services}>
              {branch.services.map((service) => (
                <div key={service.label} className={styles.service}>
                  {service.icon ? (
                    <span className={styles.serviceIcon}>{service.icon}</span>
                  ) : (
                    <span className={styles.serviceIconFallback}>
                      {service.label[0]}
                    </span>
                  )}
                  <span className={styles.serviceLabel}>{service.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
