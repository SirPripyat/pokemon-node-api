import type { PokemonTypes } from "./pokemon-types.type";

export type BasicInformation = {
  index: number;
  name: string;
  pokedexNumber: string;
  image: string;
  pokemonTypes: PokemonTypes[];
  weight: number;
  height: number;
  abilities: string[];
};
