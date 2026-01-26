
import React, { useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { portfolioItems } from '../../data/portfolioItems';
import rightArrow from '../../assets/icons/rightArrow.svg';
import { motion } from "motion/react";

const ProjectGallery = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find current project
    const projectIndex = portfolioItems.findIndex(p => p.id == id);
    const project = portfolioItems[projectIndex];

    // Find next project for navigation
    const nextProject = projectIndex !== -1 && projectIndex < portfolioItems.length - 1
        ? portfolioItems[projectIndex + 1]
        : portfolioItems[0]; // Loop back to start

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) return <div className="min-h-screen flex items-center justify-center">Project not found</div>;

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } }
    };

    return (
        <div className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white pb-20">
            {/* Top Navigation */}
            <div className="fixed top-0 left-0 w-full p-6 z-50 mix-blend-difference text-white flex justify-between items-center pointer-events-none">
                <NavLink to="/portfolio" className="flex items-center gap-3 group pointer-events-auto">
                    <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center transition-all group-hover:bg-white group-hover:text-black">
                        <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180 transition-colors filter hover:brightness-0" style={{ filter: 'invert(1)' }} />
                    </div>
                    <span className="text-sm font-medium tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0">Back</span>
                </NavLink>
                <div className="text-xs font-bold tracking-widest uppercase opacity-50 mix-blend-difference">{project.year}</div>
            </div>

            {/* Hero Section */}
            <header className="relative w-full h-[85vh] flex flex-col justify-end px-4 md:px-12 lg:px-20 pb-16">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="relative z-10 max-w-5xl"
                >
                    <motion.div variants={fadeIn} className="flex items-center gap-4 mb-6">
                        <span className="h-[1px] w-12 bg-zinc-900"></span>
                        <span className="text-sm font-semibold tracking-widest uppercase">{project.subtitle}</span>
                    </motion.div>

                    <motion.h1
                        variants={fadeIn}
                        className="text-5xl md:text-7xl lg:text-9xl font-bold leading-[0.9] tracking-tighter uppercase mb-8"
                        style={{ fontFamily: "century-gothic, sans-serif" }}
                    >
                        {project.title}
                    </motion.h1>

                    <motion.div variants={fadeIn} className="flex flex-col md:flex-row gap-8 md:items-end">
                        <div className="text-sm font-medium tracking-wider uppercase text-zinc-500">
                            {project.location} — {project.year}
                        </div>
                    </motion.div>
                </motion.div>
            </header>

            {/* Main Content Info Grid */}
            <section className="px-4 md:px-12 lg:px-20 py-20 border-t border-zinc-200">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
                    {/* Metadata Column */}
                    <div className="md:col-span-4 lg:col-span-3 space-y-10">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Location</h3>
                                <p className="text-lg">{project.location}</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Client</h3>
                                <p className="text-lg">{project.client}</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Area</h3>
                                <p className="text-lg">{project.size}</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Year</h3>
                                <p className="text-lg">{project.year}</p>
                            </div>
                        </div>
                    </div>

                    {/* Description Column */}
                    <div className="md:col-span-8 lg:col-span-9">
                        <h2 className="text-2xl md:text-4xl leading-tight font-light mb-10 max-w-3xl">
                            "{project.description.substring(0, 100)}..."
                        </h2>
                        <div className="columns-1 md:columns-2 gap-10 text-zinc-600 leading-relaxed text-justify">
                            <p>{project.description}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Image 1 - Hero Wide */}
            <section className="w-full px-4 md:px-6 mb-4">
                <div className="w-full h-[60vh] md:h-[90vh] relative overflow-hidden">
                    <motion.img
                        initial={{ scale: 1.1 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        viewport={{ once: true }}
                        src={project.image}
                        alt={`${project.title} view 1`}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex justify-between items-center mt-2 px-2">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-400">View 01</span>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-400">Exterior Context</span>
                </div>
            </section>

            {/* Spacer */}
            <div className="h-20 md:h-32"></div>

            {/* Image 2 - Detail / Inset */}
            <section className="px-4 md:px-12 lg:px-20 mb-32">
                <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
                    <div className="w-full md:w-4/5 aspect-[4/3] bg-zinc-100 relative overflow-hidden">
                        <motion.img
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            src={project.image}
                            alt={`${project.title} view 2`}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </div>
                <div className="text-center mt-4">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-400">View 02 — Detail</span>
                </div>
            </section>

            {/* Next Project Footer */}
            <div className="border-t border-zinc-200 mt-20">
                <button
                    onClick={() => navigate(`/portfolio/gallery/${nextProject.id}`)}
                    className="w-full py-24 md:py-32 hover:bg-zinc-50 transition-colors flex flex-col items-center justify-center group"
                >
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Next Project</span>
                    <h2
                        className="text-4xl md:text-7xl font-bold uppercase tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity"
                        style={{ fontFamily: "century-gothic, sans-serif" }}
                    >
                        {nextProject.title}
                    </h2>
                    <div className="mt-6 flex items-center gap-2 text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                        View Case Study <img src={rightArrow} alt="arrow" className="w-4 h-4" />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ProjectGallery;
