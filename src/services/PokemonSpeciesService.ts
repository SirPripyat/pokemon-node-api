import axios, { AxiosStatic } from "axios";
import { POKEMON_BASE_API } from "../constants";
import { PokemonSpeciesResponse } from "../types";

export class PokemonSpeciesService {
  constructor(private readonly httpClient: AxiosStatic = axios) {}

  public fetchSpeciesById(
    id: string | number,
  ): Promise<PokemonSpeciesResponse> {
    return this.httpClient
      .get<PokemonSpeciesResponse>(`${POKEMON_BASE_API}/pokemon-species/${id}`)
      .then(({ data }) => data);
  }
}
