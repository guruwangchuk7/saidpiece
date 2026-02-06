
import { useState, useMemo, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import rightArrow from '../../assets/icons/rightArrow.svg';

import { blogItems } from '../../data/blogItems';
import H5 from '../home/H5';
import Footer from '../../components/Footer';

const Blog = () => {
    const navigate = useNavigate();
    const [selectedFilter, setSelectedFilter] = useState('all');
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["end end", "end start"]
    });

    const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.8, 0]);

    // Defined filters based on requirements
    const filters = [
        'News',
        'Articles',
        'Publications',
        'Research',
        'events'
    ];

    // Filter items based on selected domain
    const filteredItems = useMemo(() => {
        if (selectedFilter === 'all') return blogItems;
        return blogItems.filter(item => item.domain === selectedFilter);
    }, [selectedFilter]);

    return (
        <div className="w-full">
            <div className="relative z-10 bg-white shadow-none md:shadow-2xl mb-0 md:mb-[100vh]">
                <div ref={containerRef} className="min-h-screen relative flex items-start justify-center bg-white px-4 sm:px-6 lg:px-20 py-6 sm:py-10">
                    <NavLink to="/" className="absolute top-6 sm:top-10 left-7 sm:left-12 lg:left-26 flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline z-20">
                        <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
                        <span>Back to home</span>
                    </NavLink>

                    <div className="w-full px-3 sm:px-6 py-12 sm:py-20">
                        {/* Header section */}
                        <div className="mb-10 sm:mb-10 lg:mb-10">
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight uppercase mb-4 sm:mb-6">
                                Blog
                            </h1>
                        </div>

                        {/* Filter section */}
                        <div className="mb-10 sm:mb-16 flex flex-wrap gap-3 sm:gap-6 items-center">
                            <button
                                onClick={() => setSelectedFilter('all')}
                                className="flex items-center gap-2 group cursor-pointer"
                            >
                                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${selectedFilter === 'all' ? 'bg-black' : 'bg-zinc-300 group-hover:bg-zinc-400'
                                    }`}></div>
                                <span className="text-xs sm:text-sm text-zinc-600 group-hover:text-black transition-colors">All</span>
                            </button>

                            {filters.map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setSelectedFilter(filter)}
                                    className="flex items-center gap-2 group cursor-pointer"
                                >
                                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${selectedFilter === filter ? 'bg-black' : 'bg-zinc-300 group-hover:bg-zinc-400'
                                        }`}></div>
                                    <span className="text-xs sm:text-sm text-zinc-600 group-hover:text-black transition-colors capitalize">
                                        {filter}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Blog grid */}
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-16"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredItems.map((p) => (
                                    <motion.div
                                        key={p.id}
                                        layoutId={`blog-card-${p.id}`}
                                        onClick={() => navigate(`/blog/${p.id}`)}
                                        className="group cursor-pointer flex flex-col gap-3 sm:gap-4 relative z-0"
                                        whileHover={{ y: -5 }}
                                        transition={{ duration: 0.2 }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className="relative overflow-hidden w-full h-[250px] sm:h-[300px] lg:h-[350px]">
                                            <motion.img
                                                layoutId={`blog-image-${p.id}`}
                                                src={p.image}
                                                alt={p.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            {/* Centered Overlay (Author) */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20">
                                                <span className="text-white text-sm sm:text-base font-light tracking-widest uppercase text-center px-4 drop-shadow-md">
                                                    By {p.author}
                                                </span>
                                            </div>
                                        </div>

                                        <motion.div layoutId={`blog-info-${p.id}`} className="pt-4 bg-white">
                                            <div className="flex justify-between items-start gap-4">
                                                <h3 className="text-black uppercase font-semibold text-xs sm:text-sm lg:text-base tracking-tight leading-tight border-b border-zinc-300 pb-1 group-hover:border-black transition-colors">
                                                    {p.title}
                                                </h3>
                                                <span className="text-zinc-500 text-xs sm:text-sm whitespace-nowrap mt-1 font-medium">{p.date}</span>
                                            </div>
                                            <p className="text-zinc-400 text-sm mt-3 font-normal">
                                                {p.domain}
                                            </p>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="relative md:fixed bottom-0 left-0 w-full z-0 h-auto md:h-screen bg-white flex flex-col justify-between">
                {/* Dimming Overlay for Reveal Effect */}
                <motion.div
                    style={{ opacity: overlayOpacity }}
                    className="absolute inset-0 bg-black pointer-events-none z-20 hidden md:block"
                />

                {/* H5 acts as the centered branding content. */}
                <div className="w-full md:h-full flex items-center justify-center relative z-10">
                    <H5 />
                </div>
                <div className="w-full md:absolute md:bottom-0 relative z-10">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Blog;
