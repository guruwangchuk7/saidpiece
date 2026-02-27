import React, { useEffect } from 'react';
import Footer from '../../components/layout/Footer';

const Foundation = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white text-black text-center px-4">
            <h1 className="text-3xl md:text-5xl font-light tracking-[0.2em] uppercase mb-6" style={{ fontFamily: "century-gothic" }}>
                Foundation
            </h1>
            <p className="text-sm uppercase tracking-widest text-zinc-500">
                Information regarding Saidpiece Foundation will be updated here soon.
            </p>
        </div>
    );
};

export default Foundation;
