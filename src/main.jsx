import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Contact from './pages/Contact.jsx'
import Team from './pages/team/Team.jsx'
import About from './pages/About.jsx'
import Portfolio from './pages/portfolio/Portfolio.jsx'
import Blog from './pages/blog/Blog.jsx'
import BlogPost from './pages/blog/BlogPost.jsx'
import ProjectGallery from './pages/portfolio/ProjectGallery.jsx'
import Legal from './pages/Legal.jsx'
import TeamPortfolio from './pages/team/portfolios/TeamPortfolio.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Dashboard from './pages/Dashboard.jsx'

// Admin Components
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import ProjectAdmin from './pages/admin/ProjectAdmin.jsx'
import TeamAdmin from './pages/admin/TeamAdmin.jsx'
import BlogAdmin from './pages/admin/BlogAdmin.jsx'
import AdminManager from './pages/admin/AdminManager.jsx'

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
        {/* Public team member profile */}
        <Route path='team/thinley-dhendup' element={<TeamPortfolio />}></Route>
        <Route path='legal' element={<Legal />}></Route>

        <Route element={<ProtectedRoute />}>
          <Route path='dashboard' element={<Dashboard />}></Route>
          <Route path='portfolio/gallery/:id' element={<ProjectGallery />}></Route>
          {/* Dynamic route for protected team members */}
          <Route path='team/:slug' element={<TeamPortfolio />}></Route>
        </Route>
      </Route>

      {/* Admin Routes - Separate Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="projects" element={<ProjectAdmin />} />
        <Route path="team" element={<TeamAdmin />} />
        <Route path="blog" element={<BlogAdmin />} />
        <Route path="users" element={<AdminManager />} />
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
