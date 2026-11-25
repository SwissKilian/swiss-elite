# Swiss Elite – Regeln für dieses Repo

Exklusiver Club aus Chur: vier Membership-Levels (Calanda, Kesch, Palü, Bernina)
und das Status-Abzeichen Solitaire. Website mit eigener Zahlung, keine App im
Store. Projekt in Notion: Zentrale → Projekte → «Swiss Elite».

«Swiss Elite» ist der Arbeitstitel. Der Name des Clubs ist noch offen.

## Stand

Noch kein Code. Der Tech-Stack ist ein Vorschlag und nicht bestätigt:
Web-App, Supabase (Postgres, RLS, Auth), Stripe (Abos, Tickets), Wallet-Karten
für Apple und Google, Cloudflare Workers, Bun. Vor dem ersten Code den Stack
mit Kilian klären und als ADR festhalten.

## Wo was steht

| Datei | Inhalt |
| --- | --- |
| `docs/konzept.md` | Konzept in Kurzform: Levels, Regeln, Events, Karten |
| `docs/adr/` | Entscheide mit Begründung, nummeriert |

Das ausführliche Konzept liegt als Dokument bei Kilian, der Link steht auf der
Projektseite in Notion.

## Arbeitsweise

- Änderungen nur über Pull Requests, nie direkt auf `main`.
- Jede Aufgabe hängt in Notion am Projekt «Swiss Elite» und am Meilenstein
  «Swiss Elite MVP». Nach dem Merge kommt der PR-Link ins Feld «PR».
- Ändert ein PR eine Regel des Clubs, wird `docs/konzept.md` im selben PR
  angepasst. Ein neuer Entscheid bekommt ein ADR.
- Sprache: Doku und Texte auf Deutsch (Schweizer Schreibweise, kein ß),
  Code und Bezeichner auf Englisch.
- GitHub-Actions-Minuten sind knapp: CI nur bei PRs, keine geplanten Läufe
  ohne Absprache.

## Regeln, die im Code nie verletzt werden dürfen

1. **Sichtbarkeit nur nach unten.** Ein Mitglied darf Profile über seinem Level
   weder sehen noch über die Schnittstelle abrufen. Durchsetzen auf dem Server
   (Zugriffsregeln der Datenbank), nicht nur in der Oberfläche. Jede Änderung
   daran braucht Tests gegen die Datenbank.
2. **Bernina hat höchstens 50 Mitglieder.** Kauf nur mit freiem Platz,
   gültiger Einladung oder Freigabe durch den Gründer. Die Prüfung läuft auf
   dem Server und hält auch bei gleichzeitigen Käufen.
3. **Zahlungsdaten bleiben beim Zahlungsanbieter.** Keine Kartendaten in der
   eigenen Datenbank, keine Schlüssel im Repo.
4. **Personendaten sparsam.** Verzeichnis nur mit Einwilligung, Lieferadressen
   nur für den Kartenversand, Löschfunktion von Anfang an.

## Offene Entscheidungen

Stehen am Ende von `docs/konzept.md`. Nichts davon im Code annehmen, sondern
fragen.
