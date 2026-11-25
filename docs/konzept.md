# Konzept in Kurzform

Stand 25.11.2026. Das ausführliche Konzept liegt als Dokument bei Kilian
(Link auf der Projektseite in Notion). Diese Datei hält fest, was für den Bau
gilt. Alle Preise in Schweizer Franken.

## Idee

Ein exklusiver Club mit Sitz in Chur und den Bündner Bergen als Premium-Marke.
Mitglieder zahlen für eines von vier Levels oder für ein einmaliges
Status-Abzeichen. Jedes Mitglied erhält eine Member-Karte mit Diamant in der
Farbe seines Levels: digital fürs Wallet und physisch per Post. Events werden
separat verrechnet und stehen nur Mitgliedern offen.

Der Club läuft über eine eigene Website mit eigener Zahlung, nicht über den
App Store (ADR 0001).

## Zwei Phasen

|                                             | Phase 1 (Start)                            | Phase 2 (später)                       |
| ------------------------------------------- | ------------------------------------------ | -------------------------------------- |
| Website                                     | Öffentlich, ohne Login                     | Zusätzlich Mitgliederbereich mit Login |
| Beitritt                                    | Zahlungslink pro Level                     | Im Mitgliederbereich                   |
| Mitgliederliste                             | Beim Zahlungsanbieter, geführt vom Gründer | Eigene Datenbank                       |
| Verzeichnis und Direktkontakt               | Gibt es noch nicht                         | Mit Sichtbarkeit nur nach unten        |
| Bernina-Kontingent, Einladungen, Warteliste | Von Hand durch den Gründer                 | Vom Server durchgesetzt                |
| Event-Tickets                               | Zahlungslink an berechtigte Mitglieder     | Buchung mit Level-Prüfung              |

Phase 1 braucht keine Datenbank und kein Login (ADR 0005). Die Regeln unten
gelten in beiden Phasen. In Phase 1 wendet der Gründer sie von Hand an.

## Levels

| Level                 | Preis             | Diamant        | Events                     |
| --------------------- | ----------------- | -------------- | -------------------------- |
| Solitaire (Abzeichen) | CHF 999 einmalig  | eigene Fassung | Kein Zugang                |
| Calanda               | CHF 25 pro Monat  | Weiss          | Quartalstreffen            |
| Kesch                 | CHF 50 pro Monat  | Champagner     | Zusätzlich 1 Gast          |
| Palü                  | CHF 100 pro Monat | Blau           | Zusätzlich Vorrang-Buchung |
| Bernina               | CHF 250 pro Monat | Schwarz        | Zusätzlich das Ultra-Event |

- Alle Abo-Levels haben 12 Monate Bindung. Eine Kündigung wirkt auf das Ende
  der Bindung.
- Jedes höhere Level enthält alles der Levels darunter.
- Wer Solitaire und ein Abo besitzt, erhält eine kombinierte Karte.
- Die Preise stehen im Code in `packages/core/src/levels.ts`. Die CI prüft,
  dass diese Tabelle dieselben Beträge nennt.

## Bernina

- Höchstens 50 Mitglieder.
- Platz 1 bis 20: wer zuerst kommt. Der Gründerkreis zählt dazu. Stand
  25.11.2026 sind 5 der ersten 20 Plätze vergeben.
- Platz 21 bis 50: nur auf Einladung eines Bernina-Mitglieds. Jedes
  Bernina-Mitglied darf höchstens 2 Einladungen pro Jahr vergeben.
- Ab 50: Warteliste. Ein Platz auf der Liste kostet 50 % des Bernina-Preises
  (CHF 125 pro Monat), solange man auf der Liste bleibt. Wer nicht mehr zahlt,
  verliert den Platz.
- Ein Bernina-Platz wird frei am Ende der 12-Monats-Bindung des austretenden
  Mitglieds, nicht schon bei der Kündigung.
