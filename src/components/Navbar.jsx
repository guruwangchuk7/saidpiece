import React, { use, useState } from 'react'
import {NavLink} from 'react-router-dom'
import ham from '../assets/icons/ham.svg'
import close from '../assets/icons/close.svg'

function Navbar() {

    const [isOpen , setIsOpen] = useState(true);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

  return (
  <div className={`font-semibold flex justify-between items-center px-3 sm:px-5 lg:px-10 py-2 relative`}> 
      <div className='text-base sm:text-lg lg:text-xl w-40 sm:w-52 lg:w-60 text-start logo font-bold' style={{ fontFamily: "century-gothic" }}>
        <span style={{ color: "#555555" }} className="font-light">said</span><span style={{ opacity: 0.95 }}>piece</span>
      </div>
      <div className='hidden md:flex absolute left-1/2 -translate-x-1/2 font-normal text-[12px] lg:text-[14px] text-center flex-col gap-1 items-center'>
        <div>STORE / ART FOUNDATION</div>
      </div>
         {/* <div className='w-60 flex justify-end'>
             {
                isOpen?<img src={ham} alt="menu" className='' onClick={toggleMenu} /> : <img src={close} alt="close" onClick={toggleMenu} />
             }
         </div> */}
    </div>
  )
}

export default Navbar