import { describe, expect, it } from "@jest/globals";
import { PokemonTypeService } from "../pokemon-type/pokemon-type.service";
import pokemonTypeSchema from "../pokemon-type/pokemon-type.schema";

describe("Should test PokemonTypeService class", () => {
  let pokemonTypeService: PokemonTypeService;

  beforeEach(() => {
    pokemonTypeService = new PokemonTypeService();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockPokemonType = {
    _id: "60f3e3e3e4f3f3f3f3f3f3f3",
    name: "fairy",
    weaknessess: ["poison", "steel"],
    __v: 0,
  };

  it("Should return an array of PokemonTypes", async () => {
    pokemonTypeService.createPokemonType = jest
      .fn()
      .mockReturnValue([mockPokemonType]);

    const valueReturn = await pokemonTypeService.createPokemonType();

    expect(valueReturn).toEqual([mockPokemonType]);
  });

  it("Should return the weaknesses for a given pokemon type", async () => {
    jest.spyOn(pokemonTypeSchema, "find").mockResolvedValue([mockPokemonType]);

    const typeId = "fairy";
    const result = await pokemonTypeService.getPokemonWeakness(typeId);

    expect(result).toEqual([mockPokemonType]);
    expect(pokemonTypeSchema.find).toHaveBeenCalledWith({ name: typeId });
  });

  it("Should return an empty array if typeId is empty", async () => {
    const typeId = "";

    // @ts-ignore
    const result = await pokemonTypeService.getPokemonWeakness(typeId);

    expect(result).toEqual([]);
  });

  it("Should return an empty array if typeId isnt a PokemonTypes", async () => {
    const typeId = "invalidType";

    // @ts-ignore
    const result = await pokemonTypeService.getPokemonWeakness(typeId);

    expect(result).toEqual([]);
  });
});
