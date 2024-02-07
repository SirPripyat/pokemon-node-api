import { Request, Response } from "express";
import { PokemonTypeService } from "./pokemon-type.service";
import { PokemonTypes } from "../types/pokemon-types.type";

class PokemonTypeController {
  public async createPokemonType(req: Request, res: Response) {
    try {
      await new PokemonTypeService().createPokemonType();

      return res.status(201).json("Pokemon types created successfully");
    } catch (error) {
      return res.status(500).json(`Internal server error: ${error}`);
    }
  }

  public async getPokemonTypes(req: Request, res: Response) {
    try {
      const { typeId } = req.params;

      const pokemonTypesWeakness =
        await new PokemonTypeService().getPokemonWeakness(
          typeId as PokemonTypes,
        );

      return res.status(200).json(pokemonTypesWeakness);
    } catch (error) {
      return res.status(500).json(`Internal server error: ${error}`);
    }
  }
}

export default new PokemonTypeController();
