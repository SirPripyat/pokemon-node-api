import type { PokemonTypes } from "../../types/pokemon-types.type";
import pokemonSchema from "../pokemon.schema";
import { POKEMONS_LIMIT_RETURN } from "../../constants/pokemons-limit-return.constant";
import type { GetAllPokemon } from "../../types/getAllPokemon";
import type { Pokemon } from "../../types/pokemon.type";

export class GetAllPokemonsFromType {
  public async getAllPokemonsFromType(
    name: string,
    type: PokemonTypes,
  ): Promise<GetAllPokemon[]> {
    const pokemons = (await pokemonSchema
      .find({
        "basicInformation.pokemonTypes": type,
        "basicInformation.name": { $ne: name },
      })
      .limit(POKEMONS_LIMIT_RETURN)) as Pokemon[];

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
