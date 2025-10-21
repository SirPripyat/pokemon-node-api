import { NextFunction, Request, Response } from 'express';
import { PokemonTypeService } from '../services/PokemonTypeService';
import { StatusCodes } from 'http-status-codes';

export class PokemonTypeController {
  constructor(private readonly service: PokemonTypeService) {}

  public findAll = (_: Request, res: Response, next: NextFunction) => {
    return this.service
      .findAll()
      .then(result => res.status(StatusCodes.CREATED).json(result))
      .catch(next);
  };
}
