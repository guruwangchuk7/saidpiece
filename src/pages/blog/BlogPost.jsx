
import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
// import { blogItems } from '../../data/blogItems';
import ReactMarkdown from 'react-markdown';
import { supabase } from '../../services/supabaseClient';
import rightArrow from '../../assets/icons/rightArrow.svg';
import Footer from '../../components/layout/Footer';
import ctaImg from '../../assets/calltoaction/keyboard.webp';
import SEO from '../../components/common/SEO';


const BlogPost = () => {
    const { id } = useParams();
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);

    // Get 2 other blog items for the "Further on..." section - keep static for now or fetch random
    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            window.scrollTo(0, 0);
            setLoading(true);

            // Fetch from Supabase (Numeric ID)
            try {
                // Fetch current post
                const { data: postData, error: postError } = await supabase
                    .from('blogs')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (postError) {
                    console.error("Supabase fetch error:", postError);
                    setSelectedItem(null);
                } else if (postData) {
                    setSelectedItem({
                        ...postData,
                        subtitle: postData.subtitle || postData.domain,
                    });

                    // Fetch related posts (exclude current)
                    const { data: relatedData } = await supabase
                        .from('blogs')
                        .select('id, title, image, domain, date')
                        .neq('id', id)
                        .limit(2);

                    if (relatedData) {
                        setRelatedPosts(relatedData);
                    }
                }
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
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
                <SEO title="Post Not Found" noindex={true} />
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Post not found</h2>
                    <NavLink to="/blog" className="underline hover:text-zinc-600">Return to Insights</NavLink>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black">
            <SEO
                title={selectedItem.title}
                description={selectedItem.description.substring(0, 160).replace(/[#*]/g, '')}
                canonical={`/blog/${id}`}
            />
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
                            <span>Back to insights</span>
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
                            <ReactMarkdown
                                components={{
                                    h3: ({ node: _node, ...props }) => <h3 className="uppercase text-sm font-bold tracking-widest mb-4 text-zinc-500 mt-8" {...props} />,
                                    p: ({ node: _node, ...props }) => <p className="mb-6" {...props} />,
                                    blockquote: ({ node: _node, ...props }) => <blockquote className="border-l-2 border-zinc-900 pl-6 italic my-10 text-xl md:text-2xl text-zinc-900 font-serif" {...props} />,
                                    img: ({ node: _node, ...props }) => <img className="w-full rounded-lg my-12 shadow-md border border-zinc-100" {...props} />,
                                }}
                            >
                                {selectedItem.description}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>

            {/* === CTA SECTION === */}
            <section className="group/cta relative w-full px-3 sm:px-5 lg:px-10 py-14 sm:py-20 h-[40vh] sm:h-[50vh] overflow-hidden flex flex-col justify-between border-t border-zinc-100 mt-[2cm] lg:order-last">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                        src={ctaImg}
                        alt=""
                        className="w-full h-full object-cover opacity-90 transition-transform duration-1000 ease-out group-hover/cta:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                {/* Top Text */}
                <div className="relative z-10 w-full text-white">
                    <h2
                        className="text-xl sm:text-2xl md:text-3xl tracking-tight leading-tight drop-shadow-md font-bold"
                        style={{ fontFamily: 'century-gothic' }}
                    >
                        <span className="font-light" style={{ color: "#aaaaaa" }}>said</span>
                        <span style={{ opacity: 0.95 }}>piece</span>
                    </h2>
                </div>

                {/* Bottom Button */}
                <div className="relative z-10 text-white">
                    <NavLink
                        to="/contact"
                        className="group flex items-center gap-6 text-xs sm:text-sm font-light uppercase tracking-widest border-b border-white pb-3 hover:border-white/70 transition-all w-fit drop-shadow-md text-white"
                    >
                        <span>Contact Us</span>
                        <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-2">
                            <path d="M0 6H39M39 6L34 1M39 6L34 11" stroke="white" strokeWidth="1" />
                        </svg>
                    </NavLink>
                </div>
            </section>

            {/* "Further On..." Section */}
            {relatedPosts && relatedPosts.length > 0 && (
                <div className="bg-white py-20 px-3 sm:px-5 lg:px-10 border-t border-zinc-200">
                    <div className="w-full mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-zinc-400 pb-6 gap-6">
                            <div>
                                <h3 className="text-lg uppercase font-medium tracking-wide text-black">Further</h3>
                                <h3
                                    className="text-lg uppercase font-medium tracking-wide text-black"
                                >
                                    On <span style={{ fontFamily: "century-gothic" }} className="font-bold"><span style={{ color: "#555555" }} className="font-light">said</span><span style={{ opacity: 0.95 }}>piece</span></span> Media
                                </h3>
                            </div>
                            <NavLink to="/blog" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:underline">
                                All Insights <span>→</span>
                            </NavLink>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                            {relatedPosts.map(item => (
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
                </div>
            )}
            <Footer />
        </div>
    );
};

export default BlogPost;
