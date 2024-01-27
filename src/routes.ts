import { Router } from "express";
import pokemonController from "./pokemon/pokemon.controller";
import pokemonTypeWeaknessController from "./pokemon-type/pokemon-type.controller";

const routes = Router();

// routes.post("/pokemon", pokemonController.createPokemon);
routes.get("/pokemon", pokemonController.getAllPokemons);
routes.get("/pokemon/:name", pokemonController.getPokemonByName);

// routes.post("/types", pokemonTypeWeaknessController.createPokemonType);
routes.get("/types/:typeId", pokemonTypeWeaknessController.getPokemonTypes);

export default routes;
