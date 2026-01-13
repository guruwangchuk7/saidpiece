import React from "react";
import ci1 from "../../assets/ci1.svg";
import BtnT1 from "../../components/ButtonType1";
import { NavLink } from 'react-router-dom'

function H2() {
  const data = {
    heading: "STUDIO OF ARCHITECTURE AND DESIGN",
    about:
      "SAIDPIECE Architects has completed projects across Bhutan and abroad, specializing in architectural design, urban planning, interior design, engineering, and construction consultancy. Guided by the principles of Gross National Happiness, we merge sustainability, creativity, and precision to deliver innovative and culturally authentic solutions.",
    publication:
      "Our work aspires to contribute to leading global and regional design platforms and journals, sharing Bhutan’s unique architectural vision with the world.",
    imgData: [ci1],
  };

  return (
    <div className="flex flex-col lg:flex-row mt-12 sm:mt-16 lg:mt-20 justify-between gap-8 lg:gap-0">
      <div className="w-full lg:w-1/3 px-4 sm:px-6 lg:px-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">{data.heading}</h1>
        <div className="pl-4 sm:pl-5 border-l-2 border-zinc-400 mt-6 sm:mt-8 lg:mt-10">
          <div className="aboutus">
            <p className="text-sm sm:text-base text-zinc-500">About us:</p>
            <p className="font-normal mt-2 text-sm sm:text-base lg:text-base leading-relaxed">{data.about}</p>
          </div>
          <div className="publication mt-6 sm:mt-8 lg:mt-10">
            <p className="text-sm sm:text-base text-zinc-500 mt-2">Publications:</p>
            <p className="text-sm sm:text-base lg:text-base leading-relaxed">{data.publication}</p>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 lg:mt-10">
          <NavLink to={'/about'}>
            <BtnT1 title={"MORE ABOUT THE STUDIO"} />
          </NavLink>
        </div>
      </div>
      {data.imgData.map((img, index) => (
        <div
          key={index}
          style={{
            background: `url(${img})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="h-[40vh] sm:h-[45vh] md:h-[50vh] w-full lg:w-[55%] xl:w-[60%] lg:h-[75vh] xl:h-[80vh] px-4 sm:px-6 lg:px-10"
        ></div>
      ))}
    </div>
  );
}

export default H2;
