import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { IoIosArrowUp } from 'react-icons/io';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const BackToTop = () => {
    const buttonRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Threshold: Hidden at y=0, Visible after 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useGSAP(() => {
        if (isVisible) {
            gsap.to(buttonRef.current, {
                y: 0,
                opacity: 1,
                duration: 2.2,      // Significantly slower for an elegant reveal
                ease: "power3.out", // Gentler start than power4
                pointerEvents: "auto",
                display: "flex"
            });
        } else {
            gsap.to(buttonRef.current, {
                y: 80,
                opacity: 0,
                duration: 2.2, // Exactly the same as entrance for a consistent slow motion
                ease: "power3.out", // Matching the smooth "slide-away" feel
                pointerEvents: "none"
            });
        }
    }, [isVisible]);

    const scrollToTop = () => {
        // Simple, standard smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            ref={buttonRef}
            onClick={scrollToTop}
            aria-label="Back to Top"
            className="fixed bottom-16 right-6 md:bottom-10 md:right-10 z-50 
                 w-10 h-10 md:w-12 md:h-12 
                 bg-[#F3F4F6] text-zinc-500 
                 rounded-full shadow-[0_8px_20px_-5px_rgba(0,0,0,0.1)] 
                 flex items-center justify-center 
                 cursor-pointer
                 hover:bg-zinc-200 hover:text-zinc-900 transition-colors duration-300
                 hover:scale-105 active:scale-95
                 group overflow-hidden border border-zinc-200/50"
            style={{ opacity: 0, transform: 'translateY(80px)' }}
        >
            {/* Inner background glow on hover */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full" />

            <IoIosArrowUp className="text-lg md:text-xl transition-transform duration-500 group-hover:-translate-y-1 relative z-10" />
        </button>
    );
};

export default BackToTop;
