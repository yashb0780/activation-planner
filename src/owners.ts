import { createContext, useContext } from "react";
import type { Item, Role, Side } from "./types";

// Owners are roles on the People list. An item stores role IDs; the names are
// looked up here, so renaming a role once renames it on every item.

/** Defaults when an item names no role for a side. */
export const DEFAULT_ROLE: Record<Side, string> = { us: "csm", customer: "technical_owner" };

export function rolesFor(item: Item, side: Side): string[] {
  return (side === "us" ? item.ours : item.theirs) ?? [DEFAULT_ROLE[side]];
}

export type RoleBook = Map<string, Role>;
export const RolesContext = createContext<RoleBook>(new Map());
export const useRoles = () => useContext(RolesContext);

/** The person's name, or "" when the role has nobody named. */
export const nameOf = (book: RoleBook, roleId: string) => book.get(roleId)?.name ?? "";
export const labelOf = (book: RoleBook, roleId: string) => book.get(roleId)?.label ?? roleId;

/** "Priya Raman", or "Security contact (not named)". */
export function displayName(book: RoleBook, roleId: string): string {
  return nameOf(book, roleId) || `${labelOf(book, roleId)} (not named)`;
}

/** Primary owner for one side, plus how many more. */
export function ownerLine(book: RoleBook, item: Item, side: Side): { primary: string; more: number } {
  const ids = rolesFor(item, side);
  if (ids.length === 0) return { primary: "Not named", more: 0 };
  return { primary: displayName(book, ids[0]!), more: ids.length - 1 };
}

/** Name for the avatar: the first owner on the side doing the work. "" when not named. */
export function primaryName(book: RoleBook, item: Item): string {
  const first = rolesFor(item, item.side)[0];
  return first ? nameOf(book, first) : "";
}
