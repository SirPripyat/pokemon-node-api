import { describe } from "@jest/globals";
import { PokemonSpeciesService } from "../../../pokemon-species/pokemon-species.service";

describe("Should test PokemonSpeciesService class", () => {
  let pokemonSpeciesService: PokemonSpeciesService;

  beforeEach(() => (pokemonSpeciesService = new PokemonSpeciesService()));

  // handlePokemonSpeciesUrl
  it("Should receive a url and return a pokemonId", () => {
    const url = "https://pokeapi.co/api/v2/pokemon-species/1/";

    const result = pokemonSpeciesService.handlePokemonSpeciesUrl(url);

    expect(result).toBe("1");
  });

  it("Should return a empty string when not receive a string as param", () => {
    const url = "";

    const result = pokemonSpeciesService.handlePokemonSpeciesUrl(url);

    expect(result).toBe("");
  });

  it("Should return a empty string when pokemonId isnt a number", () => {
    const url = "https://pokeapi.co/api/v2/pokemon-species/charizard/";

    const result = pokemonSpeciesService.handlePokemonSpeciesUrl(url);

    expect(result).toBe("");
  });
});
