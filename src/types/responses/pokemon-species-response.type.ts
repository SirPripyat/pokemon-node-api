import { BasicInformation } from "../pokemonBasicInformation";

export type PokemonSpeciesResponse = {
  data: {
    evolution_chain: {
      url: string;
    };
    flavor_text_entries: {
      flavor_text: string;
    }[];
    name: BasicInformation["name"];
  };
};
