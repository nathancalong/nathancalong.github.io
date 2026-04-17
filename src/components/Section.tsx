import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks";
import SmallCapsText from "./SmallCapsText";
import styles from "./Section.module.scss";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  displayText?: boolean;
  children?: ReactNode;
};

export default function Section({ name, displayText, children }: Props) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id={name} className={styles.section}>
      <div
        ref={ref}
        className={cn(styles.sectionInner, "reveal", isVisible && "revealed")}
      >
        {displayText && (
          <SmallCapsText
            as="h2"
            className={cn(styles.sectionTitle, "glow-text")}
          >
            {name}
          </SmallCapsText>
        )}
        {children}
      </div>
    </section>
  );
}
