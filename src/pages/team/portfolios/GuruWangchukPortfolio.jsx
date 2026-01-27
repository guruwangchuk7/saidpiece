import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from 'react-icons/fa';
import gsap from 'gsap';
import guru from '../../../assets/teamphoto/guru (b&w).png';
import rightArrow from '../../../assets/icons/rightArrow.svg';

const GuruWangchukPortfolio = () => {
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
      <nav className="flex justify-between items-center h-[17vh] px-8 lg:px-20">
        <div className="text-3xl font-semibold cursor-default">Guru Wangchuk</div>
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
          <img src={guru} alt="Guru Wangchuk" className="rounded-full w-full h-full object-cover" />
        </div>
        <div className="text-center">
          <p className="text-gray-600 font-semibold mb-2">Hello, I'm</p>
          <h1 className="text-5xl font-bold mb-2">Guru Wangchuk</h1>
          <p className="text-2xl text-gray-600 mb-6">Full Stack Developer</p>
          <div className="flex gap-4 justify-center mb-6">
            <NavLink to="/team" className="border-2 border-gray-600 rounded-full px-8 py-3 hover:bg-gray-600 hover:text-white transition-all">Back to Team</NavLink>
            <button onClick={() => scrollToSection('contact')} className="bg-gray-800 text-white rounded-full px-8 py-3 hover:bg-gray-600 transition-all">Contact Info</button>
          </div>
          <div className="flex gap-4 justify-center">
            <a href="https://github.com/guruwangchuk7" target="_blank" rel="noopener noreferrer">
              <FaGithub size={32} className="cursor-pointer hover:opacity-70" />
            </a>
            <a href="https://www.linkedin.com/in/dw3Xf4Q6" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={32} className="cursor-pointer hover:opacity-70" />
            </a>
            <a href="mailto:guruwangchuk1234@gmail.com">
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
            <img src={guru} alt="Guru Wangchuk" className="rounded-2xl" />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="border-2 border-gray-400 rounded-2xl p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Experience</h3>
                <p className="text-gray-600">2+ years<br />Full Stack Development</p>
              </div>
              <div className="border-2 border-gray-400 rounded-2xl p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <p className="text-gray-600">Bachelor of Computer Application<br />Chandigarh University (GPA: 7.88/10)</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              I am a dedicated and hardworking student passionate about programming with good decision-making skills. Currently pursuing a Bachelor of Computer Application at Chandigarh University (expected graduation July 2026), I maintain a GPA of 7.88/10 while focusing on full stack web development, team management, and cybersecurity.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              My technical expertise spans across programming languages including Python, C++, C, PHP, HTML/CSS, JavaScript, and SQL. I am proficient in modern development tools like VS Code, Figma, and Adobe Photoshop. I have hands-on experience working as a Full Stack Developer and Frontend Developer at Saidpiece and Blockvocates, where I've contributed to various web development projects.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Beyond coding, I have demonstrated strong leadership skills as a Bhutanese College Representative at Chandigarh University (representing 200+ members), and previously served as Scout Troop Leader and Audio Visual Captain at Peljorling Higher Secondary School. I am efficient and productive, maintaining high quality while staying focused and disciplined to achieve goals and continuously improve.
            </p>
          </div>
        </div>
        <FaArrowDown onClick={() => scrollToSection('experience')} className="mx-auto mt-12 cursor-pointer" size={32} />
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-8 lg:px-20 fade-in">
        <p className="text-center text-gray-600 mb-2">Explore My</p>
        <h2 className="text-center text-4xl font-bold mb-12">Experience</h2>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-gray-400 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-center mb-6">Frontend Development</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { skill: 'HTML/CSS', level: 'Experienced' },
                  { skill: 'JavaScript', level: 'Experienced' },
                  { skill: 'PHP', level: 'Experienced' },
                  { skill: 'Figma', level: 'Experienced' },
                  { skill: 'UI/UX Design', level: 'Experienced' },
                  { skill: 'Adobe Photoshop', level: 'Experienced' },
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
              <h3 className="text-2xl font-semibold text-center mb-6">Programming & Tools</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { skill: 'Python', level: 'Experienced' },
                  { skill: 'C++', level: 'Experienced' },
                  { skill: 'C', level: 'Experienced' },
                  { skill: 'SQL', level: 'Experienced' },
                  { skill: 'VS Code', level: 'Experienced' },
                  { skill: 'Data Structures', level: 'Experienced' },
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
            { title: 'Student Management System', desc: 'C++ console-based app with DSA for managing student records' },
            { title: 'Certificate Validation System', desc: 'Blockchain-based student certificate validation using web tech' },
            { title: 'Saidpiece Website', desc: 'Full Stack Developer - Company portfolio built with modern web stack' },
          ].map((project, idx) => (
            <div key={idx} className="border-2 border-gray-400 rounded-2xl p-6">
              <div className="bg-gray-100 rounded-xl h-64 mb-4 flex items-center justify-center">
                <p className="text-6xl text-gray-400">💻</p>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">{project.title}</h3>
              <p className="text-sm text-gray-600 text-center mb-4">{project.desc}</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => window.open('https://github.com/guruwangchuk7', '_blank')} className="border-2 border-gray-600 rounded-full px-6 py-2 hover:bg-gray-600 hover:text-white transition-all">Github</button>
                <button className="border-2 border-gray-600 rounded-full px-6 py-2 hover:bg-gray-600 hover:text-white transition-all">Live Demo</button>
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
            <a href="mailto:guruwangchuk1234@gmail.com" className="hover:underline">guruwangchuk1234@gmail.com</a>
          </div>
          <div className="flex items-center gap-3 border-2 border-gray-400 rounded-2xl px-6 py-4">
            <FaLinkedin size={24} />
            <a href="https://www.linkedin.com/in/dw3Xf4Q6" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default GuruWangchukPortfolio;
