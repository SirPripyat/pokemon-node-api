import { BasicInformation } from "./BasicInformation";

export type GetAllPokemon = Omit<
  BasicInformation,
  "weight" | "height" | "abilities" | "description"
>;
