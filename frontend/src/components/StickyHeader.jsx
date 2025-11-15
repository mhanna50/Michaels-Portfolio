import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const isLightHexColor = (value) => {
  if (typeof value !== 'string') return false;
  const sanitized = value.trim();
  if (!sanitized.startsWith('#')) return false;
  let hex = sanitized.slice(1);
  if (![3, 6].includes(hex.length) || /[^0-9a-f]/i.test(hex)) return false;
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  if ([r, g, b].some((channel) => Number.isNaN(channel))) return false;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.7;
};

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
  const contactTextColor = isLightHexColor(accent) ? '#050505' : '#fff';

  const baseButtonClass =
    'rounded-full font-accent uppercase transition-colors duration-200';
  const navButtonClass = `${baseButtonClass} tracking-[0.18em] md:tracking-[0.22em] xl:tracking-[0.28em] px-3.5 py-2 text-xs md:px-4 md:py-2.5 md:text-sm lg:text-base xl:text-lg xl:px-5 whitespace-nowrap`;
  const ctaButtonClass = `${baseButtonClass} tracking-[0.28em] px-6 py-3 text-sm sm:text-base lg:text-lg`;
  const navText = theme?.sections?.about?.palette?.muted || theme?.sections?.about?.text || '#0B0B0B';
  const normalizedPath =
    typeof window !== 'undefined'
      ? (window.location.pathname.replace(/\/+$/, '') || '/')
      : '/';
  const navDynamicStyle = {
    gap: 'clamp(0.45rem, 0.35rem + 0.5vw, 1.25rem)',
  };
  const navLinkDynamicStyle = {
    fontSize: 'clamp(0.9rem, 0.75rem + 0.4vw, 1.2rem)',
    letterSpacing: 'clamp(0.22em, 0.18em + 0.15vw, 0.34em)',
    paddingInline: 'clamp(0.95rem, 0.75rem + 0.45vw, 1.5rem)',
    paddingBlock: 'clamp(0.5rem, 0.42rem + 0.2vw, 0.85rem)',
  };

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

  const mobileNavStateClasses = menuOpen
    ? 'max-h-[70vh] opacity-100 translate-y-0 pointer-events-auto pt-4 border-t'
    : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none pt-0 border-t-0';

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
            <a
              href="mailto:michaelhanna50@gmail.com"
              className={`${ctaButtonClass} inline-flex`}
              style={{ background: accent, color: contactTextColor, border: `1px solid ${accent}` }}
            >
              Contact
            </a>
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="sticky-header-nav"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-current transition-colors duration-200"
              style={{ color: text, borderColor: softBorder }}
              onClick={toggleMenu}
            >
              <span className="relative block h-5 w-6">
                <span
                  className={`absolute left-0 block h-[2px] w-full rounded-full transition-all duration-300 ${
                    menuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                  }`}
                  style={{ backgroundColor: text }}
                />
                <span
                  className={`absolute left-0 block h-[2px] w-full rounded-full transition-all duration-300 top-1/2 -translate-y-1/2 ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                  style={{ backgroundColor: text }}
                />
                <span
                  className={`absolute left-0 block h-[2px] w-full rounded-full transition-all duration-300 ${
                    menuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                  }`}
                  style={{ backgroundColor: text }}
                />
              </span>
            </button>
          </div>
        </div>
        <nav
          id="sticky-header-nav"
          className={`order-3 flex w-full flex-col items-center gap-1 sm:gap-1.5 transition-all duration-300 ease-out overflow-hidden ${mobileNavStateClasses} lg:order-1 lg:col-start-1 lg:col-end-2 lg:flex lg:w-full lg:flex-1 lg:max-w-none lg:flex-row lg:flex-nowrap lg:items-center lg:justify-start lg:gap-2 xl:gap-4 2xl:gap-6 lg:border-none lg:pt-0 lg:max-h-none lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto lg:overflow-x-auto lg:overflow-y-visible`}
          style={{ ...navDynamicStyle, borderColor: softBorder }}
        >
          {navLinks.map((link) => {
            const active = link.isActive(normalizedPath);
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`${navButtonClass} w-full text-center lg:w-auto`}
                style={{
                  ...navLinkDynamicStyle,
                  color: active ? accent : navText,
                  backgroundColor: 'transparent',
                }}
                onClick={handleNavClick}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="mailto:michaelhanna50@gmail.com"
            className={`${ctaButtonClass} w-full text-center lg:hidden`}
            style={{ background: accent, color: contactTextColor, border: `1px solid ${accent}` }}
            onClick={handleNavClick}
          >
            Contact Me
          </a>
        </nav>
        <div className="order-2 hidden w-full justify-center lg:order-2 lg:col-start-3 lg:col-end-4 lg:flex lg:flex-1 lg:justify-end">
          <a
            href="mailto:michaelhanna50@gmail.com"
            className={ctaButtonClass}
            style={{ background: accent, color: contactTextColor, border: `1px solid ${accent}` }}
          >
            Contact Me
          </a>
        </div>
      </div>
    </div>
  );
}
