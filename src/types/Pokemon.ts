import { BaseStats } from './PokemonBaseStats';
import { PokemonType } from './enums';

export type PokemonTypeTable = {
  id: string;
  name: PokemonType;
  color: string;
};

export type Pokemon = {
  index: number;
  name: string;
  pokedexNumber: string;
  image: string;
  weight: number;
  height: number;
  abilities: string[];
  description: string;

  stats: BaseStats;
  types: PokemonTypeTable[];
};
