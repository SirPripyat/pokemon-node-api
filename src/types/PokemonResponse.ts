import { PokemonType } from './enums';

type Types = {
  type: {
    name: PokemonType;
    url: string;
  };
};

type Sprites = {
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
};

type Abilities = {
  ability: {
    name: string;
  };
};

type StatsName =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'special-attack'
  | 'special-defense'
  | 'speed';

type Stats = {
  base_stat: number;
  stat: {
    name: StatsName;
  };
};

export type PokemonResponse = {
  id: number;
  name: string;
  types: Types[];
  sprites: Sprites;
  weight: number;
  height: number;
  abilities: Abilities[];
  stats: Stats[];
};
