import { div } from 'motion/react-client'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import ButtonType2 from './ButtonType2'

function AllRightReserved() {
  return (
    <>
      <div className='flex justify-between items-center px-2 lg:px-10 mt-10 py-2 text-[12px] lg:text-[14px]'>
        <p>SAIDPIECE © 2023–2026</p>
        <NavLink to={'/legal'} className={`hidden lg:flex`}>Terms of conditions and Privacy policy</NavLink>
        <NavLink to={'greenRoom'}>Website by Saidpiece</NavLink>
      </div>
    </>
  )
}

function Footer() {

  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  return (
    <div className=''>
      {/* hide contact info block on the Contact page */}
      {!isContactPage && (
        <div className='flex flex-col lg:flex-row lg:justify-between lg:flex-wrap px-2 lg:px-10 mt-4 sm:mt-6 lg:mt-10 gap-10 lg:gap-0'>
          <div className=''>
            <p>E:</p>
            <p className='mt-5'>
              <a href="mailto:thinley@saidpiece.com" className="underline underline-offset-4 transition duration-300 hover:scale-105">thinley@saidpiece.com</a>
            </p>
          </div>
          <div>
            <p>T:</p>
            <div className='mt-5'>
              <p> <a href="tel:+97517899794" className='underline underline-offset-4'>+975 17899794</a> (BHT) </p>
              <p> <a href="tel:+66931205085" className='underline underline-offset-4'>+66 931205085</a> (TH) </p>
            </div>
          </div>
          <div>
            <p>S.L:</p>
            <div className='mt-5 flex gap-3 flex-wrap'>
              <a href="https://www.instagram.com/saidpiece_architects?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 transition duration-300 hover:scale-105">Instagram</a>
              <a href="https://www.facebook.com/saidpiece.architects" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 transition duration-300 hover:scale-105">Facebook</a>
              <a href="https://www.linkedin.com/search/results/all/?keywords=saidpiece&origin=GLOBAL_SEARCH_HEADER&sid=Iyq" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 transition duration-300 hover:scale-105">LinkedIn</a>
            </div>
          </div>

          {/* Mobile Terms Link */}
          <div className='lg:hidden mt-5'>
            <NavLink to={'/legal'} className="underline underline-offset-4 text-[12px]">Terms of conditions and Privacy policy</NavLink>
          </div>

          <div>
            <NavLink to={'/contact'}>
              <ButtonType2
                title={'Contact'}
                idx={0}
              ></ButtonType2>
            </NavLink>
          </div>
        </div>
      )}
      <AllRightReserved />
    </div>
  )
}

export default Footer