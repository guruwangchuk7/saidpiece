import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSiteContent } from '../../context/SiteContentContext';
import rightArrow from '../../assets/icons/rightArrow.svg';

import img1 from '../../assets/store/storeiteams/Wardrobe_accessories_b2.0_series_atmosphere_2_header-1920x901.jpg';
import img2 from '../../assets/store/storeiteams/chair.jpg';
import img3 from '../../assets/store/storeiteams/interiordesing.jpg';
import img4 from '../../assets/store/storeiteams/pexels-pixabay-271795.jpg';

const storeItems = [
    {
        id: 1,
        title: 'All Products',
        slug: 'all-products',
        image: img4,
    },
    {
        id: 2,
        title: 'Furniture',
        slug: 'furniture',
        image: img2,
    },
    {
        id: 3,
        title: 'Interior Finishes',
        slug: 'interior-finishes',
        image: img3,
    },
    {
        id: 4,
        title: 'Lighting & Electrical',
        slug: 'lighting-electrical',
        image: img1,
    },
    {
        id: 5,
        title: 'Hardware & Accessories',
        slug: 'hardware-accessories',
        image: img4,
    },
    {
        id: 6,
        title: 'Decor & Art',
        slug: 'decor-art',
        image: img3,
    }
];

const ParallaxImage = ({ item }) => {
    const containerRef = useRef(null);

    // Create the parallax effect within the image container boundaries
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Slowly move the image top-to-bottom as we scroll past it
    const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

    return (
        <NavLink to={`/store/${item.slug}`}>
            <motion.div
                ref={containerRef}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`group cursor-pointer relative overflow-hidden flex flex-col w-full h-[45vh] sm:h-[65vh] md:h-[85vh] bg-zinc-100 active:opacity-90 transition-opacity duration-300 shadow-sm`}
            >
                {/* Make the image slightly larger so it can animate y cleanly - disabled on mobile */}
                <motion.div
                    style={{
                        y: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : y,
                        scale: 1.15
                    }}
                    className="absolute inset-0 w-full h-full"
                >
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                </motion.div>


                {/* Text always visible, Top Left, Underlined. Reference: "ALL PRODUCTS" */}
                <div className="absolute top-6 left-6 z-10 pointer-events-none">
                    <h3 className="text-white text-sm sm:text-xs tracking-[0.15em] uppercase font-medium border-b border-white pb-1">
                        {item.title}
                    </h3>
                </div>
            </motion.div>
        </NavLink>
    );
};

const Store = () => {
    const { content } = useSiteContent();
    const navData = content?.nav || { titlePart1: 'said', titlePart2: 'piece' };

    return (
        <div>
            <div className="min-h-screen relative bg-white py-6 sm:py-10">
                {/* Back Link */}
                <div className="absolute top-6 sm:top-10 left-3 sm:left-5 lg:left-10 z-20">
                    <NavLink to="/" className="flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline text-black">
                        <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
                        <span>Back to home</span>
                    </NavLink>
                </div>

                <div className="w-full py-12 sm:py-20 lg:py-24 pt-20 sm:pt-24 lg:pt-32">
                    {/* Header */}
                    <div className="px-3 sm:px-5 lg:px-10 mb-10 sm:mb-16 lg:mb-20">
                        <h1 className="logo font-bold text-3xl sm:text-3xl md:text-5xl lg:text-7xl text-neutral-800 tracking-tight leading-tight -ml-0.5" style={{ fontFamily: "century-gothic" }}>
                            <span style={{ color: "#555555" }} className="font-light">{navData.titlePart1}</span><span style={{ opacity: 0.95 }}>{navData.titlePart2}</span> <span className="font-light">store</span>
                        </h1>
                    </div>

                    {/* Display Categories */}
                    <div className="w-full px-4 sm:px-5 lg:px-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-4">
                            {storeItems.map(item => (
                                <ParallaxImage key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Store;
