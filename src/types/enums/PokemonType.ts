export enum PokemonType {
  NORMAL = 'normal',
  FIGHTING = 'fighting',
  FLYING = 'flying',
  POISON = 'poison',
  GROUND = 'ground',
  ROCK = 'rock',
  BUG = 'bug',
  GHOST = 'ghost',
  STEEL = 'steel',
  FIRE = 'fire',
  WATER = 'water',
  GRASS = 'grass',
  ELECTRIC = 'electric',
  PSYCHIC = 'psychic',
  ICE = 'ice',
  DRAGON = 'dragon',
  DARK = 'dark',
  FAIRY = 'fairy',
}

export const allPokemonTypes: PokemonType[] = Object.values(PokemonType);

export const getPokemonTypeColor = (type?: PokemonType) => {
  switch (type) {
    case PokemonType.NORMAL:
      return 'rgb(113 113 122)';
    case PokemonType.FIGHTING:
      return 'rgb(236 72 153)';
    case PokemonType.FLYING:
      return 'rgb(37 99 235)';
    case PokemonType.POISON:
      return 'rgb(147 51 234)';
    case PokemonType.GROUND:
      return 'rgb(161 98 7)';
    case PokemonType.ROCK:
      return 'rgb(82 82 91)';
    case PokemonType.GHOST:
      return 'rgb(88 28 135)';
    case PokemonType.STEEL:
      return 'rgb(14 116 144)';
    case PokemonType.FIRE:
      return 'rgb(249 115 22)';
    case PokemonType.GRASS:
      return 'rgb(22 163 74)';
    case PokemonType.ELECTRIC:
      return 'rgb(189, 164, 0)';
    case PokemonType.PSYCHIC:
      return 'rgb(244 114 182)';
    case PokemonType.ICE:
      return 'rgb(20 184 166)';
    case PokemonType.DRAGON:
      return 'rgb(99 102 241)';
    case PokemonType.DARK:
      return 'rgb(90, 84, 101)';
    case PokemonType.BUG:
      return 'rgb(101 163 13)';
    case PokemonType.WATER:
      return 'rgb(59 130 246)';
    case PokemonType.FAIRY:
      return 'rgb(249 168 212)';
    default:
      return 'rgb(0 0 0)';
  }
};
