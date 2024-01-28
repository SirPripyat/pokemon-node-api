import { BasicInformation } from "../pokemonBasicInformation";

export type EvolutionChain = {
  name: string;
  evolutionChain: Array<BasicInformation["name"]>;
};
