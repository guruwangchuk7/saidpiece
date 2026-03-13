# SaidPiece Architects

**SaidPiece Architects** is a modern, immersive portfolio web application designed for a Bhutan-based architecture and design firm. The application showcases the studio's philosophy, projects, and team through a minimalist aesthetic, smooth GSAP animations, and a responsive user interface.

## Tech Stack

*   **Frontend Framework:** React (v19)
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS (v4)
*   **Animations:** GSAP (GreenSock Animation Platform), Framer Motion
*   **Routing:** React Router (v7)
*   **Icons:** React Icons
*   **Backend / Database:** Supabase

## Features

*   **Immersive Hero Section:** Engaging visual introduction with custom GSAP animations.
*   **Responsive Design:** Fully optimized for desktops, tablets, and mobile devices.
*   **Smooth Animations:** Scroll-triggered reveals and transitions using GSAP ScrollTrigger.
*   **Portfolio Showcase:** Dedicated sections to display architectural projects with filtering capabilities.
*   **Team & Philosophy:** Rich content pages detailing the studio's ethos and team members.
*   **Contact Integration:** User-friendly contact interface.

## Project Structure

```bash
saidpiece/
├── public/              # Static assets (icons, etc.)
├── src/
│   ├── animations/      # GSAP animation controllers
│   ├── assets/          # Project images and graphics
│   ├── components/      # Reusable UI components
│   ├── data/            # Static content data
│   ├── pages/           # Application route pages
│   ├── context/         # React Context (Auth, etc.)
│   ├── supabaseClient.js # Supabase configuration
│   └── App.jsx          # Main application layout
└── index.html           # Entry HTML
```

## Getting Started

### Prerequisites

*   Node.js (v18+)
*   npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/guruwangchuk7/saidpiece.git
    cd saidpiece
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Building for Production

To build the application for deployment:

```bash
npm run build
```

This will create a `dist` directory with your optimized production build.

## Author

**Guru Wangchuk**
*   **GitHub:** [guruwangchuk7](https://github.com/guruwangchuk7)
*   **Email:** guruwangchuk1234@gmail.com
