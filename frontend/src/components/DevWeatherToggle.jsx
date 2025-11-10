import React from "react";

const OPTIONS = [
  { value: "", label: "Live weather" },
  { value: "Dark", label: "Dark Mode" },
  { value: "clear", label: "Sunny / Clear" },
  { value: "clouds", label: "Cloudy" },
  { value: "rain", label: "Rainy" },
  { value: "snow", label: "Snowy" },
];

export default function DevWeatherToggle({ value, onChange }) {
  if (!import.meta.env.DEV) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-slate-300 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md">
      <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 mb-2">
        Weather Preview
      </label>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
        className="w-48 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value || "live"} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
