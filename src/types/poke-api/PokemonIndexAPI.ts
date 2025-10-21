export type PokemonIndexItem = {
  name: string;
  url: string;
};

export type PokemonIndexAPI = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonIndexItem[];
};
