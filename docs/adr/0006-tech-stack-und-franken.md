# ADR 0006: Tech-Stack für Phase 1 und Preise in Franken

Datum: 25.11.2026 · Status: entschieden

## Entscheid

- **Website:** Astro, statisch, wie bei Nice Grips.
- **Hosting:** Cloudflare Workers, nur Static Assets, kein Worker-Code.
- **Zahlung:** Stripe (Abos, Einmalkauf, Tickets) über Zahlungslinks.
- **Werkzeuge:** Bun 1.4.4 mit Workspaces, TypeScript, ESLint und Prettier,
  Vitest.
- **CI:** GitHub Actions, ein einziger Job «checks», nur bei Pull Requests.
- **Kein Supabase** in Phase 1 (ADR 0005).
- **Währung:** alle Preise in Schweizer Franken.

## Gründe

- Derselbe Stack wie MaltVault und Nice Grips: bekannte Regeln, bekannte
  Fehlerquellen.
- Eine statische Website braucht weder Server noch Datenbank und ist kaum
  angreifbar.
- Ein einziger CI-Job spart Actions-Minuten: GitHub rundet jeden Job auf ganze
  Minuten auf, sechs Jobs kosten also mindestens sechs Minuten pro Lauf.

## Folgen

- Sobald Zahlungseingänge automatisch Karten auslösen sollen, kommt ein
  Worker mit Webhook dazu. Das ist dann ein eigenes ADR.
- Phase 2 braucht Datenbank und Login. Supabase ist dafür der naheliegende
  Kandidat, entschieden wird es dann.
- Die Zahlungsgebühr (Annahme 2.9 % plus CHF 0.30 pro Zahlung) ist vor dem
  Businessplan an der aktuellen Preisliste zu prüfen.
