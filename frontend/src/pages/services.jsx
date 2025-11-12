import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  Palette,
  Code2,
  Workflow,
  Sparkles,
  ShieldCheck,
  Gauge,
  Users,
  Compass,
  PenTool,
  Rocket,
} from "lucide-react";
import Footer from "../components/Footer";
import StickyHeader from "../components/StickyHeader";
import { Button } from "@/components/ui/button";
import usePageMetadata from "@/hooks/usePageMetadata";

const services = [
  {
    id: "design",
    title: "Brand & Web Design",
    icon: Palette,
    summary:
      "Systems-driven design that translates your brand voice into flexible UI libraries, messaging, and content blocks.",
    deliverables: ["Brand + UI systems", "Responsive layouts & prototypes", "Accessibility + QA"],
    detail: {
      problem: "Most marketing sites feel disjointed because design sprints stop at pretty mockups.",
      solution:
        "I audit the journey, map decisions, and build annotated Figma systems so every page, state, and component is reusable.",
      benefit: "Your team ships faster with visual consistency and messaging that mirrors what customers actually need.",
      useCases: [
        "Launch-ready marketing site with modular hero, offer, and proof sections.",
        "Design ops cleanup covering tokens, typography, and QA workflows for distributed teams.",
        "Brand refresh with playbooks for content, imagery, and motion.",
      ],
      ctaLink: "/portfolio/millie-aesthetics",
    },
    pricing: [
      { label: "Brand system intensive", value: "$4.5K+" },
      { label: "Launch-ready site build", value: "$8K–$12K" },
    ],
  },
  {
    id: "automation",
    title: "Automations & Ops",
    icon: Workflow,
    summary:
      "Low-code plus custom scripts that remove busywork, sync data, and trigger actions when teams need them.",
    deliverables: ["Process mapping", "Zapier/Make builds", "Analytics & AI copilots"],
    detail: {
      problem: "Teams waste hours updating CRMs, compiling reports, and nudging stakeholders manually.",
      solution:
        "We blueprint the workflow, set guardrails, then wire the right mix of Zapier, Make, Supabase, and light APIs.",
      benefit:
        "Ops, sales, and marketing see the same data, automations stay documented, and leadership gets real-time dashboards.",
      useCases: [
        "Nurture automation that syncs leads, Slack alerts, and personalized follow-ups.",
        "Revenue dashboard pulling GA4, Stripe, and warehouse data into one command center.",
        "Internal AI copilots that summarize briefs, QA pull requests, or prep reports.",
      ],
      ctaLink: "/portfolio/ops-automation-suite",
    },
    pricing: [
      { label: "Automation sprint", value: "$3K+" },
      { label: "Ops enablement retainer", value: "$2K+/mo" },
    ],
  },
];

const valueProps = [
  {
    icon: Sparkles,
    title: "Conversion-led creative",
    description: "Messaging, UX, and art direction stay rooted in research so every design move ties back to revenue.",
    stat: "98% satisfaction",
  },
  {
    icon: ShieldCheck,
    title: "Documented delivery",
    description: "Every engagement ships with artifacts—Figma kits, repos, SOPs—so your team can own the work on day one.",
    stat: "24-hour response",
  },
  {
    icon: Gauge,
    title: "Performance obsessed",
    description: "Budgets for speed, accessibility, and SEO live in the scope, not the backlog.",
    stat: "<1s LCP targets",
  },
  {
    icon: Users,
    title: "Embedded collaboration",
    description: "I partner directly with founders, marketing, or ops teams—no account managers or hand-offs.",
    stat: "20+ launches",
  },
];

const comparisonPoints = [
  {
    attribute: "Team structure",
    me: "One partner handling design, code, and automation loops with shared context.",
    others: "Multiple freelancers + extra project management overhead.",
  },
  {
    attribute: "Strategy",
    me: "Discovery, measurement planning, and experimentation are baked into the engagement.",
    others: "Strategy sold separately or skipped entirely.",
  },
  {
    attribute: "Speed",
    me: "Weekly sprints with live Loom updates, async stand-ups, and transparent backlog.",
    others: "Bi-weekly check-ins and surprise scope creep.",
  },
  {
    attribute: "Automation",
    me: "Delivery includes Zapier/Make blueprints, AI copilots, and monitoring.",
    others: "Manual hand-offs that require new tools later.",
  },
];

