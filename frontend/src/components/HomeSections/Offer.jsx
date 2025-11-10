import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, LineChart, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

const planVariants = {
  initial: { opacity: 0, y: 30 },
  animate: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: index * 0.08 },
  }),
};

const marqueeVariants = {
  animate: {
    x: ["0%", "-50%"],
    transition: {
      duration: 18,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

const plans = [
  {
    title: "SEO & Visibility",
    price: "Custom scopes",
    icon: LineChart,
    duration: "Audits + retainers",
    scope: "Technical + content SEO paired with analytics reporting so the right people keep finding you.",
    highlights: [
      "Full crawl, Core Web Vitals, and accessibility sweeps",
      "Keyword maps, structured data, and editorial briefs",
      "Analytics dashboards with KPI tracking",
      "Search QA plus implementation support",
    ],
  },
  {
    title: "Signature Web Builds",
    price: "4–6 week builds",
    icon: Layers,
    duration: "React · WP · Framer",
    scope: "Custom UI systems and coded builds in React/Vite or polished sites inside WordPress or Framer.",
    highlights: [
      "High-fidelity design systems + responsive components",
      "Performance budgets, animations, and QA",
      "CMS setups (headless, WordPress, or Framer)",
      "Launch support, docs, and hand-offs",
    ],
  },
  {
    title: "AI Business Automations",
    price: "Sprint-based",
    icon: Sparkles,
    duration: "2-week pilots",
    scope: "Prototype copilots or workflow automations that remove busywork and keep teams in flow.",
    highlights: [
      "Process mapping + automation strategy",
      "OpenAI / API integration and testing",
      "Knowledge base + prompt engineering",
      "Enablement docs for your team",
    ],
  },
];

export default function OffersSection({ theme }) {
  const sectionTheme = theme?.sections?.contact;
  const accent = theme?.accent || "#436850";
  const palette = sectionTheme?.palette || {};

  const sectionStyle = sectionTheme
    ? { background: sectionTheme.bg, color: sectionTheme.text }
    : {
        background:
          "linear-gradient(140deg, rgba(8,18,14,0.95) 0%, rgba(31,56,41,0.92) 50%, rgba(10,16,13,0.95) 100%)",
        color: "#F4F9F6",
      };

  const headerAccent = palette.heading || sectionTheme?.text || "#F9FBF9";
  const muted = palette.body || palette.muted || "rgba(244, 249, 246, 0.75)";

  const baseCardPalette = sectionTheme
    ? {
        bg: "rgba(255, 255, 255, 0.9)",
        border: "rgba(15, 23, 42, 0.1)",
        text: sectionTheme.text || "#1F2933",
        subtext: muted,
        bullet: palette.divider || "rgba(148,163,184,0.45)",
        icon: palette.buttonBg || accent,
        shadow: "0 18px 60px rgba(15, 23, 20, 0.18)",
      }
    : {
        bg: "rgba(255, 255, 255, 0.9)",
        border: "rgba(15, 23, 42, 0.1)",
        text: "#1F2933",
        subtext: "rgba(71, 85, 105, 0.85)",
        bullet: "rgba(148,163,184,0.45)",
        icon: accent,
        shadow: "0 18px 60px rgba(15, 23, 20, 0.18)",
      };

  const cardPalette = { ...baseCardPalette, ...(palette.card || {}) };
  const cardShadow = cardPalette.shadow || "0 18px 60px rgba(15, 23, 20, 0.18)";
  const hoverShadow = cardPalette.hoverShadow || "0 30px 70px rgba(15, 23, 42, 0.25)";

  const baseButtonPalette = sectionTheme
    ? {
        bg: palette.buttonBg || accent,
        text: palette.buttonText || sectionTheme.buttonContrast || sectionTheme.text || "#0f172a",
        hover: palette.buttonHover || palette.buttonBg || accent,
        border: palette.buttonBorder || "transparent",
      }
    : {
        bg: "#ffffff",
        text: "#1f2937",
        hover: "#f9fafb",
        border: "transparent",
      };

  const buttonPalette = baseButtonPalette;
  const buttonStyle = {
    backgroundColor: buttonPalette.bg,
    color: buttonPalette.text,
    borderColor: buttonPalette.border,
  };

  return (
    <section id="services" className="relative py-32 px-6 overflow-hidden" style={sectionStyle}>
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-accent uppercase tracking-[0.35em] text-sm mb-4" style={{ color: muted }}>
              Services
            </p>
            <h2
              className="font-serifalt text-5xl md:text-6xl tracking-tight leading-tight"
              style={{ color: headerAccent }}
            >
              Tailored builds that keep shipping momentum.
            </h2>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: muted }}>
              Each engagement blends product intuition, intentional UX, and production-ready code. Whether you need a
              flagship launch, steady iteration, or a visibility boost, we’ll scope exactly what moves the needle.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 lg:text-right">
            <span className="font-accent text-xs uppercase tracking-[0.28em]" style={{ color: muted }}>
              Ready when you are
            </span>
            <a href="mailto:michaelhanna50@gmail.com">
              <Button
                className="rounded-full px-8 py-5 text-sm font-accent uppercase tracking-[0.25em] border transition-transform hover:-translate-y-0.5 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2"
                style={buttonStyle}
              >
                Start a project
                <ArrowRight className="ml-3 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>

        <div className="relative mt-16">
          <motion.div
            className="relative flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-120px" }}
          >
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.article
                  key={plan.title}
                  className="relative min-w-[19rem] max-w-[22rem] snap-center rounded-3xl border p-7 backdrop-blur-sm transition-all"
                  custom={index}
                  variants={planVariants}
                  whileHover={{ y: -12, boxShadow: hoverShadow }}
                  style={{
                    background: cardPalette.bg,
                    color: cardPalette.text,
                    borderColor: cardPalette.border,
                    boxShadow: cardShadow,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" style={{ color: cardPalette.icon }} />
                    <h3 className="font-serifalt text-2xl">{plan.title}</h3>
                  </div>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="text-3xl font-semibold">{plan.price}</span>
                    <span
                      className="text-sm uppercase tracking-[0.25em]"
                      style={{ color: cardPalette.subtext }}
                    >
                      {plan.duration}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: cardPalette.subtext }}>
                    {plan.scope}
                  </p>
                  <ul className="mt-5 space-y-3 text-sm" style={{ color: cardPalette.subtext }}>
                    {plan.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <span
                          className="mt-1 h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: cardPalette.bullet }}
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </motion.div>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-3xl border border-white/10 bg-white/6">
          <motion.div
            className="flex gap-12 whitespace-nowrap py-6 text-sm uppercase tracking-[0.35em]"
            variants={marqueeVariants}
            animate="animate"
            style={{ color: muted }}
          >
            {["UX Strategy", "Design Systems", "Content Modeling", "Performance Tuning", "Analytics & Reporting"].map(
              (tag) => (
                <span key={tag} className="flex items-center gap-3">
                  {tag}
                  <span className="h-1 w-1 rounded-full bg-current opacity-50" />
                </span>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
