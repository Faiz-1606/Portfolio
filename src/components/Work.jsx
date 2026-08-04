import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects } from "../data/projects";
import Magnetic from "./Magnetic.jsx";
import SectionHeader from "./SectionHeader.jsx";
import SectionShell from "./SectionShell.jsx";
import { useThemeAsset } from "../lib/ThemeProvider.jsx";
import {
  chip,
  fade,
  fadeUp,
  heading,
  imgScale,
  panelFade,
  panelIn,
  stagger,
  viewportOnce,
} from "../lib/motion.js";

function GitHubIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className={className}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

function ArrowIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className={className}>
      <path d="M3 13 13 3M6 3h7v7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProjectLinks({ project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      {project.github ? (
        <Magnetic>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 border border-line px-4 py-2.5 font-mono text-xs text-ink transition-colors hover:border-accent/60 hover:text-accent"
          >
            <GitHubIcon /> GitHub  <ArrowIcon className="h-3 w-3" />
          </a>
        </Magnetic>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex cursor-default select-none items-center gap-2.5 border border-line/60 px-4 py-2.5 font-mono text-xs text-faint"
        >
          <GitHubIcon /> GitHub 
        </span>
      )}
      {project.live && (
        <Magnetic>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 border border-line px-4 py-2.5 font-mono text-xs text-ink transition-colors hover:border-accent/60 hover:text-accent"
          >
            Live demo <ArrowIcon className="h-3 w-3" />
          </a>
        </Magnetic>
      )}
    </div>
  );
}

const STEP_MS = 800;

