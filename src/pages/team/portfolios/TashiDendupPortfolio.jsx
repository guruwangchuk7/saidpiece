import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import gsap from 'gsap';
import rightArrow from '../../../assets/icons/rightArrow.svg';
import tashi from '../../../assets/team/tashi (b&w).png';

const TashiDendupPortfolio = () => {
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
              src={tashi}
              alt="Tashi Dendup"
              className="w-full max-w-md rounded-lg shadow-2xl"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-4">Tashi Dendup</h1>
            <p className="text-2xl text-zinc-600 mb-6">Architecture Intern</p>
            <p className="text-lg text-zinc-700 leading-relaxed mb-8">
              Assists design teams while gaining practical architectural experience.
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
                href="mailto:kenji.tanaka@example.com"
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
            Tashi Dendup is an enthusiastic Architecture Intern at Saidpiece, eager to learn and 
            contribute to innovative projects. With a strong academic foundation and growing 
            practical experience, Tashi brings fresh perspectives and dedication to the team.
          </p>
        </section>

        {/* Skills Section */}
        <section className="mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold mb-6">Skills & Learning</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Design Software</h3>
              <p className="text-zinc-700">
                Proficient in AutoCAD, SketchUp, and learning advanced 3D modeling tools.
              </p>
            </div>
            <div className="bg-zinc-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Research & Analysis</h3>
              <p className="text-zinc-700">
                Conducting site analysis and research to support design development.
              </p>
            </div>
            <div className="bg-zinc-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Presentation</h3>
              <p className="text-zinc-700">
                Creating compelling presentations and visual materials for client meetings.
              </p>
            </div>
            <div className="bg-zinc-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
              <p className="text-zinc-700">
                Working effectively with senior architects and learning from experienced professionals.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="animate-fade-in">
          <h2 className="text-3xl font-bold mb-6">Projects Contributed To</h2>
          <div className="space-y-8">
            <div className="border-l-4 border-zinc-900 pl-6">
              <h3 className="text-2xl font-semibold mb-2">Community Center Design</h3>
              <p className="text-zinc-600 mb-3">2024</p>
              <p className="text-zinc-700 leading-relaxed">
                Assisted in the design development and documentation for a new community center, 
                focusing on accessible and inclusive design principles.
              </p>
            </div>
            <div className="border-l-4 border-zinc-900 pl-6">
              <h3 className="text-2xl font-semibold mb-2">Residential Renovation</h3>
              <p className="text-zinc-600 mb-3">2023</p>
              <p className="text-zinc-700 leading-relaxed">
                Supported the team with site measurements, drawing updates, and material research 
                for a residential renovation project.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TashiDendupPortfolio;
