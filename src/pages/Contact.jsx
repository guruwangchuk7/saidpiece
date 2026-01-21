import React from 'react'
import { NavLink } from 'react-router-dom'
import rightArrow from '../assets/icons/rightArrow.svg'
import p1 from '../assets/saidpieceofficeimage.jpg'

function Contact() {
  return (
    <div className="min-h-screen relative flex items-start justify-center bg-white px-4 lg:px-20 py-10">
      <NavLink to="/" className="absolute top-10 left-4 flex items-center gap-2 text-sm font-medium hover:underline">
        <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
        <span>Back to home</span>
      </NavLink>
      <div className="w-full lg:flex-row items-center justify-between px-6 py-20 mt-10">
        <p className="text-xl lg:text-2xl text-zinc-500">Hello</p>
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight uppercase ">LET'S TALK?</h1>
        </div>
        {/* Right-aligned grouped contact block: text (left) + image (right) */}
        <div className="w-full flex justify-end px-6 py-20">
          <section className="max-w-3xl w-full lg:w-[720px] flex items-start gap-8 pr-6">
            {/* Left: contact text with thin top line */}
            <div className="flex-1 max-w-sm border-t border-zinc-200 pt-2 pr-4 lg:pr-20">
              <h2 className="text-sm text-zinc-600 mb-2">General contacts</h2>

              <div className="space-y-3 text-zinc-700">
                <div className="flex flex-col gap-4">
                  <span className="font-medium">E:</span>
                  <a href="mailto:thinley@saidpiece.com" className="text-zinc-600 hover:underline">thinley@saidpiece.com</a>
                </div>

                <div className="flex flex-col gap-4">
                  <span className="font-medium">P:</span>
                  <div className="text-zinc-600">
                    <div>+975 17899794 (BHT)</div>
                    <div>+66 931205085 (TH)</div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <span className="font-medium">S.M:</span>
                  <span className="text-zinc-600">Instagram, Facebook, LinkedIn</span>
                </div>
              </div>
            </div>
            <div className="w-125 h-125 self-start">
              <img src={p1} alt="mask dancer" className="w-full h-full object-cover rounded-sm" />
            </div>
          </section>
        </div>
    </div>
    
  )
}

export default Contact