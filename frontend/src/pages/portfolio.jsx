import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRightLeft } from "lucide-react";
import Footer from "../components/Footer";
import StickyHeader from "../components/StickyHeader";
import { Button } from "@/components/ui/button";
import {
  portfolioCaseStudies,
  portfolioStats,
} from "@/data/portfolioContent";
import usePageMetadata from "@/hooks/usePageMetadata";
import { SITE_URL, buildPortfolioListSchema, DEFAULT_OG_IMAGE } from "@/data/siteMeta";

const headlineStats = [
  {
    value: "5+",
    label: "Web & automation launches",
    description: "Custom sites and workflows shipped across interior design, wellness, and home services.",
  },
  {
    value: "3",
    label: "Local industries served",
    description: "Med spa, construction, and consulting teams with highly tailored workflows.",
  },
  {
    value: "4-6 weeks",
    label: "Typical build window",
    description: "From kickoff to QA for most custom sites and automation packages.",
  },
];

const marqueePhrases = [
  "Branding that Works",
  "Built with Intent",
  "Create with Purpose",
  "Build. Design. Launch.",
  "Automation for Growth",
];

const automationSolutions = [
  {
    name: "AI Receptionist & Missed Call Rescue",
    audience: "Local service businesses that miss calls or incoming messages",
    whatItDoes:
      "Automatically greets leads, sends quick follow-ups, and books calls so no opportunity gets left waiting.",
    value:
      "Prevents lost revenue by making sure every inquiry gets a response within seconds instead of hours.",
    stack: ["OpenAI", "Resend", "Node/TS", "Zapier/Make"],
    type: "Monthly Retainer",
  },
  {
    name: "Lead Routing & Instant Handoff",
    audience: "Agencies and multi-location service teams juggling inbound requests",
    whatItDoes:
      "Captures website or ad form fills, scores them, and routes context-rich handoffs by SMS or email to the right rep.",
    value:
      "Cuts response time, keeps the pipeline organized, and makes sure every lead lands with the right person instantly.",
    stack: ["OpenAI", "Resend", "Node/TS", "Zapier/Make"],
    type: "One-time Build",
  },
];

const libraryViewOptions = [
  { value: "case-studies", label: "Website Case Studies" },
  { value: "automations", label: "Automation Systems" },
];

function WorkCard({ study, styles, motionProps = {} }) {
  const tags = [...(study.industry || []), ...(study.services || [])];
  return (
    <motion.article
      className="mb-8 inline-flex w-full flex-col overflow-hidden rounded-3xl border shadow-xl"
      style={{ background: styles.cardBg, borderColor: styles.cardBorder, breakInside: "avoid" }}
      {...motionProps}
    >
      <div className="relative w-full overflow-hidden rounded-t-3xl">
        <img
          src={study.coverImage}
          alt={study.coverImageAlt}
          className="block w-full h-auto"
          loading="lazy"
          decoding="async"
        />
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
    </motion.article>
  );
}

