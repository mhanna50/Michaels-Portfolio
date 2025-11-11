import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const detailVariants = {
  open: { height: 'auto', opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  collapsed: { height: 0, opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } },
};

const floatingDetailVariants = {
  open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  collapsed: { opacity: 0, y: 12, transition: { duration: 0.25, ease: 'easeIn' } },
};

const StatCard = ({ heading, subtext, detailBody, delay, isOpen, onToggle, floatDetail = false }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ type: 'spring', stiffness: 120, damping: 18, delay }}
    className={`relative text-right space-y-2 max-w-xs ${floatDetail ? 'pb-10' : ''}`}
  >
    <button
      type="button"
      onClick={onToggle}
      className="relative w-full text-right group pb-2"
    >
      <div className="flex items-end justify-end">
        <div className="space-y-1 text-right">
          <p className="font-accent uppercase text-5xl text-black">{heading}</p>
          <p className="font-serifalt text-lg text-neutral-dark">{subtext}</p>
        </div>
      </div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="detail"
          variants={floatDetail ? floatingDetailVariants : detailVariants}
          initial="collapsed"
          animate="open"
          exit="collapsed"
          className={`overflow-hidden rounded-lg border border-secondary-dark/40 text-left shadow max-w-[220px] bg-white/90 backdrop-blur-sm ${floatDetail
              ? 'absolute right-0 top-[calc(100%+0.75rem)] px-4 py-3 pointer-events-auto'
              : 'mt-2 px-3 ml-auto bg-transparent'
            }`}
        >
          <motion.p
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`text-base font-serifalt text-black ${floatDetail ? 'leading-6' : 'py-3'}`}
          >
            {detailBody}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const ResultCard = ({ heading, subtext, delay, showDivider = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay }}
    className={`flex h-full w-full flex-col items-start justify-end md:px-5 ${showDivider
        ? 'border-t border-primary-dark/40 pt-4 md:border-t-0 md:pt-0'
        : ''
      }`}
  >
    <div className="w-full leading-tight space-y-0.5 text-left">
      <p className="font-accent uppercase text-xl md:text-xl text-black scale-y-100">{heading}</p>
      <p className="font-serifalt text-md text-neutral line-clamp-2">{subtext}</p>
    </div>
  </motion.div>
);

