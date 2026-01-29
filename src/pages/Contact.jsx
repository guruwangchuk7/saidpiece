import React from 'react'
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

const ContactHeader = () => (
  <div className="flex flex-col items-start gap-2 max-w-lg">
    <p className="text-xl lg:text-2xl text-zinc-500">Hello</p>
    <h1 className="text-4xl lg:text-7xl font-bold tracking-tight leading-tight uppercase">
      LET'S TALK?
    </h1>
  </div>
)

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

      <ContactItem label="S.M:">
        <span className="text-zinc-600">Instagram, Facebook, LinkedIn</span>
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