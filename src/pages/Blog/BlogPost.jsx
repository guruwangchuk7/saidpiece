
import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { blogItems } from '../../data/blogItems';
import { supabase } from '../../supabaseClient';
import rightArrow from '../../assets/icons/rightArrow.svg';
import Footer from '../../components/Footer';


const BlogPost = () => {
    const { id } = useParams();
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);

    // Get 2 other blog items for the "Further on..." section - keep static for now or fetch random
    const relatedItems = blogItems
        .filter(item => String(item.id) !== id)
        .slice(0, 2);

    useEffect(() => {
        const fetchPost = async () => {
            window.scrollTo(0, 0);
            setLoading(true);

            // 1. Try to find in static data
            // parsing int safely
            let staticItem = null;
            const idInt = parseInt(id);
            if (!isNaN(idInt)) {
                staticItem = blogItems.find(p => p.id === idInt);
            }

            if (staticItem) {
                setSelectedItem(staticItem);
                setLoading(false);
            } else {
                // 2. Fetch from Supabase
                try {
                    const { data, error } = await supabase
                        .from('blogs')
                        .select('*')
                        .eq('id', id)
                        .single();

                    if (error) {
                        console.error("Supabase fetch error:", error);
                        setSelectedItem(null);
                    } else if (data) {
                        setSelectedItem({
                            ...data,
                            subtitle: data.subtitle || data.domain,
                        });
                    }
                } catch (err) {
                    console.error("Fetch error:", err);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-zinc-900">
                <p className="animate-pulse">Loading article...</p>
            </div>
        );
    }

    if (!selectedItem) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-zinc-900">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Post not found</h2>
                    <NavLink to="/blog" className="underline hover:text-zinc-600">Return to Blog</NavLink>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-zinc-900">
            {/* Split Layout Container */}
            <div className="flex flex-col lg:flex-row relative">

                {/* Left Column - Sticky Image */}
                <div className="lg:w-1/2 h-[50vh] lg:h-screen lg:sticky lg:top-0 order-1 lg:order-1">
                    <img
                        src={selectedItem.image}
                        alt={selectedItem.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Column - Scrolling Text Content */}
                <div className="lg:w-1/2 min-h-screen bg-white order-2 lg:order-2">
                    <div className="px-6 sm:px-10 lg:px-20 pt-2 lg:pt-4 pb-16 lg:pb-32 max-w-2xl mx-auto lg:mx-0">
                        {/* Back Button */}
                        <NavLink to="/blog" className="flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline mb-[3cm] w-fit cursor-pointer">
                            <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
                            <span>Back to blog</span>
                        </NavLink>

                        {/* Title Section */}
                        <div className="mb-12 lg:mb-20">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium uppercase mb-8 leading-tight">
                                {selectedItem.title}
                            </h1>

                            <div className="flex justify-between items-center text-xs sm:text-sm uppercase tracking-widest border-t border-b border-zinc-400 py-4 mt-8 text-zinc-600 font-medium flex-wrap gap-2">
                                <span>Author: {selectedItem.author}</span>
                                <span className="uppercase">{selectedItem.domain}</span>
                                <span>{selectedItem.date}</span>
                            </div>
                        </div>

                        {/* Article Content */}
                        <div className="prose prose-zinc max-w-none text-zinc-800 leading-relaxed text-sm sm:text-base">
                            <h3 className="uppercase text-sm font-bold tracking-widest mb-4 text-zinc-500">Why we are talking about this</h3>

                            {/* Render description as multiple paragraphs if it contains newlines */}
                            {selectedItem.description.split('\n').map((paragraph, idx) => (
                                paragraph.trim() && <p key={idx} className="mb-6">{paragraph}</p>
                            ))}

                            {/* Show placeholder content only if it's a static item (id < 100 assumed) or if description is short */}
                            {String(selectedItem.id).length < 5 && (
                                <>
                                    <p className="mb-6">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                    <blockquote className="border-l-2 border-zinc-900 pl-6 italic my-10 text-xl md:text-2xl text-zinc-900 font-serif">
                                        "Architecture is the will of an epoch translated into space."
                                    </blockquote>
                                    <p className="mb-6">
                                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* "Discuss a Joint Project" Scroll Section */}
            <div className="relative w-full px-6 sm:px-10 lg:px-20 py-20 mt-[2cm] overflow-hidden flex items-end min-h-[50vh]">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={selectedItem.image}
                        alt=""
                        className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>

                <div className="relative z-10 w-full text-white shadow-black/20">
                    <p className="text-xs uppercase tracking-widest mb-6 font-medium text-white/90 drop-shadow-md">Saidpiece Media</p>

                    <h2 className="text-2xl sm:text-3xl font-medium uppercase tracking-tight leading-tight mb-8 drop-shadow-md">
                        Discuss <br /> A Joint Project
                    </h2>

                    <NavLink
                        to="/contact"
                        className="group flex items-center gap-6 text-xs sm:text-sm font-medium uppercase tracking-widest border-b border-white pb-3 hover:border-white/70 transition-all w-fit drop-shadow-md"
                    >
                        <span>Leave a Request</span>
                        <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-2 drop-shadow-md">
                            <path d="M0 6H39M39 6L34 1M39 6L34 11" stroke="currentColor" strokeWidth="1" />
                        </svg>
                    </NavLink>
                </div>
            </div>

            {/* "Further On..." Section */}
            <div className="bg-white py-20 px-6 sm:px-10 lg:px-20 border-t border-zinc-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-zinc-400 pb-6 gap-6">
                    <div>
                        <h3 className="text-lg uppercase font-medium tracking-wide">Further</h3>
                        <h3 className="text-lg uppercase font-medium tracking-wide text-zinc-500">On Saidpiece Media</h3>
                    </div>
                    <NavLink to="/blog" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:underline">
                        All Media <span>→</span>
                    </NavLink>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    {relatedItems.map(item => (
                        <NavLink key={item.id} to={`/blog/${item.id}`} className="group block cursor-pointer">
                            <div className="relative overflow-hidden aspect-[4/3] mb-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <h4 className="text-black uppercase font-semibold text-base sm:text-lg tracking-tight leading-tight mb-2 group-hover:text-zinc-600 transition-colors">
                                {item.title}
                            </h4>
                            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-zinc-500">
                                <span>{item.domain}</span>
                                <span>•</span>
                                <span>{item.date}</span>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BlogPost;