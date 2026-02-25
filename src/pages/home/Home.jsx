import React, { useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from 'framer-motion'
import H1 from './H1.jsx'
import H2 from './H2.jsx'
import H3 from './H3.jsx'
import H4 from './H4.jsx'
import H5 from './H5.jsx'
import Footer from '../../components/layout/Footer'

function Home() {
  const contentRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["end end", "end start"]
  })

  // Opacity for the dark overlay: starts at 0.8 (dim) and goes to 0 (bright/clear)
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.8, 0])

  return (
    <div className="w-full">
      <div className="relative z-10 bg-white shadow-none md:shadow-2xl mb-0 md:mb-[100vh]">
        <div ref={contentRef} className="bg-white">
          <H1 />
          <H2 />
          <H3 />
          <H4 />
        </div>
      </div>
      <div className="relative md:fixed bottom-0 left-0 w-full z-0 h-auto md:h-screen bg-white flex flex-col justify-between">
        {/* Dimming Overlay for Reveal Effect */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black pointer-events-none z-20 hidden md:block"
        />

        {/* H5 acts as the centered branding content. 
             We wrap it to control layout if needed, but H5 has its own height. 
             Since we want H5 + Footer to cover the screen, we can let H5 take available space or just sit behind.
             Given H5's internal sizing, we'll render it and place Footer absolute or stacked.
             To ensure nice layout, let's use a relative container for H5 that fills height, and Footer absolute bottom.
         */}
        <div className="w-full md:h-full flex items-center justify-center relative z-10">
          <H5 />
        </div>
        <div className="w-full md:absolute md:bottom-0 relative z-10">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Home