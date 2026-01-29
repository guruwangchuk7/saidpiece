import React from "react";
import { VisibilityProvider } from "./components/popupNavbar/VisiblityContext";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroNavbar from "./components/popupNavbar/HeroNavbar";
import ToggleNavbarBtn from "./components/popupNavbar/ToggleNavbarBtn";

import AuthModal from "./components/AuthModal";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/contact') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <AuthModal />
      <ScrollToTop />
      <div className="absolute top-0 z-30">
        <VisibilityProvider>
          <HeroNavbar></HeroNavbar>
          <ToggleNavbarBtn></ToggleNavbarBtn>
        </VisibilityProvider>
      </div>
      <div className="sticky top-0 z-20 bg-white shrink-0">
        <Navbar></Navbar>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
