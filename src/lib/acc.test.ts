import assert from "node:assert/strict";
import { test } from "node:test";
import {
  BRAKE_ZONE,
  CAUTION_ZONE,
  MIN_SAFE,
  control,
  initialState,
  step,
  zoneFor,
  type Scenario,
} from "./acc.ts";

const run = (scenario: Scenario, vSet: number, seconds = 180) => {
  let s = initialState(scenario);
  let minGap = Infinity;
  let maxV = 0;
  for (let i = 0; i < seconds * 60; i++) {
    s = step(s, 1 / 60, scenario, vSet);
    minGap = Math.min(minGap, s.gap);
    // The car starts at 18 m/s, so judge speed only after it has had time to settle.
    if (s.t > 20) maxV = Math.max(maxV, s.v);
  }
  return { minGap, maxV, final: s };
};

test("never collides with the lead vehicle in any scenario", () => {
  for (const scenario of ["steady", "hardBrake", "stopGo"] as const) {
    for (const vSet of [15, 22, 28, 32]) {
      const { minGap } = run(scenario, vSet);
      assert.ok(minGap > 0, `${scenario} at ${vSet} m/s closed to ${minGap.toFixed(2)} m`);
    }
  }
});

test("holds the set speed once settled", () => {
  const { maxV } = run("steady", 15);
  assert.ok(maxV <= 15.5, `reached ${maxV.toFixed(2)} m/s`);
});

test("settles behind a slower lead instead of at the set speed", () => {
  const { final } = run("steady", 30);
  assert.ok(Math.abs(final.v - final.vLead) < 1.5);
  assert.ok(final.gap > MIN_SAFE && final.gap < CAUTION_ZONE);
});

test("zones switch immediately when closing and with a margin when opening", () => {
  assert.equal(zoneFor(BRAKE_ZONE - 0.1, "limit"), "brake");
  assert.equal(zoneFor(BRAKE_ZONE + 0.5, "brake"), "brake");
  assert.equal(zoneFor(BRAKE_ZONE + 2, "brake"), "limit");
});

test("brakes early when closing fast, even outside the braking zone", () => {
  // 40 m out is the caution zone, but closing at 20 m/s leaves no room to wait.
  const { accel, zone } = control(40, 25, 5, 30, "cruise");
  assert.equal(zone, "limit");
  assert.ok(accel < -5, `only commanded ${accel.toFixed(2)} m/s^2`);
});

test("failsafe commands full braking", () => {
  const { accel, zone } = control(MIN_SAFE - 1, 20, 20, 30, "brake");
  assert.equal(zone, "failsafe");
  assert.equal(accel, -8);
});
