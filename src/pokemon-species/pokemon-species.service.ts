import axios from "axios";
import type { PokemonSpeciesResponse } from "../types/responses/pokemon-species-response.type";
import { FETCH_LIMIT_POKEMONS } from "../constants/fetch-limit-pokemons";
import { PokemonUrlResponse } from "../types/responses/pokemon-url-response.type";

export class PokemonSpeciesService {
  public async fetchAllPokemonSpeciesUrl(): Promise<PokemonUrlResponse[]> {
    return await axios
      .get(
        `https://pokeapi.co/api/v2/pokemon-species/?limit=${FETCH_LIMIT_POKEMONS}`,
      )
      .then(({ data: { results } }) => results);
  }

  public async handlePokemonSpeciesUrl(
    url: PokemonUrlResponse["url"],
  ): Promise<string> {
    const splitUrl = url.split("/");

    const cleanVoidStrings = splitUrl.filter(string => string !== "");

    const [pokemonId] = cleanVoidStrings.reverse();

    return pokemonId;
  }

  public async fetchPokemonSpeciesById(
    id: string,
  ): Promise<PokemonSpeciesResponse["data"]> {
    const { data } = (await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    )) as PokemonSpeciesResponse;

    const { evolution_chain, flavor_text_entries, name } = data;

    return {
      evolution_chain,
      flavor_text_entries,
      name,
    };
  }
}
