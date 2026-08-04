import { motion } from "framer-motion";
import { experience } from "../data/experience.js";
import SectionHeader from "./SectionHeader.jsx";
import SectionShell from "./SectionShell.jsx";
import { delayedFade, viewportOnce } from "../lib/motion.js";

export default function Experience() {
  return (
    <SectionShell id="experience" className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-32">
      <SectionHeader index="03" title="Experience" />

      <div className="space-y-20">
        {experience.map((job) => (
          <motion.article
            key={job.id}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-6 md:grid-cols-12"
          >
            <div className="md:col-span-4">
              <motion.p
                variants={delayedFade(0.55, 12)}
                className="font-mono text-xs tracking-widest text-accent"
              >
                {job.dates}
              </motion.p>
              <motion.h3
                variants={delayedFade(0)}
                className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl"
              >
                {job.org}
              </motion.h3>
              <motion.p variants={delayedFade(0.12, 16)} className="mt-1 text-sm text-muted">
                {job.role}
              </motion.p>
            </div>
            <ul className="space-y-4 md:col-span-7 md:col-start-6">
              {job.points.map((point, i) => (
                <motion.li
                  key={i}
                  variants={delayedFade(0.24 + i * 0.1)}
                  className="flex gap-4 leading-relaxed text-muted"
                >
                  <span aria-hidden className="mt-[11px] h-px w-6 shrink-0 bg-accent/70" />
                  {point}
                </motion.li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
