const SERVICE_LABELS = {
  webDesign: "Web Design",
  brandingSeo: "Branding/SEO",
  aiAutomations: "AI Automations",
  unsure: "Not sure yet",
};

const WEB_FEATURE_LABELS = {
  booking: "Online booking",
  contactForm: "Contact form",
  blog: "Blog",
  ecommerce: "E-commerce",
  other: "Other",
};

const BRANDING_FOCUS_LABELS = {
  brandStrategy: "Brand strategy/copy",
  seoAudit: "SEO research + audits",
  contentPlan: "Content plan",
  messaging: "Messaging refresh",
  other: "Other",
};

const AUTOMATION_LABELS = {
  leadFollowUp: "Lead follow-up",
  scheduling: "Scheduling + reminders",
  missedCall: "Missed-call responses",
  customerMessaging: "Customer messaging",
  adminTasks: "Admin tasks",
  other: "Other",
};

const TIMELINE_LABELS = {
  asap: "ASAP",
  oneToTwoWeeks: "1–2 weeks",
  twoToFourWeeks: "2–4 weeks",
  flexible: "Flexible",
};

const BUDGET_LABELS = {
  under1k: "Under $1,000",
  oneToTwoPointFive: "$1,000–$2,500",
  twoPointFiveToFive: "$2,500–$5,000",
  overFive: "$5,000+",
};

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class ContactValidationError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = "ContactValidationError";
    this.statusCode = statusCode;
  }
}

export class ContactConfigError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = "ContactConfigError";
    this.statusCode = statusCode;
  }
}

export class ContactDeliveryError extends Error {
  constructor(message, statusCode = 502) {
    super(message);
    this.name = "ContactDeliveryError";
    this.statusCode = statusCode;
  }
}

const sanitizeSingleLine = (value) => {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim();
};

const sanitizeMultiline = (value) => {
  if (typeof value !== "string") return "";
  return value.replace(/\r/g, "").trim();
};

const sanitizeEmail = (value) => {
  if (typeof value !== "string") return "";
  const normalized = value.trim().toLowerCase();
  return EMAIL_REGEX.test(normalized) ? normalized : "";
};

const sanitizePhone = (value) => {
  if (typeof value !== "string") return "";
  return value.replace(/[^\d+().\-\s]/g, "").trim();
};

const sanitizeUrl = (value) => {
  if (typeof value !== "string") return "";
  return value.trim();
};

const sanitizeChoice = (value, allowed) => {
  const normalized = typeof value === "string" ? value.trim() : "";
  return allowed.includes(normalized) ? normalized : "";
};

const dedupeList = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }
  return [...new Set(value.map((item) => (typeof item === "string" ? item.trim() : "")))].filter(Boolean);
};

const escapeHtml = (value) => {
  if (!value) return "";
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\n/g, "<br />");
};

const formatPlainText = (value) => {
  if (!value) return "";
  return value.replace(/\r/g, "").trim();
};

export function normalizeContactPayload(rawInput = {}) {
  const data = typeof rawInput === "object" && rawInput !== null ? rawInput : {};
  const normalized = {
    fullName: sanitizeSingleLine(data.fullName),
    businessName: sanitizeSingleLine(data.businessName),
    email: sanitizeEmail(data.email),
    phone: sanitizePhone(data.phone),
    currentWebsite: sanitizeUrl(data.currentWebsite || data.website),
    services: [],
    goals: sanitizeMultiline(data.goals),
    webDesign: null,
    branding: null,
    automation: null,
    timeline: "",
    budget: "",
    anythingElse: sanitizeMultiline(data.anythingElse),
    submittedAt: new Date().toISOString(),
  };

  if (!normalized.fullName) {
    throw new ContactValidationError("Full name is required.");
  }
  if (!normalized.email) {
    throw new ContactValidationError("A valid email address is required.");
  }
  if (!normalized.goals) {
    throw new ContactValidationError("Share the goals you are hoping to achieve.");
  }

  const services = dedupeList(data.services).filter((key) => SERVICE_LABELS[key]);
  if (!services.length) {
    throw new ContactValidationError("Select at least one service type.");
  }
  normalized.services = services;

  const wantsWebDesign = services.includes("webDesign");
  if (wantsWebDesign) {
    const webDesignFields = {
      existing: sanitizeChoice(data.webDesignExisting, ["yes", "no"]),
      challenges: sanitizeMultiline(data.webDesignChallenges),
      features: dedupeList(data.webDesignFeatures).filter((key) => WEB_FEATURE_LABELS[key]),
      other: sanitizeMultiline(data.webDesignOther),
    };
    if (!webDesignFields.existing) {
      throw new ContactValidationError("Let me know if you already have a website in place.");
    }
    if (!webDesignFields.challenges) {
      throw new ContactValidationError("Describe what is not working for your website today.");
    }
    normalized.webDesign = webDesignFields;
  }

  const wantsBranding = services.includes("brandingSeo");
  if (wantsBranding) {
    const brandingFields = {
      improvements: sanitizeMultiline(data.brandingImprovements),
      focus: dedupeList(data.brandingFocus).filter((key) => BRANDING_FOCUS_LABELS[key]),
      keywords: sanitizeSingleLine(data.brandingKeywords),
      other: sanitizeMultiline(data.brandingOther),
    };
    if (!brandingFields.improvements) {
      throw new ContactValidationError("Share what needs support for branding or SEO.");
    }
    normalized.branding = brandingFields;
  }

  const wantsAutomation = services.includes("aiAutomations");
  if (wantsAutomation) {
    const automationFields = {
      bottleneck: sanitizeMultiline(data.automationPainPoints),
      focus: dedupeList(data.automationFocus).filter((key) => AUTOMATION_LABELS[key]),
      other: sanitizeMultiline(data.automationOther),
    };
    normalized.automation = automationFields;
  }

  normalized.timeline = sanitizeChoice(data.timeline, Object.keys(TIMELINE_LABELS));
  if (!normalized.timeline) {
    throw new ContactValidationError("Select a timeline so I can plan accordingly.");
  }

  normalized.budget = sanitizeChoice(data.budget, Object.keys(BUDGET_LABELS));
  if (!normalized.budget) {
    throw new ContactValidationError("Select a budget range to help me scope the project.");
  }

  return normalized;
}

