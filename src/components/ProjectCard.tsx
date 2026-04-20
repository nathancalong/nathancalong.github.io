import { type ReactNode, useState, useEffect, useCallback } from "react";
import cn from "classnames";
import SmallCapsText from "./SmallCapsText";
import WindowChrome from "./WindowChrome";
import { useWindowContext } from "./WindowContext";
import styles from "./ProjectCard.module.scss";

interface Props {
  title: string;
  content: ReactNode;
  contentSide: "left" | "right";
  children?: ReactNode;
}

type CardState = "normal" | "minimized" | "closed" | "maximized";

export default function ProjectCard({
  title,
  content,
  contentSide,
  children,
}: Props) {
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

  return (
    <>
      {state === "maximized" && (
        <div className={styles.backdrop} onClick={handleMaximize} />
      )}
      <div
        className={cn(styles.projectCard, {
          [styles.cardClosed]: state === "closed",
          [styles.cardMinimized]: state === "minimized",
          [styles.cardMaximized]: state === "maximized",
        })}
      >
        <WindowChrome
          title={title}
          onClose={handleClose}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
        />
        <div
          className={cn(
            styles.projectBody,
            contentSide === "right" && styles.reversed,
          )}
        >
          <div className={styles.contentSection}>{content}</div>
          <div className={styles.textSection}>
            <div className={styles.titleGroup}>
              <h3 className={styles.projectTitle}>
                <SmallCapsText>{title}</SmallCapsText>
              </h3>
              <div className={styles.accentLine} />
            </div>
            <div className={styles.projectDescription}>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
