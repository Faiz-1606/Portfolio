// Shared motion vocabulary. Movement communicates hierarchy — nothing loops,
// nothing bounces, everything settles with a confident ease-out.

export const EASE = [0.22, 1, 0.36, 1];

export const viewportOnce = { once: true, amount: 0.2 };

// Section headings: 40px rise, ~0.8s, trigger once.
export const heading = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

// Chips/tags: barely-there scale, no bounce.
export const chip = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
};

// Hairlines grow from their origin instead of fading.
export const lineGrow = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease: EASE } },
};

export const stagger = (delay = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren } },
});

// Explicit sequencing for elements whose visual order differs from DOM order
// (e.g. experience dates sit on top but reveal last).
export const delayedFade = (delay = 0, y = 24) => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE, delay } },
});

// Masked reveal for panels, diagrams, and imagery — a top-down wipe.
export const maskReveal = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.6, ease: EASE } },
};

// Pairs with maskReveal on nested imagery: 1.05 → 1.0, same clock.
export const imgScale = {
  hidden: { scale: 1.05 },
  show: { scale: 1, transition: { duration: 0.6, ease: EASE } },
};

// Hover-revealed engineering panel: quick masked glide, still immediate.
export const panelIn = {
  hidden: { opacity: 0, y: 12, clipPath: "inset(0% 0% 12% 0%)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.32, ease: EASE },
  },
  exit: { opacity: 0, transition: { duration: 0.16, ease: "easeIn" } },
};

// Reduced-motion fallback for anything clip-path based.
export const panelFade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};
