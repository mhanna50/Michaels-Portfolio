import React from "react";
import Home from "./pages/home";
import Blog from "./pages/blog";
import Portfolio from "./pages/portfolio";
import BlogPost from "./components/BlogTools/BlogPost";
import useWeatherTheme from "./hooks/useWeatherTheme";
import ThemeControl from "./components/ThemeControl";
import PortfolioCaseStudy from "./pages/PortfolioCaseStudy";
import ServicesPage from "./pages/services";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const { weather, theme, manualCondition, setManualOverride, mainTheme } = useWeatherTheme(); // keeps weather + theme in sync

  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";

  // Normalize path (remove trailing slash)
  const cleanPath = pathname.replace(/\/+$/, "");

  // Match single blog post like /blog/my-first-post
  const blogPostMatch = cleanPath.match(/^\/blog\/([^/]+)$/);
  const portfolioCaseMatch = cleanPath.match(/^\/portfolio\/([^/]+)$/);
  const themeControl = (
    <ThemeControl
      manualCondition={manualCondition}
      setManualOverride={setManualOverride}
      theme={theme}
    />
  );
  const tracking = (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );

  if (cleanPath === "/blog") {
    return (
      <>
        {themeControl}
        <Blog theme={theme} mainTheme={mainTheme} />
        {tracking}
      </>
    );
  }

  if (blogPostMatch) {
    const slug = blogPostMatch[1];
    return (
      <>
        <BlogPost slug={slug} theme={theme} mainTheme={mainTheme} />
        {tracking}
      </>
    );
  }

  if (portfolioCaseMatch) {
    const slug = portfolioCaseMatch[1];
    return (
      <>
        {themeControl}
        <PortfolioCaseStudy slug={slug} theme={theme} mainTheme={mainTheme} />
        {tracking}
      </>
    );
  }

  if (cleanPath === "/portfolio") {
    return (
      <>
        {themeControl}
        <Portfolio theme={theme} mainTheme={mainTheme} />
        {tracking}
      </>
    );
  }

  if (cleanPath === "/services") {
    return (
      <>
        {themeControl}
        <ServicesPage theme={theme} mainTheme={mainTheme} />
        {tracking}
      </>
    );
  }

  // Home route – pass weather-driven theme into sections
  return (
    <>
      {themeControl}
      <Home weather={weather} theme={theme} mainTheme={mainTheme} />
      {tracking}
    </>
  );
}

export default App;
