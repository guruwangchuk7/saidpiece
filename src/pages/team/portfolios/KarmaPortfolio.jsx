import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';
import gsap from 'gsap';
import karma from '../../../assets/teamphoto/karm.webp';
import rightArrow from '../../../assets/icons/rightArrow.svg';

const KarmaPortfolio = () => {
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
                            Karma<br className="hidden lg:block" /> Dichen Ongmo
                        </h1>
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-zinc-200 pt-6">
                            <p className="text-lg sm:text-xl lg:text-lg text-zinc-500 font-light max-w-xl">
                                Administrator
                            </p>
                            <div className="flex gap-6">
                                <a href="mailto:karmadichen506@gmail.com" className="text-zinc-800 hover:text-zinc-500 transition-colors">
                                    <FaEnvelope size={28} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/6 order-1 lg:order-2 mb-8 lg:mb-0 lg:-mt-25">
                        <div className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative">
                            <img src={karma} alt="Karma Dichen Ongmo" className="absolute inset-0 w-full h-full object-contain object-bottom" />
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="mb-24 lg:mb-40 fade-in">
                    <h2 className="text-xl font-bold uppercase tracking-widest text-zinc-400 mb-8 lg:mb-12">About</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                        <div>
                            <p className="text-2xl sm:text-3xl lg:text-4xl font-light leading-tight mb-8">
                                The central pillar of daily operations, ensuring team functions with efficiency and harmony through streamlined workflows.
                            </p>
                            <div className="grid grid-cols-2 gap-8 border-t border-zinc-200 pt-8 mt-12">
                                <div>
                                    <span className="block text-xs uppercase text-zinc-400 tracking-wider mb-1">Experience</span>
                                    <span className="text-lg font-medium">4+ Years</span>
                                </div>
                                <div>
                                    <span className="block text-xs uppercase text-zinc-400 tracking-wider mb-1">Location</span>
                                    <span className="text-lg font-medium">Thimphu, Bhutan</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-zinc-600 leading-relaxed text-[18px] sm:text-[22px] space-y-6 lg:pt-2">
                            <p>
                                As the Administrator at Saidpiece Architects, I serve as the central pillar of our daily operations, ensuring that the team functions with efficiency and harmony. My professional foundation is built on a dynamic blend of office management and extensive field experience, which has endowed me with a unique perspective on organizational logistics. I specialize in streamlining administrative workflows, managing communications, and fostering a supportive work environment.
                            </p>
                            <p>
                                My background is distinguished by active participation in significant national-level projects, having served as an enumerator for key initiatives like the National Industry Census, Labour Force Surveys, and World Bank-funded socio-economic assessments. These roles required meticulous attention to detail, rigorous data accuracy, and the ability to engage effectively with diverse community groups across Bhutan.
                            </p>
                            <p>
                                I bring this same level of dedication and precision to Saidpiece, ensuring that our internal processes meet the highest standards of quality and reliability. My approach is defined by flexibility, proactive problem-solving, and an unwavering commitment to excellence in every task I undertake.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Experience / Expertise Section */}
                <section id="experience" className="mb-24 lg:mb-40 fade-in">
                    <h2 className="text-md font-bold uppercase tracking-widest text-zinc-400 mb-8 lg:mb-12">Expertise</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-12">
                        <div>
                            <h3 className="text-xl font-semibold mb-6 uppercase tracking-tight">Professional Skills</h3>
                            <ul className="space-y-4">
                                {['Interpersonal Skills', 'Communication', 'Time Management', 'Flexibility', 'Leadership', 'Problem Solving'].map(skill => (
                                    <li key={skill} className="flex items-center justify-between text-zinc-600 pb-3 border-b border-zinc-100">
                                        <span>{skill}</span>
                                        <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-6 uppercase tracking-tight">Tools & Attributes</h3>
                            <ul className="space-y-4">
                                {['MS Office Suite', 'Teamwork', 'Active Listing', 'Office Management', 'Data Collection', 'Logistics'].map(skill => (
                                    <li key={skill} className="flex items-center justify-between text-zinc-600 pb-3 border-b border-zinc-100">
                                        <span>{skill}</span>
                                        <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Projects/Journey List */}
                <section id="projects" className="mb-20 fade-in">
                    <h2 className="text-md font-bold uppercase tracking-widest text-zinc-400 mb-8 lg:mb-12">Professional Journey</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'Industry Census', location: 'Thimphu', role: 'Enumerator', type: 'NSB Survey', year: '2024' },
                            { title: 'Labour Force Survey', location: 'Thimphu', role: 'Enumerator', type: 'NSB Survey', year: '2025' },
                            { title: 'Socio-Economic Survey', location: 'Gelephu', role: 'Enumerator', type: 'World Bank', year: '2025' },
                            { title: 'Digital Skilling', location: 'Thimphu', role: 'Participant', type: 'GovTech', year: '2025' },
                            { title: 'De-suung Training', location: 'Samdrup Jongkhar', role: 'Trainee', type: 'National Service', year: '2023' },
                            { title: 'Climate Futures Lab', location: 'RTC', role: 'Trainee', type: 'Workshop', year: '2022' },
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

export default KarmaPortfolio;
