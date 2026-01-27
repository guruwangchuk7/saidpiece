import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaLinkedin, FaEnvelope, FaArrowDown } from 'react-icons/fa';
import gsap from 'gsap';
import tashi from '../../../assets/teamphoto/tashi (b&w).png';
import rightArrow from '../../../assets/icons/rightArrow.svg';

const TashiDendupPortfolio = () => {
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
    <div ref={containerRef} className="bg-white relative">
      <NavLink to="/team" className="absolute top-4 left-4 lg:left-8 flex items-center gap-2 text-sm font-medium hover:underline z-30">
        <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
        <span>Back to team</span>
      </NavLink>
      {/* Navigation */}
      <nav className="flex flex-col lg:flex-row justify-between items-center min-h-[17vh] h-auto px-8 lg:px-20 pt-16 pb-6 lg:py-0 gap-4 lg:gap-0">
        <div className="text-3xl font-semibold cursor-default">Tashi Dendup</div>
        <ul className="flex flex-wrap justify-center gap-4 lg:gap-8 text-lg lg:text-xl">
          <li><button onClick={() => scrollToSection('about')} className="hover:text-gray-600 hover:underline underline-offset-4">About</button></li>
          <li><button onClick={() => scrollToSection('experience')} className="hover:text-gray-600 hover:underline underline-offset-4">Experience</button></li>
          <li><button onClick={() => scrollToSection('projects')} className="hover:text-gray-600 hover:underline underline-offset-4">Projects</button></li>
          <li><button onClick={() => scrollToSection('contact')} className="hover:text-gray-600 hover:underline underline-offset-4">Contact</button></li>
        </ul>
      </nav>

      {/* Profile Section */}
      <section className="flex flex-col lg:flex-row items-center justify-center min-h-[80vh] gap-8 lg:gap-12 px-8 py-12 lg:py-0 fade-in">
        <div className="w-64 h-64 lg:w-80 lg:h-80">
          <img src={tashi} alt="Tashi Dendup" className="rounded-full w-full h-full object-cover" />
        </div>
        <div className="text-center">
          <p className="text-gray-600 font-semibold mb-2 text-lg lg:text-base">Hello, I'm</p>
          <h1 className="text-4xl lg:text-5xl font-bold mb-2">Tashi Dendup</h1>
          <p className="text-2xl text-gray-600 mb-6">Architect</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <NavLink to="/team" className="border-2 border-gray-600 rounded-full px-8 py-3 hover:bg-gray-600 hover:text-white transition-all text-center">Back to Team</NavLink>
            <button onClick={() => scrollToSection('contact')} className="bg-gray-800 text-white rounded-full px-8 py-3 hover:bg-gray-600 transition-all">Contact Info</button>
          </div>
          <div className="flex gap-4 justify-center">
            <a href="https://www.linkedin.com/in/tashidendup/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={32} className="cursor-pointer hover:opacity-70" />
            </a>
            <a href="mailto:tashi@saidpiece.com">
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
            <img src={tashi} alt="Tashi Dendup" className="rounded-2xl" />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="border-2 border-gray-400 rounded-2xl p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Experience</h3>
                <p className="text-gray-600">3+ years<br />Professional Architecture</p>
              </div>
              <div className="border-2 border-gray-400 rounded-2xl p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <p className="text-gray-600">B.Arch.<br />RUB, Bhutan</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              As an Architect at Saidpiece Architects with over three years of professional experience, I specialize in architectural design, project coordination, and construction documentation. My expertise spans from conceptual design to construction supervision, with a strong focus on sustainable and contextually responsive architecture. I am registered with CDB Bhutan and bring comprehensive knowledge of building codes, standards, and best practices in architectural design.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              My professional journey includes working on diverse projects ranging from institutional buildings to residential complexes and commercial developments. I excel in creating detailed architectural drawings, 3D visualizations, and presentation materials using industry-standard software. My approach integrates traditional architectural principles with modern design methodologies, ensuring that each project is both functional and aesthetically compelling.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Beyond design, I have extensive experience in project coordination, working closely with structural engineers, MEP consultants, and contractors to ensure seamless project execution. From site analysis and feasibility studies to construction administration and quality control, I bring a holistic perspective to every project phase. My commitment to sustainable design and attention to detail has consistently delivered successful outcomes for clients and stakeholders.
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
              <h3 className="text-2xl font-semibold text-center mb-6">Technical Skills</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { skill: 'AutoCAD', level: 'Expert' },
                  { skill: 'SketchUp', level: 'Expert' },
                  { skill: 'Revit', level: 'Experienced' },
                  { skill: 'Lumion', level: 'Experienced' },
                  { skill: 'V-Ray', level: 'Experienced' },
                  { skill: 'Photoshop', level: 'Expert' },
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { skill: 'Architectural Design', level: 'Expert' },
                  { skill: 'Construction Docs', level: 'Expert' },
                  { skill: '3D Visualization', level: 'Experienced' },
                  { skill: 'Project Coordination', level: 'Expert' },
                  { skill: 'Site Supervision', level: 'Experienced' },
                  { skill: 'Sustainable Design', level: 'Experienced' },
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
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Institutional Building Complex', desc: 'Architectural design & documentation (Multi-story facility)' },
            { title: 'Commercial Retail Development', desc: 'Design coordination & construction supervision' },
            { title: 'Residential Housing Project', desc: 'Master planning & architectural detailing' },
            { title: 'Resort & Hospitality Design', desc: 'Conceptual design & visualization' },
            { title: 'Public Infrastructure Projects', desc: 'Architectural design & site planning' },
            { title: 'Mixed-Use Development', desc: 'Comprehensive design & coordination' },
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
            <a href="mailto:tashi@saidpiece.com" className="hover:underline">tashi@saidpiece.com</a>
          </div>
          <div className="flex items-center gap-3 border-2 border-gray-400 rounded-2xl px-6 py-4">
            <FaLinkedin size={24} />
            <a href="https://www.linkedin.com/in/tashidendup/" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default TashiDendupPortfolio;
