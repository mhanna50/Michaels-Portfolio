import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, GraduationCap } from 'lucide-react';

const THEME_TRANSITION = "background 600ms ease, background-color 600ms ease, color 600ms ease, border-color 600ms ease";

const withTransition = (style) => ({
  transition: THEME_TRANSITION,
  ...(style || {}),
});

const educationHighlight = {
  institution: "West Chester University",
  degree: "B.S. Computer Science",
  graduation: "Class of 2025",
  focusAreas: [
    "Software planning and delivery",
    "Clean, intuitive design",
    "Quality assurance and testing",
  ],
  description:
    "Studied how software is planned, built, and improved—with emphasis on problem-solving, clear communication, and creating useful digital tools."
};

const sampleCertifications = [
  {
    title: "Google UX Design Certificate",
    issuer: "Grow with Google",
    date: "2023",
    url: "https://grow.google/uxdesign/",
  },
  {
    title: "Professional Scrum Master I",
    issuer: "Scrum.org",
    date: "2023",
    url: "https://www.scrum.org/",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2022",
    url: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
  },
];

const skillHighlights = [
  {
    key: "languages",
    label: "LANGUAGES",
    title: "Programming Languages",
    items: ["JavaScript", "TypeScript", "Python", "Swift", "Java", "HTML/CSS"],
  },
  {
    key: "frameworks",
    label: "FRAMEWORKS",
    title: "Frameworks & Libraries",
    items: ["React", "Node.js", "Next.js", "SwiftUI", "Django", "Vite", "Tailwind CSS", "Framer Motion"],
  },
  {
    key: "tools",
    label: "TOOLS",
    title: "Tools & Platforms",
    items: ["WordPress", "Git", "Docker", "AWS", "Figma", "API Integrations", "Supabase", "PostgreSQL"],
  },
  {
    key: "Soft Skills",
    label: "CAPABILITIES",
    title: "Soft Skills & Other",
    items: ["RESTful APIs", "CI/CD", "Agile/Scrum", "Test Automation", "UI/UX Design", "Collaboration", "Detail-Oriented"],
  },
];

