import React, { useEffect, useState } from "react";
import { CheckCircle2, Palette, Code2, Workflow, Search } from "lucide-react";
import Footer from "../components/Footer";
import StickyHeader from "../components/StickyHeader";
import { Button } from "@/components/ui/button";
import usePageMetadata from "@/hooks/usePageMetadata";

const servicePillars = [
  {
    id: "design",
    title: "Brand & Web Design",
    icon: Palette,
    description:
      "Systems-driven design that translates your voice into UI kits, components, and content that scale.",
    deliverables: ["UX research & audits", "UI kits & design systems", "Accessibility + QA"],
    outcomes: ["Higher trust", "Better conversion", "Consistent identity"],
    learnMore:
      "Every design engagement ships with annotated Figma systems, responsive states, and docs so hand-offs stay clean.",
    link: "/portfolio/millie-aesthetics",
  },
  {
    id: "development",
    title: "Web Development",
    icon: Code2,
    description:
      "Production-ready builds in React/Vite, WordPress/Elementor, or Framer with performance budgets baked in.",
    deliverables: ["Component libraries", "API integrations", "Performance + SEO"],
    outcomes: ["Faster loads", "Maintainable code", "Search-ready content"],
    learnMore:
      "I build with reusable components, modern tooling, and instrumentation so you can iterate without regressions.",
    link: "/portfolio/american-craftsman",
  },
  {
    id: "automation",
    title: "Automations & Ops",
    icon: Workflow,
    description:
      "Low-code + custom scripts that remove busywork, sync data, and trigger actions when teams need them.",
    deliverables: ["Process mapping", "Zapier/Make builds", "AI copilots & scripts"],
    outcomes: ["Time saved", "Cleaner hand-offs", "Traceable ops"],
    learnMore:
      "Map the workflow, define guardrails, then wire the right mix of Zapier, Make, and lightweight APIs.",
    link: "/portfolio/ops-automation-suite",
  },
  {
    id: "seo",
    title: "SEO & Analytics",
    icon: Search,
    description:
      "Technical SEO, schema, and GA4 dashboards that connect rankings to revenue and retention.",
    deliverables: ["Technical sweeps", "Content strategy", "Analytics & CRO"],
    outcomes: ["Qualified traffic", "Better insights", "Measured experiments"],
    learnMore:
      "From schema to dashboards, everything is documented so in-house teams can keep iterating with guardrails.",
    link: "/blog",
  },
];

const whyPairs = [
  {
    pain: "Inconsistent branding",
    outcome: "Cohesive systems that match every touchpoint.",
  },
  {
    pain: "Slow site / poor UX",
    outcome: "Performance budgets and UX standards that convert.",
  },
  {
    pain: "Manual busywork",
    outcome: "Automated workflows and dashboards with context.",
  },
];

const processSteps = [
  { title: "Discover", detail: "Research, audits, goals", timeframe: "Week 1" },
  { title: "Define", detail: "Roadmap, success metrics", timeframe: "Week 1–2" },
  { title: "Design", detail: "Systems, UI, content", timeframe: "Week 2–4" },
  { title: "Build", detail: "Development & QA", timeframe: "Week 3–5" },
  { title: "Launch & Optimize", detail: "Hand-off, automation, CRO", timeframe: "Week 5–6+" },
];

const packages = [
  {
    title: "Project-Based",
    description: "Best for launches or redesigns with clear scopes.",
    timeline: "4–8 weeks",
    idealFor: "Founders, marketing teams, product leaders",
    highlights: ["Fixed outcomes", "Weekly checkpoints", "QA + documentation"],
  },
  {
    title: "Retainer",
    description: "Ongoing design/dev/automation support in monthly cycles.",
    timeline: "Quarterly",
    idealFor: "Teams that need a flexible builder on tap",
    highlights: ["Prioritized roadmap", "Shared KPI dashboard", "Flexible mix of services"],
  },
  {
    title: "Sprint & Workshops",
    description: "Rapid audits, prototypes, or automation pilots.",
    timeline: "1–2 weeks",
    idealFor: "Teams testing ideas or unblocking ops",
    highlights: ["Actionable brief", "Clickable prototype", "Implementation plan"],
  },
];

