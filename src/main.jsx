import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext.jsx'
import { SiteContentProvider } from './context/SiteContentContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { Toaster } from 'react-hot-toast';

// Core Pages
import Home from './pages/home/Home.jsx';
import Contact from './pages/contact/index.jsx';
import Team from './pages/team/Team.jsx';
import About from './pages/about/index.jsx';
import Portfolio from './pages/portfolio/Portfolio.jsx';
import Blog from './pages/blog/Blog.jsx';

import BlogPost from './pages/blog/BlogPost.jsx';
import ProjectGallery from './pages/portfolio/ProjectGallery.jsx';
import Legal from './pages/legal/index.jsx';
import TeamPortfolio from './pages/team/portfolios/TeamPortfolio.jsx';
import Store from './pages/store/index.jsx';
import CategoryPage from './pages/store/CategoryPage.jsx';
import ProductDetail from './pages/store/ProductDetail.jsx';
import Foundation from './pages/foundation/index.jsx';
const Dashboard = lazy(() => import('./pages/dashboard/index.jsx'));

// Lazy Load Admin Components
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout.jsx'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'));
const ProjectAdmin = lazy(() => import('./pages/admin/ProjectAdmin.jsx'));
const StoreAdmin = lazy(() => import('./pages/admin/StoreAdmin.jsx'));
const TeamAdmin = lazy(() => import('./pages/admin/TeamAdmin.jsx'));
const BlogAdmin = lazy(() => import('./pages/admin/BlogAdmin.jsx'));
const AdminManager = lazy(() => import('./pages/admin/AdminManager.jsx'));
const MessagesAdmin = lazy(() => import('./pages/admin/MessagesAdmin.jsx'));
const SiteContentAdmin = lazy(() => import('./pages/admin/SiteContentAdmin.jsx'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900"></div>
  </div>
);

import SEO from './components/common/SEO.jsx';

// Catch-all route for 404
const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
    <SEO title="404 - Page Not Found" noindex={true} />
    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-zinc-900">404</h1>
    <p className="text-lg text-zinc-600 mb-8">The page you are looking for doesn't exist or has been moved.</p>
    <a href="/" className="px-6 py-3 bg-zinc-900 text-white rounded-full hover:bg-zinc-800 transition-colors">
      Return to Home
    </a>
  </div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Home />}></Route>
        <Route path='about' element={<About />}></Route>
        <Route path='contact' element={<Contact />}></Route>
        <Route path='portfolio' element={<Portfolio />}></Route>
        <Route path='blog' element={<Blog />}></Route>
        <Route path='blog/:id' element={<BlogPost />}></Route>
        <Route path='team' element={<Team />}></Route>

        {/* Team member profiles - All public */}
        <Route path='team/:slug' element={<TeamPortfolio />}></Route>

        <Route path='store' element={<Store />}></Route>
        <Route path='store/:slug' element={<CategoryPage />}></Route>
        <Route path='store/product/:id' element={<ProductDetail />}></Route>
        <Route path='foundation' element={<Foundation />}></Route>
        <Route path='legal' element={<Legal />}></Route>
        <Route path='portfolio/:id' element={<ProjectGallery />}></Route>

        <Route element={<ProtectedRoute />}>
          <Route path='dashboard' element={<Suspense fallback={<PageLoader />}><Dashboard /></Suspense>}></Route>
          <Route path='portfolio/gallery/:id' element={<ProjectGallery />}></Route>
        </Route>

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin Routes - Separate Layout */}
      <Route path="/admin" element={<Suspense fallback={<PageLoader />}><AdminLayout /></Suspense>}>
        <Route index element={<Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense>} />
        <Route path="dashboard" element={<Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense>} />
        <Route path="projects" element={<Suspense fallback={<PageLoader />}><ProjectAdmin /></Suspense>} />
        <Route path="store" element={<Suspense fallback={<PageLoader />}><StoreAdmin /></Suspense>} />
        <Route path="team" element={<Suspense fallback={<PageLoader />}><TeamAdmin /></Suspense>} />
        <Route path="blog" element={<Suspense fallback={<PageLoader />}><BlogAdmin /></Suspense>} />
        <Route path="messages" element={<Suspense fallback={<PageLoader />}><MessagesAdmin /></Suspense>} />
        <Route path="site-content" element={<Suspense fallback={<PageLoader />}><SiteContentAdmin /></Suspense>} />
        <Route path="users" element={<Suspense fallback={<PageLoader />}><AdminManager /></Suspense>} />
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <SiteContentProvider>
          <CartProvider>
            <Toaster position="top-right" />
            <RouterProvider router={router} />
          </CartProvider>
        </SiteContentProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
)
