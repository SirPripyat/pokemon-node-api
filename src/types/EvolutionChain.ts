import { BasicInformation } from "./BasicInformation";

export type EvolutionChain = {
  name: string;
  evolutionChain: Array<BasicInformation["name"]>;
};
