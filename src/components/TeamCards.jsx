import React, { useEffect, useRef } from 'react'
import p1 from '../assets/p1.jpg'
import page3Bg from '../assets/page3Bg.jpg'
import mainbg from '../assets/mainbg.svg'

export default function TeamCards() {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const cards = Array.from(container.querySelectorAll('.tc-card'))
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
          else entry.target.classList.remove('visible')
        })
      },
      { threshold: 0.3 }
    )

    cards.forEach(c => io.observe(c))

    // drag to scroll (mouse + touch)
    let isDown = false
    let startX = 0
    let scrollLeft = 0

    const onMouseDown = e => {
      isDown = true
      container.classList.add('dragging')
      startX = e.pageX - container.offsetLeft
      scrollLeft = container.scrollLeft
    }

    const onMouseLeave = () => {
      isDown = false
      container.classList.remove('dragging')
    }

    const onMouseUp = () => {
      isDown = false
      container.classList.remove('dragging')
    }

    const onMouseMove = e => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - container.offsetLeft
      const walk = (x - startX) * 1 // scroll-fast multiplier
      container.scrollLeft = scrollLeft - walk
    }

    const onTouchStart = e => {
      startX = e.touches[0].pageX - container.offsetLeft
      scrollLeft = container.scrollLeft
    }

    const onTouchMove = e => {
      const x = e.touches[0].pageX - container.offsetLeft
      const walk = (x - startX) * 1
      container.scrollLeft = scrollLeft - walk
    }

    container.addEventListener('mousedown', onMouseDown)
    container.addEventListener('mouseleave', onMouseLeave)
    container.addEventListener('mouseup', onMouseUp)
    container.addEventListener('mousemove', onMouseMove)
    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      io.disconnect()
      container.removeEventListener('mousedown', onMouseDown)
      container.removeEventListener('mouseleave', onMouseLeave)
      container.removeEventListener('mouseup', onMouseUp)
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  // use the four specified people with placeholder images and colorful background placeholders
  const people = [
    { img: p1, name: 'Sailesh Humagai', title: 'Director & Architect', color: 'linear-gradient(135deg,#FFD6A5,#FFADAD)' },
    { img: page3Bg, name: 'Thinley Dhendup', title: 'Founder & Owner of the Company', color: 'linear-gradient(135deg,#C7F9CC,#9EE6FF)' },
    { img: mainbg, name: 'Sangay Thinley', title: 'Director & Architect', color: 'linear-gradient(135deg,#FBCFE8,#FCD34D)' },
    { img: p1, name: 'Namgay Dorji', title: 'Director & Architect', color: 'linear-gradient(135deg,#D6E4FF,#B8F2E6)' }
  ]

  return (
    <div className="mt-10">
      <div
        ref={ref}
        className="team-cards horizontal-cards overflow-x-auto overflow-y-hidden flex items-stretch px-6 py-6"
        style={{ gap: '1rem', scrollSnapType: 'x mandatory' }}
      >
        {people.map((p, i) => (
          <div
            key={i}
            className="tc-card flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden"
            style={{ width: '280px', height: '380px', scrollSnapAlign: 'center', transition: 'transform 400ms ease, opacity 400ms ease' }}
          >
            <div style={{ height: '58%' }} className="w-full overflow-hidden flex items-end justify-start p-4">
              {/* colorful placeholder background behind the image */}
              <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden', background: p.color }}>
                <img src={p.img} alt={p.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'overlay', opacity: 0.95 }} />
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg lg:text-xl font-bold">{p.name}</h4>
              <p className="text-zinc-600 mt-1 text-sm">{p.title}</p>
            </div>
          </div>
        ))}

        {/* small inline styles for intersection animation and custom scrollbar hiding for webkit */}
        <style>{`
          .horizontal-cards::-webkit-scrollbar{ height:0.4rem }
          .horizontal-cards::-webkit-scrollbar-thumb{ background:rgba(0,0,0,0.12); border-radius:9999px }
          .horizontal-cards{ -ms-overflow-style: none; scrollbar-width: none }
          .horizontal-cards::-webkit-scrollbar { display: none }
          /* cards are visible by default; observer will add a subtle lift */
          .tc-card{ opacity: 1; transform: translateY(0) }
          .tc-card.visible{ transform: translateY(-6px) }
        `}</style>
      </div>
    </div>
  )
}
