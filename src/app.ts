import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prismaClient } from './constants';
import morgan from 'morgan';
import { errorHandler } from './middlewares/ErrorHandler';
import { notFoundHandler } from './middlewares/NotFoundHandler';
import pokemonRoutes from './routes/PokemonRoutes';
import pokemonTypesRoutes from './routes/PokemonTypeRoutes';

dotenv.config();
dotenv.configDotenv({
  path: '.env.local',
});

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middleware();
    this.routes();
    this.database();
    this.errorHandler();
  }

  public middleware(): void {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(morgan('dev'));
  }

  public routes(): void {
    this.express.use(pokemonRoutes);
    this.express.use(pokemonTypesRoutes);
  }

  public disconnect(): Promise<void> {
    return prismaClient.$disconnect();
  }

  private async database(): Promise<void> {
    prismaClient
      .$connect()
      .then(() => console.log('Connect database success'))
      .catch(async (err: any) => {
        console.error(`Connect database fail: ${err}`);
        await prismaClient.$disconnect();
        process.exit(1);
      });
  }

  private errorHandler() {
    this.express.use(notFoundHandler);
    this.express.use(errorHandler);
  }
}

export default new App().express;
