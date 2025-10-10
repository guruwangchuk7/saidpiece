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
    <div className="flex mt-20 flex-wrap justify-between">
      <div className="lg:w-1/3 px-3 lg:px-10">
        <h1 className="text-5xl font-semibold">{data.heading}</h1>
        <div className="px-5 border-l-2 border-zinc-400 ">
          <div className="aboutus mt-10">
            <p className="text-zinc-500">About us:</p>
            <p className="font-normal mt-2">{data.about}</p>
          </div>
          <div className="publication mt-10">
            <p className="text-zinc-500 mt-2">Publications:</p>
            <p>{data.publication}</p>
          </div>
        </div>
        <NavLink to={'/about'}>
          <BtnT1 title={"MORE ABOUT THE STUDIO"} />
        </NavLink>
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
          className="h-[40vh] w-full lg:w-200 lg:h-[80vh] mt-10 lg:mt-0 px-3 lg:px-10"
        ></div>
      ))}
    </div>
  );
}

export default H2;
