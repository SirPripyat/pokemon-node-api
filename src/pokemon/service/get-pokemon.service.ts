import pokemonSchema from "../pokemon.schema";

export class GetPokemonService {
  public async getPokemonById(id: string) {
    return await pokemonSchema.findById(id);
  }

  public async getPokemonByName(name: string) {
    return await pokemonSchema.findOne({ name });
  }
}
