import { motion } from "framer-motion";
import { skillGroups } from "../data/skills.js";
import SectionHeader from "./SectionHeader.jsx";
import SectionShell from "./SectionShell.jsx";
import { chip, fadeUp, stagger, viewportOnce } from "../lib/motion.js";

export default function Skills() {
  return (
    <SectionShell id="skills" className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-32">
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
            {}
            <ul className="group/skills flex flex-wrap gap-x-6 gap-y-3 md:col-span-9">
              {group.items.map((item) => (
                <motion.li
                  key={item}
                  variants={chip}
                  whileTap={{ scale: 0.94 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="cursor-default font-display text-lg text-muted opacity-100 transition-[color,opacity] duration-200 hover:text-ink hover:opacity-100 active:text-accent group-hover/skills:opacity-40 md:text-xl"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
