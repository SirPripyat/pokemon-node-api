import { Router } from 'express';
import { container } from '../configs';
import { asyncHandler } from '../middlewares/AsyncHandler';

const pokemonRoutes = Router();
const BASE_URL = '/pokemons';

const controller = container.getPokemonController();

pokemonRoutes.post(BASE_URL, asyncHandler(controller.create));
pokemonRoutes.get(BASE_URL, asyncHandler(controller.findAll));
pokemonRoutes.get(`${BASE_URL}/:id`, asyncHandler(controller.findById));
pokemonRoutes.get(
  `${BASE_URL}/:id/weaknesses`,
  asyncHandler(controller.findWeaknesses),
);
pokemonRoutes.get(
  `${BASE_URL}/:type/types`,
  asyncHandler(controller.findByType),
);

export default pokemonRoutes;
