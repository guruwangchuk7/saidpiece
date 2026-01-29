import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ham from '../assets/icons/ham.svg'
import close from '../assets/icons/close.svg'
import { useAuth } from '../context/AuthContext'

function Navbar() {

  const [isOpen, setIsOpen] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, setShowAuthModal, signOut } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  // Get user's first name from metadata or email
  const getUserName = () => {
    if (!user) return '';
    const full_name = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User';
    return full_name.split(' ')[0];
  };

  // Get user's avatar URL
  const getAvatarUrl = () => {
    if (!user) return null;
    return user.user_metadata?.avatar_url ||
      user.user_metadata?.picture ||
      null;
  };

  const handleLogout = async () => {
    await signOut();
    setShowDropdown(false);
  };

  return (
    <div className={`font-semibold flex justify-between items-center px-3 sm:px-5 lg:px-10 py-2 relative`}>
      <div className='text-base sm:text-lg lg:text-xl w-40 sm:w-52 lg:w-60 text-start logo font-bold' style={{ fontFamily: "century-gothic" }}>
        <span style={{ color: "#555555" }} className="font-light">said</span><span style={{ opacity: 0.95 }}>piece</span>
      </div>
      <div className='hidden md:flex absolute left-1/2 -translate-x-1/2 font-normal text-[12px] lg:text-[14px] text-center flex-col gap-1 items-center'>
        <div>STORE / ART FOUNDATION</div>
      </div>

      {/* Login Button / User Profile */}
      <div className='flex items-center justify-end gap-2 relative w-40 sm:w-52 lg:w-60 pr-14'>
        {user ? (
          <div className='relative'>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className='flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity -mt-1'
            >
              {/* User Avatar */}
              {getAvatarUrl() ? (
                <img
                  src={getAvatarUrl()}
                  alt={getUserName()}
                  className='w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full object-cover border-2 border-gray-200'
                />
              ) : (
                <div className='w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-black text-white flex items-center justify-center text-[10px] sm:text-xs font-bold'>
                  {getUserName().charAt(0).toUpperCase()}
                </div>
              )}

              {/* User Name - Hidden on mobile */}
              <span className='hidden sm:block text-[11px] lg:text-xs font-medium text-gray-700'>
                Hi, {getUserName()}
              </span>

              {/* Dropdown Arrow */}
              <svg
                className='w-4 h-4 text-gray-600 hidden sm:block'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <>
                {/* Backdrop to close dropdown */}
                <div
                  className='fixed inset-0 z-10'
                  onClick={() => setShowDropdown(false)}
                />

                <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20'>
                  <div className='px-4 py-2 border-b border-gray-100'>
                    <p className='text-sm font-medium text-gray-900'>{getUserName()}</p>
                    <p className='text-xs text-gray-500 truncate'>{user.email}</p>
                  </div>
                  <NavLink
                    to='/dashboard'
                    onClick={() => setShowDropdown(false)}
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors'
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <button
            onClick={() => {
              console.log('Login button clicked in Navbar');
              sessionStorage.setItem('intendedRoute', window.location.pathname);
              setShowAuthModal(true);
            }}
            className='text-[11px] sm:text-xs lg:text-sm font-medium text-gray-700 underline hover:text-black transition-colors -mt-3 mr-2 sm:mr-5'
          >
            Login
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar