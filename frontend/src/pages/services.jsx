import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
    title: "Web Design & Branding & SEO",
    icon: Palette,
    summary:
      "Design that translates your brand voice into visually appealing UI, messaging, and content.",
    deliverables: ["Brand + UI systems", "Responsive layouts", "Accessibility + Discoverability"],
    detail: {
      problem:
        "An outdated or DIY site, inconsistent branding, or zero Google visibility chips away at trust so leads leave before reaching out.",
      solution:
        "I create a modern, custom site with clear messaging, cohesive branding, and SEO basics so people can find you and know exactly how to contact you.",
      benefit:
        "You look professional, attract better-fit clients, build trust quickly, and turn more visitors into inquiries or bookings.",
      useCases: [
        "Med spa upgrades a basic template into a polished site with services, proof, and online booking—resulting in steady inquiries.",
        "Local contractor refreshes branding and adds SEO-friendly service pages so nearby homeowners call without needing referrals.",
      ],
      ctaLink: "/portfolio/millie-aesthetics",
    },
    pricing: [
      { label: "Custom website projects", value: "Start at $1,500 (final scope tailored to your needs)" },
    ],
  },
  {
    id: "automation",
    title: "Automations",
    icon: Workflow,
    summary:
      "Low-code plus custom workflows that remove busywork, perform tasks, and trigger actions when teams need them.",
    deliverables: ["General Autmations", "Zapier/Make builds", "Analytics & AI copilots"],
    detail: {
      problem:
        "You're juggling calls, leads, reminders, and admin tasks manually, so follow-ups slip and the to-do list keeps you up at night.",
      solution:
        "I set up always-on automations—AI receptionist, follow-up flows, reminders, and admin workflows—that quietly handle the busywork for you.",
      benefit:
        "You get more time, less stress, fewer missed opportunities, and a clearer view of what's happening inside your business.",
      useCases: [
        "Contractor automatically responds to every inquiry, books estimates without phone tag, and keeps clients updated through each step.",
        "Med spa greets website leads instantly, confirms appointments, and nudges no-shows without anyone on the team chasing them.",
      ],
      ctaLink: "/portfolio/personal-portfolio",
    },
    pricing: [
      { label: "Automation packages", value: "Start at $299/month + one-time setup for custom workflows" },
    ],
  },
];

const valueProps = [
  {
    icon: Sparkles,
    title: "One partner start to finish",
    description: "Strategy, copy, design, build, and automation happen with the same point of contact—no juggling agencies.",
    stat: "Hands-on partner",
  },
  {
    icon: ShieldCheck,
    title: "Documented systems",
    description: "Loom walk-throughs, checklists, and editable files mean you own the site and automations on day one.",
    stat: "Own it all",
  },
  {
    icon: Gauge,
    title: "Steady progress",
    description: "Weekly updates and quick replies keep the work moving without long pauses or guesswork.",
    stat: "Weekly check-ins",
  },
  {
    icon: Users,
    title: "Plain-language collaboration",
    description: "We talk like real people, focus on outcomes, and make decisions without jargon.",
    stat: "No jargon",
  },
];

const comparisonPoints = [
  {
    attribute: "Communication",
    me: "Weekly Loom recaps and a shared task board so you always know what's done and what's next.",
    others: "Long silences and vague updates until you chase someone down.",
  },
  {
    attribute: "Scope",
    me: "Design, build, and automations are scoped together so nothing falls between teams.",
    others: "Different vendors for each task, which means slower timelines and extra costs.",
  },
  {
    attribute: "Handoff",
    me: "Every workflow ships with SOPs, logins, and documentation stored in your accounts.",
    others: "You get screenshots and a goodbye email with no clear way to maintain the work.",
  },
  {
    attribute: "Support",
    me: "Fast answers and small fixes even after launch so momentum continues.",
    others: "Support tickets and delays for even tiny changes.",
  },
];

const processSteps = [
  {
    title: "Kickoff roadmap",
    detail: "We spend a focused session clarifying offers, goals, and what success looks like in plain language.",
    timeframe: "Days 1-2",
    icon: Compass,
  },
  {
    title: "Blueprint & content",
    detail: "I map site structure, messaging, and workflow steps so you can react quickly without digging through docs.",
    timeframe: "Week 1",
    icon: PenTool,
  },
  {
    title: "Co-create visuals",
    detail: "You review real layouts, copy, and automation diagrams through async Looms or short calls.",
    timeframe: "Week 1-2",
    icon: Users,
  },
  {
    title: "Build & automate",
    detail: "I handle the site, components, and automations while you track progress in one shared checklist.",
    timeframe: "Weeks 2-3",
    icon: Code2,
  },
  {
    title: "Launch & support",
    detail: "Testing, training, and light support help you run everything confidently after go-live.",
    timeframe: "Week 4+",
    icon: Rocket,
  },
];

const testimonials = [
  {
    quote:
      "Michael rebuilt our entire funnel—brand, site, and automations—without ever needing to re-explain the vision. Leads tripled in six weeks.",
    author: "Arianna Lopez",
    title: "Founder",
    company: "Millie Aesthetics",
  },
  {
    quote:
      "He delivered dashboards, playbooks, and code. We finally have one source of truth and a partner who can adjust it in real time.",
    author: "Marcus Reed",
    title: "COO",
    company: "Atlas Robotics",
  },
];

const faqs = [
  {
    question: "How do projects kick off?",
    answer:
      "We start with a planning call to confirm your goals, audience, and priorities. Within a couple of days you get a simple roadmap so you know what happens first.",
  },
  {
    question: "How long does everything take?",
    answer:
      "Most website plus automation builds wrap in 4-6 weeks. Smaller automation-only packages can launch sooner. You get weekly updates either way.",
  },
  {
    question: "Do I need to be technical?",
    answer:
      "Nope. I translate every decision into plain language and show you short Looms so you can review without wading through jargon.",
  },
  {
    question: "How many revisions do we get?",
    answer:
      "Each milestone includes async comments plus at least one live session. We keep adjusting until the agreed scope matches what you need.",
  },
  {
    question: "Who owns the files and logins?",
    answer:
      "You do. Sites, automations, brand files, and SOPs live in your accounts with notes on how to make updates later.",
  },
  {
    question: "Can you work with my existing team?",
    answer:
      "Absolutely. I'm comfortable joining your Slack, meeting cadence, or project tools so everything feels like one team instead of another vendor.",
  },
];

export default function ServicesPage({ theme, mainTheme }) {
  const [origin, setOrigin] = useState("");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonialRefs = useRef([]);
  const [testimonialHeight, setTestimonialHeight] = useState(320);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const totalTestimonials = testimonials.length;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const updateHeight = () => {
      const nodes = testimonialRefs.current || [];
      const heights = nodes.map((node) => node?.scrollHeight || 0).filter((height) => height > 0);
      const tallest = heights.length ? Math.max(...heights) : 300;
      setTestimonialHeight((prev) => {
        if (Math.abs(prev - tallest) <= 2) return prev;
        return tallest;
      });
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [totalTestimonials]);

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
  const themeAccentHex = (theme?.accent || "").toLowerCase();
  const isCloudyTheme = themeAccentHex === "#7a8896";

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
  const defaultBorderColors = {
    strong: getTone("rgba(255,255,255,0.28)", "rgba(47,42,36,0.35)"),
    base: getTone("rgba(255,255,255,0.2)", "rgba(47,42,36,0.28)"),
    soft: getTone("rgba(255,255,255,0.14)", "rgba(47,42,36,0.22)"),
    faint: getTone("rgba(255,255,255,0.1)", "rgba(47,42,36,0.18)"),
    dashed: getTone("rgba(255,255,255,0.24)", "rgba(47,42,36,0.32)"),
  };
  const cloudyBorderOverrides = isCloudyTheme
    ? {
        strong: "rgba(255,255,255,0.55)",
        base: "rgba(255,255,255,0.4)",
        soft: "rgba(255,255,255,0.28)",
        faint: "rgba(255,255,255,0.22)",
        dashed: "rgba(255,255,255,0.45)",
      }
    : {};
  const borderColors = { ...defaultBorderColors, ...cloudyBorderOverrides };

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

      <section className="flex min-h-[70vh] flex-col justify-center px-6 pt-28 pb-20 lg:pt-36 lg:pb-24" style={heroStyle}>
        <div className="mx-auto flex max-w-5xl flex-col gap-12 text-left">
          <p className="font-accent text-lg uppercase tracking-[0.5em] md:text-2xl" style={labelStyle}>
            Services
          </p>
          <h1 className="font-serifalt text-5xl leading-tight md:text-6xl" style={headingStyle}>
            Design, development, and automation — all in one partner.
          </h1>
          <div className="flex flex-wrap gap-4">
            <Link to="/portfolio">
              <Button
                className="rounded-full px-8 py-4 text-sm font-accent uppercase tracking-[0.3em]"
                style={primaryButtonStyle}
              >
                View Portfolio
              </Button>
            </Link>
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
              Brand and automation packages tailored to each launch.
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
                    style={{ borderColor: borderColors.strong }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="rounded-full bg-white/10 p-3">
                        <Icon className="h-5 w-5" style={labelStyle} />
                      </span>
                      <h3 className="font-serifalt text-3xl">{service.title}</h3>
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
                      style={{ borderColor: borderColors.dashed }}
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
                        style={{ ...secondaryButtonStyle, borderColor: borderColors.soft }}
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
            <p className="font-accent text-sm uppercase tracking-[0.45em] md:text-base" style={labelStyle}>
              Deep dives
            </p>
            <h2 className="mt-3 font-serifalt text-4xl leading-tight md:text-5xl" style={headingStyle}>
              Problem → solution → benefit for every service.
            </h2>
          </div>
          <div className="space-y-10">
            {services.map((service) => {
              const Icon = service.icon;
              const portfolioCtaProps = {
                className:
                  "inline-flex items-center rounded-full border px-5 py-2 text-xs font-accent uppercase tracking-[0.3em] transition",
                style: secondaryButtonStyle,
                to: "/portfolio",
              };
              return (
                <article
                  key={service.id}
                  id={`${service.id}-deep-dive`}
                  className="rounded-3xl border border-white/15 bg-transparent p-8 shadow-2xl backdrop-blur"
                  style={{ borderColor: borderColors.base }}
                >
                  <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <span className="rounded-full border border-white/20 p-3" style={{ borderColor: borderColors.soft }}>
                          <Icon className="h-6 w-6" style={labelStyle} />
                        </span>
                        <h3 className="font-serifalt text-3xl">{service.title}</h3>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-3">
                        {["problem", "solution", "benefit"].map((key) => (
                          <div
                            key={key}
                            className="rounded-2xl border border-white/15 bg-transparent p-4"
                            style={{ borderColor: borderColors.base }}
                          >
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
                      <Link {...portfolioCtaProps}>See it in action</Link>
                    </div>
                    <div
                      className="flex flex-col justify-between rounded-3xl border border-white/15 bg-transparent p-6"
                      style={{ borderColor: borderColors.base }}
                    >
                      <p className="font-accent text-xs uppercase tracking-[0.45em]" style={labelStyle}>
                        Pricing snapshot
                      </p>
                      <div className="mt-4 space-y-4">
                        {service.pricing.map((price) => (
                          <div
                            key={price.label}
                            className="rounded-2xl border border-white/15 p-4"
                            style={{ borderColor: borderColors.base }}
                          >
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
            <p className="font-accent text-sm uppercase tracking-[0.45em] md:text-base" style={labelStyle}>
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
                <div
                  key={prop.title}
                  className="rounded-3xl border border-white/15 bg-transparent p-6"
                  style={{ borderColor: borderColors.base }}
                >
                  <div className="flex items-center gap-4">
                    <span className="rounded-full border border-white/20 p-3" style={{ borderColor: borderColors.soft }}>
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
          <div
            className="rounded-3xl border border-white/15 bg-transparent p-6"
            style={{ borderColor: borderColors.base }}
          >
            <div className="grid gap-6 md:grid-cols-2">
              {comparisonPoints.map((point) => (
                <div
                  key={point.attribute}
                  className="rounded-2xl border border-white/15 bg-transparent p-5"
                  style={{ borderColor: borderColors.base }}
                >
                  <p className="text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                    {point.attribute}
                  </p>
                  <p className="mt-2 text-sm font-semibold" style={headingStyle}>
                    You get: <span className="font-normal" style={mutedStyle}>{point.me}</span>
                  </p>
                  <div
                    className="mt-3 rounded-xl border border-white/15 p-3 text-sm"
                    style={{ ...subtleTextStyle, borderColor: borderColors.soft }}
                  >
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
                <div
                  key={step.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5"
                  style={{ borderColor: borderColors.soft }}
                >
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
          <div className="space-y-6">
            <p className="font-accent text-xs uppercase tracking-[0.45em]" style={labelStyle}>
              Testimonials
            </p>
            <div className="space-y-4">
              <div
                className="relative overflow-hidden rounded-3xl border border-white/15"
                style={{
                  borderColor: borderColors.base,
                  height: `${testimonialHeight}px`,
                  minHeight: `${testimonialHeight}px`,
                  transition: "height 250ms ease",
                }}
              >
                <div
                  className="absolute inset-0 flex flex-col transition-transform duration-700 ease-in-out"
                  style={{
                    height: `${testimonialHeight * Math.max(totalTestimonials, 1)}px`,
                    transform: `translateY(-${testimonialIndex * testimonialHeight}px)`,
                  }}
                >
                  {testimonials.map((testimonial, index) => (
                    <blockquote
                      key={testimonial.author}
                      ref={(el) => {
                        testimonialRefs.current[index] = el;
                      }}
                      className="flex h-full flex-col justify-center gap-4 p-8"
                    >
                      <p className="text-lg leading-relaxed" style={headingStyle}>
                        “{testimonial.quote}”
                      </p>
                      <div className="space-y-1 text-sm">
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-xs uppercase tracking-[0.35em]" style={labelStyle}>
                          {testimonial.title}
                        </p>
                        <p className="text-xs uppercase tracking-[0.35em]" style={labelStyle}>
                          {testimonial.company}
                        </p>
                      </div>
                    </blockquote>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                  {String(testimonialIndex + 1).padStart(2, "0")} / {String(totalTestimonials).padStart(2, "0")}
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
            {faqs.map((faq) => {
              const faqId = `faq-${faq.question.replace(/\s+/g, "-").toLowerCase()}`;
              return (
              <div
                key={faq.question}
                className="rounded-3xl border border-white/10 bg-white/5 p-5"
                style={{ borderColor: borderColors.soft }}
              >
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center justify-between font-serifalt text-xl"
                  onClick={() =>
                    setExpandedFaq((prev) => (prev === faq.question ? null : faq.question))
                  }
                  style={{ color: headingStyle.color }}
                  aria-expanded={expandedFaq === faq.question}
                  aria-controls={faqId}
                >
                  <span>{faq.question}</span>
                  <span className="ml-4 text-2xl font-semibold leading-none">
                    {expandedFaq === faq.question ? "-" : "+"}
                  </span>
                </button>
                <div
                  id={faqId}
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{
                    gridTemplateRows: expandedFaq === faq.question ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="mt-3 text-sm leading-relaxed" style={mutedStyle}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
            })}
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
