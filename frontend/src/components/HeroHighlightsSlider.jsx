import React, { useCallback, useEffect, useMemo, useState } from 'react';
import heroHighlights from '@/data/heroHighlights';

const SLIDE_INTERVAL = 6000;

const chunkHighlights = (items) => {
  const result = [];
  for (let i = 0; i < items.length; i += 2) {
    result.push(items.slice(i, i + 2));
  }
  return result;
};

const HighlightCard = ({
  heading,
  subtext,
  headingColor,
  bodyColor,
  fullTextOnMobile = false,
}) => {
  const wrapperClasses = ['w-full leading-tight space-y-0.5 text-left px-3 py-4']
    .filter(Boolean)
    .join(' ');
  const bodyTextClasses = [
    'font-serifalt text-base text-neutral line-clamp-2',
    fullTextOnMobile ? 'hero-highlight-mobile-full' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      <p
        className="font-accent uppercase text-xl text-black scale-y-100"
        style={{ color: headingColor }}
      >
        {heading}
      </p>
      <p className={bodyTextClasses} style={{ color: bodyColor }}>
        {subtext}
      </p>
    </div>
  );
};

export default function HeroHighlightsSlider({ heroTheme }) {
  const slides = useMemo(() => chunkHighlights(heroHighlights), []);
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchCurrentX, setTouchCurrentX] = useState(null);
  const heroBackgroundColor = heroTheme?.bg || 'linear-gradient(135deg, #f8f7f2, #f0ede7)';
  const heroText = heroTheme?.text || '#1F1F1F';
  const heroMuted = heroTheme?.muted || 'rgba(15,15,15,0.7)';

  const goToNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToPrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const resetTouchState = useCallback(() => {
    setTouchStartX(null);
    setTouchCurrentX(null);
  }, []);

  const handleTouchStart = useCallback((event) => {
    if (!event.touches || event.touches.length === 0) return;
    setTouchStartX(event.touches[0].clientX);
    setTouchCurrentX(null);
  }, []);

  const handleTouchMove = useCallback(
    (event) => {
      if (touchStartX === null || !event.touches || event.touches.length === 0) return;
      setTouchCurrentX(event.touches[0].clientX);
    },
    [touchStartX]
  );

  const handleTouchEnd = useCallback(() => {
    if (touchStartX === null || touchCurrentX === null) {
      resetTouchState();
      return;
    }
    const delta = touchStartX - touchCurrentX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    resetTouchState();
  }, [touchStartX, touchCurrentX, goToNext, goToPrev, resetTouchState]);

  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const timer = setInterval(goToNext, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [slides.length, goToNext]);

  if (slides.length === 0) return null;

  return (
    <section
      className="relative w-full desktop:hidden px-0 phone:px-4 tablet:px-6 pt-0 pb-10"
      style={{ background: heroBackgroundColor }}
    >
      <div className="relative mx-auto w-full max-w-4xl px-3 phone:px-2 py-6">
        <div
          className="overflow-hidden"
          style={{ touchAction: 'pan-y' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={resetTouchState}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {slides.map((slidePair, slideIndex) => (
              <div
                key={`highlight-slide-${slideIndex}`}
                className="grid min-w-full grid-cols-2 gap-4 phone:gap-6 tablet:grid-cols-2"
              >
                {slidePair.map((card) => (
                  <HighlightCard
                    key={card.id}
                    heading={card.heading}
                    subtext={card.subtext}
                    headingColor={heroText}
                    bodyColor={heroMuted}
                    fullTextOnMobile={card.fullTextOnMobile}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
          {slides.map((_, index) => {
            const isActive = index === activeSlide;
            return (
              <button
                key={`highlight-dot-${index}`}
                type="button"
                className="h-3 w-3 rounded-full border transition-colors duration-200"
                style={{
                  borderColor: heroText,
                  backgroundColor: isActive ? heroText : 'transparent',
                }}
                onClick={() => setActiveSlide(index)}
                aria-label={`Show highlight set ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
