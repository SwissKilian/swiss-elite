# ADR 0002: Vier Levels, Abzeichen und Sichtbarkeit nur nach unten

Datum: 25.11.2026 · Status: entschieden

## Entscheid

- Vier Abo-Levels, benannt nach Bündner Gipfeln in aufsteigender Höhe:
  Calanda (25), Kesch (50), Palü (100), Bernina (250), je pro Monat mit
  12 Monaten Bindung.
- Solitaire für 999 einmalig ist ein reines Status-Abzeichen ohne
  Event-Zugang. Die ursprünglich geplante Variante für 499 entfällt.
- Höhere Levels sehen alle Profile darunter, tiefere sehen nicht nach oben.
  Antworten auf eine Nachricht von oben ist immer möglich.
- Das Ultra-Event am 17. Juni ist Bernina vorbehalten, die Quartalstreffen
  stehen allen vier Levels offen.

## Gründe

- Sichtbarkeit ist der Grund für den Aufstieg: Wer nach oben vernetzen will,
  muss das Level wechseln. Wer oben ist, bekommt Diskretion.
- Ohne Antwortrecht wäre der Direktkontakt nach unten wertlos.
- Solitaire steht neben der Leiter: sichtbar für alle, sieht selbst niemanden.

## Folgen

- Die Sichtbarkeitsregeln müssen auf dem Server durchgesetzt und mit Tests
  gegen die Datenbank abgesichert sein.
- Calanda sieht nur das eigene Level und braucht deshalb eigenen Wert: den
  ganzen Event-Kalender, auch gesperrte Events.
