import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      console.log("handleStart loading a true")
      setLoading(true)
    };
    const handleEnd = () =>{
      console.log("handleStart loading a false")
      setLoading(false)
    };

    window.addEventListener('astro:navigation:start', handleStart);
    window.addEventListener('astro:navigation:end', handleEnd);

    return () => {
      window.removeEventListener('astro:navigation:start', handleStart);
      window.removeEventListener('astro:navigation:end', handleEnd);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '5px',
        backgroundColor: 'red',
        zIndex: 9999,
      }}
    />
  );
}
