import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const DRIFT_DESKTOP = 56;
const DRIFT_MOBILE = 24;
const DESKTOP_QUERY = "(min-width: 768px)";

export default function SectionShell({ id, className, children }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const drift = useRef(window.matchMedia(DESKTOP_QUERY).matches ? DRIFT_DESKTOP : DRIFT_MOBILE);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const apply = () => {
      drift.current = mq.matches ? DRIFT_DESKTOP : DRIFT_MOBILE;
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const { scrollYProgress: enter } = useScroll({
    target: ref,
    offset: ["start end", "start 0.35"],
  });
  const { scrollYProgress: exit } = useScroll({
    target: ref,
    offset: ["end 0.6", "end start"],
  });

  const y = useTransform([enter, exit], ([e, x]) => (1 - e) * drift.current + x * -40);
  const scale = useTransform(exit, [0, 1], [1, 0.988]);

  return (
    
    <section ref={ref} id={id} className={`relative ${className}`}>
      <motion.div style={reduceMotion ? undefined : { y, scale }}>{children}</motion.div>
    </section>
  );
}
