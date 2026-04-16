import { useEffect, useState } from "react";

export function useTypingEffect(text: string, speed = 80, delay = 300) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const startTyping = () => {
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, speed);

      return interval;
    };

    timeout = setTimeout(() => {
      const interval = startTyping();
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayedText, isComplete };
}
