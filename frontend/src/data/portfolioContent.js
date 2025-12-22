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
    title: "American Craftsman — Local Contractor Website",
    slug: "american-craftsman",
    metaTitle: "American Craftsman Case Study | Contractor Website Redesign",
    metaDescription:
      "How Hanna Web Studio built a responsive Framer website for American Craftsman, improving credibility, clarity of services, and local visibility.",
    client: "American Craftsman LLC",
    year: "2025",
    industry: ["Construction"],
    services: ["Design", "Development"],
    platform: ["Framer"],
    summary:
      "A modern, mobile-friendly contractor website built in Framer to elevate American Craftsman’s brand and create a trustworthy online presence. The site showcases services, previous work, and an easy way for customers to get in touch.",
    heroSummary: "Construction · Design & Development",
    liveUrl: "https://americancraftsmanllc.com",
    heroKpis: [
      { label: "Unique Website Customers", value: "5", timeframe: "60 days post-launch" },
      { label: "Bounce rate", value: "-32%", timeframe: "Site-wide" },
    ],
    outcome: "Lead submissions up 300% from the old site within 60 days",
    coverImage: "/images/casestudies/ac1.jpg",
    coverImageAlt: "American Craftsman website hero showcasing a completed kitchen remodel",
    articlePhotos: [
      {
        src: "/images/casestudies/ac2.jpg",
        alt: "Service overview layout highlighting American Craftsman capabilities",
        caption: "Modular services menu that pairs remodel descriptions with real project photography.",
      },
      {
        src: "/images/casestudies/ac3.jpg",
        alt: "Portfolio gallery carousel with screened porch and interior shots",
        caption: "Gallery-first approach that lets homeowners browse remodel examples quickly.",
      },
      {
        src: "/images/casestudies/ac4.jpg",
        alt: "Testimonial slider highlighting client feedback for American Craftsman",
        caption: "Social proof row with rotating client reviews to build trust before outreach.",
      },
    ],
    challenge:
      "American Craftsman had earned a solid reputation for quality craftsmanship in their local area, but their lack of an online presence created a major barrier for new customers discovering them. Homeowners today often research contractors online before making a call, and without a modern website, the business appeared less credible than competitors with polished digital branding. Potential clients couldn’t easily view past work, understand available services, or get a clear sense of the business’s professionalism. This gap meant that valuable leads were slipping away simply because the company didn’t have a platform that represented their true capabilities. Additionally, the business was heavily dependent on word-of-mouth referrals, which limited growth and made it difficult to predict or increase incoming inquiries. Without a centralized way to showcase services or capture leads, the owner had no control over how the business was perceived online. American Craftsman needed a digital foundation that communicated trust, expertise, and reliability — all qualities that the business already delivered in person but had no way of reflecting online.",
    strategy:
      "My strategy was to design a website that not only looked visually clean and modern but also guided visitors through a clear, intuitive experience. Using Framer, I built a fully responsive system with custom breakpoints to ensure the site looked and performed smoothly across mobile, tablet, and desktop. Because a large percentage of contractor searches happen on mobile devices, I prioritized fast loading times, readable text, and structured service sections so users could quickly understand what American Craftsman offered. I also reworked their content hierarchy, created more approachable service descriptions, and added strong calls to action that reduced friction for users wanting to reach out. Beyond design, I focused on creating long-term digital value for the business. I implemented foundational SEO including optimized headings, alt text, metadata, and clearly structured content to support organic local visibility. To help the business convert visitors into real leads, I added a contact form with email notifications and placed it strategically within the layout. I also built the site with scalability in mind, making it easy for future updates, added services, or expanded galleries. The goal was to deliver not just a website, but a digital asset that positioned American Craftsman as a trustworthy, high-quality choice for homeowners researching contractors.",
    solution:
      "The final website provides American Craftsman with a strong, modern online presence that accurately reflects the quality of their work. The design is clean and professional, with a layout that helps visitors quickly understand their services and expertise. Clear navigation, structured content sections, and a focus on visual hierarchy make the site user-friendly and approachable. The responsive build ensures that homeowners on any device — especially mobile — can easily browse the site, request information, and build confidence in the contractor before ever picking up the phone. By combining improved design, thoughtful UX decisions, and foundational SEO, the new website acts as both a marketing tool and a credibility booster. Homeowners now have a centralized place to view the company’s craftsmanship, learn about their services, and contact the team quickly. The site establishes trust, creates a more polished first impression, and elevates the brand to match the quality of their real-world work. With this digital foundation in place, American Craftsman is now positioned for steady growth, stronger lead generation, and increased visibility within their local market.",
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
    title: "Millie Aesthetics — Medspa Website Launch",
    slug: "millie-aesthetics",
    metaTitle: "Millie Aesthetics Case Study | Med Spa Website Design",
    metaDescription:
      "A calming, mobile-first WordPress site for Millie Aesthetics, with clear treatment journeys, integrated booking, and a modern med spa brand.",
    client: "Millie Aesthetics",
    year: "2025",
    industry: ["Wellness & Weight Management"],
    services: ["Design", "Development"],
    platform: ["WordPress"],
    summary:
      "A complete redesign of a med spa website using WordPress and Elementor, focused on clean branding, readability, and seamless booking integrations. The new site better reflects the spa’s high-quality services and calm aesthetic.",
    heroSummary: "Wellness & Weight Management · Design & Development",
    liveUrl: "https://millieaestheticsandwellness.com",
    heroKpis: [
      { label: "Consult requests", value: "+61%", timeframe: "Quarter over quarter" },
      { label: "Manual follow-ups", value: "-70%", timeframe: "Front desk workload" },
    ],
    outcome: "200+ Unique Website Viewers in first 60 days",
    coverImage: "/images/casestudies/millie3.jpg",
    coverImageAlt: "Millie Aesthetics website hero with welcoming brand statement",
    articlePhotos: [
      {
        src: "/images/casestudies/millie1.jpg",
        alt: "Before and after treatment gallery for Millie Aesthetics clients",
        caption: "Results carousel that anchors messaging in real client transformations.",
      },
      {
        src: "/images/casestudies/millie2.jpg",
        alt: "Millie Aesthetics founders and tone-setting photography",
        caption: "Lifestyle imagery softens the layout while reinforcing the brand’s hospitality.",
      },
      {
        src: "/images/casestudies/millie4.jpg",
        alt: "Injectables service highlight with supporting description",
        caption: "Service spotlight cards that translate medical jargon into approachable benefits.",
      },
    ],
    challenge:
      "Millie Aesthetics had built a strong presence on social media, but without a dedicated website, their digital footprint felt incomplete and limited. Potential clients who didn’t use Instagram or Facebook had no reliable way to learn about their services, view treatment details, or understand what made Millie Aesthetics unique. Important information such as pricing, descriptions, and booking links were scattered across posts and stories, making it difficult for new visitors to build trust or confidently make an appointment. Without a central, professionally designed home for their brand, the studio risked losing clients simply because they couldn’t easily access information. In addition to discoverability issues, the brand lacked a cohesive digital identity outside of its social profiles. There was no streamlined way to guide clients through the treatment journey—from learning about services, to understanding expectations, to actually booking. This resulted in missed opportunities and inconsistent user experiences. Millie Aesthetics needed a website that communicated professionalism, reflected their calming and luxurious brand, and provided a clear path for visitors to explore treatments, understand benefits, and schedule appointments seamlessly.",
    strategy:
      "To create a digital presence that matched the studio’s aesthetic and quality, I used WordPress with Elementor to design a clean, welcoming, and modern website. I began by mapping out the full client journey on paper—intake, education, treatment pages, and booking flows—to ensure each step felt intuitive and aligned with how real clients think. By refining the color palette, typography, spacing, and overall structure, I built a visual language that felt soft, neutral, and consistent with the med spa industry. Every component, from the hero sections to treatment cards, was designed to reinforce a sense of calm professionalism. Beyond visuals, I focused on usability and clarity. Services were reorganized to simplify navigation, treatment descriptions were rewritten for readability, and high-quality images were optimized for fast loading times. I seamlessly integrated third-party booking tools to reduce friction and help clients complete appointments in just a few clicks. Mobile responsiveness received special attention, as most spa customers browse and book from their phones. The end result was a user experience that felt polished, trustworthy, and tailored to the needs of clients seeking self-care and aesthetic treatments.",
    solution:
      "The final website gives Millie Aesthetics the professional online home their brand deserves. The updated design feels modern, soft, and visually cohesive, allowing clients to easily browse treatments and understand the value of each service. The improved structure and clean layout make the booking experience intuitive, reducing confusion and helping visitors move naturally through the learning and scheduling process. The website now reflects the spa’s real-world quality and attention to detail, elevating the brand’s presence and giving clients confidence in their decision. With stronger branding, clearer messaging, and seamless booking integrations, Millie Aesthetics now has a digital experience that matches the care and professionalism they deliver in person. The new site not only fills the gap left by relying solely on social media, but also positions the spa for long-term growth by making it easier for new clients to discover them and book treatments. This digital foundation gives the business a platform to expand, refine their offerings, and continue building a loyal client base.",
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
    metaTitle: "Portfolio Site Case Study | React, Vite & Tailwind Build",
    metaDescription:
      "How Michael Hanna designed and built his own React + Vite portfolio with multi-page structure, weather-based theming, and serverless contact flows.",
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
    coverImage: "/images/casestudies/hwstudio1.jpg",
    coverImageAlt: "Michael Hanna portfolio hero featuring portrait and core stats",
    articlePhotos: [
      {
        src: "/images/casestudies/hwstudio2.jpg",
        alt: "Project library cards highlighting recent client work",
        caption: "Project library layout that filters website builds and automation systems.",
      },
      {
        src: "/images/casestudies/hwstudio3.jpg",
        alt: "Blog style 'Project Notes' section with featured article callout",
        caption: "Editorial-inspired case study notes that connect story, context, and process.",
      },
      {
        src: "/images/casestudies/hwstudio4.jpg",
        alt: "Services overview describing website and automation packages",
        caption: "Service grid detailing productized offers with simple browse-and-book CTAs.",
      },
    ],
    challenge:
      "Before creating this portfolio, I didn’t have a centralized place to showcase the range of work I had done—websites, automations, branding, and case studies all lived in different places. Potential clients and employers couldn’t easily understand the depth of my abilities or see the results I’d delivered for real businesses. I needed a platform that reflected my skills, communicated my services clearly, and presented me as both a developer and a designer with a strategic approach. The challenge was building something polished and professional while still feeling personal and approachable, especially for non-technical visitors. In addition, the site needed to be more than just visually appealing—it had to feel dynamic, responsive, and technically sound. I wanted a portfolio that showcased not just my finished work but also the thinking, problem-solving, and process behind each project. I needed a place that could grow as I added new case studies, blog posts, automations, and services. Building everything from scratch meant juggling design decisions, UX choices, layout consistency, SEO structure, component architecture, and connection between pages—all while staying true to my own brand identity.",
    strategy:
      "I built the portfolio using React + Vite + Tailwind, giving me full control over performance, component structure, and responsive design. I created a clean visual identity using modern typography, subtle animations, and a neutral color palette that aligns with my professional branding. Every section—Home, Services, Portfolio, Blog, and Contact—was designed to communicate clearly and guide users naturally from one part of the site to the next. I added custom transitions, mobile-first layouts, and a grid system that adapts seamlessly across screen sizes. This let the site feel polished and intentional, no matter where someone is browsing from. I also integrated more dynamic features to differentiate the site from a basic portfolio. This included weather-based theming, reusable UI components, and a content structure that supports future blog posts and case studies. I implemented a serverless form submission system using Resend so inquiries go directly to my email, and I optimized every page with foundational SEO—metadata, headings, alt text, and clean semantics. Throughout the build, I prioritized performance, scalability, and maintainability so the site can grow alongside my business without needing a full redesign every time I add something new.",
    solution:
      "The final website feels clean, modern, and professional—reflecting both my technical background and my eye for design. Visitors can quickly understand who I am, what I offer, and the type of work I specialize in through clear service descriptions, detailed case studies, and an intuitive layout. The design highlights my skills without overwhelming users, and every section is structured to feel inviting, trustworthy, and easy to navigate. Whether someone is a business owner looking for a website or a hiring manager evaluating my development skills, the portfolio makes it easy to explore my work in depth. Beyond visuals, the portfolio now serves as a long-term foundation for my personal brand and client-facing business. The blog system allows me to publish insights and technical breakdowns, the portfolio section can grow as I complete more projects, and the contact form creates a seamless way for leads to reach me. This site not only showcases my capabilities but also acts as a functional business asset—supporting lead generation, SEO visibility, and future service expansion. It’s a platform that will continue to evolve as I grow my skill set, client base, and overall career.",
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

