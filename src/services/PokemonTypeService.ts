import axios, { AxiosStatic } from 'axios';
import {
  allPokemonTypes,
  Multiplier,
  PokemonType,
  PokemonTypeDamageAPI,
} from '../types';
import { POKEMON_BASE_API, prismaClient } from '../constants';

export class PokemonTypeService {
  constructor(
    private readonly httpClient: AxiosStatic = axios,
    private readonly repository = prismaClient.pokemonType,
    private readonly typeRelationRepository = prismaClient.typeRelation,
  ) {}

  public async create() {
    allPokemonTypes.map(type => {
      this.fetchType(type);
    });
  }

  private fetchType = async (type: PokemonType) => {
    const types = await this.repository.findMany();
    const typesMap = new Map(types.map(t => [t.name, t.id]));

    const defenderTypeId = typesMap.get(type);

    if (!defenderTypeId) return;

    this.httpClient
      .get<PokemonTypeDamageAPI>(`${POKEMON_BASE_API}/type/${type}`)
      .then(async ({ data: { damage_relations } }) => {
        for (const attacker of damage_relations.double_damage_from) {
          const attackerTypeId = typesMap.get(attacker.name);

          if (!attackerTypeId) continue;

          await this.typeRelationRepository.upsert({
            where: {
              defenderTypeId_attackerTypeId: {
                defenderTypeId,
                attackerTypeId,
              },
            },
            update: { multiplier: Multiplier.WEAKNESS },
            create: {
              defenderTypeId,
              attackerTypeId,
              multiplier: Multiplier.WEAKNESS,
            },
          });
        }

        for (const attacker of damage_relations.half_damage_from) {
          const attackerTypeId = typesMap.get(attacker.name);

          if (!attackerTypeId) continue;

          await this.typeRelationRepository.upsert({
            where: {
              defenderTypeId_attackerTypeId: {
                defenderTypeId,
                attackerTypeId,
              },
            },
            update: { multiplier: Multiplier.RESISTANCE },
            create: {
              defenderTypeId,
              attackerTypeId,
              multiplier: Multiplier.RESISTANCE,
            },
          });
        }

        for (const attacker of damage_relations.no_damage_from) {
          const attackerTypeId = typesMap.get(attacker.name);

          if (!attackerTypeId) continue;

          await this.typeRelationRepository.upsert({
            where: {
              defenderTypeId_attackerTypeId: {
                defenderTypeId,
                attackerTypeId,
              },
            },
            update: { multiplier: Multiplier.IMMUNITY },
            create: {
              defenderTypeId,
              attackerTypeId,
              multiplier: Multiplier.IMMUNITY,
            },
          });
        }
      });
  };

  public calculateCombinedWeaknesses(pokemonTypes: any[]) {
    const weaknessMap = new Map<
      string,
      {
        type: { id: string; name: string; color: string };
        multiplier: number;
      }
    >();

    pokemonTypes.forEach(({ type }) => {
      type.damageReceived.forEach((rel: any) => {
        const name = rel.attackerType.name;
        const currentMultiplier = weaknessMap.get(name)?.multiplier || 1;

        weaknessMap.set(name, {
          type: rel.attackerType,
          multiplier: currentMultiplier * rel.multiplier,
        });
      });
    });

    return Array.from(weaknessMap.values())
      .filter(({ multiplier }) => multiplier === Multiplier.WEAKNESS)
      .map(({ type }) => type);
  }

  public findAll() {
    return this.repository.findMany();
  }
}
