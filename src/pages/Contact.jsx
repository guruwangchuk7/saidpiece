import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { NavLink } from 'react-router-dom'
import rightArrow from '../assets/icons/rightArrow.svg'
import officeImage from '../assets/contact/saidpieceofficeimage.jpg'

// -- Sub-components --

const BackButton = () => (
  <NavLink
    to="/"
    className="absolute top-6 left-4 lg:top-10 lg:left-10 flex items-center gap-2 text-sm font-medium hover:underline z-10"
  >
    <img src={rightArrow} alt="Back" className="w-4 h-4 rotate-180" />
    <span>Back to home</span>
  </NavLink>
)

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', formData)
    alert('Message sent! (Demo)')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold text-zinc-800 uppercase tracking-tight">Send a Message</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label htmlFor="name" className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 block">Full Name</label>
          <input
            type="text"
            id="name"
            required
            className="w-full bg-zinc-50 border border-zinc-200 text-zinc-800 text-sm rounded-sm p-2 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-colors"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="email" className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 block">Gmail / Email</label>
          <input
            type="email"
            id="email"
            required
            className="w-full bg-zinc-50 border border-zinc-200 text-zinc-800 text-sm rounded-sm p-2 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-colors"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="message" className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 block">Ask me anything</label>
          <textarea
            id="message"
            required
            rows="3"
            className="w-full bg-zinc-50 border border-zinc-200 text-zinc-800 text-sm rounded-sm p-2 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-colors resize-none"
            placeholder="Your question or message..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="mt-2 bg-zinc-900 text-white text-sm font-medium py-2 px-4 rounded-sm hover:bg-zinc-700 transition-colors uppercase tracking-widest w-full lg:w-auto self-start"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

const ContactHeader = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative flex flex-col items-start gap-2 max-w-lg z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className="text-xl lg:text-2xl text-zinc-500 pointer-events-none">Hello</p>
      <div className="relative group cursor-pointer inline-block">
        <h1 className="text-4xl lg:text-7xl font-bold tracking-tight leading-tight uppercase transition-colors duration-300 group-hover:text-zinc-700">
          LET'S TALK?
        </h1>
        {/* Underline effect to hint interactivity */}
        <span className="absolute left-0 bottom-0 w-0 h-1 bg-zinc-800 transition-all duration-300 group-hover:w-full"></span>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-full left-0 mt-4 w-[90vw] md:w-[400px] bg-white border border-zinc-200 shadow-2xl rounded-lg p-6 lg:p-8 overflow-hidden"
            style={{ maxWidth: 'calc(100vw - 48px)' }} // Ensure it doesn't overflow screen on small mobile
          >
            <ContactForm />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const ContactItem = ({ label, children }) => (
  <div className="flex flex-col gap-2 lg:gap-4">
    <span className="font-medium">{label}</span>
    {children}
  </div>
)

const ContactInfo = () => (
  <div className="flex-1 w-full lg:max-w-sm border-t border-zinc-200 pt-4 lg:pt-2 pr-0 lg:pr-10">
    <h2 className="text-sm text-zinc-600 mb-4 lg:mb-2">General contacts</h2>

    <div className="space-y-6 lg:space-y-3 text-zinc-700">
      <ContactItem label="E:">
        <a href="mailto:thinley@saidpiece.com" className="text-zinc-600 hover:underline break-all">
          thinley@saidpiece.com
        </a>
      </ContactItem>

      <ContactItem label="P:">
        <div className="text-zinc-600">
          <div>+975 17899794 (BHT)</div>
          <div>+66 931205085 (TH)</div>
        </div>
      </ContactItem>

      <ContactItem label="S.L:">
        <div className="flex flex-wrap gap-3 text-zinc-600">
          <a href="https://www.instagram.com/saidpiece_architects?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="transition duration-300 hover:scale-105 origin-left">Instagram</a>
          <a href="https://www.facebook.com/saidpiece.architects" target="_blank" rel="noopener noreferrer" className="transition duration-300 hover:scale-105 origin-left">Facebook</a>
          <a href="https://www.linkedin.com/company/saidpiece/" target="_blank" rel="noopener noreferrer" className="transition duration-300 hover:scale-105 origin-left">LinkedIn</a>
        </div>
      </ContactItem>
    </div>
  </div>
)

const ContactContentSection = () => (
  <div className="flex flex-col-reverse lg:flex-row items-start gap-10 lg:gap-8">
    <ContactInfo />

    <div className="w-full h-auto lg:w-110 lg:max-h-[60vh] self-start shrink-0">
      <img
        src={officeImage}
        alt="Saidpiece office"
        className="w-full h-auto lg:h-full lg:max-h-[60vh] object-cover rounded-sm"
      />
    </div>
  </div>
)

// -- Main Component --

function Contact() {
  return (
    <div className="relative flex flex-col bg-white px-6 lg:px-20 py-4 lg:py-8 pb-32 lg:pb-12">
      <BackButton />

      {/* Main Layout: Stack on Mobile, Row on Desktop */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start w-full mt-10 sm:mt-16 lg:mt-24 gap-6 lg:gap-0">

        {/* Left Side (Desktop) / Top (Mobile) */}
        <ContactHeader />

        {/* Right Side (Desktop) / Bottom (Mobile) */}
        <ContactContentSection />

      </div>
    </div>
  )
}

export default Contact