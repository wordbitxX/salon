export const SLOT_TIMES = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"];
export const SUNDAY_TIMES = SLOT_TIMES.filter((t) => t >= "12:00" && t <= "19:00");
export function toMin(t: string) { const [h, m] = t.split(":").map(Number); return h * 60 + m; }
export function fmtTime(t: string) { const [h, m] = t.split(":").map(Number); const ap = h >= 12 ? "PM" : "AM"; return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${ap}`; }
export function genReference() { const c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; let s = ""; for (let i = 0; i < 6; i++) s += c[Math.floor(Math.random() * c.length)]; return `ELN-${s}`; }
/** Deterministic pseudo-bookings so the demo calendar looks realistically busy. */
export function demoBusy(staffSlug: string, date: string): string[] {
  let h = 0; for (const ch of staffSlug + date) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const busy: string[] = []; const n = 4 + (h % 5);
  for (let i = 0; i < n; i++) { h = (h * 1103515245 + 12345) >>> 0; busy.push(SLOT_TIMES[h % SLOT_TIMES.length]); }
  return busy;
}
export function computeSlots(opts: { date: string; duration: number; workingDays: number[]; existing: { time: string; durationMin: number }[]; staffSlug: string }) {
  const d = new Date(opts.date + "T00:00:00"); const dow = d.getDay();
  if (!opts.workingDays.includes(dow)) return { closed: true as const, slots: [] as { time: string; available: boolean }[] };
  const times = dow === 0 ? SUNDAY_TIMES : SLOT_TIMES; const closeAt = dow === 0 ? 20 * 60 : 21 * 60;
  const blocks = [...opts.existing.map((e) => ({ s: toMin(e.time), e: toMin(e.time) + e.durationMin })), ...demoBusy(opts.staffSlug, opts.date).map((t) => ({ s: toMin(t), e: toMin(t) + 60 }))];
  const now = new Date(); const isToday = opts.date === now.toISOString().slice(0, 10); const nowMin = now.getHours() * 60 + now.getMinutes();
  const slots = times.map((t) => { const s = toMin(t), e = s + opts.duration; const overlaps = blocks.some((b) => s < b.e && e > b.s); const past = isToday && s <= nowMin + 30; return { time: t, available: !overlaps && !past && e <= closeAt }; });
  return { closed: false as const, slots };
}
