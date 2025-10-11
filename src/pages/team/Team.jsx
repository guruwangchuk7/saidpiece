import React from 'react'
import { NavLink } from 'react-router-dom'
import rightArrow from '../../assets/icons/rightArrow.svg'
import BtnT1 from '../../components/ButtonType1'

const Team = () => {
  return (
  <div className="min-h-screen relative flex items-start justify-center lg:justify-start bg-white px-4 lg:px-20 py-10">
      <NavLink to="/" className="absolute top-10 left-4 flex items-center gap-2 text-sm font-medium hover:underline">
        <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
        <span>Back to home</span>
      </NavLink>

  <div className="w-full lg:w-1/2 max-w-4xl mt-24 flex flex-col gap-4">
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight uppercase">Professionals</h1>
        <p className="text-zinc-600 text-lg leading-relaxed">
          Where creative minds gather, and brilliant ideas come to life 
          transforming vision into reality through collaboration, innovation,
          and bold thinking.
        </p>
        <div className="mt-1">
          <BtnT1 title="Contact Us" to="/contact" />
        </div>
      </div>
    </div>
  )
}

export default Team