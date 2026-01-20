import { motion } from "motion/react";
import React, { useState } from "react";
import Btn2 from "../../components/ButtonType2";
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

  return (
    <div className="bg-white min-h-screen text-[#333333] font-sans selection:bg-zinc-800 selection:text-white">
      <div className="flex flex-col md:flex-row relative">
        {/* Left Column: Sticky Sidebar */}
        <div className="w-full md:w-[40%] px-6 md:px-12 py-10 md:h-screen md:sticky md:top-0 flex flex-col z-10">
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
                className="group"
              >
                <Btn2 title={item} idx={index + 1} active={activeIndex === index} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Scrollable Gallery */}
        <div className="w-full md:w-[60%] px-4 md:px-12 py-10 md:py-20 flex flex-col gap-24 md:gap-32">
          {portfolioData.image.map((item, index) => (
            <motion.div
              key={index}
              onViewportEnter={() => setActiveIndex(index)}
              viewport={{ amount: 0.5 }}
              className="w-full"
            >
              <img
                src={item}
                alt={`Project ${index + 1}`}
                className="w-full h-[60vh] md:h-[85vh] object-cover shadow-zinc-900/5 transition-transform duration-700 ease-out"
              />
              <div className="mt-4 flex justify-between items-end border-t border-zinc-300 pt-4 overflow-hidden">
                <span className="text-xs font-mono uppercase tracking-widest opacity-60">0{index + 1} — Project</span>
                <span className="text-sm font-medium">{portfolioData.name[index]}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default H4;