import React from "react";
import homemain from "../../assets/homephoto/homemain.webp";
import BtnT1 from "../../components/common/ButtonType1";
import { NavLink } from 'react-router-dom'

function H2() {
  const data = {
    heading: "STUDIO OF ARCHITECTURE AND ENGINEERING",
    about:
      "Saidpiece Architects has completed projects across Bhutan and abroad, specializing in architectural design, urban planning, interior design, engineering, and construction consultancy. Guided by the principles of Gross National Happiness, we merge sustainability, creativity, and precision to deliver innovative, culturally authentic design solutions.",
    publication:
      "Our work aspires to contribute to leading global and regional design platforms and journals, sharing Bhutan’s unique architectural vision with the world.",
    imgData: [homemain],
  };

  return (
    <div className="flex mt-10 sm:mt-16 md:mt-20 flex-wrap items-start">
      <div className="w-full lg:w-[30%] px-3 sm:px-5 lg:px-10 lg:h-[80vh] flex flex-col justify-between">
        <div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold">{data.heading}</h1>
          <div className="px-3 sm:px-4 md:px-5 border-l-2 border-zinc-400 ">
            <div className="aboutus mt-6 sm:mt-8 md:mt-10">
              <p className="text-zinc-500 text-sm sm:text-base">About us:</p>
              <p className="font-normal mt-2 text-sm sm:text-base">{data.about}</p>
            </div>
            <div className="publication mt-6 sm:mt-8 md:mt-10">
              <p className="text-zinc-500 mt-2 text-sm sm:text-base">Publications:</p>
              <p className="text-sm sm:text-base">{data.publication}</p>
            </div>
          </div>
        </div>
        <NavLink to={'/about'} className="mt-10 lg:mt-0 lg:pb-4">
          <BtnT1 title={"MORE ABOUT THE STUDIO"} />
        </NavLink>
      </div>
      {data.imgData.map((img, index) => (
        <div
          key={index}
          className="w-full lg:w-[70%] mt-8 sm:mt-10 lg:mt-0 px-0 lg:pl-10 overflow-hidden"
        >
          <img
            src={img}
            alt="Architecture Studio"
            className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] object-cover object-center"
          />
        </div>
      ))}
    </div>
  );
}

export default H2;
