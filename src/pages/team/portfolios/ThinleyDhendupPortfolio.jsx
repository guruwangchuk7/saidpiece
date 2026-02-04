import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaLinkedin, FaEnvelope, FaArrowDown } from 'react-icons/fa';
import gsap from 'gsap';
import thinleyDhendup from '../../../assets/teamphoto/thinley dendup (b&w).png';
import rightArrow from '../../../assets/icons/rightArrow.svg';

const ThinleyDhendupPortfolio = () => {
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
        <div className="text-3xl font-semibold cursor-default">Thinley Dhendup</div>
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
          <img src={thinleyDhendup} alt="Thinley Dhendup" className="rounded-full w-full h-full object-cover" />
        </div>
        <div className="text-center">
          <p className="text-gray-600 font-semibold mb-2 text-lg lg:text-base">Hello, I'm</p>
          <h1 className="text-4xl lg:text-5xl font-bold mb-2">Thinley Dhendup</h1>
          <p className="text-2xl text-gray-600 mb-6">Principal Architect</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <NavLink to="/team" className="border-2 border-gray-600 rounded-full px-8 py-3 hover:bg-gray-600 hover:text-white transition-all text-center">Back to Team</NavLink>
            <button onClick={() => scrollToSection('contact')} className="bg-gray-800 text-white rounded-full px-8 py-3 hover:bg-gray-600 transition-all">Contact Info</button>
          </div>
          <div className="flex gap-4 justify-center">
            <a href="https://www.linkedin.com/in/thinleydhendup/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={32} className="cursor-pointer hover:opacity-70" />
            </a>
            <a href="mailto:thinley@saidpiece.com">
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
            <img src={thinleyDhendup} alt="Thinley Dhendup" className="rounded-2xl" />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="border-2 border-gray-400 rounded-2xl p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Experience</h3>
                <p className="text-gray-600">7+ Years<br />Principal Architect / Consultant</p>
              </div>
              <div className="border-2 border-gray-400 rounded-2xl p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <p className="text-gray-600">B.Arch, Assumption University<br />Heritage Conservation Training</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              I am Thinley Dhendup, a registered architect (BA-277) with the Construction Development Board of Bhutan and the Principal/Founder of Saidpiece Architects. With a Bachelor's in Architecture from Assumption University, Thailand, I bring a wealth of international and local experience, having held senior roles at SV Architects and Associates in Bangkok.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              My portfolio spans complex aviation projects like Don Mueang Terminal 3, healthcare facilities, and bespoke hospitality projects in Bhutan. I am an active member of BCCI, ABTO, BCA, and AUSTCHAM, committed to delivering excellence in design, BIM, and project management across South East Asia and the Himalayas.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Throughout my career, I have led diverse and high-stakes projects, ranging from large-scale master planning and aviation infrastructure in Thailand to intimate heritage conservation and eco-friendly resorts in Bhutan. My tenure as a Senior Architect at SV Architects and Associates allowed me to hone my skills in full-scope design services, tender documentation, and construction supervision. Now leading Saidpiece Architects, I am dedicated to bridging international design standards with local context, creating spaces that are not only functional and compliant but also culturally resonant and sustainable.
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
              <h3 className="text-2xl font-semibold text-center mb-6">Design & Planning</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { skill: 'Master Planning', level: 'Expert' },
                  { skill: 'Aviation Architecture', level: 'Experienced' },
                  { skill: 'Healthcare Design', level: 'Experienced' },
                  { skill: 'Hospitality Design', level: 'Expert' },
                  { skill: 'BIM / Revit', level: 'Expert' },
                  { skill: 'Interior Design', level: 'Expert' },
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
              <h3 className="text-2xl font-semibold text-center mb-6">Project Management</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { skill: 'QS Consultant', level: 'Expert' },
                  { skill: 'Construction Supervision', level: 'Expert' },
                  { skill: 'Tender Documentation', level: 'Expert' },
                  { skill: 'Client Relations', level: 'Expert' },
                  { skill: 'Team Leadership', level: 'Expert' },
                  { skill: 'Regulatory Compliance', level: 'Expert' },
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
            { title: 'Don Mueang Airport T3', desc: 'Senior Architect for Terminal 3 design & planning (Bangkok, Thailand)' },
            { title: 'Yongkola ECO-Lodge', desc: 'Principal Architect for hospitality design & build (Mongar, Bhutan)' },
            { title: 'BNBL Phuntsholing', desc: 'Design & Supervision for Bank Branch (Phuntsholing, Bhutan)' },
            { title: 'U-Tapao Int\'l Airport', desc: 'Senior Architect for Passenger Terminal Phase 1 (Bangkok, Thailand)' },
            { title: 'VTC Bumthang', desc: 'Executive Lead for Institute Design & Build (Thimphu, Bhutan)' },
            { title: 'ERA Head Office', desc: 'Lead Consultant for Corporate HQ Design & Supervision (Thimphu, Bhutan)' },
            { title: 'Sirikit Hospital', desc: 'Senior Architect for Healthcare Master-planning (Thailand)' },
            { title: 'Siamese Rama IX', desc: 'Full Architectural Service for Mixed-use Residential (Thailand)' },
            { title: 'Clock Tower Plaza', desc: 'Civil Engineering & Design for Public Space (Thimphu, Bhutan)' },
          ].map((project, idx) => (
            <div key={idx} className="border-2 border-gray-400 rounded-2xl p-6">
              <div className="bg-gray-100 rounded-xl h-64 mb-4 flex items-center justify-center">
                <p className="text-6xl text-gray-400">📐</p>
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
            <a href="mailto:thinley@saidpiece.com" className="hover:underline">thinley@saidpiece.com</a>
          </div>
          <div className="flex items-center gap-3 border-2 border-gray-400 rounded-2xl px-6 py-4">
            <FaLinkedin size={24} />
            <a href="https://www.linkedin.com/in/thinleydhendup/" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ThinleyDhendupPortfolio;