export default function HeroSection({ mainTheme }) {
  const [openCard, setOpenCard] = useState(null);
  const heroStyle = mainTheme?.hero
    ? {
        background: mainTheme.hero.bg,
        color: mainTheme.hero.text,
      }
    : undefined;
  const heroPortfolioButtonStyle = {
    backgroundImage: 'linear-gradient(130deg, #101010, #3a3a3a)',
    backgroundColor: '#1a1a1a',
    color: '#f6f6f6',
    borderColor: '#050505',
    boxShadow: '0 18px 36px rgba(0, 0, 0, 0.35)',
  };
  const heroPortfolioButtonClass =
    'rounded-full border px-7 py-2.5 text-xs font-accent uppercase tracking-[0.3em] transition-all duration-300 bg-[#161616] text-white hover:-translate-y-0.5 hover:bg-black hover:text-white';

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-start min-h-[max(950px,100vh)] px-6 lg:px-12 pt-16 lg:pt-20 pb-10 overflow-visible"
      style={heroStyle}
    >

      <div className="absolute right-4 top-4 z-30 sm:right-10 sm:top-8">
        <a href="/portfolio">
          <Button className={heroPortfolioButtonClass} style={heroPortfolioButtonStyle}>
            View Portfolio
          </Button>
        </a>
      </div>



      
      {/* Centered, Overlapping Image */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-0 -translate-x-1/2 hidden lg:block z-10"
      >
        <div className="w-[600px] h-[750px] rounded-b-[30rem] overflow-hidden shadow-2xl group">
          <img
            src="/images/personal/portfolio.jpeg"
            alt="Michael"
            className="w-full h-full object-cover object-top scale-105 "
          />
        </div>
      </motion.div>

      {/* Mobile Image */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[40vh] w-[80vw] max-w-sm lg:hidden block"
      >
        <div className="h-full w-full rounded-b-full overflow-hidden shadow-2xl group">
          <img src="images/personal/portfolio.jpeg" alt="Michael" className="w-full h-full object-cover object-top" />
        </div>
      </motion.div>


      <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-start gap-8 relative z-20 pt-[45vh] lg:pt-12 flex-1">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="lg:text-left text-top"
        >
          <div className="flex flex-col max-w-[360px] w-full -mt-11">
            <h2 className="font-serifalt text-4xl font-bold text-black tracking-widest scale-y-110">
              Hey. I'm Michael,
            </h2>

            <h1 className="font-accent uppercase  text-black text-8xl md:text-11xl mt-5 -mb-4 scale-y-100 ">
              A UI/UX
            </h1>
            <h1 className="font-serif italic text-black text-6xl md:text-10xl">
              <span className="text-11xl">&</span> <span className="scale-y-110">Creative</span>
            </h1>
            <h1 className="font-accent uppercase text-black text-10xl md:text-11xl -mt-2 mb-3 scale-y-100">
              Developer
            </h1>

            <div className="h-[144px]">
              <p className="font-serifalt font-thin text-black text-left text-3xl leading-[1.15] tracking-tight h-full scale-y-110">
                I build elegant, high-performance websites and digital experiences that merge creativity with clean code, SEO, and precise QA.
              </p>
            </div>

            <a href="mailto:michael.email@example.com">
              <Button className=" bg-neutral hover:bg-primary text-lg text-white font-accent px-8 py-2.5 pr-1.5 rounded-full mt-2 inline-flex items-center justify-center uppercase gap-5 group transition-colors duration-300">
                <span>Contact Me</span>

                {/* Arrow wrapper (circle) */}
                <span className="flex items-center mr-1 justify-center w-10 h-10 rounded-full bg-white transition-all duration-300 group-hover:bg-neutral">
                  <ArrowRight
                    className="w-4 h-4 text-black transition-all duration-300 group-hover:text-white group-hover:-rotate-45"
                  />
                </span>
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          layout
          initial={false}
          transition={{ type: 'spring', stiffness: 140, damping: 20 }}
          className="flex-col gap-6 items-end hidden lg:flex mt-14 lg:translate-x-[5px]"
        >
          <StatCard
            heading="10+"
            subtext="Websites Built"
            detailBody="Built entirely with React components and styled using Tailwind CSS for a modern, responsive interface and clean developer workflow."
            isOpen={openCard === 'build'}
            onToggle={() => setOpenCard((prev) => (prev === 'build' ? null : 'build'))}
            delay={0.4}
          />
          <StatCard
            heading="3"
            subtext="Live Websites"
            detailBody="A scheduled cron job automatically summarizes monthly blog content using OpenAI, keeping site highlights fresh and up to date."
            isOpen={openCard === 'backend'}
            onToggle={() => setOpenCard((prev) => (prev === 'backend' ? null : 'backend'))}
            delay={0.6}
          />
          <StatCard
            heading="90+"
            subtext="SEO score via Lighthouse"
            detailBody="Optimized for performance, accessibility, and SEO — consistently achieving a 90+ Lighthouse score across key metrics."
            isOpen={openCard === 'lighthouse'}
            onToggle={() => setOpenCard((prev) => (prev === 'lighthouse' ? null : 'lighthouse'))}
            delay={0.8}
          />
          <StatCard
            heading="100%"
            subtext="Mobile Friendly Layouts"
            detailBody="Integrated with OpenAI tooling and the OpenWeather API so the entire color system shifts with the sky."
            isOpen={openCard === 'apis'}
            onToggle={() => setOpenCard((prev) => (prev === 'apis' ? null : 'apis'))}
            delay={1.0}
            floatDetail
          />
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full flex justify-center z-20 mt-auto pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="px-6 pt-6 pb-0 w-full max-w-[1250px]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 items-stretch text-left md:divide-x md:divide-primary-dark/40">
            
            <ResultCard
              heading="Built Using"
              subtext="React and styled with Tailwind CSS for a modern-clean interface."
              delay={1.3}
            />
            <ResultCard
              heading="Under the Hood"
              subtext="This site's color scheme is determined by the weather."
              delay={1.4}
              showDivider
            />
            <ResultCard
              heading="AI is Used"
              subtext="To automatically summarize my blog in the below section."
              delay={1.5}
              showDivider
            />
            <ResultCard
              heading="My Skillset"
              subtext="Ensures you will have a well-performing and discoverable site."
              delay={1.6}
              showDivider
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