function AutomationCard({ solution, styles, motionProps = {} }) {
  return (
    <motion.article
      className="flex h-full flex-col rounded-3xl border p-8"
      style={{
        borderColor: styles.borderColor,
        background: styles.background,
        color: styles.textColor,
      }}
      {...motionProps}
    >
      <div className="flex items-center justify-between text-sm font-accent uppercase tracking-[0.4em]">
        <span style={{ color: styles.accentColor }}>{solution.type}</span>
        <span className="rounded-full border px-4 py-1 text-[0.75rem]" style={{ borderColor: styles.borderColor }}>
          Automation
        </span>
      </div>
      <div>
        <h3 className="font-serifalt text-3xl leading-snug md:text-4xl" style={{ color: styles.headingColor }}>
          {solution.name}
        </h3>
        <p className="mt-4 text-base font-accent uppercase tracking-[0.3em]" style={{ color: styles.labelColor }}>
          Built for
        </p>
        <p className="font-serifalt text-lg md:text-xl leading-relaxed" style={{ color: styles.mutedColor }}>
          {solution.audience}
        </p>
      </div>
      <div className="space-y-3">
        <p className="text-base font-accent uppercase tracking-[0.3em]" style={{ color: styles.labelColor }}>
          What it does
        </p>
        <p className="font-serifalt text-lg md:text-xl leading-relaxed" style={{ color: styles.textColor }}>
          {solution.whatItDoes}
        </p>
      </div>
      <div className="space-y-3">
        <p className="text-base font-accent uppercase tracking-[0.3em]" style={{ color: styles.labelColor }}>
          Value / Outcome
        </p>
        <p className="font-serifalt text-lg md:text-xl leading-relaxed" style={{ color: styles.textColor }}>
          {solution.value}
        </p>
      </div>
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {solution.stack.map((tech) => (
          <span
            key={`${solution.name}-${tech}`}
            className="rounded-full border px-4 py-1 text-sm font-serifalt"
            style={{
              borderColor: styles.accentColor,
              color: styles.accentColor,
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default function PortfolioPage({ theme, mainTheme }) {
  const [libraryView, setLibraryView] = useState("case-studies");
  const faviconImageSrc = "/images/personal/RefinedLogo.svg";
  const textEntries = marqueePhrases.length ? marqueePhrases : ["Branding that Works"];
  const interleavedItems = textEntries.flatMap((phrase, idx) => [
    { type: "text", id: `phrase-${idx}`, content: phrase },
    { type: "image", id: `favicon-${idx}`, src: faviconImageSrc, alt: "Michael Hanna favicon" },
  ]);
  const marqueeItems = interleavedItems;
  const marqueeLoop = [...marqueeItems, ...marqueeItems];
  const hasDualLibraryToggle = libraryViewOptions.length === 2;
  const [caseStudiesToggleOption, automationsToggleOption] = libraryViewOptions;

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

  const automationCardStyles = {
    borderColor: dividerColor.borderColor,
    background: getTone("rgba(246,248,246,0.05)", "rgba(15,23,42,0.02)"),
    headingColor: headingStyle.color,
    mutedColor: mutedStyle.color,
    labelColor: labelStyle.color,
    textColor: headingStyle.color,
    accentColor: palette?.accent || headingStyle.color,
  };
  const toggleActiveStyle = {
    backgroundColor: palette?.accent || headingStyle.color,
    color: isNightTheme ? "#0b0f19" : "#f8fafc",
    borderColor: palette?.accent || headingStyle.color,
  };
  const toggleInactiveStyle = {
    backgroundColor: "transparent",
    color: labelStyle.color,
    borderColor: dividerColor.borderColor,
  };

  const canonical = `${SITE_URL}/portfolio`;
  const collectionJsonLd =
    portfolioCaseStudies.length > 0 ? buildPortfolioListSchema(portfolioCaseStudies) : null;

  usePageMetadata({
    title: "Portfolio | Hanna Web Studio",
    description:
      "View case studies and project examples from Hanna Web Studio, including contractor sites, med spa branding, and a custom React portfolio build.",
    canonical,
    jsonLd: collectionJsonLd,
    ogImage: DEFAULT_OG_IMAGE,
  });

  const createRevealProps = (delay = 0, distance = 48) => ({
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  });

  const createItemRevealProps = (index = 0, distance = 28) => ({
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <div className="min-h-screen" style={pageStyle}>
      <StickyHeader theme={theme} forceVisible />

      <section className="relative flex min-h-[80vh] flex-col justify-center overflow-hidden px-6 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-48 lg:pb-32" style={heroStyle}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_65%)]" />
        <motion.div className="relative mx-auto flex w-full max-w-5xl flex-col gap-12 text-left mt-0 sm:mt-6 lg:mt-10" {...createRevealProps()}>
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
        </motion.div>
      </section>

      <section className="px-6 pt-20 pb-20 lg:pt-28 lg:pb-24" style={heroStyle}>
        <div
          className="mx-auto flex max-w-6xl min-h-[520px] flex-col items-center justify-center gap-10 rounded-3xl border px-6 py-12 text-center md:px-12"
          style={dividerColor}
        >
          <motion.div className="space-y-3" {...createRevealProps(0.05)}>
            <p className="font-accent text-base uppercase tracking-[0.45em] sm:text-lg" style={labelStyle}>
              Highlights
            </p>
            <h2 className="font-serifalt text-4xl leading-tight" style={headingStyle}>
              Web and automation builds that trade chaos for clear systems.
            </h2>
            <p className="text-base" style={mutedStyle}>
              Every project blends messaging, design, development, and light automations so new leads, bookings, and follow-ups stay on track without extra staff.
            </p>
          </motion.div>
          <div className="grid w-full gap-6 md:grid-cols-3">
            {headlineStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                {...createItemRevealProps(index)}
                className="rounded-2xl border px-5 py-6 text-center"
                style={{
                  borderColor: dividerColor.borderColor,
                  background: getTone("rgba(246,248,246,0.04)", "rgba(15,23,42,0.03)"),
                }}
              >
                <p className="text-3xl font-serifalt" style={headingStyle}>
                  {stat.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.35em]" style={labelStyle}>
                  {stat.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed" style={mutedStyle}>
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="grid w-full gap-6 text-left md:grid-cols-2">
            {portfolioStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                {...createItemRevealProps(index)}
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
              </motion.div>
            ))}
          </div>
          <motion.div className="flex w-full flex-wrap justify-center gap-4 pt-2" {...createRevealProps(0.12)}>
            <Link to="/services">
              <Button
                className="rounded-full px-8 py-4 text-sm font-accent uppercase tracking-[0.3em]"
                style={primaryButtonStyle}
              >
                See what I can do for your business
              </Button>
            </Link>
            <Link
              to="/contact"
              className="rounded-full border px-8 py-4 text-sm font-accent uppercase tracking-[0.3em] transition"
              style={secondaryButtonStyle}
            >
              Book a quick intro call
            </Link>
          </motion.div>
        </div>
      </section>

      {marqueeItems.length > 0 && (
        <section className="px-0 py-0" style={heroStyle}>
          <motion.div className="relative overflow-hidden border-y" style={dividerColor} {...createRevealProps(0.18)}>
            <div className="marquee-track gap-10 py-6">
              {marqueeLoop.map((item, idx) => {
                const isDuplicate = idx >= marqueeItems.length;
                return (
                  <div
                    key={`${item.id}-${idx}`}
                    className="marquee-item"
                    aria-hidden={isDuplicate}
                  >
                    {item.type === "image" ? (
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
          </motion.div>
        </section>
      )}

      <section id="project-library" className="px-6 pt-20 pb-16 lg:pt-24 lg:pb-24" style={heroStyle}>
        <div className="mx-auto max-w-6xl space-y-10">
          <motion.div className="space-y-6" {...createRevealProps(0.22)}>
            <div>
              <p className="font-accent text-lg uppercase tracking-[0.45em]" style={labelStyle}>
                Project library
              </p>
              <h2 className="mt-3 font-serifalt text-4xl leading-tight md:text-5xl" style={headingStyle}>
                Recent builds that pair polished web experiences with simple automations.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {hasDualLibraryToggle ? (
                <div className="inline-flex items-stretch overflow-hidden rounded-full border" style={dividerColor}>
                  <button
                    type="button"
                    onClick={() => setLibraryView(caseStudiesToggleOption.value)}
                    className="flex items-center justify-center px-6 py-3 text-[0.72rem] font-accent uppercase tracking-[0.35em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={libraryView === caseStudiesToggleOption.value ? toggleActiveStyle : toggleInactiveStyle}
                  >
                    {caseStudiesToggleOption.label}
                  </button>
                  <span
                    aria-hidden="true"
                    className="flex items-center px-3 text-base font-serifalt"
                    style={{ color: labelStyle.color }}
                  >
                    <ArrowRightLeft className="h-5 w-5" />
                  </span>
                  <button
                    type="button"
                    onClick={() => setLibraryView(automationsToggleOption.value)}
                    className="flex items-center justify-center px-6 py-3 text-[0.72rem] font-accent uppercase tracking-[0.35em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={libraryView === automationsToggleOption.value ? toggleActiveStyle : toggleInactiveStyle}
                  >
                    {automationsToggleOption.label}
                  </button>
                </div>
              ) : (
                libraryViewOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setLibraryView(option.value)}
                    className="rounded-full border px-5 py-2 text-xs font-accent uppercase tracking-[0.35em] transition-all hover:-translate-y-0.5"
                    style={libraryView === option.value ? toggleActiveStyle : toggleInactiveStyle}
                  >
                    {option.label}
                  </button>
                ))
              )}
            </div>
          </motion.div>
          {libraryView === "case-studies" ? (
            <div className="columns-1 md:columns-2 xl:columns-2 gap-8">
              {portfolioCaseStudies.map((study, index) => (
                <WorkCard
                  key={study.slug}
                  study={study}
                  styles={workCardStyles}
                  motionProps={createItemRevealProps(index)}
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {automationSolutions.map((solution, index) => (
                <AutomationCard
                  key={solution.name}
                  solution={solution}
                  styles={automationCardStyles}
                  motionProps={createItemRevealProps(index)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer theme={theme} mainTheme={mainTheme} />
    </div>
  );
}
