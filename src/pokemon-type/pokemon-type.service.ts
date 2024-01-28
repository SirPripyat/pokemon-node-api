import axios from "axios";
import { POKEMON_BASE_URL_API } from "../constants/pokemon-base-url-api";
import pokemonTypeSchema from "./pokemon-type.schema";
import type { PokemonUrlResponse } from "../types/responses/pokemon-url-response.type";
import { PokemonType } from "../types/pokemon-type/pokemon-type.type";
import {
  DamageRelationsResponse,
  PokemonTypeResponse,
} from "../types/responses/pokemon-type-response.type";
import { PokemonTypes } from "../types/pokemon-types.type";
import { Query } from "mongoose";

export class PokemonTypeService {
  public async createPokemonType(): Promise<void> {
    const pokemonTypes = await this.fetchPokemonTypesData();

    await pokemonTypeSchema.create(pokemonTypes);
  }

  private async fetchPokemonTypesData(): Promise<PokemonType[]> {
    const pokemonsTypesUrl = await this.getAllPokemonTypesUrl();

    const pokemonTypes = pokemonsTypesUrl.map(
      async (pokemonType: PokemonUrlResponse) =>
        await this.handlePokemonTypeData(pokemonType),
    );

    return await Promise.all(pokemonTypes);
  }

  private getAllPokemonTypesUrl = async (): Promise<PokemonUrlResponse[]> =>
    await axios
      .get(`${POKEMON_BASE_URL_API}/type`)
      .then(({ data: { results } }) => results);

  private async handlePokemonTypeData({
    url,
  }: PokemonUrlResponse): Promise<PokemonType> {
    const pokemonTypeUrl = url.toString();

    const {
      name,
      damage_relations: { double_damage_from },
    } = await axios
      .get(pokemonTypeUrl)
      .then(({ data }: PokemonTypeResponse) => data);

    const doubleDamageFrom = this.getTypeDoubleDamageFrom(double_damage_from);
    const getWeaknessess = await Promise.all(doubleDamageFrom);

    return {
      name,
      weaknessess: getWeaknessess,
    };
  }

  private getTypeDoubleDamageFrom(
    doubleDamageFrom: DamageRelationsResponse["double_damage_from"],
  ): PokemonTypes[] {
    return doubleDamageFrom.map(({ name }) => name);
  }

  public async getPokemonWeakness(typeId: string): Promise<PokemonType[]> {
    const pokemonTypesWeaknesses = (await pokemonTypeSchema.find({
      name: typeId,
    })) as PokemonType[];

    return pokemonTypesWeaknesses;
  }
}
