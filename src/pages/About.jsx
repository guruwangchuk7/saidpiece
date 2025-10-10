import React from "react";
import ButtonType3 from "../components/ButtonType3";
import studioImg from "../assets/aboutBg.svg";
import philosophyImg from "../assets/mainbg.svg";
import teamImg from "../assets/page3Bg.jpg";

function About() {
  return (
    <div className="w-full min-h-screen bg-[#fafafa] text-zinc-900">
      {/* ===== Hero Section ===== */}
      <section className="w-full h-[90vh] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-10 border-b border-zinc-200 bg-gradient-to-br from-white via-[#f3f4f6] to-[#e5e7eb]">
        <div className="lg:w-1/2 flex flex-col justify-center gap-6">
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight uppercase">
            SaidPiece Studio
          </h1>
          <p className="text-zinc-600 text-lg lg:text-xl leading-relaxed max-w-xl">
            A studio of architecture and design — where every structure,
            sound, and silence is crafted with meaning. Based in Bhutan,
            SaidPiece merges modern creativity with traditional philosophy
            rooted in balance and authenticity.
          </p>
          <div className="mt-4">
            <ButtonType3 title="Explore Works" to="/contact" />
          </div>
        </div>
        <div className="lg:w-[45%] mt-10 lg:mt-0 flex justify-center">
          <img
            src={studioImg}
            alt="SaidPiece Studio"
            className="w-full h-[60vh] object-cover rounded-2xl shadow-xl border-4 border-white"
          />
        </div>
      </section>

      {/* ===== Philosophy Section ===== */}
      <section className="w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-20 border-b border-zinc-200 bg-white">
        <div className="lg:w-[45%] order-2 lg:order-1 mt-10 lg:mt-0 flex justify-center">
          <img
            src={philosophyImg}
            alt="Philosophy"
            className="w-full h-[60vh] object-cover rounded-2xl shadow-lg border-2 border-zinc-100"
          />
        </div>
        <div className="lg:w-1/2 flex flex-col gap-6 order-1 lg:order-2">
          <h2 className="text-4xl lg:text-5xl font-semibold uppercase text-[#22223b]">
            Philosophy
          </h2>
          <p className="text-zinc-600 text-lg leading-relaxed">
            Our philosophy revolves around the intersection of form and feeling.
            We believe design is not just about function — it’s about resonance.
            Each project is an expression of emotion made tangible, guided by
            the principles of Gross National Happiness: harmony, sustainability,
            and human connection.
          </p>
          <ul className="list-disc pl-6 text-zinc-500">
            <li>Harmony with nature and culture</li>
            <li>Sustainable and innovative solutions</li>
            <li>Human-centered, meaningful spaces</li>
          </ul>
        </div>
      </section>

      {/* ===== Team Section ===== */}
      <section className="w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-20 bg-gradient-to-tl from-[#f3f4f6] via-white to-[#e5e7eb]">
        <div className="lg:w-1/2 flex flex-col justify-center gap-6">
          <h2 className="text-4xl lg:text-5xl font-semibold uppercase text-[#22223b]">
            The Team
          </h2>
          <p className="text-zinc-600 text-lg leading-relaxed">
            SaidPiece Studio is a collective of architects, designers, and
            artists who share a single ethos — to create from sincerity. We are
            dreamers grounded in craft, exploring both the physical and digital
            frontiers of experience design.
          </p>
          <p className="text-zinc-500 text-base max-w-md">
            Each member brings a distinct voice, yet every creation speaks in
            harmony — a reflection of our shared pursuit for timelessness.
          </p>
        </div>
        <div className="lg:w-[45%] mt-10 lg:mt-0 flex justify-center">
          <img
            src={teamImg}
            alt="Team"
            className="w-full h-[60vh] object-cover rounded-2xl shadow-lg border-2 border-zinc-100"
          />
        </div>
      </section>
    </div>
  );
}

export default About;