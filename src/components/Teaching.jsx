import { motion } from "framer-motion";
import { teaching } from "../data/teaching.js";
import SectionHeader from "./SectionHeader.jsx";
import { fadeUp, stagger, viewportOnce } from "../lib/motion.js";

export default function Teaching() {
  return (
    <section id="teaching" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeader index="05" title="Teaching" />

      <div className="grid gap-12 md:grid-cols-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="md:col-span-5"
        >
          <h3 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {teaching.org}
          </h3>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-accent">
            {teaching.role}
          </p>
          <p className="mt-6 leading-relaxed text-muted">{teaching.summary}</p>
        </motion.div>

        <motion.ul
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="space-y-8 md:col-span-6 md:col-start-7"
        >
          {teaching.curriculum.map((item, i) => (
            <motion.li key={item.title} variants={fadeUp} className="flex gap-5">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <div>
                <h4 className="font-display text-lg font-medium">{item.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.detail}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
