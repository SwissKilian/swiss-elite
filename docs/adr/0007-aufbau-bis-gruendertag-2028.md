# ADR 0007: Aufbau bis zum ersten Gründertag 2028

Datum: 25.11.2026 · Status: entschieden

## Entscheid

- Der erste Anlass des Clubs ist der Gründertag am 17. Juni 2028. Vorher gibt
  es keine Quartalstreffen, der erste Stamm folgt im Herbst 2028.
- Der erste Gründertag steht allen vier Stufen offen. Ab 2029 ist er Bernina
  vorbehalten. Solitaire hat weiterhin keinen Event-Zugang.
- Bis Ende 2027 reserviert ein Gründerkreis gratis eine Mitgliedsnummer.
- Der Beitritt öffnet Anfang Mai 2028 (Erstbesteigung). Das Abo läuft ab dem
  Beitritt.
- Der Gründerkreis zählt zu den ersten 20 Bernina-Plätzen. 5 davon sind für
  die Gründungsmitglieder vorgesehen (Korrektur in ADR 0009).
- Der Aufbau läuft in sechs Etappen mit Toren: Fundament, Gründerkreis (still),
  Enthüllung in Etappen, Erstbesteigung, Gründertag, Laut werden. Kommen bis
  Ende 2027 keine 20 Reservationen zusammen, geht der Club nicht öffentlich.
- Arbeitstitel des Clubs ist neu «4049». Der Name im Repo folgt nach der
  Registerabfrage.

## Gründe

- Ein Abo ohne Anlass widerspricht dem Versprechen der Stufen. Weil der
  Beitritt erst sechs Wochen vor dem Gründertag öffnet, zahlt niemand lange
  ohne Gegenleistung.
- Als einziger Anlass in 19 Monaten muss der erste Gründertag für alle da sein,
  sonst hätten drei von vier Stufen nach dem ganzen Aufbau keinen Abend.
- Spannung hält Wochen, nicht Jahre. Der lange Teil bleibt deshalb still im
  Gründerkreis.

## Folgen

- `canAttend` in `packages/core/src/rules.ts` kennt die Ausnahme 2028
  (`FIRST_FOUNDERS_DAY_YEAR`), mit Tests.
- Bis Juni 2028 fliesst kaum Geld, Karten, Marke und Recht kosten vorher.
- Details zum Spannungsbogen stehen im Marketingkonzept (Link auf der
  Projektseite in Notion).
