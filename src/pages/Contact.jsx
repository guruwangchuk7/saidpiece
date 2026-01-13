import React from 'react'
import { NavLink } from 'react-router-dom'
import rightArrow from '../assets/icons/rightArrow.svg'
import p1 from '../assets/atsara.jpg'

function Contact() {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Back button - mobile responsive */}
      <NavLink 
        to="/" 
        className="absolute top-4 sm:top-6 lg:top-10 left-4 sm:left-6 lg:left-10 flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline z-10"
      >
        <img src={rightArrow} alt="back" className="w-3 h-3 sm:w-4 sm:h-4 rotate-180" />
        <span>Back to home</span>
      </NavLink>

      {/* Main content container - following home page padding patterns */}
      <div className="w-full px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">
        {/* Header section - modern and minimalistic */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-zinc-500 mb-2 sm:mb-3">Hello</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight uppercase">
            LET'S TALK?
          </h1>
        </div>

        {/* Contact block: text (left) + image (right) - responsive layout */}
        <div className="w-full flex justify-end">
          <section className="max-w-3xl w-full lg:w-[720px] flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
            {/* Left: contact text with thin top line */}
            <div className="w-full sm:flex-1 sm:max-w-sm border-t border-zinc-200 pt-3 sm:pt-4 pr-0 sm:pr-4 lg:pr-20">
              <h2 className="text-xs sm:text-sm text-zinc-600 mb-3 sm:mb-4">General contacts</h2>

              <div className="space-y-4 sm:space-y-5 text-zinc-700">
                <div className="flex flex-col gap-2 sm:gap-3">
                  <span className="font-medium text-sm sm:text-base">E:</span>
                  <a 
                    href="mailto:thinley@saidpiece.com" 
                    className="text-xs sm:text-sm lg:text-base text-zinc-600 hover:underline break-all"
                  >
                    thinley@saidpiece.com
                  </a>
                </div>

                <div className="flex flex-col gap-2 sm:gap-3">
                  <span className="font-medium text-sm sm:text-base">P:</span>
                  <div className="text-xs sm:text-sm lg:text-base text-zinc-600 space-y-1">
                    <div>
                      <a href="tel:+97517899794" className="hover:underline">+975 17899794</a> (BHT)
                    </div>
                    <div>
                      <a href="tel:+66931205085" className="hover:underline">+66 931205085</a> (TH)
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:gap-3">
                  <span className="font-medium text-sm sm:text-base">S.M:</span>
                  <span className="text-xs sm:text-sm lg:text-base text-zinc-600">Instagram, Facebook, LinkedIn</span>
                </div>
              </div>
            </div>

            {/* Right: image */}
            <div className="w-full sm:w-auto sm:flex-shrink-0 self-start">
              <img 
                src={p1} 
                alt="mask dancer" 
                className="w-full sm:w-[200px] md:w-[250px] lg:w-[300px] h-auto sm:h-[200px] md:h-[250px] lg:h-[300px] object-cover rounded-sm" 
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Contact