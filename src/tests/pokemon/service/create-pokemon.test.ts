import { describe } from "@jest/globals";
import { CreatePokemonService } from "../../../pokemon/service/create-pokemon.service";

describe("Should test CreatePokemonService class", () => {
  let createPokemonService: CreatePokemonService;

  beforeAll(() => (createPokemonService = new CreatePokemonService()));

  // addHashtagsAndZerosInPokedexNumber
  it("Should return a number converted with string and # before the numbers", () => {
    const pokedexNumber = 15;

    const result =
      createPokemonService["addHashtagsAndZerosInPokedexNumber"](pokedexNumber);

    expect(result).toBe("#015");
  });

  it("Should return a #000 if pokedexNumber inst a number", () => {
    const pokedexNumber = "charizard";

    const result =
      // @ts-ignore
      createPokemonService["addHashtagsAndZerosInPokedexNumber"](pokedexNumber);

    expect(result).toBe("#000");
  });

  it("Should return a #000 if pokedexNumber is a negative number", () => {
    const pokedexNumber = -1;

    const result =
      createPokemonService["addHashtagsAndZerosInPokedexNumber"](pokedexNumber);

    expect(result).toBe("#000");
  });
});
