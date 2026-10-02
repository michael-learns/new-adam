import "server-only";

import type { EventDetails } from "@/content/events/types";

export type SeatCount = { total: number; taken: number; left: number; updatedAt: string };

/** Minimal CSV parser: handles quoted fields, escaped quotes and newlines in quotes. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else field += c;
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

/**
 * Seats taken, from a registrations sheet: the first row is the header, each
 * following row is one registration. Rows missing the required column (e.g. no
 * name) are skipped. A numeric seats column is summed; anything else counts as
 * 1 seat. Rows with an ignored status (e.g. "Cancelled") don't count.
 */
export function countSeats(csv: string, sheet: EventDetails["seatsSheet"]): number {
  const [header, ...rows] = parseCsv(csv);
  if (!header) return 0;
  const norm = (s: string) => s.trim().toLowerCase();
  const find = (name?: string) => (name ? header.findIndex((h) => norm(h) === norm(name)) : -1);
  const seatsCol = find(sheet.seatsColumn);
  const requiredCol = find(sheet.requiredColumn);
  const statusCol = find(sheet.statusColumn ?? "Status");
  const ignore = (sheet.ignoreStatuses ?? []).map(norm);

  return rows.reduce((sum, row) => {
    if (requiredCol >= 0 && !(row[requiredCol] ?? "").trim()) return sum;
    const status = statusCol >= 0 ? norm(row[statusCol] ?? "") : "";
    if (status && ignore.some((word) => status.includes(word))) return sum;
    if (seatsCol < 0) return sum + 1;
    const n = Number.parseInt((row[seatsCol] ?? "").replace(/[^\d]/g, ""), 10);
    return sum + (Number.isFinite(n) && n > 0 ? n : 1);
  }, 0);
}

/** Live seat count for an event, or null when no sheet is connected or it can't be read. */
export async function getSeatCount(event: EventDetails): Promise<SeatCount | null> {
  const url = process.env[event.seatsSheet.env];
  if (!url) return null;
  try {
    // Cached for 30 seconds across visitors so traffic spikes don't hit Google.
    const res = await fetch(url, { next: { revalidate: 30 } });
    if (!res.ok) return null;
    const taken = countSeats(await res.text(), event.seatsSheet);
    return {
      total: event.seats,
      taken,
      left: Math.max(0, event.seats - taken),
      updatedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}
