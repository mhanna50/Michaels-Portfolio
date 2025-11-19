import React from 'react';
import { motion } from 'framer-motion';

const THEME_TRANSITION = "background 600ms ease, background-color 600ms ease, color 600ms ease, border-color 600ms ease";

const withTransition = (style) => ({
  transition: THEME_TRANSITION,
  ...(style || {}),
});

const skills = {
  languages: ["JavaScript", "TypeScript", "Python", "Swift", "Java", "HTML/CSS"],
  frameworks: ["React", "Node.js", "Next.js", "SwiftUI", "Django", "Express"],
  tools: ["Git", "Docker", "AWS", "Figma", "Jest", "Selenium"],
  other: ["RESTful APIs", "GraphQL", "CI/CD", "Agile/Scrum", "Test Automation", "UI/UX Design"]
};

const defaultBadgeGradients = {
  languages: ["#A8B8A0", "#8A9B82"],
  frameworks: ["#D4A5A5", "#C48B8B"],
  tools: ["#C97064", "#B86054"],
  other: ["#E8DCC4", "#D4C8A8"],
};

const SkillBadge = ({ skill, index, category, badgePalette }) => {
  const colors = {
    languages: "from-[#A8B8A0] to-[#8A9B82]",
    frameworks: "from-[#D4A5A5] to-[#C48B8B]",
    tools: "from-[#C97064] to-[#B86054]",
    other: "from-[#E8DCC4] to-[#D4C8A8]"
  };

  const gradient = badgePalette?.gradient || defaultBadgeGradients[category];
  const textColor = badgePalette?.text;
  const borderColor = badgePalette?.border;
  const gradientStyle = gradient
    ? withTransition({
        backgroundImage: `linear-gradient(90deg, ${gradient[0]}, ${gradient[1]})`,
        color: textColor || '#ffffff',
        borderColor: borderColor || 'transparent',
      })
    : undefined;
  const baseClasses = gradient
    ? 'bg-transparent'
    : `bg-gradient-to-r ${colors[category]} text-white`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      className={`${baseClasses} px-6 py-3 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 border border-transparent`}
      style={gradientStyle}
    >
      {skill}
    </motion.div>
  );
};

export default function SkillsSection({ theme }) {
  const sectionTheme = theme?.sections?.skills;
  const palette = sectionTheme?.palette || {};
  const badgePalettes = palette.badges || {};
  const sectionStyle = sectionTheme
    ? withTransition({
        background: sectionTheme.bg,
        color: sectionTheme.text,
      })
    : undefined;
  const accentStyle = palette.accent ? { color: palette.accent } : undefined;
  const headingStyle = palette.heading ? { color: palette.heading } : undefined;
  const mutedStyle = palette.muted ? { color: palette.muted } : undefined;
  const dividerStyle = palette.divider ? { backgroundColor: palette.divider } : undefined;

  return (
    <section
      id="skills"
      className="py-32 px-6 bg-gradient-to-b from-white to-[#FAF8F3] font-poppins"
      style={sectionStyle}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 space-y-6"
        >
          <span
            className="font-accent uppercase tracking-[0.35em] text-lg text-primary-dark/70"
            style={accentStyle}
          >
            Practical Toolkit
          </span>
          <h2
            className="max-w-3xl font-cormorant-light text-5xl md:text-6xl text-black leading-tight"
            style={headingStyle}
          >
            The tools I lean on to plan, build, and care for your site.
          </h2>
          <div className="h-1 w-20 rounded-full bg-[#A8B8A0]" style={dividerStyle} />
          <p
            className="max-w-3xl text-lg text-neutral-dark/80"
            style={mutedStyle}
          >
            This mix lets me guide a project without passing you between different vendors. From clean code to testing
            and hosting, every tool supports a smoother launch and easier maintenance.
          </p>
        </motion.div>

        <div className="space-y-12">
          <div>
            <h3
              className="font-cormorant-light text-2xl text-[#2C2C2C] mb-6"
              style={headingStyle}
            >
              Languages I Build With
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.languages.map((skill, idx) => (
                <SkillBadge
                  key={idx}
                  skill={skill}
                  index={idx}
                  category="languages"
                  badgePalette={badgePalettes.languages}
                />
              ))}
            </div>
          </div>

          <div>
            <h3
              className="font-cormorant-light text-2xl text-[#2C2C2C] mb-6"
              style={headingStyle}
            >
              Frameworks That Speed Things Up
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.frameworks.map((skill, idx) => (
                <SkillBadge
                  key={idx}
                  skill={skill}
                  index={idx}
                  category="frameworks"
                  badgePalette={badgePalettes.frameworks}
                />
              ))}
            </div>
          </div>

          <div>
            <h3
              className="font-cormorant-light text-2xl text-[#2C2C2C] mb-6"
              style={headingStyle}
            >
              Platforms I Manage For You
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.tools.map((skill, idx) => (
                <SkillBadge
                  key={idx}
                  skill={skill}
                  index={idx}
                  category="tools"
                  badgePalette={badgePalettes.tools}
                />
              ))}
            </div>
          </div>

          <div>
            <h3
              className="font-cormorant-light text-2xl text-[#2C2C2C] mb-6"
              style={headingStyle}
            >
              Supporting Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.other.map((skill, idx) => (
                <SkillBadge
                  key={idx}
                  skill={skill}
                  index={idx}
                  category="other"
                  badgePalette={badgePalettes.other}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
