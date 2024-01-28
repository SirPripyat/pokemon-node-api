import type { Pokemon } from "../../types/pokemon.type";
import pokemonSchema from "../pokemon.schema";

export class GetPokemonService {
  public async getPokemonByName(name: string): Promise<Pokemon> {
    const pokemon = (await pokemonSchema.findOne({
      "basicInformation.name": name,
    })) as Pokemon;

    return {
      basicInformation: pokemon.basicInformation,
      baseStats: pokemon.baseStats,
    };
  }
}
