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
          initial={{y:-1000 , opacity:0 , scale:1}}
          animate={{y:0 , opacity:1 , scale:1}}
          exit={{y:1000 , opacity:0 , scale:1.5}}
          transition={{ duration:1 , ease:easeInOut}}
        >
          <button
            onClick={close}
            className="absolute top-6 right-6 cursor-pointer text-3xl"
          >
            ×
          </button>

          <div className="flex justify-between gap-20">
            <div className="p-2">
              <h1 className="text-5xl">STUDIO</h1>
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    container
  );
};

export default HeroNavbar;