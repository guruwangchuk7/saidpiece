import React from "react";
import { VisibilityProvider } from "./components/popupNavbar/VisiblityContext";
import { Outlet } from "react-router";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroNavbar from "./components/popupNavbar/HeroNavbar";
import ToggleNavbarBtn from "./components/popupNavbar/ToggleNavbarBtn";

function App() {
  return (
    <div className="relative">
      <ScrollToTop />
      <div className="absolute top-0">
        <VisibilityProvider>
          <HeroNavbar></HeroNavbar>
          <ToggleNavbarBtn></ToggleNavbarBtn>
        </VisibilityProvider>
      </div>
      <div className="sticky top-0 z-20 bg-white">
        <Navbar></Navbar>
      </div>
      <div>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