function buildEmailSections(submission) {
  const serviceLabels = submission.services.map((key) => SERVICE_LABELS[key] || key);
  const timelineLabel = TIMELINE_LABELS[submission.timeline] || submission.timeline;
  const budgetLabel = BUDGET_LABELS[submission.budget] || submission.budget;
  const sections = [
    {
      title: "Basic Info",
      entries: [
        ["Full Name", submission.fullName],
        ["Business Name", submission.businessName || "—"],
        ["Email", submission.email],
        ["Phone", submission.phone || "—"],
        ["Current Website", submission.currentWebsite || "—"],
      ],
    },
    {
      title: "What They're Looking For",
      entries: [
        ["Services", serviceLabels.join(", ")],
        ["Goals", submission.goals],
      ],
    },
  ];

  if (submission.webDesign) {
    const featureLabels = submission.webDesign.features.map((key) => WEB_FEATURE_LABELS[key] || key);
    sections.push({
      title: "Web Design Questions",
      entries: [
        ["Existing Website?", submission.webDesign.existing === "yes" ? "Yes" : "No"],
        ["What isn't working?", submission.webDesign.challenges],
        ["Needed features", featureLabels.length ? featureLabels.join(", ") : "—"],
        ["Other notes", submission.webDesign.other || "—"],
      ],
    });
  }

  if (submission.branding) {
    const brandingLabels = submission.branding.focus.map((key) => BRANDING_FOCUS_LABELS[key] || key);
    sections.push({
      title: "Branding & SEO Questions",
      entries: [
        ["What needs support?", submission.branding.improvements],
        ["Focus areas", brandingLabels.length ? brandingLabels.join(", ") : "—"],
        ["Keywords or audiences", submission.branding.keywords || "—"],
        ["Other notes", submission.branding.other || "—"],
      ],
    });
  }

  if (submission.automation) {
    const automationLabels = submission.automation.focus.map((key) => AUTOMATION_LABELS[key] || key);
    sections.push({
      title: "Automation Questions",
      entries: [
        ["What takes the most time?", submission.automation.bottleneck || "—"],
        ["What to automate", automationLabels.length ? automationLabels.join(", ") : "—"],
        ["Other notes", submission.automation.other || "—"],
      ],
    });
  }

  sections.push({
    title: "Project Logistics",
    entries: [
      ["Timeline", timelineLabel],
      ["Budget", budgetLabel],
      ["Anything else?", submission.anythingElse || "—"],
      ["Submitted at", submission.submittedAt],
    ],
  });

  return sections;
}

export function formatSubmissionForEmail(submission) {
  const sections = buildEmailSections(submission);
  const html = sections
    .map(
      (section) => `
        <section style="margin-bottom:1.5rem;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <h2 style="margin:0 0 0.5rem;font-size:1.05rem;">${escapeHtml(section.title)}</h2>
          <table style="border-collapse:collapse;width:100%;font-size:0.95rem;">
            <tbody>
              ${section.entries
                .map(
                  ([label, value]) => `
                    <tr>
                      <td style="padding:6px 8px;color:#555;font-weight:600;width:32%;">${escapeHtml(label)}</td>
                      <td style="padding:6px 8px;border-bottom:1px solid rgba(0,0,0,0.05);color:#111;">${escapeHtml(
                        typeof value === "string" ? value : ""
                      )}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </section>
      `
    )
    .join("");

  const text = sections
    .map((section) => {
      const entries = section.entries
        .map(([label, value]) => `${label}: ${formatPlainText(typeof value === "string" ? value : "")}`)
        .join("\n");
      return `${section.title}\n${"-".repeat(section.title.length)}\n${entries}`;
    })
    .join("\n\n");

  return { html, text };
}

export async function sendContactEmail({ submission, toAddress, fromAddress, resendKey, subject }) {
  if (!toAddress) {
    throw new ContactConfigError("CONTACT_FORM_TO is not configured.");
  }
  if (!fromAddress) {
    throw new ContactConfigError("CONTACT_FORM_FROM is not configured.");
  }
  if (!resendKey) {
    throw new ContactConfigError("RESEND_API_KEY is not configured.");
  }

  const payload = formatSubmissionForEmail(submission);
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [toAddress],
      subject: subject || `New contact inquiry from ${submission.fullName}`,
      html: payload.html,
      text: payload.text,
      reply_to: submission.email,
    }),
  });

  let result;
  try {
    result = await response.json();
  } catch {
    result = null;
  }

  if (!response.ok) {
    const message = result?.message || "Failed to send via Resend.";
    throw new ContactDeliveryError(message, response.status);
  }

  return result;
}
