import { PokemonStateName } from "./pokemonStateName";

export type BaseStats = {
  [key in PokemonStateName]: number;
}