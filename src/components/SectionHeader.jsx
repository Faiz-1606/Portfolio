import { motion } from "framer-motion";
import { lineGrow, maskRise, stagger, viewportOnce } from "../lib/motion.js";

export default function SectionHeader({ index, title }) {
  return (
    <motion.div
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="mb-10 flex items-baseline gap-4 md:mb-20"
    >
      <span className="inline-block overflow-hidden font-mono text-xs">
        <motion.span variants={maskRise} className="inline-block text-accent">
          {index}
        </motion.span>
      </span>
      <h2
        aria-label={title}
        className="overflow-hidden font-mono text-xs uppercase tracking-[0.25em] text-muted"
      >
        <motion.span variants={stagger(0.035)} aria-hidden className="inline-block whitespace-nowrap">
          {title.split("").map((ch, i) => (
            <motion.span key={i} variants={maskRise} className="inline-block">
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </motion.span>
      </h2>
      <motion.span
        variants={lineGrow}
        aria-hidden
        className="h-px flex-1 origin-left self-center bg-line"
      />
    </motion.div>
  );
}
