import React from 'react';
import rightArrow from '../assets/icons/rightArrow.svg';
import { useNavigate } from 'react-router-dom';

function ButtonType3({ title, to }) {
  const navigate = useNavigate();
  return (
    <button
      className="border-b flex justify-between items-center gap-10 py-5 mt-10 cursor-pointer duration-200 hover:gap-20 hover:font-semibold"
      onClick={() => navigate(to)}
    >
      {title}
      <span>
        <img src={rightArrow} alt="rightArrow" className="" />
      </span>
    </button>
  );
}

export default ButtonType3;