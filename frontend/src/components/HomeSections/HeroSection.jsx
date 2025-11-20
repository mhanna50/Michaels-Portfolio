import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroHighlights from '@/data/heroHighlights';

const statCards = [
  {
    id: 'build',
    heading: '10+',
    subtext: 'Websites Built',
    delay: 0.4,
  },
  {
    id: 'backend',
    heading: '3',
    subtext: 'Live Websites',
    delay: 0.6,
  },
  {
    id: 'lighthouse',
    heading: '90+',
    subtext: 'SEO Score',
    delay: 0.8,
  },
  {
    id: 'apis',
    heading: '100%',
    subtext: 'Mobile Friendly',
    delay: 1.0,
  },
];

const StatCard = ({
  heading,
  subtext,
  delay,
  alignment = 'right',
}) => {
  const alignLeft = alignment === 'left';

  return (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ type: 'spring', stiffness: 120, damping: 18, delay }}
    className={`relative space-y-2 max-w-xs w-full ${alignLeft ? 'text-left' : 'text-right'} tablet:max-w-none`}
  >
    <div className={`relative w-full pb-2 ${alignLeft ? 'text-left' : 'text-right'}`}>
      <div className={`flex items-end ${alignLeft ? 'justify-start' : 'justify-end'}`}>
        <div className={`space-y-1 ${alignLeft ? 'text-left' : 'text-right'}`}>
          <p className="font-accent uppercase text-4xl phone:text-5xl tablet:text-[clamp(2.3rem,4vw,3.2rem)] desktop:text-[2.9rem] text-black">{heading}</p>
          <p className="font-serifalt text-md phone:text-lg tablet:text-base desktop:text-lg text-neutral-dark">{subtext}</p>
        </div>
      </div>
    </div>
  </motion.div>
  );
};

const ResultCard = ({ heading, subtext, delay, showDivider = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay }}
    className={`flex h-full w-full flex-col items-start justify-end desktop:px-5 ${
      showDivider
        ? 'border-t border-primary-dark/40 pt-4 tablet:border-t-0 tablet:pt-0 desktop:border-t-0 desktop:pt-0'
        : ''
    }`}
  >
    <div className="w-full leading-tight space-y-0.5 text-left">
      <p className="font-accent uppercase text-xl md:text-xl text-black scale-y-100">{heading}</p>
      <p className="font-serifalt text-base text-neutral line-clamp-2">{subtext}</p>
    </div>
  </motion.div>
);

const BottomBanner = ({ wrapperClass = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 1.2 }}
    className={`w-full max-w-full desktop:w-[1200px] desktop:max-w-[1200px] desktop:min-w-[1200px] mx-auto ${wrapperClass}`}
  >
    <div className="grid grid-cols-2 phone:grid-cols-2 tablet:grid-cols-4 desktop:grid-cols-4 gap-8 phone:gap-6 tablet:gap-4 desktop:gap-0 items-stretch text-left phone:divide-y phone:divide-primary-dark/40 tablet:divide-y-0 tablet:divide-x tablet:divide-primary-dark/40 desktop:divide-x desktop:divide-primary-dark/40">
      {heroHighlights.map((card) => (
        <ResultCard
          key={card.id}
          heading={card.heading}
          subtext={card.subtext}
          delay={card.delay}
          showDivider={card.showDivider}
        />
      ))}
    </div>
  </motion.div>
);

