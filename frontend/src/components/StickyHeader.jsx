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

const ensureOpaqueColor = (value, fallback = '#050505') => {
  if (typeof value !== 'string') return fallback;
  const color = value.trim();
  if (!color) return fallback;

  const rgbaMatch = color.match(
    /^rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)(?:\s*,\s*([0-9.]+)\s*)?\)$/i,
  );
  if (rgbaMatch) {
    const [_, r, g, b] = rgbaMatch;
    const clampChannel = (channel) => {
      const numeric = Number.parseFloat(channel);
      if (Number.isNaN(numeric)) return 0;
      return Math.max(0, Math.min(255, Math.round(numeric)));
    };
    return `rgba(${clampChannel(r)}, ${clampChannel(g)}, ${clampChannel(b)}, 1)`;
  }

  const hexAlphaMatch = color.match(/^#([0-9a-f]{4}|[0-9a-f]{8})$/i);
  if (hexAlphaMatch) {
    const hexValue = hexAlphaMatch[1];
    if (hexValue.length === 4) {
      const expanded = hexValue
        .split('')
        .map((char) => char + char)
        .join('');
      return `#${expanded.slice(0, 6)}`;
    }
    return `#${hexValue.slice(0, 6)}`;
  }

  return color;
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
  const headerBackground = ensureOpaqueColor(bg);
  const softBorder = 'rgba(255,255,255,0.15)';
  const preferDarkLogo = isLightHexColor(text);
  const logoSrc = preferDarkLogo ? '/images/personal/darklogo.svg' : '/images/personal/michaellogo.svg';
  const contactTextColor = isLightHexColor(accent) ? '#050505' : '#fff';
  const isDesktopViewport = typeof window !== 'undefined' ? window.innerWidth >= DESKTOP_BREAKPOINT : false;
  const isMobileOrTablet = !isDesktopViewport;

  const baseButtonClass =
    'rounded-full font-accent uppercase transition-colors duration-200';
  const navButtonClass = `${baseButtonClass} tracking-[0.2em] md:tracking-[0.24em] xl:tracking-[0.3em] px-3.5 py-2 text-sm md:px-4 md:py-2.5 md:text-base desktop:text-lg xl:text-[1.35rem] xl:px-5 whitespace-nowrap`;
  const ctaButtonClass = `${baseButtonClass} tracking-[0.3em] px-5 py-[0.75rem] text-sm sm:px-6 sm:py-[0.9rem] sm:text-base md:text-lg desktop:text-xl`;
  const navText = theme?.sections?.about?.palette?.muted || theme?.sections?.about?.text || '#0B0B0B';
  const normalizedPath =
    typeof window !== 'undefined'
      ? (window.location.pathname.replace(/\/+$/, '') || '/')
      : '/';
  const navLeftOffset = 'clamp(0.35rem, 0.15rem + 0.45vw, 1.5rem)';
  const navDynamicStyle = {
    gap: isDesktopViewport
      ? 'clamp(0.55rem, 0.35rem + 0.5vw, 1.6rem)'
      : 'clamp(0.3rem, 0.2rem + 0.35vw, 0.9rem)',
  };
  const navLinkDynamicStyle = {
    paddingInline: isMobileOrTablet
      ? 'clamp(1.65rem, 1.25rem + 1vw, 2.5rem)'
      : 'clamp(1.1rem, 0.85rem + 0.45vw, 1.65rem)',
    paddingInlineStart: isMobileOrTablet ? 'clamp(3.1rem, 2.45rem + 1.35vw, 4.1rem)' : undefined,
    paddingBlock: isMobileOrTablet
      ? 'clamp(1.1rem, 0.85rem + 0.55vw, 1.55rem)'
      : 'clamp(0.68rem, 0.55rem + 0.22vw, 1rem)',
    fontSize: isMobileOrTablet
      ? 'clamp(1.15rem, 0.95rem + 0.6vw, 1.5rem)'
      : 'clamp(1rem, 0.85rem + 0.5vw, 1.4rem)',
    letterSpacing: 'clamp(0.24em, 0.2em + 0.16vw, 0.38em)',
  };
  const navInlinePadding = isDesktopViewport && !menuOpen ? navLeftOffset : 0;
  const navPanelBackground = headerBackground;
  const navPanelPaddingBlock = menuOpen && isMobileOrTablet ? 'clamp(1rem, 0.8rem + 0.9vw, 2.2rem)' : 0;
  const navPanelStyle = {
    ...navDynamicStyle,
    borderColor: menuOpen ? softBorder : 'transparent',
    paddingInlineStart: navInlinePadding,
    paddingBlock: navPanelPaddingBlock,
    backgroundColor: navPanelBackground,
    backdropFilter: isMobileOrTablet ? 'none' : undefined,
    color: text,
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

  useEffect(() => {
    if (!menuOpen || typeof window === 'undefined') return undefined;
    window.dispatchEvent(new Event('theme-control-close'));
    return undefined;
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
    ? 'max-h-[80vh] opacity-100 translate-y-0 pointer-events-auto'
    : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none';
  const shouldShowBackdrop = menuOpen && isMobileOrTablet;

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    window.dispatchEvent(
      new CustomEvent('theme-control-availability', { detail: { disabled: shouldShowBackdrop } }),
    );
    return undefined;
  }, [shouldShowBackdrop]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-40 w-full transition-all duration-300 ${
          visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-6 pointer-events-none'
        }`}
      >
        <div
          className="relative flex flex-col gap-5 border px-6 pb-[1.1rem] pt-[2.35rem] shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl desktop:grid desktop:grid-cols-[1fr_auto_1fr] desktop:items-center desktop:px-8 desktop:py-[1.375rem]"
          style={{ background: headerBackground, color: text, borderColor: softBorder, borderRadius: 0 }}
        >
          <div className="order-1 flex min-h-[4.4rem] w-full items-center justify-between gap-3 desktop:order-2 desktop:col-start-2 desktop:flex desktop:w-full desktop:items-center desktop:justify-center">
          <Link to="/" onClick={handleNavClick} className="flex h-full items-center justify-start">
            <img
              src={logoSrc}
              alt="Michael Hanna logo"
              className="block h-[3.9rem] w-auto object-contain transform -translate-y-[0.25rem] phone:-translate-y-[0.35rem] tablet:-translate-y-[0.4rem] desktop:translate-y-0"
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
          className={`order-3 absolute right-0 top-full z-40 mt-0 flex w-[50vw] max-w-[480px] min-w-[220px] flex-col items-stretch justify-start gap-3 self-end rounded-[2.5rem] rounded-tl-none rounded-tr-none rounded-br-none border border-transparent px-4 text-left transition-all duration-300 ease-out overflow-hidden phone:w-[50vw] phone:px-5 tablet:w-[50vw] tablet:px-6 ${mobileNavStateClasses} desktop:static desktop:z-auto desktop:mt-0 desktop:order-1 desktop:col-start-1 desktop:col-end-2 desktop:ml-0 desktop:self-auto desktop:w-full desktop:flex desktop:flex-1 desktop:max-w-none desktop:flex-row desktop:flex-nowrap desktop:items-center desktop:justify-start desktop:gap-2 xl:gap-3 2xl:gap-4 desktop:border-none desktop:px-0 desktop:text-center desktop:pt-0 desktop:max-h-none desktop:opacity-100 desktop:translate-y-0 desktop:pointer-events-auto desktop:min-w-0 desktop:overflow-visible`}
          style={navPanelStyle}
        >
          {navLinks.map((link) => {
            const active = link.isActive(normalizedPath);
            const hasChildren = Array.isArray(link.children) && link.children.length > 0;
            const dropdownOpen = hasChildren && activeDropdown === link.href;
            return (
              <div
                key={link.href}
                className={`w-full self-stretch desktop:w-auto desktop:self-auto ${hasChildren ? 'desktop:relative desktop:group' : ''}`}
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
                <div className="flex w-full justify-start">
                  <Link
                    to={link.href}
                    className={`${navButtonClass} w-full text-left rounded-3xl border border-transparent px-5 py-3 desktop:w-auto desktop:max-w-none desktop:rounded-full desktop:border-none desktop:bg-transparent desktop:px-0 desktop:py-0 desktop:text-center desktop:shadow-none`}
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
                    <div className="mt-1 flex w-full justify-start pl-8 phone:pl-10 tablet:pl-12 desktop:hidden">
                      <div className="flex w-full flex-col gap-2 text-left">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="rounded-2xl border border-white/10 px-6 py-3 font-accent text-[0.95rem] uppercase tracking-[0.3em] transition-colors duration-200"
                            style={{ color: navText, opacity: 0.9, textAlign: 'left', paddingLeft: '2.75rem' }}
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
                      style={{
                        background: headerBackground,
                        borderColor: softBorder,
                        color: navText,
                        zIndex: 60,
                        marginTop: '2px',
                        paddingLeft: '1.75rem',
                        paddingRight: '1.75rem',
                      }}
                      onMouseEnter={() => handleDropdownEnter(link.href)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="rounded-2xl px-5 py-2.5 text-left text-base font-accent uppercase tracking-[0.28em] text-current transition-colors duration-200"
                          style={{ color: navText, paddingLeft: '2.25rem' }}
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
            className={`${ctaButtonClass} inline-flex items-center justify-center text-center desktop:hidden self-center mt-5`}
            style={{
              background: accent,
              color: contactTextColor,
              border: `1px solid ${accent}`,
              width: '80%',
              maxWidth: '420px',
            }}
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
      {shouldShowBackdrop && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-30 block h-full w-full bg-black/70 desktop:hidden"
          onClick={handleNavClick}
        />
      )}
    </>
  );
}
