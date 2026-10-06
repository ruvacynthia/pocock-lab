// Geometry for inline SVG charts. Knows nothing about rides; takes plain numbers.

// Points for an SVG polyline: values spread evenly across the width in order,
// the largest value at the top (y = 0) and the smallest at the bottom.
export function linePoints(values, width, height) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const step = width / (values.length - 1);
  const points = values
    .map((value, i) => `${i * step},${height - ((value - min) / (max - min)) * height}`)
    .join(" ");
  return { points, min, max };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Ticks at the first plotted date of each month in ISO dates (YYYY-MM-DD), placed
// with the same even spacing as linePoints so they line up with the line. A month
// the series starts partway through gets no tick.
export function monthTicks(dates, width) {
  const step = width / (dates.length - 1);
  return dates
    .map((date, i) => ({ date, x: i * step }))
    .filter(({ date }, i) =>
      i === 0 ? date.slice(8) === "01" : date.slice(0, 7) !== dates[i - 1].slice(0, 7),
    )
    .map(({ date, x }) => ({ x, label: MONTHS[Number(date.slice(5, 7)) - 1] }));
}
