import axios, { AxiosResponse } from "axios";
import { PokemonsUrlType } from "../types/pokemonsUrl";
import { PokemonResponse } from "../types/pokemonResponse";
import { PokemonTypes } from "../types/pokemonTypes";
import { Pokemon } from "../types/pokemon";
import pokemonSchema from "./pokemon.schema";

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

  public async getAllPokemons(): Promise<any> {
    return await pokemonSchema.find();
  }

  public async getPokemonById(id: string): Promise<any> {
    return await pokemonSchema.findOne({ index: id });
  }

  public async getPokemonByName(name: string): Promise<any> {
    console.log(name);
    return await pokemonSchema.find({ name: name });
  }
}
