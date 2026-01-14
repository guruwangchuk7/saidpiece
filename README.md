# SaidPiece

SaidPiece is a modern, immersive portfolio web application designed for **SaidPiece Studio**, a Bhutan-based architecture and design firm. The application showcases the studio's philosophy, projects, and team through a minimalist aesthetic, smooth GSAP animations, and a responsive user interface.

[Insert Live Demo Link Here]

## Tech Stack

### Frontend
*   **Framework:** [React](https://react.dev/) (v19)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4)
*   **Animations:** [GSAP](https://greensock.com/gsap/) (GreenSock Animation Platform), [Framer Motion](https://www.framer.com/motion/)
*   **Routing:** [React Router](https://reactrouter.com/) (v7)
*   **Icons:** [React Icons](https://react-icons.github.io/react-icons/)

### Backend
*   [INSERT BACKEND TECH]
*   *(e.g., Node.js, Express, Python, Django, Go)*

### Database
*   [INSERT DATABASE]
*   *(e.g., MongoDB, PostgreSQL, MySQL)*

### Authentication
*   [INSERT AUTH METHOD]
*   *(e.g., JWT, OAuth, Firebase Auth)*

### DevOps / Deployment
*   [INSERT DEPLOYMENT DETAILS]
*   *(e.g., Vercel, Netlify, AWS, Docker)*

## Features

*   **Immersive Hero Section:** Engaging visual introduction with custom GSAP animations.
*   **Responsive Design:** Fully optimized for desktops, tablets, and mobile devices.
*   **Smooth Animations:** Scroll-triggered reveals and transitions using GSAP ScrollTrigger.
*   **Dynamic Navigation:** Interactive navbar with popup functionality for better UX.
*   **Portfolio Showcase:** Dedicated sections to display architectural projects and case studies.
*   **About & Philosophy:** Rich content pages detailing the studio's ethos and team.
*   **Contact Integration:** User-friendly contact interface.

## Project Structure

```bash
saidpiece/
├── public/              # Static assets (favicon, robots.txt, etc.)
├── src/
│   ├── animations/      # Custom GSAP animation configurations
│   ├── assets/          # Images, icons, and fonts
│   ├── components/      # Reusable UI components (Navbar, Footer, etc.)
│   │   └── popupNavbar/ # Specific components for the popup navigation
│   ├── pages/           # Application route pages
│   │   ├── home/        # Home page components
│   │   ├── portfolio/   # Portfolio listing and details
│   │   ├── team/        # Team section
│   │   ├── About.jsx    # About Us page
│   │   ├── Contact.jsx  # Contact page
│   │   └── Legal.jsx    # Legal/Privacy pages
│   ├── App.jsx          # Main application layout and provider setup
│   ├── main.jsx         # Entry point and router configuration
│   └── index.css        # Global styles and Tailwind directives
├── .eslintrc.cjs        # ESLint configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite configuration
```

## Installation & Setup

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   npm or yarn

### Clone the Repository

```bash
git clone https://github.com/your-username/saidpiece.git
cd saidpiece
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

## Environment Variables

Create a `.env` file in the root directory to configure the application.

```env
# Example Configuration
VITE_API_BASE_URL=http://localhost:3000/api
# [INSERT OTHER ENV VARS HERE]
```

## Running the Application

### Frontend Development Server

Start the Vite development server with hot module replacement (HMR):

```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Backend Server
*[INSERT INSTRUCTIONS FOR RUNNING BACKEND]*

```bash
# Example:
# cd backend
# npm run start
```

## API Documentation

*(Placeholder: Describe your API endpoints here if applicable)*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/projects` | Fetch all portfolio projects |
| GET | `/api/projects/:id` | Fetch details for a specific project |
| POST | `/api/contact` | Submit the contact form |
| [INSERT] | `[INSERT]` | [INSERT DESCRIPTION] |

## Database Schema

*(Placeholder: Describe your database schema or models)*

*   **Users:** `id`, `name`, `email`, `password_hash`
*   **Projects:** `id`, `title`, `description`, `images`, `category`
*   **[INSERT TABLE]:** `[INSERT FIELDS]`

## Authentication & Security

*   **Authentication Strategy:** [INSERT STRATEGY] (e.g., JWT-based auth with refresh tokens).
*   **Security Measures:**
    *   Protected routes using React Router loaders/wrappers.
    *   Input validation on forms.
    *   [INSERT OTHER SECURITY MEASURES]

## Testing

*(Placeholder: Describe testing strategy)*

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e
```

## Deployment

The frontend is optimized for deployment on platforms like **Vercel** or **Netlify**.

1.  Build the project:
    ```bash
    npm run build
    ```
2.  Preview the build:
    ```bash
    npm run preview
    ```
3.  Deploy the `dist/` folder to your hosting provider.

## Future Improvements

*   [ ] Integration with a Headless CMS (e.g., Sanity, Strapi) for dynamic content management.
*   [ ] Dark mode toggle.
*   [ ] Internationalization (i18n) support.
*   [ ] Enhanced performance optimizations for image loading.

## License

This project is licensed under the [MIT License](LICENSE).

## Author

**Guru Wangchuk**

*   Website: Null
*   GitHub: https://github.com/guruwangchuk7
*   Email: guruwangchuk1234@gmail.com
