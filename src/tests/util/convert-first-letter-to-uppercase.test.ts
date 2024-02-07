import { convertFirstLetterToUppercase } from "../../util/convert-first-letter-to-uppercase";

describe("Should test convertFirstLetterToUppercase function", () => {
  it("Should convert the first letter to uppercase", () => {
    const stringToBeConverted = "pokémon";

    const result = convertFirstLetterToUppercase(stringToBeConverted);

    expect(result).toBe("Pokémon");
  });

  it("Should return the same string if it's already in uppercase", () => {
    const stringToBeConverted = "Pokémon";

    const result = convertFirstLetterToUppercase(stringToBeConverted);

    expect(result).toBe("Pokémon");
  });

  it("Should return an empty string if the input is an empty string", () => {
    const stringToBeConverted = "";

    const result = convertFirstLetterToUppercase(stringToBeConverted);

    expect(result).toBe("");
  });

  it("Should return a uppercase string if the input has only one letter", () => {
    const stringToBeConverted = "p";

    const result = convertFirstLetterToUppercase(stringToBeConverted);

    expect(result).toBe("P");
  });

  it("Should return an empty string if the input is not a string", () => {
    const stringToBeConverted = 123;

    // @ts-ignore
    const result = convertFirstLetterToUppercase(stringToBeConverted);

    expect(result).toBe("");
  });
});
