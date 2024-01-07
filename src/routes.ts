import { Router } from "express";
import pokemonController from "./pokemon/pokemon.controller";

const routes = Router();

routes.post("/pokemon", pokemonController.createPokemon);
routes.get("/pokemon", pokemonController.getAllPokemons);
routes.get("/pokemon-id/:id", pokemonController.getPokemonById);
routes.get("/pokemon/:name", pokemonController.getPokemonByName);

export default routes;
