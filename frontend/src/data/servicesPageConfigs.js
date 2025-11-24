import { Palette, Workflow, Compass, PenTool, Rocket, Code2, Users } from "lucide-react";

const sharedTestimonials = [
  {
    quote:
      "Our new website looks great. Mike was fun to work with. He is creative, and his work is meticulous. I’m looking forward to future projects together.",
    author: "Jim H.",
    title: "CEO",
    company: "American Craftsman LLC",
  },
];

const sharedValueProps = [];

export const designServicesConfig = {
  canonicalPath: "/services",
  metaTitle: "Services | Web Design & Automation – Hanna Web Studio",
  metaDescription:
    "Explore web design, development, and automation services from Hanna Web Studio, helping small businesses build professional sites and streamline their operations.",
  schemaName: "Web Design & Branding Services",
  priceRange: "$$",
  heroTitle: "Design and development — all in one partner.",
  overviewHeading: "What a Website can do for you",
  valueHeading: "End-to-end delivery, research-backed design, and measurable outcomes.",
  processHeading: "One five-step playbook to plan, design, build, and launch.",
  readyTitle: "Ready to start your project?",
  readyDescription:
    "One partner for research, design, development, and SEO. Tell me what you're building and we'll map the plan together.",
  showDetailImages: false,
  showServiceOverview: false,
  pricingSection: {
    kicker: "Website Pricing",
    heading: "Transparent website packages and timelines.",
    subheading: "",
    cards: [
      {
        title: "Landing Page",
        price: "$800 – $1,500",
        pointsLabel: "What you get",
        points: [
          "Professionally designed 1–2 section hero layout.",
          "Clear call-to-action (booking, contact, or inquiry form).",
          "Fully responsive design (mobile, tablet, desktop).",
          "Modern, conversion-driven layout tailored to your brand.",
          "Copywriting assistance for headlines and messaging.",
          "Basic on-page SEO (titles, meta descriptions, alt text).",
          "Integrated contact form + email notifications.",
          "Fast, lightweight build optimized for performance.",
          "Launch-ready within days, not weeks.",
        ],
      },
      {
        title: "Full Website Package",
        price: "$1,500 – $4,000",
        pointsLabel: "What you get",
        points: [
          "Includes everything in the Landing Page Sprint, plus:",
          "Up to 5–7 custom-designed pages (Home, About, Services, Portfolio, FAQ, Contact, etc.).",
          "Expanded brand identity section (fonts, colors, mood, visual consistency).",
          "Service or product breakdown pages with structured layouts.",
          "Blog setup and template design (optional).",
          "SEO-ready structure with internal linking and clean hierarchy.",
          "Integration with scheduling tools, CRMs, or intake forms.",
          "Basic animations and enhanced UI polish.",
          "Custom image sourcing + light content writing support.",
          "Built for scalability as your business grows.",
        ],
      },
      {
        title: "Custom Website / Advanced Build",
        price: "Custom",
        pointsLabel: "What you get",
        points: [
          "Includes everything in the Full Website Package, plus:",
          "Completely tailored design and layout from scratch.",
          "Unlimited pages and unique components.",
          "Custom-coded sections, animations, and UI features.",
          "API integrations (CRM, booking systems, automations, AI tools).",
          "E-commerce setup (if needed).",
          "Multi-step forms, calculators, or custom workflows.",
          "Full brand identity package available (logo, palette, typography system).",
          "Flexible pricing based on your goals and required functionality.",
          "Perfect for businesses needing more than template-based builds.",
        ],
      },
    ],
  },
  services: [
    {
      id: "design",
      title: "Web Design, Branding & SEO",
      icon: Palette,
      summary:
        "A thoughtful website works while you sleep—shaping first impressions, guiding people to the right offer, and proving you’re legit before anyone hops on a call. Every build blends story, design, and structure so visitors know what you do, why it matters, and how to take the next step.",
      deliverables: [
        "Brand + UI systems",
        "Responsive layouts",
        "Accessibility + Discoverability",
        "Messaging that clarifies who you help and why now.",
        "Proof, case studies, and funnels that build trust faster.",
        "Technical SEO + performance so people—and Google—see you as credible.",
      ],
      deliverablesColumns: 2,
      detailImage: "/images/casestudies/ac2.jpg",
      detailImageAlt: "American Craftsman service menu layout from the case study",
      detail: {
        problem:
          "An outdated or DIY site, inconsistent branding, or zero Google visibility chips away at trust so leads leave before reaching out.",
        solution:
          "I create a modern, custom site with clear messaging, cohesive branding, and SEO basics so people can find you and know exactly how to contact you.",
        benefit:
          "You look professional, attract better-fit clients, build trust quickly, and turn more visitors into inquiries or bookings.",
        useCases: [
          "Med spa upgrades a basic template into a polished site with services, proof, and online booking—resulting in steady inquiries.",
          "Local contractor refreshes branding and adds SEO-friendly service pages so nearby homeowners call without needing referrals.",
        ],
        ctaLink: "/portfolio/millie-aesthetics",
      },
    },
  ],
  valueProps: sharedValueProps,
  comparisonPoints: [
    {
      attribute: "Communication",
      me: "Weekly email recaps and a shared task board so you always know what's done and what's next.",
      others: "Long silences and vague updates until you chase someone down.",
    },
    {
      attribute: "Scope",
      me: "Strategy, content, and development stay under one roof so nothing falls between freelancers.",
      others: "Different vendors for each task, which means slower timelines and extra costs.",
    },
    {
      attribute: "Handoff",
      me: "Every site ships with content, logins, and documentation stored in your accounts.",
      others: "You get screenshots and a goodbye email with no clear way to maintain the work.",
    },
    {
      attribute: "Support",
      me: "Fast answers and small fixes even after launch (till an agreed upon date) so momentum continues.",
      others: "Support tickets and delays for even tiny changes.",
    },
  ],
  processSteps: [
    {
      title: "Kickoff roadmap",
      detail: "We spend a focused session clarifying offers, ideal clients, and success metrics for the site.",
      timeframe: "Days 1-2",
      icon: Compass,
    },
    {
      title: "Blueprint",
      detail: "I create the sitemap, content plan, and SEO basics so you can review the structure before any designing happens.",
      timeframe: "Week 1",
      icon: PenTool,
    },
    {
      title: "Co-create visuals",
      detail: "You review layouts, copy, and micro-interactions throughout the project length plus optional live reviews.",
      timeframe: "Week 1-2",
      icon: Users,
    },
    {
      title: "Build & QA",
      detail: "I develop the site, components, and accessibility updates while you track progress in our agreed upon update schedule.",
      timeframe: "Weeks 2-3",
      icon: Code2,
    },
    {
      title: "Launch & support",
      detail: "Testing, training, and light support help you run the site confidently after go-live.",
      timeframe: "Week 4+",
      icon: Rocket,
    },
  ],
  faqs: [
    {
      question: "How do web projects kick off?",
      answer:
      "We start with a quick planning call to clarify your goals, target audience, and the pages you need. From there, I create a simple roadmap and sitemap so you know exactly how the project will unfold. Nothing starts until you're fully comfortable with the plan.",
    },
    {
    question: "How long does everything take?",
    answer:
    "Most full website projects take about 4–6 weeks depending on page count, features, and integrations. Smaller landing pages or redesigns can launch much faster. You’ll get weekly updates so you always know where things stand.",
    },
    {
    question: "Do I need to be technical?",
    answer:
    "Not at all. I explain everything in plain language and guide you through each decision so you never feel lost. My job is to handle the technical work while keeping the process simple and stress-free.",
    },
    {
    question: "How many revision rounds are included?",
    answer:
    "Each project milestone includes a round of revisions plus a live review session if you'd like extra guidance. We refine the copy, design, and layout until it aligns perfectly with the agreed-upon scope. The goal is to make sure you’re confident in every step.",
    },
    {
    question: "Who owns the files and logins?",
    answer:
    "You own everything. All website files, brand assets, and platform logins are transferred to your accounts, along with notes on how to make updates in the future. I want you to feel fully in control of your online presence.",
    },
  {
  question: "Can you work with my existing team?",
  answer:
    "Absolutely. I’m comfortable collaborating with developers, marketers, or brand teams and can join your preferred communication tools. The goal is to fit seamlessly into your workflow so it feels like one unified team.",
  },

  ],
  testimonials: sharedTestimonials,
  flagshipServiceIds: ["design"],
};

