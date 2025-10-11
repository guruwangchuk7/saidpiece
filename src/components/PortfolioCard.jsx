import React from 'react'

const PortfolioCard = ({ image, alt, title, subtitle, location }) => {
  return (
    <div className="w-[410px]">
      <img src={image} alt={alt} width="410" height="378" className="object-cover" />

      <div className="mt-4 flex items-start justify-between max-w-[410px]">
        <div>
          <div className="text-black uppercase font-semibold text-xl">{title}</div>
          <div className="text-zinc-400 text-sm mt-1">{subtitle}</div>
        </div>

        <div className="flex items-center gap-2 text-zinc-400">
          <div className="text-zinc-400 font-medium">{location}</div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioCard
