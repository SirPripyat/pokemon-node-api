import { PokemonTypes } from "./pokemonTypes";

export type Pokemon = {
  index: number;
  name: string;
  pokedexNumber: string;
  image: string;
  pokemonTypes: PokemonTypes[];
};
