import React from "react";
import { VisibilityProvider } from "./components/popupNavbar/VisiblityContext";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ScrollToTop from "./components/common/ScrollToTop";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroNavbar from "./components/popupNavbar/HeroNavbar";
import ToggleNavbarBtn from "./components/popupNavbar/ToggleNavbarBtn";
import BackToTop from "./components/common/BackToTop";
import MagneticCursor from "./components/common/MagneticCursor";

import AuthModal from "./components/features/auth/AuthModal";
import CartDrawer from "./pages/store/components/CartDrawer";

function App() {
  const location = useLocation();

  useEffect(() => {
    // Ensure body is scrollable on all pages
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [location.pathname]);

  // Check if current path is an admin or dashboard page
  const isAdminOrDashboard = location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard');

  return (
    <div className="relative min-h-screen flex flex-col">
      <AuthModal />
      <CartDrawer />
      {!isAdminOrDashboard && <MagneticCursor />}
      <ScrollToTop />
      <BackToTop />
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