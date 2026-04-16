import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./CMatrix.module.scss";

interface Props {
  onComplete: () => void;
  duration?: number;
}

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

export default function CMatrix({ onComplete, duration = 3000 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let columns: number[] = [];
    const fontSize = 14;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const colCount = Math.floor(canvas.width / fontSize);
      // Preserve existing drops, add new ones for any extra columns
      const newColumns = new Array(colCount).fill(0);
      for (let i = 0; i < Math.min(columns.length, colCount); i++) {
        newColumns[i] = columns[i];
      }
      columns = newColumns;
      // Randomize initial positions so it doesn't start as a flat line
      for (let i = 0; i < columns.length; i++) {
        if (columns[i] === 0) {
          columns[i] = Math.random() * -50;
        }
      }
    }

    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!ctx || !canvas) return;

      // Semi-transparent black to create trailing effect
      ctx.fillStyle = "rgba(10, 10, 15, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = columns[i] * fontSize;

        // Head of the column — bright amber
        ctx.fillStyle = "#E8943A";
        ctx.fillText(char, x, y);

        // Trail character slightly above — dimmer
        if (columns[i] > 1) {
          const trailChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx.fillStyle = "rgba(232, 148, 58, 0.4)";
          ctx.fillText(trailChar, x, y - fontSize);
        }

        // Further trail — very dim
        if (columns[i] > 3) {
          const trailChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx.fillStyle = "rgba(232, 148, 58, 0.15)";
          ctx.fillText(trailChar, x, y - fontSize * 3);
        }

        // Reset when off screen (with some randomness)
        if (y > canvas.height && Math.random() > 0.975) {
          columns[i] = 0;
        }

        columns[i]++;
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    // Start fade out before duration ends
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, duration - 800);

    // Signal complete after fade
    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
      window.removeEventListener("resize", resize);
    };
  }, [duration, onComplete]);

  return (
    <div className={cn(styles.matrix, fading && styles.fadeOut)}>
      <canvas ref={canvasRef} />
    </div>
  );
}
