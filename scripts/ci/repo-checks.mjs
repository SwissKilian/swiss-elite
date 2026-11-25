#!/usr/bin/env node
// Sicherheits- und Konsistenzregeln, die bei jedem PR laufen.
import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../..", import.meta.url).pathname;
const errors = [];
const fail = (msg) => errors.push(msg);
const read = (f) => readFileSync(join(root, f), "utf8");

// ------------------------------------------------------ Konzept ↔ Code
// packages/core/src/levels.ts ist die einzige Quelle für Preise. docs/konzept.md
// muss dieselben Beträge in Franken nennen.
const levelsTs = read("packages/core/src/levels.ts");
const konzept = read("docs/konzept.md");
const levels = [...levelsTs.matchAll(/name: "([^"]+)",[\s\S]*?monthlyChf: (\d+)/g)].map((m) => ({
  name: m[1],
  chf: Number(m[2]),
}));
if (levels.length !== 4) fail(`levels.ts: 4 Levels erwartet, ${levels.length} gefunden`);
for (const l of levels) {
  if (!new RegExp(`\\| ${l.name}\\s*\\| CHF ${l.chf} pro Monat\\s*\\|`).test(konzept))
    fail(`docs/konzept.md: Zeile "| ${l.name} | CHF ${l.chf} pro Monat |" fehlt (Preis geändert?)`);
}
const solitaire = levelsTs.match(/onceChf: (\d+)/)?.[1];
if (!solitaire || !konzept.includes(`CHF ${solitaire} einmalig`))
  fail(`docs/konzept.md: "CHF ${solitaire} einmalig" für Solitaire fehlt`);
if (/\b(Dollar|USD|EUR|Euro)\b|\$\s?\d/.test(konzept))
  fail("docs/konzept.md: Preise nur in Franken (ADR 0006)");

// ------------------------------------------------------------- Code-Regeln
const tracked = execSync("git ls-files -co --exclude-standard", { cwd: root, encoding: "utf8" })
  .split("\n")
  .filter((f) => f && !f.startsWith("node_modules/") && !f.includes("/dist/") && f !== "bun.lock");

const secretPatterns = [
  [/sk_(live|test)_[A-Za-z0-9]{10,}/, "Stripe Secret Key"],
  [/rk_(live|test)_[A-Za-z0-9]{10,}/, "Stripe Restricted Key"],
  [/whsec_[A-Za-z0-9]{10,}/, "Stripe Webhook Secret"],
  [/eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/, "JWT"],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, "Private Key"],
  [/re_[A-Za-z0-9]{20,}/, "Resend API Key"],
  [/AKIA[0-9A-Z]{16}/, "AWS Key"],
];
for (const f of tracked) {
  if (f === "scripts/ci/repo-checks.mjs" || /\.(png|jpg|ico|woff2?|pkpass)$/.test(f)) continue;
  if (!existsSync(join(root, f))) continue;
  let text;
  try {
    text = read(f);
  } catch {
    continue;
  }
  for (const [re, label] of secretPatterns)
    if (re.test(text)) fail(`${f}: möglicher Schlüssel (${label})`);
  if (/^apps\/.*\.(ts|astro)$/.test(f)) {
    if (/set:html|innerHTML\s*=/.test(text)) fail(`${f}: rohes HTML einfügen ist verboten`);
    if (/\beval\(|new Function\(/.test(text)) fail(`${f}: eval/new Function ist verboten`);
  }
  if (/^\.github\/workflows\/.*\.ya?ml$/.test(f)) {
    for (const m of text.matchAll(/uses:\s*([^\s#]+)/g)) {
      if (!/@[0-9a-f]{40}$/.test(m[1]) && !m[1].startsWith("./"))
        fail(`${f}: Action ${m[1]} nicht auf Commit-SHA gepinnt`);
    }
    // Actions-Minuten sind knapp: keine geplanten Läufe und kein Lauf nach dem Merge.
    if (/^\s*schedule:/m.test(text)) fail(`${f}: geplante Läufe nur nach Absprache mit Kilian`);
    if (/^\s*push:/m.test(text)) fail(`${f}: kein Lauf bei push, die CI läuft nur bei PRs`);
  }
}

if (errors.length) {
  for (const e of errors) console.error(`✗ ${e}`);
  process.exit(1);
}
console.log(`✓ repo-checks: ${levels.length} Levels, ${tracked.length} Dateien geprüft`);
