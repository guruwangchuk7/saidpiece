import React, { useState, useEffect, useMemo, useRef } from 'react';
import { supabase } from '../../services/supabaseClient';
import { NavLink } from 'react-router-dom';
import rightArrow from '../../assets/icons/rightArrow.svg';
import { staticTeamMembers } from '../../data/staticTeam';
import { motion } from 'framer-motion';

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

import TeamDrawer from './components/TeamDrawer';

const Team = () => {

  const scrollContainerRef = useRef(null);
  const footerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [members, setMembers] = useState(staticTeamMembers);
  const [selectedMember, setSelectedMember] = useState(null); // State for drawer

  // currentIdx tracks the VISIBLE index in the extended list.
  const [currentIdx, setCurrentIdx] = useState(1);
  // Cycle count for footer tracking (0 to 5)
  const [cycleCount, setCycleCount] = useState(0);
  const isScrolling = useRef(false);


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
          if (indexB)
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

  const roleOrder = useMemo(() => [
    'Principal Architect',
    'BIM Architect',
    'Architect',
    'Architecture apprentice',
    'Full Stack Engineer',
    'Administration',
    'Travel Guide'
  ], []);

  const roleMapping = useMemo(() => ({
    'admin': 'Administration',
    'administration': 'Administration',
    'architect intern': 'Architecture apprentice',
    'architecture apprentice': 'Architecture apprentice',
    'full stack developer': 'Full Stack Engineer',
    'full stack engineer': 'Full Stack Engineer',
    'bim architect': 'BIM Architect',
    'principal architect': 'Principal Architect',
    'architect': 'Architect'
  }), []);

  const getNormalizedRole = React.useCallback((role) => {
    if (!role) return '';
    const lowerRole = role.toLowerCase().trim();
    return roleMapping[lowerRole] || role.trim();
  }, [roleMapping]);

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
  }, [members, getNormalizedRole, roleOrder]);





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
      setActiveFilter('all');
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
    <div className="bg-white selection:bg-black selection:text-white relative min-h-dvh w-screen overflow-x-hidden">

      <NavLink to="/" className="absolute top-6 sm:top-10 left-3 sm:left-5 lg:left-10 flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline z-20">
        <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
        <span>Back to home</span>
      </NavLink>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex h-dvh w-full overflow-x-auto snap-x snap-mandatory no-scrollbar bg-white"
      >
        {extendedMembers.map((member, index) => {
          // Unique keys for clones
          let key = member.slug;
          if (member._clone === 'start') key = `${member.slug}-clone-start`;
          if (member._clone === 'end') key = `${member.slug}-clone-end`;

          return (
            <section
              key={key}
              className="relative min-w-full min-h-dvh flex flex-none items-center justify-center px-6 md:px-20 snap-start pb-[calc(180px+env(safe-area-inset-bottom))] sm:pb-48 md:pb-52 lg:pb-60 pt-[calc(1rem+env(safe-area-inset-top))] md:pt-0"
            >
              <div className="flex flex-col md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center justify-center w-full max-w-6xl h-auto gap-4 md:gap-0 translate-y-0 md:translate-y-8 px-4 md:px-0">


                {/* Current Member Info Container */}
                <div className="order-2 md:order-1 flex-none md:w-full flex flex-col items-center justify-center md:pr-12 lg:pr-20 mt-3 md:mt-0">
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
                      <div className="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-700 ease-out group-hover:w-full" />
                    </div>
                    <p className="text-zinc-500 text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-light text-center">
                      {member.role}
                    </p>
                  </motion.div>
                </div>

                {/* Main Photo Container */}
                <div className="order-1 md:order-2 flex-none flex justify-center items-center">
                  <motion.div
                    className="w-full aspect-[4/5] min-w-64 max-w-72 md:min-w-80 md:w-[420px] lg:w-[480px] max-h-[45dvh] md:max-h-[60vh] overflow-hidden grayscale transition-all duration-1000 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] bg-zinc-50 border border-zinc-50 cursor-pointer"
                    data-magnetic
                    onClick={() => setSelectedMember(member)}

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
                <div className="hidden md:flex order-3 w-full flex-col items-center justify-center md:pl-12 lg:pl-20">
                  {extendedMembers[index + 1] ? (
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 0.5, x: 0 }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="text-center select-none"
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
      <div className="fixed bottom-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md pt-6 pb-3 md:pb-2 border-t border-zinc-100 px-safe-bottom" style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom))' }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between px-6 md:px-10 mb-4 md:mb-6 gap-4">


          {/* Mobile Categories Removed as per request */}


          <div className="hidden md:flex flex-nowrap gap-4 md:gap-8 items-center overflow-x-auto overflow-y-hidden no-scrollbar">
            <button
              onClick={() => handleCategoryClick('All')}
              className="flex items-center gap-2 group cursor-pointer shrink-0"
            >
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeFilter === 'All' ? 'bg-black' : 'bg-zinc-300 group-hover:bg-zinc-400'}`} />
              <span className={`text-xs sm:text-sm transition-colors ${activeFilter === 'All' ? 'text-black font-medium' : 'text-zinc-600 group-hover:text-black'}`}>All Categories</span>
            </button>
            {filterRoles.map(role => (
              <button
                key={role}
                onClick={() => handleCategoryClick(role)}
                className="flex items-center gap-2 group cursor-pointer shrink-0"
              >
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeFilter === role ? 'bg-black' : 'bg-zinc-300 group-hover:bg-zinc-400'}`} />
                <span className={`text-xs sm:text-sm transition-colors capitalize ${activeFilter === role ? 'text-black font-medium' : 'text-zinc-600 group-hover:text-black'}`}>{role}</span>
              </button>
            ))}
          </div>

          <div className="hidden md:block text-xs sm:text-sm font-medium text-zinc-900 pr-2 pb-1 whitespace-nowrap">
            {/* Use getRealIndex to show nice 1/N counting */}
            ({currentRealIdx + 1} / {totalRealSections})
          </div>
        </div>

        <div ref={footerRef} className="flex items-center gap-1 overflow-x-auto overflow-y-hidden no-scrollbar px-1 bg-zinc-50 py-1">
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
                className={`w-18 h-24 md:w-14 md:h-20 shrink-0 cursor-pointer overflow-hidden border transition-all duration-300 grayscale ${isMatch ? 'border-black ring-2 ring-black/5' : 'border-transparent opacity-40 hover:opacity-100'}`}
              >
                {m.avatar ? <img src={m.avatar} className="w-full h-full object-cover" alt="" /> : <div className="bg-zinc-200 w-full h-full" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Team Details Drawer */}
      <TeamDrawer
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        member={selectedMember}
      />
    </div>
  );
};

export default Team;