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
      onClick={() => {
        console.log('Menu toggle button clicked');
        toggle();
      }}
      className={`fixed top-[.5%] right-[2%] z-40 cursor-pointer text-xl transition-opacity duration-500 ease-in-out ${open ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
    >
      <img src={ham} alt="" />
    </div>,
    container
  );
};

export default ToggleNavbarBtn;