# Copilot instructions for saidpiece

This file gives targeted, actionable guidance for AI coding agents working on the `saidpiece` React + Vite site.

- Project type: React 19 + Vite (see `package.json`). Tailwind CSS and GSAP are used for layout and animations.

- How the app is structured (big picture):
  - `src/main.jsx` bootstraps the app with React Router. The root route renders `App.jsx` which composes layout-level components.
  - `src/App.jsx` is the layout: it wraps pages with `VisibilityProvider` (pop-up navbar state), renders `HeroNavbar` and `ToggleNavbarBtn` in an absolute container, then a sticky `Navbar`, the page `Outlet`, and `Footer`.
  - Pages live under `src/pages/` with `home/`, `team/`, `About.jsx`, and `Contact.jsx`.
  - Popup navbar components live in `src/components/popupNavbar/` including `VisiblityContext.jsx`, `HeroNavbar.jsx`, `ToggleNavbarBtn.jsx`, and `RecentProjects.jsx`.
  - Animations are centralized in `src/animations/`.

- Key conventions and patterns to preserve:
  - Global state for the pop-up navbar uses a context provider in `VisiblityContext.jsx`. Prefer mutating via the provided context API rather than creating a second independent store.
  - Routing uses `react-router` v7 style with `createBrowserRouter` + `createRoutesFromElements` in `main.jsx`. Add new top-level routes using the same pattern and `Outlet` layout.
  - Styling: Tailwind class names in JSX and `index.css` provide global styles. Don't replace with inline styles unless necessary; prefer Tailwind utility classes.
  - Animation: GSAP and `@gsap/react` are used across `animations/`. Reuse existing animation hooks or functions where present to maintain consistent motion behaviour.

- Build, run, and lint commands (from `package.json`):
  - dev (local): `npm run dev` — starts Vite dev server with HMR
  - build: `npm run build` — produces production build
  - preview: `npm run preview` — serves built output for previewing
  - lint: `npm run lint` — runs ESLint across the project

- Files to inspect when making changes:
  - Layout and routing: `src/main.jsx`, `src/App.jsx`
  - Nav and popup: `src/components/Navbar.jsx`, `src/components/popupNavbar/*`
  - Pages: `src/pages/*` and `src/pages/home/*`
  - Animations: `src/animations/*`

- Common, discoverable patterns with examples:
  - Popup state: Why exists — the `HeroNavbar` floats above content and is toggled by `ToggleNavbarBtn`. Example: `VisibilityProvider` wraps `HeroNavbar` in `App.jsx` so `ToggleNavbarBtn` and `HeroNavbar` share state.
  - Routing + Layout: `main.jsx` defines the router; `App.jsx` provides the layout via `<Outlet/>`. To add an inner page route, add a `<Route path="new" element={<NewPage/>}/>` inside the root `Route` in `main.jsx`.
  - Sticky header: `Navbar` is placed within a `div` with `sticky top-0 z-20 bg-white` in `App.jsx` to remain visible during scroll.

- Integration and dependencies:
  - Tailwind (via `tailwindcss` + `@tailwindcss/vite` plugin in `vite.config.js`) — CSS utilities are expected throughout components.
  - GSAP & @gsap/react — used for animations; prefer reusing helpers found in `src/animations/`.
  - React Router v7 — use `createBrowserRouter` and `RouterProvider` rather than legacy `BrowserRouter` patterns found in older projects.

- Testing and debugging notes (discoverable):
  - There are no automated tests present. For quick manual checks, run `npm run dev` and exercise the popup navbar, routes, and animations.
  - Linting: `npm run lint` for code style issues. ESLint config references in project root (look at `eslint.config.js`) — match existing patterns when adding components.

- When editing or adding code, prefer these small actions:
  - Keep the `VisibilityProvider` as the single source of truth for popup navbar UI. If you need new cross-component state, add to `VisiblityContext.jsx` and expose an updater.
  - For new animations, add utility functions in `src/animations/` and call them from components; avoid scattering GSAP timelines inside many components.
  - New routes: register them in `src/main.jsx` using the existing `createRoutesFromElements` approach.

- Quick pitfalls to avoid:
  - Don't create multiple, independent popup state stores; doing so will break the toggling logic that assumes a shared `VisibilityProvider`.
  - Avoid using class components — project uses modern React function components, hooks, and context.
  - Don't assume server-side rendering; Vite dev/preview is client-side only.

- Example edits (copy-paste friendly):
  - Add a route in `src/main.jsx`:

    <Route path="new" element={<NewPage/>}></Route>

  - Update `VisiblityContext.jsx` to add a boolean `isPinned` with setter `setIsPinned` and expose via context object. Follow the file's existing pattern.

If anything above is incomplete or you'd like more specific examples (e.g., common animation helper signatures or the visibility context API), tell me which area to expand and I'll iterate.
