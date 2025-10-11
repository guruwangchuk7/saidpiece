import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNav } from './VisiblityContext';
import ham from '../../assets/icons/ham.svg'

const ToggleNavbarBtn = () => {
  const { toggle, open } = useNav(); 
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const container =
    mounted && typeof document !== 'undefined'
      ? document.getElementById('menu-switch')
      : null;

  if (!container) return null;

  return createPortal(
    <div
      onClick={toggle}
      className={`fixed top-[.5%] right-[2%] z-40 cursor-pointer text-xl ${
        open ? 'text-red-300' : 'text-green-300'
      }`}
    >
      <img src={ham} alt="" />
    </div>,
    container
  );
};

export default ToggleNavbarBtn;