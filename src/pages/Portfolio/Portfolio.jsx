import React from 'react'
import { NavLink } from 'react-router-dom'
import rightArrow from '../../assets/icons/rightArrow.svg'
import samplePhoto from '../../assets/p1.jpg'
import PortfolioCard from '../../components/PortfolioCard'
import ButtonType3 from '../../components/ButtonType3'

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Back button - mobile responsive */}
      <NavLink 
        to="/" 
        className="absolute top-4 sm:top-6 lg:top-10 left-4 sm:left-6 lg:left-10 flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline z-10"
      >
        <img src={rightArrow} alt="back" className="w-3 h-3 sm:w-4 sm:h-4 rotate-180" />
        <span>Back to home</span>
      </NavLink>

      {/* Main content container - following home page padding patterns */}
      <div className="w-full px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">
        {/* Header section - modern and minimalistic */}
        <div className="mb-12 sm:mb-16 lg:mb-20 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight uppercase mb-4 sm:mb-6">
            Portfolio
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-zinc-600 leading-relaxed max-w-2xl mb-6 sm:mb-8">
            Our projects embody Saidpiece's commitment to cultural authenticity, innovation,
            and sustainability. Each work is a unique reflection of the client's vision,
            harmonized with Bhutanese tradition and modern design.
          </p>
          <div className="mt-6 sm:mt-8">
            <ButtonType3 title="Contact Us" to="/contact" />
          </div>
        </div>
        
        {/* Portfolio grid - responsive spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
          {[
            { id: 1, image: samplePhoto, title: 'Clock Tower', subtitle: 'Recreational area', location: 'Thimphu' },
            { id: 2, image: samplePhoto, title: 'Heritage House', subtitle: 'Cultural restoration', location: 'Punakha' },
            { id: 3, image: samplePhoto, title: 'Lotus Pavilion', subtitle: 'Public pavilion', location: 'Paro' },
            { id: 4, image: samplePhoto, title: 'Riverfront', subtitle: 'Landscape design', location: 'Wangdue' },
            { id: 5, image: samplePhoto, title: 'Mountain Retreat', subtitle: 'Resort design', location: 'Thimphu' },
            { id: 6, image: samplePhoto, title: 'Community Center', subtitle: 'Modern communal space', location: 'Mongar' },
          ].map((p) => (
            <PortfolioCard 
              key={p.id} 
              image={p.image} 
              alt={p.title} 
              title={p.title} 
              subtitle={p.subtitle} 
              location={p.location} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Portfolio
