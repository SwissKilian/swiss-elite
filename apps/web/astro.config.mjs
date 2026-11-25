import { defineConfig } from "astro/config";

// Statische Website, ausgeliefert über Cloudflare Workers Static Assets.
// Keine Inline-Skripte/-Styles, damit die CSP in public/_headers ohne
// 'unsafe-inline' auskommt (geprüft von scripts/ci/check-csp.mjs).
export default defineConfig({
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
    inlineStylesheets: "never",
  },
  vite: {
    build: { assetsInlineLimit: 0 },
  },
  devToolbar: { enabled: false },
});