const faqs = [
  {
    question: "How quickly can we start?",
    answer:
      "Discovery calls happen within a week. Once scope is aligned, kickoff typically begins within 1–2 weeks.",
  },
  {
    question: "Which tools do you build in?",
    answer:
      "React/Vite, WordPress/Elementor, Framer, Supabase, Zapier, Make, Airtable, GA4, and OpenAI-powered scripts.",
  },
  {
    question: "Do you provide strategy or only execution?",
    answer:
      "Every engagement includes strategy, measurement planning, and implementation, so there’s a clear line to impact.",
  },
  {
    question: "What do hand-offs look like?",
    answer:
      "Design systems live in Figma with documentation. Code lives in Git with deployment scripts, and automations ship with diagrams + SOPs.",
  },
  {
    question: "Can you partner with in-house teams?",
    answer:
      "Yes. I regularly embed with marketing, product, and ops teams as an extension of the crew.",
  },
  {
    question: "Do you offer maintenance?",
    answer:
      "Yes—either as a lightweight retainer or a quarterly optimization sprint depending on needs.",
  },
];

export default function ServicesPage({ theme, mainTheme }) {
  const [openPillar, setOpenPillar] = useState(null);
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

  const contactTheme = theme?.sections?.contact || theme?.sections?.portfolio;
  const palette = contactTheme?.palette;

  const isNightTheme =
    theme?.page?.bg && mainTheme?.page?.bg
      ? theme.page.bg === mainTheme.page.bg
      : false;

  const getTone = (nightValue, dayValue) => (isNightTheme ? nightValue : dayValue);

  const pageStyle = mainTheme?.page
    ? { background: mainTheme.page.bg, color: mainTheme.page.text }
    : undefined;
  const heroStyle = contactTheme
    ? { background: contactTheme.bg, color: contactTheme.text }
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
  const subtleTextStyle = {
    color: getTone("rgba(246,248,246,0.62)", "#4b5563"),
  };

  const buttonBg =
    palette?.buttonBg ||
    palette?.button?.bg ||
    palette?.accent ||
    "#111827";
  const buttonText =
    palette?.buttonText ||
    palette?.button?.text ||
    (isNightTheme ? "#F6F8F6" : "#0b0f19");
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

  const canonical = origin ? `${origin}/services` : undefined;
  const jsonLd = origin
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Web Design, Development & Automation",
        provider: {
          "@type": "Person",
          name: "Michael Hanna",
        },
        url: canonical,
        areaServed: "Remote · US",
        serviceType: [
          "Brand & Web Design",
          "Web Development",
          "Automations & Ops",
          "SEO & Analytics",
        ],
        offers: {
          "@type": "Offer",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "USD",
            price: "Custom",
            description: "Project-based, retainers, and sprint-based engagements.",
          },
          availability: "https://schema.org/InStock",
        },
      }
    : null;

  usePageMetadata({
    title: "Services | Web Design, Development & Automation",
    description:
      "End-to-end design, code, and automations to grow revenue and reduce ops overhead.",
    canonical,
    jsonLd,
  });

  return (
    <div className="min-h-screen" style={pageStyle}>
      <StickyHeader theme={theme} forceVisible />
      <section className="px-6 pt-28 pb-20 lg:pt-36" style={heroStyle}>
        <div className="mx-auto flex max-w-4xl flex-col gap-8 text-center">
          <p
            className="font-accent text-sm uppercase tracking-[0.45em] text-center md:text-base"
            style={labelStyle}
          >
            Services
          </p>
          <h1
            className="font-serifalt text-5xl leading-tight md:text-6xl mx-auto max-w-3xl text-left"
            style={headingStyle}
          >
            Design, Development & Automation — All in One Partner.
          </h1>
        </div>
      </section>

      <section className="px-6 py-16 lg:py-24" style={heroStyle} id="pillars">
        <div className="mx-auto max-w-6xl space-y-12">
          <div>
            <p
              className="font-accent text-xs uppercase tracking-[0.45em]"
              style={labelStyle}
            >
              Service pillars
            </p>
            <h2 className="mt-3 font-serifalt text-5xl leading-tight md:text-6xl" style={headingStyle}>
              The workbench stays the same — the mix is tailored.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {servicePillars.map((pillar) => {
              const Icon = pillar.icon;
              const isOpen = openPillar === pillar.id;
              return (
                <article
                  key={pillar.id}
                  className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl transition hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4">
                    <span className="rounded-full bg-white/10 p-3">
                      <Icon className="h-5 w-5" style={labelStyle} />
                    </span>
                    <div>
                      <h3 className="font-serifalt text-2xl">{pillar.title}</h3>
                      <p className="text-sm" style={mutedStyle}>
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                      Deliverables
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {pillar.deliverables.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs"
                          style={subtleTextStyle}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                      Outcomes
                    </p>
                    <ul className="space-y-1 text-sm" style={mutedStyle}>
                      {pillar.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" style={labelStyle} />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-full border px-4 py-2 text-xs font-accent uppercase tracking-[0.3em] transition"
                    style={secondaryButtonStyle}
                    onClick={() => setOpenPillar(isOpen ? null : pillar.id)}
                    aria-expanded={isOpen}
                  >
                    Learn more
                  </button>
                  {isOpen && (
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm" style={mutedStyle}>
                      <p>{pillar.learnMore}</p>
                      <a
                        href={pillar.link}
                        className="mt-4 inline-flex rounded-full border px-4 py-2 text-xs font-accent uppercase tracking-[0.3em] transition"
                        style={secondaryButtonStyle}
                      >
                        See example
                      </a>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-16" style={heroStyle}>
        <div className="mx-auto max-w-6xl space-y-8">
          <div>
            <p className="font-accent text-xs uppercase tracking-[0.45em]" style={labelStyle}>
              Why this matters
            </p>
            <h2 className="mt-3 font-serifalt text-5xl leading-tight md:text-6xl" style={headingStyle}>
              Pain points paired to measurable outcomes.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {whyPairs.map((pair) => (
              <div key={pair.pain} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.35em]" style={labelStyle}>
                  Pain
                </p>
                <p className="mt-2 font-serifalt text-xl">{pair.pain}</p>
                <div className="my-4 border-t border-white/10" />
                <p className="text-sm uppercase tracking-[0.35em]" style={labelStyle}>
                  Outcome
                </p>
                <p className="mt-2" style={mutedStyle}>
                  {pair.outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:py-24" style={heroStyle} id="process">
        <div className="mx-auto max-w-6xl space-y-10">
          <div>
            <p className="font-accent text-xs uppercase tracking-[0.45em]" style={labelStyle}>
              How I work
            </p>
            <h2 className="mt-3 font-serifalt text-5xl leading-tight md:text-6xl" style={headingStyle}>
              A five-step playbook with clear timelines.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-5">
            {processSteps.map((step, index) => (
              <div key={step.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.35em]" style={labelStyle}>
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-serifalt text-xl">{step.title}</h3>
                <p className="mt-2 text-sm" style={mutedStyle}>
                  {step.detail}
                </p>
                <p className="mt-3 text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                  {step.timeframe}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16" style={heroStyle}>
        <div className="mx-auto max-w-6xl space-y-12">
          <div>
            <p className="font-accent text-xs uppercase tracking-[0.45em]" style={labelStyle}>
              Packages
            </p>
            <h2 className="mt-3 font-serifalt text-5xl leading-tight md:text-6xl" style={headingStyle}>
              Engagement models that fit how you operate.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {packages.map((pkg) => (
              <div key={pkg.title} className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-serifalt text-2xl">{pkg.title}</h3>
                <p className="mt-2" style={mutedStyle}>
                  {pkg.description}
                </p>
                <div className="mt-4 space-y-2 text-sm" style={subtleTextStyle}>
                  <p>Timeline: {pkg.timeline}</p>
                  <p>Ideal for: {pkg.idealFor}</p>
                </div>
                <ul className="mt-4 space-y-2 text-sm" style={mutedStyle}>
                  {pkg.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" style={labelStyle} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:michaelhanna50@gmail.com"
                  className="mt-auto inline-flex items-center justify-center rounded-full border px-5 py-2 text-xs font-accent uppercase tracking-[0.3em] transition"
                  style={secondaryButtonStyle}
                >
                  Discuss fit
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16" style={heroStyle}>
        <div className="mx-auto max-w-5xl space-y-6">
          <div>
            <p className="font-accent text-xs uppercase tracking-[0.45em]" style={labelStyle}>
              FAQ
            </p>
            <h2 className="mt-3 font-serifalt text-5xl leading-tight md:text-6xl" style={headingStyle}>
              Details before we kick off.
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-3xl border border-white/10 bg-white/5 p-5"
              >
                <summary className="cursor-pointer list-none font-serifalt text-xl">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm" style={mutedStyle}>
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24" style={heroStyle}>
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-3xl border border-white/10 bg-black/30 p-10 text-center">
          <p className="font-serifalt text-5xl leading-tight md:text-6xl" style={headingStyle}>
            Tell me about your project.
          </p>
          <p style={mutedStyle}>
            Top and bottom CTAs keep things easy: email, calendar, or review the work.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:michaelhanna50@gmail.com">
              <Button
                className="rounded-full px-8 py-4 text-sm font-accent uppercase tracking-[0.3em]"
                style={primaryButtonStyle}
              >
                Start a Project
              </Button>
            </a>
            <a
              href="/portfolio"
              className="rounded-full border px-8 py-4 text-sm font-accent uppercase tracking-[0.3em] transition"
              style={secondaryButtonStyle}
            >
              See the Work
            </a>
          </div>
        </div>
      </section>

      <Footer theme={theme} mainTheme={mainTheme} />
    </div>
  );
}
