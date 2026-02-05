import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import gsap from 'gsap';
import kinley from '../../../assets/teamphoto/kinley (b&w).png';
import rightArrow from '../../../assets/icons/rightArrow.svg';

const KinleyWangdiPortfolio = () => {
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
      <NavLink to="/team" className="absolute top-6 sm:top-10 left-4 sm:left-6 lg:left-20 flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline z-20">
        <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
        <span>Back to team</span>
      </NavLink>

      <div className="w-full px-3 sm:px-6 py-12 sm:py-20">
        {/* Header/Profile Section */}
        <section className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 mb-20 lg:mb-32 fade-in">
          <div className="flex-1 order-2 lg:order-1 w-full">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-none uppercase mb-4 sm:mb-6">
              Kinley<br className="hidden lg:block" /> Wangdi
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-zinc-200 pt-6">
              <p className="text-lg sm:text-xl lg:text-lg text-zinc-500 font-light max-w-xl">
                Architect (BA-445 P)
              </p>
              <div className="flex gap-6">
                <a href="https://www.linkedin.com/in/kinleywangdi/" target="_blank" rel="noopener noreferrer" className="text-zinc-800 hover:text-zinc-500 transition-colors">
                  <FaLinkedin size={28} />
                </a>
                <a href="mailto:kinleywangdi.1605@gmail.com" className="text-zinc-800 hover:text-zinc-500 transition-colors">
                  <FaEnvelope size={28} />
                </a>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/6 order-1 lg:order-2 mb-8 lg:mb-0 lg:-mt-25">
            <div className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative">
              <img src={kinley} alt="Kinley Wangdi" className="absolute inset-0 w-full h-full object-contain object-bottom" />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-24 lg:mb-40 fade-in">
          <h2 className="text-xl font-bold uppercase tracking-widest text-zinc-400 mb-8 lg:mb-12">About</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-light leading-tight mb-8">
                Creating culturally sensitive designs that harmonize Bhutanese architectural heritage with contemporary needs.
              </p>
              <div className="grid grid-cols-2 gap-8 border-t border-zinc-200 pt-8 mt-12">
                <div>
                  <span className="block text-xs uppercase text-zinc-400 tracking-wider mb-1">Experience</span>
                  <span className="text-lg font-medium">3+ Years</span>
                </div>
                <div>
                  <span className="block text-xs uppercase text-zinc-400 tracking-wider mb-1">Education</span>
                  <span className="text-lg font-medium">B.Arch, CST</span>
                </div>
              </div>
            </div>
            <div className="text-zinc-600 leading-relaxed text-[18px] sm:text-[22px] space-y-6 lg:pt-2">
              <p>
                As a Registered Architect at Saidpiece Architects (BA-445 P with CDB Bhutan), I bring a unique blend of creativity and technical expertise to every project. With a Bachelor's in Architecture from the College of Science and Technology, I specialize in creating culturally sensitive designs that harmonize Bhutanese architectural heritage with contemporary needs.
              </p>
              <p>
                My experience spans diverse project typologies including hospitality, institutional buildings, cultural structures, and commercial developments. I have worked extensively with BIM technology, having completed advanced Autodesk Revit training from Balkan Architects and Rhino training coordinated by JNEC. This technical proficiency enables me to deliver comprehensive design solutions from conceptual design through construction supervision.
              </p>
              <p>
                At Saidpiece Architects, I have led significant projects worth over Nu. 1.5 billion collectively, including the VTC Bumthang Institute (Nu. 500M), Semthoka Retreat Sanctuary (Nu. 300M), and numerous cultural and hospitality projects. My approach combines innovative design thinking with meticulous attention to detail, ensuring each project is not only functional but creates meaningful spaces.
              </p>
            </div>
          </div>
        </section>

        {/* Experience / Expertise Section */}
        <section id="experience" className="mb-24 lg:mb-40 fade-in">
          <h2 className="text-md font-bold uppercase tracking-widest text-zinc-400 mb-8 lg:mb-12">Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-12">
            <div>
              <h3 className="text-xl font-semibold mb-6 uppercase tracking-tight">Design & Software</h3>
              <ul className="space-y-4">
                {['Autodesk Revit', 'Rhinoceros 3D', 'AutoCAD', 'BIM Technology', '3D Modeling', 'Construction Docs'].map(skill => (
                  <li key={skill} className="flex items-center justify-between text-zinc-600 pb-3 border-b border-zinc-100">
                    <span>{skill}</span>
                    <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full" />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 uppercase tracking-tight">Specializations</h3>
              <ul className="space-y-4">
                {['Hospitality Design', 'Cultural Architecture', 'Commercial Design', 'Institutional Projects', 'Design & Build', 'Const. Supervision'].map(skill => (
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
              { title: 'VTC Bumthang', location: 'Bumthang, Bhutan', role: 'Institute Design & Build', type: 'Institutional', year: '2023' },
              { title: 'Semthoka Retreat', location: 'Thimphu, Bhutan', role: 'Hospitality Architecture', type: 'Hospitality', year: '2023' },
              { title: 'Yongkola ECO-Lodge', location: 'Mongar, Bhutan', role: 'Eco-Resort Design', type: 'Hospitality', year: '2023' },
              { title: 'ERA Head Office', location: 'Thimphu, Bhutan', role: 'Corporate Design', type: 'Corporate', year: '2024' },
              { title: 'Clock Tower Plaza', location: 'Thimphu, Bhutan', role: 'Public Space Design', type: 'Public', year: '2015' },
              { title: 'Dewachen Lhakhang', location: 'Bhutan', role: 'Temple Conceptual Design', type: 'Cultural', year: '2023' },
              { title: '21 Tara Retreat', location: 'Bhutan', role: 'Cultural Building Design', type: 'Cultural', year: '2023' },
              { title: 'BNBL Phuntsholing', location: 'Phuntsholing, Bhutan', role: 'Bank Design & Supervision', type: 'Commercial', year: '2023' },
              { title: 'Yangkhil Cafe', location: 'Bhutan', role: 'Commercial Design', type: 'Commercial', year: '2023' },
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

export default KinleyWangdiPortfolio;
