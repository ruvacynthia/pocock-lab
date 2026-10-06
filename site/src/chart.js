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
