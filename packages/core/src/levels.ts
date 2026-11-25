// Einzige Quelle für Levels und Preise. Die Website liest von hier, und
// scripts/ci/repo-checks.mjs prüft, dass docs/konzept.md dieselben Preise nennt.
// Alle Preise in Schweizer Franken.

export type LevelId = "calanda" | "kesch" | "palu" | "bernina";

export interface Level {
  id: LevelId;
  name: string;
  /** Gipfel, nach dem das Level benannt ist. */
  peak: string;
  /** 1 = tiefstes Level, 4 = höchstes. */
  rank: 1 | 2 | 3 | 4;
  monthlyChf: number;
  /** Farbe des Diamanten auf der Member-Karte. */
  diamond: string;
  /** Was dieses Level zusätzlich zu den Levels darunter bringt. */
  adds: string;
}

export const LEVELS: readonly Level[] = [
  {
    id: "calanda",
    name: "Calanda",
    peak: "Calanda, Hausberg von Chur",
    rank: 1,
    monthlyChf: 25,
    diamond: "Weiss",
    adds: "Quartalstreffen",
  },
  {
    id: "kesch",
    name: "Kesch",
    peak: "Piz Kesch",
    rank: 2,
    monthlyChf: 50,
    diamond: "Champagner",
    adds: "1 Gast pro Quartalstreffen",
  },
  {
    id: "palu",
    name: "Palü",
    peak: "Piz Palü",
    rank: 3,
    monthlyChf: 100,
    diamond: "Blau",
    adds: "Vorrang bei der Buchung",
  },
  {
    id: "bernina",
    name: "Bernina",
    peak: "Piz Bernina, höchster Gipfel Graubündens",
    rank: 4,
    monthlyChf: 250,
    diamond: "Schwarz",
    adds: "Ultra-Event am 18. Juni",
  },
];

/** Reines Status-Abzeichen: einmalig, ohne Event-Zugang. */
export const SOLITAIRE = { name: "Solitaire", onceChf: 999 } as const;

/** Mindestlaufzeit aller Abo-Levels in Monaten. */
export const COMMITMENT_MONTHS = 12;

export const BERNINA = {
  /** Höchstens so viele Mitglieder gleichzeitig. */
  maxSeats: 50,
  /** Die ersten Plätze gehen ohne Einladung an die Schnellsten. */
  openSeats: 20,
  /** Einladungen, die ein Bernina-Mitglied pro Jahr vergeben darf. */
  invitesPerYear: 2,
  /** Anteil des Bernina-Preises, den ein Platz auf der Warteliste kostet. */
  waitlistShare: 0.5,
} as const;

export function getLevel(id: LevelId): Level {
  const level = LEVELS.find((l) => l.id === id);
  if (!level) throw new Error(`Unbekanntes Level: ${id}`);
  return level;
}

export function yearlyChf(id: LevelId): number {
  return getLevel(id).monthlyChf * 12;
}

export function waitlistMonthlyChf(): number {
  return getLevel("bernina").monthlyChf * BERNINA.waitlistShare;
}

export function formatChf(amount: number): string {
  return `CHF ${amount.toLocaleString("de-CH")}`;
}
