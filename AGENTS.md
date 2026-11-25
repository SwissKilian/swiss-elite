# Swiss Elite – Regeln für dieses Repo

Exklusiver Club aus Chur: vier Membership-Levels (Calanda, Kesch, Palü, Bernina)
und das Status-Abzeichen Solitaire. Website mit eigener Zahlung, keine App im
Store. Projekt in Notion: Zentrale → Projekte → «Swiss Elite».

«Swiss Elite» ist der Arbeitstitel. Name, Vermarktung und Stil der Website
kommen mit dem Marketingkonzept.

## Stand

Phase 1 (ADR 0005): öffentliche Website ohne Login und ohne Datenbank.
Beitritt, Warteliste und Tickets laufen über Zahlungslinks, die Mitgliederliste
führt der Gründer beim Zahlungsanbieter. Mitgliederbereich, Verzeichnis und
Direktkontakt sind Phase 2.

## Aufbau

| Ordner            | Inhalt                                                                                                          |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| `apps/web`        | Website, Astro (statisch), Cloudflare Worker `swisselite-website` (nur Static Assets)                           |
| `packages/core`   | **Einzige Quelle** für Levels und Preise (`levels.ts`) und die Regeln des Clubs als geprüfte Logik (`rules.ts`) |
| `scripts/ci`      | `repo-checks.mjs` (Konzept ↔ Code, Schlüssel, Workflows), `check-csp.mjs` (Build ohne Inline-Code)              |
| `docs/konzept.md` | Konzept in Kurzform                                                                                             |
| `docs/adr/`       | Entscheide mit Begründung, nummeriert                                                                           |
| `docs/betrieb.md` | Was Kilian einrichten muss                                                                                      |

## Befehle

```sh
bun install          # Abhängigkeiten (exakte Versionen, 24h-Schutz)
bun run checks       # alles, was die CI prüft, in derselben Reihenfolge
bun run test         # Tests der Club-Regeln
bun run lint         # ESLint + Prettier
bun run typecheck    # tsc + astro check
bun run repo-checks  # Konzept ↔ Code, Schlüssel, Workflows
bun run audit        # bekannte Lücken in Abhängigkeiten
bun run build        # Website bauen + CSP-Prüfung
```

## Arbeitsweise

- Änderungen nur über Pull Requests, nie direkt auf `main`.
- Vor dem Merge ist der PR auf dem Stand von `main` und der Check «checks» ist
  grün. Claude merged eigene PRs und Dependabot-PRs, sobald das zutrifft.
- Die CI läuft nur bei PRs und in einem einzigen Job: GitHub-Actions-Minuten
  sind knapp, und jeder Job wird auf ganze Minuten aufgerundet. Keine geplanten
  Läufe, kein Lauf nach dem Merge (`repo-checks` verhindert beides).
- Jede Aufgabe hängt in Notion am Projekt «Swiss Elite» und am Meilenstein
  «Swiss Elite MVP». Nach dem Merge kommt der PR-Link ins Feld «PR».
- Ändert ein PR eine Regel oder einen Preis, werden `packages/core`,
  `docs/konzept.md` und die Tests im selben PR angepasst. Ein neuer Entscheid
  bekommt ein ADR.
- Sprache: Doku und Texte auf Deutsch (Schweizer Schreibweise, kein ß),
  Code und Bezeichner auf Englisch. Preise immer in Franken. Texte für
  Mitglieder immer per Du.
- Neue Pakete: exakte Version, mindestens 24 Stunden alt (`bunfig.toml`).

## Regeln, die nie verletzt werden dürfen

1. **Keine Schlüssel im Repo.** Zahlungs- und Zertifikatsschlüssel liegen beim
   Anbieter oder als Secret, nie im Code. Zahlungsdaten bleiben beim
   Zahlungsanbieter.
2. **Kein Inline-Code auf der Website.** Die CSP kommt ohne `unsafe-inline`
   aus, keine fremden Skripte, Schriften oder Tracker.
3. **Personendaten sparsam.** Lieferadressen nur für den Kartenversand.
4. **Bernina hat höchstens 50 Mitglieder.** Der Zahlungslink für Bernina ist
   nie öffentlich verlinkt, solange das Kontingent von Hand geführt wird.
5. **Der Gründer bleibt anonym.** Kein Name, kein Foto und keine persönliche
   Spur des Gründers auf der Website, in Metadaten, Commits auf der Website
   oder in Texten. Absender ist immer der Club, unterschrieben wird nur mit
   «DK». Das Impressum nennt den Verein, vertreten durch Gründungsmitglied 4
   (ADR 0008, ADR 0009).
6. **Sichtbarkeit nur nach unten (Phase 2).** Sobald es ein Verzeichnis gibt:
   durchsetzen auf dem Server, mit Tests gegen die Datenbank.

## Offene Entscheidungen

Stehen am Ende von `docs/konzept.md`. Nichts davon im Code annehmen, sondern
fragen.
