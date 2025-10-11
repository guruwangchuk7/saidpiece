import React, { useMemo, useState, useRef, useEffect } from 'react'
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
  const images = [p1, page3Bg, mainbg, reactLogo, aboutBg, ci1]

  const assignedImages = useMemo(() => {
    return teamMembers.map(() => images[Math.floor(Math.random() * images.length)])

  }, [])

  const originalCount = teamMembers.length

  const REPEATS = 50

  const middleRepeat = Math.floor(REPEATS / 2)
  const [activeIdx, setActiveIdx] = useState(originalCount * middleRepeat)
  const trackRef = useRef(null)
  const firstCardRef = useRef(null)

  const [cardWidth, setCardWidth] = useState(18 * 16) 
  const [gap, setGap] = useState(2 * 16) 

  useEffect(() => {
    const updateMeasurements = () => {
      if (firstCardRef.current) {
        const rect = firstCardRef.current.getBoundingClientRect()
        setCardWidth(rect.width)
      }

      const track = trackRef.current?.querySelector('.carousel-inner')
      if (track && track.children.length >= 2) {
        const a = track.children[0].getBoundingClientRect()
        const b = track.children[1].getBoundingClientRect()
        setGap(b.left - (a.left + a.width))
      }
    }

    updateMeasurements()
    window.addEventListener('resize', updateMeasurements)
    return () => window.removeEventListener('resize', updateMeasurements)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    let startX = 0
    let currentX = 0
    let dragging = false

    const onTouchStart = (e) => {
      dragging = true
      startX = e.touches ? e.touches[0].clientX : e.clientX
    }

    const onTouchMove = (e) => {
      if (!dragging) return
      currentX = e.touches ? e.touches[0].clientX : e.clientX
    }

    const onTouchEnd = () => {
      if (!dragging) return
      const diff = startX - currentX
      if (Math.abs(diff) > 40) {
        if (diff > 0) setActiveIdx((i) => i + 1)
        else setActiveIdx((i) => i - 1)
      }
      dragging = false
      startX = currentX = 0
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: true })
    el.addEventListener('touchend', onTouchEnd)
    // mouse fallback
  el.addEventListener('mousedown', onTouchStart)
    window.addEventListener('mousemove', onTouchMove)
    window.addEventListener('mouseup', onTouchEnd)

    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('mousedown', onTouchStart)
      window.removeEventListener('mousemove', onTouchMove)
      window.removeEventListener('mouseup', onTouchEnd)
    }
  }, [trackRef.current])

  // keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') setActiveIdx((i) => i + 1)
    if (e.key === 'ArrowLeft') setActiveIdx((i) => i - 1)
  }

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

      {/* Team Section - Carousel (no scrollbar) */}
      <div className="mt-16 w-full">
        <div className="relative">
          {/* Prev / Next buttons */}
          <button
            aria-label="Previous"
            onClick={() => setActiveIdx((idx) => idx - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-2 rounded-full shadow-md hover:bg-white"
          >
            ‹
          </button>

          <button
            aria-label="Next"
            onClick={() => setActiveIdx((idx) => idx + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-2 rounded-full shadow-md hover:bg-white"
          >
            ›
          </button>

          {/* Track */}
          <div
            ref={trackRef}
            className="carousel-track overflow-hidden pb-6"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            style={{
              // hide scrollbar (WebKit/IE/Firefox)
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            <div
              className={`carousel-inner flex gap-8 will-change-transform transition-transform duration-500`}
              style={{ transform: `translateX(-${activeIdx * (cardWidth + gap)}px)` }}
            >
              {Array.from({ length: REPEATS }).map((_, copy) =>
                teamMembers.map((member, index) => {
                  const globalIndex = copy * originalCount + index
                  return (
                    <div
                      key={`${copy}-${member.name}-${index}`}
                      ref={copy === middleRepeat && index === 0 ? firstCardRef : null}
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
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Team