import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import useWeatherTheme from "./hooks/useWeatherTheme";
import ThemeControl from "./components/ThemeControl";

const Home = lazy(() => import("./pages/home"));
const Blog = lazy(() => import("./pages/blog"));
const Portfolio = lazy(() => import("./pages/portfolio"));
const PortfolioCaseStudy = lazy(() => import("./pages/PortfolioCaseStudy"));
const ServicesPage = lazy(() => import("./pages/services"));
const AutomationServicesPage = lazy(() => import("./pages/services-automations"));
const BlogPost = lazy(() => import("./components/BlogTools/BlogPost"));
const ContactPage = lazy(() => import("./pages/contact"));

function Layout({ children, background, textColor, themeControl }) {
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
      <main style={{ flex: 1 }}>{children}</main>
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
