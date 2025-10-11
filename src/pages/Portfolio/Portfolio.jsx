import React from 'react'
import { NavLink } from 'react-router-dom'
import rightArrow from '../../assets/icons/rightArrow.svg'
import BtnT1 from '../../components/ButtonType1'
import samplePhoto from '../../assets/p1.jpg'
import PortfolioCard from '../../components/PortfolioCard'
import ButtonType3 from '../../components/ButtonType3'

const Portfolio = () => {
  return (
    <div className="min-h-screen relative flex items-start justify-center bg-white px-4 lg:px-20 py-10">
      <NavLink to="/" className="absolute top-10 left-4 flex items-center gap-2 text-sm font-medium hover:underline">
        <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
        <span>Back to home</span>
      </NavLink>

      <div className="w-full lg:flex-row items-center justify-between px-6 py-20 mt-">
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight uppercase ">Portfolio</h1>
        <p className="text-zinc-600 text-lg leading-relaxed">Our projects embody Saidpiece’s commitment to cultural <br /> authenticity, innovation,
        and sustainability. Each work is a unique <br /> reflection of the client's vision,
        harmonized with Bhutanese tradition and modern design.</p>
        <div className="mt-1">
          <ButtonType3 title="Contact Us" to="/contact" />
        </div>
        
        {/* Grid of 9 project cards: 3 per row on lg, 2 per row on md, 1 per row on sm */}
        <div className="mt-25">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {[
              { id: 1, image: samplePhoto, title: 'Clock Tower', subtitle: 'Recreational area', location: 'Thimphu' },
              { id: 2, image: samplePhoto, title: 'Heritage House', subtitle: 'Cultural restoration', location: 'Punakha' },
              { id: 3, image: samplePhoto, title: 'Lotus Pavilion', subtitle: 'Public pavilion', location: 'Paro' },
              { id: 4, image: samplePhoto, title: 'Riverfront', subtitle: 'Landscape design', location: 'Wangdue' },
              { id: 5, image: samplePhoto, title: 'Mountain Retreat', subtitle: 'Resort design', location: 'Thimphu' },
              { id: 6, image: samplePhoto, title: 'Community Center', subtitle: 'Modern communal space', location: 'Mongar' },
            ].map((p) => (
              <PortfolioCard key={p.id} image={p.image} alt={p.title} title={p.title} subtitle={p.subtitle} location={p.location} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio
