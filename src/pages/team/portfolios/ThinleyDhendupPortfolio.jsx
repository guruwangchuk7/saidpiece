import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import gsap from 'gsap';
import thinleyDhendup from '../../../assets/teamphoto/thinleydendupb.webp';
import rightArrow from '../../../assets/icons/rightArrow.svg';

const ThinleyDhendupPortfolio = () => {
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
    <div ref={containerRef} className="min-h-screen relative bg-white px-3 sm:px-5 lg:px-10 py-6 sm:py-10">
      <NavLink to="/team" className="absolute top-6 sm:top-10 left-3 sm:left-5 lg:left-10 flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline z-20">
        <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
        <span>Back to team</span>
      </NavLink>

      <div className="w-full py-12 sm:py-20">
        {/* Header/Profile Section */}
        <section className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 mb-20 lg:mb-32 fade-in">
          <div className="flex-1 order-2 lg:order-1 w-full">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-none uppercase mb-4 sm:mb-6">
              Thinley<br className="hidden lg:block" /> Dhendup
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-zinc-200 pt-6">
              <p className="text-lg sm:text-xl lg:text-lg text-zinc-500 font-light max-w-xl">
                Principal Architect & Founder of Saidpiece Architects.
              </p>
              <div className="flex gap-6">
                <a href="https://www.linkedin.com/in/thinleydhendup/" target="_blank" rel="noopener noreferrer" className="text-zinc-800 hover:text-zinc-500 transition-colors">
                  <FaLinkedin size={28} />
                </a>
                <a href="mailto:thinley@saidpiece.com" className="text-zinc-800 hover:text-zinc-500 transition-colors">
                  <FaEnvelope size={28} />
                </a>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/6 order-1 lg:order-2 mb-8 lg:mb-0 lg:-mt-25">
            <div className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative">
              <img src={thinleyDhendup} alt="Thinley Dhendup" className="absolute inset-0 w-full h-full object-contain object-bottom" />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-24 lg:mb-40 fade-in">
          <h2 className="text-md font-bold uppercase tracking-widest text-zinc-400 mb-8 lg:mb-12">About</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-light leading-tight mb-8">
                Bridging international design standards with Bhutanese tradition to create functional, compliant, and culturally resonant spaces.
              </p>
              <div className="grid grid-cols-2 gap-8 border-t border-zinc-200 pt-8 mt-12">
                <div>
                  <span className="block text-xs uppercase text-zinc-400 tracking-wider mb-1">Experience</span>
                  <span className="text-lg font-medium">7+ Years</span>
                </div>
                <div>
                  <span className="block text-xs uppercase text-zinc-400 tracking-wider mb-1">Education</span>
                  <span className="text-lg font-medium">B.Arch, Assumption Univ.</span>
                </div>
              </div>
            </div>
            <div className="text-zinc-600 leading-relaxed text-lg sm:text-xl space-y-6 lg:pt-2">
              <p>
                I am Thinley Dhendup, a registered architect (BA-277) with the Construction Development Board of Bhutan and the Principal/Founder of Saidpiece Architects. With a Bachelor's in Architecture from Assumption University, Thailand, I bring a wealth of international and local experience, having held senior roles at SV Architects and Associates in Bangkok.
              </p>
              <p>
                My portfolio spans complex aviation projects like Don Mueang Terminal 3, healthcare facilities, and bespoke hospitality projects in Bhutan. I am an active member of BCCI, ABTO, BCA, and AUSTCHAM, committed to delivering excellence in design, BIM, and project management across South East Asia and the Himalayas.
              </p>
              <p>
                Throughout my career, I have led diverse and high-stakes projects, ranging from large-scale master planning and aviation infrastructure in Thailand to intimate heritage conservation and eco-friendly resorts in Bhutan. My tenure as a Senior Architect at SV Architects and Associates allowed me to hone my skills in full-scope design services, tender documentation, and construction supervision.
              </p>
            </div>
          </div>
        </section>

        {/* Experience / Expertise Section */}
        <section id="experience" className="mb-24 lg:mb-40 fade-in">
          <h2 className="text-md font-bold uppercase tracking-widest text-zinc-400 mb-8 lg:mb-12">Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-12">
            <div>
              <h3 className="text-xl font-semibold mb-6 uppercase tracking-tight">Design & Planning</h3>
              <ul className="space-y-4">
                {['Master Planning', 'Aviation Architecture', 'Healthcare Design', 'Hospitality Design', 'BIM / Revit', 'Interior Design'].map(skill => (
                  <li key={skill} className="flex items-center justify-between text-zinc-600 pb-3 border-b border-zinc-100">
                    <span>{skill}</span>
                    <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full" />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 uppercase tracking-tight">Project Management</h3>
              <ul className="space-y-4">
                {['QS Consultant', 'Construction Supervision', 'Tender Documentation', 'Client Relations', 'Team Leadership', 'Regulatory Compliance'].map(skill => (
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
              { title: 'Don Mueang Airport T3', location: 'Bangkok, Thailand', role: 'Senior Architect', type: 'Aviation', year: '2019' },
              { title: 'Yongkola ECO-Lodge', location: 'Mongar, Bhutan', role: 'Principal Architect', type: 'Hospitality', year: '2023' },
              { title: 'BNBL Phuntsholing', location: 'Phuntsholing, Bhutan', role: 'Design & Supervision', type: 'Commercial', year: '2022' },
              { title: "U-Tapao Int'l Airport", location: 'Bangkok, Thailand', role: 'Senior Architect', type: 'Aviation', year: '2020' },
              { title: 'VTC Bumthang', location: 'Thimphu, Bhutan', role: 'Executive Lead', type: 'Institutional', year: '2023' },
              { title: 'ERA Head Office', location: 'Thimphu, Bhutan', role: 'Lead Consultant', type: 'Corporate', year: '2024' },
              { title: 'Sirikit Hospital', location: 'Thailand', role: 'Senior Architect', type: 'Healthcare', year: '2018' },
              { title: 'Siamese Rama IX', location: 'Thailand', role: 'Architect', type: 'Mixed-use', year: '2019' },
              { title: 'Clock Tower Plaza', location: 'Thimphu, Bhutan', role: 'Civil Engineering', type: 'Public Space', year: '2015' },
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

export default ThinleyDhendupPortfolio;
