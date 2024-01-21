import { GetAllPokemon } from "./getAllPokemon";

export type GetAllPokemonsResponse = {
  pokemons: GetAllPokemon[];
  numberOfPokemons: number;
  currentPage: number;
  totalPages: number;
};
