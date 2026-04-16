import { ReactNode, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./ProjectCard.module.scss";

interface Props {
  title: string;
  images: string[];
  imageSide: "left" | "right";
  children?: ReactNode;
}

export default function ProjectCard({
  title,
  images,
  imageSide,
  children,
}: Props) {
  const [imageIndex, setImageIndex] = useState(0);
  const [fade, setFade] = useState(false);

  function scrollImage(offset: number) {
    setFade(true);
    setTimeout(() => {
      setFade(false);
      setImageIndex((prev) => {
        const newIndex = (prev + offset) % images.length;
        return newIndex >= 0 ? newIndex : images.length - 1;
      });
    }, 300);
  }

  return (
    <div
      className={cn(
        styles.projectCard,
        imageSide === "right" && styles.reversed
      )}
    >
      <div className={styles.imageSection}>
        <img
          src={images[imageIndex]}
          alt={title}
          className={cn(styles.image, fade && styles.fadeOut)}
        />
        {images.length > 1 && (
          <>
            <button
              className={styles.carouselBtn}
              style={{ left: 0 }}
              onClick={() => scrollImage(-1)}
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              className={styles.carouselBtn}
              style={{ right: 0 }}
              onClick={() => scrollImage(1)}
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
            <div className={styles.imageDots}>
              {images.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    styles.dot,
                    i === imageIndex && styles.activeDot
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className={styles.textSection}>
        <div>
          <h3 className={styles.projectTitle}>
            {title}
            <span className={styles.blinkingCursor}>_</span>
          </h3>
          <div className={styles.accentLine} />
        </div>
        <div className={styles.projectBody}>{children}</div>
      </div>
    </div>
  );
}
