import React, { useEffect, useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import StickyHeader from "../components/StickyHeader";
import Footer from "../components/Footer";
import usePageMetadata from "../hooks/usePageMetadata";

const serviceOptions = [
  { value: "webDesign", label: "Web Design" },
  { value: "brandingSeo", label: "Branding/SEO" },
  { value: "aiAutomations", label: "AI Automations" },
  { value: "unsure", label: "Not sure yet" },
];

const webDesignFeatureOptions = [
  { value: "booking", label: "Online booking" },
  { value: "contactForm", label: "Contact form" },
  { value: "blog", label: "Blog" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "other", label: "Other" },
];

const brandingFocusOptions = [
  { value: "brandStrategy", label: "Brand strategy/copy" },
  { value: "seoAudit", label: "SEO research + audits" },
  { value: "contentPlan", label: "Content plan" },
  { value: "messaging", label: "Messaging refresh" },
  { value: "other", label: "Other" },
];

const automationFocusOptions = [
  { value: "leadFollowUp", label: "Lead follow-up" },
  { value: "scheduling", label: "Scheduling + reminders" },
  { value: "missedCall", label: "Missed-call responses" },
  { value: "customerMessaging", label: "Customer messaging" },
  { value: "adminTasks", label: "Admin tasks" },
  { value: "other", label: "Other" },
];

const timelineOptions = [
  { value: "asap", label: "ASAP" },
  { value: "oneToTwoWeeks", label: "1–2 weeks" },
  { value: "twoToFourWeeks", label: "2–4 weeks" },
  { value: "flexible", label: "Flexible" },
];

const budgetOptions = [
  { value: "under1k", label: "Under $1,000" },
  { value: "oneToTwoPointFive", label: "$1,000–$2,500" },
  { value: "twoPointFiveToFive", label: "$2,500–$5,000" },
  { value: "overFive", label: "$5,000+" },
];

const initialFormState = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  currentWebsite: "",
  services: [],
  goals: "",
  webDesignExisting: "",
  webDesignChallenges: "",
  webDesignFeatures: [],
  webDesignOther: "",
  brandingImprovements: "",
  brandingFocus: [],
  brandingKeywords: "",
  brandingOther: "",
  automationPainPoints: "",
  automationFocus: [],
  automationOther: "",
  timeline: "",
  budget: "",
  anythingElse: "",
};

const parseColor = (value) => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("#")) {
    const hex =
      trimmed.length === 4
        ? `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`
        : trimmed;
    if (hex.length !== 7) return null;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    if ([r, g, b].some((channel) => Number.isNaN(channel))) return null;
    return { r, g, b };
  }

  const match = trimmed.match(/rgba?\(([^)]+)\)/i);
  if (match) {
    const [r, g, b] = match[1]
      .split(",")
      .slice(0, 3)
      .map((segment) => parseInt(segment.trim(), 10));
    if ([r, g, b].some((channel) => Number.isNaN(channel))) return null;
    return { r, g, b };
  }
  return null;
};

const isColorLight = (value) => {
  const rgb = parseColor(value);
  if (!rgb) return false;
  const { r, g, b } = rgb;
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.6;
};

const sampleColorFromString = (value) => {
  if (typeof value !== "string") return null;
  const hexMatch = value.match(/#(?:[0-9a-fA-F]{3}){1,2}/);
  if (hexMatch) return hexMatch[0];
  const rgbaMatch = value.match(/rgba?\([^)]+\)/i);
  if (rgbaMatch) return rgbaMatch[0];
  return null;
};

const ensureReadableColor = (preferred, isBackgroundLight, fallbackForLightBg = "#0f172a", fallbackForDarkBg = "#F6F8F6") => {
  if (!preferred) {
    return isBackgroundLight ? fallbackForLightBg : fallbackForDarkBg;
  }
  if (isColorLight(preferred) && isBackgroundLight) {
    return fallbackForLightBg;
  }
  if (!isColorLight(preferred) && !isBackgroundLight) {
    return fallbackForDarkBg;
  }
  return preferred;
};

