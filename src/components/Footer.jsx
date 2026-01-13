import { div } from 'motion/react-client'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import ButtonType2 from './ButtonType2'

function AllRightReserved() {
  return (
    <>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 px-4 sm:px-6 lg:px-10 mt-8 sm:mt-10 py-4 sm:py-2 text-xs sm:text-sm lg:text-sm'>
        <p>SAIDPIECE © 2023–2026</p>
        <NavLink to={'/legal'} className={`hidden lg:flex`}>Terms of conditions and Privacy policy</NavLink>
        <NavLink to={'greenRoom'} className='text-xs sm:text-sm lg:text-sm'>Website by KodaDev Studio</NavLink>
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
        <div className='flex flex-col sm:flex-row sm:flex-wrap gap-6 sm:gap-4 lg:gap-0 sm:justify-between px-4 sm:px-6 lg:px-10 mt-8 sm:mt-10'>
          <div className='space-y-2'>
            <p className='text-sm sm:text-base text-zinc-500'>E:</p>
            <p className='text-sm sm:text-base'><a href="mailto:thinley@saidpiece.com" className='hover:underline'>thinley@saidpiece.com</a></p>
          </div>
          <div className='space-y-2'>
            <p className='text-sm sm:text-base text-zinc-500'>T:</p>
            <div className='space-y-1'>
              <p className='text-sm sm:text-base'> <a href="tel:+975 17899794" className='underline underline-offset-4'>+975 17899794</a> (BHT) </p>
              <p className='text-sm sm:text-base'> <a href="tel:+66 931205085" className='underline underline-offset-4'>+66 931205085</a> (TH) </p>
            </div>
          </div>
          <div className='space-y-2'>
            <p className='text-sm sm:text-base text-zinc-500'>S.L:</p>
            <div className='flex gap-4 sm:gap-3'>
              <NavLink to={''} className='text-sm sm:text-base hover:underline'>Instagram</NavLink>
              <NavLink to={''} className='text-sm sm:text-base hover:underline'>Facebook</NavLink>
              <NavLink to={''} className='text-sm sm:text-base hover:underline'>LinkedIn</NavLink>
            </div>
          </div>
          <div className='w-full sm:w-auto'>
            <NavLink to={'/contact'}>
              <ButtonType2
                title={'Contact'}
                idx={0}
              ></ButtonType2>
            </NavLink>
          </div>
        </div>
      )}
      <AllRightReserved/>
    </div>
  )
}

export default Footer