import { NextFunction, Request, Response } from 'express';
import type { PokemonType } from '../types';
import { StatusCodes } from 'http-status-codes';
import { PokemonService } from '../services/PokemonService';
import { PaginationQueryParamsWithTypes } from '../types/PaginationQueryParams';

export class PokemonController {
  constructor(private readonly service: PokemonService) {}

  public create = (_: Request, res: Response, next: NextFunction) => {
    return this.service
      .create()
      .then(() =>
        res.status(StatusCodes.CREATED).json({
          success: true,
          message: 'Pokémons criados com sucesso',
        }),
      )
      .catch(next);
  };

  public findAll = (
    { query: { page, search, types } }: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const queryParams: PaginationQueryParamsWithTypes = {
      page: Number(page || 1),
      search: String(search || ''),
      types: String(types || ''),
    };

    return this.service
      .findAll(queryParams)
      .then(result => res.status(StatusCodes.OK).json(result))
      .catch(next);
  };

  public findById = (
    { params: { id } }: Request,
    res: Response,
    next: NextFunction,
  ) => {
    return this.service
      .findById(id)
      .then(result => res.status(StatusCodes.OK).json(result))
      .catch(next);
  };

  public findWeaknesses = (
    { params: { id } }: Request,
    res: Response,
    next: NextFunction,
  ) => {
    return this.service
      .findWeaknesses(id)
      .then(result => res.status(StatusCodes.OK).json(result))
      .catch(next);
  };

  public findByType = (
    { params: { type } }: Request,
    res: Response,
    next: NextFunction,
  ) => {
    return this.service
      .findByType(type as PokemonType)
      .then(result => res.status(StatusCodes.OK).json(result))
      .catch(next);
  };
}
