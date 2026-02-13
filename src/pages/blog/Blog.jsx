
import { useState, useMemo, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { FaChevronDown } from 'react-icons/fa';
import rightArrow from '../../assets/icons/rightArrow.svg';
import Footer from '../../components/layout/Footer';
// import { blogItems } from '../../data/blogItems';
import { supabase } from '../../services/supabaseClient';


const Blog = () => {
    const navigate = useNavigate();
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching blogs:', error);
            } else if (data) {
                // Ensure properties match
                const formattedData = data.map(item => ({
                    ...item,
                    subtitle: item.subtitle || item.domain, // Fallback if subtitle missing
                }));
                // Set posts to fetched data only
                setPosts(formattedData);
            }
        };

        fetchBlogs();
    }, []);

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
        if (selectedFilter === 'all') return posts;
        return posts.filter(item => item.domain === selectedFilter);
    }, [selectedFilter, posts]);

    return (
        <div>
            <div className="min-h-screen relative flex items-start justify-center bg-white px-3 sm:px-5 lg:px-10 py-6 sm:py-10 selection:bg-zinc-900 selection:text-white">
                <NavLink to="/" className="absolute top-6 sm:top-10 left-3 sm:left-5 lg:left-10 flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline z-20">
                    <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
                    <span>Back to home</span>
                </NavLink>

                <div className="w-full py-12 sm:py-20">
                    {/* Header section */}
                    <div className="mb-10 sm:mb-10 lg:mb-10">
                        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight uppercase mb-4 sm:mb-6 -ml-0.5">
                            Insights
                        </h1>
                        <p className="text-sm sm:text-sm lg:text-base text-zinc-600 leading-relaxed max-w-2xl">
                            Insights, stories, and latest updates from Saidpiece Architects.
                            Explore our thoughts on design, culture, and architecture.
                        </p>
                    </div>

                    {/* Filter section */}
                    <div className="mb-12 sm:mb-16">
                        {/* Mobile Dropdown */}
                        <div className="sm:hidden relative z-30">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center justify-between w-full px-4 py-3 bg-white border border-zinc-200 rounded-full shadow-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full bg-black`}></div>
                                    <span className="text-sm font-medium text-zinc-900">
                                        {selectedFilter === 'all' ? 'All Categories' : selectedFilter}
                                    </span>
                                </div>
                                <FaChevronDown className={`w-3 h-3 text-zinc-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden py-1 z-50">
                                    <button
                                        onClick={() => { setSelectedFilter('all'); setIsDropdownOpen(false); }}
                                        className="flex items-center w-full px-4 py-3 hover:bg-zinc-50 border-b border-zinc-100 last:border-0 text-left"
                                    >
                                        <div className={`w-2 h-2 rounded-full mr-3 shrink-0 transition-colors ${selectedFilter === 'all' ? 'bg-black' : 'bg-zinc-200'}`}></div>
                                        <span className={`text-sm ${selectedFilter === 'all' ? 'text-black font-medium' : 'text-zinc-600'}`}>All Categories</span>
                                    </button>
                                    {filters.map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => { setSelectedFilter(filter); setIsDropdownOpen(false); }}
                                            className="flex items-center w-full px-4 py-3 hover:bg-zinc-50 border-b border-zinc-100 last:border-0 text-left"
                                        >
                                            <div className={`w-2 h-2 rounded-full mr-3 shrink-0 transition-colors ${selectedFilter === filter ? 'bg-black' : 'bg-zinc-200'}`}></div>
                                            <span className={`text-sm capitalize ${selectedFilter === filter ? 'text-black font-medium' : 'text-zinc-600'}`}>{filter}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Desktop List */}
                        <div className="hidden sm:flex flex-wrap gap-3 sm:gap-6 items-center">
                            <button
                                onClick={() => setSelectedFilter('all')}
                                className="flex items-center gap-2 group cursor-pointer"
                            >
                                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${selectedFilter === 'all' ? 'bg-black' : 'bg-zinc-300 group-hover:bg-zinc-400'
                                    }`}></div>
                                <span className="text-xs sm:text-sm text-zinc-600 group-hover:text-black transition-colors">All Categories</span>
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
                    </div>

                    {/* Blog grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-12"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredItems.map((p) => (
                                <motion.div
                                    key={p.id}
                                    layoutId={`blog-card-${p.id}`}
                                    onClick={() => navigate(`/blog/${p.id}`)}
                                    className="group cursor-pointer flex flex-col gap-3 sm:gap-4 relative z-0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="relative overflow-hidden w-full h-[300px] sm:h-[350px] lg:h-[450px]">
                                        <motion.img
                                            layoutId={`blog-image-${p.id}`}
                                            src={p.image}
                                            alt={p.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            loading="eager"
                                        />
                                        {/* Hover overlay hint */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <span className="bg-white/90 text-black px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                Read Article
                                            </span>
                                        </div>
                                    </div>

                                    <motion.div layoutId={`blog-info-${p.id}`} className="border-t border-zinc-200 pt-3 sm:pt-4 bg-white">
                                        <div className="flex justify-between items-start gap-4">
                                            <h3 className="text-black uppercase font-semibold text-base sm:text-lg lg:text-xl tracking-tight leading-tight group-hover:text-zinc-600 transition-colors">
                                                {p.title}
                                            </h3>
                                            <span className="text-zinc-500 text-xs sm:text-sm whitespace-nowrap mt-1 font-medium">{p.date}</span>
                                        </div>
                                        <p className="text-zinc-500 text-xs sm:text-sm lg:text-base mt-1">
                                            {p.subtitle || p.domain}
                                        </p>
                                        <p className="text-zinc-400 text-xs lg:text-sm mt-1 uppercase tracking-wider font-medium">
                                            By {p.author}
                                        </p>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Blog;