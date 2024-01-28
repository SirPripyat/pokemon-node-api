import { Query } from "mongoose";
import type { BasicInformation } from "../../types/pokemonBasicInformation";
import type { Pokemon } from "../../types/pokemon.type";
import pokemonSchema from "../../pokemon/pokemon.schema";
import evolutionChainSchema from "../evolution-chain.schema";
import { GetAllPokemon } from "../../types/getAllPokemon";

export class GetEvolutionChainService {
  public async getEvolutionChain(
    name: BasicInformation["name"],
  ): Promise<GetAllPokemon[]> {
    const pokemon = await evolutionChainSchema.find({
      name,
    });

    const { evolutionChain } = pokemon[0];

    const pokemons = (await pokemonSchema.find({
      "basicInformation.name": {
        $in: evolutionChain,
      },
    })) as Pokemon[];

    return pokemons.map(
      ({
        basicInformation: { index, name, pokedexNumber, image, pokemonTypes },
      }) => {
        return {
          index,
          name,
          pokedexNumber,
          image,
          pokemonTypes,
        };
      },
    );
  }
}
