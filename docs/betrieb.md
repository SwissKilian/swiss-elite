# Betrieb: was einzurichten ist

Stand 25.11.2026. Noch nichts ist live. Diese Liste wächst mit dem Projekt.

## Vor dem ersten Verkauf

| Was                                                                   | Wer               | Wozu                                                          |
| --------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------- |
| Name und Domain                                                       | Kilian            | Kommt mit dem Marketingkonzept                                |
| Betreiberfirma                                                        | Kilian            | Vertragspartner der Mitglieder                                |
| AGB und Datenschutz prüfen lassen                                     | Kilian            | 12-Monats-Bindung, Wartelisten-Gebühr, Freigabe nach Ermessen |
| Stripe-Konto auf die Firma                                            | Kilian            | Abos, Solitaire, Tickets, Versandkosten                       |
| Cloudflare: Worker `swisselite-website` mit Workers Builds aus GitHub | Kilian mit Claude | Hosting der Website                                           |
| Apple-Entwicklerkonto                                                 | Kilian            | Wallet-Karte fürs iPhone                                      |
| Hersteller der physischen Karte                                       | Kilian            | Muster pro Level, Versandkosten                               |

## Zahlungslinks in Stripe (Phase 1)

| Produkt            | Preis             | Link                                |
| ------------------ | ----------------- | ----------------------------------- |
| Calanda            | CHF 25 pro Monat  | öffentlich auf der Website          |
| Kesch              | CHF 50 pro Monat  | öffentlich auf der Website          |
| Palü               | CHF 100 pro Monat | öffentlich auf der Website          |
| Bernina            | CHF 250 pro Monat | **nie öffentlich**, nur vom Gründer |
| Warteliste Bernina | CHF 125 pro Monat | öffentlich, sobald Bernina voll ist |
| Solitaire          | CHF 999 einmalig  | öffentlich auf der Website          |

Zu klären beim Einrichten: wie Stripe die 12-Monats-Bindung abbildet und ob
sich ein Zahlungslink auf eine Anzahl Käufe begrenzen lässt.

## GitHub

- `main` schützen: nur per Pull Request, kein Force-Push, Pflicht-Check
  «checks», gemergte Branches automatisch löschen.
- Dependabot-Alerts einschalten.
- Die CI läuft nur bei PRs und in einem Job, um Actions-Minuten zu sparen.
  Mit der Repo-Variable `RUNNER = self-hosted` läuft sie auf einem eigenen
  Runner.
