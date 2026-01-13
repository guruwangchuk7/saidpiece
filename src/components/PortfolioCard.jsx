import React from 'react'

const PortfolioCard = ({ image, alt, title, subtitle, location }) => {
  return (
    <div className="group cursor-pointer">
      {/* Image container with hover effect */}
      <div className="relative overflow-hidden mb-4">
        <img 
          src={image} 
          alt={alt} 
          className="w-full h-[400px] lg:h-[450px] object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      </div>

      {/* Content section with border-top like Contact page */}
      <div className="border-t border-zinc-200 pt-4">
        <div className="flex flex-col gap-2">
          <div className="text-black uppercase font-semibold text-lg lg:text-xl tracking-tight">
            {title}
          </div>
          <div className="text-zinc-500 text-sm lg:text-base">
            {subtitle}
          </div>
          <div className="text-zinc-400 text-xs lg:text-sm mt-1">
            {location}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioCard
