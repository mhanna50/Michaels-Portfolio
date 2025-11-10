import React, { useEffect, useState } from 'react';

export default function StickyHeader({ theme }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const hero = document.getElementById('hero');

    const handleScroll = () => {
      const heroHeight = hero?.offsetHeight || 600;
      setVisible(window.scrollY > heroHeight - 120);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const accent = theme?.accent || '#436850';
  const text = theme?.sections?.about?.text || '#F6F8F6';
  const bg = theme?.sections?.about?.palette?.card?.bg || 'rgba(8,8,8,0.85)';
  const softBorder = 'rgba(255,255,255,0.15)';

  const baseButtonClass =
    'rounded-full px-5 py-2 text-xs font-accent uppercase tracking-[0.28em] transition-colors duration-200';

  return (
    <div
      className={`fixed top-4 left-1/2 z-40 w-[min(92%,1040px)] -translate-x-1/2 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-6 pointer-events-none'
      }`}
    >
      <div
        className="flex flex-wrap items-center justify-between gap-4 rounded-full border px-6 py-3 shadow-2xl backdrop-blur-lg"
        style={{ background: bg, color: text, borderColor: softBorder }}
      >
        <span className="font-serifalt text-lg tracking-tight">Michael Hanna</span>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:michaelhanna50@gmail.com"
            className={`${baseButtonClass}`}
            style={{ background: accent, color: '#fff', border: `1px solid ${accent}` }}
          >
            Contact Me
          </a>
          <a
            href="/blog"
            className={`${baseButtonClass} border`}
            style={{ borderColor: softBorder, color: text }}
          >
            Blog
          </a>
          <a
            href="/portfolio"
            className={`${baseButtonClass} border`}
            style={{ borderColor: accent, color: text }}
          >
            Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
