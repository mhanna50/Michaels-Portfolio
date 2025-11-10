import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import WeatherBadge from '../weatherBadge';

const THEME_TRANSITION = "background 600ms ease, background-color 600ms ease, color 600ms ease, border-color 600ms ease";

const withTransition = (style) => ({
  transition: THEME_TRANSITION,
  ...(style || {}),
});

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay },
  }),
};

export default function AboutSection({ weather, theme }) {
  const sectionTheme = theme?.sections?.about;
  const palette = sectionTheme?.palette || {};
  const cardPalette = palette.card || {};
  const altCardPalette = palette.cardAlt || cardPalette;
  const tertiaryCardPalette = palette.cardTertiary || altCardPalette;

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

  const buildCardStyle = (card) =>
    Object.keys(card).length
      ? withTransition({
          background: card.bg,
          borderColor: card.border,
          color: card.text,
        })
      : undefined;

  const cardStyle = buildCardStyle(cardPalette);
  const tertiaryCardStyle = buildCardStyle(tertiaryCardPalette);
  const cardMutedStyle = cardPalette.muted ? { color: cardPalette.muted } : undefined;
  const tertiaryCardMutedStyle = tertiaryCardPalette.muted ? { color: tertiaryCardPalette.muted } : undefined;

  return (
    <section
      id="about"
      className={`relative overflow-hidden py-28 px-6 ${
        theme ? "" : "bg-accent-light"
      }`}
      style={sectionStyle}
    >
      <div className="absolute right-6 top-6 sm:right-10 sm:top-10 z-30">
        <WeatherBadge weather={weather} theme={theme} />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_70%)] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          variants={containerVariants}
          className="flex flex-col gap-16"
        >
          <div className="max-w-3xl space-y-4">
            <p
              className="font-accent uppercase tracking-[0.35em] text-lg text-primary-dark/70"
              style={accentStyle}
            >
              Personal Story
            </p>
            <h2
              className="font-serifalt text-5xl md:text-6xl tracking-tight text-black"
              style={headingStyle}
            >
              The craft behind the portfolio.
            </h2>
            <div
              className="h-1 w-20 rounded-full bg-primary-dark/70"
              style={dividerStyle}
            />
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.7fr,1fr]">
            <motion.article
              variants={cardVariants}
              custom={0.1}
              className="rounded-3xl border border-primary-dark/20 bg-white/70 p-10 shadow-xl backdrop-blur-sm"
              style={cardStyle}
            >
              <div
                className="space-y-6 text-xl leading-relaxed font-serifalt"
                style={cardMutedStyle}
              >
                <p style={cardStyle?.color ? { color: cardStyle.color } : undefined}>
                  I’m a multidisciplinary designer-developer who loves transforming brand stories into
                  digital works. My work leans into the details—balancing typography, motion,
                  and small interactions to create moments that feel smooth and intentional.
                </p>
                <p style={cardStyle?.color ? { color: cardStyle.color } : undefined}>
                  Over the past few years, I’ve worked at the intersection of design and 
                  development — blending UI/UX strategy, full-stack engineering, and hands-on QA. 
                  Which means, I make sure every interface not only looks great but performs flawlessly, bridging 
                  the gap between creative vision and real-world performance.
                </p>
                <p style={cardStyle?.color ? { color: cardStyle.color } : undefined}>
                  When I’m not piecing together new interfaces, I’m usually experimenting, 
                  learning, or writing — chasing small discoveries in accessibility, creative coding, 
                  or the craft of making products that stand the test of time.
                </p>
              </div>
            </motion.article>

            <div className="flex flex-col gap-8 lg:gap-10">
              <motion.section
                variants={cardVariants}
                custom={0.2}
                className="rounded-3xl border border-primary-dark/25 bg-gradient-to-br from-white/90 via-white/70 to-secondary-light/60 p-8 shadow-lg backdrop-blur-sm"
                style={tertiaryCardStyle}
              >
                <div className="mb-5 space-y-2">
                  <h3
                    className="font-accent uppercase text-md tracking-[0.3em] text-primary-dark"
                    style={accentStyle}
                  >
                    From the blog
                  </h3>
                  <p
                    className="font-serifalt text-2xl text-black leading-tight"
                    style={headingStyle}
                  >
                    Crafting empathetic design systems for fast-moving teams.
                  </p>
                </div>
                <p
                  className="font-serifalt text-base leading-relaxed text-neutral-dark/80"
                  style={tertiaryCardMutedStyle}
                >
                  Drop in a short excerpt from your latest article to guide visitors deeper into your process,
                  wins, and lessons learned.
                </p>
                <div className="mt-6">
                  <a href="/blog">
                    <Button className="rounded-full bg-neutral px-7 py-2 text-base font-accent uppercase tracking-[0.2em] text-white hover:bg-primary transition-colors">
                      Read the Blog
                    </Button>
                  </a>

                </div>
              </motion.section>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
