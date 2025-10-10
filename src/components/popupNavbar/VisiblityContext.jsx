import { createContext, useContext, useState } from 'react';

const VisibilityContext = createContext();

export const VisibilityProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(o => !o);
  const close = () => setOpen(false);
  return (
    <VisibilityContext.Provider value={{ open, toggle, close }}>
      {children}
    </VisibilityContext.Provider>
  );
};

export const useNav = () => {
  const ctx = useContext(VisibilityContext);
  if (!ctx) throw new Error('useNav must be used inside VisibilityProvider');
  return ctx;
};