import assert from "node:assert/strict";
import { test } from "node:test";
import { SUNDAY, dayPostAt, messagesUntil } from "./service-day.ts";

test("the day's post goes out at 7:00, or two hours before an early service", () => {
  assert.equal(dayPostAt(10), 7);
  assert.equal(dayPostAt(19), 7);
  assert.equal(dayPostAt(8), 6);
});

test("nothing is posted before the day's post", () => {
  assert.deepEqual(messagesUntil(SUNDAY, 6.9), []);
});

test("the first reminder tags only people with nothing uploaded", () => {
  const r = messagesUntil(SUNDAY, 10 + 3).find((m) => m.kind === "reminder");
  assert.ok(r && r.kind === "reminder");
  assert.deepEqual(r.tagged, ["Sam", "Ama"]);
});

test("the second reminder tags fewer people as uploads come in", () => {
  const reminders = messagesUntil(SUNDAY, 10 + 20).filter((m) => m.kind === "reminder");
  assert.equal(reminders.length, 2);
  assert.deepEqual(reminders[1].kind === "reminder" && reminders[1].tagged, ["Ama"]);
});

test("uploads are reported in one running message", () => {
  const ups = messagesUntil(SUNDAY, 10 + 7).filter((m) => m.kind === "uploads");
  assert.equal(ups.length, 1);
  assert.equal(ups[0].kind === "uploads" && ups[0].lines.length, 3);
});

test("a handoff that misses its 24 hour deadline is flagged late", () => {
  const late = messagesUntil(SUNDAY, 10 + 24).filter((m) => m.kind === "late");
  assert.deepEqual(late.map((m) => m.kind === "late" && m.category), ["Baptism"]);
});
