import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import StickyHeader from "../components/StickyHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { portfolioCaseStudies } from "@/data/portfolioContent";
import usePageMetadata from "@/hooks/usePageMetadata";

export default function PortfolioCaseStudy({ slug, theme, mainTheme }) {
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

  const canonical = origin && caseStudy ? `${origin}/portfolio/${caseStudy.slug}` : undefined;
  const jsonLd =
    caseStudy && origin
      ? {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: `${caseStudy.title} Case Study`,
          about: caseStudy.industry,
          author: {
            "@type": "Person",
            name: "Michael Hanna",
          },
          datePublished: caseStudy.year,
          image: caseStudy.coverImage,
          url: canonical,
          headline: caseStudy.summary,
        }
      : null;

  usePageMetadata({
    title: caseStudy
      ? `${caseStudy.title} Case Study | Michael Hanna`
      : "Case Study Not Found | Michael Hanna",
    description: caseStudy ? caseStudy.summary : "The requested case study could not be found.",
    canonical,
    jsonLd,
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

  const heroKpis = caseStudy.heroKpis || [];
  const stackItems = caseStudy.stack || [];
  const automationItems = caseStudy.automations || [];
  const kpiCards = caseStudy.kpis || [];

  const infoRows = [
    { label: "Client", value: caseStudy.client },
    { label: "Year", value: caseStudy.year },
    { label: "Industry", value: caseStudy.industry.join(", ") },
    { label: "Services", value: caseStudy.services.join(" · ") },
    { label: "Platform", value: caseStudy.platform.join(" · ") },
  ];

  const relatedStudies = (caseStudy.related || [])
    .map((relatedSlug) => portfolioCaseStudies.find((study) => study.slug === relatedSlug))
    .filter(Boolean);

  const galleryTabs = Object.entries(caseStudy.gallery || {}).filter(
    ([, images]) => Array.isArray(images) && images.length > 0
  );

  return (
    <div className="min-h-screen" style={pageStyle}>
      <StickyHeader theme={theme} forceVisible />

      <section className="px-6 pt-24 pb-16 lg:pt-32" style={heroStyle}>
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-6">
              <p className="font-accent text-xs uppercase tracking-[0.4em]" style={labelStyle}>
                Selected Work · {caseStudy.heroSummary}
              </p>
              <h1 className="font-serifalt text-5xl leading-tight" style={headingStyle}>
                {caseStudy.title}
              </h1>
              <p className="text-lg leading-relaxed" style={mutedStyle}>
                {caseStudy.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {[...(caseStudy.industry || []), ...(caseStudy.services || [])].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-3 py-1 text-xs font-accent uppercase tracking-[0.25em]"
                    style={{
                      color: labelStyle.color,
                      borderColor: dividerColor.borderColor,
                      background: "rgba(255,255,255,0.05)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {heroKpis.map((kpi) => (
                  <span
                    key={kpi.label}
                    className="rounded-full border px-4 py-2 text-xs font-accent uppercase tracking-[0.3em]"
                    style={{
                      color: headingStyle.color,
                      borderColor: dividerColor.borderColor,
                      background: "rgba(255,255,255,0.05)",
                    }}
                  >
                    {kpi.value} · {kpi.label}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:michaelhanna50@gmail.com?subject=Start%20a%20Similar%20Project">
                  <Button className="rounded-full px-8 py-4 text-sm font-accent uppercase tracking-[0.3em]">
                    Start a Similar Project
                  </Button>
                </a>
                <Link
                  to="/services"
                  className="rounded-full border border-white/30 px-8 py-4 text-sm font-accent uppercase tracking-[0.3em] text-white/80 transition hover:text-white"
                >
                  View Services
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              <img
                src={caseStudy.coverImage}
                alt={caseStudy.coverImageAlt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent px-6 py-5">
                <p className="text-xs font-accent uppercase tracking-[0.35em] text-white/70">Result</p>
                <p className="text-xl font-serifalt text-white">{caseStudy.outcome}</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {infoRows.map((row) => (
              <div key={row.label} className="rounded-2xl border px-4 py-3 text-sm" style={dividerColor}>
                <p className="text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                  {row.label}
                </p>
                <p className="mt-1 font-semibold" style={headingStyle}>
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16" style={heroStyle}>
        <div className="mx-auto max-w-6xl space-y-10">
          <div>
            <p className="font-accent text-xs uppercase tracking-[0.4em]" style={labelStyle}>
              Challenge → Solution → Benefit
            </p>
            <h2 className="mt-3 font-serifalt text-4xl" style={headingStyle}>
              Why the project mattered and how we tackled it.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Challenge", body: caseStudy.challenge },
              { title: "Solution", body: caseStudy.solution },
              { title: "Strategy", body: caseStudy.strategy },
            ].map((block) => (
              <div
                key={block.title}
                className="rounded-3xl border p-6"
                style={{
                  ...dividerColor,
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                <p className="text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                  {block.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed" style={mutedStyle}>
                  {block.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {galleryTabs.length > 0 && (
        <section className="px-6 py-16" style={heroStyle}>
          <div className="mx-auto max-w-6xl space-y-8">
            <div>
              <p className="font-accent text-xs uppercase tracking-[0.4em]" style={labelStyle}>
                Process snapshots
              </p>
              <h2 className="mt-3 font-serifalt text-4xl" style={headingStyle}>
                Wireframes, UI, build, and automation touchpoints.
              </h2>
            </div>
            <Tabs defaultValue={galleryTabs[0][0]} className="space-y-6">
              <TabsList className="flex flex-wrap gap-3">
                {galleryTabs.map(([phase]) => (
                  <TabsTrigger
                    key={phase}
                    value={phase}
                    className="rounded-full border border-white/20 px-5 py-2 text-xs font-accent uppercase tracking-[0.3em]"
                  >
                    {phase}
                  </TabsTrigger>
                ))}
              </TabsList>
              {galleryTabs.map(([phase, images]) => (
                <TabsContent key={phase} value={phase}>
                  <div className="grid gap-6 md:grid-cols-2">
                    {images.map((image) => (
                      <figure key={image.src} className="space-y-3">
                        <div className="overflow-hidden rounded-3xl border border-white/10">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="h-64 w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <figcaption className="text-sm" style={mutedStyle}>
                          {image.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      )}

      <section className="px-6 py-16" style={heroStyle}>
        <div className="mx-auto max-w-6xl space-y-10">
          <div>
            <p className="font-accent text-xs uppercase tracking-[0.4em]" style={labelStyle}>
              Results
            </p>
            <h2 className="mt-3 font-serifalt text-4xl" style={headingStyle}>
              KPIs and before/after proof.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {kpiCards.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-3xl border p-6"
                style={{
                  ...dividerColor,
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                <p className="text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                  {kpi.label}
                </p>
                <p className="mt-2 text-4xl font-serifalt" style={headingStyle}>
                  {kpi.value}
                </p>
                <p className="text-xs" style={labelStyle}>
                  {kpi.timeframe} · {kpi.source}
                </p>
                <p className="mt-4 text-sm" style={mutedStyle}>
                  {kpi.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16" style={heroStyle}>
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border p-6" style={dividerColor}>
            <p className="text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
              Tech stack
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {stackItems.map((item) => (
                <span key={item} className="rounded-full border border-white/20 px-4 py-1 text-xs text-white/85">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border p-6" style={dividerColor}>
            <p className="text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
              Tools & automations
            </p>
            <ul className="mt-4 space-y-2 text-sm" style={mutedStyle}>
              {automationItems.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {caseStudy.testimonial && (
        <section className="px-6 py-16" style={heroStyle}>
          <div className="mx-auto max-w-4xl space-y-4 rounded-3xl border px-10 py-12 text-center" style={dividerColor}>
            <p className="text-2xl font-serifalt text-white/90">
              “{caseStudy.testimonial.quote}”
            </p>
            <p className="text-sm text-white/70">
              — {caseStudy.testimonial.name}, {caseStudy.testimonial.role} · {caseStudy.testimonial.company}
            </p>
          </div>
        </section>
      )}

      <section className="px-6 py-16" style={heroStyle}>
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-accent text-xs uppercase tracking-[0.4em]" style={labelStyle}>
                Related projects
              </p>
              <h2 className="mt-2 font-serifalt text-4xl" style={headingStyle}>
                Explore similar work by industry or service.
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="rounded-full border border-white/30 px-8 py-3 text-xs font-accent uppercase tracking-[0.3em] text-white/80"
            >
              Back to Portfolio
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {relatedStudies.map((study) => (
              <article key={study.slug} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                  {study.heroSummary}
                </p>
                <h3 className="mt-2 font-serifalt text-2xl">{study.title}</h3>
                <p className="mt-3 text-sm" style={mutedStyle}>
                  {study.summary}
                </p>
                <Link
                  to={`/portfolio/${study.slug}`}
                  className="mt-4 inline-flex rounded-full border border-white/30 px-4 py-2 text-xs font-accent uppercase tracking-[0.3em] text-white/80 transition hover:border-white hover:text-white"
                >
                  View Case Study
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24" style={heroStyle}>
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-3xl border border-white/10 bg-black/40 p-10 text-center">
          <p className="font-serifalt text-4xl" style={headingStyle}>
            Ready to make your project the next case study?
          </p>
          <p className="text-sm" style={mutedStyle}>
            One partner across research, design, development, and automation—built with documented playbooks so your team can run it after launch.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:michaelhanna50@gmail.com?subject=Project%20Inquiry">
              <Button className="rounded-full px-8 py-4 text-sm font-accent uppercase tracking-[0.3em]">
                Start a Similar Project
              </Button>
            </a>
            <Link
              to="/services"
              className="rounded-full border border-white/30 px-8 py-4 text-sm font-accent uppercase tracking-[0.3em] text-white/80 transition hover:text-white"
            >
              See Services
            </Link>
          </div>
        </div>
      </section>

      <Footer theme={theme} mainTheme={mainTheme} />
    </div>
  );
}
