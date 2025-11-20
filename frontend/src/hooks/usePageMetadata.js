import { useEffect } from "react";
import { DEFAULT_OG_IMAGE } from "@/data/siteMeta";

const upsertMeta = (attr, identifier, content) => {
  if (typeof document === "undefined" || !content) return;
  const selector = `meta[${attr}="${identifier}"]`;
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, identifier);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const upsertLink = (rel, href) => {
  if (typeof document === "undefined" || !href) return;
  let link = document.head.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
};

export default function usePageMetadata({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  jsonLd,
  structuredDataId = "page-structured-data",
}) {
  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    if (title) {
      document.title = title;
      upsertMeta("property", "og:title", title);
      upsertMeta("name", "twitter:title", title);
    }

    if (description) {
      upsertMeta("name", "description", description);
      upsertMeta("property", "og:description", description);
      upsertMeta("name", "twitter:description", description);
    }

    if (canonical) {
      upsertLink("canonical", canonical);
      upsertMeta("property", "og:url", canonical);
      upsertMeta("name", "twitter:url", canonical);
    }

    upsertMeta("property", "og:type", ogType);
    const resolvedOgImage = ogImage || DEFAULT_OG_IMAGE;
    if (resolvedOgImage) {
      upsertMeta("property", "og:image", resolvedOgImage);
      upsertMeta("name", "twitter:image", resolvedOgImage);
    }
    upsertMeta("name", "twitter:card", "summary_large_image");

    let cleanup;
    if (jsonLd) {
      const scriptId = structuredDataId;
      let script = document.getElementById(scriptId);
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = scriptId;
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
      cleanup = () => {
        script.remove();
      };
    }

    return cleanup;
  }, [title, description, canonical, ogImage, ogType, jsonLd, structuredDataId]);
}
