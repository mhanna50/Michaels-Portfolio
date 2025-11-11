import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, FileUser } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
];

const socialLinks = [
  {
    label: "Email",
    href: "mailto:michaelhanna50@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/yourprofile",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/mhanna50",
    icon: Github,
  },
  {
    label: "Resume",
    href: "https://github.com/yourusername",
    icon: FileUser,
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
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl space-y-5">
            <p className="font-accent uppercase tracking-[0.35em] text-base text-accent-light/70">
              Michael Hanna · Portfolio
            </p>
            <h2 className="font-serifalt text-4xl leading-tight text-white md:text-[2.8rem]">
              Lets connect - whether your a building a brand, business, or just exploring possibilities.
            </h2>
            <p className="font-serifalt text-base leading-relaxed text-accent-light/80">
              From UI/UX to deployment, I build digital products that feel human, refined,
              and delightful to use.
            </p>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 lg:gap-16">
            <div className="space-y-5">
              <p className="font-accent uppercase tracking-[0.3em] text-base text-accent-light/70">
                Navigate
              </p>
              <nav className="flex flex-col gap-4 font-serifalt text-lg text-accent-light/90">
                {navLinks.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-5">
              <p className="font-accent uppercase tracking-[0.3em] text-base text-accent-light/70">
                Connect
              </p>
              <div className="flex flex-col gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-serifalt text-sm text-accent-light/90 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-primary-dark"
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-accent-light transition-colors duration-300 group-hover:bg-primary-dark group-hover:text-accent">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-base">{label}</span>
                  </a>
                ))}
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
