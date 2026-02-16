import React, { useState, useEffect, useMemo, useRef } from 'react';
import { supabase } from '../../services/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import rightArrow from '../../assets/icons/rightArrow.svg';
import { staticTeamMembers } from '../../data/staticTeam';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
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
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [members, setMembers] = useState(staticTeamMembers);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*');

      if (!error && data && data.length > 0) {
        // Explicit order for core team members
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

          // If both are in the defined order, sort by that order
          if (indexA !== -1 && indexB !== -1) return indexA - indexB;

          // If only one is in the defined order, it comes first
          if (indexA !== -1) return -1;
          if (indexB !== -1) return 1;

          // For new members (not in the list), sort by original database order (created_at or id)
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

  const roleOrder = [
    'Principal Architect',
    'Administration',
    'BIM Architect',
    'Architect',
    'Architecture apprentice',
    'Full Stack Engineer'
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

  // Normalize roles for filtering
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

  const filteredMembers = useMemo(() =>
    activeFilter === 'All' ? members : members.filter(m => getNormalizedRole(m.role) === activeFilter)
    , [activeFilter, members]);

  // Reset scroll when filter changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeFilter]);

  const totalSections = filteredMembers.length;

  // 1. Core Mechanic: Sticky-Track
  // Mapping vertical scroll to horizontal progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Smooth out the progress for that "premium" feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 2. The Animation Logic: Mapping
  // Transform 0-1 vertical progress to horizontal translate
  const x = useTransform(smoothProgress, [0, 1], ["0%", `-${(totalSections - 1) * 100}%`]);

  // Drive index for bottom counter based on progress
  const rawIndex = useTransform(smoothProgress, [0, 1], [0, totalSections - 1]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    return rawIndex.on("change", (v) => setCurrentIdx(Math.round(v)));
  }, [rawIndex]);

  return (
    <div className="bg-white selection:bg-black selection:text-white relative no-scrollbar">
      <LocalMagneticCursor />

      {/* Navigation */}
      <NavLink to="/" className="absolute top-6 sm:top-10 left-3 sm:left-5 lg:left-10 flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline z-50 text-black">
        <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
        <span>Back to home</span>
      </NavLink>

      {/* 1. The Container (The Track) - Height controls the "slowness" */}
      <div
        ref={containerRef}
        style={{ height: `${totalSections * 150}vh` }}
        className="relative"
      >
        {/* The Sticky Element: Locks the view in place */}
        <div className="sticky top-0 h-screen w-screen overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex h-full w-full"
          >
            {filteredMembers.map((member, index) => (
              <section
                key={member.id}
                className="relative min-w-full h-full flex flex-none items-center justify-center px-6 md:px-20"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-[1400px] items-center gap-6 lg:gap-14">
                  {/* Left Column */}
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

                  {/* Center Column: Portrait (Refined Size) */}
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

                  {/* Right Column: Next Member Hint */}
                  <div className="hidden md:flex order-3 items-center justify-center">
                    {filteredMembers[index + 1] && (
                      <h3
                        className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-tighter uppercase whitespace-nowrap text-zinc-100 select-none"
                      >
                        {filteredMembers[index + 1].name}
                      </h3>
                    )}
                  </div>
                </div>
              </section>
            ))}
          </motion.div>
        </div>
      </div>

      {/* --- Bottom Navigation --- */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md pt-6 pb-2 border-t border-zinc-100">
        <div className="flex items-center justify-between px-6 md:px-10 mb-6">
          <div className="flex flex-wrap gap-4 md:gap-8 items-center">
            <button
              onClick={() => setActiveFilter('All')}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeFilter === 'All' ? 'bg-black' : 'bg-zinc-300 group-hover:bg-zinc-400'}`} />
              <span className={`text-xs sm:text-sm transition-colors ${activeFilter === 'All' ? 'text-black font-medium' : 'text-zinc-600 group-hover:text-black'}`}>All Categories</span>
            </button>
            {filterRoles.map(role => (
              <button
                key={role}
                onClick={() => setActiveFilter(role)}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeFilter === role ? 'bg-black' : 'bg-zinc-300 group-hover:bg-zinc-400'}`} />
                <span className={`text-xs sm:text-sm transition-colors capitalize ${activeFilter === role ? 'text-black font-medium' : 'text-zinc-600 group-hover:text-black'}`}>{role}</span>
              </button>
            ))}
          </div>

          <div className="text-xs sm:text-sm font-medium text-zinc-900 pr-2 pb-1">
            ({currentIdx + 1} / {totalSections})
          </div>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar px-1 bg-zinc-50 py-1">
          {filteredMembers.map((m, i) => (
            <div
              key={m.id}
              onClick={() => {
                const totalHeight = containerRef.current.scrollHeight - window.innerHeight;
                const target = (i / (totalSections - 1)) * totalHeight;
                window.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
              }}
              className={`w-14 h-16 md:w-16 md:h-20 shrink-0 cursor-pointer overflow-hidden border transition-all duration-300 ${currentIdx === i ? 'border-black ring-2 ring-black/5 grayscale-0' : 'border-transparent grayscale opacity-40 hover:opacity-100'}`}
            >
              {m.avatar ? <img src={m.avatar} className="w-full h-full object-cover" alt="" /> : <div className="bg-zinc-200 w-full h-full" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
