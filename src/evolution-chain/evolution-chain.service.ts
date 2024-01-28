import axios from "axios";
import pokemonSchema from "../pokemon/pokemon.schema";

export class EvolutionChainService {
  public async getPokemonsFromEvoltionChain(id: string) {
    const pokemonsEvolutions: string[] = await this.getEvolutionChainById(id);

    console.log(pokemonsEvolutions);

    return await pokemonSchema.find({
      "basicInformation.name": {
        $in: pokemonsEvolutions,
      },
    });
  }

  private async getEvolutionChainById(id: string) {
    const {
      data: {
        evolution_chain: { url },
      },
    } = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

    const {
      data: {
        chain: {
          species: { name },
          evolves_to,
        },
      },
    } = await axios.get(url);

    const firstEvolution = name;
    const secondEvolution = evolves_to[0]?.species?.name ?? "None";
    const thirdEvolution =
      evolves_to[0]?.evolves_to[0]?.species?.name ?? "None";

    const evolutionArray = [firstEvolution, secondEvolution, thirdEvolution];

    return evolutionArray;
  }
}
