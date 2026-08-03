import { motion } from "framer-motion";
import { site } from "../data/site.js";
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
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden" id="top">
      {/* Looping training log — muted, non-distracting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[44%] select-none overflow-hidden opacity-[0.16] md:block"
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
        className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-32 md:px-8"
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

        <motion.div variants={line} className="mt-16 flex items-center gap-3">
          <span aria-hidden className="h-px w-10 bg-accent" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-faint">
            scroll — the work speaks
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
