import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import StickyHeader from "../components/StickyHeader";
import { Button } from "@/components/ui/button";
import {
  portfolioCaseStudies,
  portfolioStats,
  clientLogos,
} from "@/data/portfolioContent";
import usePageMetadata from "@/hooks/usePageMetadata";

const headlineStats = [
  { value: "12+", label: "Projects" },
  { value: "8", label: "Industries" },
  { value: "3", label: "Countries" },
];

function WorkCard({ study, styles }) {
  const tags = [...(study.industry || []), ...(study.services || [])];
  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-3xl border shadow-xl"
      style={{ background: styles.cardBg, borderColor: styles.cardBorder }}
    >
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={study.coverImage}
          alt={study.coverImageAlt}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-5 py-4 text-sm text-white/90">
          <span className="font-semibold">{study.client}</span>
          <span>{study.year}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="space-y-2">
          <p className="text-xs font-accent uppercase tracking-[0.35em]" style={{ color: styles.labelColor }}>
            {study.heroSummary}
          </p>
          <h3 className="font-serifalt text-2xl" style={{ color: styles.headingColor }}>
            {study.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: styles.mutedColor }}>
            {study.summary}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={`${study.slug}-${tag}`}
              className="rounded-full border px-3 py-1 text-xs font-accent uppercase tracking-[0.25em]"
              style={{
                color: styles.labelColor,
                borderColor: styles.chipBorder,
                background: styles.chipBg,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between border-t pt-4" style={{ borderColor: styles.cardBorder }}>
          <p className="text-sm font-semibold" style={{ color: styles.headingColor }}>
            {study.outcome}
          </p>
          <a
            href={`/portfolio/${study.slug}`}
            className="inline-flex items-center rounded-full border px-4 py-2 text-xs font-accent uppercase tracking-[0.3em] transition hover:-translate-y-0.5"
            style={styles.linkStyle}
          >
            View Case Study
          </a>
        </div>
      </div>
    </article>
  );
}

