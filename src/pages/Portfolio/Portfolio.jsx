import React from 'react'
import { NavLink } from 'react-router-dom'
import rightArrow from '../../assets/icons/rightArrow.svg'
import samplePhoto from '../../assets/p1.jpg'
import PortfolioCard from '../../components/PortfolioCard'
import ButtonType3 from '../../components/ButtonType3'
import H5 from '../home/H5'

const Portfolio = () => {
  return (
    <div>
      <div className="min-h-screen relative flex items-start justify-center bg-white px-4 lg:px-20 py-10">
        <NavLink to="/" className="absolute top-10 left-4 flex items-center gap-2 text-sm font-medium hover:underline">
        <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180" />
        <span>Back to home</span>
      </NavLink>

      <div className="w-full px-6 py-20">
        {/* Header section - similar to Contact page */}
        <div className="mb-16 lg:mb-20">
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight uppercase mb-6">
            Portfolio
          </h1>
          <p className="text-zinc-600 text-base lg:text-lg leading-relaxed max-w-2xl">
            Our projects embody Saidpiece's commitment to cultural authenticity, innovation,
            and sustainability. Each work is a unique reflection of the client's vision,
            harmonized with Bhutanese tradition and modern design.
          </p>
          <div className="mt-8">
            <ButtonType3 title="Contact Us" to="/contact" />
          </div>
        </div>
        
        {/* Portfolio grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
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
      <H5 />
    </div>
  )
}

export default Portfolio
