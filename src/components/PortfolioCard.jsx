import React from 'react'

const PortfolioCard = ({ image, alt, title, subtitle, location }) => {
  return (
    <div className="group cursor-pointer">
      {/* Image container with hover effect - responsive height */}
      <div className="relative overflow-hidden mb-3 sm:mb-4">
        <img 
          src={image} 
          alt={alt} 
          className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      </div>

      {/* Content section with border-top - minimalistic design */}
      <div className="border-t border-zinc-200 pt-3 sm:pt-4">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <div className="text-black uppercase font-semibold text-base sm:text-lg lg:text-xl tracking-tight">
            {title}
          </div>
          <div className="text-zinc-500 text-xs sm:text-sm lg:text-base">
            {subtitle}
          </div>
          <div className="text-zinc-400 text-xs sm:text-sm mt-0.5 sm:mt-1">
            {location}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioCard
