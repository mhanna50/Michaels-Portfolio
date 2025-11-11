import React, { useEffect, useMemo, useState } from "react";
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

  const pageStyle = mainTheme?.page
    ? { background: mainTheme.page.bg, color: mainTheme.page.text }
    : undefined;
  const sectionTheme = theme?.sections?.portfolio;
  const palette = sectionTheme?.palette;
  const heroStyle = sectionTheme
    ? { background: sectionTheme.bg, color: sectionTheme.text }
    : undefined;
  const headingStyle = palette?.heading ? { color: palette.heading } : undefined;
  const mutedStyle = palette?.muted ? { color: palette.muted } : undefined;

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
    description: caseStudy
      ? caseStudy.summary
      : "The requested case study could not be found.",
    canonical,
    jsonLd,
  });

  if (!caseStudy) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center space-y-6" style={pageStyle}>
        <StickyHeader theme={theme} forceVisible />
        <h1 className="font-serifalt text-4xl">Case study coming soon.</h1>
        <p className="text-white/80">Check the portfolio index for available projects.</p>
        <a
          href="/portfolio"
          className="rounded-full border border-white/30 px-8 py-3 text-xs font-accent uppercase tracking-[0.3em]"
        >
          Back to Portfolio
        </a>
      </div>
    );
  }

  const relatedStudies = caseStudy.related
    .map((relatedSlug) => portfolioCaseStudies.find((study) => study.slug === relatedSlug))
    .filter(Boolean);

  const galleryTabs = Object.entries(caseStudy.gallery || {}).filter(
    ([, images]) => Array.isArray(images) && images.length > 0
  );

  return (
    <div className="min-h-screen" style={pageStyle}>
      <StickyHeader theme={theme} forceVisible />
      <section className="px-6 pt-24 pb-16 lg:pt-32" style={heroStyle}>
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            <p className="font-accent text-xs uppercase tracking-[0.4em]" style={mutedStyle}>
              {caseStudy.heroSummary}
            </p>
            <h1 className="font-serifalt text-5xl leading-tight" style={headingStyle}>
              {caseStudy.title}
            </h1>
            <p className="font-serifalt text-lg text-white/80">{caseStudy.summary}</p>
            <div className="flex flex-wrap gap-4">
              {caseStudy.heroKpis.map((kpi) => (
                <span
                  key={kpi.label}
                  className="rounded-full border border-white/30 px-4 py-2 text-xs font-accent uppercase tracking-[0.3em] text-white/80"
                >
                  {kpi.value} · {kpi.label}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:michaelhanna50@gmail.com">
                <Button className="rounded-full px-8 py-4 text-sm font-accent uppercase tracking-[0.3em]">
                  Start a Similar Project
                </Button>
              </a>
              <a
                href="/services"
                className="rounded-full border border-white/30 px-8 py-4 text-sm font-accent uppercase tracking-[0.3em] text-white/80 transition hover:text-white"
              >
                View Services
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/30">
            <img
              src={caseStudy.coverImage}
              alt={caseStudy.coverImageAlt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-16" style={heroStyle}>
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="font-accent text-xs uppercase tracking-[0.35em] text-white/60">Project summary</h2>
            <dl className="space-y-3 text-sm text-white/80">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <dt>Client</dt>
                <dd>{caseStudy.client}</dd>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <dt>Year</dt>
                <dd>{caseStudy.year}</dd>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <dt>Industry</dt>
                <dd>{caseStudy.industry.join(", ")}</dd>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <dt>Services</dt>
                <dd>{caseStudy.services.join(" · ")}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Platform</dt>
                <dd>{caseStudy.platform.join(" · ")}</dd>
              </div>
            </dl>
          </div>
          <div className="space-y-6">
            <p className="font-serifalt text-lg text-white/85">
              {caseStudy.challenge}
            </p>
            <p className="text-white/75">{caseStudy.strategy}</p>
            <p className="text-white/75">{caseStudy.solution}</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16" style={heroStyle}>
        <div className="mx-auto max-w-6xl space-y-8">
          <h2 className="font-serifalt text-4xl" style={headingStyle}>
            Challenge → Strategy → Solution
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Challenge", body: caseStudy.challenge },
              { title: "Strategy", body: caseStudy.strategy },
              { title: "Solution", body: caseStudy.solution },
            ].map((block) => (
              <div key={block.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs font-accent uppercase tracking-[0.35em] text-white/60">
                  {block.title}
                </p>
                <p className="mt-3 text-sm text-white/80">{block.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {galleryTabs.length > 0 && (
        <section className="px-6 py-16" style={heroStyle}>
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="flex flex-col gap-3">
              <p className="font-accent text-xs uppercase tracking-[0.4em] text-white/70">Process Gallery</p>
              <h2 className="font-serifalt text-4xl" style={headingStyle}>
                Wireframes, UI, build, automations.
              </h2>
            </div>
            <Tabs defaultValue={galleryTabs[0][0]} className="space-y-6">
              <TabsList className="flex flex-wrap gap-3">
                {galleryTabs.map(([phase]) => (
                  <TabsTrigger
                    key={phase}
                    value={phase}
                    className="rounded-full border border-white/10 px-5 py-2 text-xs font-accent uppercase tracking-[0.3em]"
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
                        <figcaption className="text-sm text-white/70">{image.caption}</figcaption>
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
            <p className="font-accent text-xs uppercase tracking-[0.4em] text-white/70">Outcomes</p>
            <h2 className="font-serifalt text-4xl" style={headingStyle}>
              KPIs with measurement context.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {caseStudy.kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">{kpi.label}</p>
                <p className="mt-2 text-4xl font-serifalt" style={headingStyle}>
                  {kpi.value}
                </p>
                <p className="text-xs text-white/60">
                  {kpi.timeframe} · {kpi.source}
                </p>
                <p className="mt-4 text-sm text-white/75">{kpi.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16" style={heroStyle}>
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="font-accent text-xs uppercase tracking-[0.35em] text-white/60">
              Tech Stack
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {caseStudy.stack.map((item) => (
                <span key={item} className="rounded-full border border-white/10 px-4 py-1 text-xs text-white/80">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="font-accent text-xs uppercase tracking-[0.35em] text-white/60">
              Automations
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {caseStudy.automations.map((item) => (
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
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-2xl font-serifalt text-white/90">
              “{caseStudy.testimonial.quote}”
            </p>
            <p className="mt-4 text-sm text-white/70">
              — {caseStudy.testimonial.name}, {caseStudy.testimonial.role} · {caseStudy.testimonial.company}
            </p>
          </div>
        </section>
      )}

      <section className="px-6 py-16" style={heroStyle}>
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-accent text-xs uppercase tracking-[0.4em] text-white/70">Related work</p>
              <h2 className="font-serifalt text-4xl" style={headingStyle}>
                More projects in this lane.
              </h2>
            </div>
            <a
              href="/portfolio"
              className="rounded-full border border-white/30 px-8 py-3 text-xs font-accent uppercase tracking-[0.3em] text-white/80"
            >
              Back to Portfolio
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {relatedStudies.map((study) => (
              <article key={study.slug} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">{study.heroSummary}</p>
                <h3 className="mt-2 font-serifalt text-2xl">{study.title}</h3>
                <p className="mt-3 text-sm text-white/80">{study.summary}</p>
                <a
                  href={`/portfolio/${study.slug}`}
                  className="mt-4 inline-flex rounded-full border border-white/30 px-4 py-2 text-xs font-accent uppercase tracking-[0.3em] text-white/80 transition hover:border-white hover:text-white"
                >
                  View case study
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24" style={heroStyle}>
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-3xl border border-white/10 bg-black/30 p-10 text-center">
          <p className="font-serifalt text-4xl" style={headingStyle}>
            Let’s build your case study next.
          </p>
          <p className="text-white/80">
            Conversion-ready CTAs at the top and bottom keep the path clear.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:michaelhanna50@gmail.com">
              <Button className="rounded-full px-8 py-4 text-sm font-accent uppercase tracking-[0.3em]">
                Start a Project
              </Button>
            </a>
            <a
              href="/services"
              className="rounded-full border border-white/30 px-8 py-4 text-sm font-accent uppercase tracking-[0.3em] text-white/80 transition hover:text-white"
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
