import { convertUnitMeasureValue } from "../../util/convert-unit-measure-value";

describe("Should test convertUnitMeasureValue function", () => {
  it("Should convert the unit measure value", () => {
    const valueToBeConverted = 123;

    const result = convertUnitMeasureValue(valueToBeConverted);

    expect(result).toBe(12.3);
  });

  it("Should return 0 if the input is 0", () => {
    const valueToBeConverted = 0;

    const result = convertUnitMeasureValue(valueToBeConverted);

    expect(result).toBe(0);
  });

  it("Should return 0 if the input is a negative number", () => {
    const valueToBeConverted = -123;

    const result = convertUnitMeasureValue(valueToBeConverted);

    console.log(result);

    expect(result).toBe(0);
  });

  it("Should return 0 if the input is not a number", () => {
    const valueToBeConverted = "123";

    // @ts-ignore
    const result = convertUnitMeasureValue(valueToBeConverted);

    expect(result).toBe(0);
  });
});
