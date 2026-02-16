import React, { useState, useEffect, useMemo, useRef } from 'react';
import { supabase } from '../../services/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import rightArrow from '../../assets/icons/rightArrow.svg';
import { staticTeamMembers } from '../../data/staticTeam';
import { motion } from 'motion/react';

// --- Local Components ---

const FallbackAvatar = ({ className }) => (
  <svg
    className={`bg-zinc-50 text-zinc-200 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);



// --- Main Team Component ---

const Team = () => {

  const scrollContainerRef = useRef(null);
  const footerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [members, setMembers] = useState(staticTeamMembers);
  // currentIdx tracks the VISIBLE index in the extended list.
  const [currentIdx, setCurrentIdx] = useState(1);
  // Cycle count for footer tracking (0 to 5)
  const [cycleCount, setCycleCount] = useState(0);
  const isScrolling = useRef(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*');

      if (!error && data && data.length > 0) {
        const teamOrder = [
          'thinley-dhendup',
          'kinley-wangdi',
          'ash',
          'tashi-dendup',
          'guru-wangchuk',
          'karma',
          'tshering-wangchuk'
        ];

        const sortedData = [...data].sort((a, b) => {
          const indexA = teamOrder.indexOf(a.slug);
          const indexB = teamOrder.indexOf(b.slug);
          if (indexA !== -1 && indexB !== -1) return indexA - indexB;
          if (indexA !== -1) return -1;
          if (indexB !== -1) return 1;
          return new Date(a.created_at) - new Date(b.created_at);
        });

        setMembers(sortedData);
      } else {
        setMembers(staticTeamMembers);
      }
    } catch {
      setMembers(staticTeamMembers);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const roleOrder = [
    'Principal Architect',
    'BIM Architect',
    'Architect',
    'Architecture apprentice',
    'Full Stack Engineer',
    'Administration',
    'Travel Guide'
  ];

  const roleMapping = {
    'admin': 'Administration',
    'administration': 'Administration',
    'architect intern': 'Architecture apprentice',
    'architecture apprentice': 'Architecture apprentice',
    'full stack developer': 'Full Stack Engineer',
    'full stack engineer': 'Full Stack Engineer',
    'bim architect': 'BIM Architect',
    'principal architect': 'Principal Architect',
    'architect': 'Architect'
  };

  const getNormalizedRole = (role) => {
    if (!role) return '';
    const lowerRole = role.toLowerCase().trim();
    return roleMapping[lowerRole] || role.trim();
  };

  // Original list for reference
  const displayMembers = members;

  // Extended list for infinite loop: [Last(Clone), ...Originals, First(Clone)]
  const extendedMembers = useMemo(() => {
    if (displayMembers.length < 2) return displayMembers;
    return [
      { ...displayMembers[displayMembers.length - 1], _clone: 'start' },
      ...displayMembers,
      { ...displayMembers[0], _clone: 'end' }
    ];
  }, [displayMembers]);

  const totalRealSections = displayMembers.length;

  // Initialize scroll position to show the first REAL member (index 1)
  useEffect(() => {
    if (scrollContainerRef.current && extendedMembers.length > displayMembers.length) {
      setTimeout(() => {
        if (scrollContainerRef.current) {
          const clientWidth = scrollContainerRef.current.clientWidth;
          // We start at index 1 because index 0 is the clone of the last item
          scrollContainerRef.current.scrollLeft = clientWidth * 1;
          setCurrentIdx(1);
        }
      }, 50); // Small delay to ensure render layout
    }
  }, [displayMembers.length, extendedMembers.length]); // Depend on length change only

  // --- Wheel Event Listener for Snapped Horizontal Scroll with Infinite Loop ---
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        if (isScrolling.current) return;

        const clientWidth = el.clientWidth;

        if (e.deltaY > 0) {
          // Scroll Down -> Go Next
          // We allow going to extendedMembers.length - 1 (which is the End Clone)
          const nextIdx = currentIdx + 1;
          if (nextIdx < extendedMembers.length) {
            isScrolling.current = true;
            el.scrollTo({ left: nextIdx * clientWidth, behavior: 'smooth' });

            // Check loop condition after animation
            setTimeout(() => {
              isScrolling.current = false;
              // If we hit the END clone (which is a copy of First Real Item), jump to First Real Item (Index 1)
              if (nextIdx === extendedMembers.length - 1) {
                el.scrollTo({ left: 1 * clientWidth, behavior: 'auto' });
                setCurrentIdx(1);
                setCycleCount(prev => (prev + 1) % 6);
              } else {
                setCurrentIdx(nextIdx);
              }
            }, 600); // Wait for smooth scroll
          }
        } else {
          // Scroll Up -> Go Previous
          const prevIdx = currentIdx - 1;
          if (prevIdx >= 0) {
            isScrolling.current = true;
            el.scrollTo({ left: prevIdx * clientWidth, behavior: 'smooth' });

            // Check loop condition after animation
            setTimeout(() => {
              isScrolling.current = false;
              // If we hit the START clone (which is a copy of Last Real Item), jump to Last Real Item (Index N)
              if (prevIdx === 0) {
                const realLastIdx = totalRealSections; // The index of the last real item in extended array
                el.scrollTo({ left: realLastIdx * clientWidth, behavior: 'auto' });
                setCurrentIdx(realLastIdx);
                setCycleCount(prev => (prev - 1 + 6) % 6);
              } else {
                setCurrentIdx(prevIdx);
              }
            }, 600);
          }
        }
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [currentIdx, extendedMembers, totalRealSections]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    if (isScrolling.current) return; // Don't interrupt programmatic scroll logic

    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    if (clientWidth > 0) {
      const index = Math.round(scrollLeft / clientWidth);
      if (index !== currentIdx) {
        setCurrentIdx(index);

        // Note for future: To handle robust SWIPE infinite loop, we'd need onScrollEnd detection.
        // For now, wheel covers the "infinite" feel. Swipe might hit the wall if user swipes to 0 or End.
      }
    }
  };

  // Calculate REAL index for the UI (0 to N-1)
  const getRealIndex = (extendedIndex) => {
    // Extended Array: [CloneLast(0), RealFirst(1), ..., RealLast(N), CloneFirst(N+1)]
    if (extendedIndex === 0) return totalRealSections - 1;
    if (extendedIndex === extendedMembers.length - 1) return 0;
    return extendedIndex - 1;
  };

  const currentRealIdx = getRealIndex(currentIdx);

  const filterRoles = useMemo(() => {
    const rawRoles = [...new Set(members.map(m => getNormalizedRole(m.role)))].filter(Boolean);
    return rawRoles.sort((a, b) => {
      const idxA = roleOrder.indexOf(a);
      const idxB = roleOrder.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [members]);





  // Handle Category Filtering/Navigation
  // Now behavior: Scroll to the first occurrence of that role in the REAL list
  const handleCategoryClick = (role) => {
    if (role === 'All') {
      // Go to first real member
      if (scrollContainerRef.current) {
        const clientWidth = scrollContainerRef.current.clientWidth;
        scrollContainerRef.current.scrollTo({ left: 1 * clientWidth, behavior: 'smooth' });
        setCurrentIdx(1);
        setCycleCount(0); // Reset cycle count when filtering to 'All'
      }
      setActiveFilter('All');
      return;
    }

    setActiveFilter(role);

    // Find first member with this role in the Original list
    const realIdx = displayMembers.findIndex(m => getNormalizedRole(m.role) === role);
    if (realIdx !== -1 && scrollContainerRef.current) {
      const clientWidth = scrollContainerRef.current.clientWidth;
      // Map to Extended Index: Real Index + 1
      const targetExtendedIdx = realIdx + 1;
      scrollContainerRef.current.scrollTo({ left: targetExtendedIdx * clientWidth, behavior: 'smooth' });
      setCurrentIdx(targetExtendedIdx);
      setCycleCount(0); // Reset cycle count when filtering
    }
  };

  return (
    <div className="bg-white selection:bg-black selection:text-white relative h-screen w-screen overflow-hidden">

      <NavLink to="/" className="absolute top-6 sm:top-10 left-3 sm:left-5 lg:left-10 flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline z-20">
        <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
        <span>Back to home</span>
      </NavLink>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex h-full w-full overflow-x-auto snap-x snap-mandatory no-scrollbar bg-white"
      >
        {extendedMembers.map((member, index) => {
          // Unique keys for clones
          let key = member.slug;
          if (member._clone === 'start') key = `${member.slug}-clone-start`;
          if (member._clone === 'end') key = `${member.slug}-clone-end`;

          return (
            <section
              key={key}
              className="relative min-w-full h-full flex flex-none items-center justify-center px-6 md:px-20 snap-start pb-32 md:pb-24"
            >
              <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-[1600px] h-full md:h-auto gap-4 md:gap-20 lg:gap-32 md:-translate-y-8 px-4 md:px-0">
                {/* Mobile Top Spacer to balance the vertical layout and keep photo in center */}
                <div className="md:hidden flex-1" />

                {/* Current Member Info Container */}
                <div className="order-2 md:order-1 flex-1 flex flex-col items-center justify-start md:justify-center md:-translate-x-8 lg:-translate-x-12">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center group cursor-default pt-4 md:pt-0"
                  >
                    <div className="relative inline-block pb-1 mb-1 md:mb-4">
                      <h2 className="text-lg md:text-2xl lg:text-3xl font-normal tracking-tighter uppercase whitespace-nowrap">
                        {member.name}
                      </h2>
                      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-700 ease-out group-hover:w-full" />
                    </div>
                    <p className="text-zinc-500 text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-light text-center">
                      {member.role}
                    </p>
                  </motion.div>
                </div>

                {/* Main Photo Container */}
                <div className="order-1 md:order-2 flex-none flex justify-center items-center">
                  <motion.div
                    className="w-full aspect-[4/5] min-w-[280px] max-w-[320px] md:min-w-[400px] md:max-w-[480px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] bg-zinc-50 border border-zinc-50"
                    data-magnetic
                  >
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover scale-[1.01] hover:scale-100 transition-transform duration-1000 ease-out"
                      />
                    ) : (
                      <FallbackAvatar className="w-full h-full" />
                    )}
                  </motion.div>
                </div>

                {/* Next Member Hint Container */}
                <div className="hidden md:flex order-3 flex-1 flex flex-col items-center justify-center md:translate-x-8 lg:translate-x-12">
                  {extendedMembers[index + 1] ? (
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="text-center select-none opacity-20"
                    >
                      <h3 className="text-lg md:text-2xl lg:text-3xl font-normal tracking-tighter uppercase whitespace-nowrap text-zinc-400">
                        {extendedMembers[index + 1].name}
                      </h3>
                      <p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-light text-zinc-300 text-center">
                        {extendedMembers[index + 1].role}
                      </p>
                    </motion.div>
                  ) : null}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* --- Bottom Navigation --- */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md pt-6 pb-2 border-t border-zinc-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between px-6 md:px-10 mb-4 md:mb-6 gap-4">


          {/* Mobile Dropdown */}
          <div className="md:hidden relative z-50 w-full">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-full px-4 py-3 bg-white border border-zinc-200 rounded-full shadow-sm"
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-black`}></div>
                <span className="text-sm font-medium text-zinc-900 capitalize">
                  {activeFilter}
                </span>
              </div>
              {/* Chevron Icon */}
              <svg
                className={`w-3 h-3 text-zinc-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden py-1 mb-4 z-50 max-h-[60vh] overflow-y-auto">
                <button
                  onClick={() => { handleCategoryClick('All'); setIsDropdownOpen(false); }}
                  className="flex items-center w-full px-4 py-3 hover:bg-zinc-50 border-b border-zinc-100 last:border-0 text-left"
                >
                  <div className={`w-2 h-2 rounded-full mr-3 shrink-0 transition-colors ${activeFilter === 'All' ? 'bg-black' : 'bg-zinc-200'}`}></div>
                  <span className={`text-sm ${activeFilter === 'All' ? 'text-black font-medium' : 'text-zinc-600'}`}>All Categories</span>
                </button>
                {filterRoles.map((role) => (
                  <button
                    key={role}
                    onClick={() => { handleCategoryClick(role); setIsDropdownOpen(false); }}
                    className="flex items-center w-full px-4 py-3 hover:bg-zinc-50 border-b border-zinc-100 last:border-0 text-left"
                  >
                    <div className={`w-2 h-2 rounded-full mr-3 shrink-0 transition-colors ${activeFilter === role ? 'bg-black' : 'bg-zinc-200'}`}></div>
                    <span className={`text-sm capitalize ${activeFilter === role ? 'text-black font-medium' : 'text-zinc-600'}`}>{role}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:flex flex-wrap gap-4 md:gap-8 items-center">
            <button
              onClick={() => handleCategoryClick('All')}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeFilter === 'All' ? 'bg-black' : 'bg-zinc-300 group-hover:bg-zinc-400'}`} />
              <span className={`text-xs sm:text-sm transition-colors ${activeFilter === 'All' ? 'text-black font-medium' : 'text-zinc-600 group-hover:text-black'}`}>All Categories</span>
            </button>
            {filterRoles.map(role => (
              <button
                key={role}
                onClick={() => handleCategoryClick(role)}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeFilter === role ? 'bg-black' : 'bg-zinc-300 group-hover:bg-zinc-400'}`} />
                <span className={`text-xs sm:text-sm transition-colors capitalize ${activeFilter === role ? 'text-black font-medium' : 'text-zinc-600 group-hover:text-black'}`}>{role}</span>
              </button>
            ))}
          </div>

          <div className="hidden md:block text-xs sm:text-sm font-medium text-zinc-900 pr-2 pb-1">
            {/* Use getRealIndex to show nice 1/N counting */}
            ({currentRealIdx + 1} / {totalRealSections})
          </div>
        </div>

        <div ref={footerRef} className="flex items-center gap-1 overflow-x-auto no-scrollbar px-1 bg-zinc-50 py-1">
          {/* Repeat the members list multiple times to fill the width (visual loop) */}
          {Array(6).fill(displayMembers).flat().map((m, i) => {
            const originalIndex = i % displayMembers.length;
            // Calculate absolute match index based on cycle
            const isMatch = (i === (cycleCount * displayMembers.length) + currentRealIdx);

            return (
              <div
                key={`${m.slug}-thumb-${i}`}
                onClick={() => {
                  const clientWidth = scrollContainerRef.current.clientWidth;
                  // Calculate target based on click
                  const clickCycle = Math.floor(i / displayMembers.length);
                  const targetExtendedIdx = originalIndex + 1;

                  scrollContainerRef.current.scrollTo({ left: targetExtendedIdx * clientWidth, behavior: 'smooth' });
                  setCurrentIdx(targetExtendedIdx);
                  setCycleCount(clickCycle);
                }}
                className={`w-14 h-16 md:w-16 md:h-20 shrink-0 cursor-pointer overflow-hidden border transition-all duration-300 ${isMatch ? 'border-black ring-2 ring-black/5 grayscale-0' : 'border-transparent grayscale opacity-40 hover:opacity-100'}`}
              >
                {m.avatar ? <img src={m.avatar} className="w-full h-full object-cover" alt="" /> : <div className="bg-zinc-200 w-full h-full" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Team;