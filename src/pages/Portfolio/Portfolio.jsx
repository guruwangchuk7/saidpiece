import React from 'react'
import { NavLink } from 'react-router-dom'
import rightArrow from '../../assets/icons/rightArrow.svg'
import BtnT1 from '../../components/ButtonType1'

const Portfolio = () => {
  return (
    <div className="min-h-screen relative flex items-start justify-center bg-white px-4 lg:px-20 py-10">
      <NavLink to="/" className="absolute top-10 left-4 flex items-center gap-2 text-sm font-medium hover:underline">
        <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
        <span>Back to home</span>
      </NavLink>

      <div className="w-full lg:flex-row items-center justify-between px-6 lg:px-20 py-30">
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight uppercase ">Portfolio</h1>
        <p className="text-zinc-600 text-lg leading-relaxed">Our projects embody Saidpiece’s commitment to cultural <br /> authenticity, innovation,
        and sustainability. Each work is a unique <br /> reflection of the client’s vision,
        harmonized with Bhutanese tradition and modern design.</p>
        <div className="mt-1">
          <BtnT1 title="Contact Us" to="/contact" />
        </div>
      </div>
      
    </div>
  )
}

export default Portfolio
