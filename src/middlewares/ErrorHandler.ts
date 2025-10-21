import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../utils/errors/AppError';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof AppError)
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });

  if (err.name === 'PrismaClientKnownRequestError')
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Erro na operação do banco de dados',
      stack: err.stack,
    });

  if (err.name === 'PrismaClientValidationError')
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Dados inválidos fornecidos',
      stack: err.stack,
    });

  console.error('Erro não tratado:', err);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
};
