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
        <div>STORE | ART FOUNDATION</div>
      </div>

      <div className='flex items-center justify-end w-40 sm:w-52 lg:w-60 pr-14'>
        {/* Login button moved to Menu (HeroNavbar) */}
      </div>
    </div>
  )
}

export default Navbar