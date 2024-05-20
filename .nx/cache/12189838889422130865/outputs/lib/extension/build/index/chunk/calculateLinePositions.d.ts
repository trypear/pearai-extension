export type LinePosition = {
  start: number;
  end: number;
};
export declare function calculateLinePositions(
  lines: string[],
  lineSeparator: string
): LinePosition[];
