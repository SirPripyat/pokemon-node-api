import { Query } from "mongoose";
import type { PokemonTypes } from "../../types/pokemon-types.type";
import pokemonSchema from "../pokemon.schema";

export class GetAllPokemonsFromType {
  public async getAllPokemonsFromType(
    name: string,
    type: PokemonTypes,
  ): Promise<Query<any[], any>> {
    const POKEMONS_LIMIT_RETURN = 6;

    return await pokemonSchema
      .find({
        "basicInformation.pokemonTypes": type,
        "basicInformation.name": { $ne: name },
      })
      .limit(POKEMONS_LIMIT_RETURN);
  }
}
