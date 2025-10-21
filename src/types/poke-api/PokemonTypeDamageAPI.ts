type DamageRelationsName =
  | 'double_damage_from'
  | 'half_damage_from'
  | 'no_damage_from';

export type PokemonTypeDamageAPI = { name: string } & {
  damage_relations: {
    [key in DamageRelationsName]: Array<{
      name: string;
    }>;
  };
};
