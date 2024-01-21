import { Request, Response } from "express";
import { CreatePokemonService } from "./service/create-pokemon.service";
import { GetPokemonService } from "./service/get-pokemon.service";
import { GetAllPokemonService } from "./service/get-all-pokemon.service";

class PokemonController {
  public async createPokemon(req: Request, res: Response) {
    try {
      const pokemonUrls = await new CreatePokemonService().createPokemon();

      return res.status(200).json(pokemonUrls);
    } catch (error) {
      return res.status(500).json(`Internal server error: ${error}`);
    }
  }

  public async getAllPokemons(req: Request, res: Response) {
    try {
      const { page, search, types } = req.query;

      const pokemons = await new GetAllPokemonService().getAllPokemons(
        page as string,
        search as string,
        types as string,
      );

      return res.status(200).json(pokemons);
    } catch (error) {
      return res.status(500).json(`Internal server error: ${error}`);
    }
  }

  public async getPokemonByName(req: Request, res: Response) {
    try {
      const { name } = req.params;

      const pokemon = await new GetPokemonService().getPokemonByName(name);

      return res.status(200).json(pokemon);
    } catch (error) {
      return res.status(500).json(`Internal server error: ${error}`);
    }
  }
}

export default new PokemonController();
