import axios, { AxiosStatic } from 'axios';
import { FETCH_LIMIT, POKEMON_BASE_API } from '../constants';
import { PokemonIndexAPI, PokemonSpecies } from '../types';

export class PokemonSpeciesService {
  constructor(private readonly httpClient: AxiosStatic = axios) {}

  public fetchAllPokemonSpeciesUrl(): Promise<PokemonIndexAPI[]> {
    return axios
      .get(`${POKEMON_BASE_API}/pokemon-species/?limit=${FETCH_LIMIT}`)
      .then(({ data: { results } }) => results);
  }

  public handlePokemonSpeciesUrl(url: string): string {
    if (!url) return '';

    const splitUrl = url.split('/');

    const cleanVoidStrings = splitUrl.filter(string => string !== '');

    const [pokemonId] = cleanVoidStrings.reverse();

    const validPokemonId = parseInt(pokemonId);

    if (!validPokemonId) return '';

    return validPokemonId.toString();
  }

  public fetchSpeciesById(id: string | number): Promise<PokemonSpecies> {
    return this.httpClient
      .get<PokemonSpecies>(`${POKEMON_BASE_API}/pokemon-species/${id}`)
      .then(({ data }) => data);
  }
}
