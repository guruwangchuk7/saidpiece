import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { NavLink } from 'react-router-dom'
import rightArrow from '../../assets/icons/rightArrow.svg'
import officeImage from '../../assets/contact/saidpieceofficeimage.jpg'
import { supabase } from '../../services/supabaseClient'
import emailjs from '@emailjs/browser'
import { useSiteContent } from '../../context/SiteContentContext'
import SEO from '../../components/common/SEO'

// Initialize EmailJS
emailjs.init('XkNzaXXHW5Z1e0x48');

// -- Sub-components --

const BackButton = () => (
  <NavLink
    to="/"
    className="absolute top-6 sm:top-10 left-3 sm:left-5 lg:left-10 flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline z-20"
  >
    <img src={rightArrow} alt="Back" className="w-4 h-4 rotate-180" loading="eager" />
    <span>Back to home</span>
  </NavLink>
)

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const { error } = await supabase
        .from('messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          message: formData.message,
          created_at: new Date().toISOString()
        }])

      if (error) throw error

      // 2. Send email via EmailJS
      const SERVICE_ID = 'service_oaqnzvz';
      const TEMPLATE_ID = 'template_tl4scas';

      if (SERVICE_ID) {
        try {
          console.log("Attempting to send email via EmailJS...", { SERVICE_ID, TEMPLATE_ID });
          const emailResponse = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            name: formData.name,      // Matches {{name}} in template
            email: formData.email,    // Matches {{email}} in template
            message: formData.message,// Matches {{message}} in template
            title: 'New Website Enquiry' // Matches {{title}} in subject
          });
          console.log("EmailJS Success:", emailResponse.status, emailResponse.text);
        } catch (emailError) {
          console.error("Failed to send email notification:", emailError);
          console.error("Error details:", {
            message: emailError.message,
            text: emailError.text,
            status: emailError.status,
            stack: emailError.stack
          });
          alert(`Email Failed!\nMessage: ${emailError.message || 'Unknown'}\nStatus: ${emailError.status || 'N/A'}\nText: ${emailError.text || 'N/A'}`);
        }
      }

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error('Error sending message:', err)
      setStatus('error')
      if (err.message && err.message.includes('relation "messages" does not exist')) {
        setErrorMessage("System Error: The 'messages' table does not exist in the database. Please contact the administrator.")
      } else {
        setErrorMessage('Failed to send message. Please try again later.')
      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold text-zinc-800 uppercase tracking-tight">Send a Message</h3>

      {status === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-800 text-sm p-3 rounded-sm mb-2">
          Message sent successfully! We'll get back to you soon.
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 text-sm p-3 rounded-sm mb-2">
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

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
            disabled={status === 'loading'}
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
            disabled={status === 'loading'}
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
            disabled={status === 'loading'}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="mt-2 bg-zinc-900 text-white text-sm font-medium py-2 px-4 rounded-sm hover:bg-zinc-700 transition-colors uppercase tracking-widest w-full lg:w-auto self-start disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

const ContactHeader = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative flex flex-col items-start gap-2 max-w-lg z-10">
      <p className="text-sm lg:text-2xl text-zinc-500 pointer-events-none">Hello</p>
      <div
        className="relative group cursor-pointer inline-block"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h1 className="text-3xl lg:text-7xl font-bold tracking-tight leading-tight uppercase transition-colors duration-300 group-hover:text-zinc-700 -ml-0.5">
          {data?.heading || "LET'S TALK?"}
        </h1>
        {/* Underline effect to hint interactivity */}
        <span className={`absolute left-0 bottom-0 h-1 bg-zinc-800 transition-all duration-300 ${isOpen ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-full left-0 mt-4 w-[90vw] md:w-[400px] bg-white border border-zinc-200 shadow-2xl rounded-lg p-6 lg:p-8 overflow-hidden z-50"
            style={{ maxWidth: 'calc(100vw - 48px)' }}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Contact Form</span>
              <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-zinc-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
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

const ContactInfo = ({ data }) => (
  <div className="flex-1 w-full lg:max-w-sm border-t border-zinc-200 pt-4 lg:pt-2 pr-0 lg:pr-10">
    <h2 className="text-sm text-zinc-600 mb-4 lg:mb-2">General contacts</h2>

    <div className="space-y-6 lg:space-y-3 text-zinc-700">
      <ContactItem label="E:">
        <a href={`mailto:${data?.email || "thinley@saidpiece.com"}`} className="text-zinc-600 hover:underline break-all">
          {data?.email || "thinley@saidpiece.com"}
        </a>
      </ContactItem>

      <ContactItem label="P:">
        <div className="text-zinc-600">
          <div>{data?.phoneBht || "+975 17899794 (BHT)"}</div>
          <div><a href={`https://wa.me/${(data?.phoneTh || "+66 931205085 (TH)").replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{data?.phoneTh || "+66 931205085 (TH)"}</a></div>
        </div>
      </ContactItem>

      <ContactItem label="S.L:">
        <div className="flex flex-wrap gap-3 text-zinc-600">
          <a href={data?.instagram || "https://www.instagram.com/saidpiece_architects?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="} target="_blank" rel="noopener noreferrer" className="transition duration-300 hover:scale-105 origin-left">Instagram</a>
          <a href={data?.facebook || "https://www.facebook.com/saidpiece.architects"} target="_blank" rel="noopener noreferrer" className="transition duration-300 hover:scale-105 origin-left">Facebook</a>
          <a href={data?.linkedin || "https://www.linkedin.com/company/saidpiece/"} target="_blank" rel="noopener noreferrer" className="transition duration-300 hover:scale-105 origin-left">LinkedIn</a>
        </div>
      </ContactItem>
    </div>
  </div>
)

const ContactContentSection = ({ data }) => (
  <div className="flex flex-col-reverse lg:flex-row items-start gap-10 lg:gap-8">
    <ContactInfo data={data} />

    <div className="w-full h-auto lg:w-110 lg:max-h-[60vh] self-start shrink-0">
      <img
        src={data?.image_url || officeImage}
        alt="Saidpiece office"
        className="w-full h-auto lg:h-full lg:max-h-[60vh] object-cover rounded-sm"
        loading="eager"
      />
    </div>
  </div>
)

// -- Main Component --

function Contact() {
  const { content } = useSiteContent();
  const contactData = content?.contact_page || {};

  return (
    <div className="relative flex flex-col bg-white px-3 sm:px-5 lg:px-10 py-4 lg:py-8 pb-32 lg:pb-12">
      <SEO 
        title="Contact"
        description="Get in touch with Saidpiece Architects for your architectural and engineering needs. Located in Thimphu, Bhutan."
        canonical="/contact"
      />
      <BackButton />

      {/* Main Layout: Stack on Mobile, Row on Desktop */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start w-full mt-10 sm:mt-16 lg:mt-24 gap-6 lg:gap-0">

        {/* Left Side (Desktop) / Top (Mobile) */}
        <ContactHeader data={contactData} />

        {/* Right Side (Desktop) / Bottom (Mobile) */}
        <ContactContentSection data={contactData} />

      </div>
    </div>
  )
}

export default Contact