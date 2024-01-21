import { BaseStats } from "./pokemonBaseStats";
import { BasicInformation } from "./pokemonBasicInformation";

export type Pokemon = {
  basicInformation: BasicInformation;
  baseStats: BaseStats
};