const processSteps = [
  {
    title: "Align",
    detail: "Kickoff workshop that defines goals, guardrails, and KPIs for design, dev, and ops in one brief.",
    timeframe: "Days 1–3",
    icon: Compass,
  },
  {
    title: "Blueprint",
    detail: "Journey maps, system architecture, and automation diagrams so every service shares the same playbook.",
    timeframe: "Week 1",
    icon: PenTool,
  },
  {
    title: "Co-create",
    detail: "Async reviews on copy, UI, and workflow logic so decisions stick before we ever open the code editor.",
    timeframe: "Week 1–2",
    icon: Users,
  },
  {
    title: "Build & Automate",
    detail: "Components, integrations, and automations stand up together with QA and documentation baked in.",
    timeframe: "Week 2–4",
    icon: Code2,
  },
  {
    title: "Launch & Optimize",
    detail: "Instrumentation, training, and experiment plans keep improvements rolling long after hand-off.",
    timeframe: "Week 4+",
    icon: Rocket,
  },
];

const testimonials = [
  {
    quote:
      "Michael rebuilt our entire funnel—brand, site, and automations—without ever needing to re-explain the vision. Leads tripled in six weeks.",
    author: "Arianna Lopez",
    role: "Founder, Millie Aesthetics",
  },
  {
    quote:
      "He delivered dashboards, playbooks, and code. We finally have one source of truth and a partner who can adjust it in real time.",
    author: "Marcus Reed",
    role: "COO, Atlas Robotics",
  },
];

const clientLogos = [
  "Millie Aesthetics",
  "Atlas Robotics",
  "Northwind Commerce",
  "Harbor Studio",
  "Loop Collective",
  "Beacon Ops",
];

const faqs = [
  {
    question: "How do projects kick off?",
    answer:
      "We start with a discovery call, then a focused workshop to confirm goals, KPIs, and deliverables. A detailed plan follows within 3 business days.",
  },
  {
    question: "What are your pricing models?",
    answer:
      "Most work is project-based or on a monthly retainer. Sprints for audits or prototypes start at $3K, multi-channel launches typically range $8–25K.",
  },
  {
    question: "How many revisions are included?",
    answer:
      "Each milestone has a feedback window with structured async reviews plus one live session. Because we iterate together, revisions stay tight.",
  },
  {
    question: "Who owns the files and code?",
    answer:
      "You do. Figma, repos, automation diagrams, and SOPs are transferred to your accounts with documentation and walk-through Looms.",
  },
  {
    question: "Which tools and stacks do you use?",
    answer:
      "React/Vite, WordPress/Elementor, Framer, Supabase, Zapier, Make, Airtable, GA4, and OpenAI-powered copilots depending on the brief.",
  },
  {
    question: "Can you work with in-house teams?",
    answer:
      "Absolutely. I regularly embed with marketing, product, and ops teams as an extension of the crew—Slack, stand-ups, and all.",
  },
];

