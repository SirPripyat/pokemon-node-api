export const convertUnitMeasureValue = (value: number): number => {
  const isValidInput = value >= 0 && typeof value === "number";
  if (!isValidInput) return 0;

  const convertedValue = (value * 0.1).toFixed(2);

  return Number(convertedValue);
};
