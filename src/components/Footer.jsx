import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "../data/site.js";
import { contact } from "../data/contact.js";
import { socials } from "../data/socials.js";
import ScrambleText from "./ScrambleText.jsx";
import { fade, fadeUp, heading, stagger, viewportOnce } from "../lib/motion.js";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef(null);

  useEffect(() => () => clearTimeout(copiedTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = contact.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    // Phones get a physical tick to confirm the copy landed.
    navigator.vibrate?.(10);
    setCopied(true);
    clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <footer id="contact" className="border-t border-line">
      {/* Reveal sequence: label → heading → email → socials → meta */}
      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-32"
      >
        <motion.p variants={fadeUp} className="mb-10 font-mono text-xs tracking-widest text-accent">
          07 / CONTACT
        </motion.p>

        <motion.h2
          variants={heading}
          className="font-display text-[clamp(2.4rem,8vw,7rem)] font-semibold leading-[1.05] tracking-tight"
        >
          {site.footer.signoff.map((lineText, i) => (
            <span key={i} className="block">
              {i === 1 ? <span className="text-accent">{lineText}</span> : lineText}
            </span>
          ))}
        </motion.h2>

        <motion.div variants={fadeUp} className="mt-14 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <button
            onClick={copyEmail}
            title="Copy email address"
            className="link-under inline-flex min-h-[44px] items-center break-all text-left font-mono text-lg text-ink transition-colors hover:text-accent active:text-accent md:text-2xl"
          >
            {contact.email}
          </button>
          <AnimatePresence>
            {copied && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="font-mono text-xs uppercase tracking-widest text-accent"
              >
                copied ✓
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.ul
          variants={stagger(0.08)}
          className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3"
        >
          {socials.map((social) =>
            social.url ? (
              <motion.li key={social.id} variants={fadeUp}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-under inline-flex min-h-[44px] items-center gap-1 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-ink active:text-accent"
                >
                  <ScrambleText text={social.label} /> ↗
                </a>
              </motion.li>
            ) : (
              <motion.li
                key={social.id}
                variants={fadeUp}
                className="font-mono text-xs uppercase tracking-widest text-faint"
                title="Link coming soon"
              >
                {social.label}
              </motion.li>
            )
          )}
        </motion.ul>

        <motion.p
          variants={fade}
          className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8 font-mono text-[11px] text-faint"
        >
          <span>© 2026 {site.name}</span>
          <span>designed &amp; engineered by Faiz</span>
        </motion.p>
      </motion.div>
    </footer>
  );
}
