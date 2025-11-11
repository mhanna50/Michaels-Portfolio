import React, { useEffect, useState } from 'react';

export default function StickyHeader({ theme, forceVisible = false }) {
  const [visible, setVisible] = useState(forceVisible);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (forceVisible) {
      setVisible(true);
      return undefined;
    }

    if (typeof window === 'undefined') return undefined;
    const hero = document.getElementById('hero');

    const handleScroll = () => {
      const heroHeight = hero?.offsetHeight || 600;
      setVisible(window.scrollY > heroHeight - 120);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [forceVisible]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const accent = theme?.accent || '#436850';
  const text = theme?.sections?.about?.text || '#F6F8F6';
  const bg = theme?.sections?.about?.palette?.card?.bg || 'rgba(8,8,8,0.85)';
  const softBorder = 'rgba(255,255,255,0.15)';
  const logoSrc = '/images/personal/michaellogo.svg';

  const baseButtonClass =
    'rounded-full px-7 py-3 font-accent uppercase tracking-[0.28em] transition-colors duration-200';
  const navButtonClass = `${baseButtonClass} text-sm sm:text-base lg:text-lg`;
  const ctaButtonClass = `${baseButtonClass} text-sm sm:text-base lg:text-lg`;
  const navText = theme?.sections?.about?.palette?.muted || theme?.sections?.about?.text || '#0B0B0B';
  const normalizedPath =
    typeof window !== 'undefined'
      ? (window.location.pathname.replace(/\/+$/, '') || '/')
      : '/';

  const navLinks = [
    {
      label: 'Home',
      href: '/',
      isActive: (path) => path === '/' || path === '',
    },
    {
      label: 'Services',
      href: '/services',
      isActive: (path) => path === '/services',
    },
    {
      label: 'Blog',
      href: '/blog',
      isActive: (path) => path === '/blog' || path.startsWith('/blog/'),
    },
    {
      label: 'Portfolio',
      href: '/portfolio',
      isActive: (path) => path === '/portfolio' || path.startsWith('/portfolio/'),
    },
  ];

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleNavClick = () => setMenuOpen(false);

  return (
    <div
      className={`fixed top-0 left-0 z-40 w-full transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-6 pointer-events-none'
      }`}
    >
      <div
        className="flex flex-col gap-5 border px-6 py-4 shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:px-8 lg:py-5"
        style={{ background: bg, color: text, borderColor: softBorder, borderRadius: 0 }}
      >
        <div className="order-1 flex w-full items-center justify-between gap-3 lg:order-2 lg:col-start-2 lg:flex lg:w-full lg:justify-center">
          <img
            src={logoSrc}
            alt="Michael Hanna logo"
            className="h-16 w-auto object-contain"
            loading="lazy"
          />
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              className="rounded-full border px-4 py-2 text-xs font-accent uppercase tracking-[0.2em]"
              style={{ borderColor: softBorder, color: text }}
              onClick={toggleMenu}
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
            <a
              href="mailto:michaelhanna50@gmail.com"
              className={`${ctaButtonClass} hidden sm:inline-flex`}
              style={{ background: accent, color: '#fff', border: `1px solid ${accent}` }}
            >
              Contact
            </a>
          </div>
        </div>
        <nav
          className={`order-3 flex w-full flex-col items-center gap-1 sm:gap-1.5 border-t pt-4 lg:order-1 lg:col-start-1 lg:col-end-2 lg:flex lg:w-full lg:flex-row lg:flex-1 lg:items-center lg:gap-2 lg:border-none lg:pt-0 ${
            menuOpen ? 'flex' : 'hidden'
          } lg:flex`}
        >
          {navLinks.map((link) => {
            const active = link.isActive(normalizedPath);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`${navButtonClass} w-full text-center lg:w-auto`}
                style={{
                  color: active ? accent : navText,
                  backgroundColor: 'transparent',
                }}
                onClick={handleNavClick}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="mailto:michaelhanna50@gmail.com"
            className={`${ctaButtonClass} w-full text-center lg:hidden`}
            style={{ background: accent, color: '#fff', border: `1px solid ${accent}` }}
            onClick={handleNavClick}
          >
            Contact Me
          </a>
        </nav>
        <div className="order-2 hidden w-full justify-center lg:order-2 lg:col-start-3 lg:col-end-4 lg:flex lg:flex-1 lg:justify-end">
          <a
            href="mailto:michaelhanna50@gmail.com"
            className={ctaButtonClass}
            style={{ background: accent, color: '#fff', border: `1px solid ${accent}` }}
          >
            Contact Me
          </a>
        </div>
      </div>
    </div>
  );
}
