import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import StickyHeader from "../components/StickyHeader";
import { Button } from "@/components/ui/button";
import { portfolioCaseStudies } from "@/data/portfolioContent";
import usePageMetadata from "@/hooks/usePageMetadata";

export default function PortfolioCaseStudy({ theme, mainTheme }) {
  const { slug } = useParams();
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
  const heroServicesLabel = "Design & Development";
  const industryList = caseStudy.industry?.join(", ");
  const servicesList = caseStudy.services?.join(" · ");
  const platformList = caseStudy.platform?.join(" · ");
  const clientLabel = caseStudy.client || "The client";
  const industryDescriptor = industryList ? industryList.toLowerCase() : "their market";
  const servicesDescriptor = servicesList ? servicesList.toLowerCase() : "the experience";
  const heroKpiSummary =
    heroKpis.length > 0
      ? `Launch KPIs we tracked: ${heroKpis
          .map(
            (kpi) => `${kpi.label} ${kpi.value}${kpi.timeframe ? ` (${kpi.timeframe})` : ""}`
          )
          .join("; ")}.`
      : null;

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

  const articlePhotos = useMemo(() => {
    if (!caseStudy) return [];
    if (Array.isArray(caseStudy.articlePhotos) && caseStudy.articlePhotos.length > 0) {
      return caseStudy.articlePhotos.slice(0, 2);
    }
    const fallback = [];
    Object.values(caseStudy.gallery || {}).forEach((images) => {
      if (Array.isArray(images)) {
        images.forEach((image) => {
          if (fallback.length < 2) {
            fallback.push(image);
          }
        });
      }
    });
    return fallback.slice(0, 2);
  }, [caseStudy]);

  const articleSections = useMemo(() => {
    if (!caseStudy) return [];
    const stackSummary =
      stackItems.length > 0
        ? `We prototyped flows inside ${stackItems.join(
            ", "
          )} to stress-test animation, performance, and localization before investing in production builds.`
        : "We prototyped flows to stress-test animation, performance, and localization before investing in production builds.";
    const automationSummary =
      automationItems.length > 0
        ? `Automation mapping detailed how ${automationItems.join(
            ", "
          )} exchange data so ops could approve edge cases before build.`
        : "Automation mapping detailed how data would move between intake forms, CRM records, and fulfillment so ops could approve edge cases before build.";
    const discoveryParagraph = `${clientLabel} needed a shared narrative across sales, ops, and delivery, so we ran workshops to map how prospects in ${industryDescriptor} research, compare vendors, and decide when to reach out.`;
    const auditParagraph = platformList
      ? `We pulled apart the legacy ${platformList} stack, on-site content, and analytics to see where trust broke down and what proof had to surface earlier in the journey.`
      : "We pulled apart the legacy site, content, and analytics to see where trust broke down and what proof had to surface earlier in the journey.";
    const measurementParagraph =
      "By pairing CRM exports with site analytics we traced how leads moved (or stalled) across every touchpoint, giving us concrete before/after metrics for success.";
    const approachServiceParagraph = servicesList
      ? `Service detail copy was rewritten to position ${servicesDescriptor} as modular engagements, making it easier to upsell or bundle work in proposals.`
      : "Service detail copy was rewritten to position key engagements as modular plays, making it easier to upsell or bundle work in proposals.";
    const collaborationParagraph = `${clientLabel}'s stakeholders reviewed every milestone in shared Notion and FigJam workspaces, keeping approvals fast and accountable.`;
    const platformParagraph = platformList
      ? `The build leans on ${platformList} so content editors can ship updates quickly while keeping performance, SEO, and accessibility in check.`
      : "The build leans on a lean, component-driven stack so content editors can ship updates quickly while keeping performance, SEO, and accessibility in check.";
    const handoffParagraph = `${clientLabel}'s team received async training videos, component documentation, and checklists so they can keep evolving ${servicesDescriptor} without waiting on a dev retainer.`;
    const paragraphs = {
      brief: [caseStudy.summary].filter(Boolean),
      problem: [
        caseStudy.challenge,
        discoveryParagraph,
        auditParagraph,
        measurementParagraph,
      ].filter(Boolean),
      approach: [
        caseStudy.strategy,
        stackSummary,
        approachServiceParagraph,
        automationSummary,
        collaborationParagraph,
      ].filter(Boolean),
      delivery: [caseStudy.solution, platformParagraph, caseStudy.outcome, heroKpiSummary, handoffParagraph].filter(
        Boolean
      ),
    };

    const sectionList = [
      {
        id: "brief",
        kicker: "Brief",
        title: "Project snapshot",
        paragraphs: paragraphs.brief,
        photo: null,
      },
      {
        id: "problem",
        kicker: "Problem",
        title: "What wasn’t working",
        paragraphs: paragraphs.problem,
        photo: articlePhotos[0],
      },
      {
        id: "approach",
        kicker: "Approach",
        title: "How we tackled it",
        paragraphs: paragraphs.approach,
        photo: articlePhotos[1],
      },
      {
        id: "delivery",
        kicker: "Delivery",
        title: "What launched and what changed",
        paragraphs: paragraphs.delivery,
      },
    ];

    return sectionList
      .map((section) => ({
        ...section,
        paragraphs: (section.paragraphs || []).filter(Boolean),
      }))
      .filter((section) => section.paragraphs.length > 0);
  }, [caseStudy, articlePhotos, stackItems, automationItems]);

  return (
    <div className="min-h-screen" style={pageStyle}>
      <StickyHeader theme={theme} forceVisible />

      <section className="px-6 pb-16 pt-36 md:pt-44 lg:pt-32" style={heroStyle}>
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="grid gap-12 lg:grid-cols-[1.8fr_1fr] lg:items-center">
            <div className="flex flex-col items-center justify-center gap-6 text-center">
              <p className="font-accent text-lg uppercase tracking-[0.45em] lg:text-xl" style={labelStyle}>
                Case Studies
              </p>
              <p className="font-accent text-sm uppercase tracking-[0.35em] lg:text-base" style={labelStyle}>
                {heroServicesLabel}
              </p>
              <h1 className="font-serifalt text-6xl leading-tight lg:text-7xl" style={headingStyle}>
                {caseStudy.title}
              </h1>
            </div>
            <div className="space-y-4 lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/30">
                <img
                  src={caseStudy.coverImage}
                  alt={caseStudy.coverImageAlt}
                  className="h-72 w-full object-cover"
                  loading="lazy"
                />
                <div className="px-6 py-5">
                  <p className="text-xs font-accent uppercase tracking-[0.35em] text-white/70">Outcome</p>
                  <p className="text-lg font-serifalt text-white">{caseStudy.outcome}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="rounded-3xl border border-white/15 bg-white/5 px-6 py-5"
            style={dividerColor}
          >
            <div className="flex flex-wrap gap-6">
              {infoRows.map((row) => (
                <div key={row.label} className="min-w-[160px]">
                  <p className="text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                    {row.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-snug" style={headingStyle}>
                    {row.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {articleSections.length > 0 && (
        <section className="px-6 py-16" style={heroStyle}>
          <div className="mx-auto max-w-6xl space-y-16">
            {articleSections.map((section) => (
              <article
                key={section.id}
                className="gap-10 lg:grid lg:grid-cols-[1.7fr_0.9fr] lg:items-stretch"
              >
                <div className="space-y-4">
                  <p className="font-accent text-sm uppercase tracking-[0.35em]" style={labelStyle}>
                    {section.kicker}
                  </p>
                  <h2 className="font-serifalt text-4xl" style={headingStyle}>
                    {section.title}
                  </h2>
                  <div className="space-y-4 text-base leading-relaxed" style={mutedStyle}>
                    {section.paragraphs.map((paragraph, index) => (
                      <p key={`${section.id}-paragraph-${index}`}>{paragraph}</p>
                    ))}
                  </div>
                </div>
                {section.photo && (
                  <figure className="mt-6 space-y-3 lg:mt-0 lg:flex lg:h-full lg:flex-col lg:justify-center lg:gap-4 lg:self-stretch lg:pl-6">
                    <div className="overflow-hidden rounded-3xl border border-white/10">
                      <img
                        src={section.photo.src}
                        alt={section.photo.alt}
                        className="h-64 w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <figcaption className="text-sm" style={labelStyle}>
                      {section.photo.caption || section.photo.alt || caseStudy.title}
                    </figcaption>
                  </figure>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

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
