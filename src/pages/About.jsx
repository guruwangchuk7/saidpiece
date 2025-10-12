import React from "react";
import ButtonType3 from "../components/ButtonType3";
import studioImg from "../assets/aboutBg.svg";
import philosophyImg from "../assets/mainbg.svg";
import teamImg from "../assets/page3Bg.jpg";
import aboutUsImg from "../assets/aboutus.jpg";

function About() {
  const heroData = {
    headingTop: "STUDIO / ESTABLISHING FORMATION",
    headingMain: "STUDIO OF ARCHITECTURE AND DESIGN",
    des: "A studio of architecture and design — where every structure, sound, and silence is crafted with meaning. Based in Bhutan, SaidPiece merges modern creativity with traditional philosophy rooted in balance and authenticity.",
  };
  const data = [
    {
      heading: "Philosophy",
      des: "Our philosophy revolves around the intersection of form and feeling. We believe design is not just about function — it’s about resonance. Each project is an expression of emotion made tangible, guided by the principles of Gross National Happiness: harmony, sustainability, and human connection.",
      final: [
        "Harmony with nature and culture",
        "Sustainable and innovative solutions",
        "Human-centered, meaningful spaces",
      ],
    },
    {
      heading: "The Team",
      des: "SaidPiece Studio is a collective of architects, designers, and artists who share a single ethos — to create from sincerity. We are dreamers grounded in craft, exploring both the physical and digital frontiers of experience design.",
      final: [
        "Each member brings a distinct voice, yet every creation speaks in harmony — a reflection of our shared pursuit for timelessness.",
      ],
    },
  ];

  return (
    <div className="w-full flex flex-col">
      {/* HERO */}
      <div
        className="relative w-full h-[80vh] flex flex-col justify-center items-center text-white text-center"
        style={{
          backgroundImage: `url(${aboutUsImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-5">
          <p className="uppercase tracking-widest text-sm mb-2 text-gray-300">
            {heroData.headingTop}
          </p>
          <h1 className="text-4xl lg:text-6xl font-semibold max-w-4xl mx-auto leading-tight">
            {heroData.headingMain}
          </h1>
          {heroData.des && (
            <p className="mt-4 text-zinc-200 max-w-2xl mx-auto">{heroData.des}</p>
          )}
        </div>
      </div>

      {/* ABOUT STUDIO */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10 py-20 px-5 lg:px-20 bg-zinc-50">
        <img
          src={studioImg}
          alt="studio"
          className="w-full lg:w-[45%] rounded-xl shadow-lg"
        />
        <div className="lg:w-[50%] flex flex-col gap-6">
          <h2 className="text-3xl lg:text-4xl font-semibold">About SaidPiece Studio</h2>
          <p className="text-zinc-600 text-lg">
            SaidPiece Architecture is a Bhutan-based studio blending cultural authenticity
            with modern minimalism. Each creation reflects emotional resonance, spatial
            harmony, and a deep respect for Bhutanese philosophy.
          </p>
          <div className="flex flex-col gap-3 mt-4">
            <div className="text-lg text-zinc-700"><span className="font-semibold text-black">1.</span> SaidPiece Architecture has completed diverse works across both physical and digital mediums.</div>
            <div className="text-lg text-zinc-700"><span className="font-semibold text-black">2.</span> Projects in 20+ countries across the world.</div>
            <div className="text-lg text-zinc-700"><span className="font-semibold text-black">3.</span> Engaged with professional, educational, and cultural institutions worldwide through design, storytelling, and craft.</div>
          </div>
        </div>
      </div>
      {/* PHILOSOPHY SECTION */}
      <div className="lg:flex flex-row-reverse gap-10 mt-10 lg:mt-20 px-5 lg:px-20">
        <img src={philosophyImg} alt="philosophy" className="w-full rounded-lg lg:w-[50%]" />
        <div className="flex flex-col justify-between gap-10 mt-5 lg:mt-0">
          <div>
            <h1 className="text-4xl lg:text-5xl font-semibold">{data[0].heading}</h1>
            <p className="lg:text-xl w-fit mt-5 text-zinc-500">{data[0].des}</p>
          </div>
          <div>
            {data[0].final.map((item, index) => (
              <div key={index} className="lg:text-xl">
                <span className="font-semibold text-zinc-700">{index + 1}.&nbsp;&nbsp;</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* TEAM SECTION */}
      <div className="lg:flex gap-10 mt-10 lg:mt-20 mb-20 px-5 lg:px-20">
        <img src={teamImg} alt="team" className="w-full rounded-lg lg:w-[50%]" />
        <div className="flex flex-col justify-between gap-10 mt-5 lg:mt-0">
          <div>
            <h1 className="text-4xl lg:text-5xl font-semibold">{data[1].heading}</h1>
            <p className="lg:text-xl w-fit mt-5 text-zinc-500">{data[1].des}</p>
          </div>
          <div>
            {data[1].final.map((item, index) => (
              <div key={index} className="lg:text-xl text-zinc-700">{item}</div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default About;
