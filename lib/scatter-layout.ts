import type { CSSProperties } from "react";

type Cell = { row: number; column: number };

/**
 * Scattered grid placement: one item per row, stepping across the columns, with
 * a second item on every third row. Returns a cell per item, in item order; when
 * a row holds two items the earlier one takes the left cell, so reading order
 * runs top to bottom and left to right.
 */
export function buildScatter(count: number, columns: number): Cell[] {
  const cells: Cell[] = [];
  let row = 0;
  while (cells.length < count) {
    const first = (row * 2 + (row % 2)) % columns;
    if (row % 3 === 0 && cells.length + 1 < count) {
      let second = (first + 2) % columns;
      if (second === first) second = (first + 1) % columns;
      cells.push({ row, column: Math.min(first, second) }, { row, column: Math.max(first, second) });
    } else {
      cells.push({ row, column: first });
    }
    row += 1;
  }
  return cells;
}

/** Tiles in the left half grow from their inner (right) corner, and vice versa. */
function origin(column: number, columns: number) {
  return column + 0.5 < columns / 2 ? "right bottom" : "left bottom";
}

/**
 * Placement for every breakpoint as custom properties (read by `.scatter-tile`
 * in globals.css): phones get one wide, alternating tile per row; then two,
 * three and four columns as the screen widens.
 */
export function scatterPlacements(count: number): CSSProperties[] {
  const layouts = { md: buildScatter(count, 2), lg: buildScatter(count, 3), xl: buildScatter(count, 4) };
  const columns = { md: 2, lg: 3, xl: 4 };

  return Array.from({ length: count }, (_, index) => {
    const leftOnPhone = index % 2 === 0;
    const style: Record<string, string | number> = {
      "--col-sm": leftOnPhone ? "1 / span 10" : "3 / span 10",
      "--row-sm": index + 1,
      "--origin-sm": leftOnPhone ? "right bottom" : "left bottom",
    };
    for (const size of ["md", "lg", "xl"] as const) {
      const cell = layouts[size][index];
      style[`--col-${size}`] = cell.column + 1;
      style[`--row-${size}`] = cell.row + 1;
      style[`--origin-${size}`] = origin(cell.column, columns[size]);
    }
    return style as CSSProperties;
  });
}
