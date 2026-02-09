import { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { blogItems } from '../../data/blogItems';
import rightArrow from '../../assets/icons/rightArrow.svg';
import Footer from '../../components/Footer';


const BlogPost = () => {
    const { id } = useParams();
    const selectedItem = blogItems.find(p => p.id === parseInt(id));

    // Get 2 other blog items for the "Further on..." section
    const relatedItems = blogItems
        .filter(item => item.id !== parseInt(id))
        .slice(0, 2);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!selectedItem) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Post not found</p>
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
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium uppercase mb-8">
                                {selectedItem.title}
                            </h1>

                            <div className="flex justify-between items-center text-xs sm:text-sm uppercase tracking-widest border-t border-b border-zinc-400 py-4 mt-8 text-zinc-600 font-medium">
                                <span>Author: {selectedItem.author}</span>
                                <span className="uppercase">{selectedItem.domain}</span>
                                <span>{selectedItem.date}</span>
                            </div>
                        </div>

                        {/* Article Content */}
                        <div className="prose prose-zinc max-w-none text-zinc-800 leading-relaxed text-sm sm:text-base">
                            <h3 className="uppercase text-sm font-bold tracking-widest mb-4 text-zinc-500">Why we are talking about this</h3>
                            <p className="mb-6">
                                {selectedItem.description}
                            </p>
                            <p className="mb-6">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <p className="mb-6">
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>

                            <blockquote className="border-l-2 border-zinc-900 pl-6 italic my-10 text-xl md:text-2xl text-zinc-900 font-serif">
                                "Architecture is the will of an epoch translated into space."
                            </blockquote>

                            <p className="mb-6">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                            </p>
                            <p className="mb-6">
                                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                            </p>
                            <p className="mb-6">
                                Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.
                            </p>

                            <h3 className="text-xl font-bold mt-10 mb-4 uppercase">The Future of Design</h3>
                            <p className="mb-6">
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                            </p>
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
                        className="w-full h-full object-cover"
                    />
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