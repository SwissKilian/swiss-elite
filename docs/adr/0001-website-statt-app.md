# ADR 0001: Website mit eigener Zahlung statt App im Store

Datum: 25.11.2026 · Status: entschieden

## Ausgangslage

Die erste Idee war eine iPhone-App als reines Statussymbol, später eine
Club-App mit Mitgliedschaft über Apples In-App-Kauf.

## Entscheid

Der Club läuft über eine eigene Website mit eigener Zahlung. Die
App-Store-Variante ist verworfen.

## Gründe

- Bernina ist auf 50 Mitglieder begrenzt. Apples Abo-System kennt keine
  Platzbegrenzung, und Mitglieder derselben Abo-Gruppe können das Level in
  Apples Abo-Verwaltung selbst wechseln.
- Eine bezahlte Warteliste und ein Abzeichen ohne Funktion riskieren die
  Ablehnung im Review (Mindestfunktion, Abos nur mit laufendem Wert).
- Der Gründer gibt Nachrücker einzeln frei. Ein In-App-Kauf lässt sich nicht
  pro Person bewilligen.
- Apple behält 15 bis 30 % Provision, ein Zahlungsanbieter rund 3 %.
- Apples längste Bindung ist 12 Monate und in einzelnen Ländern nicht
  verfügbar.

## Folgen

- Kein Review, dafür trägt der Betreiber die Verantwortung für Vertrag,
  Zahlung und Daten selbst. AGB, Bindung und Wartelisten-Gebühr müssen vor dem
  ersten Verkauf rechtlich geprüft werden.
- Das Statussymbol auf dem Handy ist die Wallet-Karte statt eines App-Icons
  (ADR 0004).
- Eine native App bleibt als spätere Phase möglich, müsste die Mitgliedschaft
  dann aber über den In-App-Kauf anbieten.
