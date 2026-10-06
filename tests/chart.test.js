import { test } from "node:test";
import assert from "node:assert/strict";
import { linePoints, monthTicks } from "../site/src/chart.js";

test("linePoints spreads values across the width with max at the top and min at the bottom", () => {
  assert.equal(linePoints([10, 30, 20], 100, 50).points, "0,50 50,0 100,25");
});

test("linePoints returns the smallest and largest values it scaled to", () => {
  const { min, max } = linePoints([310, 469, 400], 600, 200);
  assert.equal(min, 310);
  assert.equal(max, 469);
});

test("monthTicks marks the first date of each month at its position along the line", () => {
  assert.deepEqual(monthTicks(["2026-07-01", "2026-07-02", "2026-08-01"], 100), [
    { x: 0, label: "Jul" },
    { x: 100, label: "Aug" },
  ]);
});

test("monthTicks marks a month at its first plotted date when the 1st is missing", () => {
  assert.deepEqual(monthTicks(["2026-07-01", "2026-07-31", "2026-08-02"], 100), [
    { x: 0, label: "Jul" },
    { x: 100, label: "Aug" },
  ]);
});

test("monthTicks skips a month the series starts partway through", () => {
  assert.deepEqual(monthTicks(["2026-07-15", "2026-07-31", "2026-08-01"], 100), [
    { x: 100, label: "Aug" },
  ]);
});

test("monthTicks labels months across a year boundary", () => {
  assert.deepEqual(monthTicks(["2026-12-30", "2026-12-31", "2027-01-01"], 100), [
    { x: 100, label: "Jan" },
  ]);
  assert.deepEqual(monthTicks(["2026-07-01", "2027-07-01"], 100), [
    { x: 0, label: "Jul" },
    { x: 100, label: "Jul" },
  ]);
});

test("linePoints draws equal values as a flat line across the vertical middle", () => {
  assert.equal(linePoints([400, 400, 400], 100, 50).points, "0,25 50,25 100,25");
});

test("linePoints puts a single value at the left edge, vertically centred", () => {
  assert.equal(linePoints([400], 100, 50).points, "0,25");
});

test("linePoints returns no points for an empty series", () => {
  assert.equal(linePoints([], 100, 50).points, "");
});

test("monthTicks puts a lone first-of-month date at the left edge", () => {
  assert.deepEqual(monthTicks(["2026-07-01"], 100), [{ x: 0, label: "Jul" }]);
});
