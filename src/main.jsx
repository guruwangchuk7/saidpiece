import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { Toaster } from 'react-hot-toast';

// Lazy Load Pages
const Home = lazy(() => import('./pages/home/Home.jsx'));
const Contact = lazy(() => import('./pages/contact/index.jsx'));
const Team = lazy(() => import('./pages/team/Team.jsx'));
const About = lazy(() => import('./pages/about/index.jsx'));
const Portfolio = lazy(() => import('./pages/portfolio/Portfolio.jsx'));
const Blog = lazy(() => import('./pages/blog/Blog.jsx'));
const BlogPost = lazy(() => import('./pages/blog/BlogPost.jsx'));
const ProjectGallery = lazy(() => import('./pages/portfolio/ProjectGallery.jsx'));
const Legal = lazy(() => import('./pages/legal/index.jsx'));
const TeamPortfolio = lazy(() => import('./pages/team/portfolios/TeamPortfolio.jsx'));
const Dashboard = lazy(() => import('./pages/dashboard/index.jsx'));

// Lazy Load Admin Components
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout.jsx'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'));
const ProjectAdmin = lazy(() => import('./pages/admin/ProjectAdmin.jsx'));
const TeamAdmin = lazy(() => import('./pages/admin/TeamAdmin.jsx'));
const BlogAdmin = lazy(() => import('./pages/admin/BlogAdmin.jsx'));
const AdminManager = lazy(() => import('./pages/admin/AdminManager.jsx'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900"></div>
  </div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Suspense fallback={<PageLoader />}><Home /></Suspense>}></Route>
        <Route path='about' element={<Suspense fallback={<PageLoader />}><About /></Suspense>}></Route>
        <Route path='contact' element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>}></Route>
        <Route path='portfolio' element={<Suspense fallback={<PageLoader />}><Portfolio /></Suspense>}></Route>
        <Route path='blog' element={<Suspense fallback={<PageLoader />}><Blog /></Suspense>}></Route>
        <Route path='blog/:id' element={<Suspense fallback={<PageLoader />}><BlogPost /></Suspense>}></Route>

        <Route path='team' element={<Suspense fallback={<PageLoader />}><Team /></Suspense>}></Route>
        {/* Public team member profile */}
        <Route path='team/thinley-dhendup' element={<Suspense fallback={<PageLoader />}><TeamPortfolio /></Suspense>}></Route>
        <Route path='legal' element={<Suspense fallback={<PageLoader />}><Legal /></Suspense>}></Route>

        <Route element={<ProtectedRoute />}>
          <Route path='dashboard' element={<Suspense fallback={<PageLoader />}><Dashboard /></Suspense>}></Route>
          <Route path='portfolio/gallery/:id' element={<Suspense fallback={<PageLoader />}><ProjectGallery /></Suspense>}></Route>
          {/* Dynamic route for protected team members */}
          <Route path='team/:slug' element={<Suspense fallback={<PageLoader />}><TeamPortfolio /></Suspense>}></Route>
        </Route>
      </Route>

      {/* Admin Routes - Separate Layout */}
      <Route path="/admin" element={<Suspense fallback={<PageLoader />}><AdminLayout /></Suspense>}>
        <Route index element={<Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense>} />
        <Route path="dashboard" element={<Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense>} />
        <Route path="projects" element={<Suspense fallback={<PageLoader />}><ProjectAdmin /></Suspense>} />
        <Route path="team" element={<Suspense fallback={<PageLoader />}><TeamAdmin /></Suspense>} />
        <Route path="blog" element={<Suspense fallback={<PageLoader />}><BlogAdmin /></Suspense>} />
        <Route path="users" element={<Suspense fallback={<PageLoader />}><AdminManager /></Suspense>} />
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <Toaster position="top-right" />
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
)
