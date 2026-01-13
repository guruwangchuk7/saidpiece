import React from "react";
import mainBg from "../../assets/mainbg.svg";
import { motion, MotionConfig , useScroll } from "motion/react";

function H1() {

  return (
    <div>
      <div className="h-[50vh] sm:h-[60vh] lg:h-[85vh] flex justify-center items-center text-neutral-900 px-4">
        <MotionConfig transition={{ duration: 3, type: "spring" }}>
          <motion.div
            className="head text-center w-fit mx-auto"
            initial={{ opacity: 0, scale: 0.8, y: 0 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
          >
            <div className="logo font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl text-neutral-800">
              SAIDPIECE <span className="font-light">STUDIO</span>
            </div>
            <div className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 sm:mt-3 lg:mt-4 px-4 sm:px-6 md:px-8 lg:px-0 font-medium text-zinc-600">
              We Art the World powered by traditions, nature and innovations
            </div>
          </motion.div>
        </MotionConfig>
      </div>

      <div
        className="h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] xl:h-[80vh] border mx-3 sm:mx-6 md:mx-10 lg:mx-16 xl:mx-20 mt-8 sm:mt-12 lg:mt-0"
        style={{
          background: `url(${mainBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
}

export default H1;