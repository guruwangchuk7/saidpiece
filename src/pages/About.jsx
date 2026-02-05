import React, { useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavLink } from 'react-router-dom';
import rightArrow from '../assets/icons/rightArrow.svg';
import H5 from './home/H5';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// --- Asset Imports ---
import aboutUsImg from '../assets/aboutusphoto/aboutus.jpg';
import philosophyImg from '../assets/homephoto/mainbg.svg';
import teamImg from '../assets/homephoto/page3Bg.jpg';


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
    heading: "saidpiece architect",
  },
  intro: {
    title: "Saidpiece Architects is a registered Bhutanese firm specializing in architectural and engineering solutions.",
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
      { number: "08", title: "Cost & Contract Consultanting ", description: "Strategic cost and contract advisory services supporting sustainable, value driven project delivery." },
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
    image: philosophyImg,
  },
  inspiration: {
    heading: "Vision",
    description: "Every design begins with context, the landscape, the community, and the story it must tell evolving through a mindful process of collaboration and precision."
  },
  team: {
    heading: "Who We Are",
    quote: "Saidpiece Architects is a Bhutan-based multi-disciplinary and construction firm specializing in innovative sustainable designs.",
    description: "Offering full turn key services from concept development to project completion, we focus on creating functional, aesthetic and mindful spaces with an emphasis on innovation and sustainability.",
    image: teamImg
  }
};


function About() {
  const mainRef = useRef(null);

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
    }, mainRef);

    // Cleanup function to revert all animations
    return () => context.revert();
  }, []);

  return (
    <main ref={mainRef} className="w-full flex flex-col bg-zinc-50 antialiased text-zinc-800 relative">
      <NavLink
        to="/"
        className="absolute top-6 left-4 lg:top-10 lg:left-10 flex items-center gap-2 text-sm font-medium hover:underline z-20 text-white"
      >
        <img src={rightArrow} alt="Back" className="w-4 h-4 rotate-180 invert" />
        <span>Back to home</span>
      </NavLink>


      {/* === HERO SECTION === */}
      <header
        className="relative w-full h-[80vh] flex flex-col justify-center items-center text-white text-center"
        style={{ backgroundImage: `url(${aboutUsImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div data-animate="hero-title" className="relative z-10 px-5">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-normal max-w-4xl mx-auto leading-tight tracking-wide">
            {pageData.hero.heading}
          </h1>
        </div>
      </header>

      {/* === INTRO SECTION === */}
      <section data-animate-section className="py-16 lg:py-32 px-6 lg:px-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 data-animate-child className="text-2xl md:text-3xl lg:text-5xl font-light leading-tight mb-6">
            {pageData.intro.title}
          </h2>
          <p data-animate-child className="text-lg lg:text-xl text-zinc-500 leading-relaxed">
            {pageData.intro.description}
          </p>
        </div>
      </section>

      {/* === OUR PROCESS SECTION (NEW) === */}
      <section data-animate-section className="py-16 lg:py-32 px-6 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 data-animate-child className="text-sm font-bold text-zinc-500 tracking-widest uppercase mb-4">{pageData.process.heading}</h2>
            <p data-animate-child className="text-2xl lg:text-4xl leading-snug">
              {pageData.process.tagline}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-t border-zinc-200 pt-16">
            {pageData.process.steps.map((step) => (
              <div data-animate-child key={step.number}>
                <span className="text-zinc-400 font-mono text-lg">{step.number}</span>
                <h3 className="text-2xl font-semibold text-zinc-900 mt-4 mb-3">{step.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === PHILOSOPHY SECTION === */}
      <section data-animate-section className="py-16 lg:py-32 px-6 lg:px-20 bg-zinc-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 data-animate-child className="text-sm font-bold text-zinc-500 tracking-widest uppercase mb-4">{pageData.philosophy.heading}</h2>
            <p data-animate-child className="text-2xl lg:text-4xl leading-snug">
              {pageData.philosophy.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {pageData.philosophy.principles.map((p, index) => (
              <div data-animate-child key={index} className="text-center p-8">
                <div className="flex justify-center mb-6">{p.icon}</div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-3">{p.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === INSPIRED BY BHUTAN SECTION (NEW) === */}
      <section data-animate-section className="py-16 lg:py-32 px-6 lg:px-20 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 data-animate-child className="text-sm font-bold text-zinc-500 tracking-widest uppercase mb-4">{pageData.inspiration.heading}</h2>
          <p data-animate-child className="text-xl lg:text-3xl font-light text-zinc-800 leading-relaxed">
            {pageData.inspiration.description}
          </p>
        </div>
      </section>

      {/* === TEAM SECTION === */}
      <section data-animate-section className="py-16 lg:py-32 px-6 lg:px-20 bg-zinc-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div data-animate-child className="lg:order-last">
            <img
              src={pageData.team.image}
              alt="SaidPiece Team"
              className="rounded-lg shadow-2xl object-cover w-full h-full max-h-[600px]"
            />
          </div>
          <div data-animate-child className="relative">
            <span className="absolute -top-12 left-0 lg:-left-8 text-[120px] font-serif text-zinc-200 leading-none z-0">“</span>
            <div className="relative z-10">
              <h2 className="text-sm font-bold text-zinc-500 tracking-widest uppercase mb-6 ml-4 lg:ml-0">{pageData.team.heading}</h2>
              <blockquote className="text-2xl lg:text-4xl font-light leading-snug mb-8">
                {pageData.team.quote}
              </blockquote>
              <p className="text-lg text-zinc-600 leading-relaxed">
                {pageData.team.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === H5 SECTION === */}
      <H5 />

    </main>
  );
}

export default About;