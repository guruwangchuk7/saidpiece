import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MagneticCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;
            gsap.to(cursor, { x: clientX, y: clientY, duration: 0.1, ease: 'none' });
        };

        const onMouseEnter = () => gsap.to(cursor, { opacity: 0.7, duration: 0.3 });
        const onMouseLeave = () => gsap.to(cursor, { opacity: 0, duration: 0.3 });

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseenter', onMouseEnter);
        document.addEventListener('mouseleave', onMouseLeave);

        const handleHover = (e) => {
            const target = e.target.closest('[data-magnetic]');
            if (target) {
                gsap.to(cursor, { scale: 1.5, duration: 0.3 });
            }
        };

        const handleLeave = (e) => {
            const target = e.target.closest('[data-magnetic]');
            if (target) {
                gsap.to(cursor, { scale: 1, duration: 0.3 });
            }
        };

        document.addEventListener('mouseover', handleHover);
        document.addEventListener('mouseout', handleLeave);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseenter', onMouseEnter);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseover', handleHover);
            document.removeEventListener('mouseout', handleLeave);
        };
    }, []);

    return (
        <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-zinc-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-0 hidden md:block" />
    );
};

export default MagneticCursor;
