import { PrismaClient } from '../generated/prisma';

export const FETCH_LIMIT = 151;
export const POKEMON_BASE_API = 'https://pokeapi.co/api/v2';
export const LIMIT_POKEMONS_PAGINATION = 16;

export const prismaClient = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
