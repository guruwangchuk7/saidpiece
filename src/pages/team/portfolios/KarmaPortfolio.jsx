import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaEnvelope, FaArrowDown } from 'react-icons/fa';
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
                <div className="text-3xl font-semibold cursor-default">Karma Dichen Ongmo</div>
                <ul className="flex flex-wrap justify-center gap-4 lg:gap-8 text-lg lg:text-xl">
                    <li><button onClick={() => scrollToSection('about')} className="hover:text-gray-600 hover:underline underline-offset-4">About</button></li>
                    <li><button onClick={() => scrollToSection('skills')} className="hover:text-gray-600 hover:underline underline-offset-4">Skills</button></li>
                    <li><button onClick={() => scrollToSection('experience')} className="hover:text-gray-600 hover:underline underline-offset-4">Experience</button></li>
                    <li><button onClick={() => scrollToSection('contact')} className="hover:text-gray-600 hover:underline underline-offset-4">Contact</button></li>
                </ul>
            </nav>

            {/* Profile Section */}
            <section className="flex flex-col lg:flex-row items-center justify-center min-h-[80vh] gap-8 lg:gap-12 px-8 py-12 lg:py-0 fade-in">
                <div className="w-64 h-64 lg:w-80 lg:h-80">
                    <img src={karma} alt="Karma Dichen Ongmo" className="rounded-full w-full h-full object-cover" />
                </div>
                <div className="text-center">
                    <p className="text-gray-600 font-semibold mb-2 text-lg lg:text-base">Hello, I'm</p>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-2">Karma Dichen Ongmo</h1>
                    <p className="text-2xl text-gray-600 mb-6">Admin</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                        <NavLink to="/team" className="border-2 border-gray-600 rounded-full px-8 py-3 hover:bg-gray-600 hover:text-white transition-all text-center">Back to Team</NavLink>
                        <button onClick={() => scrollToSection('contact')} className="bg-gray-800 text-white rounded-full px-8 py-3 hover:bg-gray-600 transition-all">Contact Info</button>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <a href="mailto:karmadichen506@gmail.com">
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
                        <img src={karma} alt="Karma Dichen Ongmo" className="rounded-2xl w-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                            <div className="border-2 border-gray-400 rounded-2xl p-6 text-center">
                                <h3 className="text-xl font-semibold mb-2">Experience</h3>
                                <p className="text-gray-600">Diverse Portfolio<br />Surveys & Workshops</p>
                            </div>
                            <div className="border-2 border-gray-400 rounded-2xl p-6 text-center">
                                <h3 className="text-xl font-semibold mb-2">Location</h3>
                                <p className="text-gray-600">Thimphu, Bhutan</p>
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            As the Administrator at Saidpiece Architects, I serve as the central pillar of our daily operations, ensuring that the team functions with efficiency and harmony. My professional foundation is built on a dynamic blend of office management and extensive field experience, which has endowed me with a unique perspective on organizational logistics. I specialize in streamlining administrative workflows, managing communications, and fostering a supportive work environment that allows our architects and engineers to focus on their creative and technical pursuits. My approach is defined by flexibility, proactive problem-solving, and an unwavering commitment to excellence in every task I undertake.
                            <br /><br />
                            My background is distinguished by active participation in significant national-level projects, having served as an enumerator for key initiatives like the National Industry Census, Labour Force Surveys, and World Bank-funded socio-economic assessments. These roles required meticulous attention to detail, rigorous data accuracy, and the ability to engage effectively with diverse community groups across Bhutan. This experience has not only honed my analytical skills but also strengthened my resilience and adaptability in dynamic work settings. 
                            <br /><br />
                            I bring this same level of dedication and precision to Saidpiece, ensuring that our internal processes meet the highest standards of quality and reliability.
                        </p>
                    </div>
                </div>
                <FaArrowDown onClick={() => scrollToSection('skills')} className="mx-auto mt-12 cursor-pointer" size={32} />
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-16 px-8 lg:px-20 fade-in">
                <p className="text-center text-gray-600 mb-2">Explore My</p>
                <h2 className="text-center text-4xl font-bold mb-12">Skills</h2>
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Box 1 */}
                        <div className="border-2 border-gray-400 rounded-2xl p-8">
                            <h3 className="text-2xl font-semibold text-center mb-6">Professional Skills</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    'Interpersonal Skills', 'Communication', 'Time Management', 'Flexibility',
                                    'Leadership', 'Problem Solving'
                                ].map((skill, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="text-green-600 text-xl">✓</div>
                                        <div>
                                            <h4 className="font-semibold text-gray-700">{skill}</h4>
                                            <p className="text-sm text-gray-600">Experienced</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Box 2 */}
                        <div className="border-2 border-gray-400 rounded-2xl p-8">
                            <h3 className="text-2xl font-semibold text-center mb-6">Tools & Attributes</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    'MS Word', 'Teamwork', 'Active Listener',
                                    'Positive Attitude', 'Patience', 'Observational Skills'
                                ].map((skill, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="text-green-600 text-xl">✓</div>
                                        <div>
                                            <h4 className="font-semibold text-gray-700">{skill}</h4>
                                            <p className="text-sm text-gray-600">Experienced</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Language Badge */}
                    <div className="mt-8 text-center">
                        <span className="inline-block bg-gray-100 border border-gray-300 rounded-full px-6 py-2 text-gray-700 font-semibold shadow-sm">
                            Language: English Level C2 - Certificates
                        </span>
                    </div>
                </div>
                <FaArrowDown onClick={() => scrollToSection('experience')} className="mx-auto mt-12 cursor-pointer" size={32} />
            </section>

            {/* Experience (Timeline) Section */}
            <section id="experience" className="py-16 px-8 lg:px-20 fade-in">
                <p className="text-center text-gray-600 mb-2">My Professional</p>
                <h2 className="text-center text-4xl font-bold mb-12">Journey</h2>
                <div className="max-w-6xl mx-auto">
                    <div className="border-2 border-gray-400 rounded-2xl p-8">
                        <div className="space-y-6">
                            {[
                                {
                                    year: "September 2025",
                                    title: "Digital Skilling Program IC3 GS6 (Travel and Tour Guide)",
                                    org: "Funded by The Government Technology Agency, RGoB, Thimphu"
                                },
                                {
                                    year: "August 2025",
                                    title: "Labour Force Survey (Enumerator)",
                                    org: "National Statistics Bureau, Thimphu"
                                },
                                {
                                    year: "February 2025",
                                    title: "Household Consumption and Expenditure Survey (Enumerator)",
                                    org: "Survey and Data Processing Division (SDPD), National Statistics Bureau, Thimphu"
                                },
                                {
                                    year: "January 2025",
                                    title: "Census and Socio-Economic Survey (Enumerator)",
                                    org: "World Bank Project, Department of Infrastructures and Transport, Gelephu"
                                },
                                {
                                    year: "Feb - Apr 2024",
                                    title: "Industry Census 2024 (Enumerator)",
                                    org: "Department of Industry & National Statistics Bureau, Thimphu"
                                },
                                {
                                    year: "January 2024",
                                    title: "Centre College Faculty-led Intensive Credited Program",
                                    org: '"Bhutan: Happiness in the Land of Enlightenment," RTC, Thimphu'
                                },
                                {
                                    year: "November 2023",
                                    title: "De-suung Training Program",
                                    org: "Samdrup Jongkhar"
                                },
                                {
                                    year: "December 2022",
                                    title: "First Mini E-Course on Sexual and Reproductive Health and Rights",
                                    org: "Y-PEER RTC, Thimphu"
                                },
                                {
                                    year: "November 2022",
                                    title: "Green Filmmaking Workshop & Menstrual Cup Workshop",
                                    org: "CMS Vatavaran Festival / EFN Society and Y-PEER RTC, Thimphu"
                                },
                                {
                                    year: "August 2022",
                                    title: "Bhutan Climate Futures Lab Training",
                                    org: "Global Shapers Thimphu Hub, RTC"
                                },
                                {
                                    year: "March 2022",
                                    title: "Earth Hour 2022: 'Shape Our Future'",
                                    org: "Participant"
                                },
                                {
                                    year: "November 2021",
                                    title: "Scouts of the World Discovery Workshop",
                                    org: "Bhutan Scouts Association, Thimphu"
                                },
                                {
                                    year: "July 2021",
                                    title: "Soft Skills Masterclass Workshop Course",
                                    org: "Anita Gurung, Thimphu"
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col md:flex-row gap-2 md:gap-6 border-b border-gray-200 last:border-0 pb-4 last:pb-0 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                    <div className="md:w-32 font-bold text-gray-500 shrink-0">{item.year}</div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-lg">{item.title}</h4>
                                        <p className="text-gray-600">{item.org}</p>
                                    </div>
                                </div>
                            ))}
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
                        <a href="mailto:karmadichen506@gmail.com" className="hover:underline">karmadichen506@gmail.com</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default KarmaPortfolio;
