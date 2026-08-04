import { motion } from "framer-motion";
import { about } from "../data/about.js";
import Magnetic from "./Magnetic.jsx";
import SectionHeader from "./SectionHeader.jsx";
import SectionShell from "./SectionShell.jsx";
import { chip, fadeUp, stagger, viewportOnce } from "../lib/motion.js";

function FileIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className={className}>
      <path d="M9.5 1.5h-5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V4.5l-3-3Z" strokeLinejoin="round" />
      <path d="M9.5 1.5v3h3" strokeLinejoin="round" />
      <path d="M5.5 8.5h5M5.5 11h5" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon({ className = "h-3 w-3" }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className={className}>
      <path d="M3 13 13 3M6 3h7v7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function About() {
  return (
    <SectionShell id="about" className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-32">
      <SectionHeader index="01" title="About" />

      <div className="grid gap-12 md:grid-cols-12">
        {/* Paragraphs reveal block-by-block, lead first */}
        <motion.div
          variants={stagger(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="space-y-6 md:col-span-7"
        >
          {about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className={`leading-relaxed ${
                i === 0 ? "text-xl text-ink md:text-2xl" : "text-base text-muted md:text-lg"
              }`}
            >
              {p}
            </motion.p>
          ))}

          {/* Resume button renders from config — an empty URL keeps it a
              muted placeholder, same pattern as the project GitHub buttons. */}
          <motion.div variants={fadeUp} className="pt-2">
            {about.resume?.url ? (
              <Magnetic>
                <a
                  href={about.resume.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 border border-line px-4 py-2.5 font-mono text-xs text-ink transition-colors hover:border-accent/60 hover:text-accent"
                >
                  <FileIcon /> {about.resume.label} <ArrowIcon />
                </a>
              </Magnetic>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex cursor-default select-none items-center gap-2.5 border border-line/60 px-4 py-2.5 font-mono text-xs text-faint"
              >
                <FileIcon /> {about.resume.label}
              </span>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          variants={stagger(0.06, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-wrap content-start gap-3 md:col-span-4 md:col-start-9"
        >
          {about.tags.map((tag) => (
            <motion.span
              key={tag}
              variants={chip}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="cursor-default rounded-full border border-line px-4 py-2 font-mono text-xs text-muted transition-colors hover:border-accent/60 hover:text-ink"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
}
