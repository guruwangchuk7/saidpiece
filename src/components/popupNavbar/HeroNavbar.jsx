import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence, easeInOut } from "motion/react";
import { useNav } from "./VisiblityContext";
import rightArrowWhite from "../../assets/icons/rightArrowWhite.svg";
import { useAuth } from "../../context/AuthContext";
import Footer from "../Footer";

const HeroNavbar = () => {
  const { open, close } = useNav();
  const { user, setShowAuthModal, signOut } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => setMounted(true), []);

  const container =
    mounted && typeof document !== "undefined"
      ? document.getElementById("navbar")
      : null;

  if (!container) return null;

  const data = [
    { to: "/", title: "HOMEPAGE" },
    { to: "about", title: "ABOUT" },
    { to: "portfolio", title: "PROJECTS" },
    { to: "team", title: "TEAM" },
    { to: "contact", title: "CONTACT" },
  ];

  const variants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 },
  };

  // Get user's first name
  const getUserName = () => {
    if (!user) return "";
    const full_name =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "User";
    return full_name.split(" ")[0];
  };

  // Get user's avatar URL
  const getAvatarUrl = () => {
    if (!user) return null;
    return (
      user.user_metadata?.avatar_url || user.user_metadata?.picture || null
    );
  };

  const handleLogout = async () => {
    await signOut();
    setShowDropdown(false);
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-30 h-screen w-screen bg-zinc-900 p-10 text-slate-100"
          variants={variants}
          initial={{ y: -1000, opacity: 0, scale: 1 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 1000, opacity: 0, scale: 1.5 }}
          transition={{ duration: 1, ease: easeInOut }}
        >
          <button
            onClick={close}
            className="absolute top-6 right-6 cursor-pointer text-3xl"
          >
            ×
          </button>

          <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-20 w-full">
            <div className="p-2 w-full lg:w-auto">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold font-century-gothic">STUDIO</h1>
              <nav className="mt-10 flex flex-col gap-5">
                {data.map((item, idx) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={close}
                    className="btn3 flex items-center justify-between text-lg md:text-xl w-[85%] md:w-100"
                  >
                    <span className="txt">1.{idx + 1}  {item.title}</span>
                    <img src={rightArrowWhite} alt="" className="image w-8" />
                  </NavLink>
                ))}
              </nav>

            </div>

            <div className="p-2 text-left flex flex-col justify-end pb-10 lg:pr-32 w-full lg:w-auto">
              <div className="hidden lg:flex flex-col gap-6 text-xl font-light text-[gray]">

                {/* Header */}
                <div className="text-base text-white mb-2">General contacts</div>

                {/* Email Section */}
                <div className="flex flex-col gap-2">
                  <span>E:</span>
                  <a href="mailto:thinley@saidpiece.com" className="w-fit border-b border-gray-500 hover:border-white hover:text-white transition-all duration-300">
                    thinley@saidpiece.com
                  </a>
                </div>

                {/* Phone Section */}
                <div className="flex flex-col gap-2">
                  <span>P:</span>
                  <div className="flex flex-col">
                    <span className="w-fit">
                      +975 17899794 (BHT)
                    </span>
                    <span className="w-fit">
                      +66 931205085 (TH)
                    </span>
                  </div>
                </div>

                {/* Social Media Section */}
                <div className="flex flex-col gap-2">
                  <span className="w-fit">S.M:</span>
                  <div className="flex flex-wrap gap-x-1 max-w-[250px]">
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-all duration-300">Instagram,</a>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition-all duration-300">Facebook,</a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-all duration-300">LinkedIn</a>
                  </div>
                </div>

              </div>

              {/* Contact Us Button - Styled like Footer/Navbar List */}
              <NavLink to="/contact" onClick={close} className="btn3 mt-10 md:mt-6 -translate-y-[2cm] md:translate-y-0 flex items-center gap-10 py-4 w-fit">
                <span className="txt text-base tracking-widest">CONTACT US</span>
                <img src={rightArrowWhite} alt="" className="image w-6" />
              </NavLink>

              {/* Login/User Profile Section */}
              <div className="mt-6 md:mt-2 -translate-y-[2cm] md:translate-y-0">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="btn3 flex items-center gap-6 py-4 w-fit group"
                    >
                      {getAvatarUrl() ? (
                        <img
                          src={getAvatarUrl()}
                          alt={getUserName()}
                          className="w-8 h-8 rounded-full object-cover border-2 border-zinc-700"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold">
                          {getUserName().charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="txt text-base tracking-widest uppercase">
                        HI, {getUserName()}
                      </span>
                      <svg
                        className={`w-4 h-4 text-white transition-transform duration-300 ${showDropdown ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {showDropdown && (
                      <div className="absolute left-0 mt-4 w-64 bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden shadow-2xl z-50">
                        <div className="px-6 py-4 border-b border-zinc-700">
                          <p className="text-sm font-medium text-white">
                            {user.user_metadata?.full_name || user.email}
                          </p>
                          <p className="text-xs text-zinc-400 truncate mt-1">
                            {user.email}
                          </p>
                        </div>
                        <NavLink
                          to="/dashboard"
                          onClick={() => {
                            setShowDropdown(false);
                            close();
                          }}
                          className="block px-6 py-4 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors"
                        >
                          Dashboard
                        </NavLink>
                        <button
                          onClick={() => {
                            handleLogout();
                            close();
                          }}
                          className="w-full text-left px-6 py-4 text-sm text-red-400 hover:bg-red-900/20 transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      sessionStorage.setItem("intendedRoute", window.location.pathname);
                      setShowAuthModal(true);
                    }}
                    className="btn3 flex items-center gap-10 py-4 w-fit"
                  >
                    <span className="txt text-base tracking-widest uppercase">
                      LOGIN
                    </span>
                    <img src={rightArrowWhite} alt="" className="image w-6" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    container
  );
};

export default HeroNavbar;