const sharedGalleryPlaceholder = [
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&auto=format&fit=crop&q=80",
    alt: "High fidelity UI screens on a dark desk",
    caption: "Annotated UI flows that tie strategy, copy, and visuals together.",
  },
  {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&auto=format&fit=crop&q=80",
    alt: "Developer workstation with multiple monitors displaying analytics",
    caption: "Build QA tracked with dashboards so every release is measurable.",
  },
];

export const portfolioCaseStudies = [
  {
    title: "American Craftsman — Local Contractor Rebrand",
    slug: "american-craftsman",
    client: "American Craftsman LLC",
    year: "2024",
    industry: ["Construction"],
    services: ["Design", "Development"],
    platform: ["Framer"],
    summary:
      "Modernized the brand, built a conversion-focused site, and wired automations that send qualified requests directly to the crew’s field tablets.",
    heroSummary: "Construction · Design & Development",
    heroKpis: [
      { label: "Lead submissions", value: "+47%", timeframe: "60 days post-launch" },
      { label: "Bounce rate", value: "-32%", timeframe: "Site-wide" },
    ],
    outcome: "+47% lead submissions in 60 days",
    coverImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&auto=format&fit=crop&q=80",
    coverImageAlt: "American Craftsman marketing site displayed on laptop and phone",
    articlePhotos: [
      {
        src: "https://images.unsplash.com/photo-1448932252197-d19750584e56?w=1400&auto=format&fit=crop&q=80",
        alt: "Crew reviewing brand boards on a workbench",
        caption: "Kickoff session translating shop-floor language into website messaging.",
      },
      {
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&auto=format&fit=crop&q=80",
        alt: "UI mocks showing hero and portfolio grid",
        caption: "High-fidelity screens pairing proof points with build photos.",
      },
      {
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&auto=format&fit=crop&q=80",
        alt: "Automation dashboard routing leads",
        caption: "Automation layer piping scoped requests into HubSpot + Slack.",
      },
    ],
    challenge:
      "Leads were coming through word-of-mouth and an outdated Wix site. They needed a credible experience that highlighted craftsmanship while capturing real project requirements.",
    strategy:
      "Ran a design audit, defined their differentiators, and built a modular Framer system with proof points, social validation, and scoped intake forms.",
    solution:
      "Delivered a fast-loading site with component-based case highlights, dynamic service menus, and dual-path CTAs that route residential and commercial work into separate pipelines.",
    gallery: {
      wireframes: [
        {
          src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop&q=80",
          alt: "Wireframes on a sketchbook",
          caption: "Low-fi flow that mapped dual intake paths.",
        },
      ],
      ui: [
        {
          src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
          alt: "UI mockups on desktop",
          caption: "High-fidelity hero and results strip with warm neutrals.",
        },
      ],
      build: sharedGalleryPlaceholder,
      automations: [
        {
          src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
          alt: "Automation dashboard",
          caption: "Zapier + Slack flow sending project briefs to field managers.",
        },
      ],
    },
    kpis: [
      {
        label: "Qualified leads",
        value: "+47%",
        timeframe: "60 days",
        source: "HubSpot",
        description: "Measured via HubSpot pipeline comparing pre/post launch.",
      },
      {
        label: "Bounce rate",
        value: "-32%",
        timeframe: "First 90 days",
        source: "GA4",
        description: "Reduced by tightening messaging and adding sticky CTAs.",
      },
      {
        label: "Estimate prep time",
        value: "-3 hrs/wk",
        timeframe: "Rolling avg",
        source: "Internal ops",
        description: "Form logic captured specs up front, cutting back-and-forth.",
      },
    ],
    stack: ["Framer", "GSAP", "Supabase", "Cloudflare"],
    automations: ["Zapier", "Slack Alerts", "HubSpot CRM", "Airtable scopes"],
    testimonial: {
      quote: "The new site feels like stepping into our shop—clients show up already sold on quality.",
      name: "Jim Rosario",
      role: "Founder",
      company: "American Craftsman LLC",
    },
    related: ["millie-aesthetics", "personal-portfolio"],
  },
  {
    title: "Millie Aesthetics — Boutique Medspa Launch",
    slug: "millie-aesthetics",
    client: "Millie Aesthetics",
    year: "2023",
    industry: ["Beauty & Wellness"],
    services: ["Design", "Development", "Automation"],
    platform: ["WordPress"],
    summary:
      "Built a premium brand system, migrated content into a lean WordPress build, and automated consult bookings so staff could stay focused on clients.",
    heroSummary: "Beauty & Wellness · Design, Development, Automation",
    heroKpis: [
      { label: "Consult requests", value: "+61%", timeframe: "Quarter over quarter" },
      { label: "Manual follow-ups", value: "-70%", timeframe: "Front desk workload" },
    ],
    outcome: "+61% consult requests after relaunch",
    coverImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1400&auto=format&fit=crop&q=80",
    coverImageAlt: "Millie Aesthetics responsive website mockups",
    articlePhotos: [
      {
        src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1400&auto=format&fit=crop&q=80",
        alt: "Wireframes outlining treatment journeys",
        caption: "Mapping intake, education, and booking flows on paper before design.",
      },
      {
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&auto=format&fit=crop&q=80",
        alt: "Soft neutral UI screens on a monitor",
        caption: "Visual language inspired by the studio palette and natural textures.",
      },
      {
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&auto=format&fit=crop&q=80",
        alt: "Automation flow chart",
        caption: "Automation map showing how requests sync to CRM and reminders.",
      },
    ],
    challenge:
      "Their DIY site didn’t reflect the in-studio experience and staff spent hours coordinating appointments by email.",
    strategy:
      "Defined a flexible visual identity, structured service content for SEO, and mapped an automation layer across intake, reminders, and post-visit care.",
    solution:
      "Launched a content-rich WordPress experience with reusable sections, CMS-driven service detail pages, and Make.com workflows that sync bookings to the CRM.",
    gallery: {
      wireframes: [
        {
          src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&auto=format&fit=crop&q=80",
          alt: "Wireframes outlining service flows",
          caption: "Wireframes showing modular service menus and FAQ blocks.",
        },
      ],
      ui: [
        {
          src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
          alt: "UI layouts with neutral tones",
          caption: "Lightweight UI kit mirroring studio textures and tones.",
        },
      ],
      build: sharedGalleryPlaceholder,
      automations: [
        {
          src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
          alt: "Automation flow illustration",
          caption: "Make.com orchestrations syncing bookings, reminders, and notes.",
        },
      ],
    },
    kpis: [
      {
        label: "Consult requests",
        value: "+61%",
        timeframe: "90 days",
        source: "Squarespace Scheduling",
        description: "Tracked via booking tool exports compared to prior quarter.",
      },
      {
        label: "Staff time",
        value: "-8 hrs/week",
        timeframe: "Rolling avg",
        source: "Operations",
        description: "Automated reminders removed 70% of manual outreach.",
      },
      {
        label: "Avg. order value",
        value: "+18%",
        timeframe: "45 days",
        source: "POS",
        description: "Bundled treatment upsells added inside service detail blocks.",
      },
    ],
    stack: ["WordPress", "ACF", "GSAP", "Cloudways"],
    automations: ["Make.com", "ActiveCampaign", "Google Sheets", "Slack"],
    testimonial: {
      quote: "Clients tell us the site feels like our studio and booking is effortless.",
      name: "Camila Rivera",
      role: "Owner",
      company: "Millie Aesthetics",
    },
    related: ["american-craftsman", "personal-portfolio"],
  },
  {
    title: "Michael Hanna Portfolio — Weather-Aware Studio System",
    slug: "personal-portfolio",
    client: "Self-Initiated",
    year: "2024",
    industry: ["Creative Services"],
    services: ["Design", "Development", "Automation"],
    platform: ["React", "Vite", "Vercel"],
    summary:
      "Documented every part of my process in a single property: weather-reactive theming, Markdown-driven publishing, schema-rich case studies, and Vercel hosting with built-in analytics.",
    heroSummary: "Creative Services · Design, Development & Automation",
    heroKpis: [
      { label: "Reusable components", value: "45+", timeframe: "Shared UI library" },
      { label: "Lighthouse mobile", value: "98", timeframe: "Performance score" },
    ],
    outcome: "Weather-aware system powering blog, services, and case studies in one codebase deployed to Vercel",
    coverImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1400&auto=format&fit=crop&q=80",
    coverImageAlt: "Multiple devices showing the Michael Hanna portfolio",
    articlePhotos: [
      {
        src: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=1400&auto=format&fit=crop&q=80",
        alt: "Person sketching component ideas",
        caption: "Ideating a modular system that blog, services, and case studies share.",
      },
      {
        src: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=1400&auto=format&fit=crop&q=80",
        alt: "Laptop showing code editor with React components",
        caption: "Refining the weather-aware theme logic inside the component library.",
      },
      {
        src: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=1400&auto=format&fit=crop&q=80",
        alt: "Analytics dashboard on tablet and phone",
        caption: "Monitoring live performance and UX metrics after launch.",
      },
    ],
    challenge:
      "I needed one flagship experience that proved my end-to-end delivery—strategy, UX, DX, automation, and hosting—while staying simple to update between launches.",
    strategy:
      "Mapped journeys for home, services, blog, portfolio, and contact. Built a component system in Tailwind/Framer Motion, wired Markdown loaders for posts, and designed weather-aware palettes controlled through OpenWeather + manual overrides.",
    solution:
      "Shipped a React/Vite app deployed on Vercel with Speed Insights + Analytics, sticky navigation, CTA ribbons, weather-driven theming, Markdown blog tooling, and schema-backed case studies. Contact flows trigger mailto templates and schema metadata so outreach stays traceable.",
    gallery: {
      wireframes: [
        {
          src: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=1200&auto=format&fit=crop&q=80",
          alt: "Wireframes outlining hero, services, and proof blocks",
          caption: "Low-fi flow mapping how weather data influences hero, services, and proof modules.",
        },
      ],
      ui: [
        {
          src: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1200&auto=format&fit=crop&q=80",
          alt: "Portfolio UI mockups",
          caption: "Dark, clear, cloudy, and rainy themes previewed with StickyHeader + CTA variants.",
        },
      ],
      build: [
        {
          src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80",
          alt: "Developer workstation",
          caption: "Component-driven build in Vite with hot reload, reusable hooks, and data fixtures.",
        },
      ],
      automations: [
        {
          src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&auto=format&fit=crop&q=80",
          alt: "API integration diagram",
          caption: "OpenWeather + session overrides, Markdown loaders, and Vercel deployment workflows.",
        },
      ],
    },
    kpis: [
      {
        label: "Component reuse",
        value: "45+",
        timeframe: "Global UI system",
        source: "Component inventory",
        description: "Shared primitives drive hero sections, cards, and CTA ribbons without rewrites.",
      },
      {
        label: "Content updates",
        value: "<10 min",
        timeframe: "Per post",
        source: "Markdown pipeline",
        description: "Blog + case studies update via local Markdown/JSON and auto-load through Vite.",
      },
      {
        label: "Theme toggles",
        value: "4",
        timeframe: "Real-time",
        source: "Weather + manual overrides",
        description: "OpenWeather conditions trigger full-site palettes with instant session overrides.",
      },
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Vercel", "Markdown"],
    automations: [
      "OpenWeather API",
      "SessionStorage overrides",
      "Custom Markdown loader",
      "Vercel Analytics & Speed Insights",
      "Email CTA templates",
    ],
    testimonial: {
      quote: "Building my own system reminded me to narrate every decision in simple language—the same cadence clients get on projects.",
      name: "Michael Hanna",
      role: "Designer & Engineer",
      company: "Independent",
    },
    related: ["american-craftsman", "millie-aesthetics"],
  },
];

export const portfolioStats = [
  {
    label: "Average conversion lift",
    value: "+38%",
    description: "Median increase across the last 4 launches.",
  },
  {
    label: "Manual hours automated",
    value: "240+",
    description: "Quarterly hours handed back to client teams.",
  },
  {
    label: "Projects shipped",
    value: "28",
    description: "Web, product, and automation engagements since 2021.",
  },
  {
    label: "Avg. build timeline",
    value: "4–6 weeks",
    description: "From kickoff through QA for most engagements.",
  },
];

export const clientLogos = [
  {
    name: "American Craftsman",
    logo: "https://dummyimage.com/160x60/1c1c1c/ffffff&text=AC",
  },
  {
    name: "Millie Aesthetics",
    logo: "https://dummyimage.com/160x60/1c1c1c/ffffff&text=Millie",
  },
  {
    name: "Michael Hanna Portfolio",
    logo: "https://dummyimage.com/160x60/1c1c1c/ffffff&text=Portfolio",
  },
  {
    name: "Silverline Legal",
    logo: "https://dummyimage.com/160x60/1c1c1c/ffffff&text=SL",
  },
];

export const portfolioProcess = [
  {
    title: "Discover",
    body: "Stakeholder workshops, audits, and success metrics that define the brief.",
    linkLabel: "See the full process",
    link: "/services#process",
  },
  {
    title: "Design",
    body: "Systems thinking across UX, content, and brand so everything lines up.",
    linkLabel: "See the full process",
    link: "/services#process",
  },
  {
    title: "Build",
    body: "Component-driven development with QA baked in.",
    linkLabel: "See the full process",
    link: "/services#process",
  },
  {
    title: "Automate",
    body: "Low/no-code + custom scripts that keep ops lean after launch.",
    linkLabel: "See the full process",
    link: "/services#process",
  },
];
