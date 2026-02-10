import React, { useEffect, useState, useRef } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import gsap from 'gsap';
import { supabase } from '../../../services/supabaseClient';
import rightArrow from '../../../assets/icons/rightArrow.svg';
import { staticTeamMembers } from '../Team';
import { teamPortfolios } from '../../../data/teamPortfolios';

const TeamPortfolio = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [member, setMember] = useState(null);
    const [detailData, setDetailData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMemberData = async () => {
            setLoading(true);
            try {
                // 1. Try to fetch from Supabase
                const { data, error } = await supabase
                    .from('team_members')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (data && !error) {
                    setMember(data);
                } else {
                    // 2. Fallback to static data
                    const staticMember = staticTeamMembers.find(m => m.slug === slug);
                    if (staticMember) {
                        setMember(staticMember);
                    }
                }

                // 3. Get extra details from teamPortfolios.js if available
                if (teamPortfolios[slug]) {
                    setDetailData(teamPortfolios[slug]);
                } else {
                    setDetailData(null);
                }

            } catch (err) {
                console.error("Error fetching team member:", err);
                const staticMember = staticTeamMembers.find(m => m.slug === slug);
                if (staticMember) setMember(staticMember);
            } finally {
                setLoading(false);
            }
        };

        fetchMemberData();
    }, [slug]);

    useEffect(() => {
        if (member && containerRef.current) {
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
        }
    }, [member]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white text-zinc-900">
            <div className="animate-pulse tracking-widest uppercase text-sm">Loading Profile...</div>
        </div>
    );

    if (!member) return <div className="min-h-screen flex items-center justify-center">Member not found</div>;

    // Helper to get initials
    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

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
                            {member.name}
                        </h1>
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-zinc-200 pt-6">
                            <p className="text-lg sm:text-xl lg:text-lg text-zinc-500 font-light max-w-xl">
                                {member.role}
                            </p>
                            <div className="flex gap-6">
                                {(member.socials?.linkedin || member.linkedin) && (
                                    <a href={member.socials?.linkedin || member.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-800 hover:text-zinc-500 transition-colors">
                                        <FaLinkedin size={28} />
                                    </a>
                                )}
                                {(member.socials?.github || member.github) && (
                                    <a href={member.socials?.github || member.github} target="_blank" rel="noopener noreferrer" className="text-zinc-800 hover:text-zinc-500 transition-colors">
                                        <FaGithub size={28} />
                                    </a>
                                )}
                                {(member.socials?.email || member.email) && (
                                    <a href={`mailto:${member.socials?.email || member.email}`} className="text-zinc-800 hover:text-zinc-500 transition-colors">
                                        <FaEnvelope size={28} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/6 order-1 lg:order-2 mb-8 lg:mb-0 lg:-mt-25">
                        <div className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative bg-zinc-100 flex items-center justify-center">
                            {member.avatar ? (
                                <img src={member.avatar} alt={member.name} className="absolute inset-0 w-full h-full object-cover" />
                            ) : (
                                <span className="text-4xl font-bold text-zinc-300">{getInitials(member.name)}</span>
                            )}
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="mb-24 lg:mb-40 fade-in">
                    <h2 className="text-xl font-bold uppercase tracking-widest text-zinc-400 mb-8 lg:mb-12">About</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                        <div>
                            <p className="text-2xl sm:text-3xl lg:text-4xl font-light leading-tight mb-8">
                                {detailData?.aboutQuote || member.bio}
                            </p>
                            <div className="grid grid-cols-2 gap-8 border-t border-zinc-200 pt-8 mt-12">
                                <div>
                                    <span className="block text-xs uppercase text-zinc-400 tracking-wider mb-1">Position</span>
                                    <span className="text-lg font-medium">{member.role}</span>
                                </div>
                                <div>
                                    <span className="block text-xs uppercase text-zinc-400 tracking-wider mb-1">Focus</span>
                                    <span className="text-lg font-medium">Professional</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-zinc-600 leading-relaxed text-[18px] sm:text-[22px] space-y-6 lg:pt-2">
                            {detailData?.detailedBio ? (
                                detailData.detailedBio.map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))
                            ) : (
                                <p>{member.bio}</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Expertise Section */}
                {detailData?.expertise && (
                    <section id="experience" className="mb-24 lg:mb-40 fade-in">
                        <h2 className="text-md font-bold uppercase tracking-widest text-zinc-400 mb-8 lg:mb-12">Expertise</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-12">
                            {Object.entries(detailData.expertise).map(([category, skills]) => (
                                <div key={category}>
                                    <h3 className="text-xl font-semibold mb-6 uppercase tracking-tight">{category}</h3>
                                    <ul className="space-y-4">
                                        {skills.map(skill => (
                                            <li key={skill} className="flex items-center justify-between text-zinc-600 pb-3 border-b border-zinc-100">
                                                <span>{skill}</span>
                                                <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full" />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Selected Works Section */}
                {detailData?.selectedWorks && (
                    <section id="projects" className="mb-20 fade-in">
                        <h2 className="text-md font-bold uppercase tracking-widest text-zinc-400 mb-8 lg:mb-12">Selected Works</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {detailData.selectedWorks.map((project, idx) => (
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
                )}
            </div>
        </div>
    );
};

export default TeamPortfolio;
