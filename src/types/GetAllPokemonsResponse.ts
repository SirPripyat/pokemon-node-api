import { GetAllPokemon } from './GetAllPokemon';

export type GetAllPokemonsResponse = {
  pokemons: GetAllPokemon[];
  numberOfPokemons: number;
  currentPage: number;
  totalPages: number;
};
