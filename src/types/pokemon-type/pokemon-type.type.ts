import { PokemonTypes } from "../pokemon-types.type";

export type PokemonType = {
  name: string;
  weaknessess: PokemonTypes[];
};
