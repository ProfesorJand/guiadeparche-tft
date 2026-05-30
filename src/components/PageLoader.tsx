import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    let progressInterval: number;

    const handleStart = () => {
      setLoading(true);
      setOpacity(1);
      setWidth(0);
      
      // Simulate progress up to 90%
      let currentWidth = 0;
      if (progressInterval) clearInterval(progressInterval);
      progressInterval = window.setInterval(() => {
        currentWidth += Math.random() * 15;
        if (currentWidth >= 90) {
          currentWidth = 90;
          clearInterval(progressInterval);
        }
        setWidth(currentWidth);
      }, 150);
    };

    const handleEnd = () => {
      if (progressInterval) clearInterval(progressInterval);
      
      // Rapidly finish progress to 100%
      setWidth(100);
      
      // Fade out and reset after transition
      const fadeTimeout = setTimeout(() => {
        setOpacity(0);
        const resetTimeout = setTimeout(() => {
          setLoading(false);
          setWidth(0);
        }, 300); // Matches opacity transition duration
      }, 200); // Let user see the 100% complete state for a brief moment
    };

    // Listen for Astro transitions events
    window.addEventListener('astro:before-preparation', handleStart);
    window.addEventListener('astro:page-load', handleEnd);

    return () => {
      window.removeEventListener('astro:before-preparation', handleStart);
      window.removeEventListener('astro:page-load', handleEnd);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, []);

  if (!loading) return null;

  return (
    <>
      <style>{`
        @keyframes gpPageLoaderShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${width}%`,
          height: '3px',
          background: 'linear-gradient(90deg, #7b61ff, #b534f5, #ffc832, #7b61ff)',
          backgroundSize: '200% auto',
          animation: 'gpPageLoaderShimmer 2s infinite linear',
          zIndex: 99999,
          opacity: opacity,
          transition: 'width 0.3s ease-out, opacity 0.3s ease-in-out',
          boxShadow: '0 0 10px rgba(123, 97, 255, 0.7), 0 0 5px rgba(255, 200, 50, 0.5)',
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
