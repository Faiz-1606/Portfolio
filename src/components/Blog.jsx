import { motion } from "framer-motion";
import { blog } from "../data/blog.js";
import SectionHeader from "./SectionHeader.jsx";
import { fadeUp, stagger, viewportOnce } from "../lib/motion.js";

function ArrowIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className={className}>
      <path d="M3 13 13 3M6 3h7v7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Blog() {
  return (
    <section id="blog" className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-32">
      <SectionHeader index="06" title="Blog" />

      {blog.posts.length === 0 ? (
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.p
            variants={fadeUp}
            className="font-display text-2xl font-medium tracking-tight text-muted md:text-3xl"
          >
            {blog.emptyTitle}
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-4 font-mono text-xs uppercase tracking-widest text-faint"
          >
            {blog.emptyNote}
          </motion.p>
        </motion.div>
      ) : (
        <motion.ul
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="space-y-0"
        >
          {blog.posts.map((post, i) => (
            <motion.li key={post.id} variants={fadeUp} className="border-t border-line">
              <a
                href={post.url}
                target="_blank"
                rel="noreferrer"
                className="group grid gap-2 py-8 transition-colors md:grid-cols-12 md:items-baseline"
              >
                <span className="font-mono text-xs text-accent md:col-span-1">
                  {String(i + 1).padStart(3, "0")}
                </span>
                <span className="font-display text-xl font-medium tracking-tight transition-colors group-hover:text-accent md:col-span-6 md:text-2xl">
                  {post.title}
                </span>
                <span className="text-sm text-muted md:col-span-3">{post.hook}</span>
                <span className="flex items-center gap-3 font-mono text-xs text-faint md:col-span-2 md:justify-end">
                  {post.date}
                  <ArrowIcon className="h-3 w-3 transition-colors group-hover:text-accent" />
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </section>
  );
}
