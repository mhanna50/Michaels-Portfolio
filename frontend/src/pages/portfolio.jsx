import React, { useEffect } from 'react';
import PortfolioSection from '../components/HomeSections/PortfolioSection';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';

export default function PortfolioPage({ theme, mainTheme }) {
  useEffect(() => {
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

  const sectionTheme = theme?.sections?.portfolio;
  const heroPalette = sectionTheme?.palette || {};
  const heroStyle = sectionTheme
    ? {
        background: sectionTheme.bg,
        color: sectionTheme.text,
      }
    : undefined;
  const headingStyle = heroPalette.heading ? { color: heroPalette.heading } : undefined;
  const mutedStyle = heroPalette.muted ? { color: heroPalette.muted } : undefined;
  const accentStyle = heroPalette.accent ? { color: heroPalette.accent } : undefined;

  const focusAreas = ['Brand Sites', 'Product UI', 'QA Systems', 'Content Strategy'];

  return (
    <div className="min-h-screen" style={pageStyle}>
      <section className="relative overflow-hidden px-6 pt-32 pb-16" style={heroStyle}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_70%)]" />
        <div className="relative mx-auto max-w-5xl space-y-6">
          <p
            className="font-accent uppercase tracking-[0.4em] text-sm text-white/80"
            style={accentStyle}
          >
            Portfolio Library
          </p>
          <h1
            className="font-serifalt text-5xl md:text-6xl leading-tight"
            style={headingStyle}
          >
            Deep dives into the builds behind the highlight reel.
          </h1>
          <p className="font-serifalt text-lg max-w-3xl" style={mutedStyle}>
            Each project pairs strategy, systems thinking, and polish. Explore the extended case studies
            below to see how brand, UX, engineering, and QA decisions come together across different
            disciplines.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="mailto:michaelhanna50@gmail.com">
              <Button className="rounded-full px-8 py-4 text-sm font-accent uppercase tracking-[0.25em]">
                Start a Project
              </Button>
            </a>
            <a
              href="/#portfolio"
              className="rounded-full border border-white/30 px-8 py-4 text-sm font-accent uppercase tracking-[0.25em] text-white/80 transition-colors hover:border-white hover:text-white"
              style={accentStyle ? { borderColor: `${heroPalette.accent}55` } : undefined}
            >
              Back to Overview
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-accent uppercase tracking-[0.3em] text-white/80"
                style={mutedStyle}
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <PortfolioSection theme={theme} showDeepDive />
      <Footer theme={theme} mainTheme={mainTheme} />
    </div>
  );
}
