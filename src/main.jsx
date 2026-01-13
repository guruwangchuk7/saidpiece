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
import Legal from './pages/Legal.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
        <Route index element={<Home/>}></Route>
         <Route path='about' element={<About/>}></Route>
        <Route path='contact' element={<Contact/>}></Route>
        <Route path='portfolio' element={<Portfolio/>}></Route>
        <Route path='team' element={<Team/>}></Route>
        <Route path='legal' element={<Legal/>}></Route>
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

