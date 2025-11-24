import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Link } from "react-router-dom";
import { Sun, Cloud, CloudRain, CloudSnow, Moon, Gauge, Paintbrush } from "lucide-react";

const OPTIONS = [
  { value: "live", label: "Live", icon: Gauge },
  { value: "clear", label: "Sunny", icon: Sun },
  { value: "clouds", label: "Cloudy", icon: Cloud },
  { value: "rain", label: "Rainy", icon: CloudRain },
  { value: "snow", label: "Snowy", icon: CloudSnow },
  { value: "night", label: "Night", icon: Moon },
];

const panelVariants = {
  initial: { x: 260, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 28 } },
  exit: { x: 260, opacity: 0, transition: { duration: 0.2 } },
};

const hexToRgb = (hex) => {
  if (typeof hex !== "string") return null;
  const clean = hex.trim().replace("#", "");
  if (![3, 6].includes(clean.length)) return null;
  const normalized = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const int = parseInt(normalized, 16);
  if (Number.isNaN(int)) return null;
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
};

const relativeLuminance = (hex) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const transform = (channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const r = transform(rgb.r);
  const g = transform(rgb.g);
  const b = transform(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export default function ThemeControl({ manualCondition, setManualOverride, theme }) {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const activeValue = manualCondition ?? "live";

  const activeLabel = useMemo(() => {
    return OPTIONS.find((opt) => opt.value === activeValue)?.label ?? "Live";
  }, [activeValue]);

  const handleSelect = (value) => {
    if (value === "live") {
      setManualOverride(null);
    } else {
      setManualOverride(value);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const handleClose = () => setOpen(false);
    window.addEventListener("theme-control-close", handleClose);
    return () => window.removeEventListener("theme-control-close", handleClose);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const handleAvailabilityChange = (event) => {
      const shouldDisable = Boolean(event?.detail?.disabled);
      setDisabled(shouldDisable);
      if (shouldDisable) {
        setOpen(false);
      }
    };
    window.addEventListener("theme-control-availability", handleAvailabilityChange);
    return () => window.removeEventListener("theme-control-availability", handleAvailabilityChange);
  }, []);

  const textColor = typeof theme?.text === "string" ? theme.text : null;
  const luminance = textColor ? relativeLuminance(textColor) : null;
  const useLightButton = luminance !== null && luminance >= 0.6;
  const buttonClasses = useLightButton
    ? "bg-white text-slate-900 border border-slate-200 hover:bg-slate-100"
    : "bg-slate-900 text-white border border-slate-700 hover:bg-slate-800";

  const closedButtonClasses = `absolute bottom-0 right-0 flex h-16 w-12 items-center justify-center rounded-l-full shadow-2xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 ${buttonClasses}`;
  const openButtonClasses = `absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 ${buttonClasses}`;

  const wrapperVisibility = disabled ? "pointer-events-none opacity-0 translate-y-1" : "opacity-100 translate-y-0";

  return (
    <div className={`fixed bottom-12 right-0 z-40 transition-all duration-200 ease-out ${wrapperVisibility}`} aria-hidden={disabled}>
      <div className="relative min-h-[12rem]">
        <AnimatePresence>
          {open && (
            <motion.div
              key="theme-panel"
              className="absolute bottom-0 right-0 w-72 rounded-l-3xl border border-slate-200 bg-white/95 p-6 pr-20 shadow-2xl backdrop-blur-md"
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                    Theme
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{activeLabel}</p>
                </div>
              </div>
              <LayoutGroup>
                <div className="mt-5 flex flex-wrap gap-2">
                  {OPTIONS.map(({ value, label, icon: Icon }) => {
                    const isActive = activeValue === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleSelect(value)}
                        className="relative flex h-16 w-[calc(50%-0.25rem)] flex-col items-center justify-center overflow-hidden rounded-2xl border border-transparent text-xs font-medium uppercase tracking-[0.18em] text-slate-500 transition-colors hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                      >
                        {isActive && (
                          <motion.span
                            layoutId="theme-option-highlight"
                            className="absolute inset-0 rounded-2xl border border-slate-300 bg-slate-100/70"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                        <Icon
                          className={`relative z-10 mb-1 h-5 w-5 ${
                            isActive ? "text-slate-900" : "text-slate-500"
                          }`}
                        />
                        <span className="relative z-10">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </LayoutGroup>
            <Link
              to="/contact"
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg transition hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
              onClick={() => setOpen(false)}
            >
                Contact Me
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className={open ? openButtonClasses : closedButtonClasses}
          disabled={disabled}
        >
          <span className="flex items-center justify-center">
            <Paintbrush className="h-5 w-5" />
          </span>
        </button>
      </div>
    </div>
  );
}
