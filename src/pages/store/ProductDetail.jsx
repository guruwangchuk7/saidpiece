import { useState, useEffect, useRef } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaPlus, FaMinus } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import rightArrow from '../../assets/icons/rightArrow.svg';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const productData = {
    'bespoke-oak-table': {
        id: 1,
        title: 'Bespoke Oak Table',
        price: '$2,400',
        category: 'furniture',
        images: [
            'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1495433324511-bf8e92934d90?q=80&w=1200&auto=format&fit=crop'
        ],
        colors: [
            { id: 'natural', name: 'Natural Oak', hex: '#DAA520' },
            { id: 'dark', name: 'Dark Stained', hex: '#3B2F2F' },
            { id: 'white', name: 'White Wash', hex: '#F5F5F5' }
        ],
        sizes: ['Small (120x80cm)', 'Medium (160x90cm)', 'Large (200x100cm)', 'Bespoke Size'],
        information: [
            {
                title: 'Material',
                content: 'Sourced from sustainably managed European forests. Our solid oak is selected for its distinct grain patterns and structural integrity.'
            },
            {
                title: 'Craftsmanship',
                content: 'Each table is handcrafted using traditional joinery techniques. The surface is finished with multiple layers of natural oil for a durable and sensory experience.'
            },
            {
                title: 'Lead Time',
                content: 'As each piece is made to order, please allow 8-12 weeks for production and delivery.'
            }
        ]
    }
};

