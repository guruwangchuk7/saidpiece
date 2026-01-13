import { div, img } from "motion/react-client";
import React from "react";
import Btn2 from "../../components/ButtonType2";
import p1 from "../../assets/p1.jpg";

function H4() {
  const portfolioData = {
    name: [
      "FUTAGO HOUSE",
      "UNDERGROUND HOUSE PLAN B",
      "CLOCK TOWER",
      "DUPLIX HOUSE",
    ],
    image: [p1, p1, p1, p1],
  };
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 mt-12 sm:mt-16 lg:mt-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-6 xl:gap-10">
        <div className="w-full lg:w-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">PORTFOLIO</h1>
          <div className="w-full lg:w-fit mt-6 sm:mt-8 lg:mt-10">
            {portfolioData.name.map((item, index) => (
              <div key={index}>
                <Btn2 title={item} idx={index + 1}></Btn2>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[45%] xl:w-[50%] h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[70vh] xl:h-[75vh] overflow-y-scroll">
          {portfolioData.image.map((item, index) => (
            <img key={index} src={item} alt="" className="w-full h-auto object-cover mt-4 sm:mt-5" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default H4;
