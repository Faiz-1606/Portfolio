import { motion } from "framer-motion";
import { site } from "../data/site.js";
import { useScrollTo } from "../lib/LenisProvider.jsx";
import { EASE } from "../lib/motion.js";

const LOG_LINES = [
  "$ git push origin main",
  "[ci] 214 tests passed · 0 failed · 41s",
  "[build] bundle 306 kB → 99 kB gzip · ok",
  "$ docker compose up -d api worker",
  "[api] p95 41ms · error rate 0.00% · healthy",
  "[index] 8,412 chunks embedded · collection ok",
  "[query] router → code · 3 citations · 120ms",
  "[train] eval loss 0.213 → 0.187 · ckpt saved",
  "[vision] stream 30fps · detections stable",
  "[mobile] assembleRelease · signed · ok",
  "[embedded] serial 9600 baud · handshake ok",
  "[ws] 1,024 concurrent connections · stable",
  "[db] migration 021_add_indexes applied · 2.1s",
  "[cache] hit rate 94.2% · evictions nominal",
  "$ kubectl rollout status deploy/api",
  "[deploy] rollout complete · 0 downtime",
  "[monitor] all checks green · next run 5m",
  "$ git tag v1.4.0 && git push --tags",
];

const parent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const line = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function Hero() {
  const scrollTo = useScrollTo();

  return (
    <section
      className="relative flex items-start overflow-hidden md:min-h-svh md:items-center"
      id="top"
    >
      {/* Looping training log — muted, non-distracting */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 hidden w-[44%] select-none overflow-hidden opacity-[0.16] md:block"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        }}
      >
        <div className="log-ticker font-mono text-[11px] leading-[2.2] text-muted">
          {[...LOG_LINES, ...LOG_LINES].map((l, i) => (
            <div key={i} className="whitespace-nowrap">
              {l}
            </div>
          ))}
        </div>
      </div>

      <motion.div
        variants={parent}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-6xl px-5 pb-10 pt-36 md:px-8 md:pb-24 md:pt-32"
      >
        <motion.p variants={line} className="mb-6 font-mono text-xs tracking-widest text-accent">
          {site.role.toUpperCase()}
        </motion.p>

        <motion.h1
          variants={line}
          className="font-display text-[clamp(2.6rem,7.5vw,6.5rem)] font-semibold leading-[1.02] tracking-tight"
        >
          {site.hero.greeting}
          <br />
          <span className="text-muted">{site.hero.headlineMuted}</span>
          <br />
          <span className="text-accent">{site.hero.headlineAccent}</span>
        </motion.h1>

        <motion.p
          variants={line}
          className="mt-8 max-w-md text-base leading-relaxed text-muted md:text-lg"
        >
          {site.hero.subline}
        </motion.p>

        <motion.div variants={line} className="mt-10 md:mt-16">
          <button
            onClick={() => scrollTo("#about")}
            className="group inline-flex min-h-[44px] items-center gap-3 text-left"
          >
            {/* Hairline carries a repeating sweep toward the label. */}
            <span
              aria-hidden
              className="relative h-px w-10 shrink-0 overflow-hidden bg-accent/30"
            >
              <span className="cue-sweep absolute inset-y-0 left-0 w-1/2 bg-accent" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-faint transition-colors group-hover:text-ink group-active:text-accent">
              scroll — the work speaks
            </span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
