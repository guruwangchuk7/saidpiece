import React from "react";
import mainBg from "../../assets/homephoto/mainbg.svg";
import { motion, MotionConfig, useScroll } from "motion/react";

function H1() {

  return (
    <div>
      <div className="h-[100vh] sm:h-[60vh] lg:h-[90vh] flex justify-center items-center text-neutral-900 px-4">
        <MotionConfig transition={{ duration: 3, type: "spring" }}>
          <motion.div
            className="head text-center w-fit mx-auto -mt-44 md:-mt-20"
            initial={{ opacity: 0, scale: 0.8, y: 0 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            style={{ fontFamily: "century-gothic" }}
          >
            <div className="logo font-bold text-2xl sm:text-3xl md:text-5xl text-neutral-800 lg:text-7xl" style={{ fontFamily: "century-gothic" }}>
              <span style={{ color: "#555555" }} className="font-light">said</span><span style={{ opacity: 0.95 }}>piece</span> <span className="font-light">architects</span>
            </div>
          </motion.div>
        </MotionConfig>
      </div>

      <div
        className="h-[60vh] sm:h-[70vh] md:h-[80vh] border mx-3 sm:mx-5 md:mx-10 lg:mx-20 mt-10 sm:mt-[40vh] lg:mt-[20vh]"
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