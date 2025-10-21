import type { PokemonType } from './enums';

export type PokemonTypesResponse = {
  damage_relations: {
    double_damage_from: PokemonType[];
  };
};
