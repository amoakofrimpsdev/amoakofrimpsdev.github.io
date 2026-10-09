import assert from "node:assert/strict";
import { test } from "node:test";
import { aabbInFrustum, aabbOverlap, frustumPlanes } from "./geometry.ts";

test("aabbOverlap requires overlap on both axes", () => {
  const a = { x: 0, y: 0, w: 10, h: 10 };
  assert.equal(aabbOverlap(a, { x: 5, y: 5, w: 10, h: 10 }), true);
  assert.equal(aabbOverlap(a, { x: 5, y: 20, w: 10, h: 10 }), false);
  assert.equal(aabbOverlap(a, { x: 10, y: 0, w: 10, h: 10 }), false, "touching edges do not overlap");
});

test("frustum keeps boxes in view and culls boxes behind or beside the camera", () => {
  // Camera at the origin looking along +x with a 60 degree field of view.
  const planes = frustumPlanes({ x: 0, y: 0 }, 0, Math.PI / 3, 100);
  assert.equal(aabbInFrustum({ x: 40, y: -5, w: 10, h: 10 }, planes), true, "straight ahead");
  assert.equal(aabbInFrustum({ x: -30, y: -5, w: 10, h: 10 }, planes), false, "behind");
  assert.equal(aabbInFrustum({ x: 10, y: 60, w: 10, h: 10 }, planes), false, "far to the side");
  assert.equal(aabbInFrustum({ x: 140, y: -5, w: 10, h: 10 }, planes), false, "past the far plane");
});

test("a box straddling a frustum edge is kept", () => {
  const planes = frustumPlanes({ x: 0, y: 0 }, 0, Math.PI / 3, 100);
  // At x = 50 the frustum edge sits near y = 28.9, so this box crosses it.
  assert.equal(aabbInFrustum({ x: 45, y: 24, w: 10, h: 10 }, planes), true);
});
