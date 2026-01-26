import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import rightArrow from '../../assets/icons/rightArrow.svg';

import { portfolioItems } from '../../data/portfolioItems';

import ButtonType3 from '../../components/ButtonType3';
import H5 from '../home/H5';



const Portfolio = () => {
  const [selectedId, setSelectedId] = useState(null);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedId]);

  const selectedItem = portfolioItems.find(p => p.id === selectedId);

  return (
    <div>
      <div className="min-h-screen relative flex items-start justify-center bg-white px-4 lg:px-20 py-10">
        <NavLink to="/" className="absolute top-10 left-4 flex items-center gap-2 text-sm font-medium hover:underline z-20">
          <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
          <span>Back to home</span>
        </NavLink>

        <div className="w-full px-6 py-20">
          {/* Header section */}
          <div className="mb-16 lg:mb-20">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight uppercase mb-6">
              Portfolio
            </h1>
            <p className="text-zinc-600 text-base lg:text-lg leading-relaxed max-w-2xl">
              Our projects embody Saidpiece's commitment to cultural authenticity, innovation,
              and sustainability. Each work is a unique reflection of the client's vision,
              harmonized with Bhutanese tradition and modern design.
            </p>
            <div className="mt-8">
              <ButtonType3 title="Contact Us" to="/contact" />
            </div>
          </div>

          {/* Portfolio grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {portfolioItems.map((p) => (
              <motion.div
                layoutId={`card-container-${p.id}`}
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className="group cursor-pointer flex flex-col gap-4 relative z-0"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative overflow-hidden w-full h-[400px] lg:h-[450px]">
                  <motion.img
                    layoutId={`card-image-${p.id}`}
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white/90 text-black px-4 py-2 rounded-full text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View Project
                    </span>
                  </div>
                </div>

                <motion.div layoutId={`card-info-${p.id}`} className="border-t border-zinc-200 pt-4 bg-white">
                  <h3 className="text-black uppercase font-semibold text-lg lg:text-xl tracking-tight">{p.title}</h3>
                  <p className="text-zinc-500 text-sm lg:text-base">{p.subtitle}</p>
                  <p className="text-zinc-400 text-xs lg:text-sm mt-1">{p.location}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Overlay */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8 pointer-events-none">
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
              className="w-full h-full md:h-[90vh] md:max-w-[90vw] bg-white md:rounded-lg shadow-2xl overflow-hidden relative z-10 pointer-events-auto flex flex-col md:flex-row"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-30 p-2 bg-white/50 hover:bg-white backdrop-blur-sm rounded-full transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image Side */}
              <div className="w-full md:w-2/3 h-[40vh] md:h-full relative bg-zinc-100">
                <motion.img
                  layoutId={`card-image-${selectedId}`}
                  src={selectedItem.image}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/3 h-full overflow-y-auto bg-white p-6 md:p-10 lg:p-12 pb-20 md:pb-12">
                <motion.div layoutId={`card-info-${selectedId}`} className="mb-6 md:mb-10">
                  <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none mb-3">
                    {selectedItem.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-zinc-500 font-light">
                    {selectedItem.subtitle}
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-zinc-400 text-sm font-medium uppercase tracking-widest">
                    <span className="w-8 h-[1px] bg-zinc-300"></span>
                    {selectedItem.location}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <p className="text-zinc-600 leading-relaxed text-base md:text-lg mb-10">
                    {selectedItem.description}
                  </p>

                  <div className="grid grid-cols-2 gap-y-8 gap-x-4 border-t border-zinc-100 pt-8">
                    <div>
                      <span className="block text-xs uppercase text-zinc-400 tracking-wider mb-1">Completion</span>
                      <span className="text-base font-medium text-black">{selectedItem.year}</span>
                    </div>
                    <div>
                      <span className="block text-xs uppercase text-zinc-400 tracking-wider mb-1">Area</span>
                      <span className="text-base font-medium text-black">{selectedItem.size}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-xs uppercase text-zinc-400 tracking-wider mb-1">Client</span>
                      <span className="text-base font-medium text-black">{selectedItem.client}</span>
                    </div>
                  </div>


                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <H5 />
    </div>
  );
};

export default Portfolio;