const Accordion = ({ title, children, isOpen, onToggle }) => {
    return (
        <div className="border-b border-zinc-200">
            <button
                onClick={onToggle}
                className="w-full py-6 flex justify-between items-center text-xs font-bold uppercase tracking-widest text-black hover:text-black/60 transition-colors"
            >
                <span>{title}</span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <FaPlus className={isOpen ? 'hidden' : 'block'} />
                    <FaMinus className={isOpen ? 'block' : 'hidden'} />
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-8 text-sm sm:text-base text-zinc-600 leading-relaxed space-y-4">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ProductDetail = () => {
    const { id } = useParams();
    const product = productData[id] || productData['bespoke-oak-table'];
    const [activeImageIdx, setActiveImageIdx] = useState(0);
    const [direction, setDirection] = useState(0);
    const [selectedColor, setSelectedColor] = useState(product.colors[0].id);
    const [quantity, setQuantity] = useState(1);
    const [openAccordion, setOpenAccordion] = useState(null);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 1
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? '100%' : '-100%',
            opacity: 1
        })
    };

    const handleImageChange = (newIndex) => {
        setDirection(newIndex > activeImageIdx ? 1 : -1);
        setActiveImageIdx(newIndex);
    };

    const mainRef = useRef(null);
    const heroRef = useRef(null);
    const heroImageRef = useRef(null);
    const productInterfaceRef = useRef(null);

    const handleScrollDown = () => {
        productInterfaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const context = gsap.context(() => {
            if (prefersReducedMotion) {
                gsap.set("[data-animate-child], [data-animate='hero-title']", { opacity: 1, y: 0 });
                return;
            }

            // Hero Title Animation
            gsap.from("[data-animate='hero-title']", {
                opacity: 0,
                y: 40,
                duration: 1.5,
                ease: 'power3.out',
                delay: 0.3,
            });

            // Hero Image Zoom Animation (matching About page)
            gsap.to(heroImageRef.current, {
                scale: 1.3,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                },
            });

            // Section Animations
            const sections = gsap.utils.toArray("[data-animate-section]");
            sections.forEach(section => {
                const elementsToAnimate = section.querySelectorAll("[data-animate-child]");
                gsap.from(elementsToAnimate, {
                    opacity: 0,
                    y: 50,
                    scale: 0.98,
                    duration: 1.2,
                    ease: 'power3.out',
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                });
            });

            const timer = setTimeout(() => ScrollTrigger.refresh(), 100);
            return () => clearTimeout(timer);
        }, mainRef);

        return () => context.revert();
    }, [id]);

    return (
        <main ref={mainRef} className="w-full flex flex-col bg-white antialiased text-black relative">
            <NavLink
                to="/store"
                className="absolute top-6 sm:top-10 left-3 sm:left-5 lg:left-10 flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline z-30 text-white"
            >
                <img src={rightArrow} alt="Back" className="w-4 h-4 rotate-180 invert" />
                <span>Back to store</span>
            </NavLink>

            {/* Hero Section - Matching About Page */}
            <header
                ref={heroRef}
                className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center text-white text-center"
            >
                <div
                    ref={heroImageRef}
                    className="absolute inset-0 w-full h-full bg-cover bg-center grayscale brightness-75"
                    style={{ backgroundImage: `url(${product.images[0]})` }}
                />
                <div className="absolute inset-0 bg-black/20 z-10" />
                <div data-animate="hero-title" className="relative z-20 px-5 -mt-40">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-normal max-w-4xl mx-auto leading-tight tracking-wide">
                        {product.title}
                    </h1>
                </div>

                <motion.div
                    className="absolute bottom-32 flex flex-col items-center gap-3 cursor-pointer z-20"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    style={{ fontFamily: "century-gothic" }}
                    onClick={handleScrollDown}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <img src={rightArrow} alt="Scroll down" className="w-5 rotate-90 opacity-70 invert" />
                    <span className="text-sm font-light border-b border-white pb-1">scroll down</span>
                </motion.div>
            </header>

            {/* Product Interface Section - Integrated Layout */}
            <section ref={productInterfaceRef} data-animate-section className="py-16 lg:py-32 px-3 sm:px-5 lg:px-10">
                <div className="max-w-[1800px] mx-auto">
                    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start lg:gap-[4cm] relative lg:pl-[6cm]">

                        {/* Main Viewer column container */}
                        <div data-animate-child className="relative">

                            {/* Thumbnails (Mobile: Row below, Desktop: Absolute left of image with 1.5cm gap) */}
                            <div className="lg:absolute lg:top-0 lg:right-[calc(100%+0.5cm)] flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:max-h-[80vh] no-scrollbar mt-8 lg:mt-0 order-2 lg:order-1">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleImageChange(idx)}
                                        className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-white transition-all duration-300 p-1 border ${activeImageIdx === idx ? 'border-black opacity-100' : 'border-transparent opacity-40 hover:opacity-100'}`}
                                    >
                                        <img src={img} alt={`${product.title} ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>

                            {/* Main Viewer - Fixed 19cm x 19cm */}
                            <div className="order-1 lg:order-2">
                                <div className="w-[19cm] h-[19cm] bg-zinc-50 overflow-hidden relative shadow-sm">
                                    <AnimatePresence initial={false} custom={direction}>
                                        <motion.img
                                            key={activeImageIdx}
                                            src={product.images[activeImageIdx]}
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{
                                                x: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
                                            }}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </AnimatePresence>

                                </div>

                            </div>
                        </div>

                        {/* Configuration Panel - Architecture Grid Style */}
                        <div data-animate-child className="lg:sticky lg:top-32 lg:h-fit w-full lg:w-[450px] mt-12 lg:mt-0">
                            <div className="space-y-4">
                                <div className="space-y-2 border-b border-zinc-200 pb-4">
                                    <h2 className="text-xl md:text-2xl lg:text-3xl font-light leading-tight text-black uppercase tracking-tight">{product.title}</h2>
                                    <p className="text-lg md:text-xl text-black font-light tracking-tight">{product.price}</p>
                                </div>

                                {/* Row Based Options */}
                                <div className="space-y-0 text-[10px] tracking-widest uppercase text-black font-medium">



                                    <div className="flex items-center py-6 border-b border-zinc-200">
                                        <span className="w-24 text-black">MATERIAL</span>
                                        <span className="text-black">SOLID EUROPEAN OAK</span>
                                    </div>

                                    {/* SIZE ROW */}
                                    <div className="flex items-center py-6 border-b border-zinc-200">
                                        <span className="w-24 text-black">SIZE</span>
                                        <div className="flex-1 flex justify-between items-center group cursor-pointer text-black">
                                            <select className="appearance-none bg-transparent w-full focus:outline-none cursor-pointer">
                                                {product.sizes.map(size => (
                                                    <option key={size} value={size}>{size}</option>
                                                ))}
                                            </select>
                                            <FaChevronDown className="text-[10px] text-black/20 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* QUANTITY ROW */}
                                    <div className="flex items-center py-6">
                                        <div className="flex items-center border border-zinc-200 bg-white">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="px-4 py-5 hover:bg-zinc-50 border-r border-zinc-200"
                                            >
                                                <FaMinus className="text-[8px] text-zinc-400" />
                                            </button>
                                            <span className="w-12 text-center text-xs font-normal text-black">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="px-4 py-5 hover:bg-zinc-50 border-l border-zinc-200"
                                            >
                                                <FaPlus className="text-[8px] text-zinc-400" />
                                            </button>
                                        </div>

                                        {/* ADD TO CART - INTEGRATED */}
                                        <button className="flex-1 ml-4 bg-[#2C2C2C] text-white flex justify-between items-center px-6 py-6 group transition-all hover:bg-black">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Add to Cart</span>
                                            <img
                                                src={rightArrow}
                                                alt="arrow"
                                                className="w-5 invert transition-transform duration-500 group-hover:translate-x-1"
                                            />
                                        </button>
                                    </div>
                                </div>


                                {/* Information Accordions */}
                                <div className="pt-2 border-t border-zinc-100">
                                    <Accordion
                                        title="Information"
                                        isOpen={openAccordion === 'INFORMATION'}
                                        onToggle={() => setOpenAccordion(openAccordion === 'INFORMATION' ? null : 'INFORMATION')}
                                    >
                                        <div className="space-y-10">
                                            {product.information.map((item, idx) => (
                                                <div key={idx} className="space-y-4">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-black">{item.title}</p>
                                                    <p className="text-sm lg:text-xl text-black font-light leading-relaxed text-justify">{item.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </Accordion>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProductDetail;
