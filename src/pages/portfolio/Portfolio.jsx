import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { FaChevronDown } from 'react-icons/fa';
import rightArrow from '../../assets/icons/rightArrow.svg';
import { supabase } from '../../supabaseClient';

import { portfolioItems as staticPortfolioItems } from '../../data/portfolioItems';

import ButtonType3 from '../../components/ButtonType3';
import Footer from '../../components/Footer';

const Portfolio = () => {
  const { user, setShowAuthModal } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedId, setSelectedId] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Error fetching projects (using static data):', error.message);
        setProjects(staticPortfolioItems);
      } else if (data && data.length > 0) {
        setProjects(data);
      } else {
        // Fallback to static if DB is empty
        setProjects(staticPortfolioItems);
      }
    } catch (err) {
      console.error(err);
      setProjects(staticPortfolioItems);
    } finally {
      setLoading(false);
    }
  };

  // Get unique domains
  const domains = useMemo(() => {
    const uniqueDomains = [...new Set(projects.map(item => item.domain))];
    return uniqueDomains;
  }, [projects]);

  // Filter items based on selected domain
  const filteredItems = useMemo(() => {
    if (selectedFilter === 'all') return projects;
    return projects.filter(item => item.domain === selectedFilter);
  }, [selectedFilter, projects]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedId]);

  const selectedItem = projects.find(p => p.id === selectedId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen relative bg-white px-3 sm:px-5 lg:px-10 py-6 sm:py-10">
        <NavLink to="/" className="absolute top-6 sm:top-10 left-3 sm:left-5 lg:left-10 flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline z-20">
          <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
          <span>Back to home</span>
        </NavLink>

        <div className="w-full py-12 sm:py-20">
          {/* Header section */}
          <div className="mb-10 sm:mb-10 lg:mb-10">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight uppercase mb-4 sm:mb-6 -ml-0.5">
              Portfolio
            </h1>
            <p className="text-sm sm:text-sm lg:text-base text-zinc-600 leading-relaxed max-w-2xl">
              Our projects embody Saidpiece's commitment to cultural authenticity, innovation,
              and sustainability. Each work is a unique reflection of the client's vision,
              harmonized with Bhutanese tradition and modern design.
            </p>
            <div className="mt-6 sm:mt-8">
              <ButtonType3 title="Contact Us" to="/contact" />
            </div>
          </div>

          {/* Filter section */}
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
                    {selectedFilter === 'all' ? 'All Categories' : selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}
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
                  {domains.map((domain) => (
                    <button
                      key={domain}
                      onClick={() => { setSelectedFilter(domain); setIsDropdownOpen(false); }}
                      className="flex items-center w-full px-4 py-3 hover:bg-zinc-50 border-b border-zinc-100 last:border-0 text-left"
                    >
                      <div className={`w-2 h-2 rounded-full mr-3 shrink-0 transition-colors ${selectedFilter === domain ? 'bg-black' : 'bg-zinc-200'}`}></div>
                      <span className={`text-sm capitalize ${selectedFilter === domain ? 'text-black font-medium' : 'text-zinc-600'}`}>{domain}</span>
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

              {domains.map(domain => (
                <button
                  key={domain}
                  onClick={() => setSelectedFilter(domain)}
                  className="flex items-center gap-2 group cursor-pointer"
                >
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${selectedFilter === domain ? 'bg-black' : 'bg-zinc-300 group-hover:bg-zinc-400'
                    }`}></div>
                  <span className="text-xs sm:text-sm text-zinc-600 group-hover:text-black transition-colors capitalize">
                    {domain.charAt(0).toUpperCase() + domain.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((p) => (
                <motion.div
                  key={p.id}
                  layoutId={`card-container-${p.id}`}
                  onClick={() => {
                    if (!user) {
                      setShowAuthModal(true);
                    } else {
                      setSelectedId(p.id);
                    }
                  }}
                  className="group cursor-pointer flex flex-col gap-3 sm:gap-4 relative z-0"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="relative overflow-hidden w-full h-[300px] sm:h-[350px] lg:h-[450px]">
                    <motion.img
                      layoutId={`card-image-${p.id}`}
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Hover overlay hint */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="bg-white/90 text-black px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Project
                      </span>
                    </div>
                  </div>

                  <motion.div layoutId={`card-info-${p.id}`} className="border-t border-zinc-200 pt-3 sm:pt-4 bg-white">
                    <h3 className="text-black uppercase font-semibold text-base sm:text-lg lg:text-xl tracking-tight">{p.title}</h3>
                    <p className="text-zinc-500 text-xs sm:text-sm lg:text-base">{p.subtitle}</p>
                    <p className="text-zinc-400 text-xs lg:text-sm mt-1">{p.location}</p>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Expanded Overlay */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 pointer-events-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md pointer-events-auto"
            />

            {/* Card Modal */}
            <motion.div
              layoutId={`card-container-${selectedId}`}
              className="w-full h-full md:h-[90vh] md:max-w-[90vw] bg-white md:rounded-lg shadow-2xl overflow-hidden relative z-10 pointer-events-auto flex flex-col md:flex-row rounded-none"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 md:top-6 md:right-6 z-30 p-2 bg-white/50 hover:bg-white backdrop-blur-sm rounded-full transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 sm:w-6 h-5 sm:h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image Side */}
              <div className="w-full md:w-2/3 h-[35vh] sm:h-[40vh] md:h-full relative bg-zinc-100">
                <motion.img
                  layoutId={`card-image-${selectedId}`}
                  src={selectedItem.image}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/3 h-full overflow-y-auto bg-white p-4 sm:p-6 md:p-10 lg:p-12 pb-20 md:pb-12">
                <motion.div layoutId={`card-info-${selectedId}`} className="mb-6 md:mb-10">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tighter leading-none mb-2 sm:mb-3">
                    {selectedItem.title}
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-500 font-light">
                    {selectedItem.subtitle}
                  </p>
                  <div className="flex items-center gap-2 mt-3 sm:mt-4 text-zinc-400 text-xs sm:text-sm font-medium uppercase tracking-widest">
                    <span className="w-6 sm:w-8 h-[1px] bg-zinc-300"></span>
                    {selectedItem.location}
                  </div>
                  {selectedItem.collaboration && (
                    <p className="mt-2 text-zinc-500 text-sm sm:text-base font-medium">
                      {selectedItem.collaboration}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <p className="text-zinc-600 leading-relaxed text-sm sm:text-base md:text-lg mb-8 md:mb-10">
                    {selectedItem.description}
                  </p>

                  <div className="grid grid-cols-2 gap-y-6 sm:gap-y-8 gap-x-3 sm:gap-x-4 border-t border-zinc-100 pt-6 sm:pt-8">
                    <div>
                      <span className="block text-xs uppercase text-zinc-400 tracking-wider mb-1">Completion</span>
                      <span className="text-sm sm:text-base font-medium text-black">{selectedItem.year}</span>
                    </div>
                    <div>
                      <span className="block text-xs uppercase text-zinc-400 tracking-wider mb-1">Area</span>
                      <span className="text-sm sm:text-base font-medium text-black">{selectedItem.size}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-xs uppercase text-zinc-400 tracking-wider mb-1">Client</span>
                      <span className="text-sm sm:text-base font-medium text-black">{selectedItem.client}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <Footer />
    </div>

  );
};

export default Portfolio;