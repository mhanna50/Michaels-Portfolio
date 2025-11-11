import React, { useEffect, useMemo, useState } from "react";
import Footer from "../components/Footer";
import StickyHeader from "../components/StickyHeader";
import { Button } from "@/components/ui/button";
import {
  portfolioCaseStudies,
  portfolioStats,
  clientLogos,
  portfolioProcess,
} from "@/data/portfolioContent";
import usePageMetadata from "@/hooks/usePageMetadata";

const emptyFilters = {
  industry: [],
  service: [],
  platform: [],
};

const getFiltersFromSearch = () => {
  if (typeof window === "undefined") return emptyFilters;
  const params = new URLSearchParams(window.location.search);
  const parse = (key) => {
    const values = params.getAll(key);
    return values.filter(Boolean);
  };
  return {
    industry: parse("industry"),
    service: parse("service"),
    platform: parse("platform"),
  };
};

const portfolioSiteCaseStudy = {
  title: "This Portfolio — Fully Coded Marketing Hub",
  slug: "portfolio-site",
  client: "Personal HQ",
  year: "2024",
  industry: ["Creative Studio", "Product"],
  services: ["Fully coded build", "Design system"],
  platform: ["React/Vite"],
  summary:
    "Every section of this site is component-driven: weather-based theming, MDX blog tooling, and custom CMS loaders showcase how bespoke builds stay fast.",
  heroSummary: "Coded Experience · Design, Development",
  heroKpis: [
    { label: "Core Web Vitals", value: "Green", timeframe: "Site-wide" },
    { label: "Pages shipped", value: "20+", timeframe: "Ongoing" },
  ],
  outcome: "Showcases fully coded sites with live theming + MDX pipeline",
  coverImage: "/images/personal/portfolio.jpeg",
  coverImageAlt: "Screens from the Michael Hanna portfolio website",
  challenge:
    "Needed a single destination that ties services, writing, and productized workflows together without relying on templates.",
  strategy:
    "Built a custom React/Vite stack with Tailwind, MDX pipelines, and weather-driven themes to highlight polish and performance.",
  solution:
    "Shipped modular sections, blog tooling, and API-driven widgets to demonstrate how bespoke builds stay editable and fast.",
  gallery: null,
  kpis: [],
  stack: ["React", "Vite", "Tailwind", "MDX"],
  automations: ["Custom loaders", "Theme hooks"],
  testimonial: null,
  related: ["american-craftsman", "millie-aesthetics"],
  href: "/",
};

const serviceLabelMap = {
  "american-craftsman": "Web design via Framer",
  "millie-aesthetics": "Web design via WordPress",
  "ops-automation-suite": "AI automations",
  "portfolio-site": "Fully coded sites",
};

const getFilterOptions = (studies) => {
  const reducer = (acc, study) => {
    study.industry?.forEach((value) => acc.industry.add(value));
    study.services?.forEach((value) => acc.service.add(value));
    study.platform?.forEach((value) => acc.platform.add(value));
    return acc;
  };
  const unique = studies.reduce(
    reducer,
    {
      industry: new Set(),
      service: new Set(),
      platform: new Set(),
    }
  );
  return {
    industry: Array.from(unique.industry).sort(),
    service: Array.from(unique.service).sort(),
    platform: Array.from(unique.platform).sort(),
  };
};

const allCaseStudies = [...portfolioCaseStudies, portfolioSiteCaseStudy];
const filterOptions = getFilterOptions(allCaseStudies);

function FilterPill({ label, group, isActive, onToggle, activeStyle, inactiveStyle }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(group, label)}
      className="rounded-full border px-4 py-2 text-sm font-accent uppercase tracking-[0.25em] transition-all"
      style={isActive ? activeStyle : inactiveStyle}
      aria-pressed={isActive}
    >
      {label}
    </button>
  );
}