- Nachrücken nur nach persönlicher Freigabe durch den Gründer. Die Reihenfolge
  auf der Liste ist kein Anspruch.

## Events

| Anlass          | Wann                   | Wo                       | Zugang           |
| --------------- | ---------------------- | ------------------------ | ---------------- |
| Gründertag      | Jedes Jahr am 17. Juni | Graubünden, Ort wechselt | Nur Bernina      |
| Quartalstreffen | Einmal pro Quartal     | Chur und Umgebung        | Alle vier Levels |

- Tickets kosten extra und laufen über denselben Zahlungsanbieter wie die
  Mitgliedschaft.
- Palü und Bernina buchen die Quartalstreffen vor den anderen.
- Ab Kesch ein Gast pro Quartalstreffen, mit eigenem Ticket.
- Check-in per QR-Code auf der Wallet-Karte oder der physischen Karte.
- Solitaire hat keinen Event-Zugang.
- Ausnahme: Der erste Gründertag am 17. Juni 2028 steht allen vier Stufen
  offen. Ab 2029 ist er Bernina vorbehalten (ADR 0007).

## Aufbau bis zum ersten Gründertag

Der erste Anlass überhaupt ist der Gründertag am 17. Juni 2028. Vorher gibt
es keine Quartalstreffen, der erste Stamm folgt im Herbst 2028 (ADR 0007).

- Bis Ende 2027 reserviert ein Gründerkreis gratis eine Mitgliedsnummer.
- Von Januar bis April 2028 werden die Stufen nacheinander enthüllt.
- Anfang Mai 2028 öffnet der Beitritt (Erstbesteigung). Das Abo läuft ab dem
  Beitritt.

## Die zwei Karten

|                         | Wallet-Karte         | Physische Karte                  |
| ----------------------- | -------------------- | -------------------------------- |
| Wann                    | Nach dem Beitritt    | Per Post nach der Produktion     |
| Kosten für das Mitglied | Inbegriffen          | Karte inbegriffen, Versand extra |
| Bei Levelwechsel        | Wird neu ausgestellt | Neue Karte nötig                 |

## Verzeichnis und Direktkontakt (Phase 2)

1. Ein Mitglied sieht alle Profile des eigenen Levels und der Levels darunter.
2. Ein Mitglied kann jedes Profil anschreiben, das es sieht.
3. Wer von einem höheren Level angeschrieben wird, darf antworten und sieht
   für diesen Chat dessen Profil.
4. Solitaire ist für alle sichtbar, sieht niemanden, kann nicht anschreiben,
   darf aber antworten.
5. Jedes Mitglied wählt beim Einstieg, ob es im Verzeichnis erscheint und
   welche Angaben sichtbar sind.
6. Jedes Profil und jeder Chat hat Melden und Blockieren.
7. Wer absteigt, verliert die Sicht nach oben. Bestehende Chats bleiben
   lesbar, neue Nachrichten nach oben sind nur als Antwort möglich.

Diese Regeln sind schon als geprüfte Logik in `packages/core/src/rules.ts`
hinterlegt.

## Offene Entscheidungen

- Name: 4049 ist gewählt, Registerabfrage und Domain stehen aus. Bis dahin
  heisst das Repo weiter «Swiss Elite»
- Anrede auf der Website: Sie oder Du
- Startmarkt: nur Schweiz, DACH oder international
- Ticketpreise für Quartalstreffen und Gründertag
- Ob der Gründertag ab 2029 das Treffen im zweiten Quartal ersetzt oder
  zusätzlich stattfindet
- Material, Hersteller und Versandkosten der physischen Karte
- Wer die neue physische Karte bei einem Levelwechsel bezahlt
- Ob der Wartelisten-Platz zusätzlich zum bestehenden Level bezahlt wird oder
  ein eigenes Level ist
- Aufnahme für alle, die zahlen, oder mit Bewerbung und Prüfung
- Betreiberfirma und rechtliche Prüfung von AGB und Datenschutz
