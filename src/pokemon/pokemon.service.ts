import axios from "axios";
import { PokemonsUrlType } from "../types/pokemonsUrl";
import { PokemonResponse } from "../types/pokemonResponse";
import { PokemonTypes } from "../types/pokemonTypes";
import { Pokemon } from "../types/pokemon";
import pokemonSchema from "./pokemon.schema";
import { NUMBER_OF_POKEMONS_ON_PAGINATION } from "../constants/numberOfPokemonsOnPagination";
import { GetAllPokemonsResponse } from "../types/getAllPokemonsResponse";
import { Query } from "mongoose";

export class PokemonService {
  public async createPokemon() {
    const pokemon = await this.fetchPokemonData();

    return await pokemonSchema.create(pokemon);
  }

  private getAllPokemonUrl = async (): Promise<PokemonsUrlType[]> =>
    await axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(({ data: { results } }) => results);

  private async fetchPokemonData(): Promise<Pokemon[]> {
    const pokemonsUrl = await this.getAllPokemonUrl();

    const pokemon = pokemonsUrl.map(
      async (pokemon: PokemonsUrlType) => await this.handlePokemonData(pokemon),
    );

    const pokemonArray = await Promise.all(pokemon);

    pokemonArray.sort((a, b) => a.index - b.index);

    return pokemonArray;
  }

  private async handlePokemonData({ url }: PokemonsUrlType): Promise<Pokemon> {
    let pokemonUrl = url.toString();

    const response: PokemonResponse = await axios
      .get(pokemonUrl)
      .then(({ data }) => data);

    const {
      id,
      name,
      types,
      sprites: { other },
    } = response;

    const pokedexNumber = this.addZerosInPokedexNumber(id);
    const pokemonTypes = this.getPokemonTypes(types);

    return {
      index: id,
      name,
      pokedexNumber,
      image: other["official-artwork"].front_default,
      pokemonTypes: pokemonTypes,
    };
  }

  private addZerosInPokedexNumber = (pokedexNumber: number): string =>
    pokedexNumber.toString().padStart(3, "0");

  private getPokemonTypes = (types: PokemonResponse["types"]): PokemonTypes[] =>
    types.map(({ type: { name } }) => {
      return name;
    });

  public async getAllPokemons(
    page: string,
    search: string,
  ): Promise<GetAllPokemonsResponse> {
    const parsePageToInt = parseInt(page);
    const searchParam = search ?? "";

    const query: Query<Pokemon[], Pokemon> = pokemonSchema.find({
      name: { $regex: searchParam, $options: "i" },
    });

    const pokemons = (await query
      .sort({ index: 1 })
      .limit(NUMBER_OF_POKEMONS_ON_PAGINATION)
      .skip(NUMBER_OF_POKEMONS_ON_PAGINATION * (parsePageToInt - 1))
      .exec()) as Pokemon[];

    const { totalPages, numberOfPokemons } =
      await this.calculateTotalPagesForPagination(searchParam);

    return {
      numberOfPokemons,
      currentPage: parsePageToInt ? parsePageToInt : 1,
      totalPages,
      pokemons,
    };
  }

  private async calculateTotalPagesForPagination(
    searchParam: string,
  ): Promise<{ totalPages: number; numberOfPokemons: number }> {
    const getPokemonQueryResult = await pokemonSchema
      .find({
        name: { $regex: searchParam, $options: "i" },
      })
      .exec();

    const pokemonQueryLength = getPokemonQueryResult.length;

    const totalPages = Math.ceil(
      pokemonQueryLength / NUMBER_OF_POKEMONS_ON_PAGINATION,
    );

    return {
      totalPages,
      numberOfPokemons: pokemonQueryLength,
    };
  }

  public async getPokemonById(id: string): Promise<any> {
    return await pokemonSchema.findOne({ index: id });
  }

  public async getPokemonByName(name: string): Promise<any> {
    return await pokemonSchema.find({ name: name });
  }
}
