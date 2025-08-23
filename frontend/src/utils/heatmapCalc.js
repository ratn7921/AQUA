// src/utils/heatmapCalc.js

/**
 * Given an array of { latitude, longitude } points,
 * returns a simple 2D grid of counts for heatmap overlays.
 *
 * @param {Array<{ latitude: number, longitude: number }>} points
 * @param {Object} bounds  { north, south, east, west }
 * @param {number} rows   number of grid rows
 * @param {number} cols   number of grid columns
 */
export function generateHeatmapGrid(points, bounds, rows = 50, cols = 50) {
  const { north, south, east, west } = bounds;
  const latStep = (north - south) / rows;
  const lonStep = (east - west) / cols;

  // initialize grid
  const grid = Array.from({ length: rows }, () => Array(cols).fill(0));

  points.forEach(({ latitude, longitude }) => {
    const row = Math.floor((north - latitude) / latStep);
    const col = Math.floor((longitude - west) / lonStep);
    if (row >= 0 && row < rows && col >= 0 && col < cols) {
      grid[row][col] += 1;
    }
  });

  return grid;
}

/**
 * Convert the 2D grid above into a flat array of
 * { x (col), y (row), value } for plotting libraries.
 */
export function gridToHeatmapPoints(grid) {
  const points = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      points.push({ x, y, value: grid[y][x] });
    }
  }
  return points;
}
