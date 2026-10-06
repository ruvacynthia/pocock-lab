// Geometry for inline SVG charts. Knows nothing about rides: it takes plain
// numbers for values and ISO dates (YYYY-MM-DD) for the horizontal axis.

// x position of the i-th of `count` items spread evenly across the width; a lone
// item sits at the left edge.
function xAt(i, count, width) {
  return count === 1 ? 0 : (i * width) / (count - 1);
}

// Points for an SVG polyline: values spread evenly across the width in order,
// the largest value at the top (y = 0) and the smallest at the bottom. Equal
// values sit across the vertical middle. A single value is repeated so the
// stroke has a zero-length segment to cap into a dot. yLabels mark the largest and
// smallest values where the line draws them, or the one value when all are equal.
export function linePoints(values, width, height) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const yAt = (value) => (max === min ? height / 2 : height - ((value - min) / (max - min)) * height);
  const line = values.map((value, i) => `${xAt(i, values.length, width)},${yAt(value)}`);
  const points = (values.length === 1 ? [line[0], line[0]] : line).join(" ");
  const labelled = values.length === 0 ? [] : max === min ? [max] : [max, min];
  const yLabels = labelled.map((value) => ({ value, y: yAt(value) }));
  return { points, min, max, yLabels };
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
