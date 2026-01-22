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
import Store from './pages/store/store.jsx'
import ThinleyDhendupPortfolio from './pages/team/portfolios/ThinleyDhendupPortfolio.jsx'
import KinleyWangdiPortfolio from './pages/team/portfolios/KinleyWangdiPortfolio.jsx'
import AshPortfolio from './pages/team/portfolios/AshPortfolio.jsx'
import OceanRaiPortfolio from './pages/team/portfolios/OceanRaiPortfolio.jsx'
import TashiDendupPortfolio from './pages/team/portfolios/TashiDendupPortfolio.jsx'
import GuruWangchukPortfolio from './pages/team/portfolios/GuruWangchukPortfolio.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
        <Route index element={<Home/>}></Route>
         <Route path='about' element={<About/>}></Route>
        <Route path='contact' element={<Contact/>}></Route>
        <Route path='portfolio' element={<Portfolio/>}></Route>
        <Route path='team' element={<Team/>}></Route>
        <Route path='team/thinley-dhendup' element={<ThinleyDhendupPortfolio/>}></Route>
        <Route path='team/kinley-wangdi' element={<KinleyWangdiPortfolio/>}></Route>
        <Route path='team/ash' element={<AshPortfolio/>}></Route>
        <Route path='team/ocean-rai' element={<OceanRaiPortfolio/>}></Route>
        <Route path='team/tashi-dendup' element={<TashiDendupPortfolio/>}></Route>
        <Route path='team/guru-wangchuk' element={<GuruWangchukPortfolio/>}></Route>
        <Route path='legal' element={<Legal/>}></Route>
        <Route path='store' element={<Store/>}></Route>
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

