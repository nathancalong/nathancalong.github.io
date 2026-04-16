import { ReactNode } from "react";
import styles from "./SkillCard.module.scss";

interface Props {
  icon: ReactNode;
  title: string;
  skills: string[];
  children: ReactNode;
}

export default function SkillCard({ icon, title, skills, children }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}>{icon}</div>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <p className={styles.cardBody}>{children}</p>
      <div className={styles.techStack}>
        <span className={styles.stackLabel}>tech_stack:</span>
        {skills.map((skill) => (
          <span key={skill} className={styles.chip}>
            &gt; {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
