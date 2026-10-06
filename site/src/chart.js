// Geometry for inline SVG charts. Knows nothing about rides: it takes plain
// numbers for values and ISO dates (YYYY-MM-DD) for the horizontal axis.

// x position of the i-th of `count` items spread evenly across the width.
function xAt(i, count, width) {
  return (i * width) / (count - 1);
}

// Points for an SVG polyline: values spread evenly across the width in order,
// the largest value at the top (y = 0) and the smallest at the bottom.
export function linePoints(values, width, height) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const points = values
    .map((value, i) => `${xAt(i, values.length, width)},${height - ((value - min) / (max - min)) * height}`)
    .join(" ");
  return { points, min, max };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthOf = (date) => date.slice(0, 7);
const isFirstOfMonth = (date) => date.slice(8) === "01";
const monthName = (date) => MONTHS[Number(date.slice(5, 7)) - 1];

// Ticks at the first plotted date of each month, placed with the same spacing as
// linePoints so they line up with the line. A month the series starts partway
// through gets no tick.
export function monthTicks(dates, width) {
  return dates
    .map((date, i) => ({ date, x: xAt(i, dates.length, width) }))
    .filter(({ date }, i) => (i === 0 ? isFirstOfMonth(date) : monthOf(date) !== monthOf(dates[i - 1])))
    .map(({ date, x }) => ({ x, label: monthName(date) }));
}
