import { motion } from "framer-motion";
import { skillGroups } from "../data/skills.js";
import SectionHeader from "./SectionHeader.jsx";
import { chip, fadeUp, stagger, viewportOnce } from "../lib/motion.js";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeader index="04" title="Skills" />

      <div className="space-y-12">
        {skillGroups.map((group) => (
        
          <motion.div
            key={group.label}
            variants={stagger(0.04)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-4 border-t border-line pt-8 md:grid-cols-12"
          >
            <motion.h3
              variants={fadeUp}
              className="font-mono text-xs uppercase tracking-[0.25em] text-accent md:col-span-3"
            >
              {group.label}
            </motion.h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 md:col-span-9">
              {group.items.map((item) => (
                <motion.li
                  key={item}
                  variants={chip}
                  className="font-display text-lg text-muted transition-colors hover:text-ink md:text-xl"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
