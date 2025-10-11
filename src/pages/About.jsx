import React from "react";
import ButtonType3 from "../components/ButtonType3";
import studioImg from "../assets/aboutBg.svg";
import philosophyImg from "../assets/mainbg.svg";
import teamImg from "../assets/page3Bg.jpg";

function About() {
  const heroData = {
    heading: "SAIDPIECE STUDIO",
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
    <div className="p-2 lg:p-10">
      <div className="flex flex-col lg:flex-row justify-between gap-5 lg:gap-10">
        <img
          src={studioImg}
          alt="lauralassan"
          className="w-full rounded lg:w-[50%]"
        />
        <div className="flex flex-col justify-between">
          <div className="">
            <h1 className="text-4xl lg:text-5xl font-semibold">
              {heroData.heading}
            </h1>
            <p className="lg:text-xl w-fit mt-5 text-zinc-700">{heroData.des}</p>
          </div>
          <ButtonType3 title={`learn more`} to={`contact`} classes={`w-fit`} />
        </div>
      </div>
      {/* Phylosofy page */}
      <div className="lg:flex flex-row-reverse gap-10 mt-10 lg:mt-20">
        <img src={teamImg} alt="" className="w-full rounded lg:w-[50%]" />
        <div className="flex flex-col justify-between gap-10 mt-5 lg:mt-0 px-5">
          <div>
            <h1 className="text-4xl lg:text-5xl font-semibold">
              {data[0].heading}
            </h1>
            <p className="lg:text-xl w-fit mt-5 text-zinc-500">{data[0].des}</p>
          </div>
          <div>
            {data[0].final.map((item, index) => (
              <div key={index} className="lg:text-xl">
                <span className="font-semibold text-zinc-700">
                  {index + 1}.{"  "}
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Phylosofy page */}
      <div className="lg:flex gap-10 mt-10 lg:mt-20 mb-20">
        <img src={teamImg} alt="" className="w-full rounded lg:w-[50%]" />
        <div className="flex flex-col justify-between gap-10 mt-5 lg:mt-0 px-5">
          <div>
            <h1 className="text-4xl lg:text-5xl font-semibold">
              {data[1].heading}
            </h1>
            <p className="lg:text-xl w-fit mt-5 text-zinc-500">{data[1].des}</p>
          </div>
          <div>
            {data[1].final.map((item, index) => (
              <div key={index} className="lg:text-xl text-zinc-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default About;
