import type { BasicInformation } from "../types";
import { GetAllPokemon } from "../types";

export class GetEvolutionChainService {
  public async getEvolutionChain(
    name: BasicInformation["name"],
  ): Promise<GetAllPokemon[]> {
    return Promise.resolve([]);
    // const pokemon = await evolutionChainSchema.find({
    //   name,
    // });
    //
    // const { evolutionChain } = pokemon[0];
    //
    // const pokemons = (await pokemonSchema.find({
    //   "basicInformation.name": {
    //     $in: evolutionChain,
    //   },
    // })) as Pokemon[];
    //
    // return pokemons.map(
    //   ({
    //     basicInformation: { index, name, pokedexNumber, image, pokemonTypes },
    //   }) => {
    //     return {
    //       index,
    //       name,
    //       pokedexNumber,
    //       image,
    //       pokemonTypes,
    //     };
    //   },
    // );
  }
}
