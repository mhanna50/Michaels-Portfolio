import React, { useEffect, useRef } from 'react';

const hexToRgba = (hex, alpha) => {
  if (!hex || typeof hex !== 'string') return `rgba(0,0,0,${alpha})`;
  const normalized = hex.replace('#', '');
  if (normalized.length !== 6) return `rgba(0,0,0,${alpha})`;
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function PointerShadow({ accent = '#000000' }) {
  const shadowRef = useRef(null);

  useEffect(() => {
    const node = shadowRef.current;
    if (!node) return () => {};

    let frame;
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      const update = () => {
        if (!shadowRef.current) return;
        shadowRef.current.style.transform = `translate3d(${clientX - 80}px, ${clientY - 80}px, 0)`;
      };
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', handleMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 hidden lg:block">
      <div
        ref={shadowRef}
        className="pointer-shadow"
        style={{
          background: `radial-gradient(circle, ${hexToRgba(accent, 0.25)} 0%, rgba(0,0,0,0.05) 60%, transparent 80%)`,
          boxShadow: `0 25px 60px ${hexToRgba('#000000', 0.25)}`,
        }}
      />
    </div>
  );
}