export default function PortfolioPage({ theme, mainTheme }) {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const sectionTheme = theme?.sections?.portfolio;
  const palette = sectionTheme?.palette;

  const isNightTheme =
    theme?.page?.bg && mainTheme?.page?.bg ? theme.page.bg === mainTheme.page.bg : false;
  const getTone = (nightValue, dayValue) => (isNightTheme ? nightValue : dayValue);

  const pageStyle = mainTheme?.page
    ? { background: mainTheme.page.bg, color: mainTheme.page.text }
    : undefined;
  const heroStyle = sectionTheme ? { background: sectionTheme.bg, color: sectionTheme.text } : undefined;

  const headingStyle = { color: palette?.heading || getTone("#F6F8F6", "#111827") };
  const mutedStyle = {
    color: palette?.muted || getTone("rgba(246,248,246,0.78)", "#1f2937"),
  };
  const labelStyle = {
    color: palette?.muted || getTone("rgba(246,248,246,0.65)", "#475569"),
  };
  const dividerColor = {
    borderColor: palette?.divider || getTone("rgba(246,248,246,0.2)", "rgba(15,23,42,0.12)"),
  };

  const buttonPalette = palette?.button;
  const buttonBg = buttonPalette?.bg || palette?.accent || "#111827";
  const buttonText = buttonPalette?.text || (isNightTheme ? "#F6F8F6" : "#0b0f19");
  const primaryButtonStyle = {
    backgroundColor: buttonBg,
    color: buttonText,
    borderColor: buttonBg,
    transition: "background-color 200ms ease, color 200ms ease",
  };
  const secondaryButtonStyle = {
    backgroundColor: getTone("rgba(246,248,246,0.12)", "rgba(15,23,42,0.08)"),
    color: headingStyle.color,
    borderColor: getTone("rgba(246,248,246,0.35)", "rgba(15,23,42,0.2)"),
  };

  const workCardStyles = {
    headingColor: headingStyle.color,
    mutedColor: mutedStyle.color,
    labelColor: labelStyle.color,
    cardBg: getTone("rgba(246,248,246,0.04)", "rgba(15,23,42,0.03)"),
    cardBorder: getTone("rgba(246,248,246,0.18)", "rgba(15,23,42,0.12)"),
    chipBg: getTone("rgba(246,248,246,0.08)", "rgba(15,23,42,0.08)"),
    chipBorder: getTone("rgba(246,248,246,0.3)", "rgba(15,23,42,0.15)"),
    linkStyle: {
      borderColor: getTone("rgba(246,248,246,0.35)", "rgba(15,23,42,0.2)"),
      color: headingStyle.color,
    },
  };

  const canonical = origin ? `${origin}/portfolio` : undefined;
  const collectionJsonLd =
    origin && portfolioCaseStudies.length
      ? {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Portfolio | Michael Hanna",
          description: "Case studies in web design, development, and automation delivering measurable outcomes.",
          url: canonical,
          hasPart: portfolioCaseStudies.map((study) => ({
            "@type": "CreativeWork",
            name: study.title,
            url: `${origin}/portfolio/${study.slug}`,
            about: study.industry,
            datePublished: study.year,
          })),
        }
      : null;

  usePageMetadata({
    title: "Portfolio | Michael Hanna",
    description: "Case studies in web design, development, and automation delivering measurable outcomes.",
    canonical,
    jsonLd: collectionJsonLd,
  });

  return (
    <div className="min-h-screen" style={pageStyle}>
      <StickyHeader theme={theme} forceVisible />

      <section className="relative overflow-hidden px-6 pt-28 pb-16 lg:pt-36" style={heroStyle}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_65%)]" />
        <div className="relative mx-auto flex max-w-5xl flex-col gap-8 text-left">
          <p className="font-accent text-xs uppercase tracking-[0.45em]" style={labelStyle}>
            Selected Work
          </p>
          <h1 className="font-serifalt text-5xl leading-tight md:text-6xl" style={headingStyle}>
            Design, development, and automation that drive measurable growth.
          </h1>
          <p className="text-lg leading-relaxed" style={mutedStyle}>
            Real engagements that pair brand, product, and ops work—every case study includes the
            problem, the systems behind the solution, and the numbers that proved it out.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:michaelhanna50@gmail.com?subject=Start%20a%20Project">
              <Button
                className="rounded-full px-8 py-4 text-sm font-accent uppercase tracking-[0.3em]"
                style={primaryButtonStyle}
              >
                Book a Discovery Call
              </Button>
            </a>
            <a
              href="/services"
              className="rounded-full border px-8 py-4 text-sm font-accent uppercase tracking-[0.3em] transition"
              style={secondaryButtonStyle}
            >
              See Services
            </a>
          </div>
          <div className="mt-6">
            <p className="text-xs font-accent uppercase tracking-[0.4em]" style={labelStyle}>
              Trusted by
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {clientLogos.map((client) => (
                <div
                  key={client.name}
                  className="flex items-center justify-center rounded-2xl border px-4 py-3 text-sm font-semibold"
                  style={{
                    borderColor: dividerColor.borderColor,
                    color: headingStyle.color,
                    background: getTone("rgba(246,248,246,0.06)", "rgba(15,23,42,0.04)"),
                  }}
                >
                  {client.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:py-24" style={heroStyle}>
        <div className="mx-auto max-w-6xl space-y-10">
          <div>
            <p className="font-accent text-xs uppercase tracking-[0.45em]" style={labelStyle}>
              Work gallery
            </p>
            <h2 className="mt-3 font-serifalt text-4xl leading-tight md:text-5xl" style={headingStyle}>
              Systems-first builds across design, dev, and automation.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {portfolioCaseStudies.map((study) => (
              <WorkCard key={study.slug} study={study} styles={workCardStyles} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24" style={heroStyle}>
        <div className="mx-auto max-w-6xl space-y-10 rounded-3xl border px-6 py-10 md:px-10" style={dividerColor}>
          <div className="space-y-3 text-center">
            <p className="font-accent text-xs uppercase tracking-[0.45em]" style={labelStyle}>
              Highlights
            </p>
            <h2 className="font-serifalt text-4xl leading-tight" style={headingStyle}>
              12+ Projects · 8 Industries · 3 Countries
            </h2>
            <p className="text-base" style={mutedStyle}>
              From local services to venture-backed teams, each engagement pairs research, design,
              development, and automation with accountable metrics.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {headlineStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border px-5 py-4 text-center"
                style={{
                  borderColor: dividerColor.borderColor,
                  background: getTone("rgba(246,248,246,0.04)", "rgba(15,23,42,0.03)"),
                }}
              >
                <p className="text-3xl font-serifalt" style={headingStyle}>
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-[0.35em]" style={labelStyle}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {portfolioStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border p-6"
                style={{
                  borderColor: dividerColor.borderColor,
                  background: getTone("rgba(246,248,246,0.04)", "rgba(15,23,42,0.03)"),
                }}
              >
                <p className="text-sm font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-serifalt" style={headingStyle}>
                  {stat.value}
                </p>
                <p className="mt-2 text-sm" style={mutedStyle}>
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a href="/services">
              <Button
                className="rounded-full px-8 py-4 text-sm font-accent uppercase tracking-[0.3em]"
                style={primaryButtonStyle}
              >
                See what I can do for your business
              </Button>
            </a>
            <a
              href="mailto:michaelhanna50@gmail.com?subject=Project%20Inquiry"
              className="rounded-full border px-8 py-4 text-sm font-accent uppercase tracking-[0.3em] transition"
              style={secondaryButtonStyle}
            >
              Start a Similar Project
            </a>
          </div>
        </div>
      </section>

      <Footer theme={theme} mainTheme={mainTheme} />
    </div>
  );
}
