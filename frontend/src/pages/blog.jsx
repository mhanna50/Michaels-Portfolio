import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import BlogList from "../components/BlogTools/BlogList";
import Footer from "../components/Footer";
import StickyHeader from "../components/StickyHeader";
import { getAllPosts } from "../utils/loadposts";
import { formatReadableDate } from "../utils/formatDate";

const heroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const featureCardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" },
  },
};

export default function Blog({ theme, mainTheme }) {
  const posts = getAllPosts();
  const featuredPost = posts[0];
  const blogTheme = theme?.blog;
  const mainStyle = {
    background: blogTheme?.bg || mainTheme?.blog?.bg,
    color: blogTheme?.text || mainTheme?.blog?.text,
  };
  const featureCardStyle = blogTheme?.cardBg
    ? {
        background: blogTheme.cardBg,
        color: blogTheme.cardText ?? blogTheme.text,
      }
    : undefined;
  const secondaryCardStyle = blogTheme?.cardBg
    ? {
        background: blogTheme.cardBg,
        color: blogTheme.cardText ?? blogTheme.text,
      }
    : undefined;
  const listSectionStyle = blogTheme?.listBg
    ? {
        background: blogTheme.listBg,
        color: blogTheme.text,
      }
    : undefined;
  const blogPalette = blogTheme?.palette || mainTheme?.blog?.palette || {};
  const navStyle = blogPalette.nav ? { color: blogPalette.nav } : undefined;
  const navMutedStyle = blogPalette.navMuted ? { color: blogPalette.navMuted } : undefined;
  const headingStyle = blogPalette.heading ? { color: blogPalette.heading } : undefined;
  const bodyStyle = blogPalette.body ? { color: blogPalette.body } : undefined;
  const mutedStyle = blogPalette.muted ? { color: blogPalette.muted } : undefined;
  const dividerStyle = blogPalette.divider ? { backgroundColor: blogPalette.divider } : undefined;
  const dateStyle = blogPalette.date ? { color: blogPalette.date } : undefined;
  const buttonStyle = blogPalette.buttonBg
    ? {
        backgroundColor: blogPalette.buttonBg,
        color: blogPalette.buttonText,
        borderColor: blogPalette.buttonBg,
        transition: "all 300ms ease",
      }
    : undefined;
  const buttonHoverStyle = blogPalette.buttonHover
    ? {
        backgroundColor: blogPalette.buttonHover,
        color: blogPalette.buttonText,
        borderColor: blogPalette.buttonHover,
        transition: "all 300ms ease",
      }
    : buttonStyle;
  const featureCardFallbackClass = featureCardStyle ? "" : "border-primary-dark/20 bg-white/70";
  const secondaryCardFallbackClass = secondaryCardStyle ? "" : "border-secondary-dark/30 bg-gradient-to-br from-white/90 via-white/70 to-secondary-light/50 text-neutral/70";
  const navFallbackClass = navStyle ? "" : "text-primary-dark/70";
  const navMutedFallbackClass = navMutedStyle ? "" : "text-primary-dark/70";
  const headingFallbackClass = headingStyle ? "" : "text-black";
  const bodyFallbackClass = bodyStyle ? "" : "text-neutral/75";
  const mutedFallbackClass = mutedStyle ? "" : "text-neutral/75";
  const dividerFallbackClass = dividerStyle ? "" : "bg-primary-dark/60";
  const heroButtonFallbackClass = buttonStyle ? "" : "border-primary-dark/30 bg-white/65 text-primary-dark hover:border-primary hover:bg-primary hover:text-white";
  const featuredButtonFallbackClass = buttonStyle ? "" : "border-primary-dark/30 bg-neutral/5 text-primary-dark hover:border-primary hover:bg-primary hover:text-white";

  const handleButtonHover = (event, entering) => {
    if (!buttonStyle || !buttonHoverStyle) return;
    const target = event.currentTarget;
    const styles = entering ? buttonHoverStyle : buttonStyle;
    Object.entries(styles).forEach(([prop, value]) => {
      target.style[prop] = value;
    });
  };

  return (
    <>
      <StickyHeader theme={theme} forceVisible />
      <main
        className="min-h-screen"
        style={{
          background: mainTheme?.page?.bg,
          color: mainTheme?.page?.text,
        }}
      >
      <section
        className="relative px-6 pt-10 pb-12 md:pt-12 md:pb-16 transition-colors duration-500"
        style={mainStyle}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroContainer}
          className="relative mx-auto max-w-6xl space-x-2 space-y-10"
        >
          <motion.nav
            variants={heroItem}
            className={`flex items-center justify-between text-sm font-accent uppercase tracking-[0.28em] ${navFallbackClass}`}
            style={navStyle}
          >
            <Link
              to="/"
              className={`inline-flex items-center gap-3 rounded-full border px-6 py-3 text-base transition-all duration-300 ${heroButtonFallbackClass}`}
              style={buttonStyle}
              onMouseEnter={(event) => handleButtonHover(event, true)}
              onMouseLeave={(event) => handleButtonHover(event, false)}
            >
              <span className="text-xl leading-none">←</span>
              <span>Back Home</span>
            </Link>
            <a
              href="#all-posts"
              className={`hidden md:inline-flex items-center gap-3 rounded-full border px-6 py-3 text-base transition-all duration-300 ${heroButtonFallbackClass}`}
              style={buttonStyle}
              onMouseEnter={(event) => handleButtonHover(event, true)}
              onMouseLeave={(event) => handleButtonHover(event, false)}
            >
              <span>All Articles</span>
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </motion.nav>

          <motion.header variants={heroItem} className="max-w-4xl space-y-6">
            <p
              className={`font-accent uppercase tracking-[0.35em] text-md ${navMutedFallbackClass}`}
              style={navMutedStyle || navStyle}
            >
              Project Notes
            </p>
            <h1
              className={`font-serifalt text-5xl md:text-6xl lg:text-7xl tracking-tight ${headingFallbackClass}`}
              style={headingStyle}
            >
              Plain-language updates on building websites, content systems, and helpful automations.
            </h1>
            <div className={`h-1 w-24 rounded-full ${dividerFallbackClass}`} style={dividerStyle} />
            <p
              className={`font-serifalt text-xl leading-relaxed ${bodyFallbackClass}`}
              style={bodyStyle}
            >
              Each entry explains what we tried, what changed, and how you can apply the same ideas without learning new
              jargon. It&apos;s practical storytelling for business owners who want the highlights.
            </p>
          </motion.header>

          {featuredPost && (
            <motion.div
              variants={featureCardVariants}
              className={`grid gap-10 rounded-[3rem] border p-6 shadow-2xl backdrop-blur-sm transition-colors duration-500 md:grid-cols-[0.55fr,0.45fr] lg:grid-cols-[0.45fr,0.55fr] lg:gap-14 ${featureCardFallbackClass}`}
              style={featureCardStyle}
            >
              <div className="flex flex-col gap-6 rounded-[2rem] px-6 py-6 sm:px-8 lg:gap-8 lg:justify-center lg:pl-12 lg:pr-6 lg:py-10">
                <div className="flex flex-col gap-5">
                  <p
                    className={`font-accent uppercase tracking-[0.35em] text-sm ${mutedFallbackClass}`}
                    style={mutedStyle || dateStyle}
                  >
                    Latest entry · {formatReadableDate(featuredPost.date)}
                  </p>
                  <h2
                    className="font-serifalt text-4xl leading-tight"
                    style={headingStyle}
                  >
                    {featuredPost.title}
                  </h2>
                </div>

                {featuredPost.description && (
                  <p
                    className={`font-serifalt text-lg leading-relaxed lg:text-xl lg:leading-loose -my-1 ${bodyFallbackClass}`}
                    style={bodyStyle}
                  >
                    {featuredPost.description}
                  </p>
                )}

                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className={`group inline-flex items-center gap-3 self-start rounded-full border px-5 py-2 font-accent text-base uppercase tracking-[0.3em] transition-all duration-300 ${featuredButtonFallbackClass}`}
                  style={buttonStyle}
                  onMouseEnter={(event) => handleButtonHover(event, true)}
                  onMouseLeave={(event) => handleButtonHover(event, false)}
                >
                  <span>Read the article</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
              <div
                className={`flex w-full flex-col overflow-hidden rounded-[2.25rem] border text-sm font-serifalt transition-colors duration-500 ${secondaryCardFallbackClass}`}
                style={secondaryCardStyle}
              >
                {featuredPost.previewImage && (
                  <img
                    src={featuredPost.previewImage}
                    alt={`Preview for ${featuredPost.title}`}
                    className="h-40 w-full object-cover sm:h-40 md:h-40 lg:h-40"
                  />
                )}
                <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
                  {featuredPost.excerpt ? (
                    <p
                      className={`line-clamp-4 break-words text-base leading-relaxed ${bodyFallbackClass}`}
                      style={bodyStyle}
                    >
                      {featuredPost.excerpt}
                    </p>
                  ) : (
                    <p
                      className={`line-clamp-4 break-words text-base leading-relaxed ${bodyFallbackClass}`}
                      style={bodyStyle}
                    >
                      {featuredPost.description ??
                        'Browse the journal for practical lessons on planning, building, and improving digital projects.'}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            variants={heroItem}
            className="flex items-center justify-center"
          >
            <svg
              className={`h-12 w-24 animate-bounce-slow ${mutedFallbackClass}`}
              style={mutedStyle}
              viewBox="0 0 120 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 18L60 42L102 18"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      <motion.section
        className="relative overflow-hidden px-6 pb-24 pt-12 sm:pt-16 md:pt-24"
        id="all-posts"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
        variants={sectionReveal}
        style={listSectionStyle || mainStyle}
      >
        <div className="relative mx-auto max-w-6xl">
          <BlogList posts={posts} palette={blogPalette} themeColors={blogTheme} />
        </div>
      </motion.section>
      </main>
      <Footer theme={theme} mainTheme={mainTheme} />
    </>
  );
}
