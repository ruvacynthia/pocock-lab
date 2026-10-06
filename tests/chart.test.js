import { test } from "node:test";
import assert from "node:assert/strict";
import { linePoints } from "../site/src/chart.js";

test("linePoints spreads values across the width with max at the top and min at the bottom", () => {
  assert.equal(linePoints([10, 30, 20], 100, 50).points, "0,50 50,0 100,25");
});

test("linePoints returns the smallest and largest values it scaled to", () => {
  const { min, max } = linePoints([310, 469, 400], 600, 200);
  assert.equal(min, 310);
  assert.equal(max, 469);
});