export default function ContactPage({ theme, mainTheme }) {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const forceHeaderVisible = true;

  const origin = typeof window !== "undefined" ? window.location.origin : null;
  const canonical = origin ? `${origin}/contact` : undefined;
  usePageMetadata({
    title: "Contact | Hanna Web Studio",
    description: "Share a few project details and I’ll reply with next steps within 48 hours.",
    canonical,
    jsonLd: origin
      ? {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Michael Hanna",
          description: "Streamlined intake form for web design, branding, and automation projects.",
          url: canonical,
        }
      : undefined,
  });

  const contactTheme =
    theme?.sections?.contact ||
    mainTheme?.sections?.contact ||
    theme?.sections?.portfolio ||
    mainTheme?.sections?.portfolio;
  const palette = useMemo(() => contactTheme?.palette || {}, [contactTheme]);
  const pageBackground = contactTheme?.bg || mainTheme?.page?.bg || "#0b1220";
  const pageBackgroundSample = sampleColorFromString(pageBackground);
  const pageHasLightBackground = pageBackgroundSample ? isColorLight(pageBackgroundSample) : false;

  let textColor = contactTheme?.text || mainTheme?.page?.text || "#F6F8F6";
  textColor = ensureReadableColor(textColor, pageHasLightBackground);
  const usesDarkSurface = !pageHasLightBackground;
  const accent =
    palette.buttonBg ||
    palette.card?.accent ||
    palette.accent ||
    contactTheme?.accent ||
    theme?.accent ||
    mainTheme?.accent ||
    "#436850";
  const accentText = palette.buttonText || contactTheme?.buttonContrast || (isColorLight(accent) ? "#050505" : "#F6F8F6");
  const pageStyle = {
    background: pageBackground,
    color: textColor,
  };
  const heroBackground =
    palette.heroBg ||
    contactTheme?.heroBg ||
    pageBackground;
  const heroBackgroundSample = sampleColorFromString(heroBackground) || pageBackgroundSample;
  const heroHasLightBackground = heroBackgroundSample ? isColorLight(heroBackgroundSample) : pageHasLightBackground;
  const heroSectionStyle = {
    background: heroBackground,
    color: ensureReadableColor(
      palette.body,
      heroHasLightBackground,
      "rgba(15,23,42,0.78)",
      "rgba(246,248,246,0.82)"
    ),
    borderBottom: `1px solid ${palette.divider || "rgba(246,248,246,0.18)"}`,
    boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
  };
  const heroLabelStyle = {
    color: ensureReadableColor(
      palette.body || palette.muted,
      heroHasLightBackground,
      "rgba(15,23,42,0.7)",
      "rgba(246,248,246,0.75)"
    ),
  };
  const heroHeadingColor = ensureReadableColor(palette.heading, heroHasLightBackground);
  const heroHeadingStyle = {
    color: heroHeadingColor,
  };
  const heroPrimaryButtonStyle = {
    backgroundColor: palette.buttonBg || accent,
    color: palette.buttonText || contactTheme?.buttonContrast || (isColorLight(palette.buttonBg || accent) ? "#050505" : "#F6F8F6"),
    borderColor: palette.buttonBg || accent,
  };
  const heroSecondaryButtonStyle = {
    borderColor: heroHeadingColor,
    color: heroHeadingColor,
    backgroundColor: "transparent",
  };
  const formSectionStyle = {
    background: pageBackground,
    color: textColor,
  };

  const cardBackground = palette.card?.bg || (usesDarkSurface ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.9)");
  const cardBackgroundSample = sampleColorFromString(cardBackground);
  const cardSurfaceIsLight = cardBackgroundSample ? isColorLight(cardBackgroundSample) : !usesDarkSurface;
  const formCardStyle = {
    background: cardBackground,
    borderColor: palette.card?.border || (cardSurfaceIsLight ? "rgba(5,5,5,0.08)" : "rgba(255,255,255,0.1)"),
    color: ensureReadableColor(palette.card?.text || textColor, cardSurfaceIsLight),
    boxShadow: palette.card?.shadow || "0 25px 80px rgba(0,0,0,0.35)",
  };

  const asideBackground = palette.aside?.bg || (usesDarkSurface ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.92)");
  const asideBgSample = sampleColorFromString(asideBackground);
  const asideIsLight = asideBgSample ? isColorLight(asideBgSample) : !usesDarkSurface;
  const asideTextColor = palette.aside?.text || (asideIsLight ? "#0f172a" : "#F6F8F6");
  const asideHelperColor = palette.aside?.muted || (asideIsLight ? "rgba(15,23,42,0.7)" : "rgba(246,248,246,0.7)");
  const asideLabelColor = palette.aside?.label || asideHelperColor;
  const asideCardStyle = {
    background: asideBackground,
    borderColor: palette.card?.border || (asideIsLight ? "rgba(5,5,5,0.08)" : "rgba(255,255,255,0.08)"),
    color: asideTextColor,
  };

  const controlColors = useMemo(
    () => ({
      bg: palette.card?.inputBg || (cardSurfaceIsLight ? "rgba(255,255,255,0.96)" : "rgba(246,248,246,0.08)"),
      border: palette.card?.inputBorder || (cardSurfaceIsLight ? "rgba(15,23,42,0.25)" : "rgba(246,248,246,0.2)"),
      text: ensureReadableColor(palette.card?.text || textColor, cardSurfaceIsLight),
      label: ensureReadableColor(
        palette.body || palette.muted,
        cardSurfaceIsLight,
        "rgba(15,23,42,0.68)",
        "rgba(246,248,246,0.75)"
      ),
      helper: ensureReadableColor(
        palette.card?.subtext || palette.muted,
        cardSurfaceIsLight,
        "rgba(15,23,42,0.6)",
        "rgba(246,248,246,0.65)"
      ),
      focus: palette.buttonBg || accent,
      accentBg: cardSurfaceIsLight ? "rgba(15,23,42,0.04)" : "rgba(246,248,246,0.08)",
    }),
    [cardSurfaceIsLight, palette, accent, textColor]
  );

  const includeWebDesign = formData.services.includes("webDesign");
  const includeBranding = formData.services.includes("brandingSeo");
  const includeAutomation = formData.services.includes("aiAutomations");

  useEffect(() => {
    if (includeWebDesign) return;
    setFormData((prev) => {
      if (
        !prev.webDesignExisting &&
        !prev.webDesignChallenges &&
        prev.webDesignFeatures.length === 0 &&
        !prev.webDesignOther
      ) {
        return prev;
      }
      return {
        ...prev,
        webDesignExisting: "",
        webDesignChallenges: "",
        webDesignFeatures: [],
        webDesignOther: "",
      };
    });
  }, [includeWebDesign]);

  useEffect(() => {
    if (includeAutomation) return;
    setFormData((prev) => {
      if (!prev.automationPainPoints && prev.automationFocus.length === 0 && !prev.automationOther) {
        return prev;
      }
      return {
        ...prev,
        automationPainPoints: "",
        automationFocus: [],
        automationOther: "",
      };
    });
  }, [includeAutomation]);

  useEffect(() => {
    if (includeBranding) return;
    setFormData((prev) => {
      if (!prev.brandingImprovements && prev.brandingFocus.length === 0 && !prev.brandingKeywords && !prev.brandingOther) {
        return prev;
      }
      return {
        ...prev,
        brandingImprovements: "",
        brandingFocus: [],
        brandingKeywords: "",
        brandingOther: "",
      };
    });
  }, [includeBranding]);

  const updateField = (field) => (event) => {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayValue = (field, value) => {
    setFormData((prev) => {
      const current = prev[field] || [];
      const exists = current.includes(value);
      return {
        ...prev,
        [field]: exists ? current.filter((entry) => entry !== value) : [...current, value],
      };
    });
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Your name helps me personalize the reply.";
    }
    if (!formData.email.trim()) {
      nextErrors.email = "I need an email to send follow-ups.";
    }
    if (!formData.goals.trim()) {
      nextErrors.goals = "Share the outcomes you’re chasing.";
    }
    if (!formData.services.length) {
      nextErrors.services = "Select at least one area you need help with.";
    }
    if (includeWebDesign) {
      if (!formData.webDesignExisting) {
        nextErrors.webDesignExisting = "Let me know if there’s already a site in place.";
      }
      if (!formData.webDesignChallenges.trim()) {
        nextErrors.webDesignChallenges = "Tell me what isn’t working today.";
      }
    }
    if (includeBranding && !formData.brandingImprovements.trim()) {
      nextErrors.brandingImprovements = "Share what needs support for branding or SEO.";
    }
    if (includeAutomation && !formData.automationPainPoints.trim()) {
      nextErrors.automationPainPoints = "What tasks are slowing things down?";
    }
    if (!formData.timeline) {
      nextErrors.timeline = "Pick a timeline so I can plan resources.";
    }
    if (!formData.budget) {
      nextErrors.budget = "A budget range helps me right-size the scope.";
    }
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("idle");
    setFeedback("");

    const nextErrors = validateForm();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result?.error || "Unable to send your message.");
      }
      setStatus("success");
      setFeedback(result?.message || "Thanks! I’ll respond within 48 hours.");
      setFormData(initialFormState);
      setErrors({});
    } catch (error) {
      setStatus("error");
      setFeedback(error.message || "Something went wrong. Please try again.");
    }
  };

  const fieldClass = "w-full rounded-2xl border px-4 py-3 font-serifalt text-base focus:outline-none focus:ring-2 focus:ring-offset-0";
  const labelClass = "font-accent uppercase text-sm sm:text-base tracking-[0.35em]";

  const asideRef = useRef(null);
  const [asideHalfHeight, setAsideHalfHeight] = useState(220);

  useEffect(() => {
    const updateAsideHeight = () => {
      if (!asideRef.current) return;
      const nextHalf = asideRef.current.offsetHeight / 2;
      if (Number.isFinite(nextHalf) && nextHalf > 0) {
        setAsideHalfHeight(Math.max(220, Math.round(nextHalf)));
      }
    };

    updateAsideHeight();
    window.addEventListener("resize", updateAsideHeight);
    return () => window.removeEventListener("resize", updateAsideHeight);
  }, []);

  const stickyTopValue = `clamp(0px, calc(50vh - ${asideHalfHeight}px), 999px)`;

  return (
    <div className="min-h-screen" style={pageStyle}>
      <StickyHeader theme={theme} forceVisible={forceHeaderVisible} />
      <section
        id="contact-hero"
        className="px-6 pt-28 pb-16 sm:pt-32 lg:pt-36 flex min-h-[67.5vh] flex-col justify-center"
        style={heroSectionStyle}
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 text-left">
          <p className="font-accent text-base uppercase tracking-[0.45em] md:text-lg" style={heroLabelStyle}>
            Contact
          </p>
          <h1 className="font-serifalt text-5xl leading-tight md:text-6xl" style={heroHeadingStyle}>
            Share a few details and I’ll send next steps within 48 hours.
          </h1>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact-form"
              className="rounded-full px-8 py-4 text-sm font-accent uppercase tracking-[0.3em]"
              style={heroPrimaryButtonStyle}
            >
              Get Started
            </a>
            <Link
              to="/services"
              className="rounded-full border px-8 py-4 text-sm font-accent uppercase tracking-[0.3em]"
              style={heroSecondaryButtonStyle}
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      <section
        id="contact-intake"
        className="px-6 py-16 lg:py-24 flex w-full items-center justify-center"
        style={{ ...formSectionStyle, minHeight: "100vh" }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.55fr)]">
          <form
            id="contact-form"
            className="space-y-10 rounded-3xl border p-8 md:p-10 self-center"
            style={formCardStyle}
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <p className={labelClass} style={{ color: controlColors.label }}>
                1. Basic info
              </p>
              <h2 className="font-serifalt text-3xl">Let’s start with the essentials.</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={`${labelClass} block`} htmlFor="fullName" style={{ color: controlColors.label }}>
                    Full name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    className={fieldClass}
                    style={{ backgroundColor: controlColors.bg, borderColor: controlColors.border, color: controlColors.text }}
                    value={formData.fullName}
                    onChange={updateField("fullName")}
                    autoComplete="name"
                    required
                    aria-invalid={Boolean(errors.fullName)}
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>}
                </div>

                <div>
                  <label className={`${labelClass} block`} htmlFor="businessName" style={{ color: controlColors.label }}>
                    Business name
                  </label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    className={fieldClass}
                    style={{ backgroundColor: controlColors.bg, borderColor: controlColors.border, color: controlColors.text }}
                    value={formData.businessName}
                    onChange={updateField("businessName")}
                    autoComplete="organization"
                  />
                </div>

                <div>
                  <label className={`${labelClass} block`} htmlFor="email" style={{ color: controlColors.label }}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={fieldClass}
                    style={{ backgroundColor: controlColors.bg, borderColor: controlColors.border, color: controlColors.text }}
                    value={formData.email}
                    onChange={updateField("email")}
                    autoComplete="email"
                    required
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                </div>

                <div>
                  <label className={`${labelClass} block`} htmlFor="phone" style={{ color: controlColors.label }}>
                    Phone (optional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={fieldClass}
                    style={{ backgroundColor: controlColors.bg, borderColor: controlColors.border, color: controlColors.text }}
                    value={formData.phone}
                    onChange={updateField("phone")}
                    autoComplete="tel"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={`${labelClass} block`} htmlFor="currentWebsite" style={{ color: controlColors.label }}>
                    Current website (if you have one)
                  </label>
                  <input
                    id="currentWebsite"
                    name="currentWebsite"
                    type="url"
                    placeholder="https://"
                    className={fieldClass}
                    style={{ backgroundColor: controlColors.bg, borderColor: controlColors.border, color: controlColors.text }}
                    value={formData.currentWebsite}
                    onChange={updateField("currentWebsite")}
                    autoComplete="url"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className={labelClass} style={{ color: controlColors.label }}>
                2. What are you looking for?
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {serviceOptions.map((option) => {
                  const active = formData.services.includes(option.value);
                  return (
                    <label
                      key={option.value}
                      className="cursor-pointer rounded-2xl border px-4 py-3 font-serifalt text-lg transition-colors"
                      style={{
                        backgroundColor: active ? accent : controlColors.accentBg,
                        borderColor: active ? accent : controlColors.border,
                        color: active ? accentText : controlColors.text,
                      }}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        name="services"
                        value={option.value}
                        checked={active}
                        onChange={() => toggleArrayValue("services", option.value)}
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>
              {errors.services && <p className="text-sm text-red-400">{errors.services}</p>}
            </div>

            <div className="space-y-4">
              <p className={labelClass} style={{ color: controlColors.label }}>
                3. Your goals
              </p>
              <textarea
                id="goals"
                name="goals"
                rows={4}
                className={fieldClass}
                style={{ backgroundColor: controlColors.bg, borderColor: controlColors.border, color: controlColors.text }}
                value={formData.goals}
                onChange={updateField("goals")}
                placeholder="What are you hoping to achieve?"
                required
                aria-invalid={Boolean(errors.goals)}
              />
              {errors.goals && <p className="text-sm text-red-400">{errors.goals}</p>}
            </div>

            {includeWebDesign && (
              <div className="space-y-4">
                <p className={labelClass} style={{ color: controlColors.label }}>
                  4. Web design questions
                </p>
                <div className="space-y-3">
                  <p className="font-serifalt text-base" style={{ color: controlColors.helper }}>
                    Do you have an existing website?
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {["yes", "no"].map((value) => {
                      const label = value === "yes" ? "Yes" : "No";
                      const active = formData.webDesignExisting === value;
                      return (
                        <label
                          key={value}
                          className="cursor-pointer rounded-full border px-5 py-2 text-sm font-accent uppercase tracking-[0.3em]"
                          style={{
                            backgroundColor: active ? accent : "transparent",
                            borderColor: active ? accent : controlColors.border,
                            color: active ? accentText : controlColors.text,
                          }}
                        >
                          <input
                            type="radio"
                            className="sr-only"
                            name="webDesignExisting"
                            value={value}
                            checked={active}
                            onChange={updateField("webDesignExisting")}
                          />
                          {label}
                        </label>
                      );
                    })}
                  </div>
                  {errors.webDesignExisting && <p className="text-sm text-red-400">{errors.webDesignExisting}</p>}
                </div>

                <div>
                  <label className={`${labelClass} block`} htmlFor="webDesignChallenges" style={{ color: controlColors.label }}>
                    What isn’t working right now?
                  </label>
                  <textarea
                    id="webDesignChallenges"
                    name="webDesignChallenges"
                    rows={3}
                    className={fieldClass}
                    style={{ backgroundColor: controlColors.bg, borderColor: controlColors.border, color: controlColors.text }}
                    value={formData.webDesignChallenges}
                    onChange={updateField("webDesignChallenges")}
                    aria-invalid={Boolean(errors.webDesignChallenges)}
                  />
                  {errors.webDesignChallenges && <p className="text-sm text-red-400">{errors.webDesignChallenges}</p>}
                </div>

                <div className="space-y-2">
                  <p className={`${labelClass}`} style={{ color: controlColors.label }}>
                    What features do you need?
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {webDesignFeatureOptions.map((option) => {
                      const active = formData.webDesignFeatures.includes(option.value);
                      return (
                        <label
                          key={option.value}
                          className="cursor-pointer rounded-2xl border px-4 py-3 font-serifalt text-base transition-colors"
                          style={{
                            backgroundColor: active ? accent : controlColors.accentBg,
                            borderColor: active ? accent : controlColors.border,
                            color: active ? accentText : controlColors.text,
                          }}
                        >
                          <input
                            type="checkbox"
                            className="sr-only"
                            value={option.value}
                            name="webDesignFeatures"
                            checked={active}
                            onChange={() => toggleArrayValue("webDesignFeatures", option.value)}
                          />
                          {option.label}
                        </label>
                      );
                    })}
                  </div>
                  {formData.webDesignFeatures.includes("other") && (
                    <input
                      type="text"
                      name="webDesignOther"
                      placeholder="Anything else?"
                      className={fieldClass}
                      style={{ backgroundColor: controlColors.bg, borderColor: controlColors.border, color: controlColors.text }}
                      value={formData.webDesignOther}
                      onChange={updateField("webDesignOther")}
                    />
                  )}
                </div>
              </div>
            )}

            {includeBranding && (
              <div className="space-y-4">
                <p className={labelClass} style={{ color: controlColors.label }}>
                  5. Branding & SEO questions
                </p>
                <div>
                  <label className={`${labelClass} block`} htmlFor="brandingImprovements" style={{ color: controlColors.label }}>
                    What needs support?
                  </label>
                  <textarea
                    id="brandingImprovements"
                    name="brandingImprovements"
                    rows={3}
                    className={fieldClass}
                    style={{ backgroundColor: controlColors.bg, borderColor: controlColors.border, color: controlColors.text }}
                    value={formData.brandingImprovements}
                    onChange={updateField("brandingImprovements")}
                    aria-invalid={Boolean(errors.brandingImprovements)}
                  />
                  {errors.brandingImprovements && <p className="text-sm text-red-400">{errors.brandingImprovements}</p>}
                </div>
                <div className="space-y-2">
                  <p className={`${labelClass}`} style={{ color: controlColors.label }}>
                    What should we focus on?
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {brandingFocusOptions.map((option) => {
                      const active = formData.brandingFocus.includes(option.value);
                      return (
                        <label
                          key={option.value}
                          className="cursor-pointer rounded-2xl border px-4 py-3 font-serifalt text-base transition-colors"
                          style={{
                            backgroundColor: active ? accent : controlColors.accentBg,
                            borderColor: active ? accent : controlColors.border,
                            color: active ? accentText : controlColors.text,
                          }}
                        >
                          <input
                            type="checkbox"
                            className="sr-only"
                            value={option.value}
                            name="brandingFocus"
                            checked={active}
                            onChange={() => toggleArrayValue("brandingFocus", option.value)}
                          />
                          {option.label}
                        </label>
                      );
                    })}
                  </div>
                  {formData.brandingFocus.includes("other") && (
                    <input
                      type="text"
                      name="brandingOther"
                      placeholder="Other branding or SEO needs"
                      className={fieldClass}
                      style={{ backgroundColor: controlColors.bg, borderColor: controlColors.border, color: controlColors.text }}
                      value={formData.brandingOther}
                      onChange={updateField("brandingOther")}
                    />
                  )}
                </div>
                <div>
                  <label className={`${labelClass} block`} htmlFor="brandingKeywords" style={{ color: controlColors.label }}>
                    Keywords or audiences to prioritize
                  </label>
                  <input
                    id="brandingKeywords"
                    name="brandingKeywords"
                    type="text"
                    className={fieldClass}
                    style={{ backgroundColor: controlColors.bg, borderColor: controlColors.border, color: controlColors.text }}
                    value={formData.brandingKeywords}
                    onChange={updateField("brandingKeywords")}
                  />
                </div>
              </div>
            )}

            {includeAutomation && (
              <div className="space-y-4">
                <p className={labelClass} style={{ color: controlColors.label }}>
                  6. Automation questions
                </p>
                <div>
                  <label className={`${labelClass} block`} htmlFor="automationPainPoints" style={{ color: controlColors.label }}>
                    What tasks take the most time?
                  </label>
                  <textarea
                    id="automationPainPoints"
                    name="automationPainPoints"
                    rows={3}
                    className={fieldClass}
                    style={{ backgroundColor: controlColors.bg, borderColor: controlColors.border, color: controlColors.text }}
                    value={formData.automationPainPoints}
                    onChange={updateField("automationPainPoints")}
                    aria-invalid={Boolean(errors.automationPainPoints)}
                  />
                  {errors.automationPainPoints && <p className="text-sm text-red-400">{errors.automationPainPoints}</p>}
                </div>

                <div className="space-y-2">
                  <p className={`${labelClass}`} style={{ color: controlColors.label }}>
                    What would you like to automate?
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {automationFocusOptions.map((option) => {
                      const active = formData.automationFocus.includes(option.value);
                      return (
                        <label
                          key={option.value}
                          className="cursor-pointer rounded-2xl border px-4 py-3 font-serifalt text-base transition-colors"
                          style={{
                            backgroundColor: active ? accent : controlColors.accentBg,
                            borderColor: active ? accent : controlColors.border,
                            color: active ? accentText : controlColors.text,
                          }}
                        >
                          <input
                            type="checkbox"
                            className="sr-only"
                            value={option.value}
                            name="automationFocus"
                            checked={active}
                            onChange={() => toggleArrayValue("automationFocus", option.value)}
                          />
                          {option.label}
                        </label>
                      );
                    })}
                  </div>
                  {formData.automationFocus.includes("other") && (
                    <input
                      type="text"
                      name="automationOther"
                      placeholder="Other workflows you’d like to automate"
                      className={fieldClass}
                      style={{ backgroundColor: controlColors.bg, borderColor: controlColors.border, color: controlColors.text }}
                      value={formData.automationOther}
                      onChange={updateField("automationOther")}
                    />
                  )}
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-3">
                <p className={labelClass} style={{ color: controlColors.label }}>
                  7. Timeline
                </p>
                <div className="flex flex-wrap gap-3">
                  {timelineOptions.map((option) => {
                    const active = formData.timeline === option.value;
                    return (
                      <label
                        key={option.value}
                        className="cursor-pointer rounded-full border px-5 py-2 text-sm font-accent uppercase tracking-[0.3em]"
                        style={{
                          backgroundColor: active ? accent : "transparent",
                          borderColor: active ? accent : controlColors.border,
                          color: active ? accentText : controlColors.text,
                        }}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          name="timeline"
                          value={option.value}
                          checked={active}
                          onChange={updateField("timeline")}
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
                {errors.timeline && <p className="text-sm text-red-400">{errors.timeline}</p>}
              </div>

              <div className="space-y-3">
                <p className={labelClass} style={{ color: controlColors.label }}>
                  8. Budget
                </p>
                <div className="flex flex-wrap gap-3">
                  {budgetOptions.map((option) => {
                    const active = formData.budget === option.value;
                    return (
                      <label
                        key={option.value}
                        className="cursor-pointer rounded-full border px-5 py-2 text-sm font-accent uppercase tracking-[0.3em]"
                        style={{
                          backgroundColor: active ? accent : "transparent",
                          borderColor: active ? accent : controlColors.border,
                          color: active ? accentText : controlColors.text,
                        }}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          name="budget"
                          value={option.value}
                          checked={active}
                          onChange={updateField("budget")}
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
                {errors.budget && <p className="text-sm text-red-400">{errors.budget}</p>}
              </div>

              <div>
                <p className={labelClass} style={{ color: controlColors.label }}>
                  9. Anything else?
                </p>
                <textarea
                  id="anythingElse"
                  name="anythingElse"
                  rows={3}
                  className={fieldClass}
                  style={{ backgroundColor: controlColors.bg, borderColor: controlColors.border, color: controlColors.text }}
                  value={formData.anythingElse}
                  onChange={updateField("anythingElse")}
                  placeholder="Simple notes, timelines, or links I should see."
                />
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex w-full items-center justify-center rounded-full px-8 py-4 text-sm font-accent uppercase tracking-[0.35em] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  background: accent,
                  color: accentText,
                  border: `1px solid ${accent}`,
                }}
              >
                {status === "submitting" ? "Sending…" : "Send request"}
              </button>
              {feedback && (
                <p
                  className="text-sm font-serifalt"
                  style={{ color: status === "success" ? accentText : "#fca5a5" }}
                  role="status"
                >
                  {feedback}
                </p>
              )}
            </div>
          </form>

          <aside
            ref={asideRef}
            className="rounded-3xl border p-6 md:p-8 flex flex-col gap-6 lg:sticky self-start"
            style={{
              ...asideCardStyle,
              maxHeight: "calc(100vh - 8rem)",
              overflowY: "auto",
              top: stickyTopValue,
            }}
          >
            <p className={`${labelClass} text-sm`} style={{ color: asideLabelColor }}>
              What to expect
            </p>
            <h3 className="mt-3 font-serifalt text-3xl" style={{ color: asideTextColor }}>
              A clear plan without the agency runaround.
            </h3>
            <ul className="mt-6 space-y-4 text-base font-serifalt" style={{ color: asideHelperColor }}>
              <li>• I review your answers and reply with a quick Loom or outline within 48 hours.</li>
              <li>• We’ll align on scope, budget, and timeline before any invoices or proposals.</li>
              <li>• You always get direct communication—no project managers, no handoffs.</li>
            </ul>
            <div className="mt-8 rounded-2xl border px-5 py-4 text-sm" style={{ borderColor: controlColors.border }}>
              <p className="font-accent uppercase tracking-[0.3em]" style={{ color: asideLabelColor }}>
                Need something else?
              </p>
              <p className="mt-3 font-serifalt" style={{ color: asideTextColor }}>
                If you prefer to start with a short note, include the essentials above so I can keep everything organized.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <Footer theme={theme} mainTheme={mainTheme} />
    </div>
  );
}
