#!/usr/bin/env node
// Prüft den Website-Build: keine Inline-Skripte, keine Inline-Styles, keine
// Inline-Event-Handler, keine externen Skripte/Styles/Schriften. So reicht die
// strenge CSP in public/_headers ohne 'unsafe-inline'.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const dist = process.argv[2];
if (!dist) {
  console.error("Aufruf: check-csp.mjs <dist-ordner>");
  process.exit(2);
}

const files = [];
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".html")) files.push(p);
  }
};
walk(dist);

const rules = [
  [/<script(?![^>]*\bsrc=)[^>]*>/i, "Inline-<script> (ohne src)"],
  [/<style[\s>]/i, "Inline-<style>"],
  [/\sstyle\s*=\s*["']/i, "style-Attribut"],
  [/\son[a-z]+\s*=\s*["']/i, "Inline-Event-Handler (on…=)"],
  [/<script[^>]+src=["']https?:/i, "externes Skript"],
  [/<link[^>]+rel=["']stylesheet["'][^>]+href=["']https?:/i, "externes Stylesheet"],
  [/fonts\.googleapis|fonts\.gstatic/i, "Google-Schrift von fremdem Server"],
  [/<iframe/i, "iframe im HTML"],
];

let errors = 0;
for (const f of files) {
  const html = readFileSync(f, "utf8");
  for (const [re, label] of rules) {
    if (re.test(html)) {
      console.error(`✗ ${f}: ${label}`);
      errors++;
    }
  }
}
if (files.length === 0) {
  console.error("✗ keine HTML-Dateien gefunden");
  process.exit(1);
}
if (errors) process.exit(1);
console.log(`✓ CSP-Prüfung: ${files.length} Seiten ohne Inline-Code und ohne fremde Ressourcen`);
