import type { PokemonType } from './enums';

export type BasicInformation = {
  index: number;
  name: string;
  pokedexNumber: string;
  image: string;
  pokemonTypes: PokemonType[];
  weight: number;
  height: number;
  abilities: string[];
  description: string;
};
