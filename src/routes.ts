import { Router } from "express";
import pokemonController from "./pokemon/pokemon.controller";
import pokemonTypeWeaknessController from "./pokemon-type/pokemon-type.controller";
import evolutionChainController from "./evolution-chain/evolution-chain.controller";

const routes = Router();

routes.post("/pokemon", pokemonController.createPokemon);
routes.get("/pokemon", pokemonController.getAllPokemons);
routes.get("/pokemon/:name", pokemonController.getPokemonByName);
routes.get(
  "/pokemon-type/:name/:type",
  pokemonController.getAllPokemonsFromType,
);

routes.post("/types", pokemonTypeWeaknessController.createPokemonType);
routes.get("/types/:typeId", pokemonTypeWeaknessController.getPokemonTypes);

routes.post("/evolution-chain", evolutionChainController.createEvolutionChain);
routes.get(
  "/evolution-chain/:name",
  evolutionChainController.getEvolutionChain,
);

export default routes;
