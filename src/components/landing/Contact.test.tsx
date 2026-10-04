import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import emailjs from "@emailjs/browser";
import { Contact } from "./Contact";

vi.mock("@emailjs/browser", () => ({
  default: { send: vi.fn() },
}));

const sendMock = vi.mocked(emailjs.send);

const fillForm = () => {
  fireEvent.change(screen.getByLabelText(/^name \*/i), {
    target: { value: "Kamal Hohoud" },
  });
  fireEvent.change(screen.getByLabelText(/company \*/i), {
    target: { value: "Acme Labs" },
  });
  fireEvent.change(screen.getByLabelText(/work email \*/i), {
    target: { value: "kamal@acmelabs.io" },
  });
  fireEvent.change(screen.getByLabelText(/message \*/i), {
    target: { value: "We need Darija speech data." },
  });
};

const submit = () =>
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

describe("Contact quote form", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_EMAILJS_SERVICE_ID", "service_test");
    vi.stubEnv("VITE_EMAILJS_TEMPLATE_ID", "template_test");
    vi.stubEnv("VITE_EMAILJS_PUBLIC_KEY", "key_test");
    sendMock.mockReset();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("sends via EmailJS to info@rifdata.com with the required subject and clears the form", async () => {
    sendMock.mockResolvedValue({ status: 200, text: "OK" } as never);
    render(<Contact />);

    fillForm();
    submit();

    await waitFor(() =>
      expect(
        screen.getByText(/thank you! your request has been sent successfully/i)
      ).toBeInTheDocument()
    );

    expect(sendMock).toHaveBeenCalledTimes(1);
    const [serviceId, templateId, params] = sendMock.mock.calls[0];
    expect(serviceId).toBe("service_test");
    expect(templateId).toBe("template_test");
    expect(params?.to_email).toBe("info@rifdata.com");
    expect(params?.subject).toBe("New quote request from Acme Labs - Custom Corpus");
    expect(params?.reply_to).toBe("kamal@acmelabs.io");

    // Form cleared after success.
    expect(screen.getByLabelText(/^name \*/i)).toHaveValue("");
    expect(screen.getByLabelText(/work email \*/i)).toHaveValue("");
    expect(screen.getByLabelText(/message \*/i)).toHaveValue("");
  });

  it("shows an English error message when EmailJS fails, without claiming success", async () => {
    sendMock.mockRejectedValue(new Error("network down") as never);
    render(<Contact />);

    fillForm();
    submit();

    await waitFor(() => expect(sendMock).toHaveBeenCalledTimes(1));

    // Red error notice — not the green success message.
    expect(
      await screen.findByText(/something went wrong\. please try again or contact us directly at info@rifdata\.com/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/thank you! your request has been sent successfully/i)
    ).not.toBeInTheDocument();

    // Form data is kept so the visitor can retry.
    expect(screen.getByLabelText(/work email \*/i)).toHaveValue("kamal@acmelabs.io");
  });

  it("rejects Gmail addresses before anything is sent", async () => {
    sendMock.mockResolvedValue({ status: 200, text: "OK" } as never);
    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/^name \*/i), {
      target: { value: "Kamal Hohoud" },
    });
    fireEvent.change(screen.getByLabelText(/company \*/i), {
      target: { value: "Acme Labs" },
    });
    fireEvent.change(screen.getByLabelText(/work email \*/i), {
      target: { value: "kamal@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/message \*/i), {
      target: { value: "We need Darija speech data." },
    });
    submit();

    expect(
      await screen.findByText(/Gmail, Yahoo and other free providers are not accepted/i)
    ).toBeInTheDocument();
    expect(sendMock).not.toHaveBeenCalled();
    expect(
      screen.queryByText(/thank you! your request has been sent successfully/i)
    ).not.toBeInTheDocument();
  });
});
