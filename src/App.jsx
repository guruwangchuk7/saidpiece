import React from "react";
import { VisibilityProvider } from "./components/popupNavbar/VisiblityContext";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ScrollToTop from "./components/common/ScrollToTop";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroNavbar from "./components/popupNavbar/HeroNavbar";
import ToggleNavbarBtn from "./components/popupNavbar/ToggleNavbarBtn";

import AuthModal from "./components/features/auth/AuthModal";

function App() {
  const location = useLocation();

  useEffect(() => {
    // Ensure body is scrollable on all pages
    document.body.style.overflow = 'auto';
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
        {!['/', '/about', '/team', '/portfolio', '/blog'].includes(location.pathname) && !/^\/blog\/[^/]+$/.test(location.pathname) && <Footer></Footer>}
      </div>
    </div>
  );
}

export default App;