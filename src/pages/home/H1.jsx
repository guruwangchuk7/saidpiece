import React, { useEffect, useRef } from "react";
import kinleyPhoto from "../../assets/homephoto/kinleylaptop.JPG";
import rightArrow from "../../assets/icons/rightArrow.svg";
import { motion, MotionConfig } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function H1() {
  const imageRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "top 10%",
          scrub: 1,
        },
        marginInline: 0,
        ease: "power2.out"
      });
    });

    return () => mm.revert();
  }, []);

  const handleScrollDown = () => {
    imageRef.current?.scrollIntoView({ behavior: "auto", block: "center" });
  };

  return (
    <div>
      <div className="relative h-[100vh] sm:h-[60vh] lg:h-[90vh] flex justify-center items-center text-neutral-900 px-4">
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

        <motion.div
          className="absolute bottom-28 md:bottom-12 flex flex-col items-center gap-3 cursor-pointer"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ fontFamily: "century-gothic" }}
          onClick={handleScrollDown}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={rightArrow} alt="Scroll down" className="w-5 rotate-90 opacity-70" />
          <span className="text-sm font-light border-b border-black md:border-neutral-500 pb-1">scroll down</span>
        </motion.div>
      </div>


      <div ref={imageRef} className="h-auto sm:h-[82vh] md:h-[92vh] mx-3 sm:mx-5 md:mx-10 lg:mx-[5cm] mt-10 sm:mt-[28vh] lg:mt-[14vh] overflow-hidden flex justify-center items-center">
        <img
          src={kinleyPhoto}
          alt="Kinley"
          className="w-full h-auto sm:h-full object-contain sm:object-cover object-center"
          loading="eager"
        />
      </div>
    </div>
  );
}

export default H1;