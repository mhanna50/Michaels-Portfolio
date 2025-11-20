import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

const parseHex = (color) => {
  if (typeof color !== "string") return null;
  const hex = color.trim();
  if (!hex.startsWith("#")) return null;
  const normalized = hex.length === 4
    ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
    : hex;
  if (normalized.length !== 7) return null;
  const r = parseInt(normalized.slice(1, 3), 16);
  const g = parseInt(normalized.slice(3, 5), 16);
  const b = parseInt(normalized.slice(5, 7), 16);
  if ([r, g, b].some((value) => Number.isNaN(value))) return null;
  return { r, g, b };
};

const isColorLight = (color) => {
  const rgb = parseHex(color);
  if (!rgb) return true;
  const { r, g, b } = rgb;
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.6;
};

const servicesChildren = [
  { label: "Web Design & Branding", href: "/services" },
  { label: "Automations", href: "/services/automations" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", children: servicesChildren },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

const socialLinks = [
  {
    label: "Contact",
    href: "mailto:contact@hannawebstudio.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/mhanna50",
    icon: Github,
  },
];

export default function Footer({ mainTheme, theme }) {
  const footerTheme = theme?.footer || mainTheme?.footer;
  const footerStyle = footerTheme
    ? {
        background: footerTheme.bg,
        color: footerTheme.text,
      }
    : undefined;
  const accentColor = footerTheme?.accent || theme?.accent || mainTheme?.accent || "#F6F8F6";
  const footerTextIsLight = isColorLight(footerTheme?.text);
  const connectButtonColors = {
    baseBg: footerTheme?.buttonBg || "rgba(255,255,255,0.05)",
    baseBorder: footerTheme?.buttonBorder || "rgba(255,255,255,0.15)",
    baseText: footerTheme?.buttonText || footerTheme?.text || "rgba(246,248,246,0.9)",
    hoverBg: footerTheme?.buttonHoverBg || accentColor,
    hoverBorder: footerTheme?.buttonHoverBorder || accentColor,
    hoverText: footerTheme?.buttonHoverText || (footerTextIsLight ? "#050505" : "#F6F8F6"),
    iconBg: footerTheme?.iconBg || "rgba(255,255,255,0.1)",
    iconText: footerTheme?.iconText || footerTheme?.text || "rgba(246,248,246,0.9)",
    iconHoverBg: footerTheme?.iconHoverBg || (footerTextIsLight ? "#050505" : "#F6F8F6"),
    iconHoverText: footerTheme?.iconHoverText || (footerTextIsLight ? accentColor : "#050505"),
  };
  const connectButtonVars = {
    "--footer-btn-bg": connectButtonColors.baseBg,
    "--footer-btn-border": connectButtonColors.baseBorder,
    "--footer-btn-text": connectButtonColors.baseText,
    "--footer-btn-hover-bg": connectButtonColors.hoverBg,
    "--footer-btn-hover-border": connectButtonColors.hoverBorder,
    "--footer-btn-hover-text": connectButtonColors.hoverText,
    "--footer-icon-bg": connectButtonColors.iconBg,
    "--footer-icon-text": connectButtonColors.iconText,
    "--footer-icon-hover-bg": connectButtonColors.iconHoverBg,
    "--footer-icon-hover-text": connectButtonColors.iconHoverText,
  };

  return (
    <footer
      className="relative overflow-hidden text-accent-light"
      style={footerStyle}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(234,219,200,0.18),_transparent_60%)]" />
        <div className="absolute -bottom-10 -right-20 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -top-20 -left-24 h-56 w-56 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mx-auto max-w-6xl px-6 py-16 md:py-20"
      >
        <div className="flex flex-col gap-14 md:items-center lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-5 text-left">
            <p className="font-accent uppercase tracking-[0.35em] text-base text-accent-light/70">
              Michael Hanna · Designer & Developer
            </p>
            <h2 className="font-serifalt text-4xl leading-tight text-white md:text-[2.8rem]">
              Let&apos;s connect—whether you&apos;re growing a business, refreshing a brand, or just exploring ideas.
            </h2>
            <p className="font-serifalt text-base leading-relaxed text-accent-light/80">
              I guide projects from brainstorming to launch, explaining every step so you always know how your website and automations are
              helping the business.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-12 md:w-full md:max-w-3xl md:gap-12 md:items-stretch md:justify-between md:justify-items-stretch md:mx-auto lg:mx-0 lg:max-w-none lg:gap-16 lg:pl-10">
            <div className="space-y-5 text-left md:mx-0 md:flex md:h-full md:w-full md:flex-col md:justify-between md:space-y-6 md:py-6">
              <p className="font-accent uppercase tracking-[0.3em] text-base text-accent-light/70">
                Navigate
              </p>
              <nav className="flex flex-col items-start gap-4 font-serifalt text-xl text-accent-light/90 md:text-2xl">
                {navLinks.map(({ label, href, children }) => (
                  <div key={label} className="space-y-2">
                    <Link
                      to={href}
                      className="transition-colors duration-200 hover:text-white"
                    >
                      {label}
                    </Link>
                    {Array.isArray(children) && children.length > 0 && (
                      <div className="ml-3 flex flex-col gap-1 pl-3 text-left">
                        {children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="font-accent text-sm uppercase tracking-[0.3em] text-accent-light/80 transition-colors duration-200 hover:text-white"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            <div className="space-y-0 text-left md:mx-0 md:flex md:h-full md:w-full md:flex-col md:justify-between md:space-y-0 md:py-6">
              <p className="font-accent uppercase tracking-[0.3em] text-base text-accent-light/70">
                Connect
              </p>
              <div className="flex flex-col items-start gap-2.5">
                {socialLinks.map(({ label, href, icon: Icon, internal, subtitle }) => {
                  const sharedClasses =
                    "group inline-flex items-center gap-3 rounded-full border px-5 py-3 font-serifalt text-sm transition-all duration-300 hover:-translate-y-1 border-[var(--footer-btn-border)] bg-[var(--footer-btn-bg)] text-[var(--footer-btn-text)] hover:border-[var(--footer-btn-hover-border)] hover:bg-[var(--footer-btn-hover-bg)] hover:text-[var(--footer-btn-hover-text)]";
                  const content = (
                    <>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--footer-icon-bg)] text-[var(--footer-icon-text)] transition-colors duration-300 group-hover:bg-[var(--footer-icon-hover-bg)] group-hover:text-[var(--footer-icon-hover-text)]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="flex flex-col text-left leading-tight">
                        <span className="text-base">{label}</span>
                        {subtitle && (
                          <span className="text-xs font-serifalt text-accent-light/70">
                            {subtitle}
                          </span>
                        )}
                      </span>
                    </>
                  );

                  const isInternal = Boolean(internal);

                  return isInternal ? (
                    <Link key={label} to={href} className={sharedClasses} aria-label={label} style={connectButtonVars}>
                      {content}
                    </Link>
                  ) : (
                    <a
                      key={label}
                      href={href}
                      className={sharedClasses}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      style={connectButtonVars}
                    >
                      {content}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-accent-light/70 md:flex-row md:items-center md:justify-between">
          <p className="font-serifalt">
            © {new Date().getFullYear()} Michael Hanna. Designed and built with care.
          </p>
          
        </div>
      </motion.div>
    </footer>
  );
}
