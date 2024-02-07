import { describe } from "@jest/globals";
import { CreatePokemonService } from "../../../pokemon/service/create-pokemon.service";
import { PokemonResponse } from "../../../types/responses/pokemon-response.type";
import { PokemonTypes } from "../../../types/pokemon-types.type";

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

  it("Should return a #000 if pokedexNumber is null", () => {
    const pokedexNumber = null;

    const result =
      // @ts-ignore
      createPokemonService["addHashtagsAndZerosInPokedexNumber"](pokedexNumber);

    expect(result).toBe("#000");
  });

  // getPokemonTypes
  it("Should return a array of PokemonTypes on receive a types object", () => {
    const types: PokemonResponse["types"] = [
      {
        type: {
          name: "fire",
          url: "",
        },
      },
      {
        type: {
          name: "grass",
          url: "",
        },
      },
      {
        type: {
          name: "bug",
          url: "",
        },
      },
    ];

    const result = createPokemonService["getPokemonTypes"](types);

    expect(result).toEqual(["fire", "grass", "bug"]);
  });

  it("Should return undefined when types isnt a Array", () => {
    const types = "fire";

    const result =
      // @ts-ignore
      createPokemonService["getPokemonTypes"](types);

    expect(result).toBeUndefined();
  });

  it("Should return undefined when types isnt received", () => {
    const types = null;

    const result =
      //@ts-ignore
      createPokemonService["getPokemonTypes"](types);

    expect(result).toBeUndefined();
  });
});
