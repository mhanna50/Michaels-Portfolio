import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import useWeatherTheme from "./hooks/useWeatherTheme";
import ThemeControl from "./components/ThemeControl";

const loadHome = () => import("./pages/home");
const loadBlog = () => import("./pages/blog");
const loadPortfolio = () => import("./pages/portfolio");
const loadPortfolioCaseStudy = () => import("./pages/PortfolioCaseStudy");
const loadServicesPage = () => import("./pages/services");
const loadWebDesignServices = () => import("./pages/services-web-design");
const loadAutomationServices = () => import("./pages/services-automations");
const loadBlogPost = () => import("./components/BlogTools/BlogPost");
const loadContactPage = () => import("./pages/contact");

const Home = lazy(loadHome);
const Blog = lazy(loadBlog);
const Portfolio = lazy(loadPortfolio);
const PortfolioCaseStudy = lazy(loadPortfolioCaseStudy);
const ServicesPage = lazy(loadServicesPage);
const WebDesignServicesPage = lazy(loadWebDesignServices);
const AutomationServicesPage = lazy(loadAutomationServices);
const BlogPost = lazy(loadBlogPost);
const ContactPage = lazy(loadContactPage);

const HEADER_OFFSET = "clamp(96px, 12vh, 140px)";
const HEADER_BREAKPOINT = 1024;

function Layout({ children, background, textColor, themeControl }) {
  const [needsHeaderPadding, setNeedsHeaderPadding] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const updatePadding = () => setNeedsHeaderPadding(window.innerWidth < HEADER_BREAKPOINT);
    updatePadding();
    window.addEventListener("resize", updatePadding);
    return () => window.removeEventListener("resize", updatePadding);
  }, []);
  return (
    <div
      style={{
        minHeight: "100vh",
        background: background ?? "#0b1220",
        color: textColor ?? "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {themeControl}
      <main style={{ flex: 1, paddingTop: needsHeaderPadding ? HEADER_OFFSET : 0 }}>{children}</main>
    </div>
  );
}

function BlogPostRoute({ theme, mainTheme }) {
  const { slug } = useParams();
  return <BlogPost slug={slug} theme={theme} mainTheme={mainTheme} />;
}

export default function App() {
  const { weather, theme, manualCondition, setManualOverride, mainTheme } = useWeatherTheme();
  const location = useLocation();
  const showThemeControl = !/^\/blog\/[^/]+$/i.test(location.pathname);
  const layoutBackground = mainTheme?.page?.bg ?? "#0b1220";
  const layoutTextColor = mainTheme?.page?.text ?? "white";

  const themeControl = (
    <ThemeControl
      manualCondition={manualCondition}
      setManualOverride={setManualOverride}
      theme={theme}
    />
  );

  useEffect(() => {
    const preloaders = [
      loadHome,
      loadBlog,
      loadPortfolio,
      loadPortfolioCaseStudy,
      loadServicesPage,
      loadWebDesignServices,
      loadAutomationServices,
      loadBlogPost,
      loadContactPage,
    ];
    preloaders.forEach((loader) => {
      loader().catch(() => {});
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <>
      <Layout
        background={layoutBackground}
        textColor={layoutTextColor}
        themeControl={showThemeControl ? themeControl : null}
      >
        <Suspense
          fallback={
            <div
              style={{
                minHeight: "60vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Loading…
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home weather={weather} theme={theme} mainTheme={mainTheme} />} />
            <Route path="/blog" element={<Blog theme={theme} mainTheme={mainTheme} />} />
            <Route path="/blog/:slug" element={<BlogPostRoute theme={theme} mainTheme={mainTheme} />} />
            <Route path="/portfolio" element={<Portfolio theme={theme} mainTheme={mainTheme} />} />
            <Route
              path="/portfolio/:slug"
              element={<PortfolioCaseStudy theme={theme} mainTheme={mainTheme} />}
            />
            <Route path="/services" element={<ServicesPage theme={theme} mainTheme={mainTheme} />} />
            <Route
              path="/services/web-design"
              element={<WebDesignServicesPage theme={theme} mainTheme={mainTheme} />}
            />
            <Route
              path="/services/automations"
              element={<AutomationServicesPage theme={theme} mainTheme={mainTheme} />}
            />
            <Route path="/contact" element={<ContactPage theme={theme} mainTheme={mainTheme} />} />
          </Routes>
        </Suspense>
      </Layout>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
