import { Router } from 'express';
import evolutionChainController from './controllers/EvolutionChainController';

const routes = Router();

routes.post('/evolution-chain', evolutionChainController.createEvolutionChain);
routes.get(
  '/evolution-chain/:name',
  evolutionChainController.getEvolutionChain,
);

export default routes;
