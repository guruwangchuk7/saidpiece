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
  <div className={`font-semibold flex justify-between items-center px-2 lg:px-10 py-2 relative`}> 
      <div className='text-xl w-60 text-start'>SAIDPIECE</div>
      <div className='absolute left-1/2 -translate-x-1/2 font-normal text-[12px] lg:text-[14px] text-center'>
        STORE / ART FOUNDATION
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