import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
  const patternColor = palette.accent || '#0f172a';
  const curvePattern = [
    { width: 300, height: 250, radius: 360, thickness: 6, opacity: 0.95, top: 0, left: 0 },
    { width: 230, height: 200, radius: 320, thickness: 4, opacity: 0.65, top: 52, left: 68 },
    { width: 170, height: 150, radius: 280, thickness: 3, opacity: 0.45, top: 110, left: 138 },
  ];

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
                  I help business owners turn ideas into clear, confident websites while automating their busy work away. For over
                  5 years, I've partnered with consultants, studied at university, and examined businesses around me for one goal:
                  To simplify business success online.
                </p>
                <p style={cardStyle?.color ? { color: cardStyle.color } : undefined}>
                  Automation and Website Design is my specialty. Cultivated to make owning a business less stressful and to give you more time focus on what you do best, not the busy work.
                </p>
                <p style={cardStyle?.color ? { color: cardStyle.color } : undefined}>
                  Outside of this work you'll find that I genuinely enjoy helping those I partner with succeed. Whether it's sharing technical knowledge or strategies outside the scope of our project, It is my goal to support you.
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
                    Sharing the thinking behind stress-free launches.
                  </p>
                </div>
                <p
                  className="font-serifalt text-base leading-relaxed text-neutral-dark/80"
                  style={tertiaryCardMutedStyle}
                >
                  Quick notes from recent projects—what worked, what hiccups we fixed, and how you can apply the same
                  lessons without learning new software.
                </p>
                <div className="mt-6">
                  <Link to="/blog">
                    <Button className="rounded-full bg-neutral px-7 py-2 text-base font-accent uppercase tracking-[0.2em] text-white hover:bg-primary transition-colors">
                      Read the Blog
                    </Button>
                  </Link>

                </div>
              </motion.section>
              <motion.div
                variants={cardVariants}
                custom={0.35}
                className="hidden h-full min-h-[240px] items-center justify-center lg:flex"
                aria-hidden="true"
              >
                <div className="relative h-full min-h-[260px] w-full max-w-[360px]">
                  {curvePattern.map(({ width, height, radius, thickness, opacity, top, left }) => (
                    <span
                      key={`${width}-${top}-${left}`}
                      className="absolute block origin-top-left"
                      style={{
                        top,
                        left,
                        width,
                        height,
                        borderLeft: `${thickness}px solid ${patternColor}`,
                        borderTop: `${thickness}px solid ${patternColor}`,
                        borderTopLeftRadius: radius,
                        opacity,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
