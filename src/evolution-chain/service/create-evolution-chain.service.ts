import axios from "axios";
import { PokemonUrlResponse } from "../../types/responses/pokemon-url-response.type";
import { PokemonSpeciesService } from "../../pokemon-species/pokemon-species.service";
import evolutionChainSchema from "../evolution-chain.schema";
import {
  Chain,
  EvolutionChainResponse,
} from "../../types/responses/evolution-chain-response.type";
import { PokemonSpeciesResponse } from "../../types/responses/pokemon-species-response.type";
import { EvolutionChain } from "../../types/evolution-chain/evolution-chain.type";

export class CreateEvolutionChainService {
  public async createEvolutionChain(): Promise<void> {
    const evolutionChains = await this.fetchAllPokemonSpecies();

    await evolutionChainSchema.create(evolutionChains);
  }

  private async fetchAllPokemonSpecies(): Promise<EvolutionChain[]> {
    const pokemonsSpeciesUrl =
      await new PokemonSpeciesService().fetchAllPokemonSpeciesUrl();

    const pokemonsSpecies = pokemonsSpeciesUrl.map(
      async ({ url }: PokemonUrlResponse) =>
        this.fetchEvolutionChainForPokemonSpecies(url),
    );

    return await Promise.all(pokemonsSpecies);
  }

  private async fetchEvolutionChainForPokemonSpecies(
    url: string,
  ): Promise<EvolutionChain> {
    const pokemonSpeciesService = new PokemonSpeciesService();

    const getPokeIdFromUrl = pokemonSpeciesService.handlePokemonSpeciesUrl(url);

    const { evolution_chain, name } =
      await pokemonSpeciesService.fetchPokemonSpeciesById(getPokeIdFromUrl);

    return this.fetchEvolutionChain(evolution_chain, name);
  }

  private async fetchEvolutionChain(
    evolution_chain: PokemonSpeciesResponse["data"]["evolution_chain"],
    name: PokemonSpeciesResponse["data"]["name"],
  ): Promise<EvolutionChain> {
    const {
      data: { chain },
    } = (await axios.get(evolution_chain.url)) as EvolutionChainResponse;

    const pokemonEvolutionChain = this.getEvolutionChain(chain);

    return {
      name,
      evolutionChain: pokemonEvolutionChain,
    };
  }

  private getEvolutionChain({
    species,
    evolves_to,
  }: Chain): EvolutionChain["evolutionChain"] {
    const firstEvolution = species.name;

    if (firstEvolution === "eevee")
      return this.getEeveeEvolutions({ species, evolves_to });

    const secondEvolution = evolves_to[0]?.species?.name ?? null;
    const thirdEvolution = evolves_to[0]?.evolves_to[0]?.species?.name ?? null;

    const getEvolutionChain = [firstEvolution, secondEvolution, thirdEvolution];

    const evolutionChain = getEvolutionChain.filter(poke => poke !== null);

    return evolutionChain;
  }

  private getEeveeEvolutions({
    species,
    evolves_to,
  }: Chain): EvolutionChain["evolutionChain"] {
    const firstEvolution = species.name;

    const evolutionArray = [firstEvolution];

    evolves_to.forEach(({ species: { name } }) => {
      evolutionArray.push(name);
    });

    return evolutionArray;
  }
}
