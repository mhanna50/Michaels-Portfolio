import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  { value: "5+", label: "Web & automation launches" },
  { value: "3", label: "Local industries served" },
  { value: "4-6 weeks", label: "Typical build window" },
];

const marqueePhrases = [
  "Always-on follow-ups",
  "Plain-language copy",
  "Launch plans, not decks",
  "Calm project rhythms",
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
          <Link
            to={`/portfolio/${study.slug}`}
            className="inline-flex items-center rounded-full border px-4 py-2 text-xs font-accent uppercase tracking-[0.3em] transition hover:-translate-y-0.5"
            style={styles.linkStyle}
          >
            View Case Study
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function PortfolioPage({ theme, mainTheme }) {
  const [origin, setOrigin] = useState("");
  const marqueeItems = clientLogos.length
    ? clientLogos.flatMap((client, idx) => [
        { type: "logo", id: `${client.name}-logo`, src: client.logo, alt: client.name },
        { type: "text", id: `${client.name}-text`, content: marqueePhrases[idx % marqueePhrases.length] },
      ])
    : marqueePhrases.map((phrase, idx) => ({ type: "text", id: `phrase-${idx}`, content: phrase }));
  const marqueeLoop = [...marqueeItems, ...marqueeItems];

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

      <section className="relative flex min-h-[75vh] flex-col justify-center overflow-hidden px-6 pt-32 pb-24 lg:pt-40 lg:pb-36" style={heroStyle}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_65%)]" />
        <div className="relative mx-auto flex max-w-5xl flex-col gap-12 text-left">
          <p className="font-accent text-lg uppercase tracking-[0.45em] sm:text-2xl" style={labelStyle}>
            Selected Work
          </p>
          <h1 className="font-serifalt text-5xl leading-tight md:text-6xl" style={headingStyle}>
            Real-world sites and automations that help small teams look polished and stay responsive.
          </h1>
          <div className="flex flex-wrap gap-4">
            <Link to="/services">
              <Button
                className="rounded-full px-8 py-4 text-sm font-accent uppercase tracking-[0.3em]"
                style={primaryButtonStyle}
              >
                View services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pt-20 pb-20 lg:pt-28 lg:pb-24" style={heroStyle}>
        <div
          className="mx-auto flex max-w-6xl min-h-[520px] flex-col items-center justify-center gap-10 rounded-3xl border px-6 py-12 text-center md:px-12"
          style={dividerColor}
        >
          <div className="space-y-3">
            <p className="font-accent text-base uppercase tracking-[0.45em] sm:text-lg" style={labelStyle}>
              Highlights
            </p>
            <h2 className="font-serifalt text-4xl leading-tight" style={headingStyle}>
              Web and automation builds that trade chaos for clear systems.
            </h2>
            <p className="text-base" style={mutedStyle}>
              Every project blends messaging, design, development, and light automations so new leads, bookings, and follow-ups stay on track without extra staff.
            </p>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3">
            {headlineStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border px-5 py-6 text-center"
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
          <div className="grid w-full gap-6 text-left md:grid-cols-2">
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
          <div className="flex w-full flex-wrap justify-center gap-4 pt-2">
            <Link to="/services">
              <Button
                className="rounded-full px-8 py-4 text-sm font-accent uppercase tracking-[0.3em]"
                style={primaryButtonStyle}
              >
                See what I can do for your business
              </Button>
            </Link>
            <a
              href="mailto:michaelhanna50@gmail.com?subject=Project%20Inquiry"
              className="rounded-full border px-8 py-4 text-sm font-accent uppercase tracking-[0.3em] transition"
              style={secondaryButtonStyle}
            >
              Book a quick intro call
            </a>
          </div>
        </div>
      </section>

      {marqueeItems.length > 0 && (
        <section className="px-0 py-0" style={heroStyle}>
          <div className="relative overflow-hidden border-y" style={dividerColor}>
            <div className="marquee-track gap-10 py-6">
              {marqueeLoop.map((item, idx) => {
                const isDuplicate = idx >= marqueeItems.length;
                return (
                  <div
                    key={`${item.id}-${idx}`}
                    className="marquee-item"
                    aria-hidden={isDuplicate}
                  >
                    {item.type === "logo" ? (
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="h-10 w-auto object-contain opacity-80"
                        loading="lazy"
                      />
                    ) : (
                      <span
                        className="text-sm font-accent uppercase tracking-[0.35em]"
                        style={{ color: headingStyle.color }}
                      >
                        {item.content}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 pt-20 pb-16 lg:pt-24 lg:pb-24" style={heroStyle}>
        <div className="mx-auto max-w-6xl space-y-10">
          <div>
            <p className="font-accent text-lg uppercase tracking-[0.45em]" style={labelStyle}>
              Project library
            </p>
            <h2 className="mt-3 font-serifalt text-4xl leading-tight md:text-5xl" style={headingStyle}>
              Recent builds that pair polished web experiences with simple automations.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {portfolioCaseStudies.map((study) => (
              <WorkCard key={study.slug} study={study} styles={workCardStyles} />
            ))}
          </div>
        </div>
      </section>

      <Footer theme={theme} mainTheme={mainTheme} />
    </div>
  );
}
