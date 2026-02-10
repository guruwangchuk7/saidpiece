import React from 'react'
import rightArrow from '../../assets/icons/rightArrow.svg'

function ButtonType1({ title }) {
  return (
    <button className='border-b flex justify-between items-center gap-10 py-5 mt-10 cursor-pointer duration-200 hover:gap-20 hover:font-semibold'>{title}<span><img src={rightArrow} alt="rightArrow" className='' /></span></button>
  )
}

export default ButtonType1