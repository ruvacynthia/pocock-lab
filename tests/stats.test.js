import { test } from "node:test";
import assert from "node:assert/strict";
import { totalRides, ridesByCity, dailyTotals } from "../site/src/stats.js";

const rows = [
  { date: "2026-07-01", city: "Miami", rides: "10" },
  { date: "2026-07-01", city: "Boston", rides: "20" },
  { date: "2026-07-02", city: "Boston", rides: 30 },
];

test("totalRides sums the rides column", () => {
  assert.equal(totalRides(rows), 60);
});

test("ridesByCity totals per city in alphabetical order", () => {
  assert.deepEqual(ridesByCity(rows), [
    { city: "Boston", rides: 50 },
    { city: "Miami", rides: 10 },
  ]);
});

test("dailyTotals sums every city's rides for each date", () => {
  assert.deepEqual(
    dailyTotals([
      { date: "2026-07-01", city: "Boston", rides: "20" },
      { date: "2026-07-01", city: "Miami", rides: 10 },
    ]),
    [{ date: "2026-07-01", rides: 30 }],
  );
});

test("dailyTotals lists dates in ascending order whatever the row order", () => {
  assert.deepEqual(
    dailyTotals([
      { date: "2026-07-03", city: "Boston", rides: "5" },
      { date: "2026-07-01", city: "Boston", rides: "7" },
      { date: "2026-07-02", city: "Boston", rides: "9" },
    ]),
    [
      { date: "2026-07-01", rides: 7 },
      { date: "2026-07-02", rides: 9 },
      { date: "2026-07-03", rides: 5 },
    ],
  );
});

test("dailyTotals keeps a date where only some cities have rows", () => {
  assert.deepEqual(
    dailyTotals([
      { date: "2026-07-01", city: "Boston", rides: "20" },
      { date: "2026-07-01", city: "Denver", rides: "15" },
      { date: "2026-07-01", city: "Miami", rides: "10" },
      { date: "2026-07-02", city: "Denver", rides: "12" },
    ]),
    [
      { date: "2026-07-01", rides: 45 },
      { date: "2026-07-02", rides: 12 },
    ],
  );
});
