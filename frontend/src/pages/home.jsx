import React, { Suspense, useEffect, useState } from 'react';
import HeroSection from '../components/HomeSections/HeroSection';
import AboutSection from '../components/HomeSections/AboutSection';
import StickyHeader from '../components/StickyHeader';
import usePageMetadata from '../hooks/usePageMetadata';
import { SITE_URL, buildSiteGraph, DEFAULT_OG_IMAGE } from '@/data/siteMeta';

const HeroHighlightsSlider = React.lazy(() => import('../components/HeroHighlightsSlider'));
const PortfolioSection = React.lazy(() => import('../components/HomeSections/PortfolioSection'));
const CertificationsSection = React.lazy(() => import('../components/HomeSections/CertificationsSection'));
const OffersSection = React.lazy(() => import('../components/HomeSections/Offer'));
const FooterSection = React.lazy(() => import('../components/Footer'));

const SectionFallback = ({ label, minHeight = '220px' }) => (
  <div
    className="flex w-full items-center justify-center text-center text-xs uppercase tracking-[0.3em] text-white/60"
    style={{ minHeight }}
  >
    Loading {label}…
  </div>
);

export default function Home({ weather, theme, mainTheme }) {
  const [forceHeaderVisible, setForceHeaderVisible] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.innerWidth <= 1199;
  });

  usePageMetadata({
    title: 'Hanna Web Studio | Web Design & Automations',
    description:
      'Portfolio and studio of Michael Hanna, a web developer and automation specialist helping service businesses with modern websites and AI-powered workflows.',
    canonical: `${SITE_URL}/`,
    jsonLd: buildSiteGraph(),
    ogImage: DEFAULT_OG_IMAGE,
  });

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleResize = () => {
      setForceHeaderVisible(window.innerWidth <= 1199);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pageStyle = mainTheme?.page
    ? {
        background: mainTheme.page.bg,
        color: mainTheme.page.text,
      }
    : undefined;

  return (
    <div className="min-h-screen" style={pageStyle}>
      <StickyHeader theme={theme} forceVisible={forceHeaderVisible} />
      <HeroSection mainTheme={mainTheme} />
      <Suspense fallback={<SectionFallback label="Highlights" minHeight="140px" />}>
        <HeroHighlightsSlider heroTheme={mainTheme?.hero} />
      </Suspense>
      <AboutSection weather={weather} theme={theme} />
      <Suspense fallback={<SectionFallback label="Portfolio" minHeight="320px" />}>
        <PortfolioSection theme={theme} />
      </Suspense>
      <Suspense fallback={<SectionFallback label="Services" minHeight="260px" />}>
        <OffersSection theme={theme} />
      </Suspense>
      <Suspense fallback={<SectionFallback label="Certifications" minHeight="280px" />}>
        <CertificationsSection theme={theme} />
      </Suspense>
      <Suspense fallback={<SectionFallback label="Footer" minHeight="160px" />}>
        <FooterSection theme={theme} mainTheme={mainTheme} />
      </Suspense>
    </div>
  );
}
