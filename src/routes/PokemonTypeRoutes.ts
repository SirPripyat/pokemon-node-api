import { Router } from 'express';
import { container } from '../configs';

const pokemonTypesRoutes = Router();
const BASE_URL = '/pokemon-types';

const controller = container.getPokemonTypeController();

pokemonTypesRoutes.get(BASE_URL, controller.findAll);

export default pokemonTypesRoutes;
