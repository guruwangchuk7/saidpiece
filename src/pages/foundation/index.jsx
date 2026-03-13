import { motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavLink } from 'react-router-dom';
import rightArrow from '../../assets/icons/rightArrow.svg';
import H5 from '../home/H5';
import Footer from '../../components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

import aboutDzong from '../../assets/aboutusphoto/aboutdzong.webp';
import bkfHero from '../../assets/bhutankidneyfoundation/bhutanphoto.webp';
import bkfLogo from '../../assets/bhutankidneyfoundation/logo-web.webp';
import bkfCta from '../../assets/bhutankidneyfoundation/Page-banner-02.webp';
import ButtonType1 from '../../components/common/ButtonType1';

const pageData = {
    hero: {
        title: "SAIDPIECE FOUNDATION",
        subtitle: "Building communities, together.",
        image: bkfHero
    },
    mission: {
        title: "Our Mission",
        description: "The Saidpiece Foundation is our commitment to giving back to society. As part of our core values, we dedicate a portion of our monthly revenue, funded by our studio and driven by our people, to support community organizations and activities that make a meaningful difference. At Saidpiece, we’re dedicated to helping the communities where we live and work.",
        stats: [
            { label: "Focus areas", value: "Health & Community" },
            { label: "Funding", value: "Employee-driven" },
            { label: "Current Partner", value: "Bhutan Kidney Foundation" }
        ]
    },
    partner: {
        title: "Bhutan Kidney Foundation",
        description: "Currently, our primary focus is supporting the Bhutan Kidney Foundation (BKF), a Civil Society Organization functioning as an instrumental support group for the well-being of Bhutanese kidney patients. BKF is dedicated to reducing the incidence of kidney disease and improving access to timely services.",
        link: "https://bkfbhutan.org/"
    },
    initiatives: [
        {
            number: "01",
            title: "Financial Contribution",
            desc: "Providing continuous monthly financial donations to assist patients."
        },
        {
            number: "02",
            title: "Awareness & Education",
            desc: "Helping reduce chronic kidney disease by spreading knowledge."
        },
        {
            number: "03",
            title: "Improving Quality of Life",
            desc: "Empowering patients to lead socially and economically productive lives."
        }
    ]
};

