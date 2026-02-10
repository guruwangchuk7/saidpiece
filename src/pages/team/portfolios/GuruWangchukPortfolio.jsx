import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import gsap from 'gsap';
import guru from '../../../assets/teamphoto/gurub.jpeg';
import rightArrow from '../../../assets/icons/rightArrow.svg';

const GuruWangchukPortfolio = () => {
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
              Guru<br className="hidden lg:block" /> Wangchuk
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-zinc-200 pt-6">
              <p className="text-lg sm:text-xl lg:text-lg text-zinc-500 font-light max-w-xl">
                Full Stack Developer
              </p>
              <div className="flex gap-6">
                <a href="https://github.com/guruwangchuk7" target="_blank" rel="noopener noreferrer" className="text-zinc-800 hover:text-zinc-500 transition-colors">
                  <FaGithub size={28} />
                </a>
                <a href="https://www.linkedin.com/in/dw3Xf4Q6" target="_blank" rel="noopener noreferrer" className="text-zinc-800 hover:text-zinc-500 transition-colors">
                  <FaLinkedin size={28} />
                </a>                <a href="mailto:guruwangchuk1234@gmail.com" className="text-zinc-800 hover:text-zinc-500 transition-colors">
                  <FaEnvelope size={28} />
                </a>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/6 order-1 lg:order-2 mb-8 lg:mb-0 lg:-mt-25">
            <div className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative">
              <img src={guru} alt="Guru Wangchuk" className="absolute inset-0 w-full h-full object-contain object-bottom" />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-24 lg:mb-40 fade-in">
          <h2 className="text-xl font-bold uppercase tracking-widest text-zinc-400 mb-8 lg:mb-12">About</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-light leading-tight mb-8">
                Passionate about programming, full stack web development, and cybersecurity, with strong leadership and team management skills.
              </p>
              <div className="grid grid-cols-2 gap-8 border-t border-zinc-200 pt-8 mt-12">
                <div>
                  <span className="block text-xs uppercase text-zinc-400 tracking-wider mb-1">Experience</span>
                  <span className="text-lg font-medium">2+ Years</span>
                </div>
                <div>
                  <span className="block text-xs uppercase text-zinc-400 tracking-wider mb-1">Education</span>
                  <span className="text-lg font-medium">BCA, Chandigarh Univ.</span>
                </div>
              </div>
            </div>
            <div className="text-zinc-600 leading-relaxed text-[18px] sm:text-[22px] space-y-6 lg:pt-2">
              <p>
                I am a dedicated and hardworking student passionate about programming with good decision-making skills. Currently pursuing a Bachelor of Computer Application at Chandigarh University (expected graduation July 2026), I maintain a GPA of 7.88/10 while focusing on full stack web development, team management, and cybersecurity.
              </p>
              <p>
                My technical expertise spans across programming languages including Python, C++, C, PHP, HTML/CSS, JavaScript, and SQL. I am proficient in modern development tools like VS Code, Figma, and Adobe Photoshop. I have hands-on experience working as a Full Stack Developer and Frontend Developer at Saidpiece and Blockvocates, where I've contributed to various web development projects.
              </p>
              <p>
                Beyond coding, I have demonstrated strong leadership skills as a Bhutanese College Representative at Chandigarh University (representing 200+ members), and previously served as Scout Troop Leader and Audio Visual Captain at Peljorling Higher Secondary School. I am efficient and productive, maintaining high quality while staying focused and disciplined to achieve goals and continuously improve.
              </p>
            </div>
          </div>
        </section>

        {/* Experience / Expertise Section */}
        <section id="experience" className="mb-24 lg:mb-40 fade-in">
          <h2 className="text-md font-bold uppercase tracking-widest text-zinc-400 mb-8 lg:mb-12">Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-12">
            <div>
              <h3 className="text-xl font-semibold mb-6 uppercase tracking-tight">Frontend Development</h3>
              <ul className="space-y-4">
                {['HTML/CSS', 'JavaScript', 'PHP', 'Figma', 'UI/UX Design', 'Adobe Photoshop'].map(skill => (
                  <li key={skill} className="flex items-center justify-between text-zinc-600 pb-3 border-b border-zinc-100">
                    <span>{skill}</span>
                    <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full" />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 uppercase tracking-tight">Programming & Tools</h3>
              <ul className="space-y-4">
                {['Python', 'C++', 'C', 'SQL', 'VS Code', 'Data Structures'].map(skill => (
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
              { title: 'Student Management System', location: 'C++', role: 'Sole Developer', type: 'Console App', year: '2022' },
              { title: 'Certificate Validation', location: 'Web', role: 'Full Stack', type: 'Blockchain', year: '2023' },
              { title: 'Saidpiece Website', location: 'Web', role: 'Full Stack Developer', type: 'Portfolio', year: '2023' },
              { title: 'Civic Sense', location: 'Mobile/Web', role: 'Developer', type: 'Community App', year: '2024' },
              { title: 'Pharma-Blockchain', location: 'Web', role: 'Developer', type: 'Supply Chain', year: '2023' },
              { title: 'Face Recognition', location: 'Python', role: 'AI Developer', type: 'Security', year: '2023' },
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

export default GuruWangchukPortfolio;
