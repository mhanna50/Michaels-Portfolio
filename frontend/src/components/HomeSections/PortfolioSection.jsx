import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import ProjectCard from './ProjectCard';

const featuredProjects = [
  {
    title: 'This Portfolio',
    category: 'Website Design & Launch',
    description:
      'A personal business site that offers website and automation services, showcases past work, and partner testimonials.',
    highlights: ['4-week build time', 'Fully custom coded with content blocks and themes'],
    liveUrl: 'https://search-symphony.example.com',
    caseStudyUrl: '/portfolio/personal-portfolio',
    cover: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1400&q=80',
    testimonial: {
      type: 'quote',
      quote: 'Building my own website helps me better support clients by understanding their perspective.',
      author: 'Michael Hanna · Designer & Developer',
    },
  },
  {
    title: 'Millie Aesthetics',
    category: 'Website Design & Launch',
    description:
      'A clean, graytoned site for a medical spa that highlights their restorative and grounded services with updated branding.',
    highlights: ['2-week build', 'WordPress site with SEO setup'],
    liveUrl: 'https://studio-palette.example.com',
    caseStudyUrl: '/portfolio/millie-aesthetics',
    cover: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=80',
    testimonial: {
      type: 'video',
      videoUrl: 'https://player.vimeo.com/video/76979871?h=7e0a5a05f9&title=0&byline=0&portrait=0',
      caption: 'Mille Aestetics · Owner & Aesthetician',
    },
    additionalTestimonials: [
      {
        type: 'quote',
        quote: 'Clients tell us the site feels like our studio and booking is effortless.',
        author: 'Millie Aesthetics · Owner',
      },
    ],
  },
  {
    title: 'American Craftsman LLC',
    category: 'Website Design & Launch',
    description:
      'Refreshed brand story, SEO optimization, and a portfolio-forward site for a local contractor focused on craftsmanship.',
    highlights: ['5-week project', 'Framer built with a fully custom design'],
    liveUrl: 'https://americancraftsmanllc.com',
    caseStudyUrl: '/portfolio/american-craftsman',
    cover: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1400&q=80',
    testimonial: {
      type: 'quote',
      quote: 'Our new website looks great. Mike was fun to work with. He is creative, and his work is meticulous. I’m looking forward to future projects together.',
      author: 'American Craftsman · Owner & Lead Contractor',
    },
  },
  
];

const projectCollections = {
  websites: [
    {
      title: 'E-Commerce Platform',
      description:
        'Online shop with secure checkout, real-time inventory alerts, and clear shipping updates for customers.',
      github: 'https://github.com/yourusername/ecommerce',
      liveUrl: 'https://demo-ecommerce.com',
      thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
      media: ['https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&q=80'],
    },
    {
      title: 'Portfolio Builder',
      description:
        'Drag-and-drop tool that lets creatives launch a simple site without code, with live previews for every change.',
      github: 'https://github.com/yourusername/portfolio-builder',
      thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
      media: ['https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80'],
    },
  ],
  coding: [
    {
      title: 'Algorithm Visualizer',
      description:
        'Interactive teaching tool that walks students through how sorting and searching actually work, step by step.',
      github: 'https://github.com/yourusername/algo-viz',
      liveUrl: 'https://demo-algo-viz.com',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      media: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80'],
    },
    {
      title: 'CLI Task Manager',
      description:
        'Command-line checklist for teams who live in the terminal, keeping priorities and due dates organized.',
      github: 'https://github.com/yourusername/cli-tasks',
      thumbnail: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80',
      media: ['https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&q=80'],
    },
  ],
  seo: [
    {
      title: 'Content Systems Audit',
      description:
        'Deep review for a B2B SaaS brand—reorganized blog topics and added schema so search engines understand their offer.',
      github: 'https://github.com/yourusername/content-systems-audit',
      liveUrl: 'https://content-audit.example.com',
      thumbnail: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&q=80',
      media: ['https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&q=80'],
    },
    {
      title: 'Brand Voice Playbook',
      description:
        'Messaging guide and SEO-ready briefs for a product launch so sales, design, and marketing spoke the same language.',
      thumbnail: 'https://images.unsplash.com/photo-1520607162513-3b1c5b1af582?w=800&q=80',
      media: ['https://images.unsplash.com/photo-1520607162513-3b1c5b1af582?w=1200&q=80'],
    },
  ],
  qa: [
    {
      title: 'Automated Testing Framework',
      description:
        'Testing toolkit that runs through critical site flows automatically and reports issues in one dashboard.',
      github: 'https://github.com/yourusername/qa-framework',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
      media: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80'],
    },
    {
      title: 'API Testing Suite',
      description:
        'Automated checks that keep every API response accurate and fast before new features go live.',
      github: 'https://github.com/yourusername/api-tests',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      media: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80'],
    },
  ],
};

