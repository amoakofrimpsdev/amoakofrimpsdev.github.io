/**
 * The RCW Media bot's schedule for one service, re-created for the browser demo.
 *
 * The timing rules come from the app's lib/domain/reminders.ts: the day's post
 * goes out at 7:00 AM, or two hours before a service that starts earlier than
 * 9:00 AM, and upload reminders go out 3 and 20 hours after the start, tagging
 * only people who have uploaded nothing. The people and uploads are made up.
 */

export const REMINDER_HOURS = [3, 20] as const;
export const HANDOFF_HOURS = 24;

export type Upload = { person: string; category: string; files: number; at: number };
export type Message =
  | { kind: "today"; at: number; service: string; covering: string[] }
  | { kind: "uploads"; at: number; service: string; lines: string[] }
  | { kind: "reminder"; at: number; tagged: string[] }
  | { kind: "ready"; at: number; category: string; team: string }
  | { kind: "late"; at: number; category: string; team: string };

/** Hours are measured from midnight on the service's day. */
export function dayPostAt(startHour: number): number {
  return Math.min(7, startHour - 2);
}

export type Scenario = {
  service: string;
  startHour: number;
  assigned: { person: string; category: string }[];
  handoffs: { category: string; team: string }[];
  uploads: Upload[]; // times are hours after the start
};

export const SUNDAY: Scenario = {
  service: "Sunday Service",
  startHour: 10,
  assigned: [
    { person: "Grace", category: "Fellowship" },
    { person: "Kofi", category: "Preacher" },
    { person: "Sam", category: "Videos" },
    { person: "Ama", category: "Baptism" },
  ],
  handoffs: [
    { category: "Baptism", team: "Social Media" },
    { category: "Videos", team: "Website" },
    { category: "Preacher", team: "Thumbnails" },
  ],
  uploads: [
    { person: "Grace", category: "Fellowship", files: 38, at: 1.5 },
    { person: "Kofi", category: "Preacher", files: 52, at: 2.25 },
    { person: "Sam", category: "Videos", files: 3, at: 6 },
    { person: "Ama", category: "Baptism", files: 24, at: 26 },
  ],
};

const fmtUpload = (u: Upload) => `${u.person} uploaded ${u.files} ${u.category === "Videos" ? "videos" : "photos"} to ${u.category}`;

/** Every message the bot would have posted by `now`, in hours from midnight. Pure, so it can be tested. */
export function messagesUntil(s: Scenario, now: number): Message[] {
  const start = s.startHour;
  const out: Message[] = [];
  const at = (h: number) => start + h;

  const dayPost = dayPostAt(start);
  if (now >= dayPost) {
    out.push({ kind: "today", at: dayPost, service: s.service, covering: s.assigned.map((a) => a.person) });
  }

  const done = s.uploads.filter((u) => at(u.at) <= now).sort((a, b) => a.at - b.at);
  // One running message per service, edited as each batch finishes.
  if (done.length) {
    out.push({ kind: "uploads", at: at(done[0].at), service: s.service, lines: done.map(fmtUpload) });
  }

  for (const h of REMINDER_HOURS) {
    if (now < at(h)) continue;
    const uploaded = new Set(s.uploads.filter((u) => u.at <= h).map((u) => u.person));
    const tagged = s.assigned.map((a) => a.person).filter((p) => !uploaded.has(p));
    // Nobody is nagged when everyone has uploaded.
    if (tagged.length) out.push({ kind: "reminder", at: at(h), tagged });
  }

  for (const h of s.handoffs) {
    const upload = s.uploads.find((u) => u.category === h.category);
    const deadline = at(HANDOFF_HOURS);
    if (upload && at(upload.at) <= now && upload.at <= HANDOFF_HOURS) {
      out.push({ kind: "ready", at: at(upload.at), category: h.category, team: h.team });
    } else if (now >= deadline && (!upload || upload.at > HANDOFF_HOURS)) {
      out.push({ kind: "late", at: deadline, category: h.category, team: h.team });
    }
  }

  return out.sort((a, b) => a.at - b.at);
}
