import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaThLarge, FaList, FaChevronDown } from 'react-icons/fa';
import rightArrow from '../../assets/icons/rightArrow.svg';
import ButtonType3 from '../../components/ButtonType3';
import Footer from '../../components/Footer';
import guru from '../../assets/teamphoto/gurub.jpeg';
import kinley from '../../assets/teamphoto/kinleyb.jpeg';
import ocean from '../../assets/teamphoto/oceanb.jpeg';
import placeholder from '../../assets/teamphoto/placeholder.svg';
import tashi from '../../assets/teamphoto/tashib.jpeg';
import thinleyDhendup from '../../assets/teamphoto/thinleydendupb.jpeg';
import ash from '../../assets/teamphoto/ashb.jpeg';
import karma from '../../assets/teamphoto/karm.jpeg';

const teamMembers = [
  {
    id: 1,
    name: ' Thinley Dhendup',
    role: 'Principal Architect',
    avatar: thinleyDhendup,
    bio: 'Leads architectural design with a strong focus on innovation, sustainability, and project excellence.',
    slug: 'thinley-dhendup',
    socials: {
      github: null,
      linkedin: 'https://www.linkedin.com/in/thinleydhendup/',
      email: 'thinley@saidpiece.com',
    },
  },
  {
    id: 2,
    name: 'Karma',
    role: 'Admin',
    avatar: karma,
    bio: 'Ensures smooth operations and administrative efficiency for the team.',
    slug: 'karma',
    socials: {
      github: null,
      linkedin: null,
      email: 'karmadichen506@gmail.com',
    },
  },
  {
    id: 3,
    name: 'Ocean Rai',
    role: 'Civil Engineer',
    avatar: ocean,
    bio: 'Delivers reliable structural and engineering solutions aligned with design goals.',
    slug: 'ocean-rai',
    socials: {
      github: null,
      linkedin: 'https://www.linkedin.com/in/ocean-rai1043/',
      email: 'raiocean05@gmail.com',
    },
  },
  {
    id: 4,
    name: 'Kinley Wangdi',
    role: 'Architect',
    avatar: kinley,
    bio: 'Contributes thoughtful design and detailed architectural solutions.',
    slug: 'kinley-wangdi',
    socials: {
      github: null,
      linkedin: 'https://www.linkedin.com/in/kinley-wangdi-b25914301/',
      email: 'wangdik901@gmail.com',
    },
  },
  {
    id: 5, name: 'Ash',
    role: 'Architecture',
    avatar: ash,
    bio: 'Supports architectural projects with creativity and technical skills.',
    slug: 'ash',
    socials: {
      github: null,
      linkedin: null,
      email: null,
    },
  },
  {
    id: 6,
    name: 'Tashi Dendup',
    role: 'Architecture Intern',
    avatar: tashi,
    bio: 'Assists design teams while gaining practical architectural experience.',
    slug: 'tashi-dendup',
    socials: {
      github: null,
      linkedin: 'https://www.linkedin.com/in/tashi-dendup-915333328/',
      email: null,
    },
  },
  {
    id: 7,
    name: 'Guru Wangchuk',
    role: 'Full Stack Developer',
    avatar: guru,
    bio: 'Builds scalable and user-focused web applications across the full stack.',
    slug: 'guru-wangchuk',
    socials: {
      github: 'https://github.com/guruwangchuk7',
      linkedin: 'https://www.linkedin.com/in/guru-wangchuk-51a083203/',
      email: 'guruwangchuk1234@gmail.com',
    },
  },
];

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

  const filterRoles = [
    'Principal Architect',
    'Admin',
    'Civil Engineer',
    'Architect',
    'Architecture',
    'Architecture Intern',
    'Full Stack Developer'
  ];


  const filteredMembers =
    activeFilter === 'All'
      ? teamMembers
      : teamMembers.filter((member) => member.role === activeFilter);

  const socialIcons = (socials, name) => (
    <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-zinc-200">
      {socials.github && (
        <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s GitHub profile`} className="text-zinc-400 hover:text-zinc-900 transition-colors">
          <FaGithub size={20} />
        </a>
      )}
      {socials.linkedin && (
        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s LinkedIn profile`} className="text-zinc-400 hover:text-zinc-700 transition-colors">
          <FaLinkedin size={20} />
        </a>
      )}
      {socials.email && (
        <a href={socials.email} aria-label={`Email ${name}`} className="text-zinc-400 hover:text-zinc-700 transition-colors">
          <FaEnvelope size={20} />
        </a>
      )}
    </div>
  );

  return (
    <div>
      <div className="min-h-screen relative flex items-start justify-center bg-white px-4 lg:px-20 py-10">
        <NavLink to="/" className="absolute top-6 sm:top-10 left-7 sm:left-12 lg:left-26 flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline z-20">
          <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
          <span>Back to home</span>
        </NavLink>

        <div className="w-full px-6 py-20">
          {/* Header section - similar to Portfolio page */}
          <div className="mb-10 lg:mb-14">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight uppercase mb-6">
              Meet Our Creative Team
            </h1>
            <p className="text-zinc-600 text-base lg:text-lg leading-relaxed max-w-2xl">
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
            <div className="hidden sm:flex flex-wrap gap-3 sm:gap-6 items-center">
              <button
                onClick={() => setActiveFilter('All')}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeFilter === 'All' ? 'bg-black' : 'bg-zinc-300 group-hover:bg-zinc-400'
                  }`}></div>
                <span className="text-xs sm:text-sm text-zinc-600 group-hover:text-black transition-colors">All</span>
              </button>

              {filterRoles.map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveFilter(role)}
                  className="flex items-center gap-2 group cursor-pointer"
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
            <ul className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12' : 'flex flex-col gap-6'}>
              {filteredMembers.map((member) => {
                const isProtected = member.slug !== 'thinley-dhendup';
                const handleClick = (e) => {
                  if (isProtected && !user) {
                    e.preventDefault();
                    // Save the portfolio page they want to visit
                    sessionStorage.setItem('intendedRoute', `/team/${member.slug}`);
                    setShowAuthModal(true);
                  }
                };

                return (
                  <li key={member.id} className={`bg-white rounded-lg border border-zinc-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${viewMode === 'list' ? 'flex flex-col sm:flex-row items-center overflow-hidden' : 'overflow-hidden'}`}>
                    <NavLink
                      to={`/team/${member.slug}`}
                      onClick={handleClick}
                      className="block w-full h-full"
                    >
                      {viewMode === 'grid' ? (
                        <> {/* Grid View Layout */}
                          <div className="aspect-w-1 aspect-h-1">
                            {member.avatar ? <img src={member.avatar} alt={`Portrait of ${member.name}`} className="w-full h-full object-cover" /> : <FallbackAvatar className="w-full h-full object-cover" />}
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-zinc-900">{member.name}</h3>
                            <p className="text-zinc-600 font-semibold mt-1">{member.role}</p>
                            <p className="text-zinc-600 mt-3 text-sm h-20">{member.bio}</p>
                            <div className="mt-4 pt-4 border-t border-zinc-200">
                              <span className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                                View Portfolio →
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col sm:flex-row items-center w-full">
                          <div className="w-full sm:w-40 h-40 flex-shrink-0">
                            {member.avatar ? <img src={member.avatar} alt={`Portrait of ${member.name}`} className="w-full h-full object-cover" /> : <FallbackAvatar className="w-full h-full" />}
                          </div>
                          <div className="p-6 flex-grow">
                            <h3 className="text-xl font-bold text-zinc-900">{member.name}</h3>
                            <p className="text-zinc-600 font-semibold mt-1">{member.role}</p>
                            <p className="text-zinc-600 mt-3 text-sm">{member.bio}</p>
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