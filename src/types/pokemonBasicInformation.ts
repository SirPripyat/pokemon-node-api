import { PokemonTypes } from "./pokemonTypes";

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