import { PokemonTypes } from "./pokemonTypes";

export type PokemonResponse = {
  id: number;
  name: string;
  types: {
    type: {
      name: PokemonTypes;
      url: string;
    };
  }[];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
};
