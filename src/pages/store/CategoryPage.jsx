import { useState, useEffect, useMemo } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import rightArrow from '../../assets/icons/rightArrow.svg';
import { useSiteContent } from '../../context/SiteContentContext';
import Footer from '../../components/layout/Footer';
import ButtonType3 from '../../components/common/ButtonType3';

// Mock product data for each category
const allProducts = [
    { id: 1, title: 'Bespoke Oak Table', price: '$2,400', category: 'furniture', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200&auto=format&fit=crop' },
    { id: 2, title: 'Textured Wall Panel', price: '$450', category: 'interior-finishes', image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1200&auto=format&fit=crop' },
    { id: 3, title: 'Sculptural Floor Lamp', price: '$890', category: 'lighting-electrical', image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1200&auto=format&fit=crop' },
    { id: 4, title: 'Machined Brass Handle', price: '$120', category: 'hardware-accessories', image: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=1200&auto=format&fit=crop' },
    { id: 5, title: 'Ceramic Vessel 01', price: '$320', category: 'decor-art', image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=1200&auto=format&fit=crop' },
    { id: 6, title: 'Minimalist Lounge Chair', price: '$1,200', category: 'furniture', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1200&auto=format&fit=crop' },
];

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
    const { content } = useSiteContent();
    const navData = content?.nav || { titlePart1: 'said', titlePart2: 'piece' };

    const info = categoryInfo[slug] || categoryInfo['all-products'];

    const [selectedId, setSelectedId] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // If it's the "all-products" page, we can show sub-filters. 
    // If it's a specific category, we just show that category's items.
    const products = useMemo(() => {
        if (slug === 'all-products') return allProducts;
        return allProducts.filter(p => p.category === slug);
    }, [slug]);

    const filteredItems = useMemo(() => {
        if (selectedFilter === 'all') return products;
        return products.filter(item => item.category === selectedFilter);
    }, [selectedFilter, products]);

    const subCategories = useMemo(() => {
        if (slug !== 'all-products') return [];
        return [...new Set(allProducts.map(p => p.category))];
    }, [slug]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    // Disable body scroll when modal is open
    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedId]);

    const selectedProduct = useMemo(() => {
        return allProducts.find(p => p.id === selectedId);
    }, [selectedId]);

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
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-12"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredItems.map((p) => (
                                <motion.div
                                    key={p.id}
                                    layoutId={`store-card-${p.id}`}
                                    onClick={() => setSelectedId(p.id)}
                                    className="group cursor-pointer flex flex-col gap-3 sm:gap-4 relative z-0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="relative overflow-hidden w-full h-[300px] sm:h-[350px] lg:h-[450px]">
                                        <motion.img
                                            layoutId={`store-image-${p.id}`}
                                            src={p.image}
                                            alt={p.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                            loading="eager"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <span className="bg-white/90 text-black px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                View Details
                                            </span>
                                        </div>
                                    </div>

                                    <motion.div layoutId={`store-info-${p.id}`} className="border-t border-zinc-200 pt-3 sm:pt-4 bg-white">
                                        <div className="flex justify-between items-start gap-4">
                                            <h3 className="text-black uppercase font-semibold text-base sm:text-lg lg:text-xl tracking-tight leading-tight">{p.title}</h3>
                                            <p className="text-zinc-600 text-sm font-medium shrink-0">{p.price}</p>
                                        </div>
                                        <p className="text-zinc-500 text-xs sm:text-sm lg:text-base capitalize">{p.category.replace('-', ' ')}</p>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            {/* Expanded Overlay - mimicking Portfolio.jsx */}
            <AnimatePresence>
                {selectedId && selectedProduct && (
                    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-md pointer-events-auto"
                        />

                        <motion.div
                            layoutId={`store-card-${selectedId}`}
                            className="w-full h-full md:h-[90vh] md:max-w-[90vw] bg-white md:rounded-lg shadow-2xl overflow-hidden relative z-10 pointer-events-auto flex flex-col md:flex-row rounded-none"
                        >
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-3 sm:top-4 right-3 sm:right-4 md:top-6 md:right-6 z-30 p-2 bg-white/50 hover:bg-white backdrop-blur-sm rounded-full transition-colors"
                            >
                                <svg className="w-5 sm:w-6 h-5 sm:h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="w-full md:w-2/3 h-[35vh] sm:h-[40vh] md:h-full relative bg-zinc-100">
                                <motion.img
                                    layoutId={`store-image-${selectedId}`}
                                    src={selectedProduct.image}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="w-full md:w-1/3 h-full overflow-y-auto bg-white p-4 sm:p-6 md:p-10 lg:p-12 pb-20 md:pb-12 text-black">
                                <motion.div layoutId={`store-info-${selectedId}`} className="mb-6 md:mb-10 flex flex-col gap-1">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tighter leading-none mb-1">
                                        {selectedProduct.title}
                                    </h2>
                                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-500 font-light">
                                        {selectedProduct.price}
                                    </p>
                                    <div className="text-zinc-400 text-xs sm:text-sm font-medium uppercase tracking-wide mb-4">
                                        Collection 2024
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.4 }}
                                >
                                    <p className="text-zinc-600 leading-relaxed text-sm sm:text-base md:text-lg mb-8 md:mb-10">
                                        Handcrafted with architectural precision. This piece from the Saidpiece collection represents our dedication to materiality and minimalist form.
                                    </p>

                                    <div className="flex flex-col gap-y-6 sm:gap-y-8 border-t border-zinc-100 pt-6 sm:pt-8">
                                        <div>
                                            <span className="block text-xs uppercase text-zinc-400 tracking-wider mb-1">Category</span>
                                            <span className="text-sm sm:text-base font-medium text-black capitalize">{selectedProduct.category.replace('-', ' ')}</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs uppercase text-zinc-400 tracking-wider mb-1">Availability</span>
                                            <span className="text-sm sm:text-base font-medium text-black">In Stock / Custom Order</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CategoryPage;
