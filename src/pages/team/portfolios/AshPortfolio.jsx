import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import gsap from 'gsap';
import ash from '../../../assets/teamphoto/ash (b&w).png';
import rightArrow from '../../../assets/icons/rightArrow.svg';

const AshPortfolio = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fade-in', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen relative flex items-start justify-center bg-white px-4 sm:px-6 lg:px-20 py-6 sm:py-10">
      <NavLink to="/team" className="absolute top-6 sm:top-10 left-7 sm:left-12 lg:left-26 flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline z-20">
        <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
        <span>Back to team</span>
      </NavLink>

      <div className="w-full px-3 sm:px-6 py-12 sm:py-20">
        {/* Header/Profile Section */}
        <section className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 mb-20 lg:mb-32 fade-in">
          <div className="flex-1 order-2 lg:order-1 w-full">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-none uppercase mb-4 sm:mb-6">
              Ash<br className="hidden lg:block" /> Bahadur
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-zinc-200 pt-6">
              <p className="text-lg sm:text-xl lg:text-lg text-zinc-500 font-light max-w-xl">
                Architect
              </p>
              <div className="flex gap-6">
                <a href="https://www.linkedin.com/in/ashbahadur/" target="_blank" rel="noopener noreferrer" className="text-zinc-800 hover:text-zinc-500 transition-colors">
                  <FaLinkedin size={28} />
                </a>                <a href="mailto:ash@saidpiece.com" className="text-zinc-800 hover:text-zinc-500 transition-colors">
                  <FaEnvelope size={28} />
                </a>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/6 order-1 lg:order-2 mb-8 lg:mb-0 lg:-mt-25">
            <div className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative">
              <img src={ash} alt="Ash Bahadur" className="absolute inset-0 w-full h-full object-contain object-bottom" />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-24 lg:mb-40 fade-in">
          <h2 className="text-xl font-bold uppercase tracking-widest text-zinc-400 mb-8 lg:mb-12">About</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-light leading-tight mb-8">
                Creating spaces that tell stories and connect with their users on an emotional level through contemporary design.
              </p>
              <div className="grid grid-cols-2 gap-8 border-t border-zinc-200 pt-8 mt-12">
                <div>
                  <span className="block text-xs uppercase text-zinc-400 tracking-wider mb-1">Experience</span>
                  <span className="text-lg font-medium">3+ Years</span>
                </div>
                <div>
                  <span className="block text-xs uppercase text-zinc-400 tracking-wider mb-1">Education</span>
                  <span className="text-lg font-medium">B. Arch</span>
                </div>
              </div>
            </div>
            <div className="text-zinc-600 leading-relaxed text-[18px] sm:text-[22px] space-y-6 lg:pt-2">
              <p>
                As an Architect with 3+ years of professional experience, I specialize in contemporary design solutions that balance form and function. My passion lies in creating spaces that tell stories and connect with their users on an emotional level. I approach each project with fresh eyes, seeking innovative solutions while respecting the context and constraints of the site.
              </p>
            </div>
          </div>
        </section>

        {/* Experience / Expertise Section */}
        <section id="experience" className="mb-24 lg:mb-40 fade-in">
          <h2 className="text-md font-bold uppercase tracking-widest text-zinc-400 mb-8 lg:mb-12">Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-12">
            <div>
              <h3 className="text-xl font-semibold mb-6 uppercase tracking-tight">Technical Skills</h3>
              <ul className="space-y-4">
                {['AutoCAD', 'Revit', 'SketchUp', 'Lumion', 'Photoshop', 'InDesign'].map(skill => (
                  <li key={skill} className="flex items-center justify-between text-zinc-600 pb-3 border-b border-zinc-100">
                    <span>{skill}</span>
                    <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full" />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 uppercase tracking-tight">Core Competencies</h3>
              <ul className="space-y-4">
                {['Conceptual Design', 'Space Planning', 'Detail Drawings', 'Material Selection', 'Code Compliance', 'Client Presentation'].map(skill => (
                  <li key={skill} className="flex items-center justify-between text-zinc-600 pb-3 border-b border-zinc-100">
                    <span>{skill}</span>
                    <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Projects List */}
        <section id="projects" className="mb-20 fade-in">
          <h2 className="text-md font-bold uppercase tracking-widest text-zinc-400 mb-8 lg:mb-12">Selected Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Modern Family Home', location: 'Bhutan', role: 'Architect', type: 'Residential', year: '2022' },
              { title: 'Retail Space Reno', location: 'Thimphu, Bhutan', role: 'Design Lead', type: 'Commercial', year: '2023' },
              { title: 'Community Center', location: 'Bhutan', role: 'Architect', type: 'Public', year: '2023' },
            ].map((project, idx) => (
              <div key={idx} className="group bg-white border border-zinc-100 hover:border-zinc-300 hover:shadow-lg transition-all duration-300 p-8 flex flex-col justify-between min-h-[220px] cursor-default">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-widest border border-zinc-100 px-2 py-1 rounded-full">{project.type}</span>
                    <span className="text-[10px] text-zinc-300">{project.year}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold leading-tight uppercase mb-2 group-hover:text-zinc-500 transition-colors">{project.title}</h3>
                  <p className="text-zinc-500 text-sm">{project.location}</p>
                </div>
                <div className="pt-6 mt-4 border-t border-zinc-50">
                  <p className="text-xs text-zinc-400 mb-1">Role</p>
                  <p className="text-sm font-medium text-zinc-800">{project.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AshPortfolio;
