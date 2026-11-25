# ADR 0005: Phase 1 ohne Login und ohne Datenbank

Datum: 25.11.2026 · Status: entschieden

## Entscheid

Der Club startet mit einer öffentlichen Website ohne Mitgliederbereich. Es gibt
kein Login und keine eigene Datenbank. Der Mitgliederbereich folgt als Phase 2.

## So läuft Phase 1

- **Beitritt:** ein Zahlungslink pro Level beim Zahlungsanbieter.
- **Mitgliederliste:** die Kundenliste beim Zahlungsanbieter. Der Gründer führt
  sie dort.
- **Bernina:** Der Zahlungslink ist nicht öffentlich. Für die ersten 20 Plätze
  gibt ihn der Gründer frei heraus, danach nur an Eingeladene und Freigegebene.
  Er zählt die Plätze selbst.
- **Warteliste:** eigener Zahlungslink für CHF 125 pro Monat.
- **Karten:** Wallet-Karte und physische Karte werden nach dem Zahlungseingang
  ausgestellt, zuerst von Hand.
- **Events:** Berechtigte Mitglieder erhalten den Ticket-Link per E-Mail.
  Check-in mit Liste oder QR-Code.

## Gründe

- Der Club lässt sich mit wenig Aufwand am Markt prüfen, bevor ein
  Mitgliederbereich gebaut wird.
- Ohne Login gibt es keine Konten, Passwörter und Profile zu schützen.
- Bei höchstens 50 Bernina-Mitgliedern ist Handarbeit tragbar, und die
  persönliche Freigabe durch den Gründer ist ohnehin Teil des Konzepts.

## Folgen

- Verzeichnis, Direktkontakt und die Sichtbarkeit nur nach unten fehlen in
  Phase 1. Damit fehlt der stärkste Grund für den Aufstieg zwischen Calanda,
  Kesch und Palü. Die Levels unterscheiden sich vorerst durch Karte, Gast,
  Vorrang und das Ultra-Event.
- Der Gründer hat pro Mitglied Handarbeit. Das trägt bis etwa 100 bis 200
  Mitglieder, danach braucht es Phase 2 oder Automatisierung.
- Die Regeln des Clubs liegen trotzdem schon als geprüfte Logik in
  `packages/core`, damit Phase 2 sie unverändert übernimmt.
- Ob der Zahlungsanbieter die 12-Monats-Bindung und eine Obergrenze pro
  Zahlungslink von sich aus abbilden kann, ist vor dem Start zu prüfen.
