import axios, { AxiosStatic } from 'axios';
import {
  FETCH_LIMIT,
  LIMIT_POKEMONS_PAGINATION,
  POKEMON_BASE_API,
  prismaClient,
} from '../constants';
import { ErrorMessages } from '../utils/errors/ErrorMessages';
import { AppError } from '../utils/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import {
  BaseStats,
  Pokemon,
  PokemonAPI,
  PokemonIndexAPI,
  PokemonIndexItem,
  PokemonType,
} from '../types';
import { convertUnitMeasureValue } from '../utils/convert-unit-measure-value';
import { capitalize } from 'lodash';
import { PokemonSpeciesService } from './PokemonSpeciesService';
import { PaginationQueryParamsWithTypes } from '../types/PaginationQueryParams';
import { PokemonTypeService } from './PokemonTypeService';

export class PokemonService {
  constructor(
    private readonly httpClient: AxiosStatic = axios,
    private readonly repository = prismaClient.pokemon,
    private readonly pokemonSpeciesService = new PokemonSpeciesService(),
    private readonly pokemonTypeService = new PokemonTypeService(),
  ) {}

  public async create(): Promise<void> {
    const urlList = await this.fetchPokemonsUrls();
    const pokemonsPromises = urlList.map(({ url }) =>
      this.fetchAndSavePokemonData(url),
    );

    await Promise.all(pokemonsPromises);
  }

  private fetchPokemonsUrls(): Promise<PokemonIndexItem[]> {
    return this.httpClient
      .get<PokemonIndexAPI>(`${POKEMON_BASE_API}/pokemon?limit=${FETCH_LIMIT}`)
      .then(({ data: { results } }) => results)
      .catch(error => {
        console.error(ErrorMessages.POKEMON_URLS_ERROR, error);
        throw new AppError(
          ErrorMessages.POKEMON_URLS_ERROR,
          StatusCodes.BAD_GATEWAY,
        );
      });
  }

  private fetchAndSavePokemonData(url: string): Promise<void> {
    return this.fetchPokemonData(url)
      .then(pokemon => this.savePokemonWithTypes(pokemon))
      .catch(error => {
        console.error(`Erro ao buscar ou salvar pokémon: `, error);
        throw new AppError(
          'Erro ao buscar ou salvar pokémon:',
          StatusCodes.INTERNAL_SERVER_ERROR,
        );
      });
  }

  private fetchPokemonData(url: string): Promise<Pokemon> {
    return axios
      .get<PokemonAPI>(url)
      .then(({ data }) => this.transformPokemonData(data))
      .catch(error => {
        console.error(ErrorMessages.POKEMON_API_ERROR, error);
        throw new Error(ErrorMessages.POKEMON_API_ERROR);
      });
  }

  private async savePokemonWithTypes(pokemon: Pokemon): Promise<void> {
    const { types, ...base } = pokemon;

    await this.repository.create({
      data: {
        ...base,
        stats: {
          create: base.stats,
        },
        types: {
          create: types.map((type, index) => ({
            type: {
              connect: {
                name: type.name,
              },
            },
            order: index,
          })),
        },
      },
    });
  }

  private async transformPokemonData(data: PokemonAPI): Promise<Pokemon> {
    const { flavor_text_entries } =
      await this.pokemonSpeciesService.fetchSpeciesById(data.id);

    const baseStats = this.buildBaseStats(data);

    return {
      index: data.id,
      name: data.name,
      pokedexNumber: this.buildPokedexNumber(data.id),
      image: data.sprites.other['official-artwork'].front_default,
      weight: convertUnitMeasureValue(data.weight),
      height: convertUnitMeasureValue(data.height),
      abilities: data.abilities.map(({ ability: { name } }) =>
        capitalize(name),
      ),
      description: flavor_text_entries[0].flavor_text,
      stats: {
        hp: baseStats.hp,
        attack: baseStats.attack,
        defense: baseStats.defense,
        specialAttack: baseStats.specialAttack,
        specialDefense: baseStats.specialDefense,
        speed: baseStats.speed,
      },
      types: data.types.map(({ type }) => ({
        id: '',
        name: type.name,
        color: '',
      })),
    };
  }

  private buildPokedexNumber = (pokedexNumber: number): string => {
    return pokedexNumber > 0
      ? `#${String(pokedexNumber).padStart(3, '0')}`
      : '#000';
  };

  private buildBaseStats({ stats }: PokemonAPI): BaseStats {
    const defaults: BaseStats = {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
    };

    return stats.reduce((acc, { base_stat, stat: { name } }) => {
      acc[name.replace('-', '_') as keyof BaseStats] = base_stat;
      return acc;
    }, defaults);
  }

  public async findAll({
    page = 1,
    search,
    types,
  }: PaginationQueryParamsWithTypes) {
    const skip = (page - 1) * LIMIT_POKEMONS_PAGINATION;

    const where: any = {};

    if (search)
      where.name = {
        contains: search,
        mode: 'insensitive',
      };

    if (types)
      where.types = {
        some: {
          type: {
            name: {
              in: types.split(','),
            },
          },
        },
      };

    const pokemons = await this.repository.findMany({
      where,
      skip,
      take: LIMIT_POKEMONS_PAGINATION,
      include: {
        stats: true,
        types: {
          include: {
            type: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: {
        index: 'asc',
      },
    });

    const total = await this.repository.count({ where });

    return {
      data: pokemons,
      meta: {
        total,
        page,
        totalPages: Math.ceil(total / LIMIT_POKEMONS_PAGINATION),
      },
    };
  }

  public findById(id: string) {
    return this.repository.findFirst({
      where: { id },
      include: {
        stats: true,
        types: {
          include: {
            type: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }

  public async findWeaknesses(id: string) {
    const pokemon = await this.repository.findUnique({
      where: { id: id },
      include: {
        types: {
          include: {
            type: {
              include: {
                damageReceived: {
                  include: {
                    attackerType: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!pokemon) throw new AppError('Pokemon does not exist');

    return this.pokemonTypeService.calculateCombinedWeaknesses(pokemon.types);
  }

  public findByType(type: PokemonType) {
    return this.repository.findMany({
      take: 8,
      where: {
        types: {
          some: {
            type: {
              name: type,
            },
          },
        },
      },
      include: {
        stats: true,
        types: {
          include: {
            type: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: {
        index: 'asc',
      },
    });
  }
}
