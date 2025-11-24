export const SITE_URL = "https://hannawebstudio.com";
export const SITE_NAME = "Hanna Web Studio";
export const OWNER_NAME = "Michael Hanna";
export const CONTACT_EMAIL = "contact@hannawebstudio.com";
export const CONTACT_PHONE = "+1-484-716-8373";
export const SERVICE_AREAS = ["Wilmington, Delaware", "United States"];
export const SAME_AS_LINKS = [
  "https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit",
  "https://github.com/mhanna50",
];

const LOGO_URL = `${SITE_URL}/images/personal/michaellogo.svg`;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/personal/michaelphoto.jpeg`;
const ORGANIZATION_ID = `${SITE_URL}#organization`;
const PERSON_ID = `${SITE_URL}#michael-hanna`;
const WEBSITE_ID = `${SITE_URL}#website`;

const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:00",
  },
];

export const toAbsoluteUrl = (value) => {
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  const normalized = value.startsWith("/") ? value : `/${value}`;
  return `${SITE_URL}${normalized.replace(/\/{2,}/g, "/")}`;
};

const buildOrganizationSchema = () => ({
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
  sameAs: SAME_AS_LINKS,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: CONTACT_PHONE,
      email: CONTACT_EMAIL,
      contactType: "customer support",
      areaServed: SERVICE_AREAS,
      availableLanguage: ["English"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Wilmington",
    addressRegion: "DE",
    addressCountry: "US",
  },
  founder: {
    "@id": PERSON_ID,
  },
});

const buildPersonSchema = () => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: OWNER_NAME,
  jobTitle: "Founder & Lead Developer",
  url: SITE_URL,
  worksFor: {
    "@id": ORGANIZATION_ID,
  },
  sameAs: SAME_AS_LINKS,
});

const buildWebsiteSchema = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: {
    "@id": ORGANIZATION_ID,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const buildSiteGraph = () => ({
  "@context": "https://schema.org",
  "@graph": [buildOrganizationSchema(), buildPersonSchema(), buildWebsiteSchema()],
});

export const buildBlogSchema = (description) => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE_URL}/blog#blog`,
  name: "Hanna Web Studio Blog",
  description,
  url: `${SITE_URL}/blog`,
  publisher: {
    "@id": ORGANIZATION_ID,
  },
  author: {
    "@id": PERSON_ID,
  },
});

export const buildBlogPostingSchema = ({
  title,
  description,
  slug,
  image,
  datePublished,
  dateModified,
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description,
  url: `${SITE_URL}/blog/${slug}`,
  mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  datePublished,
  dateModified: dateModified || datePublished,
  author: {
    "@id": PERSON_ID,
  },
  publisher: {
    "@id": ORGANIZATION_ID,
  },
  image: toAbsoluteUrl(image) || DEFAULT_OG_IMAGE,
});

export const buildPortfolioListSchema = (studies) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Portfolio Projects",
  description:
    "Client web design, development, and automation case studies from Hanna Web Studio.",
  url: `${SITE_URL}/portfolio`,
  itemListElement: studies.map((study, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${SITE_URL}/portfolio/${study.slug}`,
    name: study.title,
    image: toAbsoluteUrl(study.coverImage),
  })),
});

export const buildCaseStudySchema = (study) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: `${study.title} Case Study`,
  about: study.industry,
  description: study.summary,
  url: `${SITE_URL}/portfolio/${study.slug}`,
  image: toAbsoluteUrl(study.coverImage),
  datePublished: study.year,
  dateCreated: study.year,
  author: {
    "@id": PERSON_ID,
  },
  creator: {
    "@id": PERSON_ID,
  },
  publisher: {
    "@id": ORGANIZATION_ID,
  },
});

export const buildContactPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Hanna Web Studio",
  url: `${SITE_URL}/contact`,
  description:
    "Contact form for Hanna Web Studio to discuss web design, development, or business automation projects.",
  mainEntity: {
    "@id": ORGANIZATION_ID,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      areaServed: SERVICE_AREAS,
      availableLanguage: ["English"],
    },
  ],
});

export const buildServiceSchema = ({
  name,
  description,
  canonical,
  serviceTypes,
  priceRange = "$$",
  offersDescription,
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType: serviceTypes,
  url: canonical,
  provider: {
    "@id": ORGANIZATION_ID,
  },
  areaServed: SERVICE_AREAS,
  priceRange,
  offers: {
    "@type": "Offer",
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "USD",
      description: offersDescription || "Custom project-based engagements.",
    },
    availability: "https://schema.org/InStock",
  },
});

export const buildFaqSchema = (faqs = [], canonical) => {
  if (!Array.isArray(faqs) || !faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
    url: canonical,
  };
};
