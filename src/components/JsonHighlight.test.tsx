import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { JsonHighlight, MUTED_EDITOR_PALETTE, VSCODE_DARK_PLUS } from "./JsonHighlight";

const sample = `{
  "sample_id": "RIF_HOC_CENTRAL_000031",
  "transcription": {
    "translation_ar": "هل سننزل إلى الميناء أم سنذهب إلى الوادي"
  },
  "morphology": {
    "tokens": ["Ma","Anahwa"]
  },
  "semantic_context": {
    "geographical_expression": true,
    "cultural_context": null,
    "confidence": -0.98
  }
}`;

/** Returns the inline color of the <span> whose text is exactly `text`. */
const colorOf = (container: HTMLElement, text: string) =>
  Array.from(container.querySelectorAll("span")).find(
    (span) => span.textContent === text
  )?.style.color;

describe("JsonHighlight", () => {
  it("keeps every character of the JSON document", () => {
    const { container } = render(<JsonHighlight code={sample} />);
    expect(container.textContent).toBe(sample);
  });

  it("colors tokens with the VS Code Dark+ palette by default", () => {
    const { container } = render(<JsonHighlight code={sample} />);

    // Keys and string values.
    expect(colorOf(container, '"sample_id"')).toBe("rgb(156, 220, 254)");
    expect(colorOf(container, '"tokens"')).toBe("rgb(156, 220, 254)");
    expect(colorOf(container, '"RIF_HOC_CENTRAL_000031"')).toBe("rgb(206, 145, 120)");
    expect(colorOf(container, '"Ma"')).toBe("rgb(206, 145, 120)");
    expect(colorOf(container, '"هل سننزل إلى الميناء أم سنذهب إلى الوادي"')).toBe("rgb(206, 145, 120)");

    // Keywords and numbers.
    expect(colorOf(container, "true")).toBe("rgb(86, 156, 214)");
    expect(colorOf(container, "null")).toBe("rgb(86, 156, 214)");
    expect(colorOf(container, "-0.98")).toBe("rgb(181, 206, 168)");
  });

  it("lets structural characters inherit the surrounding color unless the palette defines one", () => {
    const { container } = render(<JsonHighlight code={sample} />);
    expect(colorOf(container, "{")).toBeUndefined();
    expect(colorOf(container, ":")).toBeUndefined();

    const { container: withPunctuation } = render(
      <JsonHighlight code={sample} palette={{ ...VSCODE_DARK_PLUS, punctuation: "#ff0000" }} />
    );
    expect(colorOf(withPunctuation, "{")).toBe("rgb(255, 0, 0)");
    expect(colorOf(withPunctuation, ":")).toBe("rgb(255, 0, 0)");
  });

  it("accepts a custom palette (the /quality terminal colors)", () => {
    const { container } = render(<JsonHighlight code={sample} palette={MUTED_EDITOR_PALETTE} />);
    expect(colorOf(container, '"sample_id"')).toBe("rgb(154, 217, 194)");
    expect(colorOf(container, '"Ma"')).toBe("rgb(243, 201, 139)");
  });
});
