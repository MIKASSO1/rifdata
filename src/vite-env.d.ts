/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** EmailJS service ID (e.g. "service_xxxxxxx") */
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  /** EmailJS template ID (e.g. "template_xxxxxxx") */
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
  /** EmailJS account public key */
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
