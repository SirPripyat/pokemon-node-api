import { Request, Response } from "express";
import { PokemonService } from "./pokemon.service";

class PokemonController {
  public async createPokemon(req: Request, res: Response) {
    try {
      const pokemonUrls = await new PokemonService().createPokemon();

      return res.status(200).json(pokemonUrls);
    } catch (error) {
      return res.status(500).json(`Internal server error: ${error}`);
    }
  }

  public async getAllPokemons(req: Request, res: Response) {
    try {
      const { page } = req.query;

      const pokemons = await new PokemonService().getAllPokemons(
        page as string,
      );

      return res.status(200).json(pokemons);
    } catch (error) {
      return res.status(500).json(`Internal server error: ${error}`);
    }
  }

  public async getPokemonById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const pokemon = await new PokemonService().getPokemonById(id);

      return res.status(200).json(pokemon);
    } catch (error) {
      return res.status(500).json(`Internal server error: ${error}`);
    }
  }

  public async getPokemonByName(req: Request, res: Response) {
    try {
      const { name } = req.params;

      const pokemon = await new PokemonService().getPokemonByName(name);

      return res.status(200).json(pokemon);
    } catch (error) {
      return res.status(500).json(`Internal server error: ${error}`);
    }
  }
}

export default new PokemonController();
