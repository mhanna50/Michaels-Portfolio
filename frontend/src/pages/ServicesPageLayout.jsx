import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import Footer from "../components/Footer";
import StickyHeader from "../components/StickyHeader";
import { Button } from "@/components/ui/button";
import usePageMetadata from "@/hooks/usePageMetadata";
import { SITE_URL, buildServiceSchema, buildFaqSchema, DEFAULT_OG_IMAGE, toAbsoluteUrl } from "@/data/siteMeta";

export default function ServicesPageLayout({ theme, mainTheme, config = {} }) {
  const {
    services = [],
    valueProps = [],
    comparisonPoints = [],
    processSteps = [],
    testimonials = [],
    faqs = [],
    heroEyebrow = "Services",
    heroTitle = "Design, development, and automation — all in one partner.",
    overviewHeading = "Brand and automation packages tailored to each launch.",
    valueHeading = "End-to-end delivery, automation expertise, and measurable outcomes.",
    processHeading = "One five-step playbook that adapts to every service.",
    readyTitle = "Ready to start your project?",
    readyDescription =
      "One partner for research, design, development, and automation. Tell me what you're building and we'll map the plan together.",
    metaTitle = "Services | Web Design, Development & Automation",
    metaDescription = "End-to-end design, code, and automations to grow revenue and reduce ops overhead.",
    canonicalPath = "/services",
    schemaName = metaTitle,
    flagshipServiceIds = [],
    pricingSection = null,
    flagshipCardVariant = "default",
    supportingCardsFullWidth = false,
    showDeliverablesInOverview = true,
    showDetailImages = true,
    showServiceOverview = true,
    priceRange = "$$",
  } = config;

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonialRefs = useRef([]);
  const [testimonialHeight, setTestimonialHeight] = useState(320);
  const totalTestimonials = testimonials.length;
  const MIN_TESTIMONIAL_HEIGHT = 200;
  const MAX_TESTIMONIAL_HEIGHT = 360;
  const computedTestimonialHeight = totalTestimonials
    ? Math.min(MAX_TESTIMONIAL_HEIGHT, Math.max(MIN_TESTIMONIAL_HEIGHT, testimonialHeight))
    : undefined;

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
  const heroSafePadding = "clamp(8.5rem, 6rem + 4vw, 11rem)";
  const heroBottomPadding = "clamp(5rem, 3.5rem + 3vw, 6.75rem)";

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
  const automationCtaStyle = {
    backgroundColor: palette?.accent || headingStyle.color,
    color: isNightTheme ? "#0b0f19" : "#f8fafc",
    borderColor: palette?.accent || headingStyle.color,
    boxShadow: isNightTheme ? "0 20px 40px rgba(0,0,0,0.45)" : "0 20px 40px rgba(15,23,42,0.25)",
  };

  const normalizedCanonicalPath =
    typeof canonicalPath === "string"
      ? canonicalPath.startsWith("/")
        ? canonicalPath
        : `/${canonicalPath}`
      : "/services";
  const canonical = `${SITE_URL}${normalizedCanonicalPath}`;
  const serviceSchema = buildServiceSchema({
    name: schemaName || metaTitle,
    description: metaDescription,
    canonical,
    serviceTypes: services.map((service) => service.title),
    priceRange,
    offersDescription:
      pricingSection?.heading || pricingSection?.subheading || readyDescription,
  });
  const faqSchema = buildFaqSchema(faqs, canonical);
  const graphItems = [serviceSchema, faqSchema]
    .filter(Boolean)
    .map((item) => {
      if (!item || !item["@context"]) return item;
      const { ["@context"]: _ctx, ...rest } = item;
      return rest;
    });
  const jsonLd =
    graphItems.length > 1
      ? {
          "@context": "https://schema.org",
          "@graph": graphItems,
        }
      : serviceSchema;
  const ogImage = toAbsoluteUrl(config.ogImage) || DEFAULT_OG_IMAGE;

  usePageMetadata({
    title: metaTitle,
    description: metaDescription,
    canonical,
    jsonLd,
    ogImage,
  });

  const createRevealProps = (delay = 0, distance = 48) => ({
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  });

  const createItemRevealProps = (index = 0, distance = 28) => ({
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] },
  });

  const emphasizePriceText = (text, keyPrefix = "tier") => {
    if (!text) return text;
    const amountRegex = /(\$[\d,]+(?:[–-]\$?[\d,]+)?\+?)/g;
    const nodes = [];
    let lastIndex = 0;
    let match;
    let segmentIndex = 0;
    while ((match = amountRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        nodes.push(
          <span key={`${keyPrefix}-text-${segmentIndex++}`}>
            {text.slice(lastIndex, match.index)}
          </span>
        );
      }
      nodes.push(
        <span
          key={`${keyPrefix}-amount-${segmentIndex++}`}
          className="ml-1 text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-none"
        >
          {match[0]}
        </span>
      );
      lastIndex = amountRegex.lastIndex;
    }
    if (lastIndex < text.length) {
      nodes.push(
        <span key={`${keyPrefix}-text-${segmentIndex++}`}>{text.slice(lastIndex)}</span>
      );
    }
    return nodes.length ? nodes : text;
  };

  const computedFlagshipIds =
    flagshipServiceIds && flagshipServiceIds.length
      ? flagshipServiceIds
      : services.map((service) => service.id);
  const flagshipServices = services.filter((service) => computedFlagshipIds.includes(service.id));
  const supportingServices = services.filter((service) => !computedFlagshipIds.includes(service.id));
  const hasSupportingServices = supportingServices.length > 0;
  const flagshipGridClass =
    flagshipServices.length === 1 ? "md:grid-cols-1" : "md:grid-cols-2";
  const flagshipCardClass =
    flagshipCardVariant === "compact"
      ? "flex h-full flex-col rounded-[24px] border border-white/20 bg-white/5 p-6 shadow-xl backdrop-blur"
      : "flex h-full flex-col rounded-[32px] border border-white/20 bg-white/5 p-8 shadow-2xl backdrop-blur";
  const overviewLayoutClass = supportingCardsFullWidth
    ? "space-y-10"
    : `grid gap-10 ${hasSupportingServices ? "lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]" : ""}`;
  const supportingCardsWrapperClass = supportingCardsFullWidth ? "grid gap-6 md:grid-cols-2" : "space-y-8";

  const handlePrevTestimonial = () => {
    if (!totalTestimonials) return;
    setTestimonialIndex((prev) => (prev - 1 + totalTestimonials) % totalTestimonials);
  };

  const handleNextTestimonial = () => {
    if (!totalTestimonials) return;
    setTestimonialIndex((prev) => (prev + 1) % totalTestimonials);
  };
  const hasValueProps = Array.isArray(valueProps) && valueProps.length > 0;
  const hasPricingGroups =
    Array.isArray(pricingSection?.groups) &&
    pricingSection.groups.some((group) => Array.isArray(group.cards) && group.cards.length > 0);
  const hasPricingCards = Array.isArray(pricingSection?.cards) && pricingSection.cards.length > 0;
  const pricingCardsCount = hasPricingCards ? pricingSection.cards.length : 0;
  const pricingGridColumns =
    pricingCardsCount >= 3 ? "lg:grid-cols-3" : pricingCardsCount === 2 ? "lg:grid-cols-2" : "lg:grid-cols-1";
  const isSplitLayout = pricingSection?.layout === "automationSplit";
  const shouldRenderPricing = Boolean(
    pricingSection &&
      (isSplitLayout ? Array.isArray(pricingSection.cards) && pricingSection.cards.length >= 2 : hasPricingGroups || hasPricingCards)
  );
  const isAutomationPricingCta =
    typeof pricingSection?.cta?.label === "string" &&
    pricingSection.cta.label.toLowerCase().includes("automation");
  const pricingSectionMarkup = !shouldRenderPricing
    ? null
    : (
        <section className="px-6 py-16 lg:py-20" style={heroStyle} id="pricing">
          <div className="mx-auto max-w-6xl space-y-10">
            <motion.div {...createRevealProps(0.15)}>
              <p className="font-accent text-sm uppercase tracking-[0.45em] md:text-base" style={labelStyle}>
                {pricingSection.kicker || "Pricing"}
              </p>
              <h2 className="mt-3 font-serifalt text-4xl leading-tight md:text-5xl" style={headingStyle}>
                {pricingSection.heading || "Transparent packages."}
              </h2>
              {pricingSection.cta ? (
                <Link to={pricingSection.cta.href || "#"} className="mt-4 inline-flex">
                  <Button
                    className={`rounded-full font-accent uppercase transition ${
                      isAutomationPricingCta
                        ? "border px-7 py-3 text-sm tracking-[0.35em]"
                        : "px-6 py-3 text-xs tracking-[0.3em]"
                    }`}
                    style={isAutomationPricingCta ? automationCtaStyle : undefined}
                  >
                    {pricingSection.cta.label || "Learn More"}
                  </Button>
                </Link>
              ) : (
                pricingSection.subheading && (
                  <p className="mt-3 text-base" style={mutedStyle}>
                    {pricingSection.subheading}
                  </p>
                )
              )}
            </motion.div>
            {isSplitLayout ? (
              <div className="grid gap-10 md:grid-cols-2 md:gap-12 md:divide-x md:divide-white/15">
                {pricingSection.cards.slice(0, 2).map((card, columnIndex) => (
                  <div key={card.title || columnIndex} className={columnIndex === 1 ? "md:pl-10" : ""}>
                    <div className="flex flex-col gap-6 rounded-3xl border border-white/15 bg-white/5 p-6" style={{ borderColor: borderColors.base }}>
                      <div className="space-y-6">
                        <h3 className="font-serifalt text-3xl md:text-4xl" style={headingStyle}>
                          {card.heading || card.title}
                        </h3>
                        {Array.isArray(card.pricingTiers) && card.pricingTiers.length > 0 && (
                          <ul className="space-y-2 text-base font-serifalt leading-snug md:text-lg" style={headingStyle}>
                            {card.pricingTiers.map((tier, tierIndex) => (
                              <li key={tier} className="flex flex-wrap gap-1">
                                {emphasizePriceText(tier, `${card.title || columnIndex}-${tierIndex}`)}
                              </li>
                            ))}
                          </ul>
                        )}
                        {card.note && (
                          <p className="text-sm italic leading-relaxed" style={subtleTextStyle}>
                            {card.note}
                          </p>
                        )}
                      </div>
                      {Array.isArray(card.points) && card.points.length > 0 && (
                        <div className="rounded-2xl border border-white/15 bg-white/5 p-5" style={{ borderColor: borderColors.soft }}>
                          <p className="text-sm font-accent uppercase tracking-[0.35em] md:text-base" style={labelStyle}>
                            {card.pointsLabel || "Automations to choose from"}
                          </p>
                          <ul className="mt-4 space-y-3 text-sm leading-relaxed md:text-base" style={mutedStyle}>
                            {card.points.map((point) => (
                              <li key={point} className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={labelStyle} />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : hasPricingGroups ? (
              <div className="space-y-12">
                {pricingSection.groups.map((group, index) => {
                  if (!Array.isArray(group.cards) || !group.cards.length) return null;
                  return (
                    <motion.div key={group.title || index} className="space-y-8" {...createRevealProps(0.2 + index * 0.1)}>
                      {group.title && (
                        <p className="font-accent text-xs uppercase tracking-[0.4em]" style={labelStyle}>
                          {group.title}
                        </p>
                      )}
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {group.cards.map((card) => (
                          <div
                            key={card.title}
                            className="flex h-full flex-col rounded-3xl border border-white/15 bg-white/5 p-6"
                            style={{ borderColor: borderColors.base }}
                          >
                            <p className="text-sm font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                              {card.title}
                            </p>
                            <p className="mt-2 text-3xl font-serifalt" style={headingStyle}>
                              {card.price}
                            </p>
                            {Array.isArray(card.points) && card.points.length > 0 && (
                              <ul className="mt-4 space-y-2 text-sm leading-relaxed" style={mutedStyle}>
                                {card.points.map((point) => (
                                  <li key={point} className="flex items-start gap-2">
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={labelStyle} />
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className={`mt-10 grid gap-8 md:grid-cols-2 ${pricingGridColumns}`}>
                {pricingSection.cards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    className="flex h-full flex-col gap-6 rounded-3xl border border-white/15 bg-white/5 p-6"
                    style={{ borderColor: borderColors.base }}
                    {...createItemRevealProps(index)}
                  >
                    <div className="space-y-4">
                      {card.title && (
                        <p className="text-sm font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                          {card.title}
                        </p>
                      )}
                      {card.heading && (
                        <p className="text-3xl font-serifalt leading-tight md:text-4xl" style={headingStyle}>
                          {card.heading}
                        </p>
                      )}
                      {card.description && (
                        <p className="text-base leading-relaxed" style={mutedStyle}>
                          {card.description}
                        </p>
                      )}
                      {card.price && (
                        <p className="pt-3 text-5xl font-serifalt font-semibold leading-snug tracking-tight md:text-6xl" style={headingStyle}>
                          {card.price}
                        </p>
                      )}
                      {Array.isArray(card.points) && card.points.length > 0 && (
                        <div
                          className="mt-4 rounded-2xl border border-dashed border-white/25 p-4"
                          style={{ borderColor: borderColors.soft }}
                        >
                          <p className="text-sm font-accent uppercase tracking-[0.35em] md:text-base" style={labelStyle}>
                            {card.pointsLabel || "Automations to choose from"}
                          </p>
                          <ul className="mt-3 space-y-3 text-sm leading-relaxed md:text-base" style={mutedStyle}>
                            {card.points.map((point) => (
                              <li key={point} className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={labelStyle} />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    {(Array.isArray(card.pricingTiers) && card.pricingTiers.length > 0) || card.note ? (
                      <div
                        className="mt-2 flex flex-col gap-4 rounded-2xl border border-white/15 bg-white/5 p-5"
                        style={{ borderColor: borderColors.soft }}
                      >
                        {Array.isArray(card.pricingTiers) && card.pricingTiers.length > 0 ? (
                          <div>
                            <p className="text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                              Pricing
                            </p>
                            <ul className="mt-3 space-y-2 text-base font-serifalt leading-snug md:text-lg" style={headingStyle}>
                              {card.pricingTiers.map((tier, tierIndex) => (
                                <li key={tier} className="flex flex-wrap gap-1">
                                  {emphasizePriceText(tier, `${card.title}-${tierIndex}`)}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                        {card.note && (
                          <p className="text-sm italic leading-relaxed" style={subtleTextStyle}>
                            {card.note}
                          </p>
                        )}
                      </div>
                    ) : null}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      );

  const serviceOverviewMarkup = !showServiceOverview
    ? null
    : (
        <section className="px-6 py-16 lg:py-20" style={heroStyle} id="services">
          <div className="mx-auto max-w-6xl space-y-12">
            <motion.div {...createRevealProps(0.05)}>
              <p className="font-accent text-sm uppercase tracking-[0.45em] md:text-base" style={labelStyle}>
                Service overview
              </p>
              <h2 className="mt-3 font-serifalt text-4xl leading-tight md:text-5xl" style={headingStyle}>
                {overviewHeading}
              </h2>
            </motion.div>
            <div className={overviewLayoutClass}>
              <div
                className={`grid gap-8 ${flagshipGridClass}`}
                style={flagshipServices.length === 1 ? { maxWidth: "820px", margin: "0 auto" } : undefined}
              >
                {flagshipServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.article
                      key={service.id}
                      {...createItemRevealProps(index)}
                      className={flagshipCardClass}
                      style={{ borderColor: borderColors.strong }}
                    >
                      <div className="flex items-center gap-4">
                        <span className="rounded-full bg-white/10 p-3">
                          {Icon ? <Icon className="h-5 w-5" style={labelStyle} /> : null}
                        </span>
                        <h3 className="font-serifalt text-3xl">{service.title}</h3>
                      </div>
                      <p className="mt-4 text-base leading-relaxed" style={mutedStyle}>
                        {service.summary}
                      </p>
                      {showDeliverablesInOverview && (service.deliverables || []).length > 0 && (
                        <div className="mt-6 text-sm" style={mutedStyle}>
                          {service.deliverablesLabel && (
                            <p className="pb-3 text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                              {service.deliverablesLabel}
                            </p>
                          )}
                          {(() => {
                            const deliverables = service.deliverables || [];
                            const columns = service.deliverablesColumns && service.deliverablesColumns > 1 ? service.deliverablesColumns : 1;
                            if (columns === 1) {
                              return (
                                <ul className="space-y-2">
                                  {deliverables.map((deliverable) => (
                                    <li key={deliverable} className="flex items-start gap-2">
                                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={labelStyle} />
                                      <span>{deliverable}</span>
                                    </li>
                                  ))}
                                </ul>
                              );
                            }
                            const perColumn = Math.ceil(deliverables.length / columns);
                            const chunks = Array.from({ length: columns }, (_, columnIndex) =>
                              deliverables.slice(columnIndex * perColumn, columnIndex * perColumn + perColumn).filter(Boolean)
                            ).filter((chunk) => chunk.length > 0);
                            return (
                              <div className={`grid gap-6 grid-cols-1 ${columns === 2 ? "md:grid-cols-2" : ""}`}>
                                {chunks.map((chunk, idx) => (
                                  <ul key={`deliverable-column-${idx}`} className="space-y-2">
                                    {chunk.map((deliverable) => (
                                      <li key={deliverable} className="flex items-start gap-2">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={labelStyle} />
                                        <span>{deliverable}</span>
                                      </li>
                                    ))}
                                  </ul>
                                ))}
                              </div>
                            );
                          })()}
                        </div>
                      )}
                      <a
                        href={`#${service.id}-deep-dive`}
                        className="mt-8 inline-flex w-fit items-center rounded-full border px-6 py-2 text-xs font-accent uppercase tracking-[0.3em] transition"
                        style={secondaryButtonStyle}
                      >
                        Explore the deep dive
                      </a>
                    </motion.article>
                  );
                })}
              </div>
              {hasSupportingServices && (
                <div className={supportingCardsWrapperClass}>
                  {supportingServices.map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <motion.article
                        key={service.id}
                        {...createItemRevealProps(index)}
                        className="flex flex-col gap-4 rounded-[24px] border border-dashed border-white/30 bg-transparent p-5"
                        style={{ borderColor: borderColors.dashed }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="rounded-full bg-white/10 p-2">
                            {Icon ? <Icon className="h-5 w-5" style={labelStyle} /> : null}
                          </span>
                          <div>
                            <p className="text-[11px] font-accent uppercase tracking-[0.45em]" style={labelStyle}>
                              Supporting build
                            </p>
                            <h3 className="font-serifalt text-2xl">{service.title}</h3>
                          </div>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed" style={mutedStyle}>
                          {service.summary}
                        </p>
                        {showDeliverablesInOverview && (
                          <ul className="mt-2 space-y-2 text-sm" style={mutedStyle}>
                            {(service.deliverables || []).map((deliverable) => (
                              <li key={deliverable} className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4" style={labelStyle} />
                                {deliverable}
                              </li>
                            ))}
                          </ul>
                        )}
                        <a
                          href={`#${service.id}-deep-dive`}
                          className="mt-3 inline-flex items-center justify-center rounded-full border px-5 py-2 text-xs font-accent uppercase tracking-[0.3em] transition"
                          style={{ ...secondaryButtonStyle, borderColor: borderColors.soft }}
                        >
                          View delivery details
                        </a>
                      </motion.article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      );

  return (
    <div className="min-h-screen" style={pageStyle}>
      <StickyHeader theme={theme} forceVisible />

      <section
        className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6"
        style={{ ...heroStyle, paddingTop: heroSafePadding, paddingBottom: heroBottomPadding }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_65%)]" />
        <motion.div className="relative mx-auto flex w-full max-w-5xl flex-col gap-12 text-left" {...createRevealProps()}>
          <p className="font-accent text-lg uppercase tracking-[0.5em] md:text-2xl" style={labelStyle}>
            {heroEyebrow}
          </p>
          <h1 className="font-serifalt text-5xl leading-tight md:text-6xl" style={headingStyle}>
            {heroTitle}
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
        </motion.div>
      </section>
      {serviceOverviewMarkup}

      <section className="px-6 py-16 lg:py-24" style={heroStyle} id="deep-dive">
        <div className="mx-auto max-w-6xl space-y-12">
          <motion.div {...createRevealProps(0.08)}>
            <p className="font-accent text-sm uppercase tracking-[0.45em] md:text-base" style={labelStyle}>
              Deep dives
            </p>
            <h2 className="mt-3 font-serifalt text-4xl leading-tight md:text-5xl" style={headingStyle}>
              Problem → solution → benefit for every service.
            </h2>
          </motion.div>
          <div className="space-y-10">
            {services.map((service, index) => {
              const Icon = service.icon;
              const portfolioCtaProps = {
                className:
                  "inline-flex items-center rounded-full border px-5 py-2 text-xs font-accent uppercase tracking-[0.3em] transition",
                style: secondaryButtonStyle,
                to: "/portfolio",
              };
              return (
                <motion.article
                  key={service.id}
                  {...createItemRevealProps(index)}
                  id={`${service.id}-deep-dive`}
                  className="rounded-3xl border border-white/15 bg-transparent p-8 shadow-2xl backdrop-blur"
                  style={{ borderColor: borderColors.base }}
                >
                  <div className="flex items-center gap-3 pb-6">
                    <span className="rounded-full border border-white/20 p-3" style={{ borderColor: borderColors.soft }}>
                      {Icon ? <Icon className="h-6 w-6" style={labelStyle} /> : null}
                    </span>
                    <h3 className="font-serifalt text-3xl">{service.title}</h3>
                  </div>
                  <div
                    className={`grid gap-8 ${
                      showDetailImages && service.detailImage ? "lg:grid-cols-[1.2fr_0.8fr]" : "lg:grid-cols-1"
                    } lg:items-stretch`}
                  >
                    <div className="space-y-6">
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
                              {service.detail?.[key]}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                          Use cases
                        </p>
                        <ul className="mt-3 space-y-2 text-sm" style={mutedStyle}>
                          {(service.detail?.useCases || []).map((useCase) => (
                            <li key={useCase} className="flex items-start gap-2">
                              <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0" style={labelStyle} />
                              <span>{useCase}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link {...portfolioCtaProps}>See it in action</Link>
                    </div>
                    {showDetailImages && service.detailImage && (
                      <div className="hidden lg:flex lg:flex-col lg:rounded-3xl lg:border lg:border-white/15 lg:bg-white/5 lg:p-4" style={{ borderColor: borderColors.base }}>
                        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black/20">
                          <img
                            src={service.detailImage}
                            alt={service.detailImageAlt || `${service.title} preview`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {pricingSectionMarkup}

      <section className="px-6 py-16 lg:py-20" style={heroStyle} id="value">
        <div className="mx-auto max-w-6xl space-y-10">
          <motion.div {...createRevealProps(0.1)}>
            <p className="font-accent text-sm uppercase tracking-[0.45em] md:text-base" style={labelStyle}>
              Why choose me
            </p>
            <h2 className="mt-3 font-serifalt text-4xl leading-tight md:text-5xl" style={headingStyle}>
              {valueHeading}
            </h2>
          </motion.div>
          {hasValueProps && (
            <div className="grid gap-6 md:grid-cols-2">
              {valueProps.map((prop, index) => {
                const Icon = prop.icon;
                return (
                  <motion.div
                    key={prop.title}
                    {...createItemRevealProps(index)}
                    className="rounded-3xl border border-white/15 bg-transparent p-6"
                    style={{ borderColor: borderColors.base }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="rounded-full border border-white/20 p-3" style={{ borderColor: borderColors.soft }}>
                        {Icon ? <Icon className="h-5 w-5" style={labelStyle} /> : null}
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
                  </motion.div>
                );
              })}
            </div>
          )}
          <motion.div
            className="rounded-3xl border border-white/15 bg-transparent p-6"
            style={{ borderColor: borderColors.base }}
            {...createRevealProps(0.18)}
          >
            <div className="grid gap-6 md:grid-cols-2">
              {comparisonPoints.map((point, index) => (
                <motion.div
                  key={point.attribute}
                  {...createItemRevealProps(index)}
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16 lg:py-20" style={heroStyle} id="process">
        <div className="mx-auto max-w-6xl space-y-10">
          <motion.div {...createRevealProps(0.15)}>
            <p className="font-accent text-sm uppercase tracking-[0.45em] md:text-base" style={labelStyle}>
              Process
            </p>
            <h2 className="mt-3 font-serifalt text-4xl leading-tight md:text-5xl" style={headingStyle}>
              {processHeading}
            </h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-5">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  {...createItemRevealProps(index)}
                  className="relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-5 pt-6"
                  style={{ borderColor: borderColors.soft }}
                >
                  <div
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-2xl border"
                    style={{ borderColor: borderColors.soft, backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    {Icon ? <Icon className="h-5 w-5" style={labelStyle} /> : null}
                  </div>
                  <p className="text-xs font-accent uppercase tracking-[0.35em]" style={labelStyle}>
                    {step.timeframe}
                  </p>
                  <h3 className="mt-4 font-serifalt text-xl" style={headingStyle}>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm" style={mutedStyle}>
                    {step.detail}
                  </p>
                  <p
                    className="mt-auto text-xs font-accent uppercase tracking-[0.35em] text-right"
                    style={labelStyle}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:py-20" style={heroStyle}>
        <div className="mx-auto max-w-6xl space-y-12">
          <motion.div className="space-y-6" {...createRevealProps(0.2)}>
            <p className="font-accent text-sm uppercase tracking-[0.45em] md:text-base" style={labelStyle}>
              Testimonials
            </p>
            <div className="space-y-4">
              <div
                className="relative overflow-hidden rounded-3xl border border-white/15"
                style={{
                  borderColor: borderColors.base,
                  minHeight: computedTestimonialHeight,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={`${testimonial.author}-${index}`}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === testimonialIndex ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <blockquote
                      ref={(el) => {
                        testimonialRefs.current[index] = el;
                      }}
                      className="flex h-full flex-col items-center justify-center gap-4 px-6 py-8 text-center text-lg"
                    >
                      <p className="font-serifalt text-2xl leading-snug" style={headingStyle}>
                        “{testimonial.quote}”
                      </p>
                      <div className="text-sm" style={mutedStyle}>
                        <p className="font-semibold" style={headingStyle}>
                          {testimonial.author}
                        </p>
                        <p>
                          {testimonial.title}, {testimonial.company}
                        </p>
                      </div>
                    </blockquote>
                  </div>
                ))}
                {totalTestimonials > 1 && (
                  <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 flex-col gap-2">
                    <button
                      type="button"
                      className="pointer-events-auto rounded-full border px-3 py-2 text-xs font-accent uppercase tracking-[0.35em]"
                      style={{ ...secondaryButtonStyle, borderColor: borderColors.base }}
                      onClick={handlePrevTestimonial}
                      aria-label="Previous testimonial"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="pointer-events-auto rounded-full border px-3 py-2 text-xs font-accent uppercase tracking-[0.35em]"
                      style={{ ...secondaryButtonStyle, borderColor: borderColors.base }}
                      onClick={handleNextTestimonial}
                      aria-label="Next testimonial"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16 lg:py-20" style={heroStyle}>
        <div className="mx-auto max-w-6xl space-y-10">
          <motion.div {...createRevealProps(0.25)}>
            <p className="font-accent text-sm uppercase tracking-[0.45em] md:text-base" style={labelStyle}>
              FAQ
            </p>
            <h2 className="mt-3 font-serifalt text-4xl leading-tight md:text-5xl" style={headingStyle}>
              Questions teams usually ask.
            </h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.details
                key={faq.question}
                className="group rounded-3xl border border-white/10 bg-white/5 p-5"
                style={{ borderColor: borderColors.soft }}
                {...createItemRevealProps(index)}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-serifalt text-xl">
                  <span>{faq.question}</span>
                  <span className="ml-4 text-2xl font-semibold leading-none">
                    <span className="inline group-open:hidden">+</span>
                    <span className="hidden group-open:inline">-</span>
                  </span>
                </summary>
                <div className="max-h-0 overflow-hidden transition-[max-height] duration-300 ease-out group-open:max-h-[400px]">
                  <p className="mt-3 text-sm leading-relaxed" style={mutedStyle}>
                    {faq.answer}
                  </p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <section className="flex items-center px-6 py-20 lg:py-34" style={heroStyle}>
        <motion.div className="mx-auto flex max-w-4xl flex-col items-center justify-center space-y-10 text-center" {...createRevealProps(0.3)}>
          <p className="font-serifalt text-4xl leading-tight md:text-5xl" style={headingStyle}>
            {readyTitle}
          </p>
          <p className="text-base" style={mutedStyle}>
            {readyDescription}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button
                className="rounded-full px-8 py-4 text-sm font-accent uppercase tracking-[0.3em]"
                style={primaryButtonStyle}
              >
                Get a Quote
              </Button>
            </Link>
            <Link
              to="/contact"
              className="rounded-full border px-8 py-4 text-sm font-accent uppercase tracking-[0.3em] transition"
              style={secondaryButtonStyle}
            >
              Book a Call
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer theme={theme} mainTheme={mainTheme} />
    </div>
  );
}
