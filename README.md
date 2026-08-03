# Faiz Mohammed Zameer — Portfolio

Editorial, numbered-project portfolio. React + Tailwind CSS v4 + Framer Motion + Lenis.

## Run

```bash
npm install
npm run dev      # dev server
npm run build    # production build → dist/
```

## Editing content — never touch components

All portfolio content lives in `src/data/`. The UI renders from these files:

| File            | Controls                                                        |
| --------------- | --------------------------------------------------------------- |
| `projects.ts`   | Featured work: titles, notes, diagrams, tags, GitHub/live URLs, images |
| `experience.js` | Experience entries                                              |
| `skills.js`     | Skill groups                                                    |
| `teaching.js`   | AI Ninjas section                                               |
| `about.js`      | About paragraphs + tags                                         |
| `site.js`       | Hero copy, footer sign-off, nav links                           |
| `blog.js`       | Blog posts (empty for now — add posts and the section renders them) |
| `socials.js`    | GitHub / LinkedIn links (`url: null` renders as muted text)     |
| `contact.js`    | Email                                                           |
| `education.js`  | Education (data only, not rendered yet)                         |

### Adding project links & media

In `src/data/projects.ts`, per project:

- `github: "https://github.com/..."` — the GitHub Repository button links to it.
  An empty string (`""`) renders the same button unlinked and muted, ready for
  the URL to be pasted in later.
- `live` — renders a Live demo button when set.
- `thumbnail` / `gallery: ["/shots/a.png", ...]` — put files in `public/` and
  reference them by absolute path; they appear inside the hover panel automatically.
- `architectureDiagram: ["step", "step", ...]` — rendered as the inline architecture flow.
- `domain` — the small category label shown beside the project number.

## Themes

Three themes — **Dark** (default), **Light**, and **Dim** — switched with the
segmented control in the nav and persisted to `localStorage`.

- All colors live as CSS custom properties in `src/index.css` (`@theme` holds
  the dark defaults; `[data-theme="light"]` / `[data-theme="dim"]` override
  them). Components never hardcode colors — Tailwind utilities consume the
  variables, so everything re-themes automatically.
- `src/lib/ThemeProvider.jsx` owns the active theme; `src/lib/theme.js` defines
  the theme list and storage helpers. An inline script in `index.html` applies
  the saved theme before first paint.
- Project imagery can adapt per theme: in `projects.ts`, use
  `{ dark: "/x-dark.png", light: "/x-light.png" }` anywhere a plain image path
  is accepted (Dim reuses the dark variant).

## Motion & accessibility

- Scroll choreography lives in `src/lib/motion.js` — headings rise 40px over
  ~0.8s, chips stagger individually, panels reveal with a clip-path wipe, and
  each project unfolds number → title → hook → description → tags → button.
- Note: never animate `clip-path` on the same element that `whileInView`
  observes — a fully-clipped element reports zero intersection area and the
  trigger never fires. Observe an unclipped wrapper and clip a child instead.
- Lenis smooth scroll is disabled on touch devices and under `prefers-reduced-motion`.
- Framer Motion animations respect reduced motion via `MotionConfig reducedMotion="user"`;
  clip-path reveals fall back to fades.
