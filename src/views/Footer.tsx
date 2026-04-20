import { Mail } from "lucide-react";
// @ts-expect-error - no types for direct icon imports
import SiGithub from "@icons-pack/react-simple-icons/icons/SiGithub.mjs";
import { Section } from "@/components";
import styles from "./Footer.module.scss";

function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const ASCII_CONTACT = `   _____ ____  _   _ _______       _____ _______   __  __ ______ 
  / ____/ __ \\| \\ | |__   __|/\\   / ____|__   __| |  \\/  |  ____|
 | |   | |  | |  \\| |  | |  /  \\ | |       | |    | \\  / | |__
 | |   | |  | | . \` |  | | / /\\ \\| |       | |    | |\\/| |  __|  
 | |___| |__| | |\\  |  | |/ ____ \\ |____   | |    | |  | | |____ 
  \\_____\\____/|_| \\_|  |_/_/    \\_\\_____|  |_|    |_|  |_|______|
`;

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nathancalong/",
    icon: <LinkedInIcon size={20} />,
  },
  {
    label: "GitHub",
    href: "https://github.com/nathancalong/",
    icon: <SiGithub size={20} />,
  },
  {
    label: "Email",
    href: "mailto:nathancalong@gmail.com",
    icon: <Mail size={20} />,
  },
];

export default function Footer() {
  return (
    <Section name="contact">
      <div className={styles.contact}>
        <div className={styles.contactLeft}>
          <pre className={styles.ascii}>{ASCII_CONTACT}</pre>
          <p className={styles.blurb}>
            I'd love to hear about any opportunities and how I could help. Feel
            free to reach out through any of the links.
          </p>
        </div>

        <div className={styles.contactRight}>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              {s.icon}
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      <p className={styles.tagline}>
        You might forget me, but you won't forget what I built.
      </p>
    </Section>
  );
}
