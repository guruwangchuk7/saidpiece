import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import rightArrow from "../assets/icons/rightArrow.svg";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Sidebar Options
const sections = ["Privacy Notice", "Terms of Use", "Terms of Sale"];

const Legal = () => {
  const [activeSection, setActiveSection] = useState("Terms of Use");
  const mainRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Use GSAP Context for proper cleanup
    const context = gsap.context(() => {
      // Don't run animations if the user prefers reduced motion
      if (prefersReducedMotion) {
        gsap.set("[data-animate='fade-in'], [data-animate-child]", { opacity: 1, y: 0 });
        return;
      }

      // Animate hero title on load
      gsap.from("[data-animate='fade-in']", {
        opacity: 0,
        y: 40,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.3,
      });

      // Animate sidebar and content sections
      const elements = gsap.utils.toArray("[data-animate-child]");
      elements.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          scale: 0.98,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, mainRef);

    return () => context.revert();
  }, [activeSection]);

  const content = {
    "Privacy Notice": (
      <>
        <h1 className="text-4xl lg:text-6xl font-medium uppercase tracking-tight">Privacy Notice</h1>
        <p className="text-xs text-zinc-400 mt-4">LAST UPDATED 04/12/2025</p>

        <div className="space-y-10 mt-12 text-zinc-700 leading-relaxed">
          <p>At Saidpiece Architecture, your privacy matters. We only collect personal information necessary to communicate, improve services, and secure our platform.</p>

          <div>
            <h3 className="font-semibold uppercase text-lg mb-3">Types of Data We Collect</h3>
            <p>✓ Contact information (name, email, phone)<br />✓ Project inquiry details<br />✓ Website analytics and technical data</p>
          </div>

          <div>
            <h3 className="font-semibold uppercase text-lg mb-3">How We Use Your Data</h3>
            <p>Your information helps us respond to requests, manage projects efficiently, and enhance user experience.</p>
          </div>

          <div>
            <h3 className="font-semibold uppercase text-lg mb-3">Cookies</h3>
            <p>We use cookies to analyze trends and website performance. You can disable them anytime via browser settings.</p>
          </div>
        </div>
      </>
    ),

    "Terms of Use": (
      <>
        <h1 className="text-4xl lg:text-6xl font-medium uppercase tracking-tight">Terms of Use</h1>
        <p className="text-xs text-zinc-400 mt-4">LAST UPDATED 04/12/2025</p>

        <div className="space-y-10 mt-12 text-zinc-700 leading-relaxed">
          <p>By visiting and using this website, you agree to comply with these terms. If you disagree, please discontinue using the Site.</p>

          <div>
            <h3 className="font-semibold uppercase text-lg mb-3">Intellectual Property</h3>
            <p>All designs, imagery, branding, and content belong to Saidpiece Architecture. Copying, distribution, or reproduction is prohibited without permission.</p>
          </div>

          <div>
            <h3 className="font-semibold uppercase text-lg mb-3">Prohibited Use</h3>
            <p>You may not engage in activities that damage the Site, access restricted systems, or misuse content.</p>
          </div>

          <div>
            <h3 className="font-semibold uppercase text-lg mb-3">Modifications</h3>
            <p>We may revise these terms at any time. Continued use means you accept the updates.</p>
          </div>
        </div>
      </>
    ),

    "Terms of Sale": (
      <>
        <h1 className="text-4xl lg:text-6xl font-medium uppercase tracking-tight">Terms of Sale</h1>
        <p className="text-xs text-zinc-400 mt-4">LAST UPDATED 04/12/2025</p>

        <div className="space-y-10 mt-12 text-zinc-700 leading-relaxed">
          <p>These terms govern transactions involving architectural services, design deliverables, or products purchased through Saidpiece Architecture.</p>

          <div>
            <h3 className="font-semibold uppercase text-lg mb-3">Payments & Pricing</h3>
            <p>Project pricing varies based on complexity, scope, and client requirements. Payments are due as per signed agreements.</p>
          </div>

          <div>
            <h3 className="font-semibold uppercase text-lg mb-3">Project Deliverables</h3>
            <p>Design files and architectural outputs remain the property of Saidpiece Architecture until full payment is received.</p>
          </div>

          <div>
            <h3 className="font-semibold uppercase text-lg mb-3">Refunds</h3>
            <p>Due to the nature of design services, completed work is non-refundable.</p>
          </div>
        </div>
      </>
    )
  };

  return (
    <div ref={mainRef} className="min-h-screen w-full bg-white px-6 lg:px-20 py-10 relative">

      {/* Back Button */}
      <NavLink
        to="/"
        data-animate="fade-in"
        className="absolute top-10 left-6 flex items-center gap-2 text-sm font-medium hover:underline"
      >
        <img src={rightArrow} alt="Back" className="w-4 h-4 rotate-180" />
        <span>Back to Home</span>
      </NavLink>

      {/* Main Layout */}
      <div className="flex w-full mt-32 gap-20">

        {/* Sidebar */}
        <aside data-animate-child className="w-1/4 hidden lg:flex flex-col text-sm uppercase tracking-wide text-zinc-600 gap-8">
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className="flex items-center gap-3 transition-opacity"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  activeSection === sec ? "bg-black" : "border"
                }`}
              ></span>
              <span className={`${activeSection === sec ? "text-black" : "opacity-60"}`}>
                {sec}
              </span>
            </button>
          ))}
        </aside>

        {/* Animated Content */}
        <main data-animate-child className="w-full lg:w-3/4 max-w-4xl">
          <div
            key={activeSection}
            className="min-h-[50vh] transition-opacity duration-300"
          >
            {content[activeSection]}
          </div>

          <p className="text-sm text-zinc-500 mt-20">
            © {new Date().getFullYear()} Saidpiece Architecture. All Rights Reserved.
          </p>
        </main>

      </div>
    </div>
  );
};

export default Legal;
