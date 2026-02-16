import React, { useState, useEffect, useMemo, useRef } from 'react';
import { supabase } from '../../services/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import rightArrow from '../../assets/icons/rightArrow.svg';
import { staticTeamMembers } from '../../data/staticTeam';
import { motion } from 'motion/react';
import gsap from 'gsap';

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

const LocalMagneticCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      gsap.to(cursor, { x: clientX, y: clientY, duration: 0.1, ease: 'none' });
      gsap.to(follower, { x: clientX, y: clientY, duration: 0.6, ease: 'power3.out' });
    };

    const onMouseEnter = () => gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
    const onMouseLeave = () => gsap.to([cursor, follower], { opacity: 0, duration: 0.3 });

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    const handleHover = (e) => {
      const target = e.target.closest('[data-magnetic]');
      if (target) {
        const rect = target.getBoundingClientRect();
        gsap.to(follower, {
          width: rect.width + 20,
          height: rect.height + 20,
          borderRadius: '4px',
          duration: 0.4,
          ease: 'power3.out',
          backgroundColor: 'rgba(0,0,0,0.03)',
          borderColor: 'rgba(0,0,0,0.1)'
        });
        gsap.to(cursor, { scale: 0, duration: 0.3 });
      }
    };

    const handleLeave = (e) => {
      const target = e.target.closest('[data-magnetic]');
      if (target) {
        gsap.to(follower, {
          width: 40,
          height: 40,
          borderRadius: '50%',
          duration: 0.4,
          ease: 'power3.out',
          backgroundColor: 'transparent',
          borderColor: 'rgba(0,0,0,0.2)'
        });
        gsap.to(cursor, { scale: 1, duration: 0.3 });
      }
    };

    document.addEventListener('mouseover', handleHover);
    document.addEventListener('mouseout', handleLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', handleHover);
      document.removeEventListener('mouseout', handleLeave);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-1.5 h-1.5 bg-black rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-0 hidden md:block" />
      <div ref={followerRef} className="fixed top-0 left-0 w-10 h-10 border border-black/20 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-0 hidden md:block" />
    </>
  );
};

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
          'karma'
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
    'Administration'
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
      <LocalMagneticCursor />

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
              className="relative min-w-full h-full flex flex-none items-center justify-center px-6 md:px-20 snap-start pb-24"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-[1400px] items-center gap-6 lg:gap-14">
                <div className="order-2 md:order-1 flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center group cursor-default"
                  >
                    <div className="relative inline-block pb-2 mb-4">
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-tighter uppercase whitespace-nowrap">
                        {member.name}
                      </h2>
                      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-700 ease-out group-hover:w-full" />
                    </div>
                    <p className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-light">
                      {member.role}
                    </p>
                  </motion.div>
                </div>

                <div className="order-1 md:order-2 flex justify-center">
                  <motion.div
                    className="w-full aspect-[4/5] max-w-[360px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] bg-zinc-50 border border-zinc-50"
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

                <div className="hidden md:flex order-3 items-center justify-center">
                  {/* Show Next Member Name */}
                  {/* If we are at index i, show name of i+1. */}
                  {/* In infinite loop array, i+1 is valid unless at very end.
                        But our logic goes up to Length-1, so i+1 might be undefined if at absolute last index.
                        However, scroll logic wraps before we stay at absolute last index.
                    */}
                  {extendedMembers[index + 1] ? (
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-tighter uppercase whitespace-nowrap text-zinc-100 select-none">
                      {extendedMembers[index + 1].name}
                    </h3>
                  ) : (
                    // If somehow at the very end clone, the "Next" is basically the Real Second Item (since Clone End is First Item).
                    // Or effectively, show nothing or first item?
                    // Actually, if we are at Clone End (displayMembers[0]), the "next" physically would be nothing in lists,
                    // but logic-wise it's the start again.
                    // Let's just leave empty if not found, transition is fast.
                    null
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* --- Bottom Navigation --- */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md pt-6 pb-2 border-t border-zinc-100">
        <div className="flex items-center justify-between px-6 md:px-10 mb-6">
          <div className="flex flex-wrap gap-4 md:gap-8 items-center">
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

          <div className="text-xs sm:text-sm font-medium text-zinc-900 pr-2 pb-1">
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