import { BasicInformation } from "./pokemonBasicInformation";

export type GetAllPokemon = Omit<
  BasicInformation,
  "weight" | "height" | "abilities"
>;
