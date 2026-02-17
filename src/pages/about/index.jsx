import { motion } from "motion/react";
import React, { useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavLink } from 'react-router-dom';
import rightArrow from '../../assets/icons/rightArrow.svg';
import H5 from '../home/H5';
import Footer from '../../components/layout/Footer';
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// --- Asset Imports ---
import aboutUsImg from '../../assets/aboutusphoto/aboutus.webp';
// import philosophyImg from '../../assets/homephoto/mainbg.svg'; // Unused and heavy (12MB)
import teamImg from '../../assets/homephoto/page3Bg.jpg';
import teamGuruImg from '../../assets/aboutusphoto/teamguru.png';
import aboutDzong from '../../assets/aboutusphoto/aboutdzong.JPG';
import ctaImg from '../../assets/calltoaction/keyboard.jpg';


// --- SVG Icons ---
const IconHarmony = () => (
  <svg className="w-10 h-10 text-zinc-500" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);
const IconInnovation = () => (
  <svg className="w-10 h-10 text-zinc-500" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.5 1.591L5.25 15.25v3.866c0 .83.67 1.5 1.5 1.5h10.5a1.5 1.5 0 001.5-1.5v-3.866l-4-4.842a2.25 2.25 0 01-.5-1.591V3.104a2.25 2.25 0 00-4.5 0z" />
  </svg>
);
const IconHuman = () => (
  <svg className="w-10 h-10 text-zinc-500" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);


// --- Page Content (Expanded with more information) ---
const pageData = {
  hero: {
    heading: "saidpiece architects",
  },
  intro: {
    title: "Saidpiece Architects is a registered\nBhutanese firm specializing in\narchitectural and engineering solutions.",
    description: "Located at Namgyal Plaza, Thimphu (CDB No. 312; Trade License No. 1052642), we provide full-spectrum professional services encompassing design, documentation, and project delivery, from concept to completion. Founded in 2023, Saidpiece was born from a vision to merge Bhutanese tradition with modern innovation. Our work is rooted in the belief that architecture is not merely the creation of buildings, but the crafting of environments that foster balance between human experience, culture, and nature.",
  },
  process: {
    heading: "Our Expertise",
    tagline: "Full-spectrum professional services from concept to completion.",
    steps: [
      { number: "01", title: "Master Planning and Urban Design", description: "Strategic planning for sustainable and vibrant communities." },
      { number: "02", title: "Architectural and Interior Design", description: "Creating functional, aesthetic, and mindful spaces." },
      { number: "03", title: "BIM Management and 3D Visualization", description: "Advanced digital modeling for precision and clarity." },
      { number: "04", title: "Landscape and Environmental Design", description: "Harmonizing built environments with nature." },
      { number: "05", title: "Structural and MEP Engineering", description: "Integrated engineering solutions for robust structures." },
      { number: "06", title: "Feasibility Studies and Quantity Surveying", description: "Comprehensive analysis for informed decision making." },
      { number: "07", title: "Construction Management & Supervision", description: "Ensuring quality and excellence in execution." },
      { number: "08", title: "Cost & Contract Consultanting", description: "Strategic cost and contract advisory services supporting sustainable, value driven project delivery." },
    ]
  },
  philosophy: {
    heading: "Philosophy",
    description: "Our guiding philosophy is anchored in the principles of Gross National Happiness (GNH) designing with mindfulness, building with responsibility, and innovating with purpose.",
    principles: [
      { icon: <IconHarmony />, title: "Mindfulness", text: "Enhancing community well-being through thoughtful design." },
      { icon: <IconInnovation />, title: "Responsibility", text: "Protecting the environment and building with care." },
      { icon: <IconHuman />, title: "Purpose", text: "Celebrating Bhutan’s cultural identity within a forward-looking framework." },
    ],
    // image: philosophyImg,

  },
  inspiration: {
    heading: "Vision",
    description: "Every design begins with context, the landscape, the community, and the story it must tell evolving through a mindful process of collaboration and precision."
  },
  team: {
    heading: "Saidpiece Team",
    subheading: "Who We Are",
    quote: "Saidpiece Architects is a Bhutan-based multi-disciplinary and construction firm specializing in innovative sustainable designs.",
    description: "Offering full turn key services from concept development to project completion, we focus on creating functional, aesthetic and mindful spaces with an emphasis on innovation and sustainability.",
    image: teamImg
  }
};


