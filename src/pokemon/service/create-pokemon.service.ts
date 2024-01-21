import axios from "axios";
import { PokemonsUrlType } from "../../types/pokemonsUrl";
import pokemonSchema from "../pokemon.schema";
import { Pokemon } from "../../types/pokemon";
import { PokemonResponse } from "../../types/pokemonResponse";
import { PokemonTypes } from "../../types/pokemonTypes";
import { BasicInformation } from "../../types/pokemonBasicInformation";
import { BaseStats } from "../../types/pokemonBaseStats";

type StatsReduce = {
  [key: string]: number;
}

export class CreatePokemonService {
  public async createPokemon(): Promise<void> {
    const pokemon = await this.fetchPokemonData();

    console.log(pokemon[1]);

    await pokemonSchema.create(pokemon);
  }

  private async fetchPokemonData(): Promise<Pokemon[]> {
    const pokemonsUrl = await this.getAllPokemonUrl();

    const pokemon = pokemonsUrl.map(
      async (pokemon: PokemonsUrlType) => await this.handlePokemonData(pokemon),
    );

    return await Promise.all(pokemon);
  }

  private getAllPokemonUrl = async (): Promise<PokemonsUrlType[]> =>
    await axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(({ data: { results } }) => results);

  private async handlePokemonData({ url }: PokemonsUrlType): Promise<Pokemon> {
    const pokemonUrl = url.toString();

    const response: PokemonResponse = await axios
      .get(pokemonUrl)
      .then(({ data }) => data);

    const basicInformation = this.buildPokemonBasicInformation(response);
    const baseStats = this.buildPokemonBaseStats(response);

    return {
      basicInformation,
      baseStats,
    };
  }

  private buildPokemonBasicInformation(
    {
      id,
      name,
      types,
      sprites: { other },
      weight,
      height,
      abilities,
    }: PokemonResponse,
  ): BasicInformation {
    const pokedexNumber = this.addZerosInPokedexNumber(id);
    const pokemonTypes = this.getPokemonTypes(types);
    const pokemonAbilities = this.getPokemonAbilities(abilities);

    return {
      index: id,
      name,
      pokedexNumber,
      image: other["official-artwork"].front_default,
      pokemonTypes,
      weight,
      height,
      abilities: pokemonAbilities,
    };
  }

  private addZerosInPokedexNumber = (pokedexNumber: number): string =>
    pokedexNumber.toString().padStart(3, "0");

  private getPokemonTypes = (types: PokemonResponse["types"]): PokemonTypes[] =>
    types.map(({ type: { name } }) => {
      return name;
    });

  private getPokemonAbilities = (
    abilities: PokemonResponse["abilities"],
  ): string[] => abilities.map(({ ability: { name } }) => name);

  private buildPokemonBaseStats({ stats }: PokemonResponse): BaseStats {
    const pokemonBaseStats = stats.reduce(
      (acc, { base_stat, stat: { name } }) => {
        if (name === "special-attack")
          acc["special_attack"] = base_stat;

        if (name === "special-defense")
          acc["special_defense"] = base_stat;


        acc[name] = base_stat;

        return acc;
      },
      {} as StatsReduce
    )

    return pokemonBaseStats as BaseStats;
  }

}
