import React, { useEffect } from 'react';
import HeroSection from '../components/HomeSections/HeroSection';
import AboutSection from '../components/HomeSections/AboutSection';
import PortfolioSection from '../components/HomeSections/PortfolioSection';
import CertificationsSection from '../components/HomeSections/CertificationsSection';
import SkillsSection from '../components/HomeSections/SkillsSection';
import OffersSection from '../components/HomeSections/Offer';
import Footer from '../components/Footer';
import StickyHeader from '../components/StickyHeader';

export default function Home({ weather, theme, mainTheme }) {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const pageStyle = mainTheme?.page
    ? {
        background: mainTheme.page.bg,
        color: mainTheme.page.text,
      }
    : undefined;

  return (
    <div className="min-h-screen" style={pageStyle}>
      <StickyHeader theme={theme} />
      <HeroSection mainTheme={mainTheme} />
      <AboutSection weather={weather} theme={theme} />
      <PortfolioSection theme={theme} />
      <CertificationsSection theme={theme} />
      <OffersSection theme={theme} />
      <Footer theme={theme} mainTheme={mainTheme} />
    </div>
  );
}
