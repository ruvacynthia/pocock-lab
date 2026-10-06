// Summaries of ride rows: [{ date, city, rides }, ...] with rides as strings or numbers.

export function totalRides(rows) {
  return rows.reduce((sum, row) => sum + Number(row.rides), 0);
}

// Total rides per city, sorted by city name.
export function ridesByCity(rows) {
  const totals = new Map();
  for (const row of rows) {
    totals.set(row.city, (totals.get(row.city) ?? 0) + Number(row.rides));
  }
  return [...totals.entries()]
    .map(([city, rides]) => ({ city, rides }))
    .sort((a, b) => a.city.localeCompare(b.city));
}

// Daily total: rides across all cities on each date, sorted by date.
export function dailyTotals(rows) {
  const totals = new Map();
  for (const row of rows) {
    totals.set(row.date, (totals.get(row.date) ?? 0) + Number(row.rides));
  }
  return [...totals.entries()]
    .map(([date, rides]) => ({ date, rides }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
