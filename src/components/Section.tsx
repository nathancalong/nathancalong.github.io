import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks";
import styles from "./Section.module.scss";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  displayText?: boolean;
  children?: ReactNode;
};

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

export default function Section({ name, displayText, children }: Props) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id={name} className={styles.section}>
      <div
        ref={ref}
        className={cn(styles.sectionInner, "reveal", isVisible && "revealed")}
      >
        {displayText && (
          <h2 className={cn(styles.sectionTitle, "glow-text")}>
            {toTitleCase(name)}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
