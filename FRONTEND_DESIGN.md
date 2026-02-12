# Frontend Design Documentation

## 1. Project Overview
**Project Name**: Saidpiece
**Description**: A professional architectural portfolio website featuring a modern, minimalist design with dynamic animations and a comprehensive admin dashboard.
**Tech Stack**:
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4, Custom CSS
- **Animations**: GSAP (GreenSock), Framer Motion
- **Routing**: React Router DOM v7
- **State Management**: React Context API
- **Backend/Auth**: Supabase

## 2. Architecture

### Directory Structure
```
src/
├── assets/         # Static assets (images, icons)
├── components/     # Reusable UI components
│   ├── common/     # Generic components (Buttons, Inputs)
│   ├── features/   # Feature-specific components (Auth, etc.)
│   ├── layout/     # Layout components (Navbar, Footer)
│   └── popupNavbar/# Navigation overlays
├── context/        # Global state contexts (Auth, Visibility)
├── data/           # Static data files and mock content
├── pages/          # Application views/routes
│   ├── admin/      # Admin dashboard views
│   ├── home/       # Landing page
│   ├── portfolio/  # Project showcases
│   └── ...         # Other pages (About, Contact, etc.)
├── utils/          # Helper functions
├── App.jsx         # Main application layout wrapper
├── main.jsx        # Entry point and routing configuration
└── index.css       # Global styles and Tailwind imports
```

### Routing Strategy
The application uses **React Router v7** with a configuration-based approach defined in `main.jsx`.
- **Public Routes**: Wrapped in `App.jsx` layout (Home, About, Portfolio, etc.).
- **Admin Routes**: Separate `AdminLayout.jsx` wrapper with lazy loading for performance.
- **Protected Routes**: Wrapped in `ProtectedRoute` component to ensure authentication (Admin Dashboard).

## 3. Design System

### Typography
The project integrates a refined selection of Google Fonts, emphasizing a premium and architectural aesthetic.
- **Primary Font**: `Montserrat` (Used for body text and general UI)
- **Headings/Accents**: `Krona One`, `Noto Serif`, `Orbitron`, `Playwrite HU`
- **Utility**: `Nunito Sans`, `Open Sans`, `Raleway`

### Colors
- **Primary**: Monochrome palette (Black `#000000`, White `#ffffff`)
- **Accents**: Dark Grays (`#555555`), Zinc variants (via Tailwind defaults)
- **Backgrounds**: Clean white for content, specific dark modes for emphasis.

### Layout & Spacing
- **Container**: Responsive padding (`px-3 sm:px-5 lg:px-10`) ensures consistency across devices.
- **Grid System**: CSS Grid and Flexbox are used extensively for layouts (e.g., Portfolio grids).
- **Responsive Design**: Mobile-first approach using standard Tailwind breakpoints (`sm`, `md`, `lg`, `xl`).

## 4. Components & Styling

### Styling Methodology
- **Utility-First**: Tailwind CSS is the primary styling engine for layout, spacing, and typography.
- **CSS Variables & Custom Classes**: `index.css` defines custom classes like `.btn2`, `.image` for specific reusable styles and complex animations not easily handled by utility classes alone.
- **Inline Styles**: Used sparingly for dynamic values or specific font overrides (e.g., `fontFamily: "century-gothic"`).

### Key Components
- **Navbar**: Responsive navigation with a hamburger menu for mobile and a clean top bar for desktop.
- **HeroNavbar**: Full-screen overlay navigation used for immersive menu interactions.
  - **Implementation**: Uses `React.createPortal` to render outside the main DOM hierarchy (attached to `#navbar`).
  - **Animation**: Leverages `framer-motion`'s `AnimatePresence` for smooth entrance/exit transitions (`y: -100` to `y: 0`).
  - **Styling**: Dark theme (`bg-zinc-900`) with white text, providing distinct contrast from the light-themed public pages.
- **PortfolioCard**: Reusable card component showcasing project thumbnails.
  - **Interaction Pattern**: Uses `group-hover` utility classes to trigger zoom effects (`scale-105`) and overlay transitions on hover.
  - **Layout**: Fixed height images with `object-cover` to maintain aspect ratios.
  - **Typographic Pattern**: Uppercase headings with tight tracking (`tracking-tight`) for a brutalist architectural feel.

### Admin Interface Design
The admin dashboard employs a clean, functional aesthetic distinct from the immersive public pages.
- **Palette**: Dominant White (`bg-white`) and Zinc (`text-zinc-900`, `border-zinc-200`) for high readability.
- **Cards**: Interactive statistics cards with hover states (`hover:border-zinc-900`) and shadow transitions.
- **Feedback**: Uses `react-hot-toast` for immediate user feedback on actions (success/error types).
- **Typography**: Heavy usage of `uppercase` and `tracking-wider` for labels and headers to maintain professional consistency.

## 5. Animations
The application leverages advanced animation libraries to create a fluid user experience:
- **GSAP**: Used for complex timelines and scroll-triggered animations (e.g., revealing elements on scroll).
- **Framer Motion**: Utilized for component-level transitions and gestures.
  - **Page Transitions**: `AnimatePresence` handles component unmounting animations, particularly for the `HeroNavbar`.
- **CSS Transitions**: Standard `transition` properties used for hover effects (buttons, links).

## 6. State Management
React **Context API** is used for global state to avoid prop drilling:
- **AuthContext**: Manages user authentication state (User object, Login/Logout functions).
- **VisibilityContext**: Controls the state of UI overlays like the popup navigation.

## 7. Development Guidelines
- **Lazy Loading**: Admin components should always be lazy-loaded to keep the initial bundle size small.
- **Asset Management**: Images and specific icon assets are stored in `src/assets`.
- **Linting**: ESLint is configured for code quality checks.
- **Environment**: Environment variables are managed via `.env` files (e.g., Supabase keys).

---
*Generated on 2026-02-12*
