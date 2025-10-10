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
    <div className="px-10 mt-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-5xl">PORTFOLIO</h1>
          <div className="w-fit mt-10">
            {portfolioData.name.map((item, index) => (
              <div>
                <Btn2 title={item} idx={index + 1}></Btn2>
              </div>
            ))}
          </div>
        </div>

        <div className="h-195 overflow-y-scroll">
          {portfolioData.image.map((item, index) => (
            <img src={item} alt="" className="h-200 mt-5" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default H4;
