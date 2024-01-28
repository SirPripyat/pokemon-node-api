import { Request, Response } from "express";
import { EvolutionChainService } from "./evolution-chain.service";

class EvolutionChainController {
  public async getEvolutionChainById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const evolutionChain =
        await new EvolutionChainService().getPokemonsFromEvoltionChain(
          id as string,
        );

      return res.status(200).json(evolutionChain);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new EvolutionChainController();
