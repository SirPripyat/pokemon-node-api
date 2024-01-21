import { Query } from "mongoose";
import { NUMBER_OF_POKEMONS_ON_PAGINATION } from "../../constants/numberOfPokemonsOnPagination";
import { GetAllPokemonsResponse } from "../../types/getAllPokemonsResponse";
import { Pokemon } from "../../types/pokemon";
import pokemonSchema from "../pokemon.schema";
import { GetAllPokemon } from "../../types/getAllPokemon";

type CalculateTotalPagesForPaginationType = {
  totalPages: number;
  numberOfPokemons: number;
};

export class GetAllPokemonService {
  public async getAllPokemons(
    page: string,
    search: string = "",
    types: string = "",
  ): Promise<GetAllPokemonsResponse> {
    const currentPage = parseInt(page) || 1;

    const pokemons = await this.getPokemons(currentPage, search, types);
    const pokemonsData = this.handlePokemonData(pokemons);

    const { totalPages, numberOfPokemons } =
      await this.calculateTotalPagesForPagination(search, types);

    return {
      numberOfPokemons,
      currentPage,
      totalPages,
      pokemons: pokemonsData,
    };
  }

  private async getPokemons(
    page: number,
    searchParam: string,
    typesParam: string,
  ): Promise<Pokemon[]> {
    const query = this.getPokemonQuery(searchParam, typesParam);

    return (await query
      .sort({ "basicInformation.index": 1 })
      .limit(NUMBER_OF_POKEMONS_ON_PAGINATION)
      .skip(NUMBER_OF_POKEMONS_ON_PAGINATION * (page - 1))
      .exec()) as Pokemon[];
  }

  private handlePokemonData(pokemonsData: Pokemon[]): GetAllPokemon[] {
    return pokemonsData.map(
      ({
        basicInformation: { index, name, pokedexNumber, image, pokemonTypes },
      }) => {
        return {
          index,
          name,
          pokedexNumber,
          image,
          pokemonTypes,
        };
      },
    );
  }

  private async calculateTotalPagesForPagination(
    searchParam: string,
    typesParam: string,
  ): Promise<CalculateTotalPagesForPaginationType> {
    const numberOfPokemons = await this.getPokemonQuery(
      searchParam,
      typesParam,
    ).countDocuments();

    const totalPages = Math.ceil(
      numberOfPokemons / NUMBER_OF_POKEMONS_ON_PAGINATION,
    );

    return { totalPages, numberOfPokemons };
  }

  private getPokemonQuery(
    searchParam: string,
    typesParam: string,
  ): Query<Pokemon[], Pokemon> {
    const baseQuery: Record<string, any> = {
      "basicInformation.name": {
        $regex: searchParam,
        $options: "i",
      },
    };

    if (typesParam.length > 0) {
      baseQuery.pokemonTypes = {
        $in: typesParam,
      };
    }

    return pokemonSchema.find(baseQuery);
  }
}
