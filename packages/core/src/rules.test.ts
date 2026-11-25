import { describe, expect, it } from "vitest";
import {
  BERNINA,
  LEVELS,
  SOLITAIRE,
  berninaDecision,
  canAttend,
  canContact,
  canInvite,
  canSee,
  formatChf,
  guestsAllowed,
  hasPriorityBooking,
  seatFreeOn,
  waitlistMonthlyChf,
  yearlyChf,
  type LevelId,
  type Member,
} from "./index";

const member = (level: LevelId | null, solitaire = false): Member => ({ level, solitaire });
const ids = LEVELS.map((l) => l.id);

describe("Levels und Preise", () => {
  it("hat vier Levels in aufsteigender Reihenfolge und mit steigendem Preis", () => {
    expect(ids).toEqual(["calanda", "kesch", "palu", "bernina"]);
    expect(LEVELS.map((l) => l.rank)).toEqual([1, 2, 3, 4]);
    expect(LEVELS.map((l) => l.monthlyChf)).toEqual([25, 50, 100, 250]);
  });

  it("rechnet Jahrespreis, Warteliste und Solitaire in Franken", () => {
    expect(yearlyChf("bernina")).toBe(3000);
    expect(waitlistMonthlyChf()).toBe(125);
    expect(SOLITAIRE.onceChf).toBe(999);
    expect(formatChf(250)).toBe("CHF 250");
  });
});

describe("Sichtbarkeit nur nach unten", () => {
  it("zeigt jedem Level sich selbst und alle darunter, nie darüber", () => {
    for (const viewer of LEVELS) {
      for (const target of LEVELS) {
        expect(canSee(member(viewer.id), member(target.id))).toBe(viewer.rank >= target.rank);
      }
    }
  });

  it("zeigt Solitaire allen Mitgliedern, Solitaire selbst sieht niemanden", () => {
    const solitaire = member(null, true);
    for (const id of ids) {
      expect(canSee(member(id), solitaire)).toBe(true);
      expect(canSee(solitaire, member(id))).toBe(false);
    }
    expect(canSee(solitaire, solitaire)).toBe(false);
  });

  it("zeigt niemanden, der weder Level noch Solitaire hat", () => {
    expect(canSee(member("bernina"), member(null, false))).toBe(false);
  });
});

describe("Direktkontakt", () => {
  it("erlaubt Anschreiben nur nach unten oder im eigenen Level", () => {
    expect(canContact(member("palu"), member("calanda"))).toBe(true);
    expect(canContact(member("palu"), member("palu"))).toBe(true);
    expect(canContact(member("calanda"), member("palu"))).toBe(false);
  });

  it("erlaubt Antworten immer, auch nach oben und für Solitaire", () => {
    expect(canContact(member("calanda"), member("bernina"), true)).toBe(true);
    expect(canContact(member(null, true), member("bernina"), true)).toBe(true);
    expect(canContact(member(null, true), member("bernina"))).toBe(false);
  });
});

describe("Events", () => {
  it("lässt alle vier Levels ans Quartalstreffen, nur Bernina ans Ultra-Event", () => {
    for (const id of ids) {
      expect(canAttend(member(id), "quarterly")).toBe(true);
      expect(canAttend(member(id), "ultra")).toBe(id === "bernina");
    }
  });

  it("gibt Solitaire keinen Event-Zugang", () => {
    expect(canAttend(member(null, true), "quarterly")).toBe(false);
    expect(canAttend(member(null, true), "ultra")).toBe(false);
  });

  it("erlaubt ab Kesch einen Gast und ab Palü Vorrang", () => {
    expect(ids.map(guestsAllowed)).toEqual([0, 1, 1, 1]);
    expect(ids.map(hasPriorityBooking)).toEqual([false, false, true, true]);
  });
});

describe("Bernina-Kontingent", () => {
  const nobody = { hasInvite: false, founderApproved: false };

  it("gibt die ersten 20 Plätze ohne Einladung frei", () => {
    expect(berninaDecision({ activeMembers: 0, everSold: 0 }, nobody)).toBe("open");
    expect(berninaDecision({ activeMembers: 19, everSold: 19 }, nobody)).toBe("open");
  });

  it("verlangt ab Platz 21 eine Einladung oder die Freigabe des Gründers", () => {
    const state = { activeMembers: 20, everSold: 20 };
    expect(berninaDecision(state, nobody)).toBe("invite-only");
    expect(berninaDecision(state, { hasInvite: true, founderApproved: false })).toBe("allowed");
    expect(berninaDecision(state, { hasInvite: false, founderApproved: true })).toBe("allowed");
  });

  it("öffnet die ersten 20 nicht wieder, wenn später Plätze frei werden", () => {
    expect(berninaDecision({ activeMembers: 12, everSold: 31 }, nobody)).toBe("invite-only");
  });

  it("lässt bei 50 Mitgliedern niemanden mehr kaufen, auch nicht mit Einladung", () => {
    const full = { activeMembers: BERNINA.maxSeats, everSold: 50 };
    expect(berninaDecision(full, { hasInvite: true, founderApproved: true })).toBe("waitlist");
  });

  it("erlaubt höchstens zwei Einladungen pro Jahr und nur Bernina-Mitgliedern", () => {
    expect(canInvite(member("bernina"), 0)).toBe(true);
    expect(canInvite(member("bernina"), 1)).toBe(true);
    expect(canInvite(member("bernina"), 2)).toBe(false);
    expect(canInvite(member("palu"), 0)).toBe(false);
  });

  it("gibt den Platz erst am Ende der Bindung frei, nicht bei der Kündigung", () => {
    const end = new Date("2027-06-30");
    expect(seatFreeOn(end, new Date("2027-01-15"))).toEqual(end);
    const late = new Date("2027-09-01");
    expect(seatFreeOn(end, late)).toEqual(late);
  });
});
