import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../services/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaThLarge, FaList, FaChevronDown } from 'react-icons/fa';
import rightArrow from '../../assets/icons/rightArrow.svg';
import ButtonType3 from '../../components/common/ButtonType3';
import Footer from '../../components/layout/Footer';
import { staticTeamMembers } from '../../data/staticTeam';
import placeholder from '../../assets/teamphoto/placeholder.svg';
import karma from '../../assets/teamphoto/karm.jpeg'; // Used for FallbackAvatar if needed, though FallbackAvatar usually uses something else


// --- Fallback SVG Avatar ---
// This component is used if a team member's `avatar` is null.
const FallbackAvatar = ({ className }) => (
  <svg
    className={`bg-zinc-100 text-zinc-300 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

// --- Team Component ---
const Team = () => {
  const { user, setShowAuthModal } = useAuth();
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // DB State
  const [members, setMembers] = useState(staticTeamMembers);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.warn('Error fetching team (using static):', error.message);
        setMembers(staticTeamMembers);
      } else if (data && data.length > 0) {
        // Normalize roles to match static data
        const normalizedData = data.map(member => ({
          ...member,
          role: member.role === 'Full Stack Developer' ? 'Full Stack Engineer' :
            member.role === 'Architecture' ? 'Architect' :
              member.role === 'Architecture Intern' ? 'Architect Intern' : member.role
        }));

        // Enforce fixed order for core team
        const fixedOrder = [
          'thinley-dhendup',
          'karma',
          'ocean-rai',
          'kinley-wangdi',
          'ash',
          'tashi-dendup',
          'guru-wangchuk'
        ];

        const sortedData = normalizedData.sort((a, b) => {
          const indexA = fixedOrder.indexOf(a.slug);
          const indexB = fixedOrder.indexOf(b.slug);

          // If both are in fixed list, sort by separate fixed order
          if (indexA !== -1 && indexB !== -1) return indexA - indexB;

          // If a is fixed, it comes first
          if (indexA !== -1) return -1;

          // If b is fixed, it comes first
          if (indexB !== -1) return 1;

          // If neither is fixed, maintain original date-based order (created_at)
          return 0;
        });

        setMembers(sortedData);
      } else {
        setMembers(staticTeamMembers);
      }
    } catch (err) {
      console.error(err);
      setMembers(staticTeamMembers);
    } finally {
      setLoading(false);
    }
  };

  // Get unique roles from members and sort them
  const filterRoles = useMemo(() => {
    const roles = [...new Set(members.map(m => m.role))];
    const customOrder = [
      'Principal Architect',
      'Admin',
      'Civil Engineer',
      'Architect',
      'Architect Intern',
      'Full Stack Engineer'
    ];
    return roles.sort((a, b) => {
      const indexA = customOrder.indexOf(a);
      const indexB = customOrder.indexOf(b);
      // If both are in custom list, sort by index
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      // If one is in list, prioritize it
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      // Otherwise alphabetical
      return a.localeCompare(b);
    });
  }, [members]);


  const filteredMembers =
    activeFilter === 'All'
      ? members
      : members.filter((member) => member.role === activeFilter);


  return (
    <div>
      <div className="min-h-screen relative bg-white px-3 sm:px-5 lg:px-10 py-10">
        <NavLink to="/" className="absolute top-6 sm:top-10 left-3 sm:left-5 lg:left-10 flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline z-20">
          <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
          <span>Back to home</span>
        </NavLink>

        <div className="w-full py-20">
          {/* Header section - similar to Portfolio page */}
          <div className="mb-10 lg:mb-14">
            <h1 className="text-3xl lg:text-7xl font-bold tracking-tight leading-tight uppercase mb-6 -ml-0.5">
              Meet Our Creative Team
            </h1>
            <p className="text-zinc-600 text-sm lg:text-lg leading-relaxed max-w-2xl">
              We are a collective of designers, developers, and strategists passionate about building exceptional digital experiences.
            </p>
            <div className="mt-8">
              <ButtonType3 title="Contact Us" to="/contact" />
            </div>
          </div>

          {/* Filter and View Controls - Updated to match Portfolio style */}
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
                    {activeFilter === 'All' ? 'All Categories' : activeFilter}
                  </span>
                </div>
                <FaChevronDown className={`w-3 h-3 text-zinc-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden py-1 z-50">
                  <button
                    onClick={() => { setActiveFilter('All'); setIsDropdownOpen(false); }}
                    className="flex items-center w-full px-4 py-3 hover:bg-zinc-50 border-b border-zinc-100 last:border-0 text-left"
                  >
                    <div className={`w-2 h-2 rounded-full mr-3 shrink-0 transition-colors ${activeFilter === 'All' ? 'bg-black' : 'bg-zinc-200'}`}></div>
                    <span className={`text-sm ${activeFilter === 'All' ? 'text-black font-medium' : 'text-zinc-600'}`}>All Categories</span>
                  </button>
                  {filterRoles.map((role) => (
                    <button
                      key={role}
                      onClick={() => { setActiveFilter(role); setIsDropdownOpen(false); }}
                      className="flex items-center w-full px-4 py-3 hover:bg-zinc-50 border-b border-zinc-100 last:border-0 text-left"
                    >
                      <div className={`w-2 h-2 rounded-full mr-3 shrink-0 transition-colors ${activeFilter === role ? 'bg-black' : 'bg-zinc-200'}`}></div>
                      <span className={`text-sm capitalize ${activeFilter === role ? 'text-black font-medium' : 'text-zinc-600'}`}>{role}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop List */}
            <div className="hidden sm:flex flex-nowrap overflow-x-auto gap-3 sm:gap-6 items-center pb-2 items-start justify-start w-full no-scrollbar">
              <button
                onClick={() => setActiveFilter('All')}
                className="flex items-center gap-2 group cursor-pointer whitespace-nowrap shrink-0"
              >
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeFilter === 'All' ? 'bg-black' : 'bg-zinc-300 group-hover:bg-zinc-400'
                  }`}></div>
                <span className="text-xs sm:text-sm text-zinc-600 group-hover:text-black transition-colors">All</span>
              </button>

              {filterRoles.map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveFilter(role)}
                  className="flex items-center gap-2 group cursor-pointer whitespace-nowrap shrink-0"
                >
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeFilter === role ? 'bg-black' : 'bg-zinc-300 group-hover:bg-zinc-400'
                    }`}></div>
                  <span className="text-xs sm:text-sm text-zinc-600 group-hover:text-black transition-colors capitalize">
                    {role}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Team Members List/Grid */}
          <section>
            {loading ? (
              <ul className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12' : 'flex flex-col gap-6'}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <li key={i} className={`bg-white rounded-lg border border-zinc-100 shadow-sm animate-pulse overflow-hidden ${viewMode === 'list' ? 'flex flex-col sm:flex-row h-auto sm:h-48' : ''}`}>
                    <div className={`${viewMode === 'list' ? 'w-full sm:w-48 h-48 sm:h-full' : 'w-full aspect-square'} bg-zinc-200 shrink-0`} />
                    <div className="p-6 w-full flex flex-col justify-center">
                      <div className="h-7 bg-zinc-200 rounded w-3/4 mb-3" />
                      <div className="h-5 bg-zinc-200 rounded w-1/2 mb-4" />
                      <div className="space-y-2 mb-6">
                        <div className="h-3 bg-zinc-200 rounded w-full" />
                        <div className="h-3 bg-zinc-200 rounded w-5/6" />
                        <div className="h-3 bg-zinc-200 rounded w-4/6" />
                      </div>
                      <div className="h-4 bg-zinc-200 rounded w-1/3 mt-auto" />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12' : 'flex flex-col gap-6'}>
                {filteredMembers.map((member) => {
                  return (
                    <li key={member.id} className={`bg-white rounded-lg border border-zinc-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${viewMode === 'list' ? 'flex flex-col sm:flex-row items-center overflow-hidden' : 'overflow-hidden'}`}>
                      <NavLink
                        to={`/team/${member.slug}`}
                        className="block w-full h-full"
                      >
                        {viewMode === 'grid' ? (
                          <> {/* Grid View Layout */}
                            <div className="aspect-w-1 aspect-h-1">
                              {member.avatar ? <img src={member.avatar} alt={`Portrait of ${member.name}`} className="w-full h-full object-cover" loading="eager" /> : <FallbackAvatar className="w-full h-full object-cover" />}
                            </div>
                            <div className="p-6">
                              <h3 className="text-xl font-bold text-zinc-900">{member.name}</h3>
                              <p className="text-zinc-600 font-semibold mt-1">{member.role}</p>
                              <p className="text-zinc-600 mt-3 text-sm h-20 line-clamp-3">{member.bio}</p>
                              <div className="mt-4 pt-4 border-t border-zinc-200">
                                <span className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                                  View Portfolio →
                                </span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col sm:flex-row items-center w-full h-full">
                            <div className="w-full sm:w-48 h-64 sm:h-full flex-shrink-0">
                              {member.avatar ? <img src={member.avatar} alt={`Portrait of ${member.name}`} className="w-full h-full object-cover" loading="eager" /> : <FallbackAvatar className="w-full h-full" />}
                            </div>
                            <div className="p-6 flex-grow flex flex-col justify-center h-full">
                              <h3 className="text-xl font-bold text-zinc-900">{member.name}</h3>
                              <p className="text-zinc-600 font-semibold mt-1">{member.role}</p>
                              <p className="text-zinc-600 mt-3 text-sm line-clamp-2">{member.bio}</p>
                              <div className="mt-4 pt-4 border-t border-zinc-200">
                                <span className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                                  View Portfolio →
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          {/* CTA Section */}
          <section className="text-center mt-24 py-12 bg-zinc-50 rounded-lg">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Want to Join Our Team?</h2>
            <p className="mt-3 max-w-md mx-auto text-base text-zinc-600">We're always looking for talented individuals. Check out our open positions or get in touch.</p>
            <div className="mt-8 flex justify-center">
              <div className="max-w-fit">
                <ButtonType3 title="Contact Us" to="/contact" />
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>

  );
};

export default Team;