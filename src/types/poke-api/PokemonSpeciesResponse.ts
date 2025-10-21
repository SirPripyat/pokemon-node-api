import { BasicInformation } from '../BasicInformation';

export type PokemonSpeciesResponse = {
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: Array<{ flavor_text: string }>;
  name: BasicInformation['name'];
};
