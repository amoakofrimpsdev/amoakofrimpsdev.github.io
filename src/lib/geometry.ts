/** 2D geometry behind the Prime Engine demo: AABB overlap and frustum culling. */

export type AABB = { x: number; y: number; w: number; h: number };
export type Vec = { x: number; y: number };

/** A half plane: points p with dot(n, p - o) >= 0 are inside. */
export type Plane = { o: Vec; n: Vec };

/** Two axis aligned boxes overlap only if they overlap on every axis. */
export const aabbOverlap = (a: AABB, b: AABB) =>
  a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

/**
 * The side planes and far plane of a 2D view frustum, with inward normals.
 * `dir` is the view direction in radians, `fov` the full opening angle.
 */
export function frustumPlanes(eye: Vec, dir: number, fov: number, far: number): Plane[] {
  const left = dir - fov / 2;
  const right = dir + fov / 2;
  return [
    // Rotating an edge direction by +90 degrees or -90 degrees gives the inward normal.
    { o: eye, n: { x: -Math.sin(left), y: Math.cos(left) } },
    { o: eye, n: { x: Math.sin(right), y: -Math.cos(right) } },
    {
      o: { x: eye.x + Math.cos(dir) * far, y: eye.y + Math.sin(dir) * far },
      n: { x: -Math.cos(dir), y: -Math.sin(dir) },
    },
  ];
}

/**
 * Conservative AABB against frustum test. For each plane, take the box corner
 * that lies furthest along the plane normal. If even that corner is outside,
 * the whole box is outside and can be skipped.
 */
export function aabbInFrustum(box: AABB, planes: Plane[]): boolean {
  for (const { o, n } of planes) {
    const px = n.x >= 0 ? box.x + box.w : box.x;
    const py = n.y >= 0 ? box.y + box.h : box.y;
    if (n.x * (px - o.x) + n.y * (py - o.y) < 0) return false;
  }
  return true;
}
