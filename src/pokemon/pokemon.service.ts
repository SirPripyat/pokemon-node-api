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
    const currentPage = parseInt(page) || 1;
    const searchParam = search ?? "";

    const pokemons = await this.getPokemons(currentPage, searchParam);
    const { totalPages, numberOfPokemons } =
      await this.calculateTotalPagesForPagination();

    return {
      numberOfPokemons,
      currentPage,
      totalPages,
      pokemons,
    };
  }

  private async getPokemons(
    page: number,
    searchParam: string,
  ): Promise<Pokemon[]> {
    const query = this.getPokemonQuery(searchParam);

    return (await query
      .sort({ index: 1 })
      .limit(NUMBER_OF_POKEMONS_ON_PAGINATION)
      .skip(NUMBER_OF_POKEMONS_ON_PAGINATION * (page - 1))
      .exec()) as Pokemon[];
  }

  private async calculateTotalPagesForPagination(): Promise<{
    totalPages: number;
    numberOfPokemons: number;
  }> {
    const numberOfPokemons = await pokemonSchema.countDocuments();
    const totalPages = Math.ceil(
      numberOfPokemons / NUMBER_OF_POKEMONS_ON_PAGINATION,
    );

    return { totalPages, numberOfPokemons };
  }

  private getPokemonQuery(searchParam: string): Query<Pokemon[], Pokemon> {
    return pokemonSchema.find({
      name: {
        $regex: searchParam,
        $options: "i",
      },
    });
  }

  public async getPokemonById(id: string): Promise<any> {
    return await pokemonSchema.findOne({ index: id });
  }

  public async getPokemonByName(name: string): Promise<any> {
    return await pokemonSchema.find({ name: name });
  }
}
