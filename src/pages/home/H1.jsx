import React, { useEffect, useRef } from "react";
import kinleyPhoto from "../../assets/homephoto/kinleylaptop.JPG";
import rightArrow from "../../assets/icons/rightArrow.svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSiteContent } from "../../context/SiteContentContext";
// eslint-disable-next-line no-unused-vars
import { motion, MotionConfig } from "framer-motion";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function H1() {
  const imageRef = useRef(null);
  const { content } = useSiteContent();
  const heroData = content?.home_hero || {
    titlePart1: 'said',
    titlePart2: 'piece',
    titlePart3: 'architects',
    image_url: ''
  };

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
    imageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div>
<<<<<<< HEAD
      <div className="relative h-[100vh] sm:h-[60vh] lg:h-[90vh] flex justify-center items-center text-neutral-900 px-4">
=======
      <div className="h-[50vh] sm:h-[60vh] lg:h-[85vh] flex justify-center items-center text-neutral-900 px-4">
>>>>>>> 7d32d522936473d1e88d3abc1282a9d61340ee05
        <MotionConfig transition={{ duration: 3, type: "spring" }}>
          <motion.div
            className="head text-center w-fit mx-auto -mt-44 md:-mt-20"
            initial={{ opacity: 0, scale: 0.8, y: 0 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            style={{ fontFamily: "century-gothic" }}
          >
<<<<<<< HEAD
            <div className="logo font-bold text-2xl sm:text-3xl md:text-5xl text-neutral-800 lg:text-7xl" style={{ fontFamily: "century-gothic" }}>
              <span style={{ color: "#555555" }} className="font-light">{heroData.titlePart1}</span><span style={{ opacity: 0.95 }}>{heroData.titlePart2}</span> <span className="font-light">{heroData.titlePart3}</span>
=======
            <div className="logo font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl text-neutral-800">
              SAIDPIECE <span className="font-light">STUDIO</span>
            </div>
            <div className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 sm:mt-3 lg:mt-4 px-4 sm:px-6 md:px-8 lg:px-0 font-medium text-zinc-600">
              We Art the World powered by traditions, nature and innovations
>>>>>>> 7d32d522936473d1e88d3abc1282a9d61340ee05
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

<<<<<<< HEAD

      <div ref={imageRef} className="h-auto sm:h-[82vh] md:h-[92vh] mx-3 sm:mx-5 md:mx-10 lg:mx-[5cm] mt-10 sm:mt-[28vh] lg:mt-[14vh] overflow-hidden flex justify-center items-center">
        <img
          src={heroData.image_url || kinleyPhoto}
          alt="Saidpiece Hero"
          className="w-full h-auto sm:h-full object-contain sm:object-cover object-center"
          loading="eager"
        />
      </div>
=======
      <div
        className="h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] xl:h-[80vh] border mx-3 sm:mx-6 md:mx-10 lg:mx-16 xl:mx-20 mt-8 sm:mt-12 lg:mt-0"
        style={{
          background: `url(${mainBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
>>>>>>> 7d32d522936473d1e88d3abc1282a9d61340ee05
    </div>
  );
}

export default H1;