import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronsUpDown } from "lucide-react";
import { getAllPosts } from "../../utils/loadposts";
import { formatReadableDate, parseDateValue } from "../../utils/formatDate";

const THEME_TRANSITION = "background 600ms ease, background-color 600ms ease, color 600ms ease, border-color 600ms ease";

const withTransition = (style) => ({
  transition: THEME_TRANSITION,
  ...(style || {}),
});

const getDateValue = (value) => {
  const date = parseDateValue(value);
  return date ? date.getTime() : 0;
};

const SORT_OPTIONS = [
  {
    id: "date-desc",
    label: "Newest → Oldest",
    sortFn: (a, b) => getDateValue(b.date) - getDateValue(a.date),
  },
  {
    id: "date-asc",
    label: "Oldest → Newest",
    sortFn: (a, b) => getDateValue(a.date) - getDateValue(b.date),
  },
];

export default function BlogList({ posts: incomingPosts, palette, themeColors }) {
  const posts = Array.isArray(incomingPosts) ? incomingPosts : getAllPosts();
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const cardBackground = themeColors?.cardBg || palette?.cardBg;
  const cardText = themeColors?.cardText || palette?.cardText;
  const cardStyle = cardBackground
    ? withTransition({
        background: cardBackground,
        borderColor: palette?.cardBorder,
        color: cardText,
      })
    : undefined;
  const cardMutedStyle = palette?.cardMuted ? { color: palette.cardMuted } : undefined;
  const excerptStyle = cardMutedStyle || (themeColors?.cardText ? { color: themeColors.cardText } : undefined);
  const dateStyle = palette?.date ? { color: palette.date } : undefined;
  const buttonStyle = palette?.buttonBg
    ? withTransition({
        background: palette.buttonBg,
        borderColor: palette.buttonBg,
        color: palette.buttonText,
      })
    : undefined;
  const buttonHoverStyle = palette?.buttonHover
    ? withTransition({
        background: palette.buttonHover,
        borderColor: palette.buttonHover,
        color: palette.buttonText,
      })
    : buttonStyle;
  const menuStyle = palette?.cardBg
    ? withTransition({
        background: palette.cardBg,
        borderColor: palette.cardBorder,
        color: palette.cardText,
      })
    : undefined;
  const sortButtonFallbackClass = buttonStyle ? "" : "border-primary-dark/30 bg-white/80 text-primary-dark hover:border-primary hover:bg-primary hover:text-white";
  const sortMenuFallbackClass = palette ? "" : "border-primary-dark/20 bg-white/95";
  const sortOptionActiveFallbackClass = palette ? "" : "bg-primary/10 text-primary-dark";
  const sortOptionFallbackClass = palette ? "" : "text-neutral/80 hover:bg-primary/5";
  const cardFallbackClass = cardStyle ? "" : "border-primary-dark/15 bg-white/75";
  const dateFallbackClass = dateStyle ? "" : "text-neutral/60";
  const titleFallbackClass = cardStyle?.color ? "" : "text-neutral";
  const excerptFallbackClass = excerptStyle ? "" : "text-white/85";
  const linkButtonFallbackClass = buttonStyle ? "" : "border-primary-dark/30 bg-neutral/5 text-primary-dark hover:border-primary hover:bg-primary hover:text-white";

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleClickAway = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickAway);
    document.addEventListener("touchstart", handleClickAway);

    return () => {
      document.removeEventListener("mousedown", handleClickAway);
      document.removeEventListener("touchstart", handleClickAway);
    };
  }, [isMenuOpen]);

  const sortedPosts = useMemo(() => {
    const sorter = selectedSort?.sortFn ?? SORT_OPTIONS[0].sortFn;
    return [...posts].sort(sorter);
  }, [posts, selectedSort]);

  const handleSortSelect = (option) => {
    setSelectedSort(option);
    setIsMenuOpen(false);
  };

  if (!posts.length) {
    return (
      <p className="text-center font-serifalt text-neutral/70">
        Articles will appear here soon. Check back for approachable updates on current projects and lessons learned.
      </p>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex justify-end">
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 font-accent text-xs uppercase tracking-[0.35em] shadow-sm transition-all duration-300 sm:text-sm ${sortButtonFallbackClass}`}
            style={buttonStyle}
            onMouseEnter={(event) => {
              if (!buttonHoverStyle) return;
              Object.entries(buttonHoverStyle).forEach(([prop, value]) => {
                event.currentTarget.style[prop] = value;
              });
            }}
            onMouseLeave={(event) => {
              if (!buttonStyle) return;
              Object.entries(buttonStyle).forEach(([prop, value]) => {
                event.currentTarget.style[prop] = value;
              });
            }}
          >
            <span>Sort</span>
            <ChevronsUpDown className="h-4 w-4" />
          </button>

          {isMenuOpen && (
            <div
              className={`absolute right-0 z-20 mt-3 w-56 overflow-hidden rounded-3xl border p-1.5 shadow-xl backdrop-blur ${sortMenuFallbackClass}`}
              style={menuStyle}
            >
              {SORT_OPTIONS.map((option) => {
                const isActive = option.id === selectedSort?.id;
                const optionClass = (isActive ? sortOptionActiveFallbackClass : sortOptionFallbackClass) || "";
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSortSelect(option)}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left font-serifalt text-sm transition-colors duration-200 ${optionClass}`}
                    style={isActive ? buttonStyle : undefined}
                  >
                    <span>{option.label}</span>
                    {isActive && <Check className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        {sortedPosts.map((post) => (
          <motion.article
            key={post.slug}
            className={`group relative overflow-hidden rounded-[3rem] border p-8 shadow-2xl backdrop-blur-sm transition-transform transform-gpu duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(0,0,0,0.35)] ${cardFallbackClass}`}
            style={cardStyle}
            whileHover={{ y: -12, scale: 1.01 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {!cardStyle && (
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 via-white/5 to-secondary-light/35" />
              </div>
            )}

            <div className="relative space-y-6">
              {post.previewImage && (
                <div className="overflow-hidden rounded-[1.75rem] border border-primary-dark/10 bg-neutral/5">
                  <img
                    src={post.previewImage}
                    alt={`Preview for ${post.title}`}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}

              <p
                className={`font-accent uppercase tracking-[0.35em] text-base ${dateFallbackClass}`}
                style={dateStyle}
              >
                {formatReadableDate(post.date)}
              </p>

              <div className="space-y-3">
                <h2
                  className={`font-serifalt text-3xl leading-tight ${titleFallbackClass}`}
                  style={cardStyle?.color ? { color: cardStyle.color } : undefined}
                >
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p
                    className={`line-clamp-2 break-words font-serifalt text-base leading-relaxed ${excerptFallbackClass}`}
                    style={excerptStyle}
                  >
                    {post.excerpt}
                  </p>
                )}
              </div>

              <Link
                to={`/blog/${post.slug}`}
                className={`relative inline-flex items-center gap-3 rounded-full border px-6 py-2.5 font-accent text-sm uppercase tracking-[0.3em] transition-all duration-300 ${linkButtonFallbackClass}`}
                style={buttonStyle}
                onMouseEnter={(event) => {
                  if (!buttonHoverStyle) return;
                  Object.entries(buttonHoverStyle).forEach(([prop, value]) => {
                    event.currentTarget.style[prop] = value;
                  });
                }}
                onMouseLeave={(event) => {
                  if (!buttonStyle) return;
                  Object.entries(buttonStyle).forEach(([prop, value]) => {
                    event.currentTarget.style[prop] = value;
                  });
                }}
              >
                <span>Read Article</span>
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
