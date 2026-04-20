import { type ReactNode } from "react";
import cn from "classnames";
import SmallCapsText from "./SmallCapsText";
import styles from "./ProjectCard.module.scss";

interface Props {
  title: string;
  content: ReactNode;
  contentSide: "left" | "right";
  children?: ReactNode;
}

export default function ProjectCard({
  title,
  content,
  contentSide,
  children,
}: Props) {
  return (
    <div
      className={cn(
        styles.projectCard,
        contentSide === "right" && styles.reversed,
      )}
    >
      <div className={styles.contentSection}>{content}</div>

      <div className={styles.textSection}>
        <div className={styles.titleGroup}>
          <h3 className={styles.projectTitle}>
            <SmallCapsText>{title}</SmallCapsText>
            <span className={styles.blinkingCursor}>_</span>
          </h3>
          <div className={styles.accentLine} />
        </div>
        <div className={styles.projectBody}>{children}</div>
      </div>
    </div>
  );
}
