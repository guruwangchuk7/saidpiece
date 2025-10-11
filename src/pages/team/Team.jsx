import React, { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import rightArrow from '../../assets/icons/rightArrow.svg'
import p1 from '../../assets/p1.jpg'
import page3Bg from '../../assets/page3Bg.jpg'
import mainbg from '../../assets/mainbg.svg'
import reactLogo from '../../assets/react.svg'
import aboutBg from '../../assets/aboutBg.svg'
import ci1 from '../../assets/ci1.svg'
import BtnT1 from '../../components/ButtonType1'
import ButtonType3 from '../../components/ButtonType3'

// Sample data for team members
const teamMembers = [
  { name: 'Thinley Dhendup', role: 'Founder & Owner' },
  { name: 'Sailesh Humagai', role: 'Director & Architect' },
  { name: 'Sangay Thinley', role: 'Director & Architect' },
  { name: 'Namgay Dorji', role: 'Director & Architect' },
  { name: 'Karma Wangchuk', role: 'Project Manager' },
  { name: 'Pema Choden', role: 'Lead Designer' },
]

const Team = () => {
  // Available images pulled from src/assets. We pick one randomly for each member once per session.
  const images = [p1, page3Bg, mainbg, reactLogo, aboutBg, ci1]

  const assignedImages = useMemo(() => {
    // Shuffle selection so each member gets a random image (may repeat)
    return teamMembers.map(() => images[Math.floor(Math.random() * images.length)])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen relative flex flex-col items-start bg-white px-4 lg:px-20 py-10">
      {/* Back Button */}
      <NavLink
        to="/"
        className="absolute top-10 left-4 flex items-center gap-2 text-sm font-medium hover:underline"
      >
        <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
        <span>Back to home</span>
      </NavLink>

      {/* Header Section */}
      <div className="w-full lg:w-2/3 max-w-5xl mt-24 flex flex-col gap-4">
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight uppercase">
          Professionals
        </h1>
        <p className="text-zinc-600 text-lg leading-relaxed">
          Where creative minds gather, and brilliant ideas come to life — transforming vision
          into reality through collaboration, innovation, and bold thinking.
        </p>
        <div className="mt-2">
          <ButtonType3 title="Contact Us" to="/contact" />
        </div>
      </div>

      {/* Team Section */}
      <div className="mt-16 w-full overflow-x-auto">
        <div className="flex gap-8 min-w-max pb-6">
          {teamMembers.map((member, index) => (
            <div
              key={member.name + index}
              className="w-72 flex-shrink-0 bg-zinc-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-full h-80 bg-zinc-200">
                <img
                  src={assignedImages[index]}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-zinc-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Team