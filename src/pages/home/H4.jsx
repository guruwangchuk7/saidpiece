import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import Btn2 from "../../components/common/ButtonType2";
import BtnT1 from "../../components/common/ButtonType1";
import img1 from "../../assets/project-photo/clocktower.webp";
import img2 from "../../assets/project-photo/electricity.webp";
import img3 from "../../assets/project-photo/bhutanbank.webp";
import img4 from "../../assets/project-photo/YangkhilProjectDocumentation.webp";

const portfolioData = {
  name: [
    "BHUTAN NATIONAL BANK",
    "CLOCK TOWER REDEVELOPMENT",
    "ELECTRICITY REGOLATORY",
    "YANGKHIL CAFE"
  ],
  image: [img3, img1, img2, img4],
};

function H4() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const projectRefs = React.useRef([]);

  const handleScroll = (index) => {
    projectRefs.current[index]?.scrollIntoView({ behavior: "auto", block: "center" });
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
        <div className="hidden md:flex w-full md:w-[40%] px-3 sm:px-5 lg:px-10 pt-10 pb-20 md:h-screen md:sticky md:top-0 flex-col z-10 justify-between overflow-y-auto no-scrollbar">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-light tracking-tighter mb-16 mt-10"
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <NavLink to="/portfolio">
              <BtnT1 title="ALL PROJECTS" />
            </NavLink>
          </motion.div>
        </div>

        <div className="hidden md:flex w-full md:w-[60%] px-3 sm:px-5 lg:px-10 py-6 md:py-20 flex-col gap-8">
          {portfolioData.image.map((item, index) => (
            <motion.div
              key={index}
              ref={(el) => (projectRefs.current[index] = el)}
              onViewportEnter={() => setActiveIndex(index)}
              viewport={{ amount: 0.5 }}
              className="w-full group" // Added group for nested hover trigger
            >
              <div className="overflow-hidden"> {/* Container to keep the frame fixed */}
                <motion.img
                  src={item}
                  alt={`Project ${index + 1}`}
                  className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[95vh] object-cover shadow-zinc-900/5 transition-transform duration-1000 ease-out group-hover:scale-110" // Frame fixed, image zooms
                  loading="eager"
                  animate={
                    index === 0 && activeIndex === 0
                      ? {
                        objectPosition: ["center top", "center bottom"],
                      }
                      : { objectPosition: "center center" }
                  }
                  transition={
                    index === 0 && activeIndex === 0
                      ? {
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "linear",
                      }
                      : { duration: 0.5 }
                  }
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Portfolio Section */}
        <div className="md:hidden w-full bg-white px-4 py-8 flex flex-col gap-1">
          {/* Mobile Portfolio Header */}
          <div className="w-full mb-2">
            <h1 className="text-3xl font-normal tracking-wide text-zinc-900 uppercase">
              PORTFOLIO
            </h1>
          </div>

          {/* Mobile Touch-Enabled Carousel Container */}
          <div className="relative">
            <div
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-3"
              onScroll={(e) => {
                const scrollLeft = e.currentTarget.scrollLeft;
                const width = e.currentTarget.clientWidth;
                const newIndex = Math.round(scrollLeft / width);
                if (newIndex !== activeIndex) {
                  setActiveIndex(newIndex);
                }
              }}
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {portfolioData.image.map((img, idx) => (
                <div
                  key={idx}
                  className="snap-center shrink-0 w-[85%] flex flex-col gap-2"
                >
                  {/* Image Frame */}
                  <div className="w-full aspect-square bg-white shadow-sm overflow-hidden">
                    <img
                      src={img}
                      alt={portfolioData.name[idx]}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Project Info Below Image */}
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-base font-medium tracking-tight text-zinc-800 uppercase">
                        {portfolioData.name[idx]}
                      </h3>
                      {/* Removed arrow-line div as requested */}
                    </div>
                    <div className="h-[1px] w-full bg-zinc-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile All Projects Link */}
          <div className="-mt-4 w-[96%] mx-auto flex justify-start">
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