function About() {
  const mainRef = useRef(null);
  const introRef = useRef(null);
  const heroRef = useRef(null);
  const heroImageRef = useRef(null);

  const handleScrollDown = () => {
    introRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Use GSAP Context for proper cleanup
    const context = gsap.context(() => {
      // Don't run animations if the user prefers reduced motion
      if (prefersReducedMotion) {
        gsap.set("[data-animate-child], [data-animate='hero-title']", { opacity: 1, y: 0 });
        return;
      }

      // Animate Hero Title on load
      gsap.from("[data-animate='hero-title']", {
        opacity: 0,
        y: 40,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.3,
      });

      // Hero Image Zoom Animation
      gsap.to(heroImageRef.current, {
        scale: 1.3,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1, // Added 1s smoothing/lag for a more premium feel
        },
      });

      // Animate each section as it scrolls into view
      const sections = gsap.utils.toArray("[data-animate-section]");
      sections.forEach(section => {
        const elementsToAnimate = section.querySelectorAll("[data-animate-child]");

        gsap.from(elementsToAnimate, {
          opacity: 0,         // Fade in
          y: 50,              // Slide up
          scale: 0.98,        // Subtle scale effect
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.2,       // Animate children one by one
          scrollTrigger: {
            trigger: section,
            start: 'top 80%', // Start animation when 80% of the section is visible
            toggleActions: 'play none none none',
          },
        });
      });
      // Refresh ScrollTrigger to ensure correct placement after layout changes
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    }, mainRef);

    // Cleanup function to revert all animations
    return () => context.revert();
  }, []);

  return (
    <main ref={mainRef} className="w-full flex flex-col bg-white antialiased text-zinc-800 relative">
      <NavLink
        to="/"
        className="absolute top-6 sm:top-10 left-3 sm:left-5 lg:left-10 flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline z-20 text-white"
      >
        <img src={rightArrow} alt="Back" className="w-4 h-4 rotate-180 invert" />
        <span>Back to home</span>
      </NavLink>


      {/* === HERO SECTION === */}
      <header
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center text-white text-center"
      >
        <div
          ref={heroImageRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${aboutUsImg})` }}
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div data-animate="hero-title" className="relative z-20 px-5 -mt-40">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-normal max-w-4xl mx-auto leading-tight tracking-wide">
            {pageData.hero.heading}
          </h1>
        </div>

        <motion.div
          className="absolute bottom-32 flex flex-col items-center gap-3 cursor-pointer z-20"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ fontFamily: "century-gothic" }}
          onClick={handleScrollDown}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={rightArrow} alt="Scroll down" className="w-5 rotate-90 opacity-70 invert" />
          <span className="text-sm font-light border-b border-white pb-1">scroll down</span>
        </motion.div>
      </header>

      {/* === INTRO & EXPERTISE SECTION === */}
      <section ref={introRef} data-animate-section className="py-16 lg:py-32 px-3 sm:px-5 lg:px-10">
        <div className="w-full flex flex-col lg:flex-row gap-[19px]"> {/* 0.5cm approx 19px */}
          {/* Vertical Image on the left - increased width and aligned to left padding */}
          <div data-animate-child className="hidden lg:block w-[42%] shrink-0">
            <img
              src={aboutDzong}
              alt="Saidpiece Architecture"
              className="w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Text Content */}
          <div className="flex-1">
            {/* Intro Part */}
            <div className="mb-20">
              <h2 data-animate-child className="text-lg md:text-2xl lg:text-4xl font-light leading-tight mb-6 whitespace-pre-line text-left">
                {pageData.intro.title}
              </h2>
              <div data-animate-child className="text-sm lg:text-xl text-zinc-500 leading-relaxed text-left">
                <p>
                  {pageData.intro.description.split("completion.")[0]}completion.
                </p>

                {/* Vertical Image for Mobile only - integrated into the text flow for better context */}
                <div className="lg:hidden my-10">
                  <img
                    src={aboutDzong}
                    alt="Saidpiece Architecture"
                    className="w-full h-[75vh] object-cover rounded-sm grayscale"
                  />
                </div>

                <p className="mt-4 lg:mt-0">
                  {pageData.intro.description.split("completion.")[1]}
                </p>
              </div>
            </div>

            {/* Expertise Part */}
            <div className="border-t border-zinc-200 pt-16">
              <div className="mb-12">
                <h2 data-animate-child className="text-sm font-bold text-zinc-500 tracking-widest uppercase mb-4">{pageData.process.heading}</h2>
                <p data-animate-child className="text-lg md:text-xl lg:text-2xl font-light leading-snug">
                  {pageData.process.tagline}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 sm:gap-y-12 mb-20">
                {pageData.process.steps.map((step) => (
                  <div
                    data-animate-child
                    key={step.number}
                    className="group border-b border-zinc-100 pb-8 md:border-0 md:pb-0 last:border-0"
                  >
                    <div className="flex md:block gap-5 items-start">
                      <span className="text-zinc-300 font-mono text-sm md:text-lg shrink-0 mt-1 md:mt-0">{step.number}</span>
                      <div>
                        <h3 className="text-base md:text-lg font-semibold text-zinc-900 md:mt-2 mb-2 uppercase md:normal-case tracking-tight md:tracking-normal">
                          {step.title}
                        </h3>
                        <p className="text-sm text-zinc-600 leading-relaxed max-w-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Philosophy & Vision (Moved to right side) */}
              <div className="border-t border-zinc-200 pt-16 mt-16">
                <div className="mb-16">
                  <h2 data-animate-child className="text-sm font-bold text-zinc-500 tracking-widest uppercase mb-6">{pageData.philosophy.heading}</h2>
                  <p data-animate-child className="text-lg md:text-xl lg:text-2xl font-light leading-snug mb-10">
                    {pageData.philosophy.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pageData.philosophy.principles.map((p, index) => (
                      <div data-animate-child key={index} className="flex flex-col items-start text-left">
                        <div className="mb-4 opacity-70 scale-75 origin-left">{p.icon}</div>
                        <h3 className="text-base font-semibold text-zinc-900 mb-2">{p.title}</h3>
                        <p className="text-sm text-zinc-600 leading-relaxed">{p.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-zinc-100 pt-16">
                  <h2 data-animate-child className="text-sm font-bold text-zinc-500 tracking-widest uppercase mb-6">{pageData.inspiration.heading}</h2>
                  <p data-animate-child className="text-lg md:text-xl lg:text-2xl font-light text-zinc-800 leading-relaxed">
                    {pageData.inspiration.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section data-animate-section className="group/cta relative w-full px-6 sm:px-10 lg:px-20 py-14 sm:py-20 h-[40vh] sm:h-[50vh] overflow-hidden flex flex-col justify-between border-t border-zinc-100">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={ctaImg}
            alt="saidpiece media"
            className="w-full h-full object-cover opacity-90 transition-transform duration-1000 ease-out group-hover/cta:scale-105"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Top Text */}
        <div className="relative z-10 w-full text-white" data-animate-child>
          <h2
            className="text-xl sm:text-2xl md:text-3xl tracking-tight leading-tight drop-shadow-md"
            style={{ fontFamily: 'century-gothic' }}
          >
            <span className="font-light" style={{ color: "#aaaaaa" }}>said</span>
            <span style={{ opacity: 0.95 }}>piece</span>
          </h2>
        </div>

        {/* Bottom Button */}
        <div className="relative z-10 text-white" data-animate-child>
          <NavLink
            to="/contact"
            className="group flex items-center gap-6 text-xs sm:text-sm font-light uppercase tracking-widest border-b border-white pb-3 hover:border-white/70 transition-all w-fit drop-shadow-md text-white"
          >
            <span>Contact Us</span>
            <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-2">
              <path d="M0 6H39M39 6L34 1M39 6L34 11" stroke="white" strokeWidth="1" />
            </svg>
          </NavLink>
        </div>
      </section>



      {/* === TEAM SECTION === */}
      <section data-animate-section className="pt-8 lg:pt-16 pb-16 lg:pb-32 px-3 sm:px-5 lg:px-10 border-t border-zinc-100">
        <div className="w-full flex flex-col lg:flex-row gap-[19px]">
          {/* Text block on the left */}
          <div className="flex-1">
            <div data-animate-child className="mb-12">
              <blockquote className="text-lg md:text-2xl lg:text-4xl font-light leading-tight mb-8 text-zinc-900">
                {pageData.team.quote}
              </blockquote>

              <p className="text-sm lg:text-xl text-zinc-500 leading-relaxed max-w-2xl">
                {pageData.team.description}
              </p>
            </div>
          </div>

          {/* Image on the right */}
          <div data-animate-child className="hidden lg:block w-[42%] shrink-0">
            <img
              src={teamGuruImg}
              alt="SaidPiece Team"
              className="w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
              loading="eager"
            />
          </div>

          {/* Mobile Image */}
          <div data-animate-child className="lg:hidden mt-8">
            <img
              src={teamGuruImg}
              alt="SaidPiece Team"
              className="w-full h-[60vh] object-cover rounded-sm grayscale"
            />
          </div>
        </div>
      </section>

      {/* === H5 SECTION === */}
      <H5 />

      <Footer />
    </main >
  );
}

export default About;