export default function ServicesPage({ theme, mainTheme }) {
  const [origin, setOrigin] = useState("");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const totalTestimonials = testimonials.length;

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
    if (!totalTestimonials) {
      return undefined;
    }
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % totalTestimonials);
    }, 6000);
    return () => clearInterval(interval);
  }, [totalTestimonials]);

  const contactTheme = theme?.sections?.contact || theme?.sections?.portfolio;
  const palette = contactTheme?.palette;

  const isNightTheme =
    theme?.page?.bg && mainTheme?.page?.bg ? theme.page.bg === mainTheme.page.bg : false;

  const getTone = (nightValue, dayValue) => (isNightTheme ? nightValue : dayValue);

  const pageStyle = mainTheme?.page
    ? { background: mainTheme.page.bg, color: mainTheme.page.text }
    : undefined;
  const heroStyle = contactTheme ? { background: contactTheme.bg, color: contactTheme.text } : undefined;

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

  const buttonBg = palette?.buttonBg || palette?.button?.bg || palette?.accent || "#111827";
  const buttonText =
    palette?.buttonText || palette?.button?.text || (isNightTheme ? "#F6F8F6" : "#0b0f19");
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
        serviceType: services.map((service) => service.title),
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
    description: "End-to-end design, code, and automations to grow revenue and reduce ops overhead.",
    canonical,
    jsonLd,
  });

  const flagshipServiceIds = ["design", "automation"];
  const flagshipServices = services.filter((service) => flagshipServiceIds.includes(service.id));
  const supportingServices = services.filter((service) => !flagshipServiceIds.includes(service.id));
  const hasSupportingServices = supportingServices.length > 0;
  const handlePrevTestimonial = () => {
    if (!totalTestimonials) return;
    setTestimonialIndex((prev) => (prev - 1 + totalTestimonials) % totalTestimonials);
  };
  const handleNextTestimonial = () => {
    if (!totalTestimonials) return;
    setTestimonialIndex((prev) => (prev + 1) % totalTestimonials);
  };

  return (
    <div className="min-h-screen" style={pageStyle}>
      <StickyHeader theme={theme} forceVisible />

      <section className="px-6 pt-28 pb-20 lg:pt-36" style={heroStyle}>
        <div className="mx-auto flex max-w-5xl flex-col gap-8 text-left">
          <p className="font-accent text-base uppercase tracking-[0.5em] md:text-lg" style={labelStyle}>
            Services
          </p>
          <h1 className="font-serifalt text-5xl leading-tight md:text-6xl" style={headingStyle}>
            Design, development, and automation — all in one partner.
          </h1>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:michaelhanna50@gmail.com?subject=Project%20Proposal">
              <Button
                className="rounded-full px-8 py-4 text-sm font-accent uppercase tracking-[0.3em]"
                style={primaryButtonStyle}
              >
                Get a Proposal
              </Button>
            </a>
            <a
              href="mailto:michaelhanna50@gmail.com?subject=Discovery%20Call"
              className="rounded-full border px-8 py-4 text-sm font-accent uppercase tracking-[0.3em] transition"
              style={secondaryButtonStyle}
            >
              Book a Discovery Call
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:py-20" style={heroStyle} id="services">
        <div className="mx-auto max-w-6xl space-y-12">
          <div>
            <p className="font-accent text-sm uppercase tracking-[0.45em] md:text-base" style={labelStyle}>
              Service overview
            </p>
            <h2 className="mt-3 font-serifalt text-4xl leading-tight md:text-5xl" style={headingStyle}>
              Flagship brand and automation packages tailored to each launch.
            </h2>
          </div>
          <div
            className={`grid gap-10 ${hasSupportingServices ? "lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]" : ""}`}
          >
            <div className="grid gap-8 md:grid-cols-2">
              {flagshipServices.map((service) => {
                const Icon = service.icon;
                return (
                  <article
                    key={service.id}
                    className="flex h-full flex-col rounded-[32px] border border-white/20 bg-white/5 p-8 shadow-2xl backdrop-blur"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className="rounded-full bg-white/10 p-3">
                          <Icon className="h-5 w-5" style={labelStyle} />
                        </span>
                        <h3 className="font-serifalt text-3xl">{service.title}</h3>
                      </div>
                      <span className="rounded-full border px-4 py-1 text-[10px] font-accent uppercase tracking-[0.4em]" style={labelStyle}>
                        Flagship
                      </span>
                    </div>
                    <p className="mt-4 text-base leading-relaxed" style={mutedStyle}>
                      {service.summary}
                    </p>
                    <ul className="mt-6 space-y-2 text-sm" style={mutedStyle}>
                      {service.deliverables.map((deliverable) => (
                        <li key={deliverable} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" style={labelStyle} />
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`#${service.id}-deep-dive`}
                      className="mt-8 inline-flex w-fit items-center rounded-full border px-6 py-2 text-xs font-accent uppercase tracking-[0.3em] transition"
                      style={secondaryButtonStyle}
                    >
                      Explore the deep dive
                    </a>
                  </article>
                );
              })}
            </div>
            {hasSupportingServices && (
              <div className="space-y-8">
                {supportingServices.map((service) => {
                  const Icon = service.icon;
                  return (
                    <article
                      key={service.id}
                      className="flex h-full flex-col rounded-[28px] border border-dashed border-white/30 bg-transparent p-6"
                    >
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-white/10 p-2">
                          <Icon className="h-5 w-5" style={labelStyle} />
                        </span>
                        <div>
                          <p className="text-[11px] font-accent uppercase tracking-[0.45em]" style={labelStyle}>
                            Supporting build
                          </p>
                          <h3 className="font-serifalt text-2xl">{service.title}</h3>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed" style={mutedStyle}>
                        {service.summary}
                      </p>
                      <ul className="mt-4 space-y-2 text-sm" style={mutedStyle}>
                        {service.deliverables.map((deliverable) => (
                          <li key={deliverable} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" style={labelStyle} />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={`#${service.id}-deep-dive`}
                        className="mt-auto inline-flex items-center justify-center rounded-full border px-5 py-2 text-xs font-accent uppercase tracking-[0.3em] transition"
                        style={secondaryButtonStyle}
                      >
                        View delivery details
                      </a>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:py-24" style={heroStyle} id="deep-dive">
        <div className="mx-auto max-w-6xl space-y-12">
          <div>
            <p className="font-accent text-xs uppercase tracking-[0.45em]" style={labelStyle}>
              Deep dives
            </p>
            <h2 className="mt-3 font-serifalt text-4xl leading-tight md:text-5xl" style={headingStyle}>
              Problem → solution → benefit for every service.
            </h2>
          </div>
          <div className="space-y-10">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.id}
                  id={`${service.id}-deep-dive`}
                  className="rounded-3xl border border-white/15 bg-transparent p-8 shadow-2xl backdrop-blur"
                >
                  <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <span className="rounded-full border border-white/20 p-3">
                          <Icon className="h-6 w-6" style={labelStyle} />
                        </span>
                        <h3 className="font-serifalt text-3xl">{service.title}</h3>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-3">
                        {["problem", "solution", "benefit"].map((key) => (
                          <div key={key} className="rounded-2xl border border-white/15 bg-transparent p-4">
                            <p className="text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                              {key}
                            </p>
                            <p className="mt-2 text-sm" style={mutedStyle}>
                              {service.detail[key]}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                          Use cases
                        </p>
                        <ul className="mt-3 space-y-2 text-sm" style={mutedStyle}>
                          {service.detail.useCases.map((useCase) => (
                            <li key={useCase} className="flex items-start gap-2 leading-relaxed">
                              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0" style={labelStyle} />
                              {useCase}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <a
                        href={service.detail.ctaLink}
                        className="inline-flex items-center rounded-full border px-5 py-2 text-xs font-accent uppercase tracking-[0.3em] transition"
                        style={secondaryButtonStyle}
                      >
                        See it in action
                      </a>
                    </div>
                    <div className="flex flex-col justify-between rounded-3xl border border-white/15 bg-transparent p-6">
                      <p className="font-accent text-xs uppercase tracking-[0.45em]" style={labelStyle}>
                        Pricing snapshot
                      </p>
                      <div className="mt-4 space-y-4">
                        {service.pricing.map((price) => (
                          <div key={price.label} className="rounded-2xl border border-white/15 p-4">
                            <p className="text-xs uppercase tracking-[0.35em]" style={labelStyle}>
                              {price.label}
                            </p>
                            <p className="mt-1 text-3xl font-serifalt">{price.value}</p>
                          </div>
                        ))}
                      </div>
                      <p className="mt-6 text-sm" style={subtleTextStyle}>
                        Pricing ranges cover typical sprints and retainers. I&apos;ll scope a fixed bid once we
                        lock your goals, owners, and timelines.
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:py-20" style={heroStyle} id="value">
        <div className="mx-auto max-w-6xl space-y-10">
          <div>
            <p className="font-accent text-xs uppercase tracking-[0.45em]" style={labelStyle}>
              Why choose me
            </p>
            <h2 className="mt-3 font-serifalt text-4xl leading-tight md:text-5xl" style={headingStyle}>
              End-to-end delivery, automation expertise, and measurable outcomes.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {valueProps.map((prop) => {
              const Icon = prop.icon;
              return (
                <div key={prop.title} className="rounded-3xl border border-white/15 bg-transparent p-6">
                  <div className="flex items-center gap-4">
                    <span className="rounded-full border border-white/20 p-3">
                      <Icon className="h-5 w-5" style={labelStyle} />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em]" style={labelStyle}>
                        {prop.stat}
                      </p>
                      <h3 className="font-serifalt text-2xl">{prop.title}</h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm" style={mutedStyle}>
                    {prop.description}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="rounded-3xl border border-white/15 bg-transparent p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {comparisonPoints.map((point) => (
                <div key={point.attribute} className="rounded-2xl border border-white/15 bg-transparent p-5">
                  <p className="text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                    {point.attribute}
                  </p>
                  <p className="mt-2 text-sm font-semibold" style={headingStyle}>
                    You get: <span className="font-normal" style={mutedStyle}>{point.me}</span>
                  </p>
                  <div className="mt-3 rounded-xl border border-white/15 p-3 text-sm" style={subtleTextStyle}>
                    Typical alternative: {point.others}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:py-20" style={heroStyle} id="process">
        <div className="mx-auto max-w-6xl space-y-10">
          <div>
            <p className="font-accent text-xs uppercase tracking-[0.45em]" style={labelStyle}>
              Process
            </p>
            <h2 className="mt-3 font-serifalt text-4xl leading-tight md:text-5xl" style={headingStyle}>
              One five-step playbook that adapts to every service.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-5">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.35em]" style={labelStyle}>
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <Icon className="h-4 w-4" style={labelStyle} />
                    <h3 className="font-serifalt text-xl">{step.title}</h3>
                  </div>
                  <p className="mt-2 text-sm" style={mutedStyle}>
                    {step.detail}
                  </p>
                  <p className="mt-3 text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                    {step.timeframe}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:py-20" style={heroStyle}>
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <p className="font-accent text-xs uppercase tracking-[0.45em]" style={labelStyle}>
                Testimonials
              </p>
              <div className="space-y-4">
                <div className="relative h-[380px] overflow-hidden rounded-3xl border border-white/15">
                  <div
                    className="absolute inset-0 flex flex-col transition-transform duration-700 ease-in-out"
                    style={{
                      height: `${Math.max(totalTestimonials, 1) * 100}%`,
                      transform: `translateY(-${totalTestimonials ? (testimonialIndex / totalTestimonials) * 100 : 0}%)`,
                    }}
                  >
                    {testimonials.map((testimonial) => (
                      <blockquote
                        key={testimonial.author}
                        className="flex h-full flex-col justify-between gap-4 p-8"
                        style={{ minHeight: "100%" }}
                      >
                        <p className="text-lg leading-relaxed" style={headingStyle}>
                          “{testimonial.quote}”
                        </p>
                        <div>
                          <p className="text-sm font-semibold">{testimonial.author}</p>
                          <p className="text-xs uppercase tracking-[0.35em]" style={labelStyle}>
                            {testimonial.role}
                          </p>
                        </div>
                      </blockquote>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                    {String(testimonialIndex + 1).padStart(2, "0")} /{" "}
                    {String(totalTestimonials).padStart(2, "0")}
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      aria-label="View previous testimonial"
                      className="rounded-full border px-4 py-2 text-xs font-accent uppercase tracking-[0.3em]"
                      style={secondaryButtonStyle}
                      onClick={handlePrevTestimonial}
                    >
                      Up
                    </button>
                    <button
                      type="button"
                      aria-label="View next testimonial"
                      className="rounded-full border px-4 py-2 text-xs font-accent uppercase tracking-[0.3em]"
                      style={secondaryButtonStyle}
                      onClick={handleNextTestimonial}
                    >
                      Down
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-white/15 bg-transparent p-6">
              <p className="font-accent text-xs uppercase tracking-[0.45em]" style={labelStyle}>
                Trusted by small businesses & creators
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm font-semibold" style={subtleTextStyle}>
                {clientLogos.map((client) => (
                  <div
                    key={client}
                    className="rounded-2xl border border-dashed border-white/20 px-4 py-3 text-center"
                  >
                    {client}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:py-20" style={heroStyle} id="faq">
        <div className="mx-auto max-w-5xl space-y-6">
          <div>
            <p className="font-accent text-xs uppercase tracking-[0.45em]" style={labelStyle}>
              FAQ
            </p>
            <h2 className="mt-3 font-serifalt text-4xl leading-tight md:text-5xl" style={headingStyle}>
              Answers before we even hop on a call.
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <summary className="cursor-pointer list-none font-serifalt text-xl">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed" style={mutedStyle}>
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="flex items-center px-6 py-24 lg:py-32" style={heroStyle}>
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-5 text-center">
          <p className="font-serifalt text-4xl leading-tight md:text-5xl" style={headingStyle}>
            Ready to start your project?
          </p>
          <p className="text-base" style={mutedStyle}>
            One partner for research, design, development, and automation. Tell me what you&apos;re building and
            we&apos;ll map the plan together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:michaelhanna50@gmail.com?subject=Get%20a%20Quote">
              <Button
                className="rounded-full px-8 py-4 text-sm font-accent uppercase tracking-[0.3em]"
                style={primaryButtonStyle}
              >
                Get a Quote
              </Button>
            </a>
            <a
              href="mailto:michaelhanna50@gmail.com?subject=Discovery%20Call"
              className="rounded-full border px-8 py-4 text-sm font-accent uppercase tracking-[0.3em] transition"
              style={secondaryButtonStyle}
            >
              Book a Call
            </a>
          </div>
        </div>
      </section>

      <Footer theme={theme} mainTheme={mainTheme} />
    </div>
  );
}
