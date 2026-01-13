import React from 'react'
import rightArrow from '../assets/icons/rightArrow.svg'

function ButtonType1({title}) {
  return (
     <button className='border-b flex justify-between items-center gap-4 sm:gap-6 lg:gap-10 py-3 sm:py-4 lg:py-5 mt-6 sm:mt-8 lg:mt-10 cursor-pointer duration-200 hover:gap-8 sm:hover:gap-12 lg:hover:gap-20 hover:font-semibold text-sm sm:text-base'>{title}<span><img src={rightArrow} alt="rightArrow" className='w-4 h-4 sm:w-5 sm:h-5' /></span></button>
  )
}

export default ButtonType1