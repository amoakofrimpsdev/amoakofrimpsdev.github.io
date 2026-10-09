import assert from "node:assert/strict";
import { test } from "node:test";
import { levelPart, scoreJob, skillsPart, type MatchInput } from "./match.ts";

const asked = ["TypeScript", "React", "Next.js", "CSS", "Testing", "GraphQL", "Node.js", "AWS"];
const base: MatchInput = {
  roleFit: "exact",
  asked,
  have: new Set(asked),
  yearsMin: 2,
  years: 3,
  needsSponsorship: false,
  noSponsorship: false,
};

test("a perfect profile scores 100", () => {
  assert.equal(scoreJob(base).score, 100);
});

test("the same inputs always give the same score", () => {
  assert.deepEqual(scoreJob(base), scoreJob({ ...base, have: new Set(asked) }));
});

test("the first five skills count double", () => {
  // 13 weight in total: five skills at 2, three at 1.
  assert.equal(skillsPart(asked, new Set(["TypeScript"])).score, Math.round((100 * 2) / 13));
  assert.equal(skillsPart(asked, new Set(["AWS"])).score, Math.round((100 * 1) / 13));
});

test("a posting that names fewer than three skills is not scored on skills", () => {
  assert.equal(skillsPart(["React", "CSS"], new Set(["React"])).score, null);
});

test("an unstated part counts as a middling 60", () => {
  const r = scoreJob({ ...base, asked: [], yearsMin: null });
  assert.equal(r.score, Math.round(100 * 0.45 + 60 * 0.35 + 60 * 0.2));
});

test("level drops by 20 for each year short", () => {
  assert.deepEqual([3, 2, 1, 0].map((y) => levelPart(3, y).score), [100, 80, 60, 40]);
});

test("a different kind of work is held at 55 no matter the skills", () => {
  const r = scoreJob({ ...base, roleFit: "different" });
  assert.equal(r.score, 55);
  assert.match(r.cap ?? "", /different kind of work/);
});

test("a posting that rules out sponsorship is held at 20 for someone who needs it", () => {
  const r = scoreJob({ ...base, needsSponsorship: true, noSponsorship: true });
  assert.equal(r.score, 20);
  assert.equal(scoreJob({ ...base, needsSponsorship: false, noSponsorship: true }).score, 100);
});