function Foundation() {
    const mainRef = useRef(null);
    const heroImageRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const context = gsap.context(() => {
            if (prefersReducedMotion) {
                gsap.set("[data-animate]", { opacity: 1, y: 0 });
                return;
            }

            // Hero animations
            gsap.from("[data-animate='hero-title']", {
                opacity: 0,
                y: 40,
                duration: 1.5,
                ease: 'power3.out',
                delay: 0.3,
            });

            gsap.to(heroImageRef.current, {
                scale: 1.3,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });

            // Scroll animations for sections
            const sections = gsap.utils.toArray(".reveal-section");
            sections.forEach(section => {
                const elements = section.querySelectorAll("[data-animate]");
                gsap.from(elements, {
                    opacity: 0,
                    y: 40,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            });

            setTimeout(() => ScrollTrigger.refresh(), 100);
        }, mainRef);

        return () => context.revert();
    }, []);

    return (
        <main ref={mainRef} className="relative w-full flex flex-col bg-white antialiased text-zinc-900" style={{ fontFamily: "century-gothic" }}>
            {/* Back Link */}
            <div className="absolute top-6 sm:top-10 left-3 sm:left-5 lg:left-10 z-20">
                <NavLink to="/" className="flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline text-white">
                    <img src={rightArrow} alt="back" className="w-4 h-4 rotate-180 invert" />
                    <span>Back to home</span>
                </NavLink>
            </div>

            {/* === HERO SECTION === */}
            <header
                className="hero-section relative w-full h-screen overflow-hidden flex flex-col justify-center items-center text-white text-center"
            >
                <div
                    ref={heroImageRef}
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${pageData.hero.image})` }}
                />
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div data-animate="hero-title" className="relative z-20 px-5 -mt-40">
                    <div className="logo font-bold text-2xl sm:text-3xl md:text-5xl lg:text-7xl" style={{ fontFamily: "century-gothic" }}>
                        <span style={{ color: "#ffffff", opacity: 0.8 }} className="font-light">said</span><span style={{ color: "#ffffff", opacity: 0.95 }}>piece</span> <span className="font-light ml-4" style={{ color: "#ffffff", opacity: 0.8 }}>foundation</span>
                    </div>
                </div>

                <motion.div
                    className="absolute bottom-32 flex flex-col items-center gap-3 cursor-pointer z-20"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    style={{ fontFamily: "century-gothic" }}
                    onClick={() => {
                        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <img src={rightArrow} alt="Scroll down" className="w-5 rotate-90 opacity-70 invert mix-blend-difference" />
                    <span className="text-sm font-light border-b border-white pb-1 mix-blend-difference">scroll down</span>
                </motion.div>
            </header>

            {/* Main Content Info Grid */}
            <section className="reveal-section px-3 sm:px-5 lg:px-10 py-20 border-t border-zinc-200">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
                    {/* Metadata Column - LEFT */}
                    <div className="md:col-span-4 lg:col-span-3 space-y-10">
                        <div className="space-y-8">
                            <div data-animate>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Focus areas</h3>
                                <p className="text-lg">Health & Community</p>
                            </div>
                            <div data-animate>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Funding</h3>
                                <p className="text-lg">Employee-driven</p>
                            </div>
                            <div data-animate>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Current Partner</h3>
                                <p className="text-lg">Bhutan Kidney Foundation</p>
                            </div>
                            <div data-animate className="pt-8 border-t border-zinc-100">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">Our Focus</h3>
                                <img src={bkfLogo} alt="Bhutan Kidney Foundation Logo" className="h-12 object-contain mb-6 mix-blend-multiply" />
                                <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                                    {pageData.partner.description}
                                </p>
                                <div className="">
                                    <a href={pageData.partner.link} target="_blank" rel="noreferrer" className="block w-fit">
                                        <ButtonType1
                                            title={'VISIT BKF WEBSITE'}
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description Column - RIGHT */}
                    <div className="md:col-span-8 lg:col-span-9">
                        <div className="mb-20">
                            <h3 data-animate className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">{pageData.mission.title}</h3>
                            <h2 data-animate className="text-lg md:text-xl lg:text-2xl leading-tight font-light text-zinc-900 mb-10 max-w-4xl">
                                {pageData.mission.description}
                            </h2>
                        </div>

                        <div>
                            <h3 data-animate className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-8 pb-4 border-b border-zinc-200">How we help</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                                {pageData.initiatives.map((item, idx) => (
                                    <div key={idx} data-animate className="flex flex-col">
                                        <span className="text-3xl font-light text-zinc-300 mb-4 font-mono">{item.number}</span>
                                        <h4 className="text-base font-semibold text-zinc-900 mb-3">{item.title}</h4>
                                        <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA DONATE */}
            <section className="reveal-section group/cta relative w-full h-[50vh] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={bkfCta}
                        alt="Donate"
                        className="w-full h-full object-cover opacity-90 transition-transform duration-1000 ease-out group-hover/cta:scale-105"
                    />
                    <div className="absolute inset-0 bg-neutral-900/60"></div>
                </div>

                <div className="relative z-10 text-center flex flex-col items-center px-4">
                    <h2 data-animate className="text-3xl md:text-5xl font-light text-white mb-6 tracking-wide drop-shadow-md">
                        Join us in making a difference.
                    </h2>
                    <a
                        data-animate
                        href="https://bkfbhutan.org/donation/"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 px-10 py-4 bg-white text-black text-sm uppercase tracking-widest font-semibold hover:bg-zinc-200 transition-colors"
                    >
                        Donate to BKF
                    </a>
                </div>
            </section>

            <H5 />
            <Footer />
        </main>
    );
}

export default Foundation;
