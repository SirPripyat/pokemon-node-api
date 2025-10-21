import { Request, Response } from "express";
import { CreateEvolutionChainService } from "../services/CreateEvolutionChainService";
import { GetEvolutionChainService } from "../services/GetEvolutionChainService";

class EvolutionChainController {
  public createEvolutionChain(_: Request, res: Response) {
    return new CreateEvolutionChainService()
      .createEvolutionChain()
      .then(response => res.status(200).json(response))
      .catch(error => res.status(500).json(`Internal server error: ${error}`));
  }

  public getEvolutionChain({ params: { name } }: Request, res: Response) {
    return new GetEvolutionChainService()
      .getEvolutionChain(name as string)
      .then(response => res.status(200).json(response))
      .catch(error => res.status(500).json(`Internal server error: ${error}`));
  }
}

export default new EvolutionChainController();
