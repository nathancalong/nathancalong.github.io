import { ReactNode, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import cn from "classnames";
import SmallCapsText from "./SmallCapsText";
import WindowChrome from "./WindowChrome";
import { useWindowContext } from "./WindowContext";
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

type CardState = "normal" | "minimized" | "closed" | "maximized";

export default function SkillCard({ icon, title, skills, children }: Props) {
  const [state, setState] = useState<CardState>("normal");
  const { registerClose, resetKey } = useWindowContext();

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
  const handleMaximize = useCallback(
    () => setState((s) => (s === "maximized" ? "normal" : "maximized")),
    [],
  );

  useEffect(() => {
    if (state !== "maximized") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setState("normal");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state]);

  const cardInner = (
    <>
      <WindowChrome
        title={title}
        onClose={handleClose}
        onMinimize={handleMinimize}
        onMaximize={handleMaximize}
      />
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <div className={styles.iconWrapper}>{icon}</div>
          <SmallCapsText as="h3" className={styles.cardTitle}>
            {title}
          </SmallCapsText>
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
    </>
  );

  if (state === "maximized") {
    return createPortal(
      <>
        <div className={styles.backdrop} onClick={handleMaximize} />
        <div className={cn(styles.card, styles.cardMaximized)}>
          {cardInner}
        </div>
      </>,
      document.body,
    );
  }

  return (
    <div
      className={cn(styles.card, {
        [styles.cardClosed]: state === "closed",
        [styles.cardMinimized]: state === "minimized",
      })}
    >
      {cardInner}
    </div>
  );
}
