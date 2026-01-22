import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaThLarge, FaList } from 'react-icons/fa';
import rightArrow from '../../assets/icons/rightArrow.svg';
import ButtonType3 from '../../components/ButtonType3';
import H5 from '../home/H5';
import guru from '../../assets/team/guru (b&w).png';
import kinley from '../../assets/team/kinley (b&w).png';
import ocean from '../../assets/team/ocean (b&w).png';
import placeholder from '../../assets/team/placeholder.svg';
import tashi from '../../assets/team/tashi (b&w).png';
import thinleyDhendup from '../../assets/team/thinley dendup (b&w).png';
import ash from '../../assets/team/ash (b&w).png';

const teamMembers = [
  {
    id: 1,
    name: ' Thinley Dhendup',
    role: 'Principal Architect',
    avatar: thinleyDhendup, 
    bio: 'Leads architectural design with a strong focus on innovation, sustainability, and project excellence.',
    socials: {
      github: null,
      linkedin: 'https://www.linkedin.com/in/thinleydhendup/',
      email: 'thinley@saidpiece.com',
    },
  },

  {
    id: 2,
    name: 'Kinley Wangdi',
    role: 'Architect',
    avatar: kinley,
    bio: 'Contributes thoughtful design and detailed architectural solutions.',
    socials: {
      github: null,
      linkedin: 'https://linkedin.com',
      email: 'mailto:samantha.chen@example.com',
    },
  },
  {
    id: 3, name: 'Ash',
    role: 'Architecture',
    avatar: ash,
    bio: 'Supports architectural projects with creativity and technical skills.',
    socials: {
      github: null,
      linkedin: 'https://linkedin.com',
      email: 'mailto:ash@example.com',
    },
  },
  {
    id: 4,
    name: 'Ocean Rai',
    role: 'Civil Engineer',
    avatar: ocean,
    bio: 'Delivers reliable structural and engineering solutions aligned with design goals.',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'mailto:david.garcia@example.com',
    },
  },
  {
    id: 5,
    name: 'Tashi Dendup',
    role: 'Architecture Intern',
    avatar: tashi,
    bio: 'Assists design teams while gaining practical architectural experience.',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'mailto:kenji.tanaka@example.com',
    },
  },
  {
    id: 6,
    name: 'Guru Wangchuk',
    role: 'Full Stack Developer',
    avatar: guru,
    bio: 'Builds scalable and user-focused web applications across the full stack.',
    socials: {
      github: 'https://github.com/guruwangchuk7',
      linkedin: 'https://www.linkedin.com/in/guru-wangchuk-51a083203/',
      email: 'guruwangchuk@gmail.com',
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
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  // Get unique roles for filter buttons, including "All"
  const roles = ['All', ...new Set(teamMembers.map((member) => member.role))];
  
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
        <NavLink to="/" className="absolute top-10 left-4 flex items-center gap-2 text-sm font-medium hover:underline">
          <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
          <span>Back to home</span>
        </NavLink>

      <div className="w-full px-6 py-20">
        {/* Header section - similar to Portfolio page */}
        <div className="mb-16 lg:mb-20">
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

        {/* Filter and View Controls */}
        <section className="mb-12 flex flex-col sm:flex-row justify-between items-center gap-6" aria-label="Team display controls">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3" role="group" aria-label="Filter team members by role">
            {roles.map((role) => (
              <button key={role} onClick={() => setActiveFilter(role)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-500 ${activeFilter === role ? 'bg-zinc-900 text-white shadow' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`} aria-pressed={activeFilter === role}>
                {role}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 p-1 bg-zinc-100 rounded-full" role="group" aria-label="Toggle view mode">
            <button onClick={() => setViewMode('grid')} aria-pressed={viewMode === 'grid'} className={`p-2 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-zinc-500 ${viewMode === 'grid' ? 'bg-white text-zinc-900 shadow' : 'text-zinc-500 hover:text-zinc-800'}`}>
              <FaThLarge size={18} aria-hidden="true" /><span className="sr-only">Grid View</span>
            </button>
            <button onClick={() => setViewMode('list')} aria-pressed={viewMode === 'list'} className={`p-2 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-zinc-500 ${viewMode === 'list' ? 'bg-white text-zinc-900 shadow' : 'text-zinc-500 hover:text-zinc-800'}`}>
              <FaList size={18} aria-hidden="true" /><span className="sr-only">List View</span>
            </button>
          </div>
        </section>

        {/* Team Members List/Grid */}
        <section>
          <ul className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12' : 'flex flex-col gap-6'}>
            {filteredMembers.map((member) => (
              <li key={member.id} className={`bg-white rounded-lg border border-zinc-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${viewMode === 'list' ? 'flex flex-col sm:flex-row items-center overflow-hidden' : 'overflow-hidden'}`}>
                {viewMode === 'grid' ? (
                  <> {/* Grid View Layout */}
                    <div className="aspect-w-1 aspect-h-1">
                      {member.avatar ? <img src={member.avatar} alt={`Portrait of ${member.name}`} className="w-full h-full object-cover" /> : <FallbackAvatar className="w-full h-full object-cover" />}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-zinc-900">{member.name}</h3>
                      <p className="text-zinc-600 font-semibold mt-1">{member.role}</p>
                      <p className="text-zinc-600 mt-3 text-sm h-20">{member.bio}</p>
                      {socialIcons(member.socials, member.name)}
                    </div>
                  </>
                ) : (
                  <> {/* List View Layout */}
                    <div className="w-full sm:w-40 h-40 flex-shrink-0">
                      {member.avatar ? <img src={member.avatar} alt={`Portrait of ${member.name}`} className="w-full h-full object-cover" /> : <FallbackAvatar className="w-full h-full" />}
                    </div>
                    <div className="p-6 flex-grow">
                      <h3 className="text-xl font-bold text-zinc-900">{member.name}</h3>
                      <p className="text-zinc-600 font-semibold mt-1">{member.role}</p>
                      <p className="text-zinc-600 mt-3 text-sm">{member.bio}</p>
                      {socialIcons(member.socials, member.name)}
                    </div>
                  </>
                )}
              </li>
            ))}
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
      <H5 />
    </div>
  );
};

export default Team;