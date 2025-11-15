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
      "Refreshed the brand, rebuilt the site in Framer, and wired automations so scoped leads hit the right foreman without extra calls.",
    heroSummary: "Construction · Design & Development",
    heroKpis: [
      { label: "Lead submissions", value: "+47%", timeframe: "60 days post-launch" },
      { label: "Bounce rate", value: "-32%", timeframe: "Site-wide" },
    ],
    outcome: "Lead submissions up 47% within 60 days",
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
      "Referrals and an aging Wix site were the entire funnel, so prospects couldn’t see proof of work and the crew spent hours digging for real project details.",
    strategy:
      "Interviewed the team, rewrote messaging around their build process, and mapped dual intake flows—residential vs commercial—before touching high-fidelity design.",
    solution:
      "Launched a component-based Framer build with proof strips, cost cues, and automation logic that tags each request, routes it into HubSpot, and pings Slack instantly.",
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
      "Created a calm brand system, rebuilt the site on lean WordPress blocks, and automated consult bookings so staff stay with clients instead of inboxes.",
    heroSummary: "Beauty & Wellness · Design, Development, Automation",
    heroKpis: [
      { label: "Consult requests", value: "+61%", timeframe: "Quarter over quarter" },
      { label: "Manual follow-ups", value: "-70%", timeframe: "Front desk workload" },
    ],
    outcome: "Consult requests climbed 61% after relaunch",
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
      "A DIY template undersold the in-studio experience and every appointment still required back-and-forth emails.",
    strategy:
      "Documented tone, palette, and service hierarchy, outlined SEO copy, and mapped intake-to-reminder flows to know what needed automation from day one.",
    solution:
      "Delivered a WordPress build with reusable sections, treatment landing pages, and Make.com workflows that sync bookings, reminders, and CRM notes automatically.",
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
      "Turned this site into a working playbook—weather-aware themes, Markdown publishing, and automation touchpoints that show how I run client work end to end.",
    heroSummary: "Creative Services · Design, Development & Automation",
    heroKpis: [
      { label: "Reusable components", value: "45+", timeframe: "Shared UI library" },
      { label: "Lighthouse mobile", value: "98", timeframe: "Performance score" },
    ],
    outcome: "Weather-aware system powering blog, services, and case studies from one Vercel deploy",
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
      "Needed a single property that proves strategy through automation without juggling multiple microsites or brittle CMS stacks.",
    strategy:
      "Mapped every page type, wrote modular copy, and designed a shared component kit in Tailwind + Framer Motion before hooking up data sources.",
    solution:
      "Built a React/Vite system deployed to Vercel with weather-aware theming, Markdown loaders, sticky navigation, and schema-backed case studies so updates stay fast.",
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
    label: "New clients post-launch",
    value: "10 in 3 months",
    description: "Client jumped from zero inbound leads on their old site to ten within the first quarter.",
  },
  {
    label: "Hands-on build hours",
    value: "90-120",
    description: "Typical mix of strategy, design, development, and QA time poured into each project.",
  },
  {
    label: "Sites & automations shipped",
    value: "5+",
    description: "Web, product, and automation engagements delivered since 2021.",
  },
  {
    label: "Most builds launch within",
    value: "4-6 weeks",
    description: "From kickoff through QA for the majority of projects.",
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
