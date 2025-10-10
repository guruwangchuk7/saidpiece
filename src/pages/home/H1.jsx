import React from "react";
import mainBg from "../../assets/mainbg.svg";
import { motion, MotionConfig , useScroll } from "motion/react";

function H1() {

    const {scrollXProgress} = useScroll();
    const {scrollYProgress} = useScroll();

  return (
    <div>
      <div className="h-[60vh] lg:h-[90vh] flex justify-center items-center text-neutral-900">
        <MotionConfig transition={{ duration: 3, type: "spring" }}>
          <motion.div
            className="head text-center w-fit mx-auto"
            initial={{ opacity: 0, scale: 0.8, y: 0 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
          >
            <div className="logo font-bold text-3xl text-neutral-800 lg:text-7xl">
              SAIDPIECE <span className="font-light">STUDIO</span>
            </div>
            <div className="text-[16px] mx-10 lg:text-xl mt-2 lg:mt-5 font-medium text-zinc-600">
              We Art the World powered by traditions, nature and innovations
            </div>
          </motion.div>
        </MotionConfig>
      </div>

      <motion.div
        className="h-[80vh] border mx-3 md:mx-10 lg:mx-20 mt-30 lg:mt-0"
        style={{
          background: `url(${mainBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          scaleX:scrollXProgress,
          scaleY:scrollYProgress,
        }}
      />
    </div>
  );
}

export default H1;