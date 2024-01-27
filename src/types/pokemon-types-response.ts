import type { PokemonTypes } from "./pokemon-types.type";

export type PokemonTypesResponse = {
  damage_relations: {
    double_damage_from: PokemonTypes[];
  };
};