export const automationServicesConfig = {
  canonicalPath: "/services/automations",
  metaTitle: "Business Automations & AI Systems – Hanna Web Studio",
  metaDescription:
    "One-time automations and AI systems like lead routing, AI receptionists, and follow-up workflows that reduce manual work for service businesses.",
  schemaName: "Automation & AI Workflow Services",
  priceRange: "$$–$$$",
  heroTitle: "Automation systems that keep leads, ops, and follow-ups handled.",
  overviewHeading: "Automation Services",
  valueHeading: "End-to-end delivery, automation expertise, and measurable outcomes.",
  processHeading: "One five-step playbook to document, build, and optimize your automations.",
  readyTitle: "Ready to automate your ops?",
  readyDescription:
    "Always-on flows for leads, follow-ups, operations, and reporting. Tell me what needs to run without you and we'll map the build together.",
  flagshipCardVariant: "compact",
  supportingCardsFullWidth: true,
  showDeliverablesInOverview: false,
  showServiceOverview: false,
  pricingSection: {
    kicker: "Automation Pricing",
    heading: "Pricing and service list",
    subheading: "",
    layout: "automationSplit",
    cta: {
      label: "View My Automations",
      href: "/portfolio#project-library",
    },
    cards: [
      {
        heading: "One-Time Automation Builds",
        title: "Build once. No recurring payments.",
        points: [
          "Lead routing automation (website → email/SMS/CRM)",
          "Automated appointment reminders & confirmations",
          "Form → CRM syncing",
          "Quote generation / automated PDF sending",
          "Intake form → summary → email workflows",
          "Multi-step onboarding workflows",
          "Automated reporting dashboards",
          "Simple AI-assisted workflows (no monthly hosting needed)",
        ],
        note: "Perfect for businesses that want a workflow set up once and running without ongoing costs.",
        pricingTiers: [
          "Starting at $299",
          "Most common builds: $399–$699",
          "Complex automations / AI workflows: $1,200+",
        ],
      },
      {
        heading: "Monthly Retainer Automation Services",
        title: "For automations that require hosting, AI models, or ongoing monitoring.",
        points: [
          "AI receptionist (answers calls, books appointments)",
          "AI lead follow-up system (texts/emails leads until reply)",
          "AI customer support / FAQ chatbots",
          "AI insight reporting (weekly summaries & analytics)",
          "AI web assistant or scheduling bot",
          "Hosted automation pipelines (cron jobs, scripts, integrations)",
          "Automation maintenance & monitoring (API updates, error fixes)",
        ],
        note: "Designed for businesses needing continuous support, hosting, and improvements to their AI systems.",
        pricingTiers: [
          "Starting at $199/mo + Setup Fee",
          "Most common builds: $299–$499/mo + Setup Fee",
          "Complex automations: $499+/mo + Setup Fee",
        ],
      },
    ],
  },
  services: [
    {
      id: "automation-builds",
      title: "One-Time Builds",
      icon: Workflow,
      summary:
        "One-off automation projects that map a process once, then run it automatically—freeing up your time and making sure every lead or request gets handled.",
      deliverablesLabel: "Popular one-time automations",
      deliverables: [
        "Lead routing with SMS/email alerts so inquiries never sit in an inbox.",
        "Automated follow-up sequences to warm leads for weeks without manual chasing.",
        "Appointment reminders and confirmations to slash no-shows.",
        "Cross-tool data syncing between website forms, CRMs, and fulfillment tools.",
        "AI receptionists or qualification flows that reply 24/7 with the right tone.",
      ],
      detail: {
        problem:
          "Manual follow-ups and data updates eat up hours each week, so opportunities slip through the cracks.",
        solution:
          "We blueprint the workflow, build it in Zapier/Make (plus AI where helpful), stress-test every branch, and hand it off with documentation.",
        benefit:
          "You reclaim hours, every lead hears back instantly, and the busywork disappears without adding headcount.",
        useCases: [
          "Contractor automatically responds to every inquiry, books estimates without phone tag, and keeps clients updated through each step.",
          "Med spa greets website leads instantly, confirms appointments, and nudges no-shows without anyone on the team chasing them.",
        ],
        ctaLink: "/portfolio/personal-portfolio",
      },
    },
    {
      id: "automation-retainer",
      title: "Monthly Builds & Maintenance",
      icon: Workflow,
      summary:
        "Retainer-style automation support for teams who want a partner watching their workflows, making tweaks, and rolling out new ideas every month.",
      deliverablesLabel: "Monthly automation support",
      deliverables: [
        "Monitoring and quick fixes when tools, APIs, or offers change.",
        "Small build sprints for new steps, forms, or handoffs.",
        "Hosting/tuning AI receptionists, chatbots, and reporting agents.",
        "Documentation updates so your team always knows what’s live.",
        "Monthly improvement recaps with ideas for the next layer of automation.",
      ],
      detail: {
        problem:
          "Even the best automations break without upkeep—apps change, offers shift, and someone has to keep everything tuned.",
        solution:
          "On retainer, I monitor what’s live, apply fixes, and batch new improvements so your automations keep pace with the rest of the business.",
        benefit:
          "Systems stay reliable, the team gets one point of contact for changes, and you continue stacking more leverage over time.",
        useCases: [
          "Retainer keeps marketing handoffs synced between HubSpot, Slack, and project management even as campaigns change.",
          "AI receptionist hosting ensures chat and SMS agents stay accurate and on-brand with monthly reviews.",
        ],
        ctaLink: "/portfolio/personal-portfolio",
      },
    },
  ],
  valueProps: sharedValueProps,
  flagshipServiceIds: ["automation-builds", "automation-retainer"],
  comparisonPoints: [
    {
      attribute: "Communication",
      me: "Weekly email recaps and a shared task board so you always know what's done and what's next.",
      others: "Long silences and vague updates until you chase someone down.",
    },
    {
      attribute: "Scope",
      me: "Automations, AI touchpoints, and integrations stay scoped together so nothing falls between teams.",
      others: "Different vendors for each task, which means slower timelines and extra costs.",
    },
    {
      attribute: "Handoff",
      me: "Every workflow ships with content, logins, and documentation stored in your accounts.",
      others: "You get screenshots and a goodbye email with no clear way to maintain the work.",
    },
    {
      attribute: "Support",
      me: "Fast answers and small fixes even after launch (till an agreed upon date) so momentum continues.",
      others: "Support tickets and delays for even tiny changes.",
    },
  ],
  processSteps: [
    {
      title: "Kickoff roadmap",
      detail: "We document your tools, lead sources, and manual steps, then prioritize what needs to run automatically.",
      timeframe: "Days 1-2",
      icon: Compass,
    },
    {
      title: "Blueprint",
      detail: "I outline triggers, data paths, and messaging so you can see each workflow before it goes into production.",
      timeframe: "Week 1",
      icon: PenTool,
    },
    {
      title: "Co-create flows",
      detail: "You review email walk-throughs or sandbox demos with comments and optional live reviews.",
      timeframe: "Week 1-2",
      icon: Users,
    },
    {
      title: "Build & automate",
      detail: "I connect the apps, configure AI assistants, run QA, and document every trigger in one shared checklist.",
      timeframe: "Weeks 2-3",
      icon: Code2,
    },
    {
      title: "Launch & optimize",
      detail: "We monitor the first runs, adjust edge cases, and hand off SOPs so the team can own it going forward.",
      timeframe: "Week 4+",
      icon: Rocket,
    },
  ],
  faqs: [
    {
  question: "How do automation projects kick off?",
  answer:
    "We start with a short planning call and intake form so I can understand your tools, manual tasks, and ideal outcomes. From there, I map out your workflow and create a simple, prioritized roadmap. You’ll know exactly which automations we’ll tackle first and why.",
    },
    {
      question: "How long before automations go live?",
      answer:
      "Most automation projects go live in 2–4 weeks, depending on complexity and the systems involved. Simple Zapier or Make workflows can launch much faster, while AI copilots or multi-step data processes need a bit more time. You’ll get clear updates throughout the build.",
    },
    {
      question: "Do I need to touch any code?",
      answer:
        "Nope. Everything is built with low-code tools, API connections, and AI logic so you don’t need engineering experience. I document each workflow so you can make simple edits later or expand it as your business grows.",
    },
    {
      question: "What if my tools are messy or outdated?",
      answer:
        "No problem. I’ll review your current setup, clean up any confusing steps, and design automations that work smoothly with what you already use. If upgrades are needed later, I’ll outline options without disrupting your day-to-day operations.",
    },
    {
      question: "Who owns the accounts and workflows?",
      answer:
        "You own everything—your accounts, your automations, and your AI prompts. All workflows are built inside your tools with shared folders and simple SOPs so you always stay in control.",
    },
{
  question: "Can you collaborate with my ops or CS team?",
  answer:
    "Absolutely. I’m happy to join your team’s communication channels, sync with ops or support teams, and adapt to whatever tools you’re already using. The goal is for every automation to feel fully integrated into your existing workflow.",
},

  ],
  testimonials: sharedTestimonials,
};

export const webDesignSpecialtyConfig = {
  ...designServicesConfig,
  canonicalPath: "/services/web-design",
  metaTitle: "Custom Websites & Landing Pages – Hanna Web Studio",
  metaDescription:
    "Design and development of responsive landing pages and full websites that match your brand, improve credibility, and convert more visitors into clients.",
  schemaName: "Custom Web Design & Landing Pages",
  heroTitle: "Custom websites that increase trust and conversions.",
  overviewHeading: "Websites built for service businesses needing clarity and credibility.",
  valueHeading: "Messaging, structure, and UI that make it easy to buy from you.",
  readyTitle: "Launch a site that represents your business.",
  readyDescription:
    "Share what you sell, who you help, and the outcome you promise—I'll map the wireframes, copy, and build so you can launch confidently.",
};
