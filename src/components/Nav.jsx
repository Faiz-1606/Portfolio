import { useEffect, useState } from "react";
import { navLinks, site } from "../data/site.js";
import { useScrollTo } from "../lib/LenisProvider.jsx";
import { useActiveSection } from "../lib/useActiveSection.js";
import Magnetic from "./Magnetic.jsx";
import ScrambleText from "./ScrambleText.jsx";
import ScrollProgress from "./ScrollProgress.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const SECTION_IDS = [...navLinks.map((l) => l.href.slice(1)), "teaching", "blog"];

function NavLinks({ className = "" }) {
  const scrollTo = useScrollTo();
  const active = useActiveSection(SECTION_IDS);

  return (
    <ul className={`items-center gap-3 sm:gap-4 lg:gap-7 ${className}`}>
      {navLinks.map((link) => {
        const isActive = active === link.href.slice(1);
        return (
          <li key={link.href}>
            <a
              href={link.href}
              aria-current={isActive ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              className={`link-under inline-flex min-h-[44px] items-center font-mono text-[10px] uppercase tracking-wider transition-colors hover:text-ink active:text-accent sm:text-[11px] sm:tracking-widest lg:min-h-0 lg:text-xs ${
                isActive ? "is-active text-ink" : "text-muted"
              }`}
            >
              <ScrambleText text={link.label} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex h-14 items-center justify-between gap-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="-ml-2 inline-flex min-h-[44px] shrink-0 items-center px-2 font-mono text-xs tracking-widest text-ink transition-colors hover:text-accent active:text-accent"
            aria-label="Back to top"
          >
            <span className="text-accent">▲</span>
            <span className="hidden sm:inline">&nbsp; {site.shortName.toUpperCase()}.ZAMEER</span>
          </button>
          <NavLinks className="hidden lg:flex" />
          <Magnetic strength={0.12}>
            <ThemeToggle />
          </Magnetic>
        </div>
        {/* Below lg the links live on their own row inside the same bar.
            h-11 gives the links a 44px tap target without clipping. */}
        <div className="flex h-11 items-center lg:hidden">
          <NavLinks className="flex" />
        </div>
      </nav>
      <ScrollProgress />
    </header>
  );
}
