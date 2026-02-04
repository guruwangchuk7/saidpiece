import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from 'react-icons/fa';
import gsap from 'gsap';
import karma from '../../../assets/teamphoto/karma.png';
import rightArrow from '../../../assets/icons/rightArrow.svg';

const KarmaPortfolio = () => {
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
                <div className="text-3xl font-semibold cursor-default">Karma</div>
                <ul className="flex flex-wrap justify-center gap-4 lg:gap-8 text-lg lg:text-xl">
                    <li><button onClick={() => scrollToSection('about')} className="hover:text-gray-600 hover:underline underline-offset-4">About</button></li>
                    <li><button onClick={() => scrollToSection('experience')} className="hover:text-gray-600 hover:underline underline-offset-4">Experience</button></li>
                    <li><button onClick={() => scrollToSection('contact')} className="hover:text-gray-600 hover:underline underline-offset-4">Contact</button></li>
                </ul>
            </nav>

            {/* Profile Section */}
            <section className="flex flex-col lg:flex-row items-center justify-center min-h-[80vh] gap-8 lg:gap-12 px-8 py-12 lg:py-0 fade-in">
                <div className="w-64 h-64 lg:w-80 lg:h-80">
                    <img src={karma} alt="Karma" className="rounded-full w-full h-full object-cover" />
                </div>
                <div className="text-center">
                    <p className="text-gray-600 font-semibold mb-2 text-lg lg:text-base">Hello, I'm</p>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-2">Karma</h1>
                    <p className="text-2xl text-gray-600 mb-6">Admin</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                        <NavLink to="/team" className="border-2 border-gray-600 rounded-full px-8 py-3 hover:bg-gray-600 hover:text-white transition-all text-center">Back to Team</NavLink>
                        <button onClick={() => scrollToSection('contact')} className="bg-gray-800 text-white rounded-full px-8 py-3 hover:bg-gray-600 transition-all">Contact Info</button>
                    </div>
                    <div className="flex gap-4 justify-center">
                        {/* Social icons - using placeholders or generic links as none provided */}
                        <a href="mailto:karma@example.com">
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
                        <img src={karma} alt="Karma" className="rounded-2xl w-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                            <div className="border-2 border-gray-400 rounded-2xl p-6 text-center">
                                <h3 className="text-xl font-semibold mb-2">Experience</h3>
                                <p className="text-gray-600">Administrative Professional<br />Team Management</p>
                            </div>
                            <div className="border-2 border-gray-400 rounded-2xl p-6 text-center">
                                <h3 className="text-xl font-semibold mb-2">Role</h3>
                                <p className="text-gray-600">Admin<br />Operations Support</p>
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            I am a dedicated administrative professional with a focus on efficient operations and team support. As an Admin at Saidpiece, I ensure smooth day-to-day functioning and contribute to the organizational success through effective management and coordination.
                        </p>
                    </div>
                </div>
                <FaArrowDown onClick={() => scrollToSection('experience')} className="mx-auto mt-12 cursor-pointer" size={32} />
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-16 px-8 lg:px-20 fade-in">
                <p className="text-center text-gray-600 mb-2">Explore My</p>
                <h2 className="text-center text-4xl font-bold mb-12">Skills</h2>
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="border-2 border-gray-400 rounded-2xl p-8">
                            <h3 className="text-2xl font-semibold text-center mb-6">Administrative</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { skill: 'Office Management', level: 'Experienced' },
                                    { skill: 'Scheduling', level: 'Experienced' },
                                    { skill: 'Communication', level: 'Experienced' },
                                    { skill: 'Coordination', level: 'Experienced' },
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
                            <h3 className="text-2xl font-semibold text-center mb-6">Soft Skills</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { skill: 'Teamwork', level: 'Experienced' },
                                    { skill: 'Problem Solving', level: 'Experienced' },
                                    { skill: 'Reliability', level: 'Experienced' },
                                    { skill: 'Organization', level: 'Experienced' },
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
                <FaArrowDown onClick={() => scrollToSection('contact')} className="mx-auto mt-12 cursor-pointer" size={32} />
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-16 px-8 lg:px-20 fade-in">
                <p className="text-center text-gray-600 mb-2">Get in Touch</p>
                <h2 className="text-center text-4xl font-bold mb-12">Contact Me</h2>
                <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-6">
                    <div className="flex items-center gap-3 border-2 border-gray-400 rounded-2xl px-6 py-4">
                        <FaEnvelope size={24} />
                        <a href="mailto:karma@example.com" className="hover:underline">karma@example.com</a>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default KarmaPortfolio;
