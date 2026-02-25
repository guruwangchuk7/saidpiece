import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSiteContent } from '../../context/SiteContentContext'

function Navbar() {
  const { content } = useSiteContent();

  const navData = content?.nav || { titlePart1: 'said', titlePart2: 'piece', tagline: 'STORE | ART FOUNDATION' };



  return (
    <div className={`font-semibold flex justify-between items-center px-3 sm:px-5 lg:px-10 py-2 relative`}>
      <NavLink to="/" className='text-base sm:text-lg lg:text-xl w-40 sm:w-52 lg:w-60 text-start logo font-bold cursor-pointer' style={{ fontFamily: "century-gothic" }}>
        <span style={{ color: "#555555" }} className="font-light">{navData.titlePart1}</span><span style={{ opacity: 0.95 }}>{navData.titlePart2}</span>
      </NavLink>
      <div className='hidden md:flex absolute left-1/2 -translate-x-1/2 font-normal text-[12px] lg:text-[14px] text-center flex-col gap-1 items-center'>
        <NavLink to="/store" className="relative group cursor-pointer pb-0.5">
          {navData.tagline}
          <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
      </div>

      <div className='flex items-center justify-end w-40 sm:w-52 lg:w-60 pr-14'>
        {/* Login button moved to Menu (HeroNavbar) */}
      </div>
    </div>
  )
}

export default Navbar