// Theme definitions. The actual UI color values live in src/index.css as CSS
// custom properties — components never hardcode colors. The `dot` swatches
// below are fixed representations of each theme for the toggle, so they stay
// constant no matter which theme is active.

export const THEMES = [
  { id: "light", label: "Light", dot: "#f2efe9" },
  { id: "dim", label: "Dim", dot: "#45484c" },
  { id: "dark", label: "Dark", dot: "#0b0b0a" },
];

export const THEME_IDS = THEMES.map((t) => t.id);
export const DEFAULT_THEME = "dark";
export const STORAGE_KEY = "theme";

export function readStoredTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return THEME_IDS.includes(saved) ? saved : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function storeTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* private mode — theme simply won't persist */
  }
}
