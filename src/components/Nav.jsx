import { useEffect, useState } from "react";
import { navLinks, site } from "../data/site.js";
import { useScrollTo } from "../lib/LenisProvider.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

function NavLinks({ className = "" }) {
  const scrollTo = useScrollTo();
  return (
    <ul className={`items-center gap-3 sm:gap-4 lg:gap-7 ${className}`}>
      {navLinks.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              scrollTo(link.href);
            }}
            className="link-under font-mono text-[10px] uppercase tracking-wider text-muted transition-colors hover:text-ink sm:text-[11px] sm:tracking-widest lg:text-xs"
          >
            {link.label}
          </a>
        </li>
      ))}
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
            className="shrink-0 font-mono text-xs tracking-widest text-ink transition-colors hover:text-accent"
            aria-label="Back to top"
          >
            <span className="text-accent">▲</span>
            <span className="hidden sm:inline">&nbsp; {site.shortName.toUpperCase()}.ZAMEER</span>
          </button>
          <NavLinks className="hidden lg:flex" />
          <ThemeToggle />
        </div>
        {/* Below lg the links live on their own row inside the same bar */}
        <div className="flex h-9 items-center lg:hidden">
          <NavLinks className="flex" />
        </div>
      </nav>
    </header>
  );
}
