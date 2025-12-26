import { useState, useEffect } from 'react';

const ScrollProgressIndicator = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const calculateScrollProgress = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement?.scrollHeight;
            const scrollTop = window.scrollY;
            const trackLength = documentHeight - windowHeight;
            const progress = (scrollTop / trackLength) * 100;
            setScrollProgress(Math.min(progress, 100));
        };

        const throttledScroll = () => {
            let ticking = false;
            return () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        calculateScrollProgress();
                        ticking = false;
                    });
                    ticking = true;
                }
            };
        };

        const scrollHandler = throttledScroll();
        window.addEventListener('scroll', scrollHandler);
        calculateScrollProgress();

        return () => window.removeEventListener('scroll', scrollHandler);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-[1000] h-1 bg-muted">
            <div
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-150 ease-out"
                style={{ width: `${scrollProgress}%` }}
            />
        </div>
    );
};

export default ScrollProgressIndicator;