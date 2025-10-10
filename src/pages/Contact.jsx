import React from 'react'
import { NavLink } from 'react-router-dom'
import rightArrow from '../assets/icons/rightArrow.svg'
import p1 from '../assets/p1.jpg'

function Contact() {
  return (
    <div className="min-h-screen relative flex items-start justify-center bg-white px-4 lg:px-20 py-10">
      {/* Back to home button slightly lower than the centered title */}
      <NavLink to="/" className="absolute top-10 left-4 flex items-center gap-2 text-sm font-medium hover:underline">
        <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
        <span>Back to home</span>
      </NavLink>

  <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-0 items-start">
        {/* Left column: large title */}
        <div className="col-span-1 pt-16 lg:pt-20 left transform -translate-x-6 lg:-translate-x-12 lg:-ml-18">
          <p className="text-xl lg:text-2xl text-zinc-500">Hello</p>
          <h1 className="mt-4 text-4xl lg:text-6xl font-bold">LET'S TALK?</h1>
        </div>

        {/* Middle column: contact block with thin top border */}
  <div style={{paddingRight: '8px'}} className="col-span-1 pt-8 lg:pt-10 border-t lg:border-t-0 lg:border-l lg:pl-45 border-zinc-200 transform lg:translate-x-27">
          <div className="lg:pl-4 lg:pt-6">
            <h3 className="font-semibold">General contacts</h3>
            <div className="mt-3 text-sm lg:text-base text-zinc-700">
              <p className="font-medium">E:</p>
              <p className="mt-1">thinley@saidpiece.com</p>

              <div className="mt-4">
                <p className="font-medium">P:</p>
                <p className="mt-1">+975 17899794 (BHT)</p>
                <p className="mt-1">+66 931205085 (TH)</p>
              </div>

              <div className="mt-4">
                <p className="font-medium">S.M:</p>
                <p className="mt-1">Instagram, Facebook, LinkedIn</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: image */}
        <div className="col-span-1 flex justify-center lg:justify-end pt-8 lg:pt-16 transform lg:translate-x-20">
          <div style={{width: '100%', maxWidth: '300px'}} className="aspect-square w-full overflow-hidden">
            <img src={p1} alt="contact" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact