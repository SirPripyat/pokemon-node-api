import { Query } from "mongoose";
import type { BasicInformation } from "../../types/pokemonBasicInformation";
import type { Pokemon } from "../../types/pokemon.type";
import pokemonSchema from "../../pokemon/pokemon.schema";
import evolutionChainSchema from "../evolution-chain.schema";

export class GetEvolutionChainService {
  public async getEvolutionChain(
    name: BasicInformation["name"],
  ): Promise<Query<Pokemon[], Pokemon>> {
    const pokemon = await evolutionChainSchema.find({
      name,
    });

    const { evolutionChain } = pokemon[0];

    return await pokemonSchema.find({
      "basicInformation.name": {
        $in: evolutionChain,
      },
    });
  }
}
