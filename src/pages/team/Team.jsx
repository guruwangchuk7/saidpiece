import React from 'react'
import { NavLink } from 'react-router-dom'
import rightArrow from '../../assets/icons/rightArrow.svg'
import BtnT1 from '../../components/ButtonType1'

const Team = () => {
  return (
    <div className="min-h-screen relative flex items-start justify-center bg-white px-4 lg:px-20 py-10">
      <NavLink to="/" className="absolute top-10 left-4 flex items-center gap-2 text-sm font-medium hover:underline">
        <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
        <span>Back to home</span>
      </NavLink>

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 items-start mt-1">
          {/* Left column: large title */}
          <div className="col-span-1 pt-16 lg:pt-20 left transform -translate-x-12 lg:-translate-x-20 lg:-ml-60">
            <p className="text-xl lg:text-2xl text-zinc-500">Professionals</p>
            <h2 className="mt-4 text-4xl lg:text-6xl font-bold">MEET OUR PROFESSIONALS</h2>
              <p className="mt-3 text-zinc-600">Where creative minds gather, And brilliant ideas come to life</p>
              <NavLink to={'/contact'} style={{transform: 'translateY(-10cm)'}}>
                <BtnT1 title={'Contact us'} />
              </NavLink>
          </div>
        </div>
    </div>
  )
}

export default Team