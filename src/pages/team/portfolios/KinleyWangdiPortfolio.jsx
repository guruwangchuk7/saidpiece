import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaLinkedin, FaEnvelope, FaArrowDown } from 'react-icons/fa';
import gsap from 'gsap';
import kinley from '../../../assets/team/kinley (b&w).png';

const KinleyWangdiPortfolio = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fade-in', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="bg-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center h-[17vh] px-8 lg:px-20">
        <div className="text-3xl font-semibold cursor-default">Kinley Wangdi</div>
        <ul className="flex gap-8 text-xl">
          <li><button onClick={() => scrollToSection('about')} className="hover:text-gray-600 hover:underline underline-offset-4">About</button></li>
          <li><button onClick={() => scrollToSection('experience')} className="hover:text-gray-600 hover:underline underline-offset-4">Experience</button></li>
          <li><button onClick={() => scrollToSection('projects')} className="hover:text-gray-600 hover:underline underline-offset-4">Projects</button></li>
          <li><button onClick={() => scrollToSection('contact')} className="hover:text-gray-600 hover:underline underline-offset-4">Contact</button></li>
        </ul>
      </nav>

      {/* Profile Section */}
      <section className="flex flex-col lg:flex-row items-center justify-center min-h-[80vh] gap-12 px-8 fade-in">
        <div className="w-80 h-80">
          <img src={kinley} alt="Kinley Wangdi" className="rounded-full w-full h-full object-cover" />
        </div>
        <div className="text-center">
          <p className="text-gray-600 font-semibold mb-2">Hello, I'm</p>
          <h1 className="text-5xl font-bold mb-2">Kinley Wangdi</h1>
          <p className="text-2xl text-gray-600 mb-6">Senior Architect</p>
          <div className="flex gap-4 justify-center mb-6">
            <NavLink to="/team" className="border-2 border-gray-600 rounded-full px-8 py-3 hover:bg-gray-600 hover:text-white transition-all">Back to Team</NavLink>
            <button onClick={() => scrollToSection('contact')} className="bg-gray-800 text-white rounded-full px-8 py-3 hover:bg-gray-600 transition-all">Contact Info</button>
          </div>
          <div className="flex gap-4 justify-center">
            <a href="https://www.linkedin.com/in/kinleywangdi/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={32} className="cursor-pointer hover:opacity-70" />
            </a>
            <a href="mailto:kinley@saidpiece.com">
              <FaEnvelope size={32} className="cursor-pointer hover:opacity-70" />
            </a>
          </div>
        </div>
      </section>
      <FaArrowDown onClick={() => scrollToSection('about')} className="mx-auto mb-8 cursor-pointer" size={32} />

      {/* About Section */}
      <section id="about" className="py-16 px-8 lg:px-20 fade-in">
        <p className="text-center text-gray-600 mb-2">Get To Know More</p>
        <h2 className="text-center text-4xl font-bold mb-12">About Me</h2>
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          <div className="flex-1">
            <img src={kinley} alt="Kinley Wangdi" className="rounded-2xl" />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="border-2 border-gray-400 rounded-2xl p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Experience</h3>
                <p className="text-gray-600">5+ years<br />Architectural Design</p>
              </div>
              <div className="border-2 border-gray-400 rounded-2xl p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <p className="text-gray-600">Bachelor's in Architecture<br />Design Technology</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              I'm a dedicated Senior Architect with 5+ years of experience in designing functional and aesthetically pleasing spaces. My work focuses on blending traditional architectural principles with modern innovation, creating designs that are both timeless and forward-thinking. I believe great architecture should inspire, function seamlessly, and enhance the lives of those who experience it.
            </p>
          </div>
        </div>
        <FaArrowDown onClick={() => scrollToSection('experience')} className="mx-auto mt-12 cursor-pointer" size={32} />
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-8 lg:px-20 fade-in">
        <p className="text-center text-gray-600 mb-2">Explore My</p>
        <h2 className="text-center text-4xl font-bold mb-12">Expertise</h2>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-gray-400 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-center mb-6">Design & Software</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { skill: 'AutoCAD', level: 'Expert' },
                  { skill: 'Revit', level: 'Experienced' },
                  { skill: 'SketchUp', level: 'Experienced' },
                  { skill: '3D Rendering', level: 'Experienced' },
                  { skill: 'Adobe Suite', level: 'Intermediate' },
                  { skill: 'BIM Coordination', level: 'Experienced' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="text-green-600 text-2xl">✓</div>
                    <div>
                      <h4 className="font-semibold">{item.skill}</h4>
                      <p className="text-sm text-gray-600">{item.level}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-2 border-gray-400 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-center mb-6">Specializations</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { skill: 'Residential Design', level: 'Expert' },
                  { skill: 'Commercial Spaces', level: 'Experienced' },
                  { skill: 'Interior Planning', level: 'Experienced' },
                  { skill: 'Site Analysis', level: 'Experienced' },
                  { skill: 'Building Codes', level: 'Experienced' },
                  { skill: 'Energy Efficiency', level: 'Intermediate' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="text-green-600 text-2xl">✓</div>
                    <div>
                      <h4 className="font-semibold">{item.skill}</h4>
                      <p className="text-sm text-gray-600">{item.level}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <FaArrowDown onClick={() => scrollToSection('projects')} className="mx-auto mt-12 cursor-pointer" size={32} />
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-8 lg:px-20 fade-in">
        <p className="text-center text-gray-600 mb-2">Browse My Recent</p>
        <h2 className="text-center text-4xl font-bold mb-12">Projects</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { title: 'Luxury Villa Complex', desc: 'Modern residential development' },
            { title: 'Corporate Office Building', desc: 'Sustainable workspace design' },
            { title: 'Boutique Hotel', desc: 'Contemporary hospitality architecture' },
          ].map((project, idx) => (
            <div key={idx} className="border-2 border-gray-400 rounded-2xl p-6">
              <div className="bg-gray-100 rounded-xl h-64 mb-4 flex items-center justify-center">
                <p className="text-6xl text-gray-400">🏛️</p>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">{project.title}</h3>
              <p className="text-sm text-gray-600 text-center mb-4">{project.desc}</p>
              <div className="flex gap-3 justify-center">
                <button className="border-2 border-gray-600 rounded-full px-6 py-2 hover:bg-gray-600 hover:text-white transition-all">Details</button>
                <button className="border-2 border-gray-600 rounded-full px-6 py-2 hover:bg-gray-600 hover:text-white transition-all">Gallery</button>
              </div>
            </div>
          ))}
        </div>
        <FaArrowDown onClick={() => scrollToSection('contact')} className="mx-auto mt-12 cursor-pointer" size={32} />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-8 lg:px-20 fade-in">
        <p className="text-center text-gray-600 mb-2">Get in Touch</p>
        <h2 className="text-center text-4xl font-bold mb-12">Contact Me</h2>
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-3 border-2 border-gray-400 rounded-2xl px-6 py-4">
            <FaEnvelope size={24} />
            <a href="mailto:kinley@saidpiece.com" className="hover:underline">kinley@saidpiece.com</a>
          </div>
          <div className="flex items-center gap-3 border-2 border-gray-400 rounded-2xl px-6 py-4">
            <FaLinkedin size={24} />
            <a href="https://www.linkedin.com/in/kinleywangdi/" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t">
        <nav className="mb-4">
          <ul className="flex justify-center gap-8">
            <li><button onClick={() => scrollToSection('about')} className="hover:underline">About</button></li>
            <li><button onClick={() => scrollToSection('experience')} className="hover:underline">Experience</button></li>
            <li><button onClick={() => scrollToSection('projects')} className="hover:underline">Projects</button></li>
            <li><button onClick={() => scrollToSection('contact')} className="hover:underline">Contact</button></li>
          </ul>
        </nav>
        <p className="text-gray-600">Copyright © 2025 Kinley Wangdi. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default KinleyWangdiPortfolio;
