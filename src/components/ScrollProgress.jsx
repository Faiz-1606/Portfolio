import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const smoothed = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.3 });

  return (
    <motion.span
      aria-hidden
      style={{ scaleX: reduceMotion ? scrollYProgress : smoothed }}
      className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left bg-accent"
    />
  );
}
