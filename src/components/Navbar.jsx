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
    <div className={`font-semibold flex justify-between px-2 lg:px-10 py-2`}> 
        <div className='text-xl w-60 text-start'>SAIDPIECE</div>
        <div className='w-60 text-center font-normal text-[14px] hidden lg:flex'>STORE / ART FOUNDATION</div>
         {/* <div className='w-60 flex justify-end'>
             {
                isOpen?<img src={ham} alt="menu" className='' onClick={toggleMenu} /> : <img src={close} alt="close" onClick={toggleMenu} />
             }
         </div> */}
    </div>
  )
}

export default Navbar