const tabConfig = [
  { value: 'websites', label: 'Website Projects' },
  { value: 'coding', label: 'Coding Projects' },
  { value: 'seo', label: 'SEO & Branding' },
  { value: 'qa', label: 'QA Work' },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delayIndex = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: delayIndex * 0.1 },
  }),
};

const THEME_TRANSITION = "background 600ms ease, background-color 600ms ease, color 600ms ease, border-color 600ms ease";

const withTransition = (style) => ({
  transition: THEME_TRANSITION,
  ...(style || {}),
});

function renderTextWithStyledAmpersand(text) {
  if (!text || !text.includes('&')) {
    return text;
  }

  const segments = text.split('&');
  const content = [];

  segments.forEach((segment, index) => {
    content.push(
      <React.Fragment key={`segment-${index}`}>
        {segment}
      </React.Fragment>,
    );

    if (index < segments.length - 1) {
      content.push(
        <span key={`amp-${index}`} className="font-serif italic text-current">
          &
        </span>,
      );
    }
  });

  return content;
}

function FeaturedProjectCard({ project, index, palette }) {
  const featurePalette = palette?.featureCard || palette?.card || {};
  const altCardPalette = palette?.cardAlt || featurePalette;
  const cardTextColor = featurePalette.text;
  const cardMutedColor = featurePalette.muted || palette?.muted;
  const altCardMutedStyle = altCardPalette.muted ? { color: altCardPalette.muted } : undefined;
  const accentColor = palette?.accent;
  const indicatorColor = palette?.divider || accentColor;
  const buttonPalette = palette?.button || {};
  const primaryLinkStyle = buttonPalette.bg
    ? withTransition({
        background: buttonPalette.bg,
        color: buttonPalette.text,
        borderColor: buttonPalette.bg,
      })
    : undefined;
  const secondaryLinkStyle = buttonPalette.hover
    ? withTransition({
        background: buttonPalette.hover,
        color: buttonPalette.text,
        borderColor: buttonPalette.hover,
      })
    : primaryLinkStyle;
  const thirdProjectTestimonial = featuredProjects[2]?.testimonial;
  const testimonialEntries = [
    ...(project.testimonial ? [project.testimonial] : []),
    ...(project.additionalTestimonials || []),
    ...(project.duplicateThirdTestimonial && thirdProjectTestimonial
      ? [{ ...thirdProjectTestimonial, duplicatedFromThird: true }]
      : []),
  ];
  const shouldHideVideoTestimonials = project.title === 'Millie Aesthetics';
  const visibleTestimonials = shouldHideVideoTestimonials
    ? testimonialEntries.filter((entry) => entry.type !== 'video')
    : testimonialEntries;
  const cardFallbackClass = featurePalette.bg ? '' : 'border-primary-dark/15 bg-gradient-to-br from-white/90 via-white/60 to-secondary-light/50';
  const innerFallbackClass = featurePalette.bg ? '' : 'bg-white/55';
  const labelFallbackClass = accentColor ? '' : 'text-primary-dark/80';
  const iconFallbackClass = accentColor ? '' : 'text-primary-dark/70';
  const blockquoteFallbackClass = (altCardPalette.bg || featurePalette.bg)
    ? ''
    : 'border-primary-dark/20 bg-white/80 text-neutral-dark/80';
  const footerFallbackClass = accentColor ? '' : 'text-primary-black';
  const videoFallbackClass = indicatorColor ? '' : 'border-primary-dark/20 bg-black/80';

  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      whileHover={{ y: -12, scale: 1.01 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      custom={index}
      className={`relative overflow-hidden rounded-3xl border backdrop-blur-sm transition-transform transform-gpu duration-500 ease-out ${cardFallbackClass}`}
      style={Object.keys(featurePalette).length ? withTransition({
        background: featurePalette.bg,
        borderColor: featurePalette.border,
        color: featurePalette.text,
      }) : undefined}
    >
      {project.cover && (
        <motion.img
          src={project.cover}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover opacity-30 blur-lg"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      )}
      <div
        className={`relative z-10 flex h-full flex-col justify-between p-9 lg:p-10 ${innerFallbackClass ? `${innerFallbackClass} backdrop-blur` : ''}`}
        style={cardTextColor ? { color: cardTextColor } : undefined}
      >
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <span
              className={`font-accent uppercase tracking-[0.3em] text-sm ${labelFallbackClass}`}
              style={accentColor ? { color: accentColor } : undefined}
            >
              {project.category}
            </span>
            <Sparkles
              className={`h-5 w-5 ${iconFallbackClass}`}
              style={accentColor ? { color: accentColor } : undefined}
            />
          </div>
          <h3
            className="font-serifalt text-3xl md:text-4xl leading-tight"
            style={cardTextColor ? { color: cardTextColor } : undefined}
          >
            {project.title}
          </h3>
          <p
            className="font-serifalt text-base md:text-lg leading-relaxed"
            style={cardMutedColor ? { color: cardMutedColor } : undefined}
          >
            {project.description}
          </p>
        </div>
        {project.highlights && (
          <ul
            className="mt-6 space-y-2 text-base font-serifalt"
            style={cardMutedColor ? { color: cardMutedColor } : undefined}
          >
            {project.highlights.map((item, highlightIndex) => (
              <li key={highlightIndex} className="flex items-start gap-2">
                <span
                  className="mt-1 h-1.5 w-1.5 rounded-full"
                  style={indicatorColor ? { backgroundColor: indicatorColor } : undefined}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {visibleTestimonials.length > 0 && (
          <div className="mt-8 space-y-6">
            {visibleTestimonials.map((testimonialEntry, testimonialIndex) =>
              testimonialEntry.type === 'video' ? (
                <div
                  key={`${project.title}-testimonial-video-${testimonialIndex}`}
                  className={`overflow-hidden rounded-2xl border ${videoFallbackClass}`}
                  style={withTransition({
                    borderColor: indicatorColor || featurePalette.border,
                    background: 'rgba(0,0,0,0.8)',
                  })}
                >
                  <div className="aspect-video w-full">
                    <iframe
                      src={testimonialEntry.videoUrl}
                      title={`${project.title} testimonial video ${testimonialIndex + 1}`}
                      className="h-full w-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  {testimonialEntry.caption && (
                    <p
                      className="px-4 py-3 text-sm font-serifalt uppercase tracking-[0.2em] text-white/80"
                      style={accentColor ? { color: accentColor } : undefined}
                    >
                      {renderTextWithStyledAmpersand(testimonialEntry.caption)}
                    </p>
                  )}
                </div>
              ) : (
                <blockquote
                  key={`${project.title}-testimonial-quote-${testimonialIndex}`}
                  className={`rounded-2xl border p-6 text-base backdrop-blur ${blockquoteFallbackClass}`}
                  style={withTransition({
                    background: altCardPalette.bg || featurePalette.bg,
                    borderColor: altCardPalette.border || featurePalette.border,
                    color: altCardPalette.text || featurePalette.text || cardTextColor,
                  })}
                >
                  {testimonialEntry.quote && (
                    <p
                      className="font-serif italic leading-relaxed"
                      style={altCardMutedStyle || { color: cardTextColor }}
                    >
                      “{renderTextWithStyledAmpersand(testimonialEntry.quote)}”
                    </p>
                  )}
                  {testimonialEntry.author && (
                    <footer
                      className={`mt-3 font-accent uppercase tracking-[0.2em] text-base ${footerFallbackClass}`}
                      style={accentColor ? { color: accentColor } : undefined}
                    >
                      {renderTextWithStyledAmpersand(testimonialEntry.author)}
                    </footer>
                  )}
                </blockquote>
              ),
            )}
          </div>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl &&
            (project.liveUrl.startsWith("/") ? (
              <Link
                to={project.liveUrl}
                className="inline-flex items-center gap-2 rounded-full border px-6 py-2 font-accent uppercase tracking-[0.2em] transition-colors"
                style={primaryLinkStyle}
              >
                Live Site
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ) : (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-2 font-accent uppercase tracking-[0.2em] transition-colors"
                style={primaryLinkStyle}
              >
                Live Site
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ))}
          {project.caseStudyUrl &&
            (project.caseStudyUrl.startsWith("/") ? (
              <Link
                to={project.caseStudyUrl}
                className="inline-flex items-center gap-2 rounded-full border px-6 py-2 font-accent uppercase tracking-[0.2em] transition-colors"
                style={secondaryLinkStyle}
              >
                Case Study
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ) : (
              <a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-2 font-accent uppercase tracking-[0.2em] transition-colors"
                style={secondaryLinkStyle}
              >
                Case Study
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ))}
        </div>
      </div>
    </motion.article>
  );
}

function DeepDiveLibrary({ palette, buttonPalette }) {
  const [activeTab, setActiveTab] = useState('websites');
  const activeTabConfig = tabConfig.find((tab) => tab.value === activeTab);
  const activeProjects = activeTabConfig ? projectCollections[activeTabConfig.value] : [];
  const sectionPalette = palette || {};
  const accentStyle = sectionPalette.accent ? { color: sectionPalette.accent } : undefined;
  const headingStyle = sectionPalette.heading ? { color: sectionPalette.heading } : undefined;
  const deepDivePalette = sectionPalette.deepDive || {};
  const deepDiveStyle = deepDivePalette.bg
    ? withTransition({
        background: deepDivePalette.bg,
        borderColor: deepDivePalette.border,
        color: deepDivePalette.text,
      })
    : undefined;
  const deepDiveAccentStyle = deepDivePalette.accent ? { color: deepDivePalette.accent } : accentStyle;
  const deepDiveHeadingStyle = deepDivePalette.text ? { color: deepDivePalette.text } : headingStyle;
  const tabsListStyle = deepDivePalette.tabs
    ? withTransition({
        background: deepDivePalette.tabs.bg,
        borderColor: deepDivePalette.tabs.border,
      })
    : undefined;
  const tabBaseStyle = deepDivePalette.tabs
    ? {
        color: deepDivePalette.tabs.text,
        borderColor: deepDivePalette.tabs.border,
        backgroundColor: 'transparent',
      }
    : undefined;
  const tabActiveStyle = deepDivePalette.tabs
    ? {
        color: deepDivePalette.tabs.activeText,
        borderColor: deepDivePalette.tabs.activeBorder,
        backgroundColor: deepDivePalette.tabs.activeBg,
      }
    : undefined;
  const deepDiveFallbackClass = deepDiveStyle ? '' : 'border-primary-dark/10 bg-white/75';
  const deepDiveAccentFallbackClass = deepDiveAccentStyle ? '' : 'text-secondary-dark/80';
  const deepDiveHeadingFallbackClass = deepDiveHeadingStyle ? '' : 'text-black';
  const tabsListFallbackClass = deepDivePalette.tabs ? '' : 'border-primary-dark/20 bg-white/60';
  const tabFallbackClass = deepDivePalette.tabs
    ? ''
    : 'text-neutral-dark data-[state=active]:border data-[state=active]:border-primary-dark/40 data-[state=active]:bg-neutral data-[state=active]:text-white';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      className={`rounded-[36px] border p-8 backdrop-blur ${deepDiveFallbackClass}`}
      style={deepDiveStyle}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="space-y-1">
          <p
            className={`font-accent uppercase tracking-[0.3em] text-lg ${deepDiveAccentFallbackClass}`}
            style={deepDiveAccentStyle}
          >
            Deep Dive Library
          </p>
          <h3
            className={`font-serifalt text-3xl leading-tight ${deepDiveHeadingFallbackClass}`}
            style={deepDiveHeadingStyle}
          >
            Explore additional builds by discipline.
          </h3>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <div className="flex w-full justify-start overflow-x-auto pb-2">
          <TabsList
            className={`flex w-full justify-center gap-6 rounded-full border p-2 backdrop-blur ${tabsListFallbackClass}`}
            style={tabsListStyle}
          >
            {tabConfig.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`rounded-full px-6 py-2 font-accent uppercase tracking-[0.15em] text-sm border transition-all duration-300 ${tabFallbackClass}`}
                style={{
                  ...(tabBaseStyle || {}),
                  ...(activeTab === tab.value && tabActiveStyle ? tabActiveStyle : {}),
                }}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <AnimatePresence mode="wait">
          {activeTabConfig && (
            <TabsContent key={activeTabConfig.value} value={activeTabConfig.value} className="mt-10">
              <motion.div
                key={activeTabConfig.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="grid gap-8 md:grid-cols-2"
              >
                {activeProjects.map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={index}
                    palette={sectionPalette?.projectCard || sectionPalette?.card}
                    buttonPalette={buttonPalette}
                  />
                ))}
              </motion.div>
            </TabsContent>
          )}
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
}

export default function PortfolioSection({ theme, showDeepDive = false }) {
  const sectionTheme = theme?.sections?.portfolio;
  const palette = sectionTheme?.palette || {};
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
  const buttonPalette = palette.button || {};
  const overlayStyle = palette.overlay ? { background: palette.overlay } : undefined;
  const ctaTextColor = sectionTheme?.text || palette.heading || '#0f172a';
  const accentFallbackClass = accentStyle ? '' : 'text-primary-dark/70';
  const headingFallbackClass = headingStyle ? '' : 'text-black';
  const mutedFallbackClass = mutedStyle ? '' : 'text-neutral-dark/80';
  const dividerFallbackClass = dividerStyle ? '' : 'bg-primary-dark/70';
  const buttonStyle = buttonPalette.bg
    ? {
        backgroundColor: buttonPalette.bg,
        color: buttonPalette.text,
        borderColor: buttonPalette.bg,
        transition: 'all 300ms ease',
      }
    : undefined;

  const secondaryButtonStyle = buttonPalette.bg
    ? {
        backgroundImage: buttonPalette.hover
          ? `linear-gradient(120deg, ${buttonPalette.bg}, ${buttonPalette.hover})`
          : undefined,
        backgroundColor: buttonPalette.bg,
        color: buttonPalette.text || ctaTextColor,
        borderColor: buttonPalette.hover || buttonPalette.bg,
      }
    : {
        backgroundColor: 'transparent',
        color: ctaTextColor,
        borderColor: ctaTextColor,
      };

  const handleButtonHover = (event, entering) => {
    if (!buttonPalette.bg || !buttonPalette.hover) return;
    const target = event.currentTarget;
    const bgColor = entering ? buttonPalette.hover : buttonPalette.bg;
    target.style.backgroundColor = bgColor;
    target.style.borderColor = bgColor;
    if (buttonPalette.text) {
      target.style.color = buttonPalette.text;
    }
  };

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden py-28 px-6"
      style={sectionStyle}
    >
      {overlayStyle && (
        <div
          className="pointer-events-none absolute inset-0"
          style={overlayStyle}
        />
      )}

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-6"
        >
          <span
            className={`font-accent uppercase tracking-[0.35em] text-lg ${accentFallbackClass}`}
            style={accentStyle}
          >
            Portfolio
          </span>
          <div className="flex flex-col gap-4">
          <h2
            className={`max-w-3xl font-serifalt text-5xl md:text-6xl leading-tight ${headingFallbackClass}`}
            style={headingStyle}
          >
            Real projects that solve everyday business problems.
          </h2>
          </div>
          <div className={`h-1 w-24 rounded-full ${dividerFallbackClass}`} style={dividerStyle} />
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <p
              className={`max-w-3xl font-serifalt text-lg ${mutedFallbackClass}`}
              style={mutedStyle}
            >
              
            </p>
            <div className="flex flex-col gap-3 md:ml-5 md:flex-row md:items-center md:self-end">
              <Link to="/contact">
                <Button
                  className="rounded-full px-7 py-2 text-base font-accent uppercase tracking-[0.2em]"
                  style={buttonStyle}
                  onMouseEnter={(event) => handleButtonHover(event, true)}
                  onMouseLeave={(event) => handleButtonHover(event, false)}
                >
                  Work Together
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button
                  className={`rounded-full border px-7 py-2 text-base font-accent uppercase tracking-[0.2em] transition-all duration-300 ${
                    buttonPalette.bg
                      ? 'hover:-translate-y-0.5'
                      : 'hover:opacity-90'
                  }`}
                  style={{
                    ...secondaryButtonStyle,
                    transition: 'all 300ms ease',
                  }}
                >
                  See Full Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </motion.header>

        <div className="grid gap-8 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard
              key={project.title}
              project={project}
              index={index}
              palette={palette}
            />
          ))}
        </div>

        {showDeepDive && (
          <DeepDiveLibrary palette={palette} buttonPalette={buttonPalette} />
        )}
      </div>
    </section>
  );
}
