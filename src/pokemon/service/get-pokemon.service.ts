import pokemonSchema from "../pokemon.schema";

export class GetPokemonService {
  public async getPokemonByName(name: string) {
    return await pokemonSchema.findOne({
      "basicInformation.name": name,
    });
  }
}
