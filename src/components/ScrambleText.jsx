import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+<>/";

export default function ScrambleText({ text, className = "" }) {
  const [display, setDisplay] = useState(text);
  const timer = useRef(null);

  useEffect(() => {
    setDisplay(text);
    return () => clearInterval(timer.current);
  }, [text]);

  const scramble = () => {
    if (timer.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tick = 0;
    const ticks = 12;
    timer.current = setInterval(() => {
      tick += 1;
      if (tick >= ticks) {
        clearInterval(timer.current);
        timer.current = null;
        setDisplay(text);
        return;
      }
      const locked = Math.ceil((tick / ticks) * text.length);
      setDisplay(
        text
          .split("")
          .map((ch, i) =>
            i < locked || ch === " " ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
          .join("")
      );
    }, 28);
  };

  return (
    <span className={className} onMouseEnter={scramble}>
      {display}
    </span>
  );
}