export default function CertificationsSection({ theme }) {
  const sectionTheme = theme?.sections?.certifications;
  const palette = sectionTheme?.palette || {};
  const sectionStyle = sectionTheme
    ? withTransition({
        background: sectionTheme.bg,
        color: sectionTheme.text,
      })
    : undefined;
  const headingStyle = palette.heading ? { color: palette.heading } : undefined;
  const accentStyle = palette.accent ? { color: palette.accent } : undefined;
  const mutedStyle = palette.muted ? { color: palette.muted } : undefined;
  const dividerStyle = palette.divider ? { backgroundColor: palette.divider } : undefined;
  const cardStyle = palette.card
    ? withTransition({
        background: palette.card.bg,
        borderColor: palette.card.border,
        color: palette.card.text,
      })
    : undefined;
  const cardMutedStyle = palette.card?.muted ? { color: palette.card.muted } : undefined;
  const cardAltStyle = palette.cardAlt
    ? withTransition({
        background: palette.cardAlt.bg,
        borderColor: palette.cardAlt.border,
        color: palette.cardAlt.text,
      })
    : cardStyle;
  const skillDeckPalette = palette.skillDeck || {};
  const degreeChipStyle = skillDeckPalette.tagBg
    ? withTransition({
        backgroundColor: skillDeckPalette.tagBg,
        color: skillDeckPalette.tagText,
        borderColor: skillDeckPalette.tagBorder,
      })
    : undefined;
  const focusChipStyle = degreeChipStyle;
  const skillDeckLabelStyle = skillDeckPalette.labelBg
    ? withTransition({
        backgroundColor: skillDeckPalette.labelBg,
        color: skillDeckPalette.labelText,
      })
    : accentStyle;
  const skillDeckSubLabelStyle = skillDeckPalette.sublabelText
    ? { color: skillDeckPalette.sublabelText }
    : mutedStyle;
  const skillDeckCountStyle = skillDeckPalette.countText
    ? { color: skillDeckPalette.countText }
    : mutedStyle;
  const skillGroupBadgeStyle = skillDeckPalette.groupBadgeBg
    ? withTransition({
        backgroundColor: skillDeckPalette.groupBadgeBg,
        color: skillDeckPalette.groupBadgeText,
        borderColor: skillDeckPalette.groupBadgeBorder,
      })
    : undefined;
  const skillItemStyle = skillDeckPalette.itemBg
    ? withTransition({
        backgroundColor: skillDeckPalette.itemBg,
        borderColor: skillDeckPalette.itemBorder,
        color: skillDeckPalette.itemText,
      })
    : undefined;
  const skillCardStyle = cardAltStyle;
  const sectionFallbackClass = sectionStyle ? '' : 'bg-accent-light';
  const accentFallbackClass = accentStyle ? '' : 'text-primary-dark/70';
  const headingFallbackClass = headingStyle ? '' : 'text-black';
  const dividerFallbackClass = dividerStyle ? '' : 'bg-[#C97064]';
  const cardFallbackClass = cardStyle ? '' : 'border-[#E8DCC4] bg-gradient-to-r from-[#FFF9F0] via-white to-[#FFF4E4]';
  const innerDividerFallbackClass = dividerStyle ? '' : 'bg-[#C97064]/40';
  const certificationIconFallbackClass = palette.cardAlt ? '' : 'bg-[#F3F5F2] transition-colors duration-300 group-hover:bg-[#A8B8A0]';
  const awardFallbackClass = palette.cardAlt ? '' : 'text-[#6D8575] transition-colors duration-300 group-hover:text-white';
  const externalIconFallbackClass = palette.cardAlt ? '' : 'text-[#9BA79D]';

  return (
    <section
      id="credentials"
      className={`py-32 px-6 ${sectionFallbackClass}`}
      style={sectionStyle}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <span
            className={`font-accent uppercase tracking-[0.35em] text-lg ${accentFallbackClass}`}
            style={accentStyle}
          >
            Education & Skillset
          </span>
          <h2
            className={`max-w-3xl font-serifalt text-5xl md:text-6xl leading-tight ${headingFallbackClass}`}
            style={headingStyle}
          >
            With a focus on software development, web design,
            and problem-solving.
          </h2>
          <div className={`h-1 w-24 rounded-full ${dividerFallbackClass}`} style={dividerStyle} />
          
        </motion.div>

        <div className="mt-14 space-y-20">
          <motion.section
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className={`rounded-[2.5rem] border p-10 shadow-sm ${cardFallbackClass}`}
            style={cardStyle}
          >
            <div className="mb-6 flex items-center gap-3">
              <span
                className="rounded-full px-4 py-1 text-xs font-semibold tracking-[0.3em]"
                style={accentStyle}
              >
                EDUCATION
              </span>
              <span
                className={`h-1 w-24 rounded-full ${innerDividerFallbackClass}`}
                style={dividerStyle}
              />
            </div>
            <div className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)] md:items-start">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm">
                  <GraduationCap className="h-7 w-7  " style={accentStyle} />
                </div>
                <div className="space-y-1">
                  <h3
                    className="text-2xl font-semibold"
                    style={headingStyle}
                  >
                    {educationHighlight.institution}
                  </h3>
                  <p
                    className="text-sm font-medium uppercase tracking-[0.2em]"
                    style={accentStyle}
                  >
                    {educationHighlight.graduation}
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div
                  className="flex flex-wrap items-center gap-3 text-sm"
                  style={cardMutedStyle}
                >
                  <span
                    className="rounded-full border px-3 py-1 text-sm font-medium"
                    style={degreeChipStyle}
                  >
                    {educationHighlight.degree}
                  </span>
                  <span style={mutedStyle}>
                    {educationHighlight.description}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-3">
                  {educationHighlight.focusAreas.map((focus) => (
                    <li
                      key={focus}
                      className="inline-flex items-center rounded-xl border px-4 py-3 text-sm font-medium"
                      style={focusChipStyle}
                    >
                      {focus}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="rounded-full px-4 py-1 text-xs font-semibold tracking-[0.3em]"
                  style={accentStyle}
                >
                  CERTIFICATIONS
                </span>
                <span className="h-1 w-16 rounded-full" style={dividerStyle} />
              </div>
              <p
                className="text-xs uppercase tracking-[0.3em]"
                style={mutedStyle}
              >
                Verified Skills
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sampleCertifications.map((cert) => (
                <motion.a
                  key={cert.title}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -12, scale: 1.01 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="group flex items-center gap-4 rounded-2xl border px-5 py-4 shadow-sm transition-transform transform-gpu duration-500 ease-out"
                  style={cardAltStyle}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${certificationIconFallbackClass}`}
                    style={
                      accentStyle
                        ? withTransition({ backgroundColor: 'rgba(67,104,80,0.24)' })
                        : undefined
                    }
                  >
                    <Award className={`h-5 w-5 ${awardFallbackClass}`} style={accentStyle} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p
                      className="text-sm font-semibold transition-colors"
                      style={headingStyle}
                    >
                      {cert.title}
                    </p>
                    <span
                      className="text-xs uppercase tracking-[0.2em]"
                      style={mutedStyle}
                    >
                      {cert.issuer}
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={accentStyle}
                    >
                      {cert.date}
                    </span>
                  </div>
                  <ExternalLink
                    className={`ml-auto h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${externalIconFallbackClass}`}
                    style={accentStyle}
                  />
                </motion.a>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="rounded-full px-4 py-1 text-xs font-semibold tracking-[0.3em]"
                  style={skillDeckLabelStyle}
                >
                  SKILL DECK
                </span>
                <span className="h-1 w-20 rounded-full" style={dividerStyle} />
              </div>
              <p
                className="text-xs uppercase tracking-[0.3em]"
                style={skillDeckSubLabelStyle}
              >
                Core Toolkit
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {skillHighlights.map((skillGroup) => (
                <motion.div
                  key={skillGroup.key}
                  whileHover={{ y: -12, scale: 1.01 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="group relative overflow-hidden rounded-2xl border px-6 py-5 shadow-sm transition-transform transform-gpu duration-500 ease-out"
                  style={skillCardStyle}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="rounded-full border px-3 py-1 text-[10px] font-semibold tracking-[0.3em]"
                      style={skillGroupBadgeStyle}
                    >
                      {skillGroup.label}
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={skillDeckCountStyle}
                    >
                      {skillGroup.items.length} items
                    </span>
                  </div>
                  <h4
                    className="mt-4 text-lg font-semibold transition-colors"
                    style={headingStyle}
                  >
                    {skillGroup.title}
                  </h4>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {skillGroup.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border px-3 py-1 text-xs font-medium"
                        style={skillItemStyle}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </section>
  );
}
