export type Chain = {
  species: Species;
  evolves_to: Chain[];
};

type Species = {
  name: string;
};

export type EvolutionChainResponse = {
  data: {
    chain: Chain;
  };
};
