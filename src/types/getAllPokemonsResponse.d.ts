import { Pokemon } from "./pokemon";

export type GetAllPokemonsResponse = {
  pokemons: Pokemon[];
  numberOfPokemons: number;
  currentPage: number;
  totalPages: number;
};
