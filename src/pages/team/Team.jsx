import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaThLarge, FaList } from 'react-icons/fa';

// --- Placeholder Data ---
// This array contains sample data for team members.
// - Replace 'avatar' with the actual path to the member's photo, e.g., '/src/assets/team/john-doe.png'.
// - Update social links. If a social link is not available, set it to null.
const teamMembers = [
  {
    id: 1,
    name: 'Alex Rivera',
    role: 'Lead Developer',
    avatar: null, // Replace with e.g., '/path/to/image1.png'
    bio: 'Architecting robust solutions and turning complex problems into elegant code. Believes in the power of a clean codebase.',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'mailto:alex.rivera@example.com',
    },
  },
  {
    id: 2,
    name: 'Samantha Chen',
    role: 'UI/UX Designer',
    avatar: null,
    bio: 'Crafting intuitive and beautiful user experiences. Passionate about user-centric design that tells a compelling story.',
    socials: {
      github: null,
      linkedin: 'https://linkedin.com',
      email: 'mailto:samantha.chen@example.com',
    },
  },
  {
    id: 3,
    name: 'David Garcia',
    role: 'Backend Developer',
    avatar: null,
    bio: 'Building the powerful engines that drive our applications. Expert in database management and API design.',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'mailto:david.garcia@example.com',
    },
  },
  {
    id: 4,
    name: 'Maria Rodriguez',
    role: 'Project Manager',
    avatar: null,
    bio: 'Orchestrating projects from concept to completion, ensuring we deliver outstanding results on time, every time.',
    socials: {
      github: null,
      linkedin: 'https://linkedin.com',
      email: 'mailto:maria.rodriguez@example.com',
    },
  },
  {
    id: 5,
    name: 'Kenji Tanaka',
    role: 'Frontend Developer',
    avatar: null,
    bio: 'Bringing designs to life with pixel-perfect precision and interactive animations. A JavaScript enthusiast at heart.',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'mailto:kenji.tanaka@example.com',
    },
  },
    {
    id: 6,
    name: 'Emily White',
    role: 'UI/UX Designer',
    avatar: null,
    bio: 'Focused on creating seamless and accessible digital interfaces that delight users and achieve business goals.',
    socials: {
      github: null,
      linkedin: 'https://linkedin.com',
      email: 'mailto:emily.white@example.com',
    },
  },
];

// --- Fallback SVG Avatar ---
// This component is used if a team member's `avatar` is null.
const FallbackAvatar = ({ className }) => (
  <svg
    className={`bg-gray-100 text-gray-300 ${className}`}
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
    <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-200">
      {socials.github && (
        <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s GitHub profile`} className="text-gray-400 hover:text-gray-900 transition-colors">
          <FaGithub size={20} />
        </a>
      )}
      {socials.linkedin && (
        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s LinkedIn profile`} className="text-gray-400 hover:text-blue-700 transition-colors">
          <FaLinkedin size={20} />
        </a>
      )}
      {socials.email && (
        <a href={socials.email} aria-label={`Email ${name}`} className="text-gray-400 hover:text-red-600 transition-colors">
          <FaEnvelope size={20} />
        </a>
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-white text-gray-900 px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            Meet Our Creative Team
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            We are a collective of designers, developers, and strategists passionate about building exceptional digital experiences.
          </p>
        </section>

        {/* Filter and View Controls */}
        <section className="mb-12 flex flex-col sm:flex-row justify-between items-center gap-6" aria-label="Team display controls">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3" role="group" aria-label="Filter team members by role">
            {roles.map((role) => (
              <button key={role} onClick={() => setActiveFilter(role)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 ${activeFilter === role ? 'bg-indigo-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} aria-pressed={activeFilter === role}>
                {role}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-full" role="group" aria-label="Toggle view mode">
            <button onClick={() => setViewMode('grid')} aria-pressed={viewMode === 'grid'} className={`p-2 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-indigo-500 ${viewMode === 'grid' ? 'bg-white text-indigo-600 shadow' : 'text-gray-500 hover:text-gray-800'}`}>
              <FaThLarge size={18} aria-hidden="true" /><span className="sr-only">Grid View</span>
            </button>
            <button onClick={() => setViewMode('list')} aria-pressed={viewMode === 'list'} className={`p-2 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-indigo-500 ${viewMode === 'list' ? 'bg-white text-indigo-600 shadow' : 'text-gray-500 hover:text-gray-800'}`}>
              <FaList size={18} aria-hidden="true" /><span className="sr-only">List View</span>
            </button>
          </div>
        </section>

        {/* Team Members List/Grid */}
        <section>
          <ul className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' : 'flex flex-col gap-6'}>
            {filteredMembers.map((member) => (
              <li key={member.id} className={`bg-white rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${viewMode === 'list' ? 'flex flex-col sm:flex-row items-center overflow-hidden' : 'overflow-hidden'}`}>
                {viewMode === 'grid' ? (
                  <> {/* Grid View Layout */}
                    <div className="aspect-w-1 aspect-h-1">
                      {member.avatar ? <img src={member.avatar} alt={`Portrait of ${member.name}`} className="w-full h-full object-cover" /> : <FallbackAvatar className="w-full h-full object-cover" />}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                      <p className="text-indigo-600 font-semibold mt-1">{member.role}</p>
                      <p className="text-gray-600 mt-3 text-sm h-20">{member.bio}</p>
                      {socialIcons(member.socials, member.name)}
                    </div>
                  </>
                ) : (
                  <> {/* List View Layout */}
                    <div className="w-full sm:w-40 h-40 flex-shrink-0">
                      {member.avatar ? <img src={member.avatar} alt={`Portrait of ${member.name}`} className="w-full h-full object-cover" /> : <FallbackAvatar className="w-full h-full" />}
                    </div>
                    <div className="p-6 flex-grow">
                      <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                      <p className="text-indigo-600 font-semibold mt-1">{member.role}</p>
                      <p className="text-gray-600 mt-3 text-sm">{member.bio}</p>
                      {socialIcons(member.socials, member.name)}
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-24 py-12 bg-gray-50 rounded-lg">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Want to Join Our Team?</h2>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-600">We're always looking for talented individuals. Check out our open positions or get in touch.</p>
          <div className="mt-8">
            <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Team;