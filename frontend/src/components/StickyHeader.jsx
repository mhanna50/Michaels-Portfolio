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

const DESKTOP_BREAKPOINT = 1200;

export default function StickyHeader({ theme, forceVisible = false }) {
  const [visible, setVisible] = useState(forceVisible);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

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
      if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const accent = theme?.accent || '#436850';
  const brandActiveAccent = '#436850';
  const text = theme?.sections?.about?.text || '#F6F8F6';
  const bg = theme?.sections?.about?.palette?.card?.bg || 'rgba(8,8,8,0.85)';
  const softBorder = 'rgba(255,255,255,0.15)';
  const preferDarkLogo = isLightHexColor(text);
  const logoSrc = preferDarkLogo ? '/images/personal/darklogo.svg' : '/images/personal/michaellogo.svg';
  const contactTextColor = isLightHexColor(accent) ? '#050505' : '#fff';

  const baseButtonClass =
    'rounded-full font-accent uppercase transition-colors duration-200';
  const navButtonClass = `${baseButtonClass} tracking-[0.2em] md:tracking-[0.24em] xl:tracking-[0.3em] px-3.5 py-2 text-sm md:px-4 md:py-2.5 md:text-base desktop:text-lg xl:text-[1.35rem] xl:px-5 whitespace-nowrap`;
  const ctaButtonClass = `${baseButtonClass} tracking-[0.3em] px-6 py-[0.9rem] text-base sm:text-lg desktop:text-xl`;
  const navText = theme?.sections?.about?.palette?.muted || theme?.sections?.about?.text || '#0B0B0B';
  const normalizedPath =
    typeof window !== 'undefined'
      ? (window.location.pathname.replace(/\/+$/, '') || '/')
      : '/';
  const navLeftOffset = 'clamp(0.35rem, 0.15rem + 0.45vw, 1.5rem)';
  const navDynamicStyle = {
    gap: 'clamp(0.3rem, 0.2rem + 0.35vw, 0.9rem)',
  };
  const navLinkDynamicStyle = {
    fontSize: 'clamp(1rem, 0.85rem + 0.5vw, 1.4rem)',
    letterSpacing: 'clamp(0.24em, 0.2em + 0.16vw, 0.38em)',
    paddingInline: 'clamp(1.1rem, 0.85rem + 0.45vw, 1.65rem)',
    paddingBlock: 'clamp(0.68rem, 0.55rem + 0.22vw, 1rem)',
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
      isActive: (path) => path === '/services' || path.startsWith('/services/'),
      children: [
        { label: 'Web Design & Branding', href: '/services/web-design' },
        { label: 'Automations', href: '/services/automations' },
      ],
    },
    {
      label: 'Portfolio',
      href: '/portfolio',
      isActive: (path) => path === '/portfolio' || path.startsWith('/portfolio/'),
    },
    {
      label: 'Blog',
      href: '/blog',
      isActive: (path) => path === '/blog' || path.startsWith('/blog/'),
    },
  ];

  useEffect(() => {
    if (!menuOpen) return;
    setActiveDropdown(null);
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleNavClick = () => setMenuOpen(false);

  const handleDropdownEnter = (href) => {
    setActiveDropdown(href);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const mobileNavStateClasses = menuOpen
    ? 'max-h-[70vh] opacity-100 translate-y-0 pointer-events-auto pt-[1.1rem] border-t'
    : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none pt-0 border-t-0';

  return (
    <div
      className={`fixed top-0 left-0 z-40 w-full transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-6 pointer-events-none'
      }`}
    >
      <div
        className="flex flex-col gap-5 border px-6 pb-[1.1rem] pt-[2.35rem] shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl desktop:grid desktop:grid-cols-[1fr_auto_1fr] desktop:items-center desktop:px-8 desktop:py-[1.375rem]"
        style={{ background: bg, color: text, borderColor: softBorder, borderRadius: 0 }}
      >
        <div className="order-1 flex min-h-[4.4rem] w-full items-center justify-between gap-3 desktop:order-2 desktop:col-start-2 desktop:flex desktop:w-full desktop:items-center desktop:justify-center">
          <Link to="/" onClick={handleNavClick} className="flex items-center">
            <img
              src={logoSrc}
              alt="Michael Hanna logo"
              className="h-[4.25rem] w-auto object-contain self-center"
              loading="lazy"
            />
          </Link>
          <div className="flex items-center gap-2 desktop:hidden">
            <Link
              to="/contact"
              className={`${ctaButtonClass} inline-flex items-center justify-center shrink-0`}
              style={{ background: accent, color: contactTextColor, border: `1px solid ${accent}` }}
              onClick={handleNavClick}
            >
              Contact
            </Link>
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="sticky-header-nav"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-current transition-colors duration-200 shrink-0"
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
          className={`order-3 flex w-full flex-col items-center justify-center gap-3 text-center transition-all duration-300 ease-out overflow-hidden ${mobileNavStateClasses} desktop:order-1 desktop:col-start-1 desktop:col-end-2 desktop:flex desktop:w-full desktop:flex-1 desktop:max-w-none desktop:flex-row desktop:flex-nowrap desktop:items-center desktop:justify-start desktop:gap-1 xl:gap-2 2xl:gap-3 desktop:border-none desktop:pt-0 desktop:max-h-none desktop:opacity-100 desktop:translate-y-0 desktop:pointer-events-auto desktop:min-w-0 desktop:overflow-visible`}
          style={{ ...navDynamicStyle, borderColor: softBorder, paddingInlineStart: menuOpen ? 0 : navLeftOffset }}
        >
          {navLinks.map((link) => {
            const active = link.isActive(normalizedPath);
            const hasChildren = Array.isArray(link.children) && link.children.length > 0;
            const dropdownOpen = hasChildren && activeDropdown === link.href;
            return (
              <div
                key={link.href}
                className={`w-full max-w-[360px] self-center pl-28 desktop:w-auto desktop:max-w-none desktop:pl-0 ${hasChildren ? 'desktop:relative desktop:group' : ''}`}
                onMouseEnter={hasChildren ? () => handleDropdownEnter(link.href) : undefined}
                onMouseLeave={hasChildren ? handleDropdownLeave : undefined}
                onFocus={hasChildren ? () => handleDropdownEnter(link.href) : undefined}
                onBlur={
                  hasChildren
                    ? (event) => {
                        if (!event.currentTarget.contains(event.relatedTarget)) {
                          handleDropdownLeave();
                        }
                      }
                    : undefined
                }
                style={{ position: hasChildren ? 'relative' : undefined }}
              >
                <div className="flex w-full justify-center desktop:justify-start">
                  <Link
                    to={link.href}
                    className={`${navButtonClass} w-full max-w-[320px] text-left rounded-3xl border border-transparent px-5 py-3 desktop:w-auto desktop:max-w-none desktop:rounded-full desktop:border-none desktop:bg-transparent desktop:px-0 desktop:py-0 desktop:text-center desktop:shadow-none`}
                    style={{
                      ...navLinkDynamicStyle,
                      color: active ? (isLightHexColor(accent) ? brandActiveAccent : accent) : navText,
                      backgroundColor: 'transparent',
                    }}
                    onClick={handleNavClick}
                    onMouseEnter={hasChildren ? () => handleDropdownEnter(link.href) : undefined}
                    onFocus={hasChildren ? () => handleDropdownEnter(link.href) : undefined}
                  >
                    {link.label}
                  </Link>
                </div>
                {hasChildren && (
                  <>
                    <div className="mt-2 flex w-full justify-center pl-12 desktop:hidden">
                      <div className="flex w-full max-w-[320px] flex-col gap-2 text-left">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="rounded-2xl border border-white/10 px-4 py-2 font-accent text-[0.85rem] uppercase tracking-[0.3em] transition-colors duration-200"
                            style={{ color: navText, opacity: 0.85, textAlign: "left" }}
                            onMouseEnter={(event) => {
                              event.currentTarget.style.color = accent;
                            }}
                            onMouseLeave={(event) => {
                              event.currentTarget.style.color = navText;
                            }}
                            onClick={handleNavClick}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div
                      className={`pointer-events-none absolute left-0 top-full z-50 hidden min-w-[15rem] opacity-0 rounded-3xl border border-white/15 bg-[rgba(8,8,8,0.92)] p-4 text-left shadow-2xl transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 desktop:flex desktop:flex-col desktop:gap-1.5 ${
                        dropdownOpen ? 'pointer-events-auto translate-y-0 opacity-100' : ''
                      }`}
                      style={{ background: bg, borderColor: softBorder, color: navText, zIndex: 60, marginTop: '2px' }}
                      onMouseEnter={() => handleDropdownEnter(link.href)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="rounded-2xl px-4 py-2 text-left text-sm font-accent uppercase tracking-[0.28em] text-current transition-colors duration-200"
                          style={{ color: navText }}
                          onMouseEnter={(event) => {
                            event.currentTarget.style.color = accent;
                          }}
                          onMouseLeave={(event) => {
                            event.currentTarget.style.color = navText;
                          }}
                          onClick={handleNavClick}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
          <Link
            to="/contact"
            className={`${ctaButtonClass} inline-flex w-full items-center justify-center text-center desktop:hidden`}
            style={{ background: accent, color: contactTextColor, border: `1px solid ${accent}` }}
            onClick={handleNavClick}
          >
            Contact Me
          </Link>
        </nav>
        <div className="order-2 hidden w-full justify-center desktop:order-2 desktop:col-start-3 desktop:col-end-4 desktop:flex desktop:flex-1 desktop:justify-end">
          <Link
            to="/contact"
            className={ctaButtonClass}
            style={{ background: accent, color: contactTextColor, border: `1px solid ${accent}` }}
          >
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
}