export default function HeroSection({ mainTheme }) {
  const heroStyle = mainTheme?.hero
    ? {
        background: mainTheme.hero.bg,
        color: mainTheme.hero.text,
      }
    : undefined;
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-start min-h-[max(950px,100vh)] px-6 lg:px-12 pt-16 lg:pt-20 pb-10 tablet:pb-0 desktop:pb-10 overflow-visible tablet:min-h-[100vh] tablet:pt-32"
      style={heroStyle}
    >
      
      {/* Centered, Overlapping Image */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-0 -translate-x-1/2 hidden desktop:block z-10"
      >
        <div className="w-[600px] h-[750px] rounded-b-[30rem] overflow-hidden shadow-2xl group">
          <img
            src="/images/personal/portfolio.jpeg"
            alt="Portrait of Michael Hanna standing in front of web design work"
            className="w-full h-full object-cover object-top scale-105 "
          />
        </div>
      </motion.div>

      <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-2 items-start tablet:items-start gap-8 tablet:gap-10 relative z-20 pt-24 tablet:pt-10 desktop:pt-12 flex-1 w-full">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col items-center desktop:items-start text-left lg:text-left tablet:flex tablet:flex-col tablet:justify-start tablet:min-h-[55vh] tablet:pl-6 tablet:pr-4 tablet:mx-0 tablet:flex-[0.7] tablet:relative tablet:z-20 tablet:mt-2 tablet:pt-4 tablet:pb-4"
        >
          <header className="flex flex-col self-center desktop:self-start items-start text-left max-w-[360px] w-full mt-0 tablet:mt-0 tablet:max-w-[720px] tablet:w-full tablet:items-start tablet:text-left tablet:gap-4 tablet:pr-0">
            <h2 className="font-serifalt text-4xl tablet:text-[clamp(1.8rem,3.2vw,2.2rem)] font-bold text-black tracking-widest scale-y-110">
              Hey. I'm Michael,  
            </h2>

            <h1 className="font-accent uppercase text-black text-10xl tablet:text-[clamp(5.5rem,9vw,6.4rem)] md:text-11xl mt-4 -mb-6 scale-y-100">
              A UI/UX
            </h1>
            <h1 className="font-serif italic text-black text-6xl tablet:text-[clamp(3.9rem,6.6vw,4.2rem)] md:text-10xl">
              <span className="text-11xl tablet:text-[clamp(4.9rem,8.2vw,5.6rem)]">&</span>{' '}
              <span className="scale-y-110 text-10xl tablet:text-[clamp(5.1rem,8.6vw,6rem)]">Creative</span>
            </h1>
            <h1 className="font-accent uppercase text-black text-10xl tablet:text-[clamp(4.9rem,8.2vw,5.6rem)] md:text-11xl -mt-2 mb-3 scale-y-100">
              Developer
            </h1>

            <div className="w-full max-w-[360px] tablet:max-w-[660px] tablet:w-full tablet:pr-4">
              <p className="font-serifalt font-thin text-black text-left text-3xl tablet:text-[clamp(1.7rem,2.8vw,2rem)] leading-[1.15] tracking-tight scale-y-110 tablet:text-left tablet:leading-tight tablet:break-normal">
                That design's websites and automates systems to help businesses grow while erasing{' '}
                <span className="inline desktop:block desktop:mt-1">busy work.</span>
              </p>
            </div>

            <Link to="/contact" className="self-start">
              <Button className=" bg-neutral hover:bg-primary text-lg text-white font-accent px-8 py-3 pr-1.5 rounded-full mt-6 tablet:mt-2 inline-flex items-center justify-start uppercase gap-5 group transition-colors duration-300">
                <span>Contact Me</span>

                {/* Arrow wrapper (circle) */}
                <span className="flex items-center mr-1 justify-center w-10 h-10 rounded-full bg-white transition-all duration-300 group-hover:bg-neutral">
                  <ArrowRight
                    className="w-4 h-4 text-black transition-all duration-300 group-hover:text-white group-hover:-rotate-45"
                  />
                </span>
              </Button>
            </Link>
          </header>
        </motion.div>

        {/* Tablet Image within flow */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="hidden tablet:flex desktop:hidden w-full justify-center tablet:w-auto tablet:absolute tablet:right-4 tablet:top-20 tablet:pr-0 tablet:z-10"
        >
          <div
            className="rounded-[21rem] overflow-hidden shadow-2xl transition-[width,height] duration-300 ease-out"
            style={{ width: 'clamp(220px, 57vw, 394px)', height: 'clamp(360px, 64vh, 572px)' }}
          >
            <img src="images/personal/portfolio.jpeg" alt="Portrait of Michael Hanna smiling while looking at design work" className="w-full h-full object-cover object-top" />
          </div>
        </motion.div>

        {/* Right Content - Desktop column */}
        <motion.div
          layout
          initial={false}
          transition={{ type: 'spring', stiffness: 140, damping: 20 }}
          className="hidden desktop:flex flex-col gap-6 items-end mt-14 desktop:translate-x-[5px]"
        >
          {statCards.map((card) => (
            <StatCard
              key={`desktop-${card.id}`}
              heading={card.heading}
              subtext={card.subtext}
              delay={card.delay}
            />
          ))}
        </motion.div>
      </div>

      {/* Mobile stat cards & image */}
      <div className="w-full tablet:hidden desktop:hidden flex justify-center z-20 pt-10 pb-0 mt-auto mb-6 min-h-[0] px-4">
        <div className="w-full max-w-[380px] rounded-[2.5rem] border border-black/5 bg-white/40 backdrop-blur-xl shadow-2xl px-4 py-5 flex gap-4 items-stretch">
          <div className="flex-1 w-full space-y-3">
            {statCards.map((card) => (
              <div key={`mobile-${card.id}`} className="w-full">
                <StatCard
                  heading={card.heading}
                  subtext={card.subtext}
                  delay={card.delay}
                  alignment="left"
                />
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.35 }}
            className="flex flex-1 items-center justify-center"
          >
            <div className="w-full max-w-[140px] h-full min-h-[190px] rounded-[14rem] overflow-hidden shadow-2xl border-4 border-white/70 bg-white/40 backdrop-blur">
              <img src="/images/personal/portfolio.jpeg" alt="Michael Hanna smiling in a portrait used around the site" className="w-full h-full object-cover object-top" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tablet stat cards row */}
      <div className="w-full hidden tablet:flex desktop:hidden justify-center z-20 pt-10 tablet:pt-0 tablet:pb-0 tablet:mt-auto tablet:mb-6 tablet:min-h-[0]">
        <div className="grid w-full max-w-[1200px] gap-4 phone:gap-5 px-4 pb-4 tablet:px-10 tablet:gap-5 grid-cols-1 phone:grid-cols-2 tablet:grid-cols-4 justify-items-center">
          {statCards.map((card) => (
            <div key={`tablet-${card.id}`} className="w-full px-1 flex justify-center">
              <StatCard
                heading={card.heading}
                subtext={card.subtext}
                delay={card.delay}
                alignment="left"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Banner for desktop */}
      <div className="w-full hidden desktop:flex justify-center z-20 mt-auto pt-6">
        <BottomBanner wrapperClass="px-6 pt-6 pb-0 desktop:px-0" />
      </div>
    </section>
  );
}
