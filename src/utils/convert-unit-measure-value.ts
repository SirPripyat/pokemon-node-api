export const convertUnitMeasureValue = (value: number): number =>
  value >= 0 ? Number((value * 0.1).toFixed(2)) : 0;
