import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import Btn2 from "../../components/ButtonType2";
import BtnT1 from "../../components/ButtonType1";
import img1 from "../../assets/project-photo/1.jpg";
import img2 from "../../assets/project-photo/2.jpg";
import img3 from "../../assets/project-photo/3.jpg";
import img4 from "../../assets/project-photo/4.jpg";

const portfolioData = {
  name: [
    "FUTAGO HOUSE",
    "UNDERGROUND HOUSE PLAN B",
    "CLOCK TOWER",
    "DUPLIX HOUSE",
  ],
  image: [img1, img2, img3, img4],
};

function H4() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const projectRefs = React.useRef([]);

  const handleScroll = (index) => {
    projectRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
    }),
    center: {
      x: 0,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
    }),
  };

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % portfolioData.image.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + portfolioData.image.length) % portfolioData.image.length);
  };

  return (
    <div className="bg-white md:min-h-screen text-[#333333] font-sans selection:bg-zinc-800 selection:text-white">
      <div className="flex flex-col md:flex-row relative">
        {/* Desktop Left Column: Sticky Sidebar */}
        <div className="hidden md:flex w-full md:w-[40%] px-6 md:px-12 py-10 md:h-screen md:sticky md:top-0 flex-col z-10">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-light tracking-tighter mb-16 mt-10"
          >
            PORTFOLIO
          </motion.h1>
          <div className="w-full flex-1 flex flex-col gap-2">
            {portfolioData.name.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 10 }}
                className="group cursor-pointer"
                onClick={() => handleScroll(index)}
              >
                <Btn2 title={item} idx={index + 1} active={activeIndex === index} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop Right Column: Scrollable Gallery */}
        <div className="hidden md:flex w-full md:w-[60%] px-4 sm:px-6 md:px-12 py-6 md:py-20 flex-col gap-12 sm:gap-16 md:gap-24 lg:gap-32">
          {portfolioData.image.map((item, index) => (
            <motion.div
              key={index}
              ref={(el) => (projectRefs.current[index] = el)}
              onViewportEnter={() => setActiveIndex(index)}
              viewport={{ amount: 0.5 }}
              className="w-full"
            >
              <motion.img
                src={item}
                alt={`Project ${index + 1}`}
                className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[85vh] object-cover shadow-zinc-900/5 transition-transform duration-700 ease-out hover:scale-[1.02]"
                animate={
                  index === 2 && activeIndex === 2
                    ? {
                      objectPosition: ["center top", "center bottom"],
                    }
                    : { objectPosition: "center center" }
                }
                transition={
                  index === 2 && activeIndex === 2
                    ? {
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "linear",
                    }
                    : { duration: 0.5 }
                }
              />
              <div className="mt-3 sm:mt-4 text-center md:text-left">
                <span className="text-sm sm:text-base font-medium block">{portfolioData.name[index]}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Portfolio Section */}
        <div className="md:hidden w-full px-4 sm:px-5 py-6 sm:py-8">
          {/* Mobile Portfolio Header */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-neutral-900"
          >
            PORTFOLIO
          </motion.h1>

          {/* Mobile Carousel Container */}
          <div className="relative overflow-hidden rounded-lg">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full absolute inset-0"
              >
                <img
                  src={portfolioData.image[activeIndex]}
                  alt={portfolioData.name[activeIndex]}
                  className="w-full h-[60vh] sm:h-[65vh] object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="w-full h-[60vh] sm:h-[65vh]"></div>

            {/* Mobile Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-white/85 hover:bg-white rounded-full flex items-center justify-center transition-all z-10 shadow-md"
              aria-label="Previous project"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-white/85 hover:bg-white rounded-full flex items-center justify-center transition-all z-10 shadow-md"
              aria-label="Next project"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Mobile Project Info */}
          <div className="mt-3 sm:mt-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-neutral-900">{portfolioData.name[activeIndex]}</h3>
              <p className="text-xs text-neutral-500 mt-0.5">Project {activeIndex + 1} of {portfolioData.name.length}</p>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex gap-1.5 mt-3">
            {portfolioData.name.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-1 transition-all duration-300 rounded-full ${activeIndex === index ? "bg-neutral-900 w-6" : "bg-neutral-300 w-2"
                  }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile All Projects Button */}
          <div className="mt-4 sm:mt-6">
            <NavLink to="/portfolio">
              <BtnT1 title="ALL PROJECTS" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default H4;