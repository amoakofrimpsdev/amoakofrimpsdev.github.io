/**
 * Zone based adaptive cruise control, re-created for the browser demo.
 *
 * The structure follows the original Python controller: the gap to the lead
 * vehicle selects a zone, and each zone has one simple rule. The thresholds
 * and gains below are illustrative values tuned for the demo, not the ones
 * used against CARLA.
 */

export const MIN_SAFE = 8; // m. Inside this, brake as hard as possible.
export const BRAKE_ZONE = 25; // m. Inside this, brake in proportion to the danger.
export const CAUTION_ZONE = 45; // m. Inside this, limit how hard we accelerate.

const HYSTERESIS = 1.5; // m. Applied only when leaving a zone outward.
const MAX_BRAKE = 8; // m/s^2
const ACCEL_LIMIT = 0.7; // m/s^2, the cap in the caution zone
const GUARD_THRESHOLD = 1; // m/s^2 of needed braking before the guard steps in
const GUARD_MARGIN = 1.3; // brake a little harder than the bare minimum

export type Zone = "failsafe" | "brake" | "limit" | "cruise";
export type Scenario = "steady" | "hardBrake" | "stopGo";

export type SimState = {
  t: number; // s
  gap: number; // m, ego front bumper to lead rear bumper
  v: number; // m/s, ego speed
  vLead: number; // m/s
  accel: number; // m/s^2, last command
  zone: Zone;
  travelled: number; // m, used to scroll the road
};

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

const ORDER: Zone[] = ["failsafe", "brake", "limit", "cruise"];
const UPPER: Record<Zone, number> = {
  failsafe: MIN_SAFE,
  brake: BRAKE_ZONE,
  limit: CAUTION_ZONE,
  cruise: Infinity,
};

/**
 * Pick the zone for a gap. Moving closer switches immediately, since that is
 * the safe direction. Moving away needs a small margin, which stops the
 * controller chattering at a boundary.
 */
export function zoneFor(gap: number, previous: Zone): Zone {
  const raw = ORDER.find((z) => gap < UPPER[z]) ?? "cruise";
  if (ORDER.indexOf(raw) <= ORDER.indexOf(previous)) return raw;
  return gap > UPPER[previous] + HYSTERESIS ? raw : previous;
}

/** One controller step: observation in, acceleration command and zone out. */
export function control(gap: number, v: number, vLead: number, vSet: number, previous: Zone) {
  const zone = zoneFor(gap, previous);
  const cruise = clamp(0.5 * (vSet - v), -3, 2.2);
  const closing = Math.max(0, v - vLead);

  let accel: number;
  switch (zone) {
    case "failsafe":
      accel = -MAX_BRAKE;
      break;
    case "brake":
      // Harder the deeper into the zone we are, and harder the faster the gap closes.
      accel = -clamp(0.25 * (BRAKE_ZONE - gap) + 0.9 * closing, 0, MAX_BRAKE);
      break;
    case "limit":
      accel = Math.min(cruise, ACCEL_LIMIT);
      break;
    default:
      accel = cruise;
  }

  // Closing speed guard. Fixed distance zones alone are not enough when the
  // lead vehicle is much slower: by the time the gap reaches the braking zone
  // there may be no room left to stop. So work out the deceleration needed to
  // stop closing before MIN_SAFE, and once that is more than a light touch,
  // brake at least that hard in any zone.
  if (zone !== "failsafe") {
    const needed = (closing * closing) / (2 * Math.max(gap - MIN_SAFE, 0.5));
    if (needed > GUARD_THRESHOLD) accel = Math.min(accel, -clamp(needed * GUARD_MARGIN, 0, MAX_BRAKE));
  }
  return { accel, zone };
}

/** Scripted lead vehicle behavior for each scenario. */
export function leadSpeed(scenario: Scenario, t: number): number {
  switch (scenario) {
    case "steady":
      return 20;
    case "hardBrake": {
      const c = t % 26;
      if (c < 10) return 24;
      if (c < 13) return 24 - (c - 10) * 6.5; // 6.5 m/s^2 for three seconds
      if (c < 18) return 4.5;
      return Math.min(24, 4.5 + (c - 18) * 3);
    }
    case "stopGo":
      return 12 + 9 * Math.sin(t * 0.45);
  }
}

export const initialState = (scenario: Scenario): SimState => ({
  t: 0,
  gap: 70,
  v: 18,
  vLead: leadSpeed(scenario, 0),
  accel: 0,
  zone: "cruise",
  travelled: 0,
});

/** Advance the simulation by dt seconds. Pure, so it can be tested without a browser. */
export function step(s: SimState, dt: number, scenario: Scenario, vSet: number): SimState {
  const vLead = leadSpeed(scenario, s.t + dt);
  const { accel, zone } = control(s.gap, s.v, vLead, vSet, s.zone);
  const v = Math.max(0, s.v + accel * dt);
  return {
    t: s.t + dt,
    gap: s.gap + (vLead - v) * dt,
    v,
    vLead,
    accel,
    zone,
    travelled: s.travelled + v * dt,
  };
}
