import {
  normalizeContactPayload,
  sendContactEmail,
  ContactValidationError,
  ContactConfigError,
  ContactDeliveryError,
} from "./contactService.js";

const DEFAULT_CONTACT_TO = "contact@hannawebstudio.com";

async function readRequestBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  const buffer = Buffer.concat(chunks);
  const raw = buffer.toString("utf8").trim();
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch {
    throw new ContactValidationError("Invalid JSON payload.");
  }
}

export default async function handler(req, res) {
  const allowOrigin = process.env.CONTACT_FORM_ALLOW_ORIGIN || "*";
  if (allowOrigin) {
    res.setHeader("Access-Control-Allow-Origin", allowOrigin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const payload = await readRequestBody(req);
    const submission = normalizeContactPayload(payload);
    const toAddress =
      process.env.CONTACT_FORM_TO ||
      process.env.CONTACT_FORM_EMAIL ||
      DEFAULT_CONTACT_TO;

    await sendContactEmail({
      submission,
      toAddress,
      fromAddress: process.env.CONTACT_FORM_FROM,
      resendKey: process.env.RESEND_API_KEY,
      subject: `New contact inquiry: ${submission.fullName}`,
    });

    res.status(200).json({
      message: "Thanks! I’ll get back to you within 48 hours.",
    });
  } catch (error) {
    if (error instanceof ContactValidationError) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }
    if (error instanceof ContactConfigError) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }
    if (error instanceof ContactDeliveryError) {
      res.status(error.statusCode).json({
        error: "Unable to send your message right now. Please try again soon.",
      });
      return;
    }
    console.error("Contact API error:", error);
    res.status(500).json({
      error: "Unexpected error while sending your message. Please retry.",
    });
  }
}
