import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router";
import { motion, AnimatePresence, easeInOut } from "motion/react";
import { useNav } from "./VisiblityContext";
import rightArrowWhite from "../../assets/icons/rightArrowWhite.svg";
import Footer from "../Footer";

const HeroNavbar = () => {
  const { open, close } = useNav();
  const [mounted, setMounted] = useState(false);
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
    { to: "store", title: "STORE" },
  ];

  const variants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 },
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
                    className="btn3 flex items-center justify-between text-xl w-100"
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
              <NavLink to="/contact" onClick={close} className="btn3 mt-2 lg:mt-6 flex items-center gap-10 py-4 w-fit">
                <span className="txt text-base tracking-widest">CONTACT US</span>
                <img src={rightArrowWhite} alt="" className="image w-6" />
              </NavLink>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    container
  );
};

export default HeroNavbar;