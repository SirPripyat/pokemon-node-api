export type PokemonStateName =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'speed'
  | 'specialAttack'
  | 'specialDefense';

export type BaseStats = {
  [key in PokemonStateName]: number;
};
