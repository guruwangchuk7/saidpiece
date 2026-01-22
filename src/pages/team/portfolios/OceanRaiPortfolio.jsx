import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import gsap from 'gsap';
import rightArrow from '../../../assets/icons/rightArrow.svg';
import ocean from '../../../assets/team/ocean (b&w).png';

const OceanRaiPortfolio = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.animate-fade-in', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 lg:px-20 py-10">
        <NavLink
          to="/team"
          className="inline-flex items-center gap-2 text-sm font-medium hover:underline mb-8 animate-fade-in"
        >
          <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
          <span>Back to team</span>
        </NavLink>

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 animate-fade-in">
          <div className="flex items-center justify-center">
            <img
              src={ocean}
              alt="Ocean Rai"
              className="w-full max-w-md rounded-lg shadow-2xl"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-4">Ocean Rai</h1>
            <p className="text-2xl text-zinc-600 mb-6">Civil Engineer</p>
            <p className="text-lg text-zinc-700 leading-relaxed mb-8">
              Delivers reliable structural and engineering solutions aligned with design goals.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                <FaGithub size={28} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                <FaLinkedin size={28} />
              </a>
              <a
                href="mailto:david.garcia@example.com"
                className="text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                <FaEnvelope size={28} />
              </a>
            </div>
          </div>
        </div>

        {/* About Section */}
        <section className="mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold mb-6">About</h2>
          <p className="text-lg text-zinc-700 leading-relaxed">
            Ocean Rai is a skilled Civil Engineer at Saidpiece, specializing in delivering robust 
            structural solutions that perfectly align with architectural design goals. With a strong 
            foundation in engineering principles and a collaborative approach, Ocean ensures that 
            every project is built on solid ground.
          </p>
        </section>

        {/* Expertise Section */}
        <section className="mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold mb-6">Expertise</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Structural Analysis</h3>
              <p className="text-zinc-700">
                Expert in analyzing and designing safe and efficient structural systems.
              </p>
            </div>
            <div className="bg-zinc-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Construction Planning</h3>
              <p className="text-zinc-700">
                Skilled in developing comprehensive construction plans and timelines.
              </p>
            </div>
            <div className="bg-zinc-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Quality Assurance</h3>
              <p className="text-zinc-700">
                Ensuring construction quality and compliance with engineering standards.
              </p>
            </div>
            <div className="bg-zinc-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Site Management</h3>
              <p className="text-zinc-700">
                Effective coordination and management of construction site activities.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="animate-fade-in">
          <h2 className="text-3xl font-bold mb-6">Featured Projects</h2>
          <div className="space-y-8">
            <div className="border-l-4 border-zinc-900 pl-6">
              <h3 className="text-2xl font-semibold mb-2">Bridge Infrastructure Project</h3>
              <p className="text-zinc-600 mb-3">2024</p>
              <p className="text-zinc-700 leading-relaxed">
                Led structural engineering for a major bridge infrastructure project, ensuring 
                safety and durability while meeting tight deadlines.
              </p>
            </div>
            <div className="border-l-4 border-zinc-900 pl-6">
              <h3 className="text-2xl font-semibold mb-2">High-Rise Foundation Design</h3>
              <p className="text-zinc-600 mb-3">2023</p>
              <p className="text-zinc-700 leading-relaxed">
                Designed foundation systems for a 25-story building, addressing complex soil 
                conditions and load requirements.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OceanRaiPortfolio;
