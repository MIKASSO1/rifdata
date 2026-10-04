import emailjs from "@emailjs/browser";

/** Inbox that receives every quote request submitted from the website. */
export const QUOTE_RECIPIENT = "info@rifdata.com";

export interface QuoteFormData {
  name: string;
  company: string;
  email: string;
  datasetType: string;
  message: string;
}

export type QuoteFormErrors = Partial<Record<keyof QuoteFormData, string>>;

/**
 * Consumer email providers. Quote requests must come from a company domain —
 * Gmail and Yahoo addresses (plus the other big free providers) are rejected.
 */
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.fr",
  "yahoo.co.uk",
  "yahoo.de",
  "yahoo.es",
  "yahoo.ca",
  "ymail.com",
  "rocketmail.com",
  "hotmail.com",
  "hotmail.fr",
  "hotmail.co.uk",
  "outlook.com",
  "outlook.fr",
  "live.com",
  "live.fr",
  "msn.com",
  "aol.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "proton.me",
  "protonmail.com",
  "pm.me",
  "gmx.com",
  "gmx.de",
  "yandex.com",
  "yandex.ru",
  "mail.ru",
  "inbox.ru",
  "zoho.com",
  "tutanota.com",
  "mail.com",
  "orange.fr",
  "free.fr",
  "laposte.net",
  "sfr.fr",
  "wanadoo.fr",
]);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isFreeEmail = (email: string): boolean => {
  const domain = email.trim().toLowerCase().split("@")[1] ?? "";
  return FREE_EMAIL_DOMAINS.has(domain);
};

/** Returns an object of field errors — empty object means the form is valid. */
export const validateQuoteForm = (data: QuoteFormData): QuoteFormErrors => {
  const errors: QuoteFormErrors = {};
  const email = data.email.trim();

  if (!data.name.trim()) {
    errors.name = "Please enter your name.";
  }
  if (!data.company.trim()) {
    errors.company = "Please enter your company name.";
  }
  if (!email) {
    errors.email = "Please enter your work email.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address.";
  } else if (isFreeEmail(email)) {
    errors.email =
      "Please use your company email — Gmail, Yahoo and other free providers are not accepted.";
  }
  if (!data.datasetType.trim()) {
    errors.datasetType = "Please select a dataset type.";
  }
  if (!data.message.trim()) {
    errors.message = "Please tell us about your project.";
  }

  return errors;
};

/** Email subject: "New quote request from [Company] - [Dataset Type]" */
export const buildQuoteSubject = (data: QuoteFormData): string =>
  `New quote request from ${data.company.trim()} - ${data.datasetType}`;

/** Human-readable plain-text body with every form field, used as {{email_body}}. */
export const buildQuoteBody = (data: QuoteFormData): string =>
  [
    "New quote request — RifData website",
    "",
    `Name: ${data.name.trim()}`,
    `Company: ${data.company.trim()}`,
    `Work Email: ${data.email.trim()}`,
    `Dataset Type: ${data.datasetType}`,
    "",
    "Message:",
    data.message.trim(),
  ].join("\n");

/** Params exposed to the EmailJS template. */
export const buildQuoteTemplateParams = (
  data: QuoteFormData
): Record<string, string> => ({
  to_email: QUOTE_RECIPIENT,
  subject: buildQuoteSubject(data),
  email_body: buildQuoteBody(data),
  from_name: data.name.trim(),
  company: data.company.trim(),
  work_email: data.email.trim(),
  reply_to: data.email.trim(),
  dataset_type: data.datasetType,
  message: data.message.trim(),
});

/**
 * Reads EmailJS credentials at call time (rather than module load) so tests
 * can stub the environment per test.
 */
const readEmailJsConfig = () => ({
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "",
});

export const isEmailConfigured = (): boolean => {
  const { serviceId, templateId, publicKey } = readEmailJsConfig();
  return Boolean(serviceId && templateId && publicKey);
};

/**
 * Sends the quote request to info@rifdata.com through EmailJS.
 * Rejects when EmailJS credentials are missing or the request fails.
 */
export const sendQuoteRequest = (data: QuoteFormData): Promise<unknown> => {
  const { serviceId, templateId, publicKey } = readEmailJsConfig();
  if (!serviceId || !templateId || !publicKey) {
    return Promise.reject(
      new Error(
        "EmailJS is not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY in your .env file, then restart the dev server or rebuild."
      )
    );
  }

  return emailjs.send(serviceId, templateId, buildQuoteTemplateParams(data), {
    publicKey,
    blockHeadless: true,
    limitRate: {
      id: "quote-form",
      // Allow at most one submission per minute per visitor.
      throttle: 60_000,
    },
  });
};
