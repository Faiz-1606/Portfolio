import { motion } from "framer-motion";
import { heading, lineGrow, stagger, viewportOnce } from "../lib/motion.js";

export default function SectionHeader({ index, title }) {
  return (
    <motion.div
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="mb-14 flex items-baseline gap-4 md:mb-20"
    >
      <motion.span variants={heading} className="font-mono text-xs text-accent">
        {index}
      </motion.span>
      <motion.h2
        variants={heading}
        className="font-mono text-xs uppercase tracking-[0.25em] text-muted"
      >
        {title}
      </motion.h2>
      <motion.span
        variants={lineGrow}
        aria-hidden
        className="h-px flex-1 origin-left self-center bg-line"
      />
    </motion.div>
  );
}
