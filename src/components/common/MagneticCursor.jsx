import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MagneticCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;
            gsap.to(cursor, { x: clientX, y: clientY, duration: 0.1, ease: 'none' });
            gsap.to(follower, { x: clientX, y: clientY, duration: 0.6, ease: 'power3.out' });
        };

        const onMouseEnter = () => gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
        const onMouseLeave = () => gsap.to([cursor, follower], { opacity: 0, duration: 0.3 });

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseenter', onMouseEnter);
        document.addEventListener('mouseleave', onMouseLeave);

        const handleHover = (e) => {
            const target = e.target.closest('[data-magnetic]');
            if (target) {
                const rect = target.getBoundingClientRect();
                gsap.to(follower, {
                    width: rect.width + 20,
                    height: rect.height + 20,
                    borderRadius: '4px',
                    duration: 0.4,
                    ease: 'power3.out',
                    backgroundColor: 'rgba(0,0,0,0.03)',
                    borderColor: 'rgba(0,0,0,0.1)'
                });
                gsap.to(cursor, { scale: 0, duration: 0.3 });
            }
        };

        const handleLeave = (e) => {
            const target = e.target.closest('[data-magnetic]');
            if (target) {
                gsap.to(follower, {
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    duration: 0.4,
                    ease: 'power3.out',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(0,0,0,0.2)'
                });
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
        <>
            <div ref={cursorRef} className="fixed top-0 left-0 w-1.5 h-1.5 bg-black rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-0 hidden md:block" />
            <div ref={followerRef} className="fixed top-0 left-0 w-10 h-10 border border-black/20 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-0 hidden md:block" />
        </>
    );
};

export default MagneticCursor;
