import { button } from 'motion/react-client'
import React from 'react'
import rightArrow from '../assets/icons/rightArrow.svg'

function ButtonType2({title, idx}) {
  return (
    <button className='btn2 flex gap-4 sm:gap-6 lg:gap-10 justify-between w-full lg:min-w-[400px] py-3 sm:py-4 lg:py-5 border-b border-zinc-300'>
        <div className='flex gap-3 sm:gap-5 lg:gap-10'>
          <div className='font-semibold text-sm sm:text-base text-black/40 flex-shrink-0'>0{idx}</div><div className='txt text-left text-sm sm:text-base lg:text-base duration-300'>{title}</div>
        </div>
        <img src={rightArrow} alt="rightArrow" className='image duration-300 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0' />
    </button>
  )
}

export default ButtonType2