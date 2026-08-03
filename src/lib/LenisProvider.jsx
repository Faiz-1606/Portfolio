import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

const LenisContext = createContext(null);

// Smooth scrolling is skipped entirely on touch devices and for users who
// prefer reduced motion — native scrolling wins in both cases.
function shouldEnableLenis() {
  if (typeof window === "undefined") return false;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return !coarse && !reduced;
}

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!shouldEnableLenis()) return;

    const instance = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    function raf(time) {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);
    setLenis(instance);

    return () => {
      cancelAnimationFrame(rafRef.current);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

// Anchor navigation that routes through Lenis when active, native otherwise.
export function useScrollTo() {
  const lenis = useContext(LenisContext);
  return (target) => {
    if (lenis) {
      lenis.scrollTo(target, { offset: -72, duration: 1.2 });
    } else {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
}