export const codingProjects = [
  {
    badge: "Incident Platform Card",
    title: "Incident Management Platform",
    summary:
      "Full-stack incident response hub that mirrors how SaaS teams declare, manage, and learn from production issues.",
    media: {
      type: "image",
      src: "/images/personal/Screenshot 2025-12-22 at 3.37.11\u202fPM.png",
      alt: "Incident command dashboard with live status timeline and roles.",
    },
    features: [
      "Guides responders through declaration, command escalation, resolution, and postmortem publishing.",
      "Controls lifecycle transitions with transactional rules so audit logs, timelines, and notifications stay consistent.",
      "Splits internal operator workflows from a public-facing status site to protect sensitive context.",
      "Streams live updates in real time so the full team shares a single source of truth during an incident.",
      "Background workers fan out notifications asynchronously so the core workflow never blocks.",
    ],
    techSummary: "React • Node.js APIs • PostgreSQL • Redis queues • WebSockets",
    links: [
      { label: "Live Demo", href: "https://incident-management-status-platform.vercel.app", variant: "primary" },
      { label: "GitHub Repo", href: "https://github.com/mhanna50/Incident_Management_Status_Platform", variant: "outline" },
    ],
  },
  {
    badge: "Performance Analyzer Card",
    icon: "",
    title: "Website Speed & SEO Performance Analyzer",
    summary:
      "Performance and SEO analyzer that inspects any website and generates remediation guidance within seconds.",
    media: {
      type: "image",
      src: "/images/personal/Screenshot 2025-12-22 at 3.18.38\u202fPM.png",
      alt: "Website speed and SEO analyzer UI summarizing scan scores.",
    },
    features: [
      "Combines performance metrics, SEO heuristics, accessibility checks, and optional off-page signals into a single workflow.",
      "Supports both fast triage scans and deep crawls, queuing work asynchronously to handle concurrency safely.",
      "Persists scan history so teams can compare results over time and prove improvements.",
      "Translates findings into severity scores and AI-generated remediation checklists.",
      "Produces downloadable PDF reports for client handoff or internal reviews.",
    ],
    techSummary: "Node.js services • Headless Chrome audits • Queue workers • PostgreSQL • PDF rendering",
    links: [
      { label: "Live Demo", href: "https://website-analyzer-wheat.vercel.app", variant: "primary" },
      { label: "GitHub Repo", href: "https://github.com/mhanna50/Website_Analyzer", variant: "outline" },
    ],
  },
  {
    badge: "SupplyWise Card (In Development)",
    title: "SupplyWise — Supplier Risk Analysis SaaS",
    summary:
      "Full-stack platform for supplier verification, multi-API data enrichment, and risk scoring.",
    features: [
      "Multi-API ingestion pipeline to pull supplier data from Azure Maps, GLEIF, and internal payloads.",
      "Authentication and role-based access wrapped in a dashboard-style React UI.",
      "Automated backend workflows refresh supplier records and risk metrics on a set cadence.",
      "Custom risk-scoring logic blends data signals with business rules to surface a single indicator.",
      "AI-powered summaries translate raw payloads into plain-language risk insights.",
    ],
    techSummary: "React • Django • Supabase (PostgreSQL) • REST APIs • Python • Tailwind CSS",
    links: [{ label: "GitHub Repo", href: "https://github.com/mhanna50/Supplywise_MVP", variant: "primary" }],
  },
  {
    badge: "All Repos",
    title: "Other Small Projects",
    summary: "Workflow scripts, experiments, and coding challenges that don't need their own case study but still show my interest in various technologies.",
    features: [

    ],
    techSummary: "Python • Swift • Flutter • C# • React • JavaScript",
    links: [
      {
        label: "View my GitHub",
        href: "https://github.com/mhanna50",
        variant: "primary",
      },
    ],
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
