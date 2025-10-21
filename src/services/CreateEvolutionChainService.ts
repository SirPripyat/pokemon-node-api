import axios from 'axios';
import { PokemonSpeciesService } from './PokemonSpeciesService';
import {
  Chain,
  EvolutionChain,
  EvolutionChainResponse,
  PokemonSpecies,
} from '../types';

export class CreateEvolutionChainService {
  public async createEvolutionChain(): Promise<void> {
    const evolutionChains = await this.fetchAllPokemonSpecies();
  }

  private async fetchAllPokemonSpecies(): Promise<EvolutionChain[]> {
    const pokemonsSpeciesUrl =
      await new PokemonSpeciesService().fetchAllPokemonSpeciesUrl();

    const pokemonsSpecies = pokemonsSpeciesUrl.map(async data =>
      this.fetchEvolutionChainForPokemonSpecies(''),
    );

    return await Promise.all(pokemonsSpecies);
  }

  private async fetchEvolutionChainForPokemonSpecies(
    url: string,
  ): Promise<EvolutionChain> {
    const pokemonSpeciesService = new PokemonSpeciesService();

    const getPokeIdFromUrl = pokemonSpeciesService.handlePokemonSpeciesUrl(url);

    const { evolution_chain, name } =
      await pokemonSpeciesService.fetchSpeciesById(getPokeIdFromUrl);

    return this.fetchEvolutionChain(evolution_chain, name);
  }

  private async fetchEvolutionChain(
    evolution_chain: PokemonSpecies['evolution_chain'],
    name: PokemonSpecies['name'],
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
  }: Chain): EvolutionChain['evolutionChain'] {
    const firstEvolution = species.name;

    if (firstEvolution === 'eevee')
      return this.getEeveeEvolutions({ species, evolves_to });

    const secondEvolution = evolves_to[0]?.species?.name ?? null;
    const thirdEvolution = evolves_to[0]?.evolves_to[0]?.species?.name ?? null;

    const getEvolutionChain = [firstEvolution, secondEvolution, thirdEvolution];

    return getEvolutionChain.filter(poke => poke !== null);
  }

  private getEeveeEvolutions({
    species,
    evolves_to,
  }: Chain): EvolutionChain['evolutionChain'] {
    const firstEvolution = species.name;

    const evolutionArray = [firstEvolution];

    evolves_to.forEach(({ species: { name } }) => {
      evolutionArray.push(name);
    });

    return evolutionArray;
  }
}
