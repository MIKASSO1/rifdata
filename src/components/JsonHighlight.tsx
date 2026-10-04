import { Fragment, useMemo } from "react";

/**
 * Token colors used to render a JSON document the way an editor theme does.
 * Every value is a CSS color (hex, rgb, hsl...) applied through `style`.
 */
export type JsonHighlightPalette = {
  /** Object keys — `"sample_id":` */
  key: string;
  /** String values — `"Tarifit"` */
  string: string;
  /** Keywords — `true` / `false` / `null` */
  literal: string;
  /** Numeric literals — `42`, `-1.5`, `1e6` */
  number: string;
  /** Structural characters `{ } [ ] , :` — inherits the surrounding color when omitted. */
  punctuation?: string;
};

/**
 * VS Code default dark theme ("Dark+") token colors.
 * @see https://github.com/microsoft/vscode/blob/main/extensions/theme-defaults/themes/dark_plus.json
 */
export const VSCODE_DARK_PLUS: JsonHighlightPalette = {
  key: "#9CDCFE",
  string: "#CE9178",
  literal: "#569CD6",
  number: "#B5CEA8",
};

/**
 * Soft palette that the /quality terminal was already using.
 * Kept so that page can reuse the shared tokenizer without changing its look.
 */
export const MUTED_EDITOR_PALETTE: JsonHighlightPalette = {
  key: "#9ad9c2",
  string: "#f3c98b",
  literal: "#c4a7ff",
  number: "#7fb3ff",
};

export type JsonTokenType = "key" | "string" | "literal" | "number" | "punctuation" | "plain";

export type JsonToken = {
  text: string;
  type: JsonTokenType;
};

/**
 * The whole alternation sits inside a single capturing group so that
 * `String.split` keeps the matched literals (strings, numbers, keywords).
 */
const TOKEN_PATTERN = /("(?:\\.|[^"\\])*"|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|\b(?:true|false|null)\b)/g;
/** Single capturing group again, so `split` returns the structural characters as chunks. */
const PUNCTUATION_PATTERN = /([{}\[\],:])/;
const KEY_SUFFIX_PATTERN = /^\s*:/;

const classifyLiteral = (token: string): JsonTokenType => {
  if (token.startsWith('"')) return "string";
  if (/^(?:true|false|null)$/.test(token)) return "literal";
  return "number";
};

/**
 * Splits a JSON document into color-able tokens while preserving every single
 * character (the concatenation of all token texts equals the input).
 */
export const tokenizeJson = (code: string): JsonToken[] => {
  const tokens: JsonToken[] = [];
  const parts = code.split(TOKEN_PATTERN);

  parts.forEach((part, index) => {
    // Odd indexes hold the captured JSON literals.
    if (index % 2 === 1) {
      // A string immediately followed by `:` is an object key.
      const isKey = KEY_SUFFIX_PATTERN.test(parts[index + 1] ?? "");
      tokens.push({ text: part, type: isKey ? "key" : classifyLiteral(part) });
      return;
    }

    if (!part) return;

    // Even indexes are the gaps between literals: whitespace, braces, commas, colons...
    part.split(PUNCTUATION_PATTERN).forEach((chunk, chunkIndex) => {
      if (!chunk) return;
      tokens.push({ text: chunk, type: chunkIndex % 2 === 1 ? "punctuation" : "plain" });
    });
  });

  return tokens;
};

export type JsonHighlightProps = {
  /** JSON (or JSON-like) document to render. */
  code: string;
  /** Token colors — defaults to VS Code's Dark+ theme. */
  palette?: JsonHighlightPalette;
  /** Extra classes forwarded to the wrapping `code` element. */
  className?: string;
};

/**
 * Renders JSON with editor-style syntax colors (VS Code Dark+ by default).
 * Wrap it in a `<pre className="whitespace-pre">` to keep the original indentation.
 */
export const JsonHighlight = ({ code, palette = VSCODE_DARK_PLUS, className }: JsonHighlightProps) => {
  const tokens = useMemo(() => tokenizeJson(code), [code]);

  const colorFor = (type: JsonTokenType): string | undefined => {
    switch (type) {
      case "key":
        return palette.key;
      case "string":
        return palette.string;
      case "literal":
        return palette.literal;
      case "number":
        return palette.number;
      case "punctuation":
        return palette.punctuation;
      default:
        return undefined;
    }
  };

  return (
    <code className={className}>
      {tokens.map((token, index) => {
        const color = colorFor(token.type);
        return color ? (
          <span key={index} style={{ color }}>
            {token.text}
          </span>
        ) : (
          <Fragment key={index}>{token.text}</Fragment>
        );
      })}
    </code>
  );
};
