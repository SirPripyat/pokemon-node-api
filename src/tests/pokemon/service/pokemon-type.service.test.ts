import { describe, expect, it } from "@jest/globals";
import { PokemonTypeService } from "../../../pokemon-type/pokemon-type.service";
import pokemonTypeSchema from "../../../pokemon-type/pokemon-type.schema";
import { DamageRelationsResponse } from "../../../types/responses/pokemon-type-response.type";

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

  // createPokemonType
  it("Should create the PokemonTypes and return an array of PokemonTypes", async () => {
    pokemonTypeService.createPokemonType = jest
      .fn()
      .mockReturnValue([mockPokemonType]);

    const valueReturn = await pokemonTypeService.createPokemonType();

    expect(valueReturn).toEqual([mockPokemonType]);
  });

  // getTypeDoubleDamageFrom
  it("Should return an array of PokemonTypes from doubleDamageFrom array", () => {
    const doubleDamageFrom: DamageRelationsResponse["double_damage_from"] = [
      {
        name: "flying",
        url: "https://pokeapi.co/api/v2/type/3/",
      },
      {
        name: "poison",
        url: "https://pokeapi.co/api/v2/type/4/",
      },
      {
        name: "bug",
        url: "https://pokeapi.co/api/v2/type/7/",
      },
      {
        name: "fire",
        url: "https://pokeapi.co/api/v2/type/10/",
      },
      {
        name: "ice",
        url: "https://pokeapi.co/api/v2/type/15/",
      },
    ];

    const result =
      pokemonTypeService["getTypeDoubleDamageFrom"](doubleDamageFrom);

    expect(result).toEqual(["flying", "poison", "bug", "fire", "ice"]);
  });

  it("Should return an empty array if doubleDamageFrom is empty", () => {
    const doubleDamageFrom: DamageRelationsResponse["double_damage_from"] = [];

    const result =
      pokemonTypeService["getTypeDoubleDamageFrom"](doubleDamageFrom);

    expect(result).toEqual([]);
  });

  it("Shound return an empty array if doubleDamageFrom is undefined", () => {
    // @ts-ignore
    const doubleDamageFrom: DamageRelationsResponse["double_damage_from"] =
      undefined;

    const result =
      pokemonTypeService["getTypeDoubleDamageFrom"](doubleDamageFrom);

    expect(result).toEqual([]);
  });

  // getPokemonWeakness
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
