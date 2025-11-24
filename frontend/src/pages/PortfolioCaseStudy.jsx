import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import StickyHeader from "../components/StickyHeader";
import { Button } from "@/components/ui/button";
import { portfolioCaseStudies } from "@/data/portfolioContent";
import usePageMetadata from "@/hooks/usePageMetadata";
import { SITE_URL, buildCaseStudySchema, DEFAULT_OG_IMAGE, toAbsoluteUrl } from "@/data/siteMeta";

const HERO_OUTCOME_TEXT_EXCLUSIONS = new Set(["american-craftsman", "millie-aesthetics"]);

const LOW_CONTRAST_ACCENTS = new Set(["#7a8896", "#6d8f81", "#58779d", "#8f7a63"]);

const resolvePublicAsset = (source) => {
  if (!source || typeof source !== "string") return source;
  if (/^https?:\/\//i.test(source)) return source;
  return source.startsWith("/") ? source : `/${source.replace(/^\/+/, "")}`;
};

export default function PortfolioCaseStudy({ theme, mainTheme }) {
  const { slug } = useParams();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const caseStudy = useMemo(
    () => portfolioCaseStudies.find((study) => study.slug === slug),
    [slug]
  );

  const sectionTheme = theme?.sections?.portfolio;
  const palette = sectionTheme?.palette;

  const pageStyle = mainTheme?.page
    ? { background: mainTheme.page.bg, color: mainTheme.page.text }
    : undefined;
  const heroStyle = sectionTheme ? { background: sectionTheme.bg, color: sectionTheme.text } : undefined;

  const headingStyle = { color: palette?.heading || "#F6F8F6" };
  const mutedStyle = { color: palette?.muted || "rgba(246,248,246,0.78)" };
  const labelStyle = { color: palette?.muted || "rgba(246,248,246,0.65)" };
  const dividerColor = {
    borderColor: palette?.divider || "rgba(246,248,246,0.25)",
  };
  const accentHex = (theme?.accent || "").toLowerCase();
  const needsHighContrastButtons = LOW_CONTRAST_ACCENTS.has(accentHex);
  const buttonPalette = palette?.button;
  const resolvedButtonPalette = needsHighContrastButtons
    ? {
        bg: "#1f2937",
        text: "#F6F8F6",
        hover: "#0f172a",
        border: "#1f2937",
      }
    : buttonPalette;
  const primaryCtaStyle = resolvedButtonPalette
    ? {
        backgroundColor: resolvedButtonPalette.bg,
        color: resolvedButtonPalette.text || headingStyle.color || "#0f172a",
        borderColor: resolvedButtonPalette.border || resolvedButtonPalette.bg,
      }
    : undefined;
  const outlineCtaStyle = resolvedButtonPalette
    ? {
        borderColor: resolvedButtonPalette.bg,
        color: resolvedButtonPalette.bg,
        backgroundColor: "transparent",
      }
    : undefined;
  const heroLiveButtonStyle = resolvedButtonPalette
    ? {
        backgroundColor: resolvedButtonPalette.bg,
        color: resolvedButtonPalette.text || headingStyle.color,
        borderColor: resolvedButtonPalette.border || resolvedButtonPalette.bg,
      }
    : {
        color: headingStyle.color,
        borderColor: headingStyle.color,
        backgroundColor: "transparent",
      };

  const canonical = caseStudy ? `${SITE_URL}/portfolio/${caseStudy.slug}` : `${SITE_URL}/portfolio`;
  const jsonLd = caseStudy ? buildCaseStudySchema(caseStudy) : null;
  const ogImage = caseStudy ? toAbsoluteUrl(caseStudy.coverImage) || DEFAULT_OG_IMAGE : DEFAULT_OG_IMAGE;

  usePageMetadata({
    title: caseStudy
      ? caseStudy.metaTitle || `${caseStudy.title} Case Study | Hanna Web Studio`
      : "Case Study Not Found | Hanna Web Studio",
    description: caseStudy
      ? caseStudy.metaDescription || caseStudy.summary
      : "The requested case study could not be found.",
    canonical,
    jsonLd,
    ogImage,
  });

  if (!caseStudy) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center space-y-6" style={pageStyle}>
        <StickyHeader theme={theme} forceVisible />
        <h1 className="font-serifalt text-4xl">Case study coming soon.</h1>
        <p className="text-white/80">Check the portfolio index for available projects.</p>
        <Link
          to="/portfolio"
          className="rounded-full border border-white/30 px-8 py-3 text-xs font-accent uppercase tracking-[0.3em]"
        >
          Back to Portfolio
        </Link>
      </div>
    );
  }

  const heroServicesLabel = "Design & Development";
  const heroSafePadding = "clamp(8.5rem, 6rem + 4vw, 11.5rem)";
  const shouldShowHeroOutcomeText = Boolean(
    caseStudy.outcome && !HERO_OUTCOME_TEXT_EXCLUSIONS.has(caseStudy.slug)
  );

  const heroReveal = {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const heroSecondaryReveal = {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut", delay: 0.15 },
  };

  const inViewFade = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: "easeOut", delay },
  });

  const infoRows = [
    { label: "Client", value: caseStudy.client },
    { label: "Year", value: caseStudy.year },
    { label: "Industry", value: (caseStudy.industry || []).join(", ") },
    { label: "Services", value: (caseStudy.services || []).join(" · ") },
    { label: "Platform", value: (caseStudy.platform || []).join(" · ") },
  ].filter((row) => Boolean(row.value));

  const relatedStudies = (caseStudy.related || [])
    .map((relatedSlug) => portfolioCaseStudies.find((study) => study.slug === relatedSlug))
    .filter(Boolean);

  const splitIntoTwoParagraphs = (text) => {
    if (!text || typeof text !== "string") {
      return [];
    }
    const normalized = text.trim();
    if (!normalized) return [];
    const sentences = normalized.split(/(?<=[.!?])\s+/).filter(Boolean);
    if (sentences.length <= 1) {
      const midpoint = Math.floor(normalized.length / 2);
      const first = normalized.slice(0, midpoint).trim();
      const second = normalized.slice(midpoint).trim();
      return [first, second].filter(Boolean);
    }
    const midpoint = Math.ceil(sentences.length / 2);
    return [
      sentences.slice(0, midpoint).join(" ").trim(),
      sentences.slice(midpoint).join(" ").trim(),
    ].filter(Boolean);
  };

  const articlePhotos = useMemo(() => {
    if (!caseStudy) return [];
    if (Array.isArray(caseStudy.articlePhotos) && caseStudy.articlePhotos.length > 0) {
      return caseStudy.articlePhotos.slice(0, 3).map((photo) => ({
        ...photo,
        src: resolvePublicAsset(photo.src),
      }));
    }
    const fallback = [];
    Object.values(caseStudy.gallery || {}).forEach((images) => {
      if (Array.isArray(images)) {
        images.forEach((image) => {
          if (fallback.length < 3) {
            fallback.push({
              ...image,
              src: resolvePublicAsset(image.src),
            });
          }
        });
      }
    });
    return fallback.slice(0, 3);
  }, [caseStudy]);

  const articleSections = useMemo(() => {
    if (!caseStudy) return [];
    const splitSectionIds = new Set(["problem", "approach", "delivery"]);
    const createParagraphs = (id, content) => {
      if (!content) return [];
      if (!splitSectionIds.has(id)) return [content];
      const splits = splitIntoTwoParagraphs(content);
      return splits.length ? splits : [content];
    };
    const sections = [
      {
        id: "brief",
        kicker: "Brief",
        title: "Project snapshot",
        paragraphs: createParagraphs("brief", caseStudy.summary),
        photo: null,
      },
      {
        id: "problem",
        kicker: "Problem",
        title: "What wasn’t working",
        paragraphs: createParagraphs("problem", caseStudy.challenge),
        photo: articlePhotos[0] || null,
      },
      {
        id: "approach",
        kicker: "Approach",
        title: "How we tackled it",
        paragraphs: createParagraphs("approach", caseStudy.strategy),
        photo: articlePhotos[1] || null,
      },
      {
        id: "delivery",
        kicker: "Delivery",
        title: "What launched and what changed",
        paragraphs: createParagraphs("delivery", caseStudy.solution),
        photo: articlePhotos[2] || null,
      },
    ];

    return sections.filter((section) => section.paragraphs.length > 0);
  }, [caseStudy, articlePhotos]);

  return (
    <div className="min-h-screen" style={pageStyle}>
      <StickyHeader theme={theme} forceVisible />

      <section
        className="px-6 pb-16 md:pb-20 lg:pb-24"
        style={{ ...heroStyle, paddingTop: heroSafePadding }}
      >
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="grid gap-12 lg:grid-cols-[1.8fr_1fr] lg:items-center">
            <motion.div
              className="flex flex-col items-center justify-center gap-6 text-center"
              {...heroReveal}
            >
              <p className="font-accent text-lg uppercase tracking-[0.45em] lg:text-xl" style={labelStyle}>
                Case Studies
              </p>
              <p className="font-accent text-sm uppercase tracking-[0.35em] lg:text-base" style={labelStyle}>
                {heroServicesLabel}
              </p>
              <h1 className="font-serifalt text-6xl leading-tight lg:text-7xl" style={headingStyle}>
                {caseStudy.title}
              </h1>
            </motion.div>
            <motion.div className="space-y-4 lg:sticky lg:top-24" {...heroSecondaryReveal}>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/30">
                <img
                  src={caseStudy.coverImage}
                  alt={caseStudy.coverImageAlt}
                  className="h-72 w-full object-contain bg-black/10"
                  loading="lazy"
                  decoding="async"
                />
                <div className="px-6 py-5 space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs font-accent uppercase tracking-[0.35em] text-white/70">Outcome</p>
                    {caseStudy.liveUrl && (
                      <a
                        href={caseStudy.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full border px-6 py-2 text-xs font-accent uppercase tracking-[0.3em] transition hover:-translate-y-0.5"
                        style={heroLiveButtonStyle}
                      >
                        View Live Site
                      </a>
                    )}
                  </div>
                  {shouldShowHeroOutcomeText && (
                    <p className="text-lg font-serifalt text-white/90">{caseStudy.outcome}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
          {infoRows.length > 0 && (
            <motion.div
              className="rounded-3xl border border-white/15 bg-white/5 py-5"
              style={dividerColor}
              {...inViewFade(0.05)}
            >
              <div
                className="grid w-full"
                style={{
                  gap: "clamp(1rem, 0.9rem + 1vw, 2.4rem)",
                  paddingLeft: "clamp(2rem, 1.5rem + 2vw, 3.5rem)",
                  paddingRight: "clamp(1rem, 0.8rem + 1vw, 2rem)",
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                }}
              >
                {infoRows.map((row) => (
                  <div key={row.label} className="flex flex-col gap-1">
                    <p className="text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                      {row.label}
                    </p>
                    <p className="text-sm font-semibold leading-snug" style={headingStyle}>
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {articleSections.length > 0 && (
        <section className="px-6 py-16" style={heroStyle}>
          <div className="mx-auto max-w-6xl space-y-16">
            {articleSections.map((section, index) => (
              <motion.article
                key={section.id}
                className="gap-10 lg:grid lg:grid-cols-[1.7fr_0.9fr] lg:items-stretch"
                {...inViewFade(index * 0.1)}
              >
                <div className="space-y-4">
                  <p className="font-accent text-sm uppercase tracking-[0.35em]" style={labelStyle}>
                    {section.kicker}
                  </p>
                  <h2 className="font-serifalt text-4xl" style={headingStyle}>
                    {section.title}
                  </h2>
                  <div className="space-y-4 text-base leading-relaxed" style={mutedStyle}>
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={`${section.id}-paragraph-${paragraphIndex}`}>{paragraph}</p>
                    ))}
                  </div>
                </div>
                {section.photo && (
                  <motion.figure
                    className="mt-6 space-y-3 lg:mt-0 lg:flex lg:h-full lg:flex-col lg:justify-center lg:gap-4 lg:self-stretch lg:pl-6"
                    {...inViewFade(index * 0.1 + 0.05)}
                  >
                    <div className="flex w-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4">
                      <img
                        src={section.photo.src}
                        alt={section.photo.alt}
                        className="h-full max-h-[360px] w-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <figcaption className="text-sm" style={labelStyle}>
                      {section.photo.caption || section.photo.alt || caseStudy.title}
                    </figcaption>
                  </motion.figure>
                )}
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {caseStudy.testimonial && (
        <section className="px-6 py-16" style={heroStyle}>
          <motion.div
            className="mx-auto max-w-4xl space-y-4 rounded-3xl border px-10 py-12 text-center"
            style={dividerColor}
            {...inViewFade(0.1)}
          >
            <p className="text-2xl font-serifalt" style={headingStyle}>
              “{caseStudy.testimonial.quote}”
            </p>
            <p className="text-sm" style={mutedStyle}>
              — {caseStudy.testimonial.name}, {caseStudy.testimonial.role} · {caseStudy.testimonial.company}
            </p>
          </motion.div>
        </section>
      )}

      <section className="px-6 py-16" style={heroStyle}>
        <div className="mx-auto max-w-6xl space-y-8">
          <motion.div
            className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
            {...inViewFade(0.05)}
          >
            <div>
              <p className="font-accent text-xs uppercase tracking-[0.4em]" style={labelStyle}>
                Related projects
              </p>
              <h2 className="mt-2 font-serifalt text-5xl" style={headingStyle}>
                Explore similar work by industry or service.
              </h2>
            </div>
            <Link
              to="/portfolio"
              className={`rounded-full border px-8 py-3 text-xs font-accent uppercase tracking-[0.3em] ${
                needsHighContrastButtons ? 'hover:opacity-80' : 'border-white/30 text-white/80'
              }`}
              style={needsHighContrastButtons ? outlineCtaStyle : undefined}
            >
              Back to Portfolio
            </Link>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2">
            {relatedStudies.map((study, index) => (
              <motion.article
                key={study.slug}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
                {...inViewFade(0.05 * index + 0.05)}
              >
                <p className="text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                  {study.heroSummary}
                </p>
                <h3 className="mt-2 font-serifalt text-2xl">{study.title}</h3>
                <p className="mt-3 text-sm" style={mutedStyle}>
                  {study.summary}
                </p>
                <Link
                  to={`/portfolio/${study.slug}`}
                  className={`mt-4 inline-flex rounded-full border px-4 py-2 text-xs font-accent uppercase tracking-[0.3em] transition ${
                    needsHighContrastButtons ? 'hover:opacity-80' : 'border-white/30 text-white/80 hover:border-white hover:text-white'
                  }`}
                  style={needsHighContrastButtons ? outlineCtaStyle : undefined}
                >
                  View Case Study
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24" style={heroStyle}>
        <motion.div
          className="mx-auto flex min-h-[320px] max-w-4xl flex-col items-center justify-center gap-4 text-center"
          {...inViewFade(0.1)}
        >
          <p className="font-serifalt text-4xl" style={headingStyle}>
            Ready to make your project the next case study?
          </p>
          <p className="text-sm" style={mutedStyle}>
            One partner across research, design, development, and automation—built with documented playbooks so your team can run it after launch.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button
                className="rounded-full px-8 py-4 text-sm font-accent uppercase tracking-[0.3em] hover:-translate-y-0.5 transition"
                style={primaryCtaStyle}
              >
                Start a Similar Project
              </Button>
            </Link>
            <Link
              to="/services"
              className={`rounded-full border px-8 py-4 text-sm font-accent uppercase tracking-[0.3em] transition ${
                needsHighContrastButtons ? 'hover:opacity-80' : 'border-white/30 text-white/80 hover:border-white hover:text-white'
              }`}
              style={needsHighContrastButtons ? outlineCtaStyle : undefined}
            >
              See Services
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer theme={theme} mainTheme={mainTheme} />
    </div>
  );
}
