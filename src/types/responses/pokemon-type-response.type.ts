import type { PokemonTypes } from "../pokemon-types.type";

export type DamageRelationsResponse = {
  double_damage_from: { name: PokemonTypes; url: string }[];
};

export type PokemonTypeResponse = {
  data: {
    name: PokemonTypes;
    damage_relations: DamageRelationsResponse;
  };
};
