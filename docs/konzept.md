# Konzept in Kurzform

Stand 25.11.2026. Das ausführliche Konzept liegt als Dokument bei Kilian
(Link auf der Projektseite in Notion). Diese Datei hält fest, was für den Bau
gilt.

## Idee

Ein exklusiver Club mit Sitz in Chur und den Bündner Bergen als Premium-Marke.
Mitglieder zahlen für eines von vier Levels oder für ein einmaliges
Status-Abzeichen. Jedes Mitglied erhält eine Member-Karte mit Diamant in der
Farbe seines Levels: digital fürs Wallet und physisch per Post. Events werden
separat verrechnet und stehen nur Mitgliedern offen.

Der Club läuft über eine eigene Website mit eigener Zahlung, nicht über den
App Store (ADR 0001).

## Levels

| Level | Preis | Diamant | Sieht im Verzeichnis | Direktkontakt | Events |
| --- | --- | --- | --- | --- | --- |
| Solitaire (Abzeichen) | 999 einmalig | eigene Fassung | Niemanden | Nein | Kein Zugang |
| Calanda | 25 pro Monat | Weiss | Calanda | Calanda | Quartalstreffen |
| Kesch | 50 pro Monat | Champagner | Calanda bis Kesch | Bis Kesch | Zusätzlich 1 Gast |
| Palü | 100 pro Monat | Blau | Calanda bis Palü | Bis Palü | Zusätzlich Vorrang-Buchung |
| Bernina | 250 pro Monat | Schwarz | Alle | Alle | Zusätzlich das Ultra-Event |

- Alle Abo-Levels haben 12 Monate Bindung. Eine Kündigung wirkt auf das Ende
  der Bindung.
- Jedes höhere Level enthält alles der Levels darunter.
- Wer Solitaire und ein Abo besitzt, erhält eine kombinierte Karte.
- Die Währung ist noch offen.

## Verzeichnis und Direktkontakt

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

## Bernina

- Höchstens 50 Mitglieder.
- Platz 1 bis 20: wer zuerst kommt.
- Platz 21 bis 50: nur auf Einladung eines Bernina-Mitglieds. Jedes
  Bernina-Mitglied darf höchstens 2 Einladungen pro Jahr vergeben.
- Ab 50: Warteliste. Ein Platz auf der Liste kostet 50 % des Bernina-Preises
  (125 pro Monat), solange man auf der Liste bleibt. Wer nicht mehr zahlt,
  verliert den Platz.
- Ein Bernina-Platz wird frei am Ende der 12-Monats-Bindung des austretenden
  Mitglieds, nicht schon bei der Kündigung.
- Nachrücken nur nach persönlicher Freigabe durch den Gründer. Die Reihenfolge
  auf der Liste ist kein Anspruch.

## Events

| Anlass | Wann | Wo | Zugang |
| --- | --- | --- | --- |
| Ultra-Event | Jedes Jahr am 17. Juni | Graubünden, Ort wechselt | Nur Bernina |
| Quartalstreffen | Einmal pro Quartal | Chur und Umgebung | Alle vier Levels |

- Tickets kosten extra und laufen über denselben Zahlungsanbieter wie die
  Mitgliedschaft.
- Palü und Bernina buchen die Quartalstreffen vor den anderen.
- Ab Kesch ein Gast pro Quartalstreffen, mit eigenem Ticket.
- Check-in per QR-Code auf der Wallet-Karte oder der physischen Karte.
- Solitaire hat keinen Event-Zugang.

## Die zwei Karten

| | Wallet-Karte | Physische Karte |
| --- | --- | --- |
| Wann | Sofort nach dem Beitritt | Per Post nach der Produktion |
| Kosten für das Mitglied | Inbegriffen | Karte inbegriffen, Versand extra |
| Bei Levelwechsel | Aktualisiert sich von selbst | Neue Karte nötig |

## Seiten der Website

Startseite (öffentlich), Beitritt, Member-Karte, Verzeichnis, Profil,
Nachrichten, Events, Mitgliedschaft, Admin (Mitglieder, Events, Meldungen,
Einladungen, Wartelisten-Freigabe, Kartenbestellungen, Check-in).

## Offene Entscheidungen

- Name des Clubs
- Währung der Preise: Franken oder Dollar
- Startmarkt: nur Schweiz, DACH oder international
- Ticketpreise für Quartalstreffen und Ultra-Event
- Ob das Ultra-Event das Treffen im zweiten Quartal ersetzt oder zusätzlich
  stattfindet
- Material, Hersteller und Versandkosten der physischen Karte
- Wer die neue physische Karte bei einem Levelwechsel bezahlt
- Ob der Wartelisten-Platz zusätzlich zum bestehenden Level bezahlt wird oder
  ein eigenes Level ist
- Aufnahme für alle, die zahlen, oder mit Bewerbung und Prüfung
- Wer Meldungen moderiert und Mitgliederanfragen beantwortet
- Betreiberfirma und rechtliche Prüfung von AGB und Datenschutz
- Tech-Stack
