import { button } from 'motion/react-client'
import React from 'react'
import rightArrow from '../assets/icons/rightArrow.svg'

function ButtonType2({title, idx}) {
  return (
    <button className='btn2 flex gap-10 justify-between min-w-50 py-5 border-b border-zinc-300'>
        <div className='flex gap-10'>
          <div className='font-semibold text-black/40'>0{idx}</div><div className='txt text-left duration-300'>{title}</div>
        </div>
        <img src={rightArrow} alt="rightArrow" className='image duration-300' />
    </button>
  )
}

export default ButtonType2