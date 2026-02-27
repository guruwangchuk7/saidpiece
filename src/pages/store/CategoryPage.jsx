import { useState, useEffect, useMemo } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import rightArrow from '../../assets/icons/rightArrow.svg';
import { useSiteContent } from '../../context/SiteContentContext';
import Footer from '../../components/layout/Footer';
import ButtonType3 from '../../components/common/ButtonType3';

import { supabase } from '../../services/supabaseClient';

const categoryInfo = {
    'all-products': {
        title: 'All Products',
        description: 'A comprehensive collection of all Saidpiece products, ranging from large-scale furniture to delicate interior accessories. Each piece is a unique reflection of our architectural vision.',
    },
    'furniture': {
        title: 'Furniture',
        description: 'Sculptural furniture pieces designed for durability, comfort, and aesthetic impact. Conceived as mini-architecture for your space.',
    },
    'interior-finishes': {
        title: 'Interior Finishes',
        description: 'Exclusive textures and materials developed for high-end architectural interiors. Bespoke panels and flooring solutions.',
    },
    'lighting-electrical': {
        title: 'Lighting & Electrical',
        description: 'Ambient lighting solutions that transform the atmosphere. Lighting fixtures designed to sculpt light and planes of depth.',
    },
    'hardware-accessories': {
        title: 'Hardware & Accessories',
        description: 'Detail-oriented hardware and accessories that complete the architectural vision. Handles, hooks, and fasteners with purpose.',
    },
    'decor-art': {
        title: 'Decor & Art',
        description: 'Curated decorative objects and artworks that reflect the Saidpiece aesthetic. Focal points for balanced architectural interiors.',
    }
};

const CategoryPage = () => {
    const { slug } = useParams();
    // Navigation data (currently unused, kept for consistency with layout)

    const info = categoryInfo[slug] || categoryInfo['all-products'];

    const [allProducts, setAllProducts] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchProducts = async () => {
            setLoading(true);
            try {
                let query = supabase.from('products').select('*');

                if (slug !== 'all-products') {
                    query = query.eq('category', slug);
                }

                const { data, error } = await query.order('created_at', { ascending: false });

                if (error) throw error;

                setAllProducts(data);
                setFilteredItems(data);

                if (slug === 'all-products') {
                    const cats = [...new Set(data.map(p => p.category))];
                    setSubCategories(cats);
                }
            } catch (err) {
                console.error("Error fetching category products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [slug]);

    useEffect(() => {
        if (selectedFilter === 'all') {
            setFilteredItems(allProducts);
        } else {
            setFilteredItems(allProducts.filter(item => item.category === selectedFilter));
        }
    }, [selectedFilter, allProducts]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) return <div className="min-h-screen bg-white flex items-center justify-center text-xs uppercase tracking-widest font-light">Loading Category...</div>;

    return (
        <div>
            <div className="min-h-screen relative bg-white px-3 sm:px-5 lg:px-10 py-6 sm:py-10">
                <NavLink to="/store" className="absolute top-6 sm:top-10 left-3 sm:left-5 lg:left-10 flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline z-20">
                    <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
                    <span>Back to store</span>
                </NavLink>

                <div className="w-full py-12 sm:py-20">
                    {/* Header section - mimicking Portfolio.jsx */}
                    <div className="mb-10 sm:mb-10 lg:mb-10">
                        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight uppercase mb-4 sm:mb-6 -ml-0.5">
                            {info.title}
                        </h1>
                        <p className="text-sm sm:text-sm lg:text-base text-zinc-600 leading-relaxed max-w-2xl">
                            {info.description}
                        </p>
                        <div className="mt-6 sm:mt-8">
                            <ButtonType3 title="Inquire Now" to="/contact" />
                        </div>
                    </div>

                    {/* Filter section - only show if "All Products" */}
                    {slug === 'all-products' && (
                        <div className="mb-10 sm:mb-16">
                            {/* Mobile Dropdown */}
                            <div className="sm:hidden relative z-30">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center justify-between w-full px-4 py-3 bg-white border border-zinc-200 rounded-full shadow-sm"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full bg-black`}></div>
                                        <span className="text-sm font-medium text-zinc-900">
                                            {selectedFilter === 'all' ? 'All Categories' : selectedFilter.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
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
                                        {subCategories.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => { setSelectedFilter(cat); setIsDropdownOpen(false); }}
                                                className="flex items-center w-full px-4 py-3 hover:bg-zinc-50 border-b border-zinc-100 last:border-0 text-left"
                                            >
                                                <div className={`w-2 h-2 rounded-full mr-3 shrink-0 transition-colors ${selectedFilter === cat ? 'bg-black' : 'bg-zinc-200'}`}></div>
                                                <span className={`text-sm capitalize ${selectedFilter === cat ? 'text-black font-medium' : 'text-zinc-600'}`}>{cat.replace('-', ' ')}</span>
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
                                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${selectedFilter === 'all' ? 'bg-black' : 'bg-zinc-300 group-hover:bg-zinc-400'}`}></div>
                                    <span className="text-xs sm:text-sm text-zinc-600 group-hover:text-black transition-colors">All Categories</span>
                                </button>

                                {subCategories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedFilter(cat)}
                                        className="flex items-center gap-2 group cursor-pointer"
                                    >
                                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${selectedFilter === cat ? 'bg-black' : 'bg-zinc-300 group-hover:bg-zinc-400'}`}></div>
                                        <span className="text-xs sm:text-sm text-zinc-600 group-hover:text-black transition-colors capitalize">
                                            {cat.replace('-', ' ')}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Product grid - matched to Portfolio.jsx grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-12">
                        <AnimatePresence mode="popLayout">
                            {filteredItems.map((p) => (
                                <NavLink
                                    key={p.id}
                                    to={`/store/product/${p.slug}`}
                                    className="group flex flex-col gap-3 sm:gap-4 relative z-0"
                                >
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className="relative overflow-hidden w-full h-[300px] sm:h-[350px] lg:h-[450px]">
                                            <img
                                                src={p.images?.[0] || p.image}
                                                alt={p.title}
                                                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                                loading="eager"
                                            />
                                        </div>

                                        <div className="border-t border-zinc-200 pt-3 sm:pt-4 bg-white">
                                            <div className="flex justify-between items-start gap-4">
                                                <h3 className="text-black uppercase font-semibold text-base sm:text-lg lg:text-xl tracking-tight leading-tight">{p.title}</h3>
                                                <p className="text-zinc-400 text-[10px] lg:text-xs mt-1 uppercase tracking-widest shrink-0">{p.price}</p>
                                            </div>
                                            <p className="text-zinc-500 text-xs sm:text-sm lg:text-base capitalize">{p.category.replace('-', ' ')}</p>
                                        </div>
                                    </motion.div>
                                </NavLink>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
