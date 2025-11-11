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
    related: ["millie-aesthetics", "ops-automation-suite"],
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
    related: ["american-craftsman", "ops-automation-suite"],
  },
  {
    title: "Northwind Ops — Automation Command Center",
    slug: "ops-automation-suite",
    client: "Northwind Ops",
    year: "2024",
    industry: ["Professional Services"],
    services: ["Development", "Automation"],
    platform: ["React"],
    summary:
      "Built a React dashboard that surfaces live project health, ties in billing data, and triggers AI-assisted runbooks when blockers appear.",
    heroSummary: "Professional Services · Development & Automation",
    heroKpis: [
      { label: "Manual updates", value: "-75%", timeframe: "Status reporting" },
      { label: "Issue resolution", value: "-2.4 days", timeframe: "Average turnaround" },
    ],
    outcome: "-75% manual reporting with AI-assisted automations",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&auto=format&fit=crop&q=80",
    coverImageAlt: "Automation dashboard displayed across multiple devices",
    challenge:
      "PMs were juggling spreadsheets for financials, time tracking, and blockers. Leadership needed a single source of truth with automated nudges.",
    strategy:
      "Modeled their delivery workflow, defined event triggers, and built a modular React/Vite interface that streams data from internal APIs.",
    solution:
      "Launched a dashboard that visualizes utilization, triggers GPT-powered summaries, and syncs decisions back into Notion and Slack.",
    gallery: {
      wireframes: [
        {
          src: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=1200&auto=format&fit=crop&q=80",
          alt: "Whiteboard wireframes",
          caption: "Systems diagram aligning data sources and triggers.",
        },
      ],
      ui: [
        {
          src: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1200&auto=format&fit=crop&q=80",
          alt: "Dark dashboard UI",
          caption: "Dark UI with high-contrast data visualizations.",
        },
      ],
      build: sharedGalleryPlaceholder,
      automations: [
        {
          src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&auto=format&fit=crop&q=80",
          alt: "API integration diagram",
          caption: "API webhooks delivering updates to Slack, Notion, and email.",
        },
      ],
    },
    kpis: [
      {
        label: "Manual status work",
        value: "-75%",
        timeframe: "Per project",
        source: "PMO survey",
        description: "Automated digests replaced weekly spreadsheet exports.",
      },
      {
        label: "Resolution time",
        value: "-2.4 days",
        timeframe: "Quarterly avg",
        source: "Jira",
        description: "Runbooks triggered MVP fixes before escalations.",
      },
      {
        label: "Forecast accuracy",
        value: "+19%",
        timeframe: "Rolling 3 mo",
        source: "Finance",
        description: "Live billing widgets aligned delivery and accounting.",
      },
    ],
    stack: ["React", "Vite", "Supabase", "OpenAI API"],
    automations: ["Zapier", "Notion API", "Slack", "Make.com"],
    testimonial: null,
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
    name: "Northwind Ops",
    logo: "https://dummyimage.com/160x60/1c1c1c/ffffff&text=Northwind",
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
