import { createContext, useContext, useEffect, useRef, useState } from "react";
import { DEFAULT_THEME, readStoredTheme, storeTheme } from "./theme.js";

const ThemeContext = createContext({ theme: DEFAULT_THEME, setTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readStoredTheme);
  const firstRender = useRef(true);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === DEFAULT_THEME) root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", theme);
    storeTheme(theme);

    // Color transitions are enabled only around an actual switch, so the page
    // isn't paying for a universal `transition` rule the rest of the time.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    root.classList.add("theme-switching");
    const timer = setTimeout(() => root.classList.remove("theme-switching"), 320);
    return () => clearTimeout(timer);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

// Resolve a theme-adaptive asset. Plain strings apply to every theme;
// objects may provide { dark, light } variants — Dim reuses the dark variant.
export function useThemeAsset() {
  const { theme } = useTheme();
  return (asset) => {
    if (!asset) return null;
    if (typeof asset === "string") return asset;
    const preferred = theme === "light" ? asset.light : asset.dark;
    return preferred ?? asset.dark ?? asset.light ?? null;
  };
}