function DiagramFlow({ steps, running = true }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (!running || reduceMotion || steps.length === 0) {
      setActive(-1);
      return undefined;
    }
    let tick = 0;
    const id = setInterval(() => {
      if (tick >= steps.length) {
        clearInterval(id);
        setActive(-1);
        return;
      }
      setActive(tick);
      tick += 1;
    }, STEP_MS);
    return () => clearInterval(id);
  }, [running, reduceMotion, steps.length]);

  return (
    <div className="flex flex-wrap items-center gap-y-2 font-mono text-[11px] leading-none">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center">
          <span
            className={`rounded-sm border px-2.5 py-2 transition-colors duration-500 ${
              active === i
                ? "border-accent/70 bg-accent/10 text-ink"
                : "border-line bg-bg text-ink/90"
            }`}
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <span
              className={`px-1.5 transition-colors duration-500 ${
                active === i ? "text-accent" : "text-accent/40"
              }`}
            >
              →
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

function ProjectPanel({ project, showLabel = true, diagramRunning = true }) {
  const themedAsset = useThemeAsset();
  const thumbnail = themedAsset(project.thumbnail);

  return (
    <div className="border border-line bg-panel p-6 md:p-7">
      {/* The accordion supplies its own label, so it suppresses this one. */}
      {showLabel && (
        <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
          Engineering notes
        </p>
      )}

      {thumbnail && (
        <div className="mb-5 overflow-hidden border border-line">
          <motion.img
            variants={imgScale}
            src={thumbnail}
            alt={`${project.title} preview`}
            className="w-full"
            loading="lazy"
          />
        </div>
      )}

      {project.architectureDiagram?.length > 0 && (
        <div className="mb-6">
          <DiagramFlow steps={project.architectureDiagram} running={diagramRunning} />
        </div>
      )}

      <ul className="space-y-3">
        {project.notes.map((note, i) => (
          <li key={i} className="flex gap-3 text-[13px] leading-relaxed text-muted">
            <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
            {note}
          </li>
        ))}
      </ul>

      {project.gallery?.length > 0 && (
        <div className="mt-6 flex gap-2 overflow-x-auto">
          {project.gallery.map((src, i) => (
            <img
              key={i}
              src={themedAsset(src)}
              alt={`${project.title} — ${i + 1}`}
              className="h-20 w-auto shrink-0 border border-line object-cover transition-transform duration-300 hover:scale-[1.03]"
              loading="lazy"
            />
          ))}
        </div>
      )}
    </div>
  );
}

function NotesStub({ count }) {
  return (
    <div className="border border-dashed border-line/70 bg-panel/30 p-6 transition-colors duration-300 group-hover/project:border-line md:p-7">
      <p className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-faint/70 transition-colors duration-300 group-hover/project:text-accent">
        Engineering notes
        <span aria-hidden className="text-sm leading-none">
          +
        </span>
      </p>
      <p className="mt-4 font-mono text-[11px] text-faint/50">
        
      </p>
    </div>
  );
}

function ChevronIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className={className}>
      <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NotesAccordion({ project }) {
  const [open, setOpen] = useState(false);
  const panelId = `notes-${project.id}`;

  return (
    <div className="border-t border-line">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex min-h-[44px] w-full items-center justify-between gap-4 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-accent transition-colors active:text-ink"
      >
        Engineering notes
        <ChevronIcon
          className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* grid-rows 0fr→1fr expands to the content's natural height with no
          JS measurement, so an interrupted toggle can't strand a stale one. */}
      <div
        id={panelId}
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div className="pb-4">
            <ProjectPanel project={project} showLabel={false} diagramRunning={open} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ project, canHover }) {
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const hoverVariants = reduceMotion ? panelFade : panelIn;

  return (
    <article
      className="group/project relative border-t border-line"
      onMouseEnter={() => canHover && setHovered(true)}
      onMouseLeave={() => canHover && setHovered(false)}
    >
      {}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        aria-hidden
        className="text-ghost pointer-events-none absolute -left-[0.12em] top-6 select-none font-display text-[clamp(9rem,22vw,20rem)] font-bold leading-none"
      >
        {project.number}
      </motion.span>

      <div className="relative mx-auto grid min-h-[70vh] max-w-6xl items-center gap-10 px-5 py-20 md:px-8 lg:min-h-[88vh] lg:grid-cols-12 lg:py-24">
        {}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="lg:col-span-6"
        >
          <motion.p variants={fadeUp} className="mb-4 flex items-baseline gap-4 font-mono">
            <span className="text-sm text-accent">{project.number}</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-faint">
              {project.domain}
            </span>
          </motion.p>

          <motion.h3
            variants={heading}
            className="font-display text-4xl font-semibold tracking-tight transition-colors duration-300 md:text-6xl lg:group-hover/project:text-accent"
          >
            {/* Stretched link: the ::after covers the whole row, so anywhere in
                it opens the repo — and the row inherits the pointer cursor,
                which is what signals the row is live in the first place. */}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="after:absolute after:inset-0 after:z-[1] after:content-['']"
              >
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </motion.h3>

          <motion.p variants={fade} className="mt-4 max-w-md text-lg leading-relaxed text-muted">
            {project.hook}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-md text-sm leading-relaxed text-muted/80"
          >
            {project.description}
          </motion.p>

          {project.highlight && (
            <motion.p
              variants={fadeUp}
              className="mt-5 inline-block border border-accent/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-accent"
            >
              {project.highlight}
            </motion.p>
          )}

          <motion.ul variants={stagger(0.05)} className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {project.tags.map((tag) => (
              <motion.li
                key={tag}
                variants={chip}
                className="font-mono text-[11px] uppercase tracking-wider text-faint"
              >
                {tag}
              </motion.li>
            ))}
          </motion.ul>

          {/* Sits above the stretched link so the buttons keep their own targets. */}
          <motion.div variants={fade} className="relative z-10 mt-8">
            <ProjectLinks project={project} />
          </motion.div>
        </motion.div>

        {}
        {canHover && (
          <div className="relative z-10 hidden min-h-[300px] lg:col-span-5 lg:col-start-8 lg:block">
            <AnimatePresence initial={false}>
              {hovered ? (
                <motion.div
                  key="panel"
                  variants={hoverVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2"
                >
                  <ProjectPanel project={project} />
                </motion.div>
              ) : (
                <motion.div
                  key="stub"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2"
                >
                  <NotesStub count={project.notes.length} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {}
        <div className={`relative z-10 ${canHover ? "lg:hidden" : "lg:col-span-5 lg:col-start-8"}`}>
          <NotesAccordion project={project} />
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);
    const onChange = (e) => setCanHover(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <SectionShell id="work" className="overflow-x-clip pt-12 md:pt-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader index="02" title="Work" />
      </div>
      <div>
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} canHover={canHover} />
        ))}
      </div>
    </SectionShell>
  );
}
