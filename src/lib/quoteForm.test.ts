import { describe, it, expect, vi, afterEach } from "vitest";
import {
  QUOTE_RECIPIENT,
  isFreeEmail,
  validateQuoteForm,
  buildQuoteSubject,
  buildQuoteBody,
  buildQuoteTemplateParams,
  sendQuoteRequest,
  type QuoteFormData,
} from "./quoteForm";

const validForm: QuoteFormData = {
  name: "Kamal Hohoud",
  company: "Acme Labs",
  email: "kamal@acmelabs.io",
  datasetType: "Custom Corpus",
  message: "We need 500 hours of transcribed Darija audio.",
};

describe("isFreeEmail", () => {
  it("rejects Gmail and Yahoo addresses (case-insensitive)", () => {
    expect(isFreeEmail("someone@gmail.com")).toBe(true);
    expect(isFreeEmail("Someone@GMAIL.COM")).toBe(true);
    expect(isFreeEmail("someone@yahoo.com")).toBe(true);
    expect(isFreeEmail("someone@yahoo.fr")).toBe(true);
  });

  it("rejects other common consumer providers", () => {
    expect(isFreeEmail("someone@hotmail.com")).toBe(true);
    expect(isFreeEmail("someone@outlook.com")).toBe(true);
    expect(isFreeEmail("someone@icloud.com")).toBe(true);
  });

  it("accepts company domains", () => {
    expect(isFreeEmail("kamal@acmelabs.io")).toBe(false);
    expect(isFreeEmail("kamal@rifdata.com")).toBe(false);
  });
});

describe("validateQuoteForm", () => {
  it("passes a fully valid form", () => {
    expect(validateQuoteForm(validForm)).toEqual({});
  });

  it("requires every field", () => {
    const errors = validateQuoteForm({
      name: "  ",
      company: "",
      email: "",
      datasetType: "",
      message: "   ",
    });
    expect(Object.keys(errors).sort()).toEqual([
      "company",
      "datasetType",
      "email",
      "message",
      "name",
    ]);
  });

  it("rejects malformed emails", () => {
    const errors = validateQuoteForm({ ...validForm, email: "not-an-email" });
    expect(errors.email).toBeDefined();
  });

  it("rejects Gmail and Yahoo work emails", () => {
    expect(validateQuoteForm({ ...validForm, email: "kamal@gmail.com" }).email).toBeDefined();
    expect(validateQuoteForm({ ...validForm, email: "kamal@yahoo.com" }).email).toBeDefined();
  });

  it("accepts a company email", () => {
    expect(validateQuoteForm({ ...validForm, email: "kamal@acme.co.ma" }).email).toBeUndefined();
  });
});

describe("sendQuoteRequest", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("rejects with a helpful error when EmailJS keys are missing", async () => {
    vi.stubEnv("VITE_EMAILJS_SERVICE_ID", "");
    vi.stubEnv("VITE_EMAILJS_TEMPLATE_ID", "");
    vi.stubEnv("VITE_EMAILJS_PUBLIC_KEY", "");
    await expect(sendQuoteRequest(validForm)).rejects.toThrow(/not configured/i);
  });
});

describe("quote email content", () => {
  it("builds the subject as 'New quote request from [Company] - [Dataset Type]'", () => {
    expect(buildQuoteSubject(validForm)).toBe("New quote request from Acme Labs - Custom Corpus");
  });

  it("includes every form field in the body", () => {
    const body = buildQuoteBody(validForm);
    expect(body).toContain("Name: Kamal Hohoud");
    expect(body).toContain("Company: Acme Labs");
    expect(body).toContain("Work Email: kamal@acmelabs.io");
    expect(body).toContain("Dataset Type: Custom Corpus");
    expect(body).toContain("We need 500 hours of transcribed Darija audio.");
  });

  it("targets info@rifdata.com and exposes template params", () => {
    expect(QUOTE_RECIPIENT).toBe("info@rifdata.com");

    const params = buildQuoteTemplateParams(validForm);
    expect(params.to_email).toBe("info@rifdata.com");
    expect(params.subject).toBe("New quote request from Acme Labs - Custom Corpus");
    expect(params.reply_to).toBe("kamal@acmelabs.io");
    expect(params.from_name).toBe("Kamal Hohoud");
    expect(params.company).toBe("Acme Labs");
    expect(params.work_email).toBe("kamal@acmelabs.io");
    expect(params.dataset_type).toBe("Custom Corpus");
    expect(params.message).toContain("Darija audio");
  });
});
