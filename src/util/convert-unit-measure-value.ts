export const convertUnitMeasureValue = (value: number): number => {
  const convertedValue = value * 0.1;
  return Number(convertedValue.toFixed(2));
};
