import { Request, Response } from "express";
import { CreateEvolutionChainService } from "./service/create-evolution-chain.service";
import { GetEvolutionChainService } from "./service/get-evolution-chain.service";

class EvolutionChainController {
  public async createEvolutionChain(req: Request, res: Response) {
    try {
      await new CreateEvolutionChainService().createEvolutionChain();

      return res.status(200).json(`Evolution chain created!`);
    } catch (error) {
      console.log(error);
    }
  }

  public async getEvolutionChain(req: Request, res: Response) {
    try {
      const { name } = req.params;

      const pokeEvolutionChain =
        await new GetEvolutionChainService().getEvolutionChain(name as string);

      return res.status(200).json(pokeEvolutionChain);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new EvolutionChainController();
