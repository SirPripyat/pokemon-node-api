import axios from "axios";
import { PokemonsUrlType } from "../../types/pokemonsUrl";
import pokemonSchema from "../pokemon.schema";
import { Pokemon } from "../../types/pokemon";
import { PokemonResponse } from "../../types/pokemonResponse";
import { PokemonTypes } from "../../types/pokemonTypes";

export class CreatePokemonService {
  public async createPokemon(): Promise<void> {
    const pokemon = await this.fetchPokemonData();

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
}
