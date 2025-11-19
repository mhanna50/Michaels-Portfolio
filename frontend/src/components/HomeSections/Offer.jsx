import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const parseColor = (color) => {
  if (!color || typeof color !== "string") return null;
  const trimmed = color.trim();
  if (trimmed.startsWith("#")) {
    const hex =
      trimmed.length === 4
        ? `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`
        : trimmed;
    if (hex.length !== 7) return null;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    if ([r, g, b].some((val) => Number.isNaN(val))) return null;
    return { r, g, b };
  }
  const rgbMatch = trimmed.match(/rgba?\(([^)]+)\)/i);
  if (rgbMatch) {
    const [r, g, b] = rgbMatch[1]
      .split(",")
      .slice(0, 3)
      .map((val) => parseInt(val.trim(), 10));
    if ([r, g, b].some((val) => Number.isNaN(val))) return null;
    return { r, g, b };
  }
  return null;
};

const isColorLight = (color) => {
  const rgb = parseColor(color);
  if (!rgb) return false;
  const { r, g, b } = rgb;
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.6;
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

export default function OffersSection({ theme }) {
  const sectionTheme = theme?.sections?.contact;
  const accent = theme?.accent || "#436850";
  const palette = sectionTheme?.palette || {};

  const sectionStyle = sectionTheme
    ? { background: sectionTheme.bg, color: sectionTheme.text }
    : {
        background: 'transparent',
        color: "#F4F9F6",
      };

  const headerAccent = palette.heading || sectionTheme?.text || "#F9FBF9";
  const muted = palette.body || palette.muted || "rgba(244, 249, 246, 0.75)";

  const serviceCards = [
    {
      title: "Websites + Branding + SEO",
      summary:
        "Custom websites, branding, and SEO that make your business stand out and attract high-value clients.",
      highlights: ["Brand + web kits in one place", "Consistent communication and clarity on goals"],
      href: "/services#deep-dive",
    },
    {
      title: "Automation & Ops",
      summary:"Smart automations that streamline operations, eliminate repetitive tasks, and help business owners win back their time.",
      highlights: ["AI receptionist & instant customer responses", "Lead follow-up & nurturing workflows"],
      href: "/services#deep-dive",
    },
  ];

  const cardBorderColor = palette.card?.border || palette.divider || "rgba(255,255,255,0.18)";
  const cardBackground =
    palette.card?.bg ||
    sectionTheme?.bg ||
    "linear-gradient(135deg, rgba(4,4,4,0.85), rgba(10,10,10,0.7))";
  const cardTextColor = palette.card?.text || sectionTheme?.text || "#F6F8F6";
  const cardMuted = palette.card?.subtext || palette.body || palette.muted || "rgba(246,248,246,0.75)";
  const cardAccent = palette.accent || accent;
  const cardTextIsLight = isColorLight(cardTextColor);
  const viewDetailsBg =
    palette.card?.ctaBg ||
    (cardTextIsLight ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.08)");
  const viewDetailsText = palette.card?.ctaText || cardAccent;

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

  const sliderPhrases = [
    "UI/UX Strategy",
    "Automations",
    "Branding",
    "SEO Set-Up",
    "Analytics & Reporting",
    "Custom Designs",
  ];
  const sliderSequence = sliderPhrases.flatMap((phrase, index) => [
    { type: "text", id: `phrase-${index}`, content: phrase },
    { type: "dot", id: `dot-${index}` },
  ]);
  const marqueeItems = [...sliderSequence, ...sliderSequence];

  return (
    <section id="services" className="relative py-32 px-6 overflow-hidden" style={sectionStyle}>
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-accent uppercase tracking-[0.35em] text-lg mb-4" style={{ color: muted }}>
              Services
            </p>
            <h2
              className="font-serifalt text-6xl md:text-7xl tracking-tight leading-tight"
              style={{ color: headerAccent }}
            >
              Website and Automation help that stays collaborative and on schedule.
            </h2>
            <div className="mt-6 h-px w-full" style={{ backgroundColor: palette.divider || "rgba(246,248,246,0.25)" }} />
          </div>

          <div className="flex flex-col items-start gap-4 lg:items-end">
            <Link to="/contact">
              <Button
                className="inline-flex min-w-[220px] items-center justify-between rounded-full px-8 py-5 text-sm font-accent uppercase tracking-[0.25em] border transition-transform hover:-translate-y-0.5 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2"
                style={buttonStyle}
              >
                <span>Start a project</span>
                <ArrowRight className="ml-4 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {serviceCards.map((card) => (
            <Link
              key={card.title}
              to={card.href}
              className="group flex h-full flex-col rounded-3xl border p-8 transition-all hover:-translate-y-1 hover:shadow-2xl"
              style={{
                borderColor: cardBorderColor,
                background: cardBackground,
                color: cardTextColor,
              }}
            >
              <p className="text-sm font-accent uppercase tracking-[0.35em]" style={{ color: cardMuted }}>
                Featured service
              </p>
              <h3 className="mt-3 font-serifalt text-3xl">{card.title}</h3>
              <p className="mt-4 text-base leading-relaxed" style={{ color: cardMuted }}>
                {card.summary}
              </p>
              <ul className="mt-5 space-y-2 text-sm" style={{ color: cardMuted }}>
                {card.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span
                      className="mt-1 h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: cardAccent }}
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <span
                className="mt-8 inline-flex items-center gap-3 text-sm font-accent uppercase tracking-[0.35em] rounded-full border px-5 py-2 transition-all group-hover:-translate-y-0.5"
                style={{
                  color: viewDetailsText,
                  background: viewDetailsBg,
                  borderColor: cardAccent,
                }}
              >
                View details
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <div className="relative mt-14 overflow-hidden rounded-3xl border border-white/10 bg-white/6">
          <motion.div
            className="flex items-center whitespace-nowrap py-6 text-xs uppercase tracking-[0.35em] sm:text-sm"
            variants={marqueeVariants}
            animate="animate"
            style={{ color: muted }}
          >
            {marqueeItems.map((item, index) =>
              item.type === "dot" ? (
                <span
                  key={`${item.id}-${index}`}
                  className="px-6 text-2xl font-light leading-none"
                  aria-hidden="true"
                >
                  &middot;
                </span>
              ) : (
                <span key={`${item.id}-${index}`} className="font-bebas tracking-[0.4em] px-6">
                  {item.content}
                </span>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