function CaseStudyCard({ study, palette, isNightTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const cardStyle = palette?.card
    ? {
        background: palette.card.bg,
        borderColor: palette.card.border,
      }
    : undefined;
  const baseTextColor = palette?.card?.text || (isNightTheme ? "#F6F8F6" : "#111827");
  const mutedTextColor = palette?.card?.muted || (isNightTheme ? "rgba(246,248,246,0.78)" : "#4b5563");
  const labelColor = isNightTheme ? "rgba(246,248,246,0.65)" : "#475569";
  const chipBorder = isNightTheme ? "rgba(246,248,246,0.25)" : "rgba(15,23,42,0.2)";
  const chipBg = isNightTheme ? "rgba(246,248,246,0.08)" : "rgba(15,23,42,0.08)";
  const actionHref = study.href || `/portfolio/${study.slug}`;
  const actionStyle = {
    backgroundColor: chipBg,
    borderColor: chipBorder,
    color: baseTextColor,
  };

  const serviceLabel = study.serviceLabel || study.services?.[0] || "this service";

  return (
    <article
      className="flex h-full flex-col rounded-3xl border p-6 shadow-xl transition-transform duration-300 hover:-translate-y-1"
      style={{ ...cardStyle, color: baseTextColor }}
    >
      <button
        type="button"
        className="flex items-center justify-between gap-4 rounded-2xl border border-dashed px-4 py-3 text-left text-sm font-accent uppercase tracking-[0.35em]"
        style={{ color: labelColor, borderColor: chipBorder }}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <div className="flex flex-col gap-1 tracking-[0.25em]">
          <span>Learn more about</span>
          <span
            className="font-serifalt text-xl normal-case tracking-normal"
            style={{ color: baseTextColor }}
          >
            {serviceLabel}
          </span>
        </div>
        <span className="text-2xl font-serifalt leading-none" aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <>
          <div className="mt-6 space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-black/30">
              <img
                src={study.coverImage}
                alt={study.coverImageAlt}
                className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-3 left-4 text-sm font-serifalt" style={{ color: mutedTextColor }}>
                {study.outcome}
              </p>
            </div>
            <div>
              <p className="font-accent uppercase tracking-[0.3em] text-xs" style={{ color: labelColor }}>
                {study.heroSummary}
              </p>
              <h3 className="mt-2 font-serifalt text-3xl">{study.title}</h3>
              <p className="mt-3 font-serifalt text-base" style={{ color: mutedTextColor }}>
                {study.summary}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {study.industry.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-3 py-1 text-xs font-accent uppercase tracking-[0.25em]"
                  style={{ color: mutedTextColor, borderColor: chipBorder }}
                >
                  {tag}
                </span>
              ))}
              {study.services.map((tag) => (
                <span
                  key={`${study.slug}-${tag}`}
                  className="rounded-full border px-3 py-1 text-xs font-accent uppercase tracking-[0.25em]"
                  style={{ color: mutedTextColor, borderColor: chipBorder, backgroundColor: chipBg }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm uppercase tracking-[0.3em]" style={{ color: labelColor }}>
              View Case Study
            </p>
            <a
              href={actionHref}
              className="rounded-full border px-5 py-2 text-xs font-accent uppercase tracking-[0.3em] transition-all hover:-translate-y-0.5"
              style={actionStyle}
            >
              Open
            </a>
          </div>
        </>
      )}
    </article>
  );
}

export default function PortfolioPage({ theme, mainTheme }) {
  const [filters, setFilters] = useState(getFiltersFromSearch);
  const [visibleCount, setVisibleCount] = useState(4);
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    filters.industry.forEach((value) => params.append("industry", value));
    filters.service.forEach((value) => params.append("service", value));
    filters.platform.forEach((value) => params.append("platform", value));
    const newSearch = params.toString();
    const nextUrl = `${window.location.pathname}${
      newSearch ? `?${newSearch}` : ""
    }`;
    window.history.replaceState({}, "", nextUrl);
  }, [filters]);

  const toggleFilter = (group, value) => {
    setFilters((prev) => {
      const nextSet = new Set(prev[group]);
      if (nextSet.has(value)) {
        nextSet.delete(value);
      } else {
        nextSet.add(value);
      }
      return {
        ...prev,
        [group]: Array.from(nextSet),
      };
    });
  };

  useEffect(() => {
    setVisibleCount(4);
  }, [filters]);

  const filteredStudies = useMemo(() => {
    return allCaseStudies.filter((study) => {
      const matchesIndustry =
        filters.industry.length === 0 ||
        study.industry.some((value) => filters.industry.includes(value));
      const matchesService =
        filters.service.length === 0 ||
        study.services.some((value) => filters.service.includes(value));
      const matchesPlatform =
        filters.platform.length === 0 ||
        study.platform.some((value) => filters.platform.includes(value));
      return matchesIndustry && matchesService && matchesPlatform;
    });
  }, [filters]);

  const visibleStudies = filteredStudies.slice(0, visibleCount);
  const palette = theme?.sections?.portfolio?.palette;
  const sectionTheme = theme?.sections?.portfolio;

  const isNightTheme =
    theme?.page?.bg && mainTheme?.page?.bg
      ? theme.page.bg === mainTheme.page.bg
      : false;
  const getTone = (nightValue, dayValue) => (isNightTheme ? nightValue : dayValue);

  const pageStyle = mainTheme?.page
    ? {
        background: mainTheme.page.bg,
        color: mainTheme.page.text,
      }
    : undefined;
  const heroStyle = sectionTheme
    ? { background: sectionTheme.bg, color: sectionTheme.text }
    : undefined;
  const headingStyle = {
    color: palette?.heading || getTone("#F6F8F6", "#111827"),
  };
  const mutedStyle = {
    color: palette?.muted || getTone("rgba(246,248,246,0.78)", "#1f2937"),
  };
  const labelStyle = {
    color: palette?.muted || getTone("rgba(246,248,246,0.65)", "#475569"),
  };
  const secondaryTextStyle = {
    color: getTone("rgba(246,248,246,0.62)", "#4b5563"),
  };
  const dividerColor = {
    borderColor: palette?.divider || getTone("rgba(246,248,246,0.25)", "rgba(15,23,42,0.15)"),
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
  const filterActiveStyle = {
    ...primaryButtonStyle,
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
  };
  const filterInactiveStyle = secondaryButtonStyle;

  const canonical = origin ? `${origin}/portfolio` : undefined;
  const collectionJsonLd =
    origin && allCaseStudies.length
      ? {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Portfolio | Michael Hanna",
          description:
            "Case studies in web design, development, and automation delivering measurable outcomes.",
          url: canonical,
          hasPart: allCaseStudies.map((study) => ({
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
    description:
      "Case studies in web design, development, and automation delivering measurable outcomes.",
    canonical,
    jsonLd: collectionJsonLd,
  });

  return (
    <div className="min-h-screen" style={pageStyle}>
      <StickyHeader theme={theme} forceVisible />
      <section
        className="relative overflow-hidden px-6 pt-28 pb-16 lg:pt-36"
        style={heroStyle}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(67,104,80,0.22),_transparent_65%)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-end">
          <div className="max-w-3xl space-y-6">
            <p
              className="font-accent text-xs uppercase tracking-[0.45em]"
              style={labelStyle}
            >
              Selected Work
            </p>
            <h1
              className="font-serifalt text-5xl leading-tight md:text-6xl"
              style={headingStyle}
            >
              Design, development, and automation that grow revenue & efficiency.
            </h1>
            <p className="font-serifalt text-lg" style={mutedStyle}>
              A deeper look at the systems, decisions, and measurable impact
              behind each build.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:michaelhanna50@gmail.com">
                <Button
                  className="rounded-full px-8 py-4 text-sm font-accent uppercase tracking-[0.3em]"
                  style={primaryButtonStyle}
                >
                  Start a Project
                </Button>
              </a>
              <a
                href="/services"
                className="rounded-full border px-8 py-4 text-sm font-accent uppercase tracking-[0.3em] transition"
                style={secondaryButtonStyle}
              >
                View Services
              </a>
            </div>
          </div>
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="font-accent text-xs uppercase tracking-[0.35em]" style={labelStyle}>
              Focus areas
            </p>
            <div className="flex flex-wrap gap-3">
              {["Brand Sites", "Product UX", "Automation", "Ops Dashboards"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border px-4 py-1 text-xs font-accent uppercase tracking-[0.35em]"
                    style={secondaryTextStyle}
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative px-6 py-16 lg:py-24"
        style={heroStyle}
      >
        <div className="mx-auto max-w-6xl space-y-12">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p
                  className="font-accent text-xs uppercase tracking-[0.45em]"
                  style={labelStyle}
                >
                  Filter work
                </p>
                <h2
                  className="mt-3 font-serifalt text-4xl"
                  style={headingStyle}
                >
                  Case studies by industry, service, or platform.
                </h2>
              </div>
            </div>
            <div className="mt-8 space-y-6">
              {["industry", "service", "platform"].map((group) => (
                <div key={group} className="space-y-3">
                  <p className="text-sm font-serifalt uppercase tracking-[0.3em]" style={labelStyle}>
                    {group}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {filterOptions[group].map((option) => (
                      <FilterPill
                        key={option}
                        label={option}
                        group={group}
                        isActive={filters[group].includes(option)}
                        onToggle={toggleFilter}
                        activeStyle={filterActiveStyle}
                        inactiveStyle={filterInactiveStyle}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-6 md:flex md:items-center md:justify-between md:gap-6">
            <div className="space-y-2">
              <p className="font-serifalt text-2xl" style={headingStyle}>
                Want to see Python, Java, iOS, and QA builds?
              </p>
              <p className="text-sm" style={mutedStyle}>
                Dive into automation scripts, SwiftUI prototypes, and testing frameworks over on GitHub.
              </p>
            </div>
            <a href="https://github.com/mhanna50" target="_blank" rel="noreferrer">
              <Button
                className="mt-4 rounded-full px-8 py-3 text-xs font-accent uppercase tracking-[0.3em] md:mt-0"
                style={primaryButtonStyle}
              >
                View GitHub
              </Button>
            </a>
          </div>

          {visibleStudies.length === 0 ? (
            <div className="rounded-3xl border border-white/20 p-10 text-center">
              <p className="font-serifalt text-lg" style={mutedStyle}>
                No case studies match those filters (yet). Reset filters to see
                everything.
              </p>
              <button
                type="button"
                className="mt-6 rounded-full border px-8 py-3 text-xs font-accent uppercase tracking-[0.3em]"
                style={secondaryButtonStyle}
                onClick={() => setFilters(emptyFilters)}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2">
                {visibleStudies.map((study) => {
                  const serviceLabel = serviceLabelMap[study.slug] || study.services?.[0];
                  return (
                    <CaseStudyCard
                      key={study.slug}
                      study={{ ...study, serviceLabel }}
                      palette={palette?.projectCard}
                      isNightTheme={isNightTheme}
                    />
                  );
                })}
              </div>
              {visibleStudies.length < filteredStudies.length && (
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="rounded-full border px-8 py-3 text-xs font-accent uppercase tracking-[0.3em] transition"
                    style={secondaryButtonStyle}
                    onClick={() => setVisibleCount((count) => count + 4)}
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section
        className="px-6 py-16 lg:py-24"
        style={heroStyle}
      >
        <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-black/30 p-10 backdrop-blur">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {portfolioStats.map((stat) => (
              <div
                key={stat.label}
                className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <p className="font-accent text-sm uppercase tracking-[0.35em]" style={labelStyle}>
                  {stat.label}
                </p>
                <p
                  className="font-serifalt text-4xl"
                  style={headingStyle}
                >
                  {stat.value}
                </p>
                <p className="text-sm" style={secondaryTextStyle}>
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="px-6 py-16 lg:py-24"
        style={heroStyle}
      >
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p
                className="font-accent text-xs uppercase tracking-[0.45em]"
                style={labelStyle}
              >
                Clients
              </p>
              <h2 className="mt-3 font-serifalt text-4xl" style={headingStyle}>
                Trust built with proof.
              </h2>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 font-serifalt text-base" style={mutedStyle}>
              “Michael built the only site we’ve had that feels like the in-person
              experience. Leads arrive ready to buy.”
              <div className="mt-3 text-sm" style={secondaryTextStyle}>
                — Camila Rivera, Owner · Millie Aesthetics
              </div>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {clientLogos.map((client) => (
              <div
                key={client.name}
                className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="h-10 w-auto grayscale transition hover:grayscale-0"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="px-6 py-16 lg:py-24"
        style={heroStyle}
      >
        <div className="mx-auto max-w-6xl space-y-12">
          <div>
            <p
              className="font-accent text-xs uppercase tracking-[0.45em]"
              style={labelStyle}
            >
              Process
            </p>
            <h2 className="mt-3 font-serifalt text-4xl" style={headingStyle}>
              Discover → Design → Build → Automate.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {portfolioProcess.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <p className="text-sm uppercase tracking-[0.35em]" style={labelStyle}>
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-serifalt text-2xl">{step.title}</h3>
                <p className="mt-3" style={mutedStyle}>
                  {step.body}
                </p>
                <a
                  href={step.link}
                  className="mt-4 inline-flex items-center rounded-full border px-4 py-2 text-xs font-accent uppercase tracking-[0.3em] transition"
                  style={secondaryButtonStyle}
                >
                  {step.linkLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="px-6 pb-24"
        style={heroStyle}
      >
        <div
          className="mx-auto flex max-w-5xl flex-col gap-6 rounded-3xl border border-white/15 bg-[#090909] p-10 text-center"
          style={dividerColor}
        >
          <p
            className="font-serifalt text-4xl leading-tight"
            style={headingStyle}
          >
            Book a free discovery call — we’ll map the fastest path to impact.
          </p>
          <p className="font-serifalt text-base" style={mutedStyle}>
            Or hop over to services to see how engagements are structured.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:michaelhanna50@gmail.com">
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
        </div>
      </section>

      <Footer theme={theme} mainTheme={mainTheme} />
    </div>
  );
}
