import axios from "axios";
import pokemonSchema from "../pokemon.schema";
import { BasicInformation } from "../../types/pokemonBasicInformation";
import { BaseStats } from "../../types/pokemonBaseStats";
import { Pokemon } from "../../types/pokemon.type";
import { PokemonResponse } from "../../types/responses/pokemon-response.type";
import { PokemonTypes } from "../../types/pokemon-types.type";
import { PokemonUrlResponse } from "../../types/responses/pokemon-url-response.type";
import { FETCH_LIMIT_POKEMONS } from "../../constants/fetch-limit-pokemons";
import { convertUnitMeasureValue } from "../../util/convert-unit-measure-value";
import { convertFirstLetterToUppercase } from "../../util/convert-first-letter-to-uppercase";
import { PokemonSpeciesService } from "../../pokemon-species/pokemon-species.service";

type StatsReduce = {
  [key: string]: number;
};

export class CreatePokemonService {
  public async createPokemon(): Promise<void> {
    const pokemon = await this.fetchPokemonData();

    await pokemonSchema.create(pokemon);
  }

  private async fetchPokemonData(): Promise<Pokemon[]> {
    const pokemonsUrl = await this.getAllPokemonUrl();

    const pokemon = pokemonsUrl.map(
      async (pokemon: PokemonUrlResponse) =>
        await this.handlePokemonData(pokemon),
    );

    return await Promise.all(pokemon);
  }

  private getAllPokemonUrl = async (): Promise<PokemonUrlResponse[]> =>
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${FETCH_LIMIT_POKEMONS}`)
      .then(({ data: { results } }) => results);

  private async handlePokemonData({
    url,
  }: PokemonUrlResponse): Promise<Pokemon> {
    const response: PokemonResponse = await axios
      .get(url)
      .then(({ data }) => data);

    const basicInformation = await this.buildPokemonBasicInformation(response);
    const baseStats = this.buildPokemonBaseStats(response);

    return {
      basicInformation,
      baseStats,
    };
  }

  private async buildPokemonBasicInformation({
    id,
    name,
    types,
    sprites: { other },
    weight,
    height,
    abilities,
  }: PokemonResponse): Promise<BasicInformation> {
    const pokedexNumber = this.addHashtagsAndZerosInPokedexNumber(id);
    const pokemonTypes = this.getPokemonTypes(types);
    const pokemonAbilities = this.getPokemonAbilities(abilities);
    const { flavor_text_entries } =
      await new PokemonSpeciesService().fetchPokemonSpeciesById(id.toString());

    return {
      index: id,
      name,
      pokedexNumber,
      image: other["official-artwork"].front_default,
      pokemonTypes,
      weight: convertUnitMeasureValue(weight),
      height: convertUnitMeasureValue(height),
      abilities: pokemonAbilities,
      description: flavor_text_entries[0].flavor_text,
    };
  }

  private addHashtagsAndZerosInPokedexNumber = (
    pokedexNumber: number,
  ): string => {
    const pokedexNumberIsPositive = pokedexNumber >= 0;

    if (
      typeof pokedexNumber !== "number" ||
      !pokedexNumberIsPositive ||
      !pokedexNumber
    )
      return "#000";

    const convertPokedexNumberToString = pokedexNumber.toString();
    const addZerosBeforeString = convertPokedexNumberToString.padStart(3, "0");

    return `#${addZerosBeforeString}`;
  };

  private getPokemonTypes = (types: PokemonResponse["types"]): PokemonTypes[] =>
    types.map(({ type: { name } }) => {
      return name;
    });

  private getPokemonAbilities = (
    abilities: PokemonResponse["abilities"],
  ): string[] =>
    abilities.map(({ ability: { name } }) =>
      convertFirstLetterToUppercase(name),
    );

  private buildPokemonBaseStats({ stats }: PokemonResponse): BaseStats {
    const pokemonBaseStats = stats.reduce(
      (acc, { base_stat, stat: { name } }) => {
        if (name === "special-attack") acc["special_attack"] = base_stat;

        if (name === "special-defense") acc["special_defense"] = base_stat;

        acc[name] = base_stat;

        return acc;
      },
      {} as StatsReduce,
    );

    return pokemonBaseStats as BaseStats;
  }
}
