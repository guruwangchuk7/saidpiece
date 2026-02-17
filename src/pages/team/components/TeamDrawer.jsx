import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { teamPortfolios } from '../../../data/teamPortfolios';
import { Link } from 'react-router-dom';

const TeamDrawer = ({ isOpen, onClose, member }) => {
    // Lock body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!member) return null;

    const details = teamPortfolios[member.slug] || {};
    const { detailedBio = [], aboutQuote = "", expertise = {}, selectedWorks = [] } = details;

    // Helper to get initials
    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('.').toUpperCase() + '.' : '';
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full md:w-[60%] lg:w-[45%] xl:w-[35%] bg-white shadow-2xl z-50 overflow-y-auto"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors z-10"
                            aria-label="Close details"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="w-6 h-6 md:w-8 md:h-8 text-black"
                            >
                                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="square" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <div className="flex flex-col h-full">
                            {/* Scrollable Container with Unified Padding */}
                            <div className="flex-1 overflow-y-auto p-8 md:p-16 pt-24 md:pt-28">

                                {/* Image Section - Full width of padding container for alignment */}
                                <div className="w-full aspect-[4/5] bg-zinc-100 shadow-md mb-12 grayscale">
                                    {member.avatar ? (
                                        <img
                                            src={member.avatar}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-400">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                {/* Content Section */}
                                <div className="flex flex-row gap-8 md:gap-12 lg:gap-16">

                                    {/* Left Column: Initials & Links */}
                                    <div className="w-1/4 shrink-0 flex flex-col gap-12">

                                        {/* Initials */}
                                        <div className="text-base md:text-lg font-medium tracking-widest text-zinc-900 border-b-2 border-transparent">
                                            {getInitials(member.name)}
                                        </div>

                                        {/* Links */}
                                        <div className="flex flex-col gap-4 items-start">
                                            {member.socials && Object.values(member.socials).some(s => s) ? (
                                                <>
                                                    {member.socials.linkedin && (
                                                        <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs font-medium uppercase tracking-widest text-zinc-900 border-b border-black hover:opacity-60 transition-opacity pb-0.5">
                                                            LINKEDIN
                                                        </a>
                                                    )}
                                                    {member.socials.github && (
                                                        <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-xs font-medium uppercase tracking-widest text-zinc-900 border-b border-black hover:opacity-60 transition-opacity pb-0.5">
                                                            GITHUB
                                                        </a>
                                                    )}
                                                    {member.socials.email && (
                                                        <a href={`mailto:${member.socials.email}`} className="text-xs font-medium uppercase tracking-widest text-zinc-900 border-b border-black hover:opacity-60 transition-opacity pb-0.5">
                                                            EMAIL
                                                        </a>
                                                    )}
                                                </>
                                            ) : (
                                                <span className="text-xs text-zinc-400">--</span>
                                            )}
                                        </div>

                                    </div>

                                    {/* Right Column: Bio & Quote & Call to Action */}
                                    <div className="w-3/4 flex flex-col gap-10">

                                        {/* Name Title Block */}
                                        <div>
                                            <h3 className="text-lg uppercase tracking-wider text-zinc-900 font-medium leading-tight">
                                                {member.name}
                                            </h3>
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-1">
                                                {member.role}
                                            </p>
                                        </div>

                                        {/* Short Bio */}
                                        <div className="text-sm md:text-[15px] font-light leading-relaxed text-zinc-600">
                                            {Array.isArray(detailedBio) && detailedBio.length > 0 ? (
                                                <p>{detailedBio[0]}</p>
                                            ) : (
                                                <p>{member.bio}</p>
                                            )}
                                        </div>

                                        {/* Quote */}
                                        {aboutQuote && (
                                            <div className="text-xl md:text-2xl font-normal leading-snug text-zinc-800 tracking-tight">
                                                {aboutQuote}
                                            </div>
                                        )}

                                        {/* Footer Action */}
                                        <div className="pt-8 border-t border-zinc-200 mt-auto">
                                            <Link to="/contact" className="group inline-flex items-center text-xs uppercase tracking-widest font-medium text-zinc-900">
                                                <span>Work With Me</span>
                                                <svg
                                                    className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default TeamDrawer;
