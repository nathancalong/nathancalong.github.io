import { ReactNode } from "react";
import SmallCapsText from "./SmallCapsText";
import styles from "./SkillCard.module.scss";

export interface Skill {
  label: string;
  icon?: ReactNode;
}

interface Props {
  icon: ReactNode;
  title: string;
  skills: Skill[];
  children: ReactNode;
}

export default function SkillCard({ icon, title, skills, children }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}>{icon}</div>
        <SmallCapsText as="h3" className={styles.cardTitle}>{title}</SmallCapsText><span className={styles.blinkingCursor}>_</span>
      </div>
      <ul className={styles.cardBody}>{children}</ul>
      <div className={styles.techStack}>
        <span className={styles.stackLabel}>tech_stack:</span>
        {skills.map((skill) => (
          <span key={skill.label} className={styles.chip}>
            {skill.icon ? (
              <span className={styles.chipIcon}>{skill.icon}</span>
            ) : (
              <span className={styles.chipPrompt}>&gt;</span>
            )}
            {skill.label}
          </span>
        ))}
      </div>
    </div>
  );
}
