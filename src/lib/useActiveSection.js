import { useEffect, useState } from "react";

// Tracks which section currently crosses the middle of the viewport, so the
// nav can highlight where the visitor is. Sections without a nav link still
// get observed — while reading them the highlight simply clears.
export function useActiveSection(ids) {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // Shrink the root to a thin band mid-viewport; contiguous sections
      // then intersect it one at a time.
      { rootMargin: "-45% 0px -50% 0px" }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
