import { motion } from "framer-motion";
import { THEMES } from "../lib/theme.js";
import { useTheme } from "../lib/ThemeProvider.jsx";

export default function ThemeToggle({ className = "" }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className={`inline-flex shrink-0 items-center gap-1 border border-line p-1 ${className}`}
    >
      {THEMES.map((t) => {
        const active = theme === t.id;
        return (
          <button
            key={t.id}
            role="radio"
            aria-checked={active}
            aria-label={`${t.label} theme`}
            title={`${t.label} theme`}
            onClick={() => setTheme(t.id)}
            className="group relative flex h-6 w-6 items-center justify-center"
          >
            {active && (
              <motion.span
                layoutId="theme-dot-ring"
                className="absolute inset-0 border border-accent"
                transition={{ type: "spring", stiffness: 500, damping: 45 }}
              />
            )}
            <span
              className={`h-2.5 w-2.5 rounded-full border transition-transform duration-200 ${
                active ? "border-accent/60" : "border-faint/60 group-hover:scale-110"
              }`}
              style={{ backgroundColor: t.dot }}
            />
          </button>
        );
      })}
    </div>
  );
}
