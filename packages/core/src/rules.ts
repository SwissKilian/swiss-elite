// Die Regeln des Clubs als geprüfte Logik (docs/konzept.md, ADR 0002 und 0003).
// In Phase 1 (ohne Login, ADR 0005) wendet der Gründer sie von Hand an. Sobald es
// einen Mitgliederbereich gibt, setzt der Server sie mit genau diesen Funktionen durch.
import { BERNINA, getLevel, type LevelId } from "./levels";

export interface Member {
  /** Abo-Level, oder null für jemanden, der nur das Abzeichen Solitaire besitzt. */
  level: LevelId | null;
  solitaire: boolean;
}

const rank = (id: LevelId): number => getLevel(id).rank;

/** Sichtbarkeit nur nach unten: eigenes Level und alle darunter. */
export function canSee(viewer: Member, target: Member): boolean {
  // Wer nur Solitaire hat, sieht niemanden.
  if (viewer.level === null) return false;
  // Wer nur Solitaire hat, wird von allen Mitgliedern gesehen.
  if (target.level === null) return target.solitaire;
  return rank(viewer.level) >= rank(target.level);
}

/** Anschreiben darf, wer das Profil sieht. Antworten geht immer. */
export function canContact(sender: Member, recipient: Member, isReply = false): boolean {
  if (isReply) return true;
  return canSee(sender, recipient);
}

export type EventKind = "quarterly" | "ultra";

/** Quartalstreffen für alle vier Levels, das Ultra-Event nur für Bernina. */
export function canAttend(member: Member, event: EventKind): boolean {
  if (member.level === null) return false;
  return event === "ultra" ? member.level === "bernina" : true;
}

/** Ab Kesch ein Gast pro Quartalstreffen. */
export function guestsAllowed(level: LevelId): number {
  return rank(level) >= rank("kesch") ? 1 : 0;
}

/** Palü und Bernina buchen vor den anderen. */
export function hasPriorityBooking(level: LevelId): boolean {
  return rank(level) >= rank("palu");
}

export interface BerninaState {
  /** Aktive Bernina-Mitglieder, inklusive Gekündigter bis zum Ende ihrer Bindung. */
  activeMembers: number;
  /** Wie viele Bernina-Plätze je verkauft wurden. */
  everSold: number;
}

export interface BerninaApplicant {
  hasInvite: boolean;
  founderApproved: boolean;
}

export type BerninaDecision = "open" | "allowed" | "invite-only" | "waitlist";

/**
 * Darf jemand Bernina kaufen?
 * - "waitlist": 50 Plätze besetzt, es bleibt nur die Warteliste.
 * - "open": einer der ersten 20 Plätze, ohne Einladung.
 * - "allowed": gültige Einladung oder Freigabe durch den Gründer.
 * - "invite-only": Platz frei, aber weder Einladung noch Freigabe.
 */
export function berninaDecision(state: BerninaState, applicant: BerninaApplicant): BerninaDecision {
  if (state.activeMembers >= BERNINA.maxSeats) return "waitlist";
  if (state.everSold < BERNINA.openSeats) return "open";
  if (applicant.hasInvite || applicant.founderApproved) return "allowed";
  return "invite-only";
}

/** Höchstens zwei Einladungen pro Bernina-Mitglied und Jahr. */
export function canInvite(member: Member, invitesThisYear: number): boolean {
  return member.level === "bernina" && invitesThisYear < BERNINA.invitesPerYear;
}

/**
 * Ein Bernina-Platz wird frei am Ende der Bindung, nicht bei der Kündigung.
 * Liefert das Datum, an dem der Platz frei wird.
 */
export function seatFreeOn(commitmentEnd: Date, cancelledOn: Date): Date {
  return cancelledOn > commitmentEnd ? cancelledOn : commitmentEnd;
